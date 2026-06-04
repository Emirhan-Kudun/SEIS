#!/usr/bin/env bash
set -euo pipefail

echo "== Codex cloud setup =="
echo "Project: premium portfolio"

if command -v node >/dev/null 2>&1; then
  echo "Node: $(node --version)"
else
  echo "Node is required for local quality scripts."
  exit 1
fi

if command -v git >/dev/null 2>&1; then
  echo "Git: $(git --version)"
fi

chmod +x scripts/*.sh scripts/*.js

echo ""
echo "== Verify governance scripts =="
node --check scripts/branch-governance-check.js
node --check scripts/local-quality-gate.js
node --check scripts/content-intake-audit.js
node --check scripts/pr-ready-report.js

echo ""
echo "== Run production quality gate =="
node scripts/local-quality-gate.js --strict

echo ""
echo "Codex cloud setup complete."
