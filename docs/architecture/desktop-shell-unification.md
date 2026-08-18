# Desktop Shell Unification (macOS + Windows + Linux)

Date: 2026-08-01

## Context

`apps/macos` held a SwiftUI inspector contract (`inspector-contract.json`)
with no Windows or Linux counterpart and no shared source of truth. Left
alone, a future Windows or Linux build would very likely diverge from it —
different views, different entity shapes, different iconography — turning
one product into three unrelated ones.

## Decision

Add one shared contract, [`apps/desktop/shell-contract.json`](../../apps/desktop/shell-contract.json),
that defines the views, entities, data contract, and icons once. Every
platform implements *that* contract instead of inventing its own:

- **macOS** already does, via `apps/macos/SEISInspector` (SwiftUI) — recorded
  as the `reference_implementation`. It's a nav list plus a static
  placeholder detail pane, no real data binding.
- **Windows** is recorded as `shell_scaffolded_build_pending`; **Linux** is
  now also `reference_implementation`. The plan — wrap the already-working
  `apps/web` cockpit, which already renders the same views against the
  same `apps/fullstack/state-model.json` entities, in a thin native shell
  rather than hand-writing two more native UIs — is a real source project:
  [`apps/desktop/native/src-tauri`](../../apps/desktop/native/src-tauri), a
  [Tauri](https://tauri.app) project whose webview loads
  `apps/web/cockpit.html` directly. This follows the research in
  [`docs/design/icon-system-research.md`](../design/icon-system-research.md):
  cross-platform desktop projects that succeed share one
  logic/design/data contract and let each OS render it appropriately, rather
  than forcing a rewrite per platform.
- Tauri was chosen over Electron: it ships a small native binary with no
  bundled Chromium runtime (fits SEIS's no-large-binaries /
  `check:secret-scan` governance posture), and one Tauri source tree
  naturally targets both Windows and Linux, matching this doc's own
  one-contract-many-platforms goal. On Linux this has been compiled, run,
  and **screenshot-verified** (`cargo build`, launched headlessly under
  `xvfb-run` on Ubuntu 24.04, captured with `xwd`): a real WebKitGTK window
  opens `cockpit.html` fully styled with the design-system CSS and all six
  panels showing real, embedded data — arguably more functionally complete
  than the macOS reference implementation. Getting there required fixing a
  real bug an earlier pass at this had missed (the window silently loaded
  the wrong page, `index.html`, instead of `cockpit.html`) and staging
  `packages/design-tokens`/`packages/ui` alongside the cockpit so its own
  CSS links resolve — both documented in
  [`apps/desktop/native/README.md`](../../apps/desktop/native/README.md).
  Windows remains source-only and unverified.

Icons for the four shared views come from the new
[`packages/design-tokens/icons`](../../packages/design-tokens/icons) system —
visual SVG glyphs, never text — chosen to match the SF Symbols already used
by the macOS scaffold (`arrow.triangle.branch`, `puzzlepiece.extension`,
`archivebox`, `link`) so the same four concepts read identically across
platforms.

## Consequences

- `npm run check:app-shell-contracts` now validates three contracts (Android,
  macOS, desktop) instead of two, and additionally validates that every view
  with an `icon` field points at a real, visual (non-`<text>`) SVG — closing
  a gap where that script existed but was not wired into any CI workflow.
- `apps/macos/inspector-contract.json` gained an `icon` field per view and a
  pointer at the shared contract; its required fields and `views` array are
  unchanged, so nothing that already passed stops passing.
- This is a contract-and-documentation change plus a screenshot-verified
  Linux build of the shell — not a Windows application. That is not
  claimed.

## Rollback

Revert this commit. `apps/desktop/`, the icon files under
`packages/design-tokens/icons/`, and this document are additive; removing
them restores the prior (macOS-only, unshared) state exactly.
