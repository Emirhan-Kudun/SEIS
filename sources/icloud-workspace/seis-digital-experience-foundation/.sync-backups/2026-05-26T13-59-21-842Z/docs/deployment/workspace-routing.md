# Workspace Routing

This folder may be used as a local SEIS staging workspace even when it is not a
Git checkout.

## Canonical Intent

- GitHub branch target: `UIXAppTTR`
- Single remote branch mode: enabled
- Local staging folder: `Github/New project`
- Git checkout requirement: only required before commit, push, or remote
  shipment

## Operating Rule

When this folder is not inside a Git work tree, agents may still run local
quality checks, update portable source files, and prepare reviewed artifacts.
They must not claim that remote shipment happened.

When this folder is inside a Git work tree, it must use `UIXAppTTR` and the
UIX-Apps GitHub remote.

## Validation

```bash
npm run check:workspace
npm run automation:publish-readiness
```

This check prevents branch-policy confusion by distinguishing local staging
from an authenticated Git checkout.

`automation:publish-readiness` is the final preflight before a GitHub server
push. It must pass before claiming that code was shipped to GitHub.
