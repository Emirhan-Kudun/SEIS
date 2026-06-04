#!/usr/bin/env bash
set -euo pipefail

branch="${1:-codex/seis-ux-cinematic-premium-foundation}"

git status --short --branch
git push origin "HEAD:${branch}"
npm run share:icloud-github
