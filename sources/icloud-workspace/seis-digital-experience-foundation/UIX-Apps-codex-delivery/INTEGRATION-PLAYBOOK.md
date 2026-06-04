# Premium Cinematic AI-Native Portfolio Playbook (Hybrid Dual)

This playbook is the execution source for `Premium Cinematic AI-Native Portfolio Redesign (Hybrid Dual)`.
Legacy orchestration and governance contracts are retained as supporting quality/ops layers.

## Priority Stack

1. Cinematic premium product experience (UI/UX + architecture)
2. Performance, accessibility, SEO, i18n parity
3. Governance/automation/ledger contracts (support layer)

Backlog weighting target:
- `80%+` cinematic product redesign and UX quality
- `20%-` operations assurance, reporting, and approval governance

## Runtime Model

- Phase model: `Parallel -> Next Primary -> Static Fallback`.
- Next.js is the primary product runtime for cinematic experience.
- Static layer remains fallback/legacy safety path (not the primary product face).

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
- Universal execution contract: `contracts/universal-execution-contract.md`.
- Core run order (fixed):
  1. Browser validation
  2. Local QA scripts (`quality-gate`, `regression-smoke`, `infrastructure-check`, `semantic-seo-check`)
  3. Security review (Codex Security aligned)
  4. Notion run log
  5. Linear action package
  6. GitHub issue/checklist package
  7. Slack summary
- Extended core bindings (mandatory step coverage): Supabase, Sentry, Vercel, Semrush, Twilio Developer Kit, HubSpot.
- Guarded write lifecycle: `suggested -> approved -> implemented`.
- Implementation gate: Notion + GitHub dual approval is required.
- Approval expiry: 14 days.
- Stale suggested escalation: 10 days.
- If a connector is unavailable: mark `skipped_with_reason` and continue.
- If budget gate is exceeded for non-core work: degrade to `light_probe` without skipping mandatory coverage.
- Local fallback command: `node scripts/run-core-orchestration.js`.
- Automation health check: `node scripts/automation-health-check.js`.
- Weekly trend sync command: `node scripts/weekly-portfolio-trend-sync.js`.
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
   - Supabase
   - Sentry
   - Vercel
   - Semrush
   - Twilio Developer Kit
   - HubSpot
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

## Unified Master v3

- Single-phase merge reference: `docs/unified-master-plan-v3.md`.
- Static <-> Next i18n policy reference: `docs/unified-i18n-mapping-policy.md`.
- Static <-> Next parity checklist: `docs/static-next-parity-checklist.md`.
- Execution priority for this merge wave: `Static -> Next -> Automation`.

## Scheduled Automations

- Weekday `17:40` (Europe/Istanbul, Mon-Fri): Frontend Ecosystem Core Heartbeat.
- Weekly Friday `18:00`: Portfolio trend sync (Behance, Dribbble, Awwwards).
- Monthly day 1 `09:00`: Full connector sweep (100% registry coverage).
- Every 3 months, day 7 `09:00`: Official/verified MCP ecosystem audit.

## Exit Criteria

- Preview-first flow validated end-to-end.
- Rollback runbook tested.
- Security high findings = 0.
- Regression checklist pass = 100%.
- Connector-step audit logs complete in `reports/ecosystem/`.
