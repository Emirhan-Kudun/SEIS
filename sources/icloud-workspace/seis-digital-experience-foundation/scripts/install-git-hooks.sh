#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

chmod +x "$ROOT_DIR/.githooks/pre-commit" "$ROOT_DIR/.githooks/pre-push" "$ROOT_DIR/.githooks/commit-msg"
git -C "$ROOT_DIR" config core.hooksPath .githooks

echo "Git hooks installed. Active hooks path: .githooks"
