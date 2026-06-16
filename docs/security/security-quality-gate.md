# Security Quality Gate

Date: 2026-06-11

This gate must pass before source repository deletion, any deployment, or
automation expansion. Machine-readable state lives in
[`data/security-gate-status.json`](../../data/security-gate-status.json) and is
validated by `npm run check:security-gate`; the web cockpit footer renders the
same records.

## Gates

### closed_code — enforced

SEIS is a closed-code repository. The `SEIS CLOSED CODE Governance` workflow
(`scripts/check-seis-closed-code.mjs`) guards the policy file set on every
push and pull request.

### no_large_binaries — enforced

No archive or binary above the GitHub blob limit enters Git. The 1.1 GB
iCloud zip stays inventoried (`data/github-zip-import-inventory.json`) but
uncommitted. Any large-asset need routes through releases or external
storage, never the working tree.

### source_deletion — open

Origin repositories may be archived or deleted. Conditions, all met:

- File snapshots exist under `sources/<repo>/` (manifest: `sources/README.md`).
- Full branch history exists under `sources/<repo>/<branch>` refs in SEIS.
- Every origin repository carries a moved-to-SEIS pointer in its README.

### deployment — open

All conditions now hold; deployment is permitted but never automatic, and any
live upload is still gated by the `deploy/server-targets.json` confirmation flow.

- [x] A secret scan of the full tree (including `sources/`) is recorded.
  `scripts/security-secret-scan.mjs` → `data/secret-scan-results.json`,
  guarded by `npm run check:secret-scan`. Deployable surface clean; the one
  generated third-party bundle is allowlisted with a documented reason.
- [x] Runtime error tracking is chosen (Sentry route per the workbench
  security row). Decided in `docs/decisions/error-tracking-decision-record.md`;
  SDK and DSN provisioned only when a deployed surface exists.
- [x] A rollback contract exists for the deployed surface. Defined in
  `docs/decisions/rollback-contract-decision-record.md` (checksum-pinned,
  version-pinned, named owner, manual only).

Auth posture for the eventual deployed surface is decided in
`docs/decisions/auth-jwt-decision-record.md` (Convex Auth, GitHub OAuth,
short-lived JWT).

### automation_expansion — open

All conditions now hold; write-capable automation is permitted but governed —
each new automation must register before it runs, and none is automatic.

- [x] The deployment gate is open.
- [x] The automation's writes are covered by an entity in
  `apps/fullstack/state-model.json` with a sync rule, recorded in
  `data/automation-registry.json` and checked by
  `npm run check:automation-registry`.
- [x] A kill switch (disable path) is documented with the automation. The global
  `SEIS_AUTOMATION_DISABLED` flag and per-automation disable paths are defined in
  `docs/decisions/automation-kill-switch-decision-record.md`.

## Changing Gate State

Gate state changes are edits to `data/security-gate-status.json` plus a dated
entry in the log below. The check script fails if states drift from the
allowed set (`enforced`, `open`, `blocked`).

## Log

- 2026-06-11: Gate created. `source_deletion` opened after consolidation
  verification (snapshots, full-history refs, README pointers all in place).
  `deployment` and `automation_expansion` start blocked.
- 2026-06-13: Secret-scan condition of the `deployment` gate met. Scan is
  clean across the deployable surface (533 files); 47 matches in the
  generated `github-code-bundle.txt` are upstream third-party test fixtures
  and were allowlisted with a documented reason. `deployment` stays blocked
  on error-tracking and rollback conditions.
- 2026-06-15: Error-tracking condition of the `deployment` gate met. Sentry
  chosen as the runtime error-tracking provider
  (`docs/decisions/error-tracking-decision-record.md`), SDK/DSN deferred to
  provisioning. `deployment` stays blocked on the rollback-contract condition.
- 2026-06-15: Rollback-contract condition met
  (`docs/decisions/rollback-contract-decision-record.md`): checksum-pinned,
  version-pinned re-publish of retained `releases/<timestamp>/` packages with a
  named owner, manual only. All three conditions now hold, so `deployment`
  opens. `automation_expansion` stays blocked on state-model write coverage and
  a documented kill switch.
- 2026-06-15: `automation_expansion` opened. Write coverage registered in
  `data/automation-registry.json` against state-model entities and checked by
  `npm run check:automation-registry`; global `SEIS_AUTOMATION_DISABLED` kill
  switch and per-automation disable paths documented in
  `docs/decisions/automation-kill-switch-decision-record.md`. Permitted but
  governed — new write-capable automation must register before it runs. All five
  gates are now resolved.
