# macOS Lane

The macOS lane is for local desktop tools around SEIS: repo inspection, archive audit, plugin management, and data review.

This lane is now the **reference implementation** of the shared
[`apps/desktop/shell-contract.json`](../desktop/shell-contract.json), which
also covers Windows and Linux (both `shell_scaffolded_build_pending` today —
a real Tauri source scaffold exists but isn't compiled or shipped yet, see
[`apps/desktop/README.md`](../desktop/README.md)). The four views below stay
identical across all three platforms, including their icons.

## Initial Direction

- use SwiftUI for first-party desktop surfaces
- keep shell commands and GitHub checks explicit
- avoid deleting repos or local archives from UI until verification gates are satisfied

## Plugin Stack

- Build macOS Apps
- GitHub
- SEIS plugin

## First Build Tasks

1. ~~Define a small SwiftUI shell~~: scaffold at
   [`SEISInspector/ContentView.swift`](./SEISInspector/ContentView.swift),
   view map in [`inspector-contract.json`](./inspector-contract.json).
2. Show SEIS branch and repo visibility status (branch_status view).
3. Add plugin status and zip audit views (contract defined; detail views pending).
4. Add export links to Drive docs and Calendar reviews (workspace_links view).
