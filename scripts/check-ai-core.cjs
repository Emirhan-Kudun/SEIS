#!/usr/bin/env node
// Validates the SEIS AI Core foundation: the language-versions manifest is
// well-formed and every artifact it claims to govern actually exists, plus the
// subsystem specifications (model-router, agent-runtime, prompt-engine, evals)
// are present. Keeps the AI Core layer honest and auditable (V14 §17), matching
// the existing governance-check pattern.
const { existsSync, readFileSync } = require("node:fs");

const failures = [];
const ensure = (condition, message) => {
  if (!condition) failures.push(message);
};

// 1) Foundation files must exist.
const requiredFiles = [
  "docs/platform/seis-ai-core.md",
  "docs/platform/seis-language-versions.md",
  "content/governance/seis-language-versions.json",
  "packages/model-router/README.md",
  "packages/model-router/provider-interface.md",
  "packages/model-router/routing-policy.md",
  "packages/model-router/model-profiles.md",
  "packages/agent-runtime/README.md",
  "packages/agent-runtime/agents.md",
  "packages/prompt-engine/README.md",
  "packages/prompt-engine/prompt-format.md",
  "packages/prompt-engine/prompt-versioning.md",
  "packages/evals/README.md",
];
for (const file of requiredFiles) {
  ensure(existsSync(file), `missing required AI Core file: ${file}`);
}

// 2) Manifest must be well-formed and self-consistent.
const manifestPath = "content/governance/seis-language-versions.json";
let manifest = null;
if (existsSync(manifestPath)) {
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (error) {
    failures.push(`${manifestPath} is not valid JSON: ${error.message}`);
  }
}

if (manifest) {
  ensure(manifest.id === "seis-language-versions", "manifest id must be seis-language-versions");
  ensure(existsSync(manifest.doc || ""), `manifest doc does not exist: ${manifest.doc}`);
  ensure(existsSync(manifest.concept || ""), `manifest concept does not exist: ${manifest.concept}`);

  const versions = Array.isArray(manifest.versions) ? manifest.versions : [];
  ensure(versions.length > 0, "manifest must declare at least one version");

  const allowedStatus = new Set(["draft", "active", "superseded"]);
  const seen = new Set();
  for (const v of versions) {
    ensure(v.id, "each version must define an id");
    ensure(!v.id || !seen.has(v.id), `duplicate version id: ${v.id}`);
    if (v.id) seen.add(v.id);
    ensure(allowedStatus.has(v.status), `version ${v.id || "?"} has invalid status: ${v.status}`);
    ensure(typeof v.scope === "string" && v.scope.length > 0, `version ${v.id || "?"} must have a scope`);
    const governs = Array.isArray(v.governs) ? v.governs : [];
    for (const target of governs) {
      ensure(existsSync(target), `version ${v.id || "?"} governs missing path: ${target}`);
    }
  }
}

if (failures.length > 0) {
  console.error("AI Core check failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

const count = manifest && Array.isArray(manifest.versions) ? manifest.versions.length : 0;
console.log(`AI Core check passed: ${count} language version(s), ${requiredFiles.length} foundation files.`);
