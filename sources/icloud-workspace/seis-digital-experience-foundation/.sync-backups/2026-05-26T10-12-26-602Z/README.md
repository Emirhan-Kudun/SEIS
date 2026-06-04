# UIXApps

UIXApps is a clean, dependency-light SEIS repository for the UI-UX Digital Lab creative experience operating system. It keeps legacy zip analysis separate from the new architecture so valuable assets can be curated without dragging old implementation debt forward.

## Current State

- The active folder was not a Git working tree during setup.
- Legacy zip archives were found outside this folder under `/Users/emirhan/Downloads/PortfolioWebsite`.
- No legacy file was copied into the clean app surface.
- 20 selected drawing assets were curated into the new public media layer.
- A static, dependency-free web foundation was added under `apps/web` for low-power review.
- A UI-UX Digital Lab operating-model layer now documents experience modes, AI workflow readiness, accessibility governance, and enterprise creative operations.
- The deploy package now preserves Lab OS content, strategy docs, deploy runbooks, and polyglot contracts before live upload.
- The polyglot atlas now includes 64 language and configuration surfaces without adding production dependency bloat.
- The only active local development branch is `UIXAppTTR`; previous feature branch work is completed into that history.

## Structure

```text
apps/web/                    dependency-free cinematic web shell
content/                     portable content and metadata registries
content/lab/                 UI-UX Digital Lab operating-model contracts
packages/design-tokens/       shared visual and motion tokens
packages/asset-registry/      legacy asset migration decisions
docs/reports/                 zip and repository analysis
docs/architecture/            proposed clean architecture
docs/strategy/                operating-model and product strategy notes
docs/quality/                 responsive, SEO, performance, accessibility strategy
docs/plans/                   commit and rollout plans
archive/                      archive policy, not extracted legacy source
```

## Branch Model

```text
Repository: UIXApps
Single active local branch: UIXAppTTR
Feature branches: absorbed as sub-agent workstreams
```

The previous `feature/multilingual-cinematic-foundation` branch is already part of `UIXAppTTR` history and was removed after verification. Future web, mobile, polyglot, release, and governance work should land inside `UIXAppTTR`.

`codex/premium-local-foundation` is also treated only as a `UIXAppTTR` sub-agent lane. It should not be recreated as a separate branch; any recovered code belongs inside `UIXAppTTR`.

## Open Locally

The initial shell is static. Open this file in a browser:

```text
apps/web/index.html
```

## Checks

```bash
npm run check:js
npm run check:foundation
```

## Server Package

```bash
npm run package:server
npm run prepare:server
npm run release:ready
```

This creates:

```text
dist/seis-static.zip
dist/server-upload-manifest.json
deploy/upload-plan.json
handoff/server/
releases/latest.json
```

Use this archive for the selected server after the domain/hosting target is confirmed.

## Multilingual Scope

The current foundation includes runtime language switching for:

```text
tr, en, fr, it, de, es, ar
```

## Polyglot Software Atlas

The repository includes 64 lightweight language/configuration surfaces as contracts, schemas, policies, and guards. They are intentionally dependency-free until a specific product need earns promotion into a real service.

## Release Recovery

```bash
npm run restore:latest
npm run check:history
```

## Sync To iCloud GitHub Folder

```bash
npm run sync:icloud
```

## Next Git Step

Clone or connect the actual GitHub repository, then continue on the single active development branch:

```bash
git checkout UIXAppTTR
```
