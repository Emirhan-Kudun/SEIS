#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NEXT_APP_DIR="$ROOT_DIR/apps/seis-nextjs-foundation"

cd "$ROOT_DIR"

echo "== SEIS Phase-2 Runbook =="

echo ""
echo "[1/4] Branch governance"
node scripts/branch-governance-check.js

echo ""
echo "[2/4] Static quality gate"
node scripts/local-quality-gate.js --strict

echo ""
echo "[3/4] Next foundation structure"
required_files=(
  "$NEXT_APP_DIR/package.json"
  "$NEXT_APP_DIR/app/layout.tsx"
  "$NEXT_APP_DIR/app/page.tsx"
  "$NEXT_APP_DIR/tailwind.config.ts"
)

for f in "${required_files[@]}"; do
  if [[ ! -f "$f" ]]; then
    echo "Missing required file: $f"
    exit 1
  fi
done

echo "Next foundation files: ok"

echo ""
echo "[4/4] Next app dependency state"
if [[ -d "$NEXT_APP_DIR/node_modules" ]]; then
  echo "node_modules found, running quick type/lint checks"
  (
    cd "$NEXT_APP_DIR"
    npm run lint >/dev/null 2>&1 || echo "lint check skipped or failed (non-blocking in this runbook)"
  )
else
  echo "node_modules not found. Run:"
  echo "cd apps/seis-nextjs-foundation && npm install"
fi

echo ""
echo "SEIS phase-2 runbook completed."
