# Polyglot Foundation

This folder turns the branch's software-language matrix into real starter code.

The goal is not to make every language production runtime today. The goal is to preserve small, reviewable language lanes that can grow without dependency bloat.

## Manifest

```text
polyglot/manifest.json
```

The manifest maps each governed language id to one small source file.

The current starter set covers 228 lanes across frontend, backend, scripting, systems, data, and governance categories. New reference languages are intentionally tiny source files, not new build systems.

The newest lanes are Release Readiness JSON, Rollback Plan JSON, and Change Impact JSON, represented as go-no-go gate, recovery path, and risk-surface readiness contracts before any live deployment automation is introduced.

## Runtime Endpoint

```text
GET /api/polyglot-foundation
```

The endpoint exposes the manifest, entry count, and language ids so future server handoff or release checks can verify that the polyglot branch survived intact.

## Validation

```bash
npm run check:polyglot-foundation
```

The check verifies:

- all required language ids have source files
- all files stay inside `polyglot/`
- language markers are present
- unsafe shell/network patterns are not introduced
- the runtime endpoint and docs are wired
