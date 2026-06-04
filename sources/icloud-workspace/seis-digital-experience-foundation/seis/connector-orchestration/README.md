# SEIS Connector Orchestration Control Plane

This directory converts the large plugin and connector ecosystem into a safe,
reviewable, single-run planning layer.

It does not store credentials. It does not call external services by default.
It creates a deterministic plan that tells the agent which connector family to
use, what is blocked, and what needs approval.

## Files

- `manifest.json`: global policy and report fields.
- `groups/*.json`: connector groups and roles.
- `aliases.json`: duplicate plugin mention normalization.
- `risk-matrix.json`: action and connector risk language.
- `source-policy.json`: source-specific default behavior.
- `.claude/agents/google-open-source-copilot.md`: subordinate Google
  open-source reviewer under `UIXAppTTR`.
- `../google-open-source-foundation/manifest.json`: Google-origin and
  open-source pre-coding adoption lanes and branch topology.
- `../big-tech-open-source-foundation/manifest.json`: official major-firm
  open-source candidate matrix.
- `../pazar-pay-intelligence/manifest.json`: market-share and competitor
  intelligence signal registry.
- `command-recipes.json`: safe command examples.
- `runner.cjs`: local dry-run planner.
- `permission-model.md`: approval and blocked-action rules.
- `runbook.md`: operating guide.
- `report-template.json`: expected run output shape.

## Why This Exists

Large connector lists are useful only when routed safely. A single-run control
plane keeps the branch powerful without making every plugin always-on.
Google Open Source Copilot stays inside the same parent branch as an on-demand
sub-agent lane.

## Useful Commands

```bash
node seis/connector-orchestration/runner.cjs --list-groups
node seis/connector-orchestration/runner.cjs --dry-run --group google-open-source-foundation --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --group big-tech-open-source-foundation --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --group pazar-pay-intelligence --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --source claude-plugins-official --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --mode registry-only --format markdown
```
