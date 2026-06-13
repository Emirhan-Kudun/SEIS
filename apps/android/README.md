# Android Lane

The Android lane starts with Expo and validates through the Test Android Apps workflow.

## Initial Direction

- create an Expo app shell when implementation begins
- keep shared product logic in `packages/core`
- keep visual primitives in `packages/ui`
- use Android emulator testing before release decisions

## Plugin Stack

- Expo
- Test Android Apps
- GitHub
- SEIS plugin

## First Build Tasks

1. ~~Choose package manager and Expo template~~: Expo SDK 51 blank-typescript,
   hand-authored under [`SEISMobile/`](./SEISMobile/); deps declared in
   `SEISMobile/package.json`, `node_modules` not vendored. Owner approved the
   runtime 2026-06-13. Install: `cd apps/android/SEISMobile && npm install`.
2. ~~Define app navigation~~: bottom tabs over three screens (Status, Build
   Review, Plugin Health) implemented in `SEISMobile/App.tsx`, each rendering
   from the generated `SEISMobile/src/data/status.json` snapshot; auth shell
   follows the fullstack auth/JWT decision.
3. Connect full-stack backend when `apps/fullstack` is provisioned.
4. Add Android emulator smoke tests (first: render the status screen from a
   bundled cockpit-status snapshot).
