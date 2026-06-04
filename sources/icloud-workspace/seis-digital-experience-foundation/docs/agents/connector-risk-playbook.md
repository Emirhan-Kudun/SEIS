# Connector Risk Playbook

## Low Risk

Use for local planning, registry review, public docs, and source-code inspection.

Allowed:

- dry-run runner output
- local registry reads
- public documentation lookup
- local browser QA with no account mutation

## Medium Risk

Use when authenticated read-only access, generated design/media review, or private
workspace context may be involved.

Requires:

- task-specific scope
- connector name
- data to be read
- reason the connector is needed

## High Risk

Use for private business data, cloud settings, analytics, CRM, meetings, files,
or customer data.

Requires:

- explicit user approval
- least-privilege connector choice
- skipped_with_reason if auth or context is missing
- no broad exports

## Critical Risk

Includes deployment, database mutation, sending messages, purchases, billing,
payments, signing, legal actions, and secret access.

Default action: block until explicit approval.

Approval must include:

- exact action
- target workspace/account
- rollback or undo path
- safer alternative
