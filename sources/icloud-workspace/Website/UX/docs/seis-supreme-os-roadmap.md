# SEIS Supreme OS Roadmap

## Phase A: Operating System Foundation

- Preserve the `/os` route as the public operating frame.
- Keep `packages/content/src/supreme-os.ts` as the typed source for OS modes, capabilities and lanes.
- Keep `/api/supreme-os` available for future dashboards, automation views and native adapters.

## Phase B: Animation and 3D Expansion

- Scene modes are active on `/motion`: calm, editorial, cinematic and experimental.
- Add Playwright screenshot and canvas-pixel smoke checks once the dependency is intentionally installed.
- WebGL budget reporting is active on `/motion`: pixel ratio, active scene count, mobile fallback and idle pause status.
- Add GSAP only when a route needs timeline orchestration that CSS and Three.js do not cover cleanly.

## Phase C: Multi-Platform Adapters

- Swift adapter is active on `/platform-adapters` using `/api/supreme-os`, `/api/software-languages` and `/api/portfolio-index`.
- Android adapter is active on `/platform-adapters` as a Kotlin/Compose motion-safe reader contract.
- PHP fallback adapter is active on `/platform-adapters` for lightweight CMS or traditional hosting delivery.
- Desktop adapter is active on `/platform-adapters` with Tauri evaluated before Electron.

## Phase D: Governance Automation

- Add PR template and release evidence checklist.
- Add bundle budget and first-view image budget checks.
- Scheduled local archive/export plan is active in `docs/archive-automation-plan.md`.
- Security posture surface is active on `/security-posture`; code scanning adoption remains opt-in until dependency and runtime cost are accepted.
- Cloud environment surface is active on `/cloud-environment`; Vercel, Supabase and custom server credentials remain outside git.
- Deploy preflight is active through `npm run deploy:preflight` and writes `docs/releases/deploy-preflight-report.json`.

## Phase E: Product Surfaces

- Portfolio OS dashboard is active on `/portfolio-os`.
- Creative studio CRM-lite panel is active on `/studio-crm`.
- Motion preset editor is active on `/motion-presets`.
- Case study builder is active on `/case-study-builder`.
- AI brief triage view is active on `/brief-triage`.
- Connector / skill / MCP console is active on `/connector-console`.
- Security posture console is active on `/security-posture`.
- Cloud environment console is active on `/cloud-environment`.
- Cross-platform publishing console is active on `/publishing-console`.

## Non-Negotiables

- No secret exposure.
- No unstable main branch.
- No dependency bloat without a documented reason.
- No animation that breaks readability, accessibility or thermal comfort.
- No platform expansion without a rollback path.
