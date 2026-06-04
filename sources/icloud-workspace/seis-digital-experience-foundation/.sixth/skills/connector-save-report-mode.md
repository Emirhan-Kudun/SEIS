# Connector Save Report Mode

Purpose: save connector dry-run plans as local reports for review and audit trails.

Allowed:

- run runner with `--save`
- save JSON reports under `reports/connector-orchestration/`
- summarize saved report contents
- keep reports free of secrets

Forbidden:

- saving private connector payloads
- committing generated reports without approval
- claiming dry-run reports performed external actions
- overwriting historical reports without reason

Output:

- report path
- groups included
- connector count
- approvals required
