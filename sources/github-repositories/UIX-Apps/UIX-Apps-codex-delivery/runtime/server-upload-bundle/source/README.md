# UIX-Apps

Canonical repo for the premium portfolio, SEIS foundation, and UX Apps module.

The active GitHub delivery target is:

- repo: `https://github.com/emirhankudun-ux/UIX-Apps.git`
- branch: `codex/premium-local-foundation`

`main` remains protected. `UIXAppTTR` content is consolidated into the canonical branch, but ongoing work stays on `codex/premium-local-foundation`.

---

## UX Apps Foundation

The former local UX Apps repository now lives inside this repo at:

- `apps/ux-apps-foundation`

It keeps the low-power full-stack UX surface, including:

- cinematic spatial program
- archive intelligence API
- zip promotion lab
- local Node HTTP API
- dependency-light static frontend
- quality scripts and tests

Run the UX module:

```bash
npm run ux:dev
```

Validate it:

```bash
npm run ux:quality
```

The source zip at `/Users/emirhan/Downloads/Github a gönderilecekler.zip` is treated as a reviewed source reservoir. Useful material is promoted through JSON contracts and UI/API surfaces; raw archive structure, caches, local metadata, and dependency folders are not copied wholesale.

---

## Development Checks

Use the root quality gate before each commit:

```bash
npm run quality
```

Focused checks are also available:

- `npm run lint` runs static security, semantic SEO, and browser fallback checks.
- `npm run check:fullstack` validates the local full-stack runtime contract and promoted infrastructure files.
- `npm run check:i18n` validates the five-language branch contract across static keys, runtime locale lists, hreflang, and handoff metadata.
- `npm run check:server-handoff` validates the canonical server preservation target, branch, and raw-artifact exclusions.
- `npm run check:software-languages` validates the polyglot branch matrix for frontend, backend, scripting, systems, data, and governance lanes.
- `npm run check:polyglot-foundation` validates the real starter code files under `polyglot/`.
- `npm run check:release-readiness` validates the quality scorecard, release readiness, and orchestration readiness API wiring.
- `npm run check:preservation-snapshot` validates the local preservation manifest and SHA-256 source integrity surface.
- `npm run check:server-upload-bundle` validates the deterministic upload manifest used before server publication.
- `npm run check:server-target` validates the env-driven server target profile.
- `npm run check:development-program` validates the active sprint cockpit contract.
- `npm run check:cinematic-depth` validates the low-power cinematic depth layer.
- `npm run build:server-upload-bundle` generates a local transfer bundle under `runtime/server-upload-bundle`.
- `npm run server-upload:dry-run` prints the safe rsync/scp command once server env vars are configured.
- `npm run check:source-intake` validates preserved source-intake files without serving them as runtime.
- `npm test` runs the root Jest suite.
- `npm run ux:quality` runs the UX Apps module checks.
- `npm run publish:preflight` checks branch, origin, tree cleanliness, and GitHub auth readiness.

Known current static-security posture: `scripts/security-static-check.cjs` keeps high/medium findings empty and reports safe `target="_blank"` coverage as check telemetry.

UX Apps source relocation is tracked in `docs/ux-apps-source-relocation.md`; the canonical module lives at `apps/ux-apps-foundation/`.

Full-stack infrastructure promotion is tracked in `docs/full-stack-infrastructure.md`.

Standalone source intake from `Downloads/Yapılacak olanlar/files` is tracked in `docs/source-intake-yapilacak-olanlar.md`.

Server preservation and the canonical upload lane are tracked in `docs/server-preservation-handoff.md` and exposed locally through `/api/server-handoff`.

The governed software-language branch matrix is tracked in `docs/software-language-branch-foundation.md` and exposed locally through `/api/software-languages`.

Real starter code lanes live under `polyglot/`, are tracked in `docs/polyglot-foundation.md`, and are exposed locally through `/api/polyglot-foundation`.

Release readiness signals are tracked in `docs/release-readiness-runtime.md` and exposed locally through `/api/quality-scorecard`, `/api/release-readiness`, and `/api/orchestration-readiness`.

Local source preservation is tracked in `docs/preservation-snapshot.md` and exposed locally through `/api/preservation-snapshot`.

Server upload planning is tracked in `docs/server-upload-bundle.md` and exposed locally through `/api/server-upload-bundle`.

Server target configuration is tracked in `docs/server-target-profile.md` and exposed locally through `/api/server-target`.

The active development cockpit is tracked in `docs/development-program.md` and exposed locally through `/api/development-program`.

The first calm cinematic depth layer is tracked in `docs/cinematic-depth-layer.md` and exposed locally through `/api/cinematic-depth`.

---

## Premium Portfolio (Local-first)

Minimal, performance-focused and AI-assisted static portfolio architecture designed for speed, accessibility and maintainability.

---

## Local Development

Run a local server:

```bash
python3 -m http.server 4173
```

Open in browser:

- `http://localhost:4173/index.html`

---

## Project Structure

- `index.html`
  Main application file containing:
  - HTML
  - CSS
  - JavaScript
  - multilingual support (TR/EN/FR/IT/DE)
  - SEO metadata
  - accessibility structure
  - responsive system
  - lightweight animations

- `robots.txt`
  Basic search engine crawling configuration.

- `sitemap.xml`
  Technical SEO sitemap structure.

---

## Features

- Local-first architecture
- Responsive layout
- Accessibility-oriented structure
- SEO-ready metadata
- Lightweight performance-focused design
- GitHub Pages compatible
- Premium minimal UI system
- AI-assisted workflow ready

---

## Workflow

- Canonical development branch: `codex/premium-local-foundation`
- Protected main branch remains untouched
- Pull request workflow after local readiness
- Reversible changes
- Clean repository governance
- AI-assisted development structure
- MCP/skill usage is recorded through the activation ledger when relevant

---

## Production Notes

Before production deployment:

- replace all `https://example.com` URLs with your real domain
- validate SEO metadata and Open Graph tags
- test responsive behavior across devices
- optimize image assets if necessary

---

## Status

Currently in active development.
