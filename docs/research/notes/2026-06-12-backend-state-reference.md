# Backend State Reference Note

Date: 2026-06-12
Decision link: `docs/decisions/backend-state-decision-record.md`

## Question

Which backend family should hold reactive SEIS cockpit state, and what stays
in a SQL lane?

## Sources Consulted

- `docs/platform/openai-curated-build-workbench.md` — workbench backend
  decision row (Convex-first unless SQL/reporting dominates).
- `apps/fullstack/README.md` — lane direction and Convex setup notes recorded
  on 2026-06-05.
- `apps/fullstack/state-model.json` — entity inventory showing the state is
  document-shaped (six small registries) rather than relational-heavy.
- `docs/decisions/framework-decision-record.md` — dependency budget rule that
  gates adding any server runtime package.

## Conclusion

Convex-first for reactive cockpit state; Supabase/Neon Postgres reserved for
durable analytics and SQL reporting. The deciding observations: all six state
entities are small document registries seeded from repo JSON records, the
cockpit needs push-style reactivity more than joins, and the dependency
budget requires deferring any package install until provisioning criteria in
the decision record are met.

## Open Follow-ups

- Auth/JWT strategy (fullstack task 2) needs its own sourced note before
  provisioning.
