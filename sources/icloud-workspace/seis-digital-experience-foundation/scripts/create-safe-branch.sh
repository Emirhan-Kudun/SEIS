#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_BRANCH="${1:-}"

if [[ -z "$TARGET_BRANCH" ]]; then
  echo "Usage: bash scripts/create-safe-branch.sh <branch-name>"
  exit 1
fi

cd "$ROOT_DIR"

if [[ "$TARGET_BRANCH" == "main" || "$TARGET_BRANCH" == "master" ]]; then
  echo "Blocked: main/master uzerinde gelistirme branch'i acilamaz."
  exit 1
fi

if [[ "$TARGET_BRANCH" == "codex/premium-local-foundation" ]]; then
  echo "Blocked: codex/premium-local-foundation artik Git branch'i degil; premium-local-foundation-agent lane'i UIXAppTTR icinde calisir."
  exit 1
fi

if node -e '
const fs=require("fs");
const policy=JSON.parse(fs.readFileSync("config/branch-governance-policy.json","utf8"));
const name=process.argv[1];
const ok=policy.allowed_branch_patterns.some((p)=>new RegExp(p).test(name));
if(!ok){process.exit(1);}
const singleMode=policy.single_branch_mode===true;
const primary=typeof policy.primary_work_branch==="string" ? policy.primary_work_branch.trim() : "";
const exceptions=Array.isArray(policy.single_branch_exceptions)
  ? policy.single_branch_exceptions.filter((item)=>typeof item==="string").map((item)=>item.trim()).filter(Boolean)
  : [];
const allowedByException=exceptions.includes(name);
if(singleMode && primary && name!==primary && !allowedByException){process.exit(2);}
' "$TARGET_BRANCH"; then
  :
else
  branch_check_status=$?
  if [[ "$branch_check_status" -eq 2 ]]; then
    echo "Blocked: single-branch mode aktif. Sadece primary branch kullanilabilir."
    echo "Primary branch: UIXAppTTR"
  else
    echo "Blocked: branch adi policy ile uyumlu degil."
    echo "Ornek: UIXAppTTR"
  fi
  exit 1
fi

if git rev-parse --verify "$TARGET_BRANCH" >/dev/null 2>&1; then
  git switch "$TARGET_BRANCH"
  echo "Switched existing branch: $TARGET_BRANCH"
else
  git switch -c "$TARGET_BRANCH"
  echo "Created and switched to branch: $TARGET_BRANCH"
fi
