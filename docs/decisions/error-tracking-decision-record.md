# Error Tracking Decision Record

Date: 2026-06-15

SEIS uses **Sentry** for runtime error and performance tracking on the
eventual deployed surface, with the SDK and DSN provisioned only when a live
surface exists. This satisfies the error-tracking condition of the
`deployment` gate in `docs/security/security-quality-gate.md`.

## Current Decision

Status: decided (provisioning deferred).

- Provider: **Sentry**, the error-tracking route already named in the security
  row of the OpenAI-curated build workbench.
- Scope at first provisioning: the web cockpit surface and the Convex backend
  functions, reporting unhandled exceptions and a minimal performance sample.
- DSN and auth token live in **environment configuration**, never in Git
  (guarded by `npm run check:secret-scan`). No `.env` value is committed.
- Release health is keyed to the static build hash from
  `scripts/build-static.mjs`; source maps upload at deploy time only.
- Until a live surface exists there is no error-tracking runtime: the static
  cockpit ships behind its existing `noindex` private posture with no SDK.

## Why This Shape

| Need | Choice | Reason |
| --- | --- | --- |
| Provider | Sentry | Already the workbench security route; broad SDK coverage for the web + backend lanes without a new vendor decision. |
| Install timing | Deferred to provisioning | Honors the framework decision record's dependency budget — no runtime added before a surface needs it. |
| Secret storage | Env only, never Git | Keeps the no-secrets-in-tree posture enforced by the secret scan. |
| Release keying | Static build hash | Reuses the existing build identity instead of inventing a versioning scheme. |

## Dependency Budget

No Sentry package is added yet. Per the framework and backend decision records,
the SDK lands only when the deployed surface is provisioned. The DSN and any
auth token are environment configuration and are never committed.

## Effect On The Deployment Gate

This record meets the error-tracking condition of the `deployment` gate. The
gate stays **blocked** on its remaining condition: a rollback contract for the
deployed surface. See the gate log in
`docs/security/security-quality-gate.md`.

## Acceptance Criteria For Provisioning

Wire Sentry when any of these become true:

- The cockpit moves from static bundle to a deployed surface.
- The Convex backend is provisioned and runs functions in production.
- An automation principal is granted write access (also gated by
  `automation_expansion`).

## Rollback Path

- Error-tracking config is derived from this record; removing the Sentry SDK
  returns the surface to no-telemetry operation with no data loss.
- No personally identifying data is sent to Sentry beyond the owner principal;
  PII scrubbing is enabled in the SDK config at provisioning time.
