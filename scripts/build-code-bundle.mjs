#!/usr/bin/env node
import { createWriteStream } from 'node:fs';
import { mkdir, readdir, readFile, realpath, stat, lstat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const ROOT = path.resolve( __dirname, '..' );
const REPOSITORIES_DIR = path.join( ROOT, 'repositories' );
const OUTPUT_DIR = path.join( ROOT, '_generated' );
const BUNDLE_PATH = path.join( OUTPUT_DIR, 'github-code-bundle.txt' );
const MANIFEST_PATH = path.join( OUTPUT_DIR, 'github-code-bundle-manifest.json' );

const MAX_FILE_BYTES = Number( process.env.SEIS_BUNDLE_MAX_FILE_BYTES ?? 200_000 );
const MAX_TOTAL_BYTES = Number( process.env.SEIS_BUNDLE_MAX_TOTAL_BYTES ?? 25_000_000 );

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
  '.wrangler',
  'coverage',
  'dist',
  'build',
  'out',
  'node_modules',
  'vendor',
  '__pycache__'
] );

const EXCLUDED_EXTENSIONS = new Set( [
  '.7z',
  '.a',
  '.ai',
  '.avif',
  '.bin',
  '.bmp',
  '.br',
  '.class',
  '.db',
  '.dmg',
  '.doc',
  '.docx',
  '.DS_Store',
  '.eot',
  '.exe',
  '.gif',
  '.gz',
  '.heic',
  '.ico',
  '.jar',
  '.jpeg',
  '.jpg',
  '.lockb',
  '.mov',
  '.mp3',
  '.mp4',
  '.otf',
  '.pdf',
  '.png',
  '.ppt',
  '.pptx',
  '.pyc',
  '.rar',
  '.sqlite',
  '.tar',
  '.tgz',
  '.tif',
  '.tiff',
  '.ttf',
  '.webm',
  '.webp',
  '.woff',
  '.woff2',
  '.xls',
  '.xlsx',
  '.zip'
] );

const EXCLUDED_FILENAMES = new Set( [
  '.DS_Store',
  '.env',
  '.env.local',
  '.env.production',
  '.env.development',
  'credentials.json',
  'credentials.yml',
  'credentials.yaml',
  'credentials.key',
  'id_rsa',
  'id_ed25519',
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock'
] );

function shouldExcludeFile( name ) {
  if ( EXCLUDED_FILENAMES.has( name ) ) return true;
  const lower = name.toLowerCase();
  const ext = path.extname( lower );
  return EXCLUDED_EXTENSIONS.has( ext );
}

function shouldExcludeDir( name ) {
  return EXCLUDED_DIRS.has( name );
}

function normalizeBundlePath( absolutePath, repositoryRoot ) {
  return path.relative( repositoryRoot, absolutePath ).split( path.sep ).join( '/' );
}

async function listRepositories() {
  const entries = await readdir( REPOSITORIES_DIR, { withFileTypes: true } );
  const repos = [];

  for ( const entry of entries ) {
    if ( entry.name.startsWith( '.' ) ) continue;

    const linkPath = path.join( REPOSITORIES_DIR, entry.name );
    const entryStat = await lstat( linkPath );
    const resolvedPath = entryStat.isSymbolicLink() ? await realpath( linkPath ) : linkPath;
    const resolvedStat = await stat( resolvedPath );

    if ( resolvedStat.isDirectory() ) {
      repos.push( {
        name: entry.name,
        linkPath,
        root: resolvedPath
      } );
    }
  }

  return repos.sort( ( a, b ) => a.name.localeCompare( b.name ) );
}

async function walkRepository( repository, directory, files, skipped ) {
  const entries = await readdir( directory, { withFileTypes: true } );

  for ( const entry of entries ) {
    const fullPath = path.join( directory, entry.name );

    if ( entry.isDirectory() ) {
      if ( shouldExcludeDir( entry.name ) ) {
        skipped.push( {
          repository: repository.name,
          path: normalizeBundlePath( fullPath, repository.root ),
          reason: 'excluded-directory'
        } );
        continue;
      }

      await walkRepository( repository, fullPath, files, skipped );
      continue;
    }

    if ( !entry.isFile() ) continue;

    const relativePath = normalizeBundlePath( fullPath, repository.root );

    if ( shouldExcludeFile( entry.name ) ) {
      skipped.push( {
        repository: repository.name,
        path: relativePath,
        reason: 'excluded-file-type-or-secret-name'
      } );
      continue;
    }

    const fileStat = await stat( fullPath );
    if ( fileStat.size > MAX_FILE_BYTES ) {
      skipped.push( {
        repository: repository.name,
        path: relativePath,
        reason: 'file-too-large',
        bytes: fileStat.size
      } );
      continue;
    }

    files.push( {
      repository: repository.name,
      absolutePath: fullPath,
      path: relativePath,
      bytes: fileStat.size
    } );
  }
}

async function buildBundle() {
  await mkdir( OUTPUT_DIR, { recursive: true } );

  const repositories = await listRepositories();
  const files = [];
  const skipped = [];

  for ( const repository of repositories ) {
    await walkRepository( repository, repository.root, files, skipped );
  }

  files.sort( ( a, b ) => {
    const repoCompare = a.repository.localeCompare( b.repository );
    return repoCompare === 0 ? a.path.localeCompare( b.path ) : repoCompare;
  } );

  let totalBytes = 0;
  let writtenFiles = 0;
  const truncated = [];
  const stream = createWriteStream( BUNDLE_PATH, { encoding: 'utf8' } );

  stream.write( '# GitHub Unified Code Bundle\n\n' );
  stream.write( `Generated at: ${new Date().toISOString()}\n` );
  stream.write( `Max file bytes: ${MAX_FILE_BYTES}\n` );
  stream.write( `Max total bytes: ${MAX_TOTAL_BYTES}\n\n` );
  stream.write( 'Private repositories may be included. Review before publishing.\n\n' );

  for ( const file of files ) {
    if ( totalBytes + file.bytes > MAX_TOTAL_BYTES ) {
      truncated.push( {
        repository: file.repository,
        path: file.path,
        reason: 'total-byte-limit'
      } );
      continue;
    }

    const content = await readFile( file.absolutePath, 'utf8' ).catch( () => null );

    if ( content === null || content.includes( '\u0000' ) ) {
      skipped.push( {
        repository: file.repository,
        path: file.path,
        reason: 'not-readable-as-text'
      } );
      continue;
    }

    stream.write( `\n\n--- BEGIN FILE: ${file.repository}/${file.path} ---\n` );
    stream.write( content );
    if ( !content.endsWith( '\n' ) ) stream.write( '\n' );
    stream.write( `--- END FILE: ${file.repository}/${file.path} ---\n` );

    totalBytes += Buffer.byteLength( content, 'utf8' );
    writtenFiles += 1;
  }

  await new Promise( ( resolve, reject ) => {
    stream.end( error => {
      if ( error ) reject( error );
      else resolve();
    } );
  } );

  const manifest = {
    generatedAt: new Date().toISOString(),
    repositoryCount: repositories.length,
    scannedFileCount: files.length,
    writtenFileCount: writtenFiles,
    skippedCount: skipped.length,
    truncatedCount: truncated.length,
    totalWrittenBytes: totalBytes,
    limits: {
      maxFileBytes: MAX_FILE_BYTES,
      maxTotalBytes: MAX_TOTAL_BYTES
    },
    repositories: repositories.map( repository => ( {
      name: repository.name,
      root: repository.root
    } ) ),
    skipped,
    truncated,
    output: {
      bundlePath: path.relative( ROOT, BUNDLE_PATH ),
      manifestPath: path.relative( ROOT, MANIFEST_PATH )
    }
  };

  await writeFile( MANIFEST_PATH, `${JSON.stringify( manifest, null, 2 )}\n` );

  console.log( `Repositories: ${repositories.length}` );
  console.log( `Files written: ${writtenFiles}` );
  console.log( `Skipped: ${skipped.length}` );
  console.log( `Truncated: ${truncated.length}` );
  console.log( `Bundle: ${BUNDLE_PATH}` );
  console.log( `Manifest: ${MANIFEST_PATH}` );
}

buildBundle().catch( error => {
  console.error( error );
  process.exitCode = 1;
} );
