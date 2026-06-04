# SEIS Mega Feature Pack v11 - Cloud + Worktree Expansion

## Scope

This package extends the existing command architecture with cloud-scale operations and handoff governance surfaces.

### New command domains

- cloud command
- cloud cost command
- handoff command
- skills command

### New labs

- `/cloud-lab`
- `/cloud-cost-lab`
- `/handoff-lab`
- `/skills-lab`

### New APIs

- `GET /api/cloud-command`
- `GET /api/cloud-cost-command`
- `GET /api/handoff-command`
- `GET /api/skills-command`

## Integrated surfaces

The new domains are wired into:

- content snapshot
- metrics
- search domain (command)
- system manifest
- release readiness
- quality scorecard
- orchestration readiness
- mega capability dashboard
- orchestration page command coverage
- control/ops/strategy/playbooks/studio route links
- command palette
- main navigation
- sitemap

## Worktree handoff utility

A new utility script is added:

- `scripts/create-worktree-handoff.sh`

Usage:

```bash
bash scripts/create-worktree-handoff.sh [branch] [path] [base-ref]
```

Default behavior:

- branch: `codex/seis-cloud-worktree-handoff`
- path: `../new-project-seis-cloud-worktree`
- base-ref: `HEAD`

## Governance notes

- protected branches remain untouched
- all changes are incremental and reversible
- no new external dependency was added
- cloud and handoff surfaces follow existing command-lab architecture pattern
