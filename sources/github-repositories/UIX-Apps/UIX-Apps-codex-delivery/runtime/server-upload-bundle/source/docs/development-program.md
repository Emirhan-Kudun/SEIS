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

## Source Contract

```text
config/development-program.json
```

This file is intentionally small. It is the place to adjust sprint direction without rewriting runtime code.

## Validation

```bash
npm run check:development-program
```

The check keeps the config, runtime endpoint, docs, and quality script wired together.
