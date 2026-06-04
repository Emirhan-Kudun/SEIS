# SEIS UX Share Status - 2026-05-27

## Local / iCloud Drive

- Status: shared to iCloud Drive.
- Workspace: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/Website/UX`
- Branch: `codex/seis-ux-cinematic-premium-foundation`
- Head: `53cdc2a governance(mcp): preserve archive references in readiness collection`
- Worktree: clean at export time.

## Portable Git Bundle

- Bundle: `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/Website/UX-exports/seis-ux-cinematic-premium-foundation-2026-05-27.bundle`
- Verification: bundle is valid and records complete history.
- Included ref: `refs/heads/codex/seis-ux-cinematic-premium-foundation`
- Included head: `53cdc2a82fb1086b591fea0ba31275c85b07b4b7`

## Extension / MCP / Automation Use

- MCP inventory collected with `codex mcp list --json`.
- Runtime MCP snapshot refreshed with `npm run collect:mcp-readiness`.
- Snapshot result: 163 records, including 80 live entries and 83 retained archive-only references.
- Skill inventory collected from local/plugin skill folders.
- Automation updated in place: `seis-ux-portfolio-workspace-continuation`.
- Automation policy: use connected plugins, MCPs, skills, and automations as a governed capability map; skip unavailable connectors with reason.

## GitHub Push Status

- Remote: `git@github.com:emirhankudun/emirhan-kudun-portfolio.git`
- Result: blocked by local SSH auth.
- Error: `git@github.com: Permission denied (publickey).`
- GitHub CLI status: not logged in.
- GitHub connector status: repo lookup returned `404 Not Found`.

## Resume Commands After GitHub Auth Is Fixed

```bash
gh auth login -h github.com
ssh -T git@github.com
git push -u origin codex/seis-ux-cinematic-premium-foundation
```

## Bundle Recovery Option

If this checkout is unavailable later, fetch the branch from the bundle:

```bash
git clone seis-ux-cinematic-premium-foundation-2026-05-27.bundle seis-ux-recovered
cd seis-ux-recovered
git remote add origin git@github.com:emirhankudun/emirhan-kudun-portfolio.git
git push -u origin codex/seis-ux-cinematic-premium-foundation
```
