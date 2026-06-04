# SEIS Worktree Publish Flow

## Goal

Publish both active branches with a safe and repeatable flow:

- `UIXAppTTR`
- `codex/seis-worktree-handoff`

## Scripts

- `scripts/github-auth-preflight.sh`
- `scripts/push-seis-branches.sh`

## Usage

```bash
bash scripts/github-auth-preflight.sh
bash scripts/push-seis-branches.sh
```

Optional explicit branch names:

```bash
bash scripts/push-seis-branches.sh UIXAppTTR codex/seis-worktree-handoff
```

## Notes

- Preflight must pass before push.
- If preflight fails, log into GitHub CLI or configure SSH key auth first.
- This flow does not push `main` and keeps branch-first governance intact.
