# Error Tracking Reference Note

Date: 2026-06-15
Decision link: `docs/decisions/error-tracking-decision-record.md`

## Question

Which runtime error-tracking provider satisfies the `deployment` gate's
error-tracking condition for a Convex-first, single-owner SEIS surface without
adding a runtime before a surface exists or breaking the no-secrets-in-tree
posture?

## Sources Consulted

- `docs/security/security-quality-gate.md` — the `deployment` gate names the
  Sentry route directly as its error-tracking condition; this note confirms the
  fit rather than re-opening the vendor choice.
- `docs/platform/openai-curated-build-workbench.md` — security row lists
  Sentry, Datadog, CodeRabbit, and Jam; Sentry is the error-tracking member of
  that set (Datadog is observability-first, CodeRabbit is review, Jam is repro).
- `docs/decisions/backend-state-decision-record.md` — Convex-first backend; the
  tracker must cover both the web surface and Convex functions.
- `docs/decisions/auth-jwt-decision-record.md` — single-owner posture, so error
  events carry one principal and PII scope stays minimal.
- `docs/decisions/framework-decision-record.md` — dependency budget requiring
  no runtime be added before a surface needs it; the SDK install is deferred.

## Conclusion

Sentry is the lowest-new-surface fit and already the gate's named route: one
SDK covers the web cockpit and Convex backend lanes, the DSN lives in
environment configuration (consistent with the secret scan), and the install is
deferred until a deployed surface exists. Picking Sentry resolves the
error-tracking condition of the `deployment` gate; the gate stays blocked on the
remaining rollback-contract condition.

## Open Follow-ups

- Draft the rollback contract for the deployed surface — the last `deployment`
  gate condition — as the next decision record.
- Revisit sampling rates and PII scrubbing at provisioning time.
