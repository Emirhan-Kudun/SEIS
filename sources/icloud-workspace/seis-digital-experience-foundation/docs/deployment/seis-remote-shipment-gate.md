# SEIS Remote Shipment Gate

Mission: `SEIS-M012`

The remote shipment gate is the final secret-safe go/no-go profile before a real server upload. It combines GitHub sync, Codex cloud readiness, mission-routed MCP and connector readiness, server bundle state, and server environment availability into one small JSON snapshot.

## Snapshot

```text
data/seis/remote-shipment-gate.json
```

## Runtime Endpoint

```text
/api/seis-remote-shipment-gate
```

## Commands

Generate:

```bash
npm run generate:seis-remote-shipment-gate
```

Validate:

```bash
npm run check:seis-remote-shipment-gate
```

Required pre-upload sequence:

```bash
npm run quality:seis
npm run quality:fullstack
npm run publish:preflight
npm run check:github-server-sync
npm run server-upload:dry-run
```

Execute only after dry-run review:

```bash
npm run server-upload:execute
```

## Gates

- `github`: local `UIXAppTTR` and GitHub `origin/UIXAppTTR` must be synced.
- `cloud`: `SEIS Cloud UIXAppTTR` must expose the required read-only checks.
- `connector`: MCP and connector usage must remain mission-routed, not blanket-executed.
- `bundle`: server upload bundle must exist.
- `server-environment`: `UIX_UPLOAD_HOST`, `UIX_UPLOAD_USER`, and `UIX_UPLOAD_PATH` must exist outside Git.

## Current Expected Blocker

The gate should remain `blocked-by-server-environment` until `.env.server.local` is filled outside the repository. This is intentional: real server host, user, and remote path are operational deployment details and must not be committed.
