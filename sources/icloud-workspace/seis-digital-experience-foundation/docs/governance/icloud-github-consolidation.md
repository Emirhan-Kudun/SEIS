# iCloud GitHub Consolidation

Date: 2026-05-31

This document records the safe consolidation pass for moving SEIS/UIXApps work toward the iCloud Drive GitHub workspace without overwriting the current canonical repository.

## Canonical Destination

The canonical working repository is:

`/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/seis-digital-experience-foundation`

Current branch: `UIXAppTTR`  
Current head: `db29daf`  
Git remote: `https://github.com/emirhankudun-ux/UIX-Apps.git`

This repository remains the active SEIS/UIXApps foundation surface.

## Archive Destination

Large source archives are preserved outside Git history:

`/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/_SEIS_ARCHIVE/2026-05-31`

The current `SEIS.zip` source archive was copied there from:

`/Users/emirhan/Downloads/SEIS.zip`

This keeps the source material available in iCloud without making the Git repository heavy.

## Source Review

The following sources were reviewed as candidates:

| Source | Status | Decision |
| --- | --- | --- |
| `Documents/New project` | Dirty `UIXAppTTR` source with 90 changed or untracked paths | Review-only source. Do not bulk copy because it would roll back newer cinematic, registry, metadata, and quality work. |
| `SEIS.zip` | 19 MB nested SEIS knowledge archive | Archived in iCloud. Use manifest-first intake only. |
| `Github/UIX-Apps` | Clean remote reference at `6183e18` | Treat as remote-state reference, not as the active local destination. |
| `Github/UX 2`, `Website 2`, `Website copy` | Symlinked dirty portfolio sources | Keep as portfolio-lane references. Import only through a later portfolio intake mission. |
| `Github/docs` | Dirty documentation repository | Review for reusable governance patterns before selective intake. |
| `Github/Codex`, `DeepSeek-Coder`, `awesome-deepseek-agent`, `claude-code`, `gemini-cli` | AI/tooling references | Do not merge into the SEIS foundation unless a specific mission needs a small artifact. |

## Why Bulk Copy Was Avoided

The iCloud canonical repository is newer than `/Users/emirhan/Documents/New project` for the main SEIS/UIXApps surface. Directly copying the older source would remove or weaken:

- cinematic engine data loading
- plugin and skill capability registry checks
- quality console surfaces
- richer metadata and SEO structure
- current `package.json` validation scripts
- completed backlog items for plugin/skill governance

The safe path is selective intake, not overwrite.

## Intake Rules

1. The iCloud SEIS repository is the canonical destination.
2. Dirty source repositories are never copied directly over canonical files.
3. Large archives stay in the iCloud archive layer, outside Git history.
4. Every imported file needs a mission, owner agent, validation command, and rollback path.
5. Portfolio code enters through a dedicated portfolio intake mission.
6. AI tooling repositories remain references unless a mission explicitly needs a small artifact.

## Next Mission

Recommended next mission:

`Mission 002: SEIS Knowledge Intake Manifest`

Scope:

- create a nested-pack manifest for `SEIS.zip`
- extract only top-level indexes from the most relevant SEIS packs
- map each source pack to a domain and owner agent
- avoid importing the giant markdown knowledge base wholesale

This keeps the repository token-efficient and prevents documentation sprawl.
