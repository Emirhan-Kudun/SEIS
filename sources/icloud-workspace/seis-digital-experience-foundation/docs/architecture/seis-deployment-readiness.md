# SEIS Deployment Readiness

Mission: `SEIS-M007`

SEIS deployment readiness connects the runtime-aware tool planner to the actual delivery surface: GitHub, Codex Cloud, server upload, and MCP readiness.

The snapshot lives at:

```text
data/seis/deployment-readiness.json
```

## Purpose

The deployment readiness layer answers four questions before any aggressive shipment:

- Is local `UIXAppTTR` aligned with the GitHub server ref?
- Is GitHub CLI authentication ready with `repo` and `workflow` scope?
- Is the configured server upload bundle ready, and which upload environment variables are missing?
- Is the cloud environment configured with the same guarded checks used locally?

## Safety Model

The generator records only readiness signals. It never stores:

- server host values
- server user values
- server paths
- GitHub tokens
- MCP credentials
- shell environment dumps

Server variables are represented only as names and boolean presence flags:

```text
UIX_UPLOAD_HOST
UIX_UPLOAD_USER
UIX_UPLOAD_PATH
```

## Commands

Refresh the snapshot:

```bash
npm run generate:seis-deployment-readiness
```

Validate the contract:

```bash
npm run check:seis-deployment-readiness
```

The SEIS quality gate includes the deployment readiness check:

```bash
npm run quality:seis
```

## Interpretation

- `summary.githubServerSynced`: local HEAD matches the GitHub server branch.
- `summary.pushReady`: branch, remote, working tree, auth, and workflow scope are ready for a guarded push.
- `summary.serverUploadReady`: server bundle plus required upload environment variables are ready for execution.
- `summary.cloudReady`: Codex Cloud environment exposes the deployment readiness action.
- `summary.mcpSnapshotReady`: live MCP readiness snapshot is available for planner decisions.

If `serverUploadReady` is false because upload variables are absent, this is an expected preservation blocker, not a code failure. Real upload remains blocked until the variables are supplied outside the repository.
