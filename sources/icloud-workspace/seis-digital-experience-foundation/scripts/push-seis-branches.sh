#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$ROOT_DIR" ]]; then
  echo "Error: run this inside a git repository." >&2
  exit 1
fi

cd "$ROOT_DIR"

PRIMARY_BRANCH="${1:-UIXAppTTR}"

bash scripts/github-auth-preflight.sh

if [[ "$PRIMARY_BRANCH" != "UIXAppTTR" ]]; then
  echo "Error: UIXAppTTR is the only publishable branch for this repo." >&2
  exit 1
fi

if ! git show-ref --verify --quiet "refs/heads/$PRIMARY_BRANCH"; then
  echo "Error: missing local branch $PRIMARY_BRANCH" >&2
  exit 1
fi

echo "Pushing $PRIMARY_BRANCH"
git push -u origin "$PRIMARY_BRANCH"

echo "Push completed for $PRIMARY_BRANCH."
