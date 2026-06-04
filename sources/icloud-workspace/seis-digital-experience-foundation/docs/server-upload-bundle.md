# Server Upload Bundle

This layer turns the local iCloud repository into a deterministic upload plan.

It does not replace GitHub authentication. It defines what should be shipped once authentication is available and keeps the same source set visible through local APIs.

## Runtime Endpoint

```text
GET /api/server-upload-bundle
```

The endpoint combines:

- canonical repository and branch
- required upload commands
- server target profile reference
- SHA-256 preservation snapshot summary
- forbidden local artifact boundaries
- current auth-blocked fallback notes

## Build Command

```bash
npm run build:server-upload-bundle
```

The command writes a generated transfer bundle to:

```text
runtime/server-upload-bundle
```

That directory is intentionally ignored by Git. It is a temporary local/server-transfer artifact, not source code.

## Integrity Endpoint

```text
GET /api/preservation-snapshot
```

Use this endpoint to verify file hashes before or after transferring source files to a server.

## Target Profile

```text
GET /api/server-target
```

The target profile declares the required `UIX_UPLOAD_HOST`, `UIX_UPLOAD_USER`, and `UIX_UPLOAD_PATH` environment variables used by `npm run server-upload:dry-run`.

## Upload Order

The upload order is:

```text
git-auth -> quality -> publish-preflight -> push-origin
```

Do not reorder this sequence. Authentication must be known before quality and
preflight results are used to authorize a remote push.

## Validation

```bash
npm run check:server-upload-bundle
```

The check verifies endpoint wiring, required commands, forbidden bundle entries, runtime module registration, and documentation.

## Current Constraint

Remote upload is still blocked until GitHub credentials are available. The expected unblock command is:

```bash
gh auth login -h github.com
```
