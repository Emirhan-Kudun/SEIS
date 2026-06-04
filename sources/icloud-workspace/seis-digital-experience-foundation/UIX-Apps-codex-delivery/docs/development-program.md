# Development Program

The development program turns broad growth requests into a small, quality-gated sprint surface.

## Runtime Endpoint

```text
GET /api/development-program
```

The endpoint combines:

- current sprint identity
- UX Apps, cinematic UI, polyglot branch, and server delivery lanes
- quality and release readiness signals
- server target environment availability
- decision slots that can be edited before the next sprint
- `automationPolicy.polyglotLanguageGrowth`, which preserves the current 26-lane software-language target and tells automation how to expand it safely

## Source Contract

```text
config/development-program.json
```

This file is intentionally small. It is the place to adjust sprint direction without rewriting runtime code.

## Polyglot Automation

The development automation treats software-language breadth as a first-class growth lane, but not as permission to add heavy toolchains. The current policy keeps at least 26 governed lanes and requires future language growth to update:

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

## Validation

```bash
npm run check:development-program
```

The check keeps the config, runtime endpoint, docs, and quality script wired together.
