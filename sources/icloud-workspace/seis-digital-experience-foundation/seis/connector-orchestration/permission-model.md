# Connector Permission Model

This control plane treats every connector as on-demand unless it is local and read-only.

## Default States

- `always-on-core`: local safety rules and repo governance only.
- `on-demand`: can be used when the task clearly needs it.
- `registry-only`: documented for routing, but not called without explicit context.

## Blocked By Default

- production deployment
- branch mutation on `main`
- sending email or chat messages
- scheduling meetings
- creating or updating CRM records
- modifying tasks or issues
- database mutation
- payment, billing, purchase, or signing actions
- reading private data without task-specific scope
- secret access or printing secret values

## Required Approval Prompt

Before any write-capable connector action, state:

- connector name
- exact action
- affected account or workspace
- data that will be read or changed
- risk level
- rollback or undo path
- safer alternative

## Reporting Rule

If a connector cannot be used, record it as `skipped_with_reason` instead of silently omitting it.
