# Release Readiness Runtime

This package turns missing launch/readiness planning into small runtime APIs.

The goal is not to deploy a heavy monitoring service. The goal is to keep local, iCloud, and future server handoff state visible through dependency-free JSON surfaces.

## Endpoints

```text
GET /api/quality-scorecard
GET /api/release-readiness
GET /api/orchestration-readiness
```

## Signals

The APIs summarize:

- multilingual coverage
- software-language branch coverage
- runtime module readiness
- server handoff blockers
- local preservation boundaries
- GitHub/server upload readiness

## Expected Status

Until GitHub auth is configured, release readiness can be locally healthy while remote shipment remains blocked.

That is intentional. The repo should distinguish:

- content quality
- local preservation safety
- remote authentication readiness

## Validation

Run:

```bash
npm run check:release-readiness
```

The check verifies endpoint wiring, docs, package scripts, and runtime module registration.
