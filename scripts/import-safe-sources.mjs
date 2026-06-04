#!/usr/bin/env node
import { copyFile, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const ROOT = path.resolve( __dirname, '..' );
const ICLOUD_ROOT = path.resolve( ROOT, '..', '..' );
const SOURCES_DIR = path.join( ROOT, 'sources' );
const REPORT_JSON = path.join( ROOT, 'data', 'safe-source-import.json' );
const REPORT_MD = path.join( ROOT, 'docs', 'safe-source-import.md' );

const MAX_FILE_BYTES = Number( process.env.SEIS_IMPORT_MAX_FILE_BYTES ?? 1_000_000 );
const MAX_TOTAL_BYTES = Number( process.env.SEIS_IMPORT_MAX_TOTAL_BYTES ?? 220_000_000 );

const SAFE_EXTENSIONS = new Set( [
  '.astro',
  '.c',
  '.cc',
  '.cpp',
  '.cs',
  '.css',
  '.go',
  '.h',
  '.hpp',
  '.html',
  '.java',
  '.js',
  '.jsx',
  '.json',
  '.kt',
  '.m',
  '.md',
  '.mdx',
  '.mjs',
  '.mm',
  '.php',
  '.py',
  '.rb',
  '.rs',
  '.scss',
  '.sh',
  '.sql',
  '.swift',
  '.ts',
  '.tsx',
  '.txt',
  '.vue',
  '.xml',
  '.yaml',
  '.yml'
] );

const EXCLUDED_DIRS = new Set( [
  '.git',
  '.hg',
  '.svn',
  '.cache',
  '.next',
  '.nuxt',
  '.output',
  '.parcel-cache',
  '.turbo',
  '.vercel',
  'coverage',
  'dist',
  'build',
  'out',
  'node_modules',
  '__pycache__'
] );

const EXCLUDED_TOP_LEVEL = new Set( [
  'DeepSeek-Coder',
  'UIX-Apps',
  '_SEIS_ARCHIVE',
  'awesome-deepseek-agent',
  'claude-code',
  'docs',
  'gemini-cli'
] );

const EXCLUDED_PREFIXES = [
  'Website/emirhan-kudun-portfolio',
  '_SEIS_WORKSPACE/github-unified-source',
  '_SEIS_WORKSPACE/github-unified-source/repositories'
];

const RISKY_NAMES = [
  /^\.env/i,
  /credential/i,
  /secret/i,
  /token/i,
  /private[-_ ]?key/i,
  /^id_rsa$/i,
  /^id_ed25519$/i,
  /\.pem$/i,
  /\.key$/i,
  /\.p12$/i,
  /\.pfx$/i
];

function toPosix( filePath ) {
  return filePath.split( path.sep ).join( '/' );
}

function isRiskyName( basename ) {
  return RISKY_NAMES.some( pattern => pattern.test( basename ) );
}

function shouldExcludeRelativePath( relativePath ) {
  const topLevel = relativePath.split( '/' )[ 0 ];
  if ( EXCLUDED_TOP_LEVEL.has( topLevel ) ) return true;
  return EXCLUDED_PREFIXES.some( prefix => relativePath === prefix || relativePath.startsWith( `${prefix}/` ) );
}

function isSafeSourceFile( absolutePath ) {
  const basename = path.basename( absolutePath );
  if ( isRiskyName( basename ) ) return false;
  return SAFE_EXTENSIONS.has( path.extname( basename ).toLowerCase() );
}

async function collectFiles( directory, sourceRoot, targetRoot, group, files, skipped ) {
  const entries = await readdir( directory, { withFileTypes: true } ).catch( () => [] );

  for ( const entry of entries ) {
    const absolutePath = path.join( directory, entry.name );

    if ( entry.isDirectory() ) {
      if ( EXCLUDED_DIRS.has( entry.name ) ) {
        skipped.push( {
          group,
          path: toPosix( path.relative( sourceRoot, absolutePath ) ),
          reason: 'excluded-directory'
        } );
        continue;
      }

      await collectFiles( absolutePath, sourceRoot, targetRoot, group, files, skipped );
      continue;
    }

    if ( !entry.isFile() ) continue;

    const sourceRelative = toPosix( path.relative( sourceRoot, absolutePath ) );
    const statResult = await stat( absolutePath ).catch( () => null );
    if ( !statResult ) continue;

    if ( !isSafeSourceFile( absolutePath ) ) {
      skipped.push( {
        group,
        path: sourceRelative,
        reason: 'not-safe-source-extension-or-risk-name'
      } );
      continue;
    }

    if ( statResult.size > MAX_FILE_BYTES ) {
      skipped.push( {
        group,
        path: sourceRelative,
        reason: 'file-too-large',
        bytes: statResult.size
      } );
      continue;
    }

    files.push( {
      group,
      sourcePath: absolutePath,
      sourceRelative,
      targetPath: path.join( targetRoot, sourceRelative ),
      bytes: statResult.size
    } );
  }
}

async function collectIcloudFiles( directory, files, skipped ) {
  const entries = await readdir( directory, { withFileTypes: true } ).catch( () => [] );

  for ( const entry of entries ) {
    const absolutePath = path.join( directory, entry.name );
    const rootRelative = toPosix( path.relative( ICLOUD_ROOT, absolutePath ) );

    if ( shouldExcludeRelativePath( rootRelative ) ) {
      skipped.push( {
        group: 'icloud-workspace',
        path: rootRelative,
        reason: 'already-represented-or-self'
      } );
      continue;
    }

    if ( entry.isDirectory() ) {
      if ( EXCLUDED_DIRS.has( entry.name ) ) {
        skipped.push( {
          group: 'icloud-workspace',
          path: rootRelative,
          reason: 'excluded-directory'
        } );
        continue;
      }

      await collectIcloudFiles( absolutePath, files, skipped );
      continue;
    }

    if ( !entry.isFile() ) continue;

    const statResult = await stat( absolutePath ).catch( () => null );
    if ( !statResult ) continue;

    if ( !isSafeSourceFile( absolutePath ) ) {
      skipped.push( {
        group: 'icloud-workspace',
        path: rootRelative,
        reason: 'not-safe-source-extension-or-risk-name'
      } );
      continue;
    }

    if ( statResult.size > MAX_FILE_BYTES ) {
      skipped.push( {
        group: 'icloud-workspace',
        path: rootRelative,
        reason: 'file-too-large',
        bytes: statResult.size
      } );
      continue;
    }

    files.push( {
      group: 'icloud-workspace',
      sourcePath: absolutePath,
      sourceRelative: rootRelative,
      targetPath: path.join( SOURCES_DIR, 'icloud-workspace', rootRelative ),
      bytes: statResult.size
    } );
  }
}

async function collectGithubRepositoryFiles( files, skipped ) {
  const repositoriesDir = path.join( ROOT, 'repositories' );
  const repositories = await readdir( repositoriesDir, { withFileTypes: true } ).catch( () => [] );

  for ( const repo of repositories ) {
    if ( repo.name.startsWith( '.' ) ) continue;

    const repoRoot = path.join( repositoriesDir, repo.name );
    const repoStat = await stat( repoRoot ).catch( () => null );
    if ( !repoStat?.isDirectory() ) continue;

    await collectFiles(
      repoRoot,
      repoRoot,
      path.join( SOURCES_DIR, 'github-repositories', repo.name ),
      `github:${repo.name}`,
      files,
      skipped
    );
  }
}

function renderMarkdown( report ) {
  const groupRows = Object.entries( report.groups )
    .sort( ( a, b ) => a[ 0 ].localeCompare( b[ 0 ] ) )
    .map( ( [ group, value ] ) => `| ${group} | ${value.files} | ${value.bytes} |` )
    .join( '\n' );

  const skippedRows = Object.entries( report.skippedByReason )
    .sort( ( a, b ) => b[ 1 ] - a[ 1 ] )
    .map( ( [ reason, count ] ) => `| ${reason} | ${count} |` )
    .join( '\n' );

  return `# Safe Source Import

Generated: ${report.generatedAt}

## Summary

- Files imported: ${report.importedFiles}
- Bytes imported: ${report.importedBytes}
- Files skipped: ${report.skippedFiles}
- Total byte limit reached: ${report.totalByteLimitReached}

## Imported Groups

| Group | Files | Bytes |
| --- | ---: | ---: |
${groupRows}

## Skipped Reasons

| Reason | Count |
| --- | ---: |
${skippedRows}

## Notes

This import is intentionally source-only. It excludes nested Git data,
dependencies, build output, binary/media/archive files, likely credential names,
and files above the configured size limit.
`;
}

async function main() {
  const files = [];
  const skipped = [];

  await collectGithubRepositoryFiles( files, skipped );
  await collectIcloudFiles( ICLOUD_ROOT, files, skipped );

  files.sort( ( a, b ) => {
    const groupCompare = a.group.localeCompare( b.group );
    return groupCompare === 0 ? a.sourceRelative.localeCompare( b.sourceRelative ) : groupCompare;
  } );

  await rm( path.join( SOURCES_DIR, 'github-repositories' ), { force: true, recursive: true } );
  await rm( path.join( SOURCES_DIR, 'icloud-workspace' ), { force: true, recursive: true } );

  let importedBytes = 0;
  let importedFiles = 0;
  let totalByteLimitReached = false;
  const groups = {};

  for ( const file of files ) {
    if ( importedBytes + file.bytes > MAX_TOTAL_BYTES ) {
      totalByteLimitReached = true;
      skipped.push( {
        group: file.group,
        path: file.sourceRelative,
        reason: 'total-byte-limit',
        bytes: file.bytes
      } );
      continue;
    }

    await mkdir( path.dirname( file.targetPath ), { recursive: true } );
    await copyFile( file.sourcePath, file.targetPath );
    importedFiles += 1;
    importedBytes += file.bytes;
    groups[ file.group ] ??= { files: 0, bytes: 0 };
    groups[ file.group ].files += 1;
    groups[ file.group ].bytes += file.bytes;
  }

  const skippedByReason = {};
  for ( const item of skipped ) {
    skippedByReason[ item.reason ] = ( skippedByReason[ item.reason ] ?? 0 ) + 1;
  }

  const report = {
    generatedAt: new Date().toISOString(),
    importedFiles,
    importedBytes,
    skippedFiles: skipped.length,
    totalByteLimitReached,
    limits: {
      maxFileBytes: MAX_FILE_BYTES,
      maxTotalBytes: MAX_TOTAL_BYTES
    },
    groups,
    skippedByReason,
    skippedSample: skipped.slice( 0, 500 )
  };

  await mkdir( path.dirname( REPORT_JSON ), { recursive: true } );
  await mkdir( path.dirname( REPORT_MD ), { recursive: true } );
  await writeFile( REPORT_JSON, `${JSON.stringify( report, null, 2 )}\n` );
  await writeFile( REPORT_MD, renderMarkdown( report ) );

  console.log( `Imported files: ${importedFiles}` );
  console.log( `Imported bytes: ${importedBytes}` );
  console.log( `Skipped files: ${skipped.length}` );
  console.log( `Report: ${REPORT_JSON}` );
}

main().catch( error => {
  console.error( error );
  process.exitCode = 1;
} );
