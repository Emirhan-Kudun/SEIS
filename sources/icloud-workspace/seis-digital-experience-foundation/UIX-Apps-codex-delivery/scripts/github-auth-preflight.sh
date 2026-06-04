#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$ROOT_DIR" ]]; then
  echo "Error: run this inside a git repository." >&2
  exit 1
fi

cd "$ROOT_DIR"

REMOTE_URL="$(git config --get remote.origin.url || true)"
if [[ -z "$REMOTE_URL" ]]; then
  echo "Error: remote.origin.url is not configured." >&2
  exit 1
fi

echo "Auth preflight"
echo "- repo: $ROOT_DIR"
echo "- remote: $REMOTE_URL"

auth_ok=0

if command -v gh >/dev/null 2>&1; then
  if gh auth status -h github.com >/dev/null 2>&1; then
    echo "- gh auth: ready"
    auth_ok=1
  else
    echo "- gh auth: missing"
  fi
else
  echo "- gh auth: gh cli not found"
fi

if [[ "$REMOTE_URL" =~ ^git@github.com: ]]; then
  if ssh -T git@github.com -o BatchMode=yes -o StrictHostKeyChecking=accept-new >/tmp/seis_ssh_check.out 2>&1; then
    echo "- ssh key auth: ready"
    auth_ok=1
  else
    if rg -n "successfully authenticated" /tmp/seis_ssh_check.out >/dev/null 2>&1; then
      echo "- ssh key auth: ready"
      auth_ok=1
    else
      echo "- ssh key auth: missing"
    fi
  fi
fi

if [[ "$auth_ok" -eq 1 ]]; then
  echo "Result: auth ready for push"
  exit 0
fi

echo "Result: auth missing for push"
echo "Fix options:"
echo "1) gh auth login -h github.com --web"
echo "2) configure SSH key and switch remote to git@github.com:<owner>/<repo>.git"
exit 1
