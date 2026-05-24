# SEIS Deployment And Server Runbook

This project is ready for local preview, GitHub persistence, Vercel deployment and a future custom server handoff without storing secrets in source files.

## Current Targets

| Target | Status model | Purpose |
| --- | --- | --- |
| `local-production-preview` | `active` | Validate the built website on `http://localhost:4173`. |
| `github-origin` | `needs_credentials` | Push the single branch after `gh auth login` is complete. |
| `vercel-preview` | `needs_credentials` | Deploy to Vercel after CLI/auth/env setup. |
| `custom-server` | `needs_credentials` | Copy build output to a selected server after SSH details are provided. |
| `static-fallback-archive` | `active` | Low-dependency rollback publishing surface. |

The public API is `/api/deployment-targets`.

## Required Secrets

Do not commit these values.

```bash
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
DEPLOY_HOST=
DEPLOY_USER=
DEPLOY_PATH=
```

For GitHub, authenticate interactively:

```bash
gh auth login -h github.com
gh auth status -h github.com
git push -u origin codex/seis-ux-cinematic-premium-foundation
```

For Vercel, the CLI path is:

```bash
npm i -g vercel
vercel deploy
```

For a custom server, confirm the exact host, user, path and artifact strategy before running any upload command. A safe first target is the static fallback because it has the smallest dependency surface.

## Safety Rules

- Build and check locally before publishing.
- Keep `main` untouched until a reviewable branch is pushed.
- Do not run deploy, write, payment, message or server mutation actions without a concrete target and separate confirmation.
- Treat missing credentials as `needs_credentials`, not as a crash.
- Keep the static fallback publishable even if the Next.js runtime is unavailable.
