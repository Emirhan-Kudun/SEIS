# Runtime Admin Lightweight Review

Purpose: review SEIS runtime records without adding a database, dashboard service, or background worker.

## Surface

- Route: `/runtime-admin`
- Runtime summary: `/api/admin/runtime`
- Contacts: `/api/admin/submissions`
- Briefs: `/api/admin/briefs`
- Readiness assessments: `/api/admin/readiness`
- Events: `/api/admin/events`

## Access Model

The admin dashboard asks for `SEIS_ADMIN_TOKEN` in the browser and sends it as a bearer token to existing protected APIs. The token is not stored in the repository.

## Low-Power Rules

- No dev server is required to keep the branch valid.
- No database daemon is required.
- No external admin vendor is required.
- The dashboard reads only on demand after a token is entered.
- Failed auth should stop at a clear inline error.

## Rollback Safety

The route and dashboard are isolated from the public intake forms. Reverting the scoped runtime-admin commit removes the UI while preserving existing JSONL records.
