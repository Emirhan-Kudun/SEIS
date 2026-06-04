# Full-Stack Infrastructure Foundation

This layer prepares the portfolio for controlled full-stack growth without adding dependencies.

## Foundation Files

- `config/fullstack-runtime.json` defines runtime modules, storage boundaries, and quality gates.
- `config/cinematic-depth.json` defines the low-power cinematic depth layer for the development cockpit.
- `config/development-program.json` defines the current low-power development sprint lanes.
- `config/software-language-matrix.json` defines governed polyglot lanes for branch growth.
- `config/preservation-snapshot.json` defines local source integrity paths for server handoff.
- `config/server-upload-bundle.json` defines deterministic upload metadata for server publication.
- `config/server-target-profile.json` defines the env-driven dry-run and execution contract for real server transfer.
- `polyglot/manifest.json` maps governed language lanes to small starter code files.
- `data/content-model.json` defines portable service, project, inquiry, and runtime signal shapes.
- `scripts/fullstack-preflight.cjs` validates the local full-stack contract before packaging.
- `server.mjs` exposes the foundation through small JSON endpoints.

## API Foundation

- `GET /api/runtime-config` returns the runtime module contract.
- `GET /api/content-model` returns the portable content model.
- `GET /api/infrastructure` returns a compact infrastructure summary.
- `GET /api/software-languages` returns the governed software-language branch matrix.
- `GET /api/polyglot-foundation` returns the starter code manifest for the branch.
- `GET /api/preservation-snapshot` returns SHA-256 integrity metadata for protected source paths.
- `GET /api/server-upload-bundle` returns the deterministic server upload plan.
- `GET /api/server-target` returns the configured target profile and required environment availability.
- `GET /api/quality-scorecard` returns local quality signal scores.
- `GET /api/release-readiness` returns local-ready and remote-blocked release state.
- `GET /api/orchestration-readiness` returns the lightweight orchestration lane summary.
- `GET /api/availability` returns current local availability signals.
- `GET /api/cinematic-depth` returns the current cinematic depth contract and reduced-motion fallback.
- `GET /api/development-program` returns the current sprint, development lanes, quality signals, and server blocker summary.
- `GET /api/efficiency-mode` returns the token-heavy, machine-light operating profile.
- `GET /api/github-publication` returns the iCloud-local-first and GitHub-server-push contract.
- `GET /api/studio` returns a compact runtime studio summary.
- `POST /api/brief` analyzes inquiry readiness without writing runtime data.
- `POST /api/estimate` maps inquiry signals to a lightweight project estimate.

## Growth Path

1. Keep the current dependency-free Node runtime stable.
2. Move reusable content into `data/content-model.json` before introducing a database.
3. Add a database adapter only after the local JSON contract is stable.
4. Keep runtime submissions out of git.
5. Run the preflight script before rebuilding or publishing the full-stack package.

## Preflight

```bash
node scripts/fullstack-preflight.cjs
```

The preflight checks required files, required endpoints, translation coverage, and runtime storage boundaries.
