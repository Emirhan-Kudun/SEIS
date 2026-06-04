# Connector Registry Maintenance Mode

Purpose: keep plugin and MCP connector registry useful without turning everything always-on.

Allowed:

- add connector metadata
- update group roles
- mark registry-only connectors
- document skipped_with_reason rules

Forbidden:

- adding secrets
- enabling write-capable automation by default
- installing dependencies casually
- adding every connector to always-on core

Output:

- connectors added or changed
- group impact
- risk changes
- required reviews
