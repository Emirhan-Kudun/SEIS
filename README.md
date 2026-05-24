# SEIS Premium Portfolio + Active Runtime

Calm, cinematic 3D portfolio system for Emirhan Kudun with a credential-aware SEIS runtime layer, MCP readiness matrix, complete drawing archive, Behance embed codes, deployment readiness, polyglot software stack metadata, and advanced brief intake.

## Structure

- `apps/site-next` - production Next.js App Router site and API routes.
- `apps/site-vite` - lightweight React/Vite preview using the same content package.
- `apps/static-fallback` - standalone HTML/CSS/JS fallback for low-dependency rollback.
- `packages/content` - shared portfolio content, translations, drawings, Behance embeds, software language metadata, and SEO metadata.
- `packages/runtime` - connector, skill, plugin, deployment target, and health status registry.
- `runtime/` - ignored local JSONL capture directory for contact and brief submissions.

## Commands

```bash
npm install
npm run typecheck
npm run lint
npm run check:content
npm run check:runtime
npm run check:source-boundaries
npm run collect:mcp-readiness
npm run build --workspace apps/site-next
npm run build --workspace apps/site-vite
```

## Local Development

```bash
npm run dev:next
npm run dev:vite
```

The main production candidate is `apps/site-next`. The Vite app is a small preview surface, and `apps/static-fallback/index.html` can be opened directly.

## Added Governance Surfaces

- `/design-system` documents the calm cinematic UI principles and token groups.
- `/api/activation-policy` explains what each runtime status means before a connector is activated.
- `/api/mcp-readiness` exposes the generated `codex mcp list` readiness snapshot without secrets.
- `/api/source-archives` exposes the selected zip archive metadata and hashes.
- `/api/scene-presets` exposes the 3D/reduced-motion/static scene modes as runtime metadata.
- `/api/deployment-targets` exposes local, GitHub, Vercel, custom server and static fallback publish targets.
- `/api/behance` exposes profile/project embed code slots for the Behance portfolio layer.
- `/api/software-languages` exposes the active and planned polyglot branch stack.
- `docs/deployment-server-runbook.md` records server/publish handoff without storing secrets.
- `docs/decision-questions.md` keeps the next creative/product questions from getting lost.
- `scripts/check-source-boundaries.mjs` prevents importing archive noise, zip files, encrypted credentials, and macOS metadata into source.
- `scripts/collect-mcp-readiness.mjs` refreshes MCP readiness from the live Codex MCP list and compares it against the infra-v1 archive catalog.

The active implementation branch is `codex/seis-ux-cinematic-premium-foundation`.

## Vercel

The repository includes Vercel-ready configuration for the Next.js app. The Vercel CLI is not installed in this environment; install it with:

```bash
npm i -g vercel
```

That unlocks `vercel env pull`, `vercel deploy`, and `vercel logs`.
