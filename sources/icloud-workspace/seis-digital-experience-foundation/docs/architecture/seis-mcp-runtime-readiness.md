# SEIS MCP Runtime Readiness

SEIS-M006 captures the current MCP runtime surface without invoking every connector.

The user may ask to use all skills, connectors, and MCPs, but SEIS treats that as a governance request rather than a blanket execution request. The runtime readiness snapshot answers three questions:

- Which MCP entries are visible in the current Codex environment?
- Which entries are enabled, permission-gated, unauthenticated, or blocked?
- Which SEIS tool surface should own each entry when a mission needs it?

## Source

The snapshot is generated from:

```bash
codex mcp list
```

Only safe fields are stored:

- MCP name
- enabled or disabled status
- auth state
- mapped SEIS surface
- readiness class

Command details, arguments, working directories, and environment values are not stored in the snapshot.

## Commands

Refresh the snapshot:

```bash
npm run generate:seis-mcp-readiness
```

Validate the snapshot:

```bash
npm run check:seis-mcp-readiness
```

## Readiness Classes

- `enabled-no-auth-handshake`: Enabled and does not expose a login state through Codex auth.
- `permission-gated`: Enabled, but OAuth or explicit permission flow may be required.
- `blocked-auth`: Enabled entry exists, but the account is not logged in.
- `ready-authenticated`: Authenticated entry, if reported by the runtime.
- `disabled`: Present but not enabled.
- `unknown`: The runtime reported an auth state the current parser does not classify.

## Operating Rule

The readiness snapshot does not grant permission to perform writes.

High-risk surfaces such as GitHub, cloud infrastructure, databases, observability, security, and payment systems still require:

- explicit mission scope,
- owner agent,
- auth readiness,
- rollback path,
- validation command,
- and write confirmation when external state may change.

