#!/usr/bin/env node
// Enforces the hybrid governance model's open-module contract: every module
// listed in the registry must exist, carry its own LICENSE, and be recorded in
// CONTRIBUTING.md. This keeps "open" explicit and auditable — a module is open
// only by deliberate, registered opt-in (V14 hybrid resolution).
const { existsSync, readFileSync } = require("node:fs");
const { join } = require("node:path");

const registryPath = "content/governance/open-modules.json";
const contributingPath = "CONTRIBUTING.md";
const failures = [];
const ensure = (condition, message) => {
  if (!condition) failures.push(message);
};

ensure(existsSync(registryPath), `missing ${registryPath}`);
ensure(existsSync(contributingPath), `missing ${contributingPath}`);

let registry = null;
if (existsSync(registryPath)) {
  try {
    registry = JSON.parse(readFileSync(registryPath, "utf8"));
  } catch (error) {
    failures.push(`${registryPath} is not valid JSON: ${error.message}`);
  }
}

const contributing = existsSync(contributingPath)
  ? readFileSync(contributingPath, "utf8")
  : "";

if (registry) {
  ensure(registry.id === "seis-open-modules", "registry id must be seis-open-modules");
  const modules = Array.isArray(registry.modules) ? registry.modules : [];
  for (const mod of modules) {
    ensure(mod.path, "each module must define a path");
    ensure(mod.license, `module ${mod.path || "?"} must declare a license`);
    if (mod.path) {
      ensure(existsSync(mod.path), `module path does not exist: ${mod.path}`);
      // The closed-code LICENSE only yields rights where a file "says otherwise
      // in writing" — so an open module MUST carry its own LICENSE file.
      ensure(
        existsSync(join(mod.path, "LICENSE")),
        `open module ${mod.path} must carry its own LICENSE file`,
      );
      ensure(
        contributing.includes(mod.path),
        `open module ${mod.path} must be listed in CONTRIBUTING.md`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error("Open-modules check failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

const count = registry && Array.isArray(registry.modules) ? registry.modules.length : 0;
console.log(`Open-modules check passed (${count} open module${count === 1 ? "" : "s"}).`);
