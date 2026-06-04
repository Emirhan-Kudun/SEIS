# Server Target Profile

This layer defines how the generated bundle can be moved to a real server without guessing host details in source code.

## Runtime Endpoint

```text
GET /api/server-target
```

The endpoint reports the configured target profile, required environment variable names, and whether those variables are currently available.

## Required Environment

```bash
export UIX_UPLOAD_HOST="example.com"
export UIX_UPLOAD_USER="deploy"
export UIX_UPLOAD_PATH="/var/www/uix-apps"
```

The path must match the safe server path pattern configured in `config/server-target-profile.json`.

## Dry Run

```bash
npm run server-upload:dry-run
```

Dry-run prints the exact upload command and exits without sending files.

## Execute

```bash
npm run server-upload:execute
```

Execution requires all environment variables and uses the generated bundle under:

```text
runtime/server-upload-bundle/source
```

Run `npm run build:server-upload-bundle` before executing.
