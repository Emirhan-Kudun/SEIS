# Full-Stack Portfolio Runtime

This repo still keeps the static portfolio as the primary visual surface. The full-stack layer is intentionally small, reversible, and dependency-free.

## Runtime

Run locally:

```bash
node server.mjs
```

Optional environment variables:

```bash
HOST=127.0.0.1
PORT=4173
CONTACT_HASH_SALT=local-only-random-string
```

## API Surface

- `GET /api/health` returns runtime health and uptime.
- `GET /api/site` returns public portfolio metadata.
- `GET /api/integrations` summarizes local MCP and connector governance files.
- `POST /api/contact` accepts the existing contact form and writes JSONL records to `runtime/contact-submissions.jsonl`.

The server returns a virtual `site-config.json` with `contactEndpoint: "/api/contact"`. The checked-in static `site-config.json` can remain deployment-neutral.

## Safety

- No secrets are required.
- No third-party dependency is added.
- PHP contact fallback remains untouched.
- Contact submissions are stored locally at runtime and should not be committed.
- Static serving is allowlisted to the portfolio files and public asset folders.

## Zip Build

Create a deployable archive:

```bash
bash scripts/build-fullstack-zip.sh
```

The generated zip includes a minimal `package.json` inside the archive so a host can run:

```bash
npm start
```
