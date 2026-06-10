# GitHub Unified Source Hub

This hub gathers all currently visible GitHub repositories for
`emirhankudun-ux` into one local workspace without rewriting or merging the
original repositories.

## What This Is

- A single local place to browse private and public repositories.
- A reversible consolidation layer built from symlinks and shallow clones.
- A safe text/code bundle generator for review, search, and AI context.

## What This Is Not

- It is not a destructive monorepo migration.
- It is not a GitHub publication step.
- It is not a raw concatenation of every file, binary, dependency, and secret.

## Current Repositories

See [docs/github-repository-inventory.md](docs/github-repository-inventory.md)
and [data/repositories.json](data/repositories.json).

## Generate One Review Bundle

```bash
SEIS_BUNDLE_MAX_FILE_BYTES=1000000 SEIS_BUNDLE_MAX_TOTAL_BYTES=200000000 node scripts/build-code-bundle.mjs
```

Outputs:

- `_generated/github-code-bundle.txt`
- `_generated/github-code-bundle-manifest.json`

The generator intentionally excludes `.git`, dependency directories, build
outputs, media, archives, likely credential files, and large files by default.

## Current Consolidation Status

Last generated on 2026-06-04:

- GitHub repositories discovered: 8
- Source repositories linked locally: 7 symlinks, 1 shallow clone
- Safe text/code files written into one bundle: 3863
- Files truncated by total bundle limit: 0
- Files skipped by safety filters: 247
- Bundle size: about 52 MB

The skipped files are intentionally excluded review risks: dependency/build
directories, media/archive/binary formats, lockfiles, likely credential names,
and files larger than the configured per-file limit.

## Publish Warning

This hub includes private repositories. Do not push the generated bundle or the
linked source tree to a public GitHub repository without a private-code review.
