# Single-Run Connector Orchestration Mode

Purpose: plan many plugin and MCP connector actions in one safe dry-run pass.

Allowed:

- read connector registry files
- run `node seis/connector-orchestration/runner.cjs --dry-run`
- select minimal connector groups
- produce skipped_with_reason entries
- recommend approvals

Forbidden:

- calling every connector blindly
- external write actions
- production deploys
- reading or printing secrets
- purchases or billing-impacting actions

Output:

- selected groups
- connectors reviewed
- planned steps
- skipped_with_reason
- approvals required
- next safe action
