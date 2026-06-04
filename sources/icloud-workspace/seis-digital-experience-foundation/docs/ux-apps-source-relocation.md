# UX Apps Source Relocation

## Canonical Target

- Repository: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/UIX-Apps`
- Module target: `apps/ux-apps-foundation/`
- Branch: `UIXAppTTR`

## Source Reviewed

- Source folder: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/Uı/UX Apps`
- Role: earlier standalone UX Apps checkout used as source material for the canonical UIX-Apps repository.

## Promoted Into The Canonical Repository

- UX Apps source module: already promoted under `apps/ux-apps-foundation/`.
- Text normalization policy: promoted as root `.gitattributes`.
- Standalone quality workflow intent: promoted as `.github/workflows/ux-apps-quality.yml`, adapted to run `npm run ux:quality` from the canonical repo.
- Full-stack infrastructure source from the downloaded portfolio archive: promoted as `config/fullstack-runtime.json`, `data/content-model.json`, `docs/full-stack-infrastructure.md`, and `scripts/fullstack-preflight.cjs`.
- Standalone Dreamweaver-compatible portfolio source from `Downloads/Yapılacak olanlar/files`: promoted as reviewed source intake under `source-intake/yapilacak-olanlar/`.

## Intentionally Not Promoted

- `.git/`: local checkout metadata, not source.
- `.DS_Store`: macOS metadata, not source.
- Older `public/app.js` and `scripts/check.mjs`: superseded by the hardened canonical versions that avoid unsafe HTML rendering and enforce the renderer guard.
- Duplicate root artifacts with ` 2` suffixes: removed after byte-for-byte comparison, with canonical originals retained.

## Operating Rule

The iCloud GitHub folder now treats `UIX-Apps` as the single canonical repository. Future UX Apps changes should land inside `apps/ux-apps-foundation/` or root governance files, not in a separate standalone checkout.
