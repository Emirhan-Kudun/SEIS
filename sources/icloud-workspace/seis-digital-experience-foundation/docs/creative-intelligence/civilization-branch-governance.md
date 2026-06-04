# Civilization Branch Governance

This document expands the SEIS branch model as a proposed operating doctrine. Enforcement should be updated only through a separate governance change.

## Current Operating Line

- Primary branch: `UIXAppTTR`
- Protected branches: `main`, `master`
- Current development rule: keep work small, reversible, and quality-gated.

The repository currently exposes `.cjs` governance scripts while older docs and AGENTS instructions reference `.js` names. Treat that as a governance migration item, not a reason to edit scripts inside unrelated tasks.

## Branch Taxonomy

Recommended long-term branch families:

- `main`: protected production history.
- `stable`: validated integration line.
- `release/<version-or-date>`: release preparation.
- `feature/<scope>`: product feature work.
- `design/<scope>`: visual system and art direction.
- `ui/<scope>`: component and interface implementation.
- `ux/<scope>`: interaction, accessibility, and flow work.
- `motion/<scope>`: animation and motion primitives.
- `cinematic/<scope>`: editorial composition and atmospheric systems.
- `3d/<scope>`: spatial and WebGL experiments.
- `ai/<scope>`: AI-native orchestration and agent workflows.
- `data/<scope>`: content, analytics, and structured data work.
- `infra/<scope>`: deployment, CI, and infrastructure.
- `docs/<scope>`: documentation-only changes.
- `governance/<scope>`: policy, branch, quality, and release rules.
- `humane/<scope>`: calm technology and cognitive sustainability work.
- `research/<scope>`: validated research output.
- `experiment/<scope>`: bounded exploratory work.
- `prototype/<scope>`: disposable implementation proof.
- `observability/<scope>`: monitoring, budgets, and reports.
- `rollback/<scope>`: targeted recovery branch.

## Merge Policy

Every merge should answer:

- What changed?
- Why is the change necessary?
- Which user-facing surface is affected?
- Which performance, accessibility, or i18n risk was checked?
- How can this be rolled back?

High-risk merges require:

- branch governance check
- local quality gate
- dependency diff review
- affected route or page inventory
- rollback note

## Experiment Policy

Experiments are allowed when they are isolated:

- no production route takeover
- no shared token mutation without review
- no new dependency without justification
- clear exit decision: promote, park, or delete

## Rollback Strategy

Rollback branches should be surgical:

- name the exact issue
- revert the smallest viable change
- document user-visible impact
- run the same quality checks as the original change

## Deployment Flow

Recommended flow:

1. Work on `UIXAppTTR` or an approved task branch.
2. Run branch governance and local quality gate.
3. Generate or update a merge-ready report when scope is broad.
4. Merge to `stable` only after review.
5. Create `release/<date>` for deploy preparation.
6. Promote to `main` only after production checks and rollback notes exist.

## Observability Integration

Branch health should track:

- age of branch
- changed file count
- critical file touch count
- dependency changes
- quality gate status
- accessibility and i18n risk
- rollback availability

Avoid noisy branch dashboards. Report only actionable risk.
