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

1. ~~Choose package manager and Expo template~~: blank-typescript template
   recorded in [`shell-contract.json`](./shell-contract.json); Expo install
   waits on dependency-budget approval.
2. ~~Define app navigation~~: bottom tabs over three screens (status,
   build review, plugin health) in `shell-contract.json`; auth shell follows
   the fullstack auth/JWT decision.
3. Connect full-stack backend when `apps/fullstack` is provisioned.
4. Add Android emulator smoke tests (first: render the status screen from a
   bundled cockpit-status snapshot).
