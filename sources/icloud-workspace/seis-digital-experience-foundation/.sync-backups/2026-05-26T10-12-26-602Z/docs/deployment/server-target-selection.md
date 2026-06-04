# Server Target Selection

## Why This Exists

The release is ready, but live upload must not happen until the server path is known. A wrong document root can overwrite or hide an existing site.

## Configure A Target

Hostinger/static:

```bash
node scripts/configure-server-target.mjs hostinger-static --domain example.com
```

Apache/shared hosting:

```bash
node scripts/configure-server-target.mjs apache-shared-hosting --domain example.com --document_root public_html
```

Docker/Node:

```bash
node scripts/configure-server-target.mjs docker-node-static --host 127.0.0.1 --port 4177
```

Then run:

```bash
npm run release:ready
```

The handoff folder for the server operator is generated at:

```text
handoff/server/
```

## Current Safe State

If `activeTarget` is `null`, upload stays blocked but the release package and backup remain preserved.

## Local Secrets Rule

Use `deploy/server-targets.local.example.json` as a shape reference only. Keep real hostnames, private paths, and credentials out of Git unless they are public deployment metadata.
