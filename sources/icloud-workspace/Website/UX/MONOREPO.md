# SEIS UX Monorepo

This repository keeps the portfolio experience, low-dependency preview surfaces,
shared content, and runtime registry in one workspace. Keep changes small,
reversible, and aligned with the portfolio-first direction.

## Workspace Map

```text
apps/site-next        Next.js App Router production site
apps/site-vite        Lightweight Vite preview
apps/static-fallback  Dependency-light HTML/CSS/JS fallback
packages/content      Portfolio content, translations, drawings, Behance data
packages/runtime      Connector, skill, readiness, and health registries
scripts               Local checks, source-boundary guards, publish helpers
docs                  Deployment, security, branch, and design governance
```

## Low-Power Development Loop

Use this loop when the machine should stay cool:

```bash
npm run check:content
npm run check:source-boundaries
npm run lint
npm run typecheck
```

Avoid production builds, browser automation, and dev servers unless the change
requires visual or runtime verification.

## Build Loop

Use this only when validating release readiness:

```bash
npm run build --workspace apps/site-next
npm run build --workspace apps/site-vite
```

## Commit Hygiene

- Keep active work on `codex/seis-ux-cinematic-premium-foundation`.
- Do not commit archives, generated output, local runtime submissions, keys, or
  environment files.
- Stage only the files needed for the current change.
- Treat `main` as protected; use PR or explicit publish workflow for remote work.

## CI

The canonical GitHub Actions workflow is:

```text
.github/workflows/portfolio-quality.yml
```

It runs content checks, lint, typecheck, runtime/source-boundary checks, and both
site builds on GitHub. Do not add a second generic CI workflow unless it has a
separate, documented purpose.
