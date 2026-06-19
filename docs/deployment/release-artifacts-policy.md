# Release Artifacts Policy

## Decision

The packaged release archives under `releases/<timestamp>/seis-static.zip` (and
their `server-upload-manifest.json` siblings, plus `releases/latest.json`) are
**intentionally tracked in git**. They are load-bearing infrastructure, not
incidental build output.

## Why they stay tracked

Several scripts read these archives directly, so removing them would break the
release and restore tooling:

- `scripts/restore-latest-release.mjs` copies `latest.json -> packagePath` (the
  tracked `.zip`) into `dist/`.
- `scripts/check-release-history.mjs`, `scripts/check-deploy-readiness.mjs`,
  `scripts/create-release-backup.mjs`, and the server-drop/handoff scripts treat
  `releases/` as the canonical backup store.

## Trade-off (known)

Tracking binaries grows the repository over time. This is accepted today in
exchange for a self-contained, reproducible restore path that needs no external
artifact store.

## If this ever changes

Moving archives to GitHub Releases or object storage is possible, but it is a
**coordinated migration**: update every script above and `releases/latest.json`
resolution first, then stop tracking the `.zip` files. Do not simply `git rm`
the archives — `restore-latest-release` and the deploy-readiness gate depend on
them being present.
