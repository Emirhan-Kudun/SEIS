# SEIS Server Cloud Deploy Envelope

Mission: `SEIS-M011`

This deploy envelope turns the SEIS server handoff into a repeatable, secret-safe workflow. It does not upload by itself and it does not store server credentials. It prepares the local and cloud checks that must pass before a real upload.

## Files

- Snapshot: `data/seis/server-cloud-deploy-envelope.json`
- Environment template: `config/server-upload.env.example`
- Local ignored environment file: `.env.server.local`
- Runtime endpoint: `/api/seis-deploy-envelope`
- Upload script: `scripts/server-upload-dry-run.cjs`

## Local Environment

Copy the template into a gitignored local file:

```bash
cp config/server-upload.env.example .env.server.local
```

Then fill these values in `.env.server.local` only:

- `UIX_UPLOAD_HOST`
- `UIX_UPLOAD_USER`
- `UIX_UPLOAD_PATH`

The repository keeps the template, not the real values. `.env.server.local` is covered by `.gitignore` through `.env.*.local`.

## Commands

Generate the envelope:

```bash
npm run generate:seis-deploy-envelope
```

Validate the envelope:

```bash
npm run check:seis-deploy-envelope
```

Preview upload:

```bash
npm run server-upload:dry-run
```

Preview with an explicit local env file:

```bash
node scripts/server-upload-dry-run.cjs --env-file .env.server.local
```

Execute only after reviewing the dry-run command:

```bash
npm run server-upload:execute
```

## Safety Rules

- Keep `UIXAppTTR` as the active branch.
- Do not push to `main` or `master`.
- Do not commit `.env.server.local`.
- Do not store SSH keys, tokens, host values, usernames, or remote paths in tracked files.
- Run `npm run publish:preflight` before upload.
- Run `npm run check:github-server-sync` after push.
- Run `npm run server-upload:dry-run` before execute.

## User-Owned Configuration

The only user-specific step is filling `.env.server.local`. This is intentionally outside the repo because server host, user, and remote path are operational secrets or deployment-specific values.
