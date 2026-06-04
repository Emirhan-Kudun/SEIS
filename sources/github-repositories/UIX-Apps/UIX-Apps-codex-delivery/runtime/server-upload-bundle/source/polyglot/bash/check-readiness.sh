#!/usr/bin/env bash
set -euo pipefail

language_count="${1:-14}"

if [[ "$language_count" -lt 12 ]]; then
  echo "needs-work"
  exit 1
fi

echo "ready-with-blocker"
