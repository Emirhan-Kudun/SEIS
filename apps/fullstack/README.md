# Full-stack Lane

The full-stack lane coordinates backend, auth, deployment, and live product state.

## Initial Direction

Convex is the preferred first backend for reactive state. Supabase can be added for Postgres-heavy data, SQL reporting, storage, or auth requirements.

## Convex Setup Notes

For a Next.js App Router app:

```bash
npm install convex
npx convex dev --once
npx convex ai-files install
```

Add a client provider in the app shell and ensure `NEXT_PUBLIC_CONVEX_URL` is available before the web server starts.

## Plugin Stack

- Convex
- Supabase
- Vercel
- Build Web Apps
- GitHub
- SEIS plugin

## First Build Tasks

1. ~~Decide backend ownership~~: decided Convex-first — see
   [`docs/decisions/backend-state-decision-record.md`](../../docs/decisions/backend-state-decision-record.md)
   and the committed state model [`state-model.json`](./state-model.json)
   (guarded by `npm run check:backend-state-model`).
2. ~~Define auth provider and JWT strategy~~: decided Convex Auth + GitHub
   OAuth + short-lived JWT — see
   [`docs/decisions/auth-jwt-decision-record.md`](../../docs/decisions/auth-jwt-decision-record.md).
3. ~~Add repo visibility and migration status models~~: covered by the
   `repositories` and `source_branches` entities in `state-model.json`.
4. ~~Add Drive/Calendar integration metadata~~: covered by the
   `workspace_links` entity in `state-model.json`.
5. ~~Materialize the backend schema~~: generated at
   [`convex/schema.ts`](./convex/schema.ts) from `state-model.json` by
   `npm run automation:convex-schema` (guarded by `npm run check:convex-schema`).

## Generated Convex Schema

`convex/schema.ts` is generated from the committed state model so the live
backend uses the exact entity shapes the static cockpit already renders (the
`consumer_contract`). It is **deferred source**: it compiles once `convex` is
installed at provisioning, and no dependency is added before then.

`convex/queries.ts` adds one owner-only `list` read per entity (compiles after
`npx convex dev` codegen at provisioning). Regenerate both after any change to
`state-model.json`:

```bash
npm run automation:convex-schema
npm run automation:convex-queries
```

Both generators are registered in `data/automation-registry.json` under the
automation kill-switch contract.
