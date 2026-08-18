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
| macOS | **Reference implementation** | [`apps/macos/SEISInspector/ContentView.swift`](../macos/SEISInspector/ContentView.swift), SwiftUI, already scaffolded. |
| Windows | Shell **scaffolded**, build pending | [`apps/desktop/native/src-tauri`](./native/src-tauri), a Tauri shell that loads the existing `apps/web/cockpit.html`. Source-level scaffold only — not yet compiled or tested on Windows. |
| Linux | **Build verified**, data-wiring pending | Same source tree as Windows. Actually compiled and run under `xvfb-run` on Ubuntu 24.04: the shell window opens and renders the cockpit's markup/styles. Several JSON-backed panels come up empty — see [`native/README.md`](./native/README.md#status-honestly) for the specific relative-path gap and how to reproduce the build. |

Nothing here claims a finished Windows build, or full data parity on Linux.
`shell-contract.json` now distinguishes the two honestly: Windows stays
`shell_scaffolded_build_pending`; Linux is `build_verified_data_wiring_pending`
— real compiled proof it runs, with a named, undone piece of work before it
could be called a `reference_implementation`.

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
5. Fix the `data/`/`content/` relative-path gap documented in
   `native/README.md` so the cockpit's panels render real data inside the
   shell — that, not just "opens a window," is the bar for
   `reference_implementation`.
6. Attempt and verify a Windows build; wire a Linux build into CI once step
   5 lands (CI's `ubuntu-latest` runners will need the same webkit2gtk-4.1
   workaround documented in `native/README.md`).
