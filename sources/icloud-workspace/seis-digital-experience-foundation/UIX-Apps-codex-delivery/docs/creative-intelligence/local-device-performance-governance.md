# Local Device Performance Governance

This repo should remain productive on a 2019 15-inch MacBook Pro i9 without pushing the machine into unnecessary thermal pressure.

## Local Profile

Target local behavior:

- fast text and manifest edits
- lightweight script checks
- no unnecessary dev server
- no broad build loops
- no repeated browser automation unless visual verification is required
- no parallel heavy jobs

## Command Intensity

Low intensity:

- `git status --short --branch`
- `rg --files`
- `node scripts/branch-governance-check.cjs`
- `node scripts/local-quality-gate.cjs`
- focused `sed` or `rg` reads

Medium intensity:

- `npm test`
- `bash scripts/pre-merge-check.sh`
- single Next.js type or build check
- one browser validation pass

High intensity:

- Next.js production build loops
- browser automation across many routes
- image processing over large export folders
- WebGL scene profiling
- dependency installation
- Docker builds

High intensity commands should be run only when the task requires them.

## Website Budget

Default budget for future runtime work:

- keep initial route content readable without JavaScript-heavy effects
- lazy load noncritical media
- keep hero animation optional under reduced motion
- avoid permanent WebGL loops on content pages
- limit simultaneous animated elements
- prefer CSS opacity and transform over layout-affecting animation

## 3D Budget

A 3D scene must define:

- purpose
- fallback
- reduced-motion behavior
- texture budget
- frame-rate target
- mobile disable or simplification rule

No 3D dependency should be added for abstract decoration alone.

## Agent Execution Rule

For broad creative or architecture prompts, prefer documentation, manifests, and small review artifacts before runtime changes. Start dev servers, builds, Docker, or browser automation only when the next decision depends on live rendering evidence.
