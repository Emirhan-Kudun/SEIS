#!/usr/bin/env node
import { readdir, stat, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const ROOT = path.resolve( __dirname, '..' );
const ASSET_DIR = path.join( ROOT, '_release-assets', 'github-zip-20260604' );
const JSON_PATH = path.join( ROOT, 'data', 'github-zip-release-manifest.json' );
const MD_PATH = path.join( ROOT, 'docs', 'github-zip-release.md' );
const RELEASE_TAG = 'icloud-github-zip-20260604';
const RELEASE_URL = `https://github.com/emirhankudun-ux/github-unified-source/releases/tag/${RELEASE_TAG}`;

function formatBytes( bytes ) {
  const units = [ 'B', 'KB', 'MB', 'GB' ];
  let value = bytes;
  let unitIndex = 0;

  while ( value >= 1024 && unitIndex < units.length - 1 ) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed( unitIndex === 0 ? 0 : 2 )} ${units[ unitIndex ]}`;
}

function sha256File( filePath ) {
  return new Promise( ( resolve, reject ) => {
    const hash = createHash( 'sha256' );
    const stream = createReadStream( filePath );

    stream.on( 'data', chunk => hash.update( chunk ) );
    stream.on( 'error', reject );
    stream.on( 'end', () => resolve( hash.digest( 'hex' ) ) );
  } );
}

async function main() {
  const entries = await readdir( ASSET_DIR );
  const parts = [];

  for ( const name of entries.sort() ) {
    if ( !name.startsWith( 'Github.zip.part-' ) ) continue;

    const filePath = path.join( ASSET_DIR, name );
    const fileStat = await stat( filePath );
    const sha256 = await sha256File( filePath );

    parts.push( {
      name,
      bytes: fileStat.size,
      sha256,
      releaseDownloadUrl: `https://github.com/emirhankudun-ux/github-unified-source/releases/download/${RELEASE_TAG}/${name}`
    } );
  }

  const totalBytes = parts.reduce( ( sum, part ) => sum + part.bytes, 0 );
  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceArchive: '/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github.zip',
    repository: 'emirhankudun-ux/github-unified-source',
    branch: 'full-icloud-archive-20260604',
    releaseTag: RELEASE_TAG,
    releaseUrl: RELEASE_URL,
    partCount: parts.length,
    totalBytes,
    parts
  };

  const markdownRows = parts
    .map( part => `| \`${part.name}\` | ${formatBytes( part.bytes )} | \`${part.sha256}\` |` )
    .join( '\n' );

  const markdown = `# GitHub.zip Release Manifest

Generated: ${manifest.generatedAt}

Source archive:

\`${manifest.sourceArchive}\`

Target branch:

\`${manifest.branch}\`

Release:

${manifest.releaseUrl}

## Summary

- Parts: ${manifest.partCount}
- Total size: ${formatBytes( manifest.totalBytes )}
- Each uploaded part is below GitHub's 2 GiB release asset limit.

## Parts

| Part | Size | SHA-256 |
| --- | ---: | --- |
${markdownRows}

## Restore Command

\`\`\`bash
cat Github.zip.part-* > Github.zip
shasum -a 256 Github.zip
\`\`\`
`;

  await writeFile( JSON_PATH, `${JSON.stringify( manifest, null, 2 )}\n` );
  await writeFile( MD_PATH, markdown );

  console.log( `Parts: ${parts.length}` );
  console.log( `Total: ${totalBytes}` );
  console.log( `Manifest: ${JSON_PATH}` );
}

main().catch( error => {
  console.error( error );
  process.exitCode = 1;
} );
