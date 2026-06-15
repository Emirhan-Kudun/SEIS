# SEIS CLOSED CODE Backlog

Drive Sheet: https://docs.google.com/spreadsheets/d/1sxnxOz9ZRzwZAz2FmHt_3YzAhQjKL2sQbYR1uWdGsaQ

## Active Sprint: OpenAI-curated Build

Source: [`docs/platform/openai-curated-build-workbench.md`](../docs/platform/openai-curated-build-workbench.md)

Structured sprint status (consumed by the cockpit Roadmap panel) lives at
[`data/roadmap-status.json`](../data/roadmap-status.json); keep the two in sync.

- Web cockpit: static milestone plus a Roadmap panel shipped at `apps/web/cockpit.html`; next, wire live GitHub refs instead of static records
- Backend state: Convex-first decided with state model committed at `apps/fullstack/state-model.json`; next, provision the Convex project once the auth/JWT decision record is implemented
- Workspace ops: operating layer committed at `integrations/workspace-operations.json` (5 lanes, mail/team-updates pending provisioning)
- Security quality gate: gate live at `docs/security/security-quality-gate.md` + `data/security-gate-status.json`; secret scan shipped, automation gate still blocked pending an error-tracking choice
- Mobile shell: Expo app scaffolded under `apps/android/SEISMobile/` (3 screens from the shared status snapshot); run `npm install` there to launch
- macOS inspector: contract + SwiftUI scaffold committed under `apps/macos/`; detail views pending
- Research memory: lane live at `docs/research/` with backend-state and auth/JWT notes; next sourced note: error-tracking decision reference

## P1

- Android: create Expo app shell
- Web: create browser app shell
- Full-stack: choose Convex-first or Supabase-first backend
- Data: normalize repo visibility and zip inventory
- Governance: keep `main` synced with canonical SEIS branch
- Drive: keep operating docs and backlog linked
- Calendar: run weekly build review

## P2

- macOS: create SwiftUI shell
- Data: dashboard source inventory
- Plugin: add optional MCP helpers once command shape stabilizes

## Done

- Web cockpit first milestone: static JSON-backed cockpit at `apps/web/cockpit.html` with repo, plugin, build, workspace, and safety panels
- Consolidated all ecosystem repositories into SEIS: snapshots under `sources/`, full history under `sources/<repo>/<branch>` branches
- Installed all locally visible Codex plugins: 179 active, 0 missing
- Added OpenAI-first plugin policy
- Added OpenAI-curated build workbench
- Created SEIS CLOSED CODE Drive operating plan
- Created Google Sheet platform backlog
- Created weekly Calendar build review
- Added closed-code policy and architecture files
- Added Android/Web/macOS/full-stack/data repo lanes
