# SEIS Capability Activation Hub

Mission: SEIS-M015

SEIS now connects usable apps, skills, plugins, MCPs, GitHub publication, cloud actions, and server handoff through one governed activation hub.

This is not blanket tool execution. It is a mission-routed control surface that answers:

- Which capability lane should a mission use?
- Which apps, skills, plugins, or MCP surfaces are usable read-only first?
- Which surfaces are permission-gated, auth-blocked, or high risk?
- Which cloud actions are safe to run from Codex Cloud?
- Is GitHub push ready, and is real server upload still blocked?

## Runtime Endpoint

```text
/api/seis-capability-activation-hub
```

## Machine Files

- `data/seis/capability-activation-hub.json`
- `scripts/generate-seis-capability-activation-hub.mjs`
- `scripts/check-seis-capability-activation-hub.mjs`

## Sources

The hub is generated from existing SEIS contracts:

- MCP runtime readiness
- MCP skill connector registry
- connector readiness matrix
- tool activation rules
- plugin skill registry
- plugin skill capability map
- Codex Cloud environment
- deployment readiness
- remote shipment gate

## Policy

- `UIXAppTTR` remains the working branch.
- Blanket activation is disabled.
- Read-only-first remains the default.
- External writes require mission, auth readiness, permission confirmation, rollback path, and validation command.
- Real server upload remains blocked until `UIX_UPLOAD_HOST`, `UIX_UPLOAD_USER`, and `UIX_UPLOAD_PATH` are provided outside Git.

## Validation

```bash
npm run generate:seis-capability-activation-hub
npm run check:seis-capability-activation-hub
```

The check is part of `quality:seis`.
