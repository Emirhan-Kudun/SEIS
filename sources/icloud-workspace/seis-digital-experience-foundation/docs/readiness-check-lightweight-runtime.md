# Readiness Check Lightweight Runtime

Purpose: add a low-power launch readiness workflow without a database service, background worker, or heavy runtime dependency.

## Runtime Surface

- Public schema and submission endpoint: `GET/POST /api/readiness`
- Admin review endpoint: `GET /api/admin/readiness`
- Storage mode: JSONL through the existing runtime store
- Homepage surface: `ReadinessSection`

## Assessment Model

The readiness score combines:

- project stage
- content readiness
- design readiness
- integration readiness
- launch window

The result returns a score, a readiness level, a recommendation, and next actions.

## Low-Power Rules

- No database daemon is required.
- No new dependency is required.
- No background scoring process runs.
- Admin reads stay token-protected through the existing `SEIS_ADMIN_TOKEN` guard.
- The workflow is safe to remove by reverting one scoped commit.
