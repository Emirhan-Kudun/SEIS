# Auth and JWT Decision Record

Date: 2026-06-13

SEIS uses Convex Auth for the cockpit, with short-lived JWT access tokens
verified by the backend and a single owner identity until multi-user need is
real.

## Current Decision

Status: decided (provisioning deferred).

- Identity provider: **Convex Auth** (the auth layer that ships with the
  Convex-first backend chosen in `backend-state-decision-record.md`), using an
  OAuth provider (GitHub) for sign-in rather than passwords.
- Token shape: **short-lived JWT access tokens** (minutes), refreshed by the
  Convex client; the backend verifies the JWT signature and `aud`/`iss` claims
  on every function call.
- Authorization: a single **owner** principal for now. Cockpit reads are
  owner-only; no public or anonymous surface. Role expansion waits until a
  second writer is real (the same trigger as backend provisioning).
- Until a live backend exists, there is no auth runtime: the static cockpit is
  served behind the existing `noindex` private posture, not behind login.

## Why This Shape

| Need | Choice | Reason |
| --- | --- | --- |
| Identity | GitHub OAuth via Convex Auth | Owner already authenticates to GitHub for every repo action; no new credential store. |
| Token lifetime | Short-lived JWT + refresh | Limits blast radius of a leaked token; matches Convex's session model. |
| Authorization | Single owner | The cockpit has one operator; roles are speculative until a second writer exists. |
| Secret storage | Backend env, never Git | Honors the no-secrets-in-tree posture enforced by `security:secret-scan`. |

## Dependency Budget

No auth package is added yet. Per the framework and backend decision records,
the auth runtime lands only when the Convex backend is provisioned. JWT secrets
and OAuth client credentials live in backend environment configuration and are
never committed (guarded by the secret scan).

## Acceptance Criteria For Provisioning

Wire auth when any of these become true:

- The cockpit moves from static bundle to live Convex queries.
- A second person needs scoped access (triggers role definition).
- An external surface (deploy) is opened, which requires the deployment gate.

## Rollback Path

- Auth config is derived from this record; the static cockpit keeps working
  with no auth runtime if Convex Auth is removed.
- No user data is stored client-side beyond the Convex session token.
