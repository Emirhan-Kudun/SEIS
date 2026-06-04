# Portfolio Integration Playbook (Rolling Quarterly)

This playbook is the execution source for Core -> Growth -> Ops rollout with guarded automation.

## Sprint Calendar

- Sprint 1: 2026-05-06 -> 2026-05-12
- Sprint 2: 2026-05-13 -> 2026-05-19
- Sprint 3: 2026-05-20 -> 2026-05-26
- Sprint 4: 2026-05-27 -> 2026-06-02
- Sprint 5: 2026-06-03 -> 2026-06-09
- Sprint 6: 2026-06-10 -> 2026-06-16
- Sprint 7: 2026-06-17 -> 2026-06-23
- Sprint 8: 2026-06-24 -> 2026-06-30
- Sprint 9: 2026-07-01 -> 2026-07-07
- Sprint 10: 2026-07-08 -> 2026-07-14
- Sprint 11: 2026-07-15 -> 2026-07-21
- Sprint 12: 2026-07-22 -> 2026-07-28
- After Sprint 12: continue weekly as rolling quarterly cadence.

## Orchestration Policy

- Operating mode: `always-on core + on-demand rotation registry`.
- Core run order (fixed):
  1. Browser validation
  2. Local QA scripts (`quality-gate`, `regression-smoke`, `infrastructure-check`, `semantic-seo-check`)
  3. Security review (Codex Security aligned)
  4. Notion run log
  5. Linear action package
  6. GitHub issue/checklist package
  7. Slack summary
- Guarded write lifecycle: `suggested -> approved -> implemented`.
- Implementation gate: Notion + GitHub dual approval is required.
- Approval expiry: 14 days.
- Stale suggested escalation: 10 days.
- If a connector is unavailable: mark `skipped_with_reason` and continue.
- Local fallback command: `node scripts/run-core-orchestration.js`.
- Automation health check: `node scripts/automation-health-check.js`.
- Monthly connector sweep command: `node scripts/monthly-connector-sweep.js`.
- Quarterly audit command: `node scripts/quarterly-mcp-audit.js`.
- Content intake command (read-only): `node scripts/content-intake-readonly.js`.

## Stack Layers

1. Always-On Core
   - Browser Use
   - Build Web Apps
   - Codex Security
   - Notion
   - Linear
   - GitHub
   - Slack
2. Rotation Registry (monthly coverage target: 100%)
   - OpenAI Developers
   - Twilio Developer Kit
   - Supabase
   - HyperFrames
   - Temporal
   - Render
   - YepCode
   - Vantage
   - Statsig
   - Read AI
   - Ranked AI
   - Quicknode
   - MarcoPolo
   - Daloopa
   - Cloudinary
   - BioRender
   - Plugin Eval
   - Remotion
   - Neon Postgres
   - CodeRabbit
   - Expo
   - Zotero
   - Life Science Research
   - ChatGPT Apps
   - Sentry
   - Cloudflare
   - CircleCI
   - Box
   - Superpowers
   - Vercel
   - Netlify
   - Figma
   - Canva
   - Atlassian Rovo
   - LaTeX Tectonic
   - Presentations
   - Spreadsheets
   - Documents

## Detailed Audit Packages

1. Content quality package
   - Hybrid intake: Behance registry + read-only zip/folder scanning.
   - Quality threshold: 85/100.
   - Duplicate policy: auto dedup + merge note.
   - Alcohol/food-focused assets are flagged as blocked.
2. Cost and performance package
   - SLA alert threshold: `p95 > 8s` or `fail_rate > 5%`.
3. Release security package
   - Any High finding blocks release.
   - Escalation channel: Slack + GitHub issue.

## Contracts (must stay stable)

- i18n parity: TR/EN/FR/IT/DE complete in same change set.
- Behance embed order and count unchanged unless explicit decision.
- Contact form static contract preserved (`#contact` + hybrid endpoint resolution including `contact.php` fallback).
- Deploy contract: Vercel primary, Netlify fallback.
- Automation step contract: each connector step reports `status`, `reason`, `duration_ms`, `next_action`.
- Git + PR workflow contract: `contracts/git-pr-workflow-contract.md`.
- Plan source sync contract: `INTEGRATION-PLAYBOOK.md` <-> `plan-ledger.json`.

## Scheduled Automations

- Daily `09:00` (Europe/Istanbul): Frontend Ecosystem Core Heartbeat.
- Weekly Friday `18:00`: Portfolio trend sync (Behance, Dribbble, Awwwards).
- Monthly day 1 `09:00`: Full connector sweep (100% registry coverage).
- Every 3 months, day 7 `09:00`: Official/verified MCP ecosystem audit.

## Exit Criteria

- Preview-first flow validated end-to-end.
- Rollback runbook tested.
- Security high findings = 0.
- Regression checklist pass = 100%.
- Connector-step audit logs complete in `reports/ecosystem/`.
