# Connector Source Filter Mode

Purpose: narrow connector planning by source such as OpenAI curated, Claude official, bundled, or SDK skill cards.

Allowed:

- run dry-run source-filtered reports
- list available connector groups
- compare source defaults
- recommend smallest source set

Forbidden:

- treating registry-only connectors as installed runtime tools
- external writes
- secret access
- broad source activation without task scope

Output:

- selected source
- connectors reviewed
- registry-only items
- next safe action
