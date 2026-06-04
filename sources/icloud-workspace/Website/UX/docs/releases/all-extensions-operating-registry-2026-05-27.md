# SEIS UX All Extensions Operating Registry - 2026-05-27

## Purpose

This registry turns the full plugin, skill, connector, and MCP ecosystem into a
controlled operating layer for the SEIS UX portfolio workspace.

The intent is not to blindly call every external system. The intent is to make
every available extension visible, classified, and available for the right task
without creating auth noise, privacy exposure, repository risk, or unnecessary
machine load.

## Current Workspace

- Workspace: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/Website/UX`
- Branch: `codex/seis-ux-cinematic-premium-foundation`
- GitHub remote: `git@github.com:emirhankudun/emirhan-kudun-portfolio.git`
- iCloud export folder: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/Website/UX-exports`

## Full Ecosystem Evidence

- MCP audit JSON: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/Website/UX-exports/mcp-connector-audit-2026-05-27.json`
- MCP audit Markdown: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/Website/UX-exports/mcp-connector-audit-2026-05-27.md`
- Skills inventory JSON: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/Website/UX-exports/skills-inventory-2026-05-27.json`
- Skills inventory Markdown: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/Website/UX-exports/skills-inventory-2026-05-27.md`
- Portable Git bundle: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/Website/UX-exports/seis-ux-cinematic-premium-foundation-2026-05-27.bundle`

## MCP Server Inventory

- Source command: `codex mcp list --json`
- Total configured MCP servers: 214
- Runtime readiness snapshot: 163 MCP records after live collection, including
  80 live entries and 83 retained archive-only references.
- Auth buckets:
  - `unsupported`: 159
  - `o_auth`: 16
  - `not_logged_in`: 39

## Skill Inventory

- Total local/plugin skills found: 1895
- Relevant to portfolio, publishing, platform, frontend, deployment, GitHub,
  Vercel, mobile, security, MCP, release, and workflow work: 966

## Required Operating Rule

All available extensions are part of the SEIS operating ecosystem, but they are
activated proportionally:

1. Use direct code and local checks for local repository work.
2. Use GitHub tools only when repository auth is available.
3. Use Vercel tools only when deployment, logs, environment variables, or preview
   work is requested and auth/CLI prerequisites are satisfied.
4. Use Supabase tools only for database/schema/data work and never for blind
   writes.
5. Use browser/playwright tools only for route validation, screenshots, or
   interaction QA.
6. Use Figma/Adobe/design tools only for visual design, assets, or handoff work.
7. Use security tools only for scans, dependency review, or release hardening.
8. Use docs MCPs for current vendor guidance instead of memory when platform
   details may have changed.
9. Mark unavailable connectors as `skipped_with_reason` instead of forcing them.
10. Never run all connectors at once just to consume them.

## Active Use In This Share Pass

- Local Git: repository state, branch, commits, bundle verification.
- GitHub SSH: attempted branch push; blocked by public key auth.
- GitHub connector: attempted repository lookup; blocked with `404 Not Found`.
- MCP CLI: full MCP server inventory collected.
- Local skill inventory: full local/plugin skill scan collected.
- Codex automation: `seis-ux-portfolio-workspace-continuation` updated in place
  to use connected plugins, MCPs, skills, and automations as a governed
  capability map.
- iCloud Drive: bundle, audit reports, and share notes exported.
- Release docs: share readiness and extension registry committed into the repo.

## Current External Blockers

- GitHub server push: blocked by SSH public key auth.
- GitHub CLI: not logged in.
- GitHub connector: repository lookup returns `404 Not Found`.
- Vercel CLI: not installed.
- Rootly: API token not configured.
- Several remote MCP connectors: enabled but not logged in.

## GitHub Resume Commands

```bash
gh auth login -h github.com
ssh -T git@github.com
git push -u origin codex/seis-ux-cinematic-premium-foundation
```

## Policy

SEIS should use the full extension universe as a governed capability map:
visible, classified, available, and safe. The system should not create
unnecessary external calls, mutate third-party systems without intent, or treat
auth failures as code failures.

## Validation Addendum

- Command: `npm run check:ai-workflow-policy`
- Result: passed; 109 files scanned, Lovable preference guarded and suspended references absent.
- Timestamp: 2026-05-27T18:14:58Z

- Command: `npm run checks`
- Result: passed; AI workflow policy included in the main gate sequence.
- Timestamp: 2026-05-27T18:14:58Z

- Command: `npm run lint`
- Result: passed.
- Timestamp: 2026-05-27T18:14:58Z

- Command: `npm run typecheck`
- Result: passed.
- Timestamp: 2026-05-27T18:14:58Z

- Command: `codex_app.automation_update`
- Result: updated `seis-ux-portfolio-workspace-continuation` in place with governed plugin, MCP, skill, and automation usage rules.
- Timestamp: 2026-05-27T18:14:58Z

- Command: `npm run collect:mcp-readiness && npm run check:runtime`
- Result: passed; runtime MCP snapshot refreshed with live entries while retaining archive-only references when the source archive is unavailable.
- Timestamp: 2026-05-27T18:24:40Z
