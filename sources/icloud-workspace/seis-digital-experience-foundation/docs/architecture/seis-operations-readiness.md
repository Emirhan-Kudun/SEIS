# SEIS Operations Readiness

Mission: `SEIS-M008`

SEIS operations readiness turns the internal governance snapshots into a compact operational command surface.

Machine-readable snapshot:

```text
data/seis/operations-readiness.json
```

Runtime API:

```text
/api/seis-operations-readiness
```

## What It Combines

The generator reads:

- `data/seis/deployment-readiness.json`
- `data/seis/mcp-runtime-readiness.json`
- `data/seis/mcp-skill-connector-registry.json`
- `data/seis/mission-control.json`

It then emits a small command deck covering:

- GitHub server sync
- server upload gate
- MCP runtime snapshot
- connector surface discipline
- single active mission

## Why This Exists

SEIS has many skills, connectors, MCP servers, cloud surfaces, and GitHub governance rules. The operations readiness layer prevents that ecosystem from becoming noisy by turning broad capability into a small active context.

This supports the operating rule:

```text
Large Knowledge Base -> Small Active Context
```

## Safety Rules

- The snapshot never stores secrets.
- Server upload variables are named but their values are not recorded.
- MCP entries are summarized by readiness state instead of invoked blindly.
- GitHub delivery remains scoped to `UIXAppTTR`.
- Main and master remain protected.

Required server upload variable names:

```text
UIX_UPLOAD_HOST
UIX_UPLOAD_USER
UIX_UPLOAD_PATH
```

## Commands

Refresh the snapshot:

```bash
npm run generate:seis-operations-readiness
```

Validate the contract:

```bash
npm run check:seis-operations-readiness
```

Run the full SEIS quality chain:

```bash
npm run quality:seis
```
