# Automation Orchestration Contract

## Runtime Policy

- Mode: `always-on core + on-demand rotation registry`
- Write strategy: `guarded write`
  - `suggested`
  - `approved`
  - `implemented`
- Guarded write scope in this phase: report and ledger files only.

## Core Sequence (required)

1. Browser validation
2. Local QA scripts
3. Security review step
4. Notion run log
5. Linear action package
6. GitHub issue/checklist package
7. Slack summary package

## Per-Connector Step Record (required)

Each step must emit:

- `connector`
- `status` (`invoked|skipped_with_reason`)
- `reason`
- `duration_ms`
- `next_action`

If access/auth is unavailable, output `skipped_with_reason` and continue.

## Quality and Risk Gates

- SLA alert threshold: `p95 > 8s` or `fail_rate > 5%`.
- Release block threshold: any High security finding.
- Non-critical connector failures do not fail the full run.
- Critical core failures must be marked clearly and escalated in summary.

## Approval Contract

- `implemented` requires dual approval from Notion and GitHub.
- Approved entries older than 14 days must be revalidated.
- Suggested entries older than 10 days must trigger stale escalation.

## Reporting Contract

- `run_id`, `timestamp`, `timezone`, `steps`, `risk_summary`, `summary`, `suggested_actions` are mandatory.
- Detailed audit level is mandatory for scheduled runs.
- Escalation destination: Slack + GitHub issue package.
