#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function loadPolicy(repoRoot) {
  const policyPath = path.join(repoRoot, "config", "branch-governance-policy.json");
  const raw = fs.readFileSync(policyPath, "utf8");
  return JSON.parse(raw);
}

function main() {
  const commitMsgFile = process.argv[2];
  if (!commitMsgFile) {
    process.exit(0);
  }

  const repoRoot = process.cwd();
  const policy = loadPolicy(repoRoot);
  const message = fs.readFileSync(commitMsgFile, "utf8").trim();

  if (!message) {
    console.error("Commit blocked: bos commit mesaji.");
    process.exit(1);
  }

  const allowed = policy.commit_prefixes.join("|");
  const pattern = new RegExp(`^(${allowed}):\\s.+`);

  if (!pattern.test(message)) {
    console.error("Commit blocked: commit mesaji policy ile uyumlu degil.");
    console.error(`Beklenen format: (${policy.commit_prefixes.join(", ")}): <aciklama>`);
    console.error(`Ornek: fix: resolve mobile overflow on hero section`);
    process.exit(1);
  }
}

main();
