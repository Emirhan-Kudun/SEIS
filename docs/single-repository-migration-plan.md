# Single Repository Migration Plan

Date: 2026-06-04

## Goal

Move toward one private GitHub source hub for the SEIS iCloud GitHub workspace
without losing history, leaking private files, or making the repository too
large to clone and maintain.

Target repository:

`https://github.com/emirhankudun-ux/github-unified-source`

## Current Workspace Size

The iCloud GitHub workspace is about 18 GB. The largest local surfaces are:

| Path | Size | Recommended handling |
| --- | ---: | --- |
| `Website` | 7.8 GB | Audit first; include source code, route large assets through LFS or releases |
| `Tüm zip dosyaları.zip` | 5.6 GB | Do not commit to Git; use external storage or GitHub release asset if needed |
| `Codex` | 1.4 GB | Audit before inclusion |
| `_SEIS_ARCHIVE` | 1.3 GB | Keep as archive; do not import wholesale |
| `seis-digital-experience-foundation` | 534 MB | Candidate for source import after repo-state review |
| `UIX-Apps` | 308 MB | Already represented in the unified source bundle |
| `VSCODE` | 300 MB | Audit before inclusion |
| `gemini-cli` | 254 MB | Already represented in the unified source bundle |

## Recommended Policy

Use one repository as the source hub, but do not flatten every byte into Git.

Include:

- Source code
- Markdown documentation
- Governance manifests
- Generated inventories
- Safe text/code bundles
- Small design assets that are part of the system

Exclude or route separately:

- `.git` folders from nested repositories
- `node_modules`, build output, caches, and dependency folders
- `.env`, credentials, keys, tokens, and local config
- Large media, PDFs, videos, and raw photo archives
- Large zip archives
- Historical archive dumps that are not active source

## Phased Migration

### Phase 1: Safe Source Hub

Status: complete.

- Created `github-unified-source`
- Published it as a private GitHub repository
- Added repository inventory
- Generated one safe text/code bundle
- Kept private and public source together behind private visibility

### Phase 2: iCloud Workspace Inventory

Create a fuller inventory of the iCloud root:

- Paths
- Sizes
- File categories
- Git repository status
- Candidate action: include, ignore, LFS, release asset, archive, or manual review

No files should be deleted in this phase.

### Phase 3: Selected Source Import

Import only reviewed source surfaces into structured folders such as:

- `sources/github-repositories/`
- `sources/icloud-projects/`
- `docs/`
- `data/`
- `archives/indexes/`

Large binary assets should remain outside normal Git unless explicitly reviewed.

### Phase 4: Archive Old GitHub Repositories

After the unified source hub is verified:

- Mark old repositories as archived, not deleted.
- Keep redirects and README pointers to the new hub.
- Preserve original repository history for rollback.
- Delete repositories only after a separate explicit approval.

## Current Publication State

- Local consolidation: complete
- Private GitHub hub: published
- Full iCloud import: not attempted
- Old repository deletion: not attempted

## Hard Blockers Before "Only One Repo Remains"

- Private and public source must not be mixed into a public repo.
- Large 5 GB+ archives must not be committed directly to Git.
- Old repositories should be archived before deletion.
- A stronger secret scan is required before any broad import.
- Git LFS or release-asset strategy must be chosen for large media.
