#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== Branch Governance Check =="
if ! node scripts/branch-governance-check.cjs; then
  echo ""
  echo "Detayli rapor:"
  node scripts/branch-governance-check.cjs --template
  exit 1
fi

echo ""
echo "== Local Quality Gate =="
if ! node scripts/local-quality-gate.cjs --strict; then
  echo ""
  echo "Quality gate failed. Intake dosyalari ayrica kontrol etmek icin:"
  echo "node scripts/local-quality-gate.cjs --include-intake"
  exit 1
fi

echo ""
echo "== PR Template Format Snapshot =="
node scripts/branch-governance-check.cjs --template

echo ""
echo "Pre-merge governance check tamamlandi."
