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
  as the `reference_implementation`.
- **Windows** and **Linux** are recorded as `shell_scaffolded_build_pending`.
  The plan — wrap the already-working `apps/web` cockpit, which already
  renders the same four views against the same
  `apps/fullstack/state-model.json` entities, in a thin native shell rather
  than hand-writing two more native UIs — is now a real source scaffold:
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
  one-contract-many-platforms goal. The scaffold is source-only — no
  `Cargo.lock`, no CI build step, no installer; see
  [`apps/desktop/native/README.md`](../../apps/desktop/native/README.md) for
  what "scaffolded" honestly means here and what's still required to call it
  a `reference_implementation`.

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
- This is a contract-and-documentation change. It does not create a Windows
  or Linux application, and does not claim to.

## Rollback

Revert this commit. `apps/desktop/`, the icon files under
`packages/design-tokens/icons/`, and this document are additive; removing
them restores the prior (macOS-only, unshared) state exactly.
