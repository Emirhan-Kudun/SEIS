# Rollback Contract Decision Record

Date: 2026-06-15

SEIS adopts a **checksum-pinned, version-pinned rollback contract** for the
deployable static surface. This satisfies the last open condition of the
`deployment` gate in `docs/security/security-quality-gate.md`; with the secret
scan and error-tracking conditions already met, the `deployment` gate moves to
**open** (deployment is permitted; it is still never automatic).

## Current Decision

Status: decided.

The deployed surface is the static package `dist/seis-static.zip`, built and
checksummed by the existing release tooling. Its rollback contract is:

- **Pinned artifact.** Only a package whose SHA-256 matches
  `dist/server-upload-manifest.json` may be uploaded (the server rule from
  `docs/deployment/release-backup-plan.md`).
- **Retained predecessors.** Every build is retained under
  `releases/<timestamp>/` with `releases/latest.json` pointing at the current
  release, so the previous good release is always recoverable without a rebuild.
- **Roll back = re-publish the previous timestamped release.** Restore the prior
  `releases/<timestamp>/seis-static.zip`, re-verify its checksum with
  `npm run check:deploy-readiness`, then re-upload to the same confirmed target.
- **Source rollback.** If the regression is in source, revert the smallest
  commit (per the evolution model rollback policy) and rebuild with
  `npm run build:static && npm run prepare:server`.
- **Named owner + trigger.** A human rollback owner is confirmed at deploy time
  via the `rollback-owner` question in `deploy/server-targets.json`; the trigger
  is "the upload exposed the wrong version or a broken surface."
- **No automatic deploy or rollback.** Both publish and rollback stay manual and
  target-confirmed; `deploy/server-targets.json` keeps `activeTarget` null until
  the user answers the confirmation flow.

## Why This Shape

| Need | Choice | Reason |
| --- | --- | --- |
| Recoverability | Retained timestamped releases | A previous good package always exists; rollback needs no rebuild. |
| Integrity | SHA-256 manifest match | Prevents uploading an unverified or tampered package. |
| Source regressions | Smallest-commit revert + rebuild | Matches the evolution model's default rollback. |
| Accountability | Named rollback owner | A human confirms version exposure before and after upload. |
| Safety | Manual, target-confirmed only | Honors the no-automatic-deploy safety rule. |

## Effect On The Gates

- `deployment`: all three conditions now hold (secret scan, error tracking,
  rollback contract) → **open**. Opening the gate permits deployment; it does
  not perform one, and the server-target confirmation flow still gates any live
  upload.
- `automation_expansion`: its "deployment gate is open" condition is now met, but
  it stays **blocked** on state-model write coverage and a documented kill
  switch.

## Rollback Path (For This Record)

This record is itself reversible: restoring the prior `deployment`-gate guard
text and re-blocking the gate returns SEIS to the pre-decision posture with no
deployed surface affected.
