# Unified Operations Contract (New Project)

This file is the normalized source set for orchestration + sprint + branch governance in `New project`.

## Source Merge

- Base sources:
  - `INTEGRATION-PLAYBOOK.md`
  - `INTEGRATION-PLAYBOOK 2.md`
  - `contracts/automation-orchestration-contract.md`
  - `contracts/git-pr-workflow-contract.md`
  - `contracts/universal-execution-contract.md`
  - `docs/seis-phase2-migration-plan.md`
  - `docs/seis-website-sprint-preflight.md`
  - `docs/seis-website-sprint-plan-2026-05-15.md`
  - `docs/seis-mega-feature-pack-v2..v12.md`
  - `docs/seis-*-pack-v14.md`
  - `docs/seis-cloud-track-*.md`
- Conflict policy: `strictest-wins`.
- Unified decision output: `docs/unified-master-plan-v3.md`.

## Core Model

- Mode: `always-on core + on-demand rotation registry`
- Single-phase full merge execution order: `Static -> Next -> Automation`
- Universal step coverage: all connector + all MCP targets must emit at least one step record per run.
- Guarded write lifecycle: `suggested -> approved -> implemented`
- Guarded write scope: `reports/ecosystem/*` + ledger files only
- Dual approval: Notion + GitHub required for `implemented`
- Approval expiry: 14 days
- Stale suggested escalation: 10 days

## Fixed Core Sequence

1. Browser validation
2. Local QA (`quality-gate`, `regression-smoke`, `infrastructure-check`, `semantic-seo-check`)
3. Security review
4. Notion run log
5. Linear action package
6. GitHub issue/checklist package
7. Slack summary
8. Universal connector sweep
9. Universal MCP sweep

## Schedule (Europe/Istanbul)

- Weekday core heartbeat: `17:40` (Mon-Fri)
- Weekly trend sync: Friday `18:00`
- Monthly full connector sweep: Day 1 `09:00`
- Quarterly MCP audit: every 3 months, Day 7 `09:00`

## Sprint Policy

- `plan-ledger.json` is 12 sprints + rolling quarterly continuation.
- `INTEGRATION-PLAYBOOK.md` and `plan-ledger.json` must remain in sync.

## Branch Policy

- Primary branch: `codex/premium-local-foundation`
- `main/master` protected; no direct development
- Single branch mode enabled with strict critical-file safeguards

## Website Delivery Contract

- Delivery files: `index.html`, `style.css`, `script.js`, `translations.json`
- i18n parity required: `tr/en/fr/it/de`
- Behance contract: 37 embeds, first 9 eager, rest lazy
- Contact contract: static form + endpoint resolver with `contact.php` fallback
