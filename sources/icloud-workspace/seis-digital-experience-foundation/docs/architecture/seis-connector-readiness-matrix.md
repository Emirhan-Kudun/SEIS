# SEIS Connector Readiness Matrix

Mission: `SEIS-M009`

SEIS connector readiness turns the live MCP runtime snapshot into a surface-level decision matrix.

Machine-readable snapshot:

```text
data/seis/connector-readiness-matrix.json
```

Runtime API:

```text
/api/seis-connector-readiness
```

## Purpose

SEIS can see many skills, connectors, and MCP servers. A raw list is useful for inventory, but it is too noisy for mission execution.

The connector readiness matrix groups runtime entries by governed surface:

- skill runtime
- local development tools
- GitHub governance connectors
- design collaboration connectors
- documentation and knowledge MCPs
- cloud infrastructure MCPs
- data and backend MCPs
- observability and security MCPs
- product collaboration connectors
- business and payment connectors

## Activation States

Each surface receives an `activationState`:

- `ready`: usable when the mission router selects it.
- `read-only-ready`: available for read-only documentation or inspection.
- `guarded-ready`: high-risk but available after preflight and rollback planning.
- `auth-required`: visible but blocked by one or more missing logins.
- `permission-gated`: visible but requires explicit OAuth or human permission.
- `blocked`: not eligible until target, rollback, cost, or mission boundaries are explicit.

## Safety Model

- No connector is invoked by this matrix.
- No secrets are stored.
- Raw command output and environment dumps are excluded.
- Write-capable surfaces remain gated by mission, auth, permission, rollback, and validation requirements.
- The matrix summarizes enough detail to route work without loading the entire MCP list into active context.

## Commands

Refresh the matrix:

```bash
npm run generate:seis-connector-readiness
```

Validate the contract:

```bash
npm run check:seis-connector-readiness
```

Run the SEIS quality chain:

```bash
npm run quality:seis
```
