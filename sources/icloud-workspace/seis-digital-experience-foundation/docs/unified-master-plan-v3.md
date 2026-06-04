# Unified Master Plan v3 (Single-Phase Full Merge)

## Purpose
This document is the single reference produced by strictest-wins merge of all active plan sets in this repository.

## Included Source Set
- INTEGRATION-PLAYBOOK.md
- INTEGRATION-PLAYBOOK 2.md
- contracts/*
- docs/seis-phase2-*
- docs/seis-website-sprint-*
- docs/seis-mega-feature-pack-v2..v12
- docs/seis-*-pack-v14
- docs/seis-cloud-track-*

## Strictest-Wins Resolution Matrix
| Domain | Winner Source | Decision Rule |
|---|---|---|
| Branch/Main safety | contracts/git-pr-workflow-contract.md + config/branch-governance-policy.json | protected branch and rollback-safe constraints are non-negotiable |
| Security/SLA/approval gates | contracts/universal-execution-contract.md + contracts/unified-operations-contract.md | high findings block release; dual approval enforced |
| Product direction | INTEGRATION-PLAYBOOK.md | cinematic quality targets and runtime strategy |
| Sprint windows and cadence | plan-ledger.json + docs/seis-website-sprint-plan-2026-05-15.md | ledger is runtime source; docs are narrative references |
| Automation sequence | contracts/unified-operations-contract.md | fixed core order remains stable |
| i18n contract | index.html + translations.json + quality-gate policy | key parity across tr/en/fr/it/de is mandatory |

## Runtime Execution Order (Locked)
1. Static-first delivery quality (`index.html`, `style.css`, `script.js`, `translations.json`)
2. Next secondary parity and architecture alignment (`apps/seis-nextjs-foundation`)
3. Automation/governance synchronization (contracts + ledgers + reports)

## Canonical Contracts
- i18n parity: tr/en/fr/it/de
- Behance contract: 37 embeds, first 9 eager
- Contact fallback chain: Next/API -> mailto -> contact.php fallback contract
- Universal execution step fields: target, target_type, status, execution_mode, reason, duration_ms, next_action
- Guarded write scope: reports + ledgers

## Conflict Notes
- Runtime wording conflict (Next-primary vs Static-first): resolved as **Static-first for interview delivery**, Next remains secondary product track.
- Plan duplication conflict (*.2 docs): resolved as **reference-only**; canonical decisions live in this document + contracts + ledgers.

## Delivery Outputs (This Phase)
- static quality and i18n parity updates
- dual zip merge package (`html/css/js/json` only)
- merged manifest and conflict reports
