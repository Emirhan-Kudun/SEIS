# SEIS Runtime-Aware Tool Activation

SEIS-M007 merges the mission-aware activation planner with the live MCP runtime readiness snapshot.

The planner now answers both questions:

- Which skill, connector, and MCP surfaces should this mission use?
- What is the current runtime readiness of those selected surfaces?

## Inputs

- `data/seis/tool-activation-rules.json`
- `data/seis/mcp-skill-connector-registry.json`
- `data/seis/mcp-runtime-readiness.json`

## Output

`npm run plan:seis-tools -- "<mission text>"` returns:

- selected intent,
- owner agents,
- selected tool surfaces,
- surface-level runtime readiness,
- blocked-auth items,
- permission-gated items,
- validation commands,
- next action.

## Why This Matters

Earlier SEIS missions separated three layers:

- M004: defines tool surfaces and risk rules.
- M005: maps user missions to the smallest safe set of surfaces.
- M006: captures live MCP availability and auth state.

M007 connects those layers. This prevents SEIS from claiming that every connector is usable when the runtime says some are blocked, permission-gated, or not authenticated.

M007 also reads the deployment readiness contract at `data/seis/deployment-readiness.json` for delivery decisions, so a GitHub or server mission can distinguish between authenticated local GitHub CLI, blocked app-connector transport, and missing server upload environment.

## Operating Rule

Runtime-aware planning does not grant write permission.

If a selected surface has `blocked-auth` items, the plan must stop at blocker reporting. If a selected surface has `permission-gated` items, the plan must ask for or verify permission before external writes.
