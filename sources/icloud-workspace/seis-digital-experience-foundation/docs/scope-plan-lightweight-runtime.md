# Scope Plan Lightweight Runtime

Purpose: generate a scoped release plan without adding a planning vendor, database service, or background worker.

## Runtime Surface

- Public schema and submission endpoint: `GET/POST /api/scope-plans`
- Admin review endpoint: `GET /api/admin/scope-plans`
- Storage mode: JSONL through the existing runtime store
- Homepage surface: `ScopePlanSection`

## Planning Model

The scope planner combines:

- delivery model
- complexity profile
- maintenance mode
- selected focus areas

The result returns a score, a scope level, a recommendation, phases, and operational notes.

## Low-Power Rules

- No database daemon is required.
- No new dependency is required.
- No background planner runs.
- Admin reads stay token-protected through the existing `SEIS_ADMIN_TOKEN` guard.
- The workflow is isolated enough to revert as one scoped runtime commit.
