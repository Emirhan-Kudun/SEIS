import { existsSync, readFileSync } from "node:fs";

const registryPath = "content/development/plugin-skill-registry.json";
const capabilityMapPath = "content/development/plugin-skill-capability-map.json";
const failures = [];

for (const file of [registryPath, capabilityMapPath]) {
  if (!existsSync(file)) {
    failures.push(`missing required file: ${file}`);
  }
}

const registry = readJson(registryPath);
const capabilityMap = readJson(capabilityMapPath);
const surfaces = registry?.surfaces || [];
const capabilities = capabilityMap?.capabilities || [];
const surfaceById = new Map(surfaces.map(surface => [surface.id, surface]));
const coveredSurfaceIds = new Set();
const capabilityIds = new Set();

if (capabilityMap?.repository !== registry?.repository) {
  failures.push("capability map repository must match plugin registry");
}

if (capabilityMap?.branch !== registry?.branch) {
  failures.push("capability map branch must match plugin registry");
}

if (capabilityMap?.coveragePolicy?.mode !== "capability-family-map") {
  failures.push("capability map must use capability-family-map mode");
}

if (!String(capabilityMap?.coveragePolicy?.dependencyPolicy || "").toLowerCase().includes("dependency")) {
  failures.push("capability map must keep a dependency policy");
}

if (capabilities.length < 10) {
  failures.push("capability map must include at least ten capability families");
}

for (const capability of capabilities) {
  if (!capability.id || !capability.label || !capability.surfaceId || !capability.ownerAgent) {
    failures.push(`capability is incomplete: ${capability.id || "unknown"}`);
  }

  if (capabilityIds.has(capability.id)) {
    failures.push(`duplicate capability id: ${capability.id}`);
  }
  capabilityIds.add(capability.id);

  const surface = surfaceById.get(capability.surfaceId);
  if (!surface) {
    failures.push(`capability ${capability.id || "unknown"} maps to unknown surface ${capability.surfaceId || "unknown"}`);
    continue;
  }

  coveredSurfaceIds.add(capability.surfaceId);

  if (capability.ownerAgent !== surface.ownerAgent) {
    failures.push(`capability ${capability.id} owner ${capability.ownerAgent} must match surface owner ${surface.ownerAgent}`);
  }

  if (!Array.isArray(capability.pluginExamples) || capability.pluginExamples.length < 3) {
    failures.push(`capability ${capability.id} must include at least three plugin or skill examples`);
  }

  if (!Array.isArray(capability.preferredOutputs) || capability.preferredOutputs.length === 0) {
    failures.push(`capability ${capability.id} must define preferred outputs`);
  }

  if (!Array.isArray(capability.guardrails) || capability.guardrails.length < 3) {
    failures.push(`capability ${capability.id} must include at least three guardrails`);
  }

  if (!capability.activationMode) {
    failures.push(`capability ${capability.id} must define activation mode`);
  }

  if (capability.risk === "high" && capability.activationMode === "active") {
    failures.push(`high-risk capability ${capability.id} must be guarded or blocked`);
  }
}

for (const surface of surfaces) {
  if (!coveredSurfaceIds.has(surface.id)) {
    failures.push(`registry surface has no capability family: ${surface.id}`);
  }
}

const cloudCapability = capabilities.find(capability => capability.id === "cloud-hosting-and-deployment");
if (!String(cloudCapability?.activationMode || "").startsWith("blocked")) {
  failures.push("cloud hosting and deployment capability must stay blocked until target is explicit");
}

const rules = capabilityMap?.rules || [];
if (!rules.some(rule => rule.includes("UIXAppTTR"))) {
  failures.push("capability rules must explicitly keep output inside UIXAppTTR");
}

if (failures.length > 0) {
  console.error("Plugin and skill capability map check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  repository: capabilityMap.repository,
  branch: capabilityMap.branch,
  capabilities: capabilities.length,
  surfacesCovered: coveredSurfaceIds.size,
  examples: capabilities.reduce((total, capability) => total + capability.pluginExamples.length, 0)
}, null, 2));

function readJson(file) {
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf8"));
}
