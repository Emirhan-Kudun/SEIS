# Backend State Decision Record

Date: 2026-06-11

SEIS cockpit state is Convex-first, with Supabase or Neon reserved as the
Postgres lane for durable analytics and SQL reporting.

## Current Decision

Status: decided.

- Reactive cockpit state (plugin registry, repository visibility, workspace
  links, governance gates) targets Convex when a live backend is provisioned.
- Supabase or Neon Postgres is the reporting lane: durable analytics, SQL
  aggregation, and any future auth/storage requirements.
- Until a live backend exists, the committed state model
  [`apps/fullstack/state-model.json`](../../apps/fullstack/state-model.json)
  is the source of truth. It is seeded from the same `data/*.json` records the
  static cockpit renders, so the cockpit can switch from static bundle to live
  backend without changing its panel shapes.

## Why Convex First

| Need | Convex fit |
| --- | --- |
| Reactive cockpit panels | Live queries push state changes to the web cockpit without polling. |
| Small typed state | Plugin/repo/workspace records are document-shaped, not relational-heavy. |
| Single-developer loop | One `npx convex dev` loop; no separate migration tooling for early iterations. |
| Escape hatch | Postgres reporting lane stays open via Supabase/Neon for SQL-heavy needs. |

## State Model Scope

First model covers exactly what the workbench requires:

1. Plugin registry: installed plugins, lane assignment, policy compliance.
2. Repository visibility: canonical repo, branch mirror, source refs, consolidation state.
3. Workspace links: Drive documents and Calendar reviews with sync rules.
4. Governance gates: closed-code, deploy, binary, and deletion gates.

The model is validated by `npm run check:backend-state-model`, which also
verifies that every declared seed source file exists in the repository.

## Dependency Budget

No Convex or Supabase package is added yet. Per the framework decision
record, written approval is required before adding a server runtime
dependency. Provisioning a real Convex deployment is the trigger for that
approval, not a prerequisite for this model.

## Acceptance Criteria For Provisioning

Provision the live Convex backend when any of these become true:

- The cockpit needs state that changes between commits (live branch refs, CI status).
- More than one writer updates plugin or repository records.
- Workspace automation needs server-side scheduled sync instead of manual regeneration.

## Rollback Path

- `state-model.json` stays the portable contract; Convex tables are generated
  from it, never the other way around.
- If Convex does not fit, the same contract maps onto Supabase tables; the
  cockpit consumes either through the same panel shapes.
