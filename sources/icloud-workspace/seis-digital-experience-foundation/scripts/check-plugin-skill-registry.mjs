import { existsSync, readFileSync } from "node:fs";

const registryPath = "content/development/plugin-skill-registry.json";
const branchContractPath = "content/development/uixappttr-branch.json";
const failures = [];

const requiredSurfaceIds = [
  "core-coding-skills",
  "frontend-design-skills",
  "motion-3d-skills",
  "github-governance-connector",
  "cloud-deployment-connectors",
  "polyglot-language-skills",
  "ai-workflow-skills",
  "security-compliance-skills"
];

for (const file of [registryPath, branchContractPath]) {
  if (!existsSync(file)) {
    failures.push(`missing required file: ${file}`);
  }
}

const registry = readJson(registryPath);
const branchContract = readJson(branchContractPath);

if (registry?.repository !== "UIXApps") {
  failures.push("plugin and skill registry must target UIXApps");
}

if (registry?.branch !== "UIXAppTTR") {
  failures.push("plugin and skill registry must target UIXAppTTR");
}

if (registry?.mode !== "single-branch-sub-agent-surface") {
  failures.push("plugin and skill registry must use single-branch-sub-agent-surface mode");
}

if (registry?.activationPolicy?.default !== "registry-first") {
  failures.push("plugin and skill registry must keep registry-first activation");
}

if (registry?.activationPolicy?.branching !== "no-new-long-lived-branches") {
  failures.push("plugin and skill registry must block new long-lived branches");
}

if (registry?.activationPolicy?.execution !== "low-power-static-first") {
  failures.push("plugin and skill registry must prefer low-power static execution");
}

if (branchContract?.repositoryName !== registry?.repository) {
  failures.push("plugin registry repository must match the UIXAppTTR branch contract");
}

if (branchContract?.branch !== registry?.branch) {
  failures.push("plugin registry branch must match the UIXAppTTR branch contract");
}

const subAgentIds = new Set((branchContract?.subAgents || []).map(agent => agent.id));
const surfaces = registry?.surfaces || [];
const surfaceIds = new Set();

if (surfaces.length < requiredSurfaceIds.length) {
  failures.push("plugin and skill registry must include all required surface groups");
}

for (const requiredId of requiredSurfaceIds) {
  if (!surfaces.some(surface => surface.id === requiredId)) {
    failures.push(`missing plugin or skill surface: ${requiredId}`);
  }
}

for (const surface of surfaces) {
  if (!surface.id || !surface.type || !surface.ownerAgent || !surface.purpose || !surface.activationRule) {
    failures.push(`plugin or skill surface is incomplete: ${surface.id || "unknown"}`);
  }

  if (surfaceIds.has(surface.id)) {
    failures.push(`duplicate plugin or skill surface id: ${surface.id}`);
  }
  surfaceIds.add(surface.id);

  if (!subAgentIds.has(surface.ownerAgent)) {
    failures.push(`surface ${surface.id || "unknown"} maps to unknown sub-agent ${surface.ownerAgent || "unknown"}`);
  }

  if (!Array.isArray(surface.allowedSurfaces) || surface.allowedSurfaces.length === 0) {
    failures.push(`surface ${surface.id || "unknown"} must define allowed surfaces`);
  }

  if (!["low", "medium", "high"].includes(surface.risk)) {
    failures.push(`surface ${surface.id || "unknown"} must use low, medium, or high risk`);
  }

  if (!["active", "guarded"].includes(surface.status) && !String(surface.status || "").startsWith("blocked")) {
    failures.push(`surface ${surface.id || "unknown"} has unsupported status ${surface.status || "unknown"}`);
  }
}

const cloudSurface = surfaces.find(surface => surface.id === "cloud-deployment-connectors");
if (!String(cloudSurface?.status || "").startsWith("blocked")) {
  failures.push("cloud deployment connectors must stay blocked until the server target is explicit");
}

const githubSurface = surfaces.find(surface => surface.id === "github-governance-connector");
const githubRuleText = `${githubSurface?.activationRule || ""} ${(registry?.rules || []).join(" ")}`.toLowerCase();
if (!githubRuleText.includes("gh auth") && !githubRuleText.includes("connector marker")) {
  failures.push("github governance connector must mention gh auth or connector markers");
}

const rules = registry?.rules || [];
if (!rules.some(rule => rule.includes("UIXAppTTR"))) {
  failures.push("registry rules must explicitly keep work inside UIXAppTTR");
}

if (!rules.some(rule => rule.toLowerCase().includes("dependencies"))) {
  failures.push("registry rules must guard dependency changes");
}

if (failures.length > 0) {
  console.error("Plugin and skill registry check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  repository: registry.repository,
  branch: registry.branch,
  mode: registry.mode,
  surfaces: surfaces.length,
  owners: [...new Set(surfaces.map(surface => surface.ownerAgent))].sort()
}, null, 2));

function readJson(file) {
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf8"));
}
