# SEIS

SEIS is the canonical GitHub hub and general repository for all projects under `emirhankudun-ux`.

All project discovery, governance, migration records, branch consolidation planning, release readiness, plugin coordination, and long-term repository decisions start here. Other repositories remain available as source repositories until their branch history and contents are fully verified under SEIS.

## Canonical Role

- Canonical repository: `emirhankudun-ux/SEIS`
- Default branch: `UIXAppTTR`
- Central project index: [`PROJECTS.md`](./PROJECTS.md)
- Consolidation manifest: [`data/github-repository-consolidation.json`](./data/github-repository-consolidation.json)
- Migration audit: [`docs/github-branch-migration-audit.md`](./docs/github-branch-migration-audit.md)
- Migration runner: [`scripts/migrate-github-branches-to-seis.sh`](./scripts/migrate-github-branches-to-seis.sh)

## Repository Policy

SEIS is now the general center for these repositories:

- `UIX-Apps`
- `emirhan-kudun-portfolio`
- `github-unified-source`
- `seis-trusted-marketplace-plugin`
- `gemini-cli`
- `DeepSeek-Coder`
- `claude-code`
- `docs`
- `awesome-deepseek-agent`

Each source repository has a `MOVED_TO_SEIS.md` marker on its default branch. Keep those repositories available until the expected `sources/<repo>/<branch>` refs are verified in SEIS.

## What Is Included

- governance-first automation scripts
- a lightweight cinematic web foundation
- a gap closure register
- provider-neutral cloud environment contracts
- connector and MCP capability registry
- trusted marketplace intake for GitHub, MCP, Copilot, and model sources
- local SEIS Trusted Marketplace plugin bridge for the `UIXAppTTR` branch
- release refresh support without dependency bloat
- GitHub repository consolidation audit and migration scripts

## Quick Start

```bash
npm run automation:develop
```

## Core Commands

```bash
npm run check:workspace
npm run check:release-sync
npm run check:ai-stack
npm run check:cloud-environment
npm run check:monthly-branch-hardening
npm run check:trusted-marketplace-intake
npm run check:seis-trusted-marketplace-plugin
npm run automation:code-plan
npm run automation:server-cloud-report
npm run automation:refresh-release
npm run automation:publish-readiness
```

## GitHub Consolidation

Use the migration runner in dry-run mode first:

```bash
DRY_RUN=1 scripts/migrate-github-branches-to-seis.sh
```

After GitHub push authentication is available, preserve source repository branch history under namespaced SEIS refs:

```bash
DRY_RUN=0 scripts/migrate-github-branches-to-seis.sh
```

Repository deletion is intentionally separate and requires explicit verification plus `DELETE_SOURCE_REPOS=1`.

## AI CLI Router

Use one workspace command to switch between installed AI tools:

```bash
npm run ai -- list
npm run ai -- auto "local coding assistant"
npm run ai -- auto "local coding assistant" :: --version
npm run ai -- codex
npm run ai -- claude
npm run ai -- gemini
npm run ai -- ollama
npm run ai -- kimi
npm run ai -- aider
npm run ai -- interpreter
```

Reference: `docs/development/ai-cli-stack.md` and `scripts/ai-routing-policy.cjs`

## Safety Rules

- no automatic push
- no automatic deploy
- no source repository deletion before verified SEIS refs
- no heavy local process by default
- reduced-motion support is mandatory
