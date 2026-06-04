# SEIS Cloud Server Environment

Mission: `SEIS-M010`

SEIS now has a compact cloud and server execution profile that connects Codex Cloud readiness, GitHub publication state, connector readiness, and server upload blockers without storing secret values.

## Snapshot

Machine-readable snapshot:

```text
data/seis/cloud-server-environment.json
```

Generator:

```bash
npm run generate:seis-cloud-server-environment
```

Validator:

```bash
npm run check:seis-cloud-server-environment
```

## Runtime Endpoint

The local full-stack server exposes the profile at:

```text
/api/seis-cloud-server-environment
```

This endpoint is read-only and returns the generated snapshot for dashboards, cloud preflight tasks, and deployment handoff checks.

## Cloud Contract

The profile is bound to:

- Environment: `SEIS Cloud UIXAppTTR`
- Branch: `UIXAppTTR`
- Write policy: branch-only
- Setup script: `bash scripts/codex-cloud-setup.sh`
- Required checks: `npm run quality:seis`, `npm run quality:fullstack`, `npm run check:seis-cloud-server-environment`, `npm run publish:preflight`, `npm run server-upload:dry-run`

The Codex environment action is read-only:

```bash
npm run check:seis-cloud-server-environment
```

## Server Upload Contract

Real server upload remains blocked until these environment variables are provided outside the repository:

- `UIX_UPLOAD_HOST`
- `UIX_UPLOAD_USER`
- `UIX_UPLOAD_PATH`

The snapshot stores only variable names and boolean presence flags. It must not store host values, usernames, remote paths, private keys, tokens, or `.env` content.

## Operating Rule

Use this profile before any real upload:

1. Run `npm run generate:seis-cloud-server-environment`.
2. Run `npm run check:seis-cloud-server-environment`.
3. Run `npm run publish:preflight`.
4. Run `npm run server-upload:dry-run`.
5. Execute upload only when server environment values are present and GitHub publication state is acceptable.

This keeps aggressive development bounded by SEIS governance: one active mission, small active context, no secret leakage, no direct main push, and no server upload without explicit readiness.
