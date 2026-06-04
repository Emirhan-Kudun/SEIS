# MCP and Skill Activation Ledger

This ledger records the safe interpretation of "maximum activation" for the UIX-Apps and UX Apps consolidation.

## Canonical Target

- Repository: `https://github.com/emirhankudun-ux/UIX-Apps.git`
- Branch: `UIXAppTTR`
- Imported module: `apps/ux-apps-foundation`

## Used

- Git and local repository scripts: repo state, branch comparison, CodeQL workflow import, local quality checks.
- Shell-based static inspection: file inventory, package scripts, README and workflow inspection.
- UX Apps local quality scripts: `npm --prefix apps/ux-apps-foundation run quality`.
- Browser/Playwright MCP: rendered the UX Apps module locally and verified `#archive`, `#promotion`, and `#cinematic` without console errors.
- Root static checks: security, semantic SEO, browser fallback, Jest, and publish preflight.

## Planned or Conditional

- GitHub CLI/API: use only after `gh auth status -h github.com` succeeds.
- Figma/design tooling: use only when a Figma file or explicit visual handoff is requested.
- Security scanners such as CodeQL or Semgrep: use for static/security review when available without writing secrets.
- Documentation/context tools: use for current framework documentation when changing library or framework behavior.

## Skipped With Reason

- CRM, email, calendar, finance, sales, and meeting connectors: unrelated to this repository consolidation.
- Cloud deployment connectors: deployment was not requested and would introduce account/auth side effects.
- Write-capable external connectors: skipped unless a specific destination, account, and action are confirmed.
- Broad "run every plugin" activation: skipped because many tools require auth, may cost money, or mutate external systems.

## Safety Rules

- Do not write secrets or connector tokens to the repo.
- Do not push until GitHub auth is available and preflight passes.
- Do not import zip caches, `.git`, `node_modules`, `.next`, `__MACOSX`, `.DS_Store`, local logs, or runtime output.
- Keep new work small, reversible, and branch-scoped.
