# Desktop Lane (macOS + Windows + Linux, shared)

This lane holds the **one shared contract** for the SEIS desktop inspector
across macOS, Windows, and Linux —
[`shell-contract.json`](./shell-contract.json), validated by
`npm run check:app-shell-contracts` (same script that already validates the
Android shell and the macOS inspector contract).

## Why this exists

Before this, `apps/macos` was its own island: a SwiftUI contract with no
shared source of truth with any future Windows or Linux build. That meant a
real risk of three apps quietly diverging (different views, different data
shapes, different icons) instead of one product on three platforms. See
[`docs/architecture/desktop-shell-unification.md`](../../docs/architecture/desktop-shell-unification.md)
for the full decision and research background
([`docs/design/icon-system-research.md`](../../docs/design/icon-system-research.md)).

## Status, honestly

| Platform | Status | Notes |
| --- | --- | --- |
| macOS | **Reference implementation** | [`apps/macos/SEISInspector/ContentView.swift`](../macos/SEISInspector/ContentView.swift), SwiftUI. A nav list plus a static placeholder detail pane — no real data binding. |
| Windows | Shell **scaffolded**, build pending | [`apps/desktop/native/src-tauri`](./native/src-tauri), a Tauri shell that loads the existing `apps/web/cockpit.html`. Source-level scaffold only — not yet compiled or tested on Windows. |
| Linux | **Reference implementation** | Same source tree as Windows. Compiled and run under `xvfb-run` on Ubuntu 24.04, **screenshot-verified**: the shell renders `cockpit.html` with full design-system styling and all six panels showing real, embedded data. See [`native/README.md`](./native/README.md#status-honestly) for how this was built and confirmed, including a real bug the first attempt at this had (loading the wrong page). |

Nothing here claims a finished Windows build. `shell-contract.json` records
Linux as `reference_implementation` on real, screenshot-verified evidence —
not merely "it compiled" — while Windows stays
`shell_scaffolded_build_pending` (entirely unverified, no Windows toolchain
available in this environment).

## Shared views

All four views are defined once in `shell-contract.json`, reference the same
entities from [`apps/fullstack/state-model.json`](../fullstack/state-model.json),
and point at the same visual icon (never text) from
[`packages/design-tokens/icons`](../../packages/design-tokens/icons):
Branch Status, Plugin Status, Zip Audit, Workspace.

## Next steps (tracked, not claimed done)

1. ~~Decide the Windows/Linux shell technology~~: [Tauri](https://tauri.app),
   wrapping `apps/web/cockpit.html` — see
   [`native/README.md`](./native/README.md) for why.
2. ~~Scaffold that wrapper~~: [`native/src-tauri`](./native/src-tauri).
   `shell-contract.json` stays the single source of truth for its views;
   `platforms.windows.scaffold` and `platforms.linux.scaffold` both point at
   this scaffold's `src/main.rs`.
3. ~~Extend `npm run check:app-shell-contracts` per-platform status
   assertions~~: it now also validates that every `platforms.*.scaffold`
   path exists and that every platform declares a `status`.
4. ~~Install the Rust/Tauri toolchain and actually build the scaffold~~: done
   on Linux (Ubuntu 24.04, headless via `xvfb-run`) — see
   [`native/README.md`](./native/README.md) for the exact steps and the
   pkg-config workaround this required. Windows still unattempted.
5. ~~Fix the relative-path gap so the cockpit's panels render real data
   inside the shell~~: done — `native/stage-assets.mjs` stages
   `packages/design-tokens` and `packages/ui` alongside `apps/web/` so
   `cockpit.html`'s own CSS links resolve, and `tauri.windows[0].url` now
   points at `cockpit.html` instead of defaulting to `index.html`. Verified
   with a screenshot, not just log output.
6. ~~Wire a Linux build into CI~~: done —
   [`.github/workflows/desktop-shell-linux-build.yml`](../../.github/workflows/desktop-shell-linux-build.yml)
   builds the shell and headlessly smoke-tests it under Xvfb on
   `ubuntu-latest`, using the webkit2gtk-4.1 workaround documented in
   `native/README.md`, on every push/PR touching the desktop shell.
7. Attempt and verify a Windows build — still entirely unattempted.
8. Decide whether to reconcile `shell-contract.json`'s four abstract
   `view_id`s with `cockpit.html`'s actual six panels — a pre-existing
   looseness in the "wrap the cockpit" plan, unchanged by this work.
