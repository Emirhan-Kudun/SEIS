# Governance

## Branch Policy

Active work should remain on `codex/ux-apps-foundation` or a scoped branch family:

- `feature/*`
- `design/*`
- `motion/*`
- `api/*`
- `data/*`
- `docs/*`
- `governance/*`
- `observability/*`
- `rollback/*`

`main` and `stable` are protected release branches.

## Merge Policy

- Keep diffs small and reversible.
- Do not add runtime dependencies without a budget note.
- Do not add motion that ignores `prefers-reduced-motion`.
- Do not commit generated contact submissions.
- Do not copy raw archive output, `node_modules`, `.next`, `.DS_Store`, or iCloud metadata into the repo.
- Run `npm run quality` before release.

## External Handoff Policy

External source packages may be referenced from `docs/github-handoff.md`.

Before merging external work into this repository:

- preserve the dependency-free runtime unless a budget note approves a framework migration
- copy source files intentionally rather than mirroring full folders
- keep generated caches and local runtime output outside Git
- inspect zip sources in bounded slices; never extract an entire archive into the repo
- adapt cinematic, 3D, and visual-system ideas to reduced-motion and low-power rules
- run `npm run quality`
- commit the review as a small, reversible change

## Rollback Policy

The minimum safe rollback surface is:

- `src/server/server.mjs`
- `public/index.html`
- `public/styles.css`
- `public/app.js`
- `data/apps.json`
- `data/manifest.json`
- `data/governance.json`

If a future framework migration fails, keep these files runnable as the fallback baseline.
