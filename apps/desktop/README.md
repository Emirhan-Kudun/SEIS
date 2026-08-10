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
| Windows | Shell **scaffolded**, build pending | [`apps/desktop/native/src-tauri`](./native/src-tauri), a Tauri shell that loads the existing `apps/web/cockpit.html`. Source-level scaffold only — not yet compiled or shipped. |
| Linux | Shell **scaffolded**, build pending | Same Tauri scaffold as Windows (one source tree targets both). Source-level scaffold only — not yet compiled or shipped. |

Nothing here claims a Windows or Linux build exists. `shell-contract.json`
records `shell_scaffolded_build_pending` for both, and that is the truthful
state: real source files exist, but no toolchain has compiled them and no
installer has been produced or tested on either OS.

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
4. Install the Rust/Tauri toolchain and actually build the scaffold on
   Windows and Linux, then flip `platforms.windows.status` /
   `platforms.linux.status` from `shell_scaffolded_build_pending` to
   `reference_implementation` once verified.
