#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  ".codex-plugin/plugin.json",
  "plugin.json",
  "skills/seis-trusted-marketplace/SKILL.md",
  "assets/seis-repo-connection.json",
  "assets/capability-map.json",
  "assets/marketplace-listing.json",
  "README.md",
  "CHANGELOG.md",
  "LICENSE",
  "docs/SEIS-UIXAppTTR-branch-binding.md",
  "docs/install-update-remove.md",
  "docs/publication-readiness.md",
  "docs/marketplace-setup.md",
  "docs/operations.md",
  "examples/personal-marketplace.example.json",
  ".github/workflows/validate.yml",
  "scripts/plugin-doctor.mjs"
];

function fail(message) {
  failures.push(message);
}

function readJson(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    fail(`Missing ${relativePath}`);
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(fullPath, "utf8"));
  } catch (error) {
    fail(`Invalid JSON in ${relativePath}: ${error.message}`);
    return null;
  }
}

function readText(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    fail(`Missing ${relativePath}`);
    return "";
  }

  return fs.readFileSync(fullPath, "utf8");
}

function ensure(condition, message) {
  if (!condition) fail(message);
}

for (const relativePath of requiredFiles) {
  ensure(fs.existsSync(path.join(root, relativePath)), `Required file missing: ${relativePath}`);
}

const codexManifest = readJson(".codex-plugin/plugin.json");
const rootManifest = readJson("plugin.json");
const connection = readJson("assets/seis-repo-connection.json");
const capabilityMap = readJson("assets/capability-map.json");
const marketplaceListing = readJson("assets/marketplace-listing.json");
const marketplaceExample = readJson("examples/personal-marketplace.example.json");
const skill = readText("skills/seis-trusted-marketplace/SKILL.md");
const readme = readText("README.md");
const branchDocs = readText("docs/SEIS-UIXAppTTR-branch-binding.md");
const workflow = readText(".github/workflows/validate.yml");

if (codexManifest && rootManifest) {
  ensure(codexManifest.name === "seis-trusted-marketplace", "Codex manifest name must stay stable");
  ensure(rootManifest.name === codexManifest.name, "Root manifest name must match Codex manifest");
  ensure(rootManifest.version === codexManifest.version, "Root manifest version must match Codex manifest");
  ensure(codexManifest.skills === "./skills/", "Codex manifest must point to skills directory");
  ensure(rootManifest.skills === "./skills/", "Root manifest must point to skills directory");
  ensure(codexManifest.interface?.displayName === "SEIS Trusted Marketplace", "Display name must stay stable");
  ensure(Array.isArray(codexManifest.interface?.capabilities), "Codex manifest must expose capabilities");
}

const requiredCapabilityIds = [
  "data-engineering",
  "development",
  "design",
  "learning",
  "monitoring",
  "productivity",
  "security",
  "testing"
];

if (capabilityMap) {
  ensure(capabilityMap.id === "seis-trusted-marketplace-capability-map", "Capability map id must stay stable");
  const ids = new Set((capabilityMap.capabilities || []).map((capability) => capability.id));
  for (const id of requiredCapabilityIds) {
    ensure(ids.has(id), `Capability map missing ${id}`);
  }

  for (const capability of capabilityMap.capabilities || []) {
    ensure(capability.label, `Capability ${capability.id || "unknown"} must define label`);
    ensure(capability.designerValue, `Capability ${capability.id || "unknown"} must define designerValue`);
    ensure((capability.routingSignals || []).length >= 4, `Capability ${capability.id || "unknown"} needs routing signals`);
    ensure((capability.activationGates || []).length >= 4, `Capability ${capability.id || "unknown"} needs activation gates`);
    ensure((capability.qualitySignals || []).length >= 4, `Capability ${capability.id || "unknown"} needs quality signals`);
  }
}

if (connection) {
  ensure(connection.id === "seis-trusted-marketplace-repo-connection", "Connection asset id must stay stable");
  ensure(connection.plugin?.name === "seis-trusted-marketplace", "Connection asset must name the plugin");
  ensure(connection.pluginRepository?.name === "seis-trusted-marketplace-plugin", "Connection asset must name the plugin source repository");
  ensure(connection.repository?.branch === "UIXAppTTR", "Connection asset must bind to UIXAppTTR");
  ensure(connection.repository?.githubRemote === "https://github.com/emirhankudun-ux/UIX-Apps.git", "Connection asset must bind to UIX-Apps remote");
}

if (marketplaceListing) {
  ensure(marketplaceListing.privatePersonal?.recommended === true, "Marketplace listing must recommend private personal mode");
  ensure(marketplaceListing.privatePersonal?.installation === "codex plugin add seis-trusted-marketplace@personal", "Marketplace listing must include install command");
  ensure(Array.isArray(marketplaceListing.publicPublishReady?.recommendedBeforePublicRelease), "Marketplace listing must include public readiness checklist");
}

if (marketplaceExample) {
  const plugin = marketplaceExample.plugins?.[0];
  ensure(marketplaceExample.name === "personal", "Example marketplace must be named personal");
  ensure(plugin?.name === "seis-trusted-marketplace", "Example marketplace must reference the plugin");
  ensure(plugin?.policy?.installation === "AVAILABLE", "Example marketplace must include installation policy");
  ensure(plugin?.policy?.authentication === "ON_INSTALL", "Example marketplace must include authentication policy");
}

for (const phrase of [
  "Data Engineering",
  "Development",
  "Design",
  "Learning",
  "Monitoring",
  "Productivity",
  "Security",
  "Testing",
  "UIXAppTTR",
  "npm run validate"
]) {
  ensure(skill.includes(phrase) || readme.includes(phrase) || branchDocs.includes(phrase), `Documentation must mention ${phrase}`);
}

ensure(workflow.includes("npm run validate"), "GitHub workflow must run npm run validate");
ensure(workflow.includes("npm run doctor"), "GitHub workflow must run npm run doctor");
ensure(readme.includes("npm run doctor"), "README must document npm run doctor");

if (failures.length > 0) {
  console.error("SEIS Trusted Marketplace plugin validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("SEIS Trusted Marketplace plugin validation passed.");
