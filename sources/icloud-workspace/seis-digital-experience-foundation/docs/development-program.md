# Development Program

The development program turns broad growth requests into a small, quality-gated sprint surface.

## Runtime Endpoint

```text
GET /api/development-program
```

The endpoint combines:

- current sprint identity
- active development mode for full-efficiency, machine-light work
- UX Apps, cinematic UI, polyglot branch, and server delivery lanes
- quality and release readiness signals
- server target environment availability
- decision slots that can be edited before the next sprint
- `automationPolicy.polyglotLanguageGrowth`, which preserves the minimum 26-lane software-language target, records the current 228 governed lanes, and tells automation how to expand safely
- `automationPolicy.workspaceRouting`, which keeps automation pointed at the canonical iCloud Drive checkout and `UIXAppTTR` branch
- decision slots such as `next-cinematic-surface` and `server-target`, which keep product/runtime choices explicit instead of hidden in automation prompts

## Source Contract

```text
config/development-program.json
```

This file is intentionally small. It is the place to adjust sprint direction without rewriting runtime code.

## Development Mode

The active mode is `full-efficiency-machine-light`: use more reasoning and token budget for better source decisions while keeping local execution static-first and low-thermal.

Allowed actions:

- Commit small reversible improvements to the canonical iCloud `UIX-Apps` checkout.
- Run targeted static checks before broader quality gates.
- Keep GitHub shipment behind authenticated publish preflight.
- Keep server upload execution blocked until target credentials are explicit.

Blocked actions:

- Retrying GitHub push when authentication is missing.
- Starting dev servers for static contract decisions.
- Running Docker or broad browser automation without a visual or deployment decision.

## Polyglot Automation

The development automation treats software-language breadth as a first-class growth lane, but not as permission to add heavy toolchains. The current policy keeps at least 26 governed lanes, records `currentGovernedLanes` as 228, and requires future language growth to update:

- `config/software-language-matrix.json`
- `polyglot/manifest.json`
- the starter source file under `polyglot/`
- marker checks in `scripts/polyglot-foundation-check.cjs`
- server handoff requirements
- documentation and rollback-safe review notes

Every automation run that touches language breadth should preserve these checks:

```bash
npm run check:software-languages
npm run check:polyglot-foundation
```

## Workspace Routing

Automation must use the canonical iCloud Drive GitHub workspace and the `UIXAppTTR` branch, not copied delivery folders or older local project paths.

The active canonical path resolves to `~/Library/Mobile Documents/com~apple~CloudDocs/Github/seis-digital-experience-foundation`. The historical `~/Library/Mobile Documents/com~apple~CloudDocs/Github/UIX-Apps` checkout remains an allowed iCloud alias for older automation records. Older `Documents/New project`, `Github/New project`, and nested `UIX-Apps-codex-delivery` paths are blocked by the routing check.

The development program records the same rule under `automationPolicy.workspaceRouting` so heartbeat automation can verify the canonical path suffix, blocked path segments, and required branch without reading the checker implementation.

```bash
npm run check:workspace-routing
npm run check:uixappttr-topology
```

## Decision Slots

`next-cinematic-surface` keeps calm cinematic promotion choices explicit.

`server-target` keeps live upload blocked until explicit host, user, path, and
credential decisions are available.

## Validation

```bash
npm run check:development-program
```

The check keeps the config, runtime endpoint, docs, and quality script wired together.
