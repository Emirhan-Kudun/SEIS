#!/usr/bin/env node
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const ROOT = path.resolve( __dirname, '..' );
const ICLOUD_ROOT = path.resolve( ROOT, '..', '..' );
const OUTPUT_DIR = path.join( ROOT, 'data', 'icloud-inventory' );
const JSON_PATH = path.join( OUTPUT_DIR, 'classification.json' );
const MD_PATH = path.join( ROOT, 'docs', 'icloud-workspace-classification.md' );

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

const CATEGORY_EXTENSIONS = {
  code: new Set( [
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
    '.mm',
    '.mjs',
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
    '.vue',
    '.xml',
    '.yaml',
    '.yml'
  ] ),
  document: new Set( [ '.md', '.mdx', '.txt', '.rtf', '.csv', '.tsv' ] ),
  media: new Set( [
    '.ai',
    '.avif',
    '.bmp',
    '.gif',
    '.heic',
    '.ico',
    '.jpeg',
    '.jpg',
    '.mov',
    '.mp3',
    '.mp4',
    '.png',
    '.psd',
    '.svg',
    '.tif',
    '.tiff',
    '.webm',
    '.webp'
  ] ),
  archive: new Set( [ '.7z', '.br', '.dmg', '.gz', '.rar', '.tar', '.tgz', '.xz', '.zip' ] ),
  office: new Set( [ '.doc', '.docx', '.key', '.numbers', '.pages', '.pdf', '.ppt', '.pptx', '.xls', '.xlsx' ] )
};

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

function classifyFile( absolutePath ) {
  const basename = path.basename( absolutePath );
  const ext = path.extname( basename ).toLowerCase();
  const risky = RISKY_NAMES.some( pattern => pattern.test( basename ) );

  if ( risky ) return 'risky';

  for ( const [ category, extensions ] of Object.entries( CATEGORY_EXTENSIONS ) ) {
    if ( extensions.has( ext ) ) return category;
  }

  return 'other';
}

function addCategory( summary, category, bytes ) {
  summary.categories[ category ] ??= { files: 0, bytes: 0 };
  summary.categories[ category ].files += 1;
  summary.categories[ category ].bytes += bytes;
}

function formatBytes( bytes ) {
  const units = [ 'B', 'KB', 'MB', 'GB' ];
  let value = bytes;
  let unitIndex = 0;

  while ( value >= 1024 && unitIndex < units.length - 1 ) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed( unitIndex === 0 ? 0 : 1 )} ${units[ unitIndex ]}`;
}

async function walk( directory, summary ) {
  const entries = await readdir( directory, { withFileTypes: true } ).catch( () => [] );

  for ( const entry of entries ) {
    const absolutePath = path.join( directory, entry.name );
    const relativePath = path.relative( ICLOUD_ROOT, absolutePath ).split( path.sep ).join( '/' );

    if ( relativePath === '_SEIS_WORKSPACE/github-unified-source/.git' ) continue;
    if ( relativePath.startsWith( '_SEIS_WORKSPACE/github-unified-source/.git/' ) ) continue;

    if ( entry.isDirectory() ) {
      if ( EXCLUDED_DIRS.has( entry.name ) ) {
        summary.skippedDirectories.push( relativePath );
        continue;
      }

      await walk( absolutePath, summary );
      continue;
    }

    if ( !entry.isFile() ) continue;

    const fileStat = await stat( absolutePath ).catch( () => null );
    if ( !fileStat ) continue;

    const category = classifyFile( absolutePath );
    summary.totalFiles += 1;
    summary.totalBytes += fileStat.size;
    addCategory( summary, category, fileStat.size );

    const topLevel = relativePath.split( '/' )[ 0 ];
    summary.topLevel[ topLevel ] ??= {
      files: 0,
      bytes: 0,
      categories: {}
    };
    summary.topLevel[ topLevel ].files += 1;
    summary.topLevel[ topLevel ].bytes += fileStat.size;
    addCategory( summary.topLevel[ topLevel ], category, fileStat.size );

    if ( fileStat.size >= 50 * 1024 * 1024 ) {
      summary.largeFiles.push( {
        path: relativePath,
        bytes: fileStat.size,
        category
      } );
    }

    if ( category === 'risky' ) {
      summary.riskyFiles.push( {
        path: relativePath,
        bytes: fileStat.size
      } );
    }
  }
}

function renderMarkdown( summary ) {
  const categoryRows = Object.entries( summary.categories )
    .sort( ( a, b ) => b[ 1 ].bytes - a[ 1 ].bytes )
    .map( ( [ category, value ] ) => `| ${category} | ${value.files} | ${formatBytes( value.bytes )} |` )
    .join( '\n' );

  const topRows = Object.entries( summary.topLevel )
    .sort( ( a, b ) => b[ 1 ].bytes - a[ 1 ].bytes )
    .slice( 0, 40 )
    .map( ( [ name, value ] ) => `| \`${name}\` | ${value.files} | ${formatBytes( value.bytes )} |` )
    .join( '\n' );

  const largeRows = summary.largeFiles
    .sort( ( a, b ) => b.bytes - a.bytes )
    .slice( 0, 50 )
    .map( file => `| \`${file.path}\` | ${file.category} | ${formatBytes( file.bytes )} |` )
    .join( '\n' );

  const riskyRows = summary.riskyFiles
    .sort( ( a, b ) => a.path.localeCompare( b.path ) )
    .slice( 0, 100 )
    .map( file => `| \`${file.path}\` | ${formatBytes( file.bytes )} |` )
    .join( '\n' );

  return `# iCloud Workspace Classification

Generated: ${summary.generatedAt}

Root:

\`${summary.root}\`

## Summary

- Total scanned files: ${summary.totalFiles}
- Total classified bytes: ${formatBytes( summary.totalBytes )}
- Skipped heavy/system directories: ${summary.skippedDirectories.length}
- Large files over 50 MB: ${summary.largeFiles.length}
- Risk-name files: ${summary.riskyFiles.length}

## Categories

| Category | Files | Size |
| --- | ---: | ---: |
${categoryRows}

## Largest Top-Level Paths

| Path | Files | Size |
| --- | ---: | ---: |
${topRows}

## Large Files

| Path | Category | Size |
| --- | --- | ---: |
${largeRows || '| None | - | - |'}

## Risk-Name Files

This is a filename-based risk list, not a full secret scan.

| Path | Size |
| --- | ---: |
${riskyRows || '| None | - |'}

## Recommended Routing

- Code and markdown/text: import to the private unified source repo after safety filters.
- Large media, PDFs, videos, and zip archives: Git LFS or GitHub Release assets only after review.
- Archive folders and old repo copies: index first; do not import wholesale.
- Risk-name files: manual review required before any import or publication.
`;
}

async function main() {
  const summary = {
    generatedAt: new Date().toISOString(),
    root: ICLOUD_ROOT,
    totalFiles: 0,
    totalBytes: 0,
    categories: {},
    topLevel: {},
    largeFiles: [],
    riskyFiles: [],
    skippedDirectories: []
  };

  await walk( ICLOUD_ROOT, summary );
  await mkdir( OUTPUT_DIR, { recursive: true } );
  await mkdir( path.dirname( MD_PATH ), { recursive: true } );
  await writeFile( JSON_PATH, `${JSON.stringify( summary, null, 2 )}\n` );
  await writeFile( MD_PATH, renderMarkdown( summary ) );

  console.log( `Inventory written: ${JSON_PATH}` );
  console.log( `Report written: ${MD_PATH}` );
  console.log( `Files: ${summary.totalFiles}` );
  console.log( `Large files: ${summary.largeFiles.length}` );
  console.log( `Risk-name files: ${summary.riskyFiles.length}` );
}

main().catch( error => {
  console.error( error );
  process.exitCode = 1;
} );
