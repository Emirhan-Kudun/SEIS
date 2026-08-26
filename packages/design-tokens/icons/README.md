# SEIS Icon System

Part of the open `@seis/design-tokens` module (MIT, see
[`../LICENSE`](../LICENSE)). A small, deliberately bounded set of visual marks
— **never text standing in for a logo or icon.**

Background: [`../../../docs/design/icon-system-research.md`](../../../docs/design/icon-system-research.md).

## Rule

Every icon is an SVG with a real pictogram (a shape, not a letterform used as
a logo) plus an accessible name (`role="img"` + `<title>` / `aria-label`).
`npm run check:icon-system` enforces, for every entry in
[`icon-manifest.json`](./icon-manifest.json):

- the file exists and is a valid SVG;
- its `viewBox` matches the manifest;
- it carries an accessible name;
- it contains **no `<text>` element**;
- every hex color it uses is one of the canonical `--seis-*` token values
  (parsed live from [`../seis.tokens.css`](../seis.tokens.css) — no
  independent color literals).

## Icons

| Icon | Role | Meaning |
| --- | --- | --- |
| [`mark.svg`](./mark.svg) | master | The SEIS brand mark (ring + bars) |
| [`../../../apps/web/favicon.svg`](../../../apps/web/favicon.svg) | derivative | Browser icon, same mark |
| [`../../../apps/web/public/icons/apple-touch-icon.svg`](../../../apps/web/public/icons/apple-touch-icon.svg) | derivative | 180×180 touch icon, same mark |
| [`branch-status.svg`](./branch-status.svg) | module glyph | Repository / branch state |
| [`plugin-status.svg`](./plugin-status.svg) | module glyph | Plugin / module registry |
| [`zip-audit.svg`](./zip-audit.svg) | module glyph | Archive / governance gate |
| [`workspace-links.svg`](./workspace-links.svg) | module glyph | Workspace / external links |

The four module glyphs mirror the SF Symbols already used by the macOS
inspector (`arrow.triangle.branch`, `puzzlepiece.extension`, `archivebox`,
`link` — see
[`../../../apps/macos/SEISInspector/ContentView.swift`](../../../apps/macos/SEISInspector/ContentView.swift))
so the same four concepts read the same way on every platform. They are
referenced from the shared
[`apps/desktop/shell-contract.json`](../../../apps/desktop/shell-contract.json)
and from `apps/macos/inspector-contract.json`.

## Adding an icon

Only add one when a real, currently-being-built surface needs it (no
speculative icon sets — V14 §44 anti-bloat). Add the file, register it in
`icon-manifest.json` with its `viewBox`, and run `npm run check:icon-system`.
