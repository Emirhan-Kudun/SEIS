# SEIS Local Archive Automation Plan

## Purpose

Keep the portfolio branch portable, recoverable and easy to hand off without
requiring a live GitHub push on every development loop.

## Cadence

- Manual checkpoint: run after each meaningful local commit.
- Scheduled checkpoint: daily at 20:30 Europe/Istanbul when the machine is awake.
- Pre-release checkpoint: run after `lint`, `checks`, `typecheck`, `build` and `report:budgets`.

## Command

```bash
npm run share:icloud-github
```

## Outputs

- iCloud Git bundle in `/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/Website/UX-exports`.
- Share status note with timestamp, branch, commit hash, worktree cleanliness, origin, bundle result and GitHub auth state.

## Safety Rules

- The command must always create the iCloud bundle before attempting remote publication.
- GitHub push is allowed only when `gh auth status -h github.com` is configured.
- Missing GitHub auth is a clean blocker, not a retry loop.
- Secrets, tokens and credentials must never be written into source files or release notes.
- A dirty worktree is recorded in the status note and should be followed by a clean export after the next commit.

## Evidence

- Release evidence lives in `docs/releases/seis-deficiency-closure-2026-05-27.md`.
- Budget evidence lives in `docs/releases/site-budget-report.json`.
- Branch governance lives in `docs/github-branch-governance.md`.

## Recovery

To restore from a bundle:

```bash
git clone /path/to/export.bundle restored-ux
cd restored-ux
git status
```
