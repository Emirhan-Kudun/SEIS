# Single-Run Connector Orchestration Runbook

Use this package to plan multi-connector work in one controlled pass.

## Safe Commands

```bash
node seis/connector-orchestration/runner.cjs --dry-run
node seis/connector-orchestration/runner.cjs --dry-run --group core-dev-security
node seis/connector-orchestration/runner.cjs --dry-run --group google-open-source-foundation --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --group big-tech-open-source-foundation --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --group pazar-pay-intelligence --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --group design-media-content --format markdown
node seis/connector-orchestration/runner.cjs --list-groups
node seis/connector-orchestration/runner.cjs --list-connectors --source claude-plugins-official
node seis/connector-orchestration/runner.cjs --dry-run --source openai-curated --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --mode registry-only --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --save reports/connector-orchestration/latest.json
```

## Operating Flow

1. Select the smallest group set.
2. Run dry-run planning.
3. Review skipped reasons and approval requirements.
4. Activate only the connectors required by the task.
5. Keep write-capable actions manual unless explicitly approved.
6. Save a report if the run affects project decisions.
7. Keep Google Open Source Copilot output under `codex/premium-local-foundation`.

## Never Do Automatically

- deploy
- push to main
- expose secrets
- send messages
- change external records
- buy domains, cloud resources, or paid data
- mutate database or payment state

## Recommended Group Order

1. `core-dev-security`
2. `google-open-source-foundation` as a sub-agent lane under `codex/premium-local-foundation`
3. `big-tech-open-source-foundation`
4. `pazar-pay-intelligence`
5. `design-media-content`
6. `knowledge-meetings-ops`
7. `cloud-deploy-data`
8. `gtm-crm-market`
9. `vertical-specialists`

## Output Standard

Each run should produce:

- groups selected
- source or mode filters
- connectors reviewed
- unique connector count
- planned safe steps
- skipped_with_reason entries
- approvals required
- risk by group
- risk summary
- next safe action
