# GitHub Unified Source Hub Instructions

## Scope

This directory is a local SEIS consolidation hub for GitHub repositories owned by
`emirhankudun-ux`.

It is not the canonical source of truth for the linked repositories. Each source
repository keeps its own Git history, branch policy, AGENTS.md rules, and remote.

## Safety Rules

- Do not flatten private and public code into a publishable remote without an
  explicit review step.
- Do not copy nested `.git` directories into a new repository.
- Do not include dependency folders, build output, media archives, credential
  files, or generated bundle output in a public publish.
- Prefer symlinks or shallow local clones for the first consolidation pass.
- Treat generated bundles as review artifacts, not deployment artifacts.

## Workflow

1. Update `data/repositories.json` from GitHub inventory.
2. Link or clone source repositories under `repositories/`.
3. Run `node scripts/build-code-bundle.mjs` to generate a text review bundle.
4. Review `_generated/github-code-bundle-manifest.json` before any publication.
5. Keep original repositories unchanged unless a task explicitly targets them.
