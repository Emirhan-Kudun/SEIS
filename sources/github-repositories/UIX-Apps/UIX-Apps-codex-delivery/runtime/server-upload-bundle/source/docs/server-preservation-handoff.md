# Server Preservation Handoff

This repo keeps one canonical delivery lane so the work does not disappear in local folders.

## Canonical Target

- repo: `https://github.com/emirhankudun-ux/UIX-Apps.git`
- branch: `codex/premium-local-foundation`
- local role: iCloud Drive mirror for active work
- remote role: source preservation server

## Before Upload

Run the low-power checks first:

```bash
npm run quality
npm run publish:preflight
```

If GitHub auth is ready, publish with:

```bash
GIT_TERMINAL_PROMPT=0 git push origin codex/premium-local-foundation
```

If `publish:preflight` reports missing GitHub auth, stop there. The content is ready locally, but remote shipment is blocked until `gh auth login -h github.com` or an explicit credential helper is configured.

## Multilingual Branch Contract

The canonical branch must keep these locale IDs aligned across static runtime, Node APIs, and the Next.js foundation:

- `tr`
- `en`
- `fr`
- `it`
- `de`

The static source of truth is `translations.json`. The runtime visibility endpoint is `/api/i18n-health`.

## Software Language Branch Contract

The canonical branch also keeps a governed polyglot matrix in `config/software-language-matrix.json`.

Runtime visibility endpoint:

```text
GET /api/software-languages
```

The matrix currently covers frontend, backend, scripting, systems, data, and governance lanes without adding new runtime dependencies.

## Preservation Rules

Do not ship raw local artifacts:

- `node_modules/`
- `.next/`
- `runtime/`
- `logs/`
- `__MACOSX/`
- `.DS_Store`
- `*.zip`

Promoted source material should move through reviewed folders such as `source-intake/`, docs, config, scripts, or runtime-safe data files.
