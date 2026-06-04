# SEIS Code Continuation Automation

## Automation

- Codex automation id: `seis-code-continuation`
- Cadence: hourly when the machine and Codex automation runtime are available
- Workspace: `/Users/emirhan/Documents/UX`
- Branch: `codex/seis-ux-cinematic-premium-foundation`

## Purpose

Continue SEIS development with small, reversible code improvements that can be committed, pushed to GitHub and exported to the iCloud Drive GitHub folder after validation.

## Allowed Focus Areas

- SEIS UX surfaces and premium interaction polish
- Cloud/server readiness and credential-safe preflight contracts
- Capability mesh, plugins, skills, MCPs and connector governance
- Connector activation manifest and Vercel TypeScript configuration readiness
- Polyglot GitHub language examples
- Accessibility, SEO, performance and release evidence
- Documentation that directly protects implementation behavior

## Required Flow

1. Inspect the current branch, worktree and recent changes.
2. Choose at most one scoped code improvement.
3. Keep edits small, reversible and aligned with SEIS calm technology principles.
4. Run targeted checks first, then broader checks when the touched surface requires them.
5. If checks pass, commit the change.
6. Push the active branch to GitHub.
7. Run `npm run share:icloud-github`.
8. Report the GitHub SHA, iCloud bundle path and any blockers.

## Safety Rules

- Do not use suspended builders or blocked MCP surfaces.
- Keep Lovable as the preferred AI-native product builder.
- Do not write secrets, tokens or provider credentials into source files.
- Do not run live server or cloud deploy without explicit `DEPLOY_*` or provider credentials and a confirmed target.
- Treat missing credentials as a clean blocker, not a retry loop.
- Do not batch unrelated refactors into an automation run.
- Keep `packages/runtime/src/connector-activation-manifest.json` aligned with cloud, GitHub, iCloud, design, code-intelligence and automation lanes.
