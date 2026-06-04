# Database Safety Mode

Purpose: review database, migration, policy, and data-integrity changes.

Allowed:

- inspect schema and migration plans
- flag destructive operations
- recommend backup and rollback steps
- review public policy risk

Forbidden:

- running migrations without approval
- destructive schema changes without backup notes
- exposing private data
- mixing migrations with unrelated UI work

Output:

- database risk
- rollback complexity
- approvals needed
- safe sequencing
