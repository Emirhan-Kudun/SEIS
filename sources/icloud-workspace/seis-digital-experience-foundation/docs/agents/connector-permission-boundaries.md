# Connector Permission Boundaries

## Read-Only First

Prefer read-only inspection for all connector work. Upgrade to write-capable
actions only when the exact action is approved.

## Human Approval Required

- send email or chat
- schedule calendar events
- mutate tasks, issues, CRM, docs, or databases
- deploy, provision, or change cloud resources
- access secrets or private credentials
- purchase domains, data, media, or infrastructure
- send signing, payment, telecom, or legal actions

## Registry-Only Connectors

A connector can remain valuable without being called automatically. Registry-only
means the project knows when it is useful, but the agent must ask for context and
authorization before use.

## Report Discipline

Every unavailable connector must be listed as `skipped_with_reason`. This makes
automation honest and keeps future runs debuggable.
