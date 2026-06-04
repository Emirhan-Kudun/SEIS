# Ecosystem Reports

This folder stores dated automation outputs for the portfolio ecosystem.

## File naming

- Daily heartbeat: `YYYY-MM-DD-heartbeat.json`
- Local core orchestration: `YYYY-MM-DD-core-run.json`
- Weekly trend sync: `YYYY-MM-DD-weekly-trend.json`
- Monthly connector sweep: `YYYY-MM-DD-monthly-sweep.json`
- Quarterly MCP audit: `YYYY-MM-DD-quarterly-mcp-audit.json`
- Content intake (read-only): `YYYY-MM-DD-content-intake.json`

## Minimum payload fields

- `run_id`
- `timestamp`
- `timezone` (`Europe/Istanbul`)
- `steps` (array of connector-step records)
- `risk_summary` (`high|medium|low`)
- `summary`
- `suggested_actions`

## Connector-step record shape

Each step should include:

- `connector`
- `status` (`invoked|skipped_with_reason`)
- `reason`
- `duration_ms`
- `next_action`

## Guarded write note

During this phase, automations update only report and ledger files.
Website code files (`index.html`, `style.css`, `script.js`, etc.) must remain unchanged.
