#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$ROOT_DIR" ]]; then
  echo "Error: run this inside a git repository." >&2
  exit 1
fi

cd "$ROOT_DIR"

PRIMARY_BRANCH="${1:-codex/premium-local-foundation}"
HANDOFF_BRANCH="${2:-codex/seis-worktree-handoff}"

bash scripts/github-auth-preflight.sh

for branch in "$PRIMARY_BRANCH" "$HANDOFF_BRANCH"; do
  if ! git show-ref --verify --quiet "refs/heads/$branch"; then
    echo "Error: missing local branch $branch" >&2
    exit 1
  fi

done

echo "Pushing $PRIMARY_BRANCH"
git push -u origin "$PRIMARY_BRANCH"

echo "Pushing $HANDOFF_BRANCH"
git push -u origin "$HANDOFF_BRANCH"

echo "Push completed for both branches."
