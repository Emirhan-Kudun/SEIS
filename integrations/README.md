# Integrations

SEIS CLOSED CODE uses integrations as operating surfaces, not as replacements for repository truth.

## Current Integrations

- Google Drive: operating plan and platform backlog
- Google Calendar: weekly build review
- GitHub: repository, refs, plugin source mirror
- Codex plugin: local SEIS workflow helpers

See [`google-workspace.json`](./google-workspace.json) for current Drive and Calendar IDs.

## Operating Layer

[`workspace-operations.json`](./workspace-operations.json) defines the five
operating lanes (docs, backlog, calendar, mail, team updates): surface, status,
registered artifacts, plugin route, cadence, and the SEIS record rule each lane
must follow. Mail and team updates stay `not_provisioned` until a durable
artifact is registered. Guarded by `npm run check:workspace-operations`.
