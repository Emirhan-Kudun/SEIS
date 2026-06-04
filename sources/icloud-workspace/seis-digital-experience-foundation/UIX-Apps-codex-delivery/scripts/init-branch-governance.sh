#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== Installing hooks =="
bash scripts/install-git-hooks.sh

echo ""
echo "== Governance status =="
node scripts/branch-governance-check.js

echo ""
echo "== Local quality gate =="
node scripts/local-quality-gate.js

echo ""
echo "== PR plan template snapshot =="
node scripts/branch-governance-check.js --template

echo ""
echo "Branch governance initialization tamamlandi."
