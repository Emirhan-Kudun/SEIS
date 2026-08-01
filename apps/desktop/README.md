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
| Windows | Contract defined, implementation **pending** | Plan: wrap the existing `apps/web` cockpit (same views, same entities) in a native shell — not a rewrite. No code yet. |
| Linux | Contract defined, implementation **pending** | Same plan as Windows. No code yet. |

Nothing here claims a Windows or Linux build exists. `shell-contract.json`
records `contract_defined_implementation_pending` for both, and that is the
truthful state.

## Shared views

All four views are defined once in `shell-contract.json`, reference the same
entities from [`apps/fullstack/state-model.json`](../fullstack/state-model.json),
and point at the same visual icon (never text) from
[`packages/design-tokens/icons`](../../packages/design-tokens/icons):
Branch Status, Plugin Status, Zip Audit, Workspace.

## Next steps (tracked, not claimed done)

1. Decide the Windows/Linux shell technology against the plan above (likely a
   thin native wrapper around `apps/web/cockpit.html`, since it already
   implements the same contract — no new UI framework needed for a first cut).
2. Scaffold that wrapper once decided; keep `shell-contract.json` as the
   single source of truth for its views.
3. Extend `npm run check:app-shell-contracts` per-platform status assertions
   as real scaffolds land (it already validates icon presence and the
   visual-not-text rule for every view in this contract).
