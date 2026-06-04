# Tech Stack

- Package: `seis-digital-experience-foundation`, private, ESM (`type: module`).
- Primary code: vanilla/ESM static site generation and server adapters.
- Source roots visible: `apps/`, `packages/`, `server/`, `content/`, `polyglot/`, `scripts/`, `docs/`.
- Build output: `dist/seis-static.zip`; server release metadata in `dist/server-upload-manifest.json` and `releases/latest.json`.
- Key scripts: `scripts/build-static.mjs`, many `scripts/check-*.mjs`, server deploy/backup/drop scripts.
- No dependency install should be assumed; `package.json` currently exposes scripts but no dependency block in the quick-read section.