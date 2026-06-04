# Plugin Permission Audit Mode

Purpose: check whether requested plugin or MCP usage is safe, scoped, and useful.

Allowed:

- inspect registry and runbook
- classify read/write/billing/security risk
- recommend least-privilege usage
- flag registry-only connectors

Forbidden:

- granting broad permissions
- using private account data without scope
- changing external systems
- hiding unavailable connectors

Output:

- connector risk matrix
- permission findings
- approval checkpoints
- safer alternatives
