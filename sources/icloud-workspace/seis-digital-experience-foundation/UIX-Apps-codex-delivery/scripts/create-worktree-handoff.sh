#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$ROOT_DIR" ]]; then
  echo "Error: this script must run inside a git repository." >&2
  exit 1
fi

cd "$ROOT_DIR"

if [[ ! -d .git ]]; then
  echo "Error: git metadata missing in repository root." >&2
  exit 1
fi

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$CURRENT_BRANCH" == "main" || "$CURRENT_BRANCH" == "master" ]]; then
  echo "Error: do not run handoff worktree creation from protected branch: $CURRENT_BRANCH" >&2
  exit 1
fi

TARGET_BRANCH="${1:-codex/seis-cloud-worktree-handoff}"
TARGET_DIR="${2:-../new-project-seis-cloud-worktree}"
BASE_REF="${3:-HEAD}"

if [[ -e "$TARGET_DIR" ]]; then
  echo "Error: target directory already exists: $TARGET_DIR" >&2
  exit 1
fi

if git show-ref --verify --quiet "refs/heads/$TARGET_BRANCH"; then
  echo "Using existing local branch: $TARGET_BRANCH"
  git worktree add "$TARGET_DIR" "$TARGET_BRANCH"
else
  echo "Creating branch $TARGET_BRANCH from $BASE_REF"
  git worktree add -b "$TARGET_BRANCH" "$TARGET_DIR" "$BASE_REF"
fi

cat <<INFO

Worktree created successfully.
- root: $ROOT_DIR
- source branch: $CURRENT_BRANCH
- handoff branch: $TARGET_BRANCH
- handoff path: $TARGET_DIR

Next steps:
1. cd "$TARGET_DIR"
2. git status --short --branch
3. node scripts/branch-governance-check.js
4. node scripts/local-quality-gate.js
INFO
