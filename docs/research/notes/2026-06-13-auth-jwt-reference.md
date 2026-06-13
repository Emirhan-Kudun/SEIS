# Auth and JWT Reference Note

Date: 2026-06-13
Decision link: `docs/decisions/auth-jwt-decision-record.md`

## Question

What identity provider and token strategy fit a Convex-first, single-owner
SEIS cockpit without adding a credential store or premature role system?

## Sources Consulted

- `docs/decisions/backend-state-decision-record.md` — Convex-first decision;
  auth should ride the same backend rather than introduce a parallel stack.
- `apps/fullstack/README.md` — lane direction noting auth/JWT as task 2 and
  Convex as the reactive backend.
- `apps/fullstack/state-model.json` — confirms a single-owner consumer
  contract; no multi-tenant fields, so role machinery is not yet justified.
- `docs/security/security-quality-gate.md` — no-secrets-in-tree posture and the
  deployment gate that auth provisioning would interact with.
- `docs/decisions/framework-decision-record.md` — dependency budget requiring
  approval before adding any runtime, including an auth SDK.

## Conclusion

Convex Auth with GitHub OAuth and short-lived verified JWTs is the lowest-new-
surface fit: the owner already holds a GitHub identity, the token model matches
Convex sessions, and a single owner principal avoids speculative roles. Secrets
stay in backend env, consistent with the secret-scan posture. No package is
installed until the backend is provisioned.

## Open Follow-ups

- Define the role model only when a second writer is real.
- Revisit token lifetime if a long-lived automation principal is ever needed
  (would also require the automation_expansion gate).
