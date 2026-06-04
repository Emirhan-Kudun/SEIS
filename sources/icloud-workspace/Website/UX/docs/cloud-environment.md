# SEIS Cloud Environment

SEIS treats cloud activation as a contract, not a blind deploy. Real tokens stay in Vercel, GitHub, Supabase or the server shell; this repository only stores empty templates and validation rules.

## Environment Surfaces

- `site-public`: contact endpoint and optional Sentry DSN for public runtime behavior.
- `supabase-intake`: server-only Supabase dual-write path for brief submissions.
- `cleanup-cron`: bearer-protected retention cleanup job.
- `github-publish`: bounded source persistence for the active Codex branch.
- `vercel-deploy`: preview or production deployment once Vercel credentials exist.
- `custom-server-static`: rsync-based static fallback handoff after dry-run confirmation.

## Required Local Files

- `.env.example`: general local development template.
- `.env.cloud.example`: cloud/server deployment template with no real secret values.
- `packages/runtime/src/cloud-environment.json`: machine-readable cloud readiness contract.

## Vercel Notes

Vercel environment variables should be added per target: production, preview or development. Useful commands after authentication:

```bash
npm i -g vercel
vercel pull --environment=preview
vercel env pull --environment=preview
vercel env pull --environment=production
vercel deploy --prod
```

Do not run production deploy until `npm run lint && npm run checks` and `npm run typecheck && npm run build && npm run report:budgets` are green.

Before any remote deploy, generate a local preflight report:

```bash
npm run cloud:env:preflight
npm run deploy:preflight
```

The cloud command writes `docs/releases/cloud-environment-report.json` with secret-safe environment presence, Vercel/Supabase/GitHub/custom-server activation commands and missing variable counts. The deploy command writes `docs/releases/deploy-preflight-report.json` with local file checks, command availability, credential gaps and target summaries. Missing cloud credentials are reported as watch items unless `--strict` is used.

## Activation Sequence

The machine-readable activation plan lives in `packages/runtime/src/cloud-activation-plan.json` and is exposed through `/api/cloud-environment`.

1. Run local gates and deploy preflight.
2. Install and authenticate the Vercel CLI, then pull project settings and env values outside git.
3. Add Supabase server-only intake variables to the provider secret store.
4. Run custom server preflight and `rsync` dry-run before any live upload.
5. Keep the GitHub branch and iCloud bundle as rollback evidence.

## Custom Server Notes

Use static fallback first because it has the smallest dependency surface.

```bash
export DEPLOY_HOST=example.com
export DEPLOY_USER=deploy
export DEPLOY_PATH=/var/www/emirhankudun.com
npm run deploy:preflight
npm run deploy:static:dry-run
```

Run `npm run deploy:static:live` only after dry-run output is correct and the target path is confirmed.
