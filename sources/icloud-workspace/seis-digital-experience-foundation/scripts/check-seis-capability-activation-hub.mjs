import { existsSync, readFileSync } from "node:fs";

const hubPath = "data/seis/capability-activation-hub.json";
const missionPath = "data/seis/mission-control.json";
const failures = [];

ensure(existsSync(hubPath), `missing capability activation hub: ${hubPath}`);
ensure(existsSync(missionPath), `missing mission control: ${missionPath}`);

const hub = readJson(hubPath);
const mission = readJson(missionPath);
const lanes = hub?.activationLanes || [];
const readOnlyActions = hub?.cloudBridge?.readOnlyActions || [];
const laneIds = new Set(lanes.map((lane) => lane.id));
const routerIds = new Set((hub?.missionRouter || []).map((route) => route.id));
const readOnlyActionIds = new Set(readOnlyActions.map((action) => action?.id));
const readOnlyActionCommands = new Set(readOnlyActions.map((action) => action?.command));
const summary = hub?.summary || {};

ensure(hub?.schemaVersion === "1.0.0", "capability activation hub must use schemaVersion 1.0.0");
ensure(hub?.mission === "SEIS-M015", "capability activation hub must belong to SEIS-M015");
ensure(hub?.generatedBy === "scripts/generate-seis-capability-activation-hub.mjs", "capability activation hub must keep its generator contract");
ensure(hub?.policy?.blanketActivationAllowed === false, "capability activation hub must keep blanket activation disabled");
ensure(hub?.policy?.defaultMode === "mission-routed-read-only-first", "capability activation hub must stay mission-routed-read-only-first");
ensure(Array.isArray(lanes) && lanes.length >= 10, "capability activation hub must preserve broad activation lane coverage");
ensure(Array.isArray(hub?.missionRouter) && hub.missionRouter.length >= 6, "capability activation hub must preserve mission routing coverage");
ensure(Array.isArray(readOnlyActions) && readOnlyActions.length >= 10, "capability activation hub must preserve linked read-only cloud actions");
ensure(lanes.length === laneIds.size, `capability activation hub must not contain duplicate lane ids: ${findDuplicates(lanes.map((lane) => lane?.id)).join(", ")}`);
ensure(hub.missionRouter.length === routerIds.size, `capability activation hub must not contain duplicate route ids: ${findDuplicates(hub.missionRouter.map((route) => route?.id)).join(", ")}`);
ensure(readOnlyActions.length === readOnlyActionIds.size, `capability activation hub must not contain duplicate cloud action ids: ${findDuplicates(readOnlyActions.map((action) => action?.id)).join(", ")}`);
ensure(readOnlyActions.length === readOnlyActionCommands.size, `capability activation hub must not contain duplicate cloud action commands: ${findDuplicates(readOnlyActions.map((action) => action?.command)).join(", ")}`);
ensure(summary.activationLanes === lanes.length, "activationLanes summary must match lane count");
ensure(summary.runtimeItems >= 100, "capability activation hub must preserve runtime inventory coverage");
ensure(summary.usableRuntimeItems >= 1, "capability activation hub must preserve usable runtime items");
ensure(summary.cloudActions === readOnlyActions.length, "cloudActions summary must match linked read-only cloud action count");
ensure(summary.linkedReadOnlyCloudActions === readOnlyActions.length, "linkedReadOnlyCloudActions summary must match linked read-only cloud action count");
ensure(summary.blockerCount === (summary.blockers || []).length, "hub blockerCount must match blockers length");
ensure(summary.ready === (summary.blockerCount === 0), "hub ready flag must follow blockerCount");

for (const id of [
  "github-governance-connectors",
  "documentation-knowledge-mcps",
  "cloud-infrastructure-mcps",
  "business-payment-connectors"
]) {
  ensure(laneIds.has(id), `capability activation hub must include lane ${id}`);
}

for (const id of [
  "mcp-skill-connector-governance",
  "publication",
  "experience-design",
  "general-governance"
]) {
  ensure(routerIds.has(id), `capability activation hub must include route ${id}`);
}

ensure(hub?.cloudBridge?.branch === "UIXAppTTR", "capability activation hub cloud bridge must stay on UIXAppTTR");
ensure(Array.isArray(hub?.nextActions) && hub.nextActions.length >= 4, "capability activation hub must preserve nextActions guidance");

for (const route of hub?.missionRouter || []) {
  ensure(Array.isArray(route?.requiredSurfaces), `capability activation hub route must define requiredSurfaces: ${route?.id || "unknown"}`);
  ensure(Array.isArray(route?.conditionalSurfaces), `capability activation hub route must define conditionalSurfaces: ${route?.id || "unknown"}`);

  for (const surfaceId of route?.requiredSurfaces || []) {
    ensure(laneIds.has(surfaceId), `capability activation hub route ${route?.id || "unknown"} references unknown required surface ${surfaceId}`);
  }

  for (const surfaceId of route?.conditionalSurfaces || []) {
    ensure(laneIds.has(surfaceId), `capability activation hub route ${route?.id || "unknown"} references unknown conditional surface ${surfaceId}`);
  }
}

for (const action of readOnlyActions) {
  ensure(typeof action?.id === "string" && action.id.length > 0, "capability activation hub cloud action must define a non-empty id");
  ensure(typeof action?.label === "string" && action.label.length > 0, `capability activation hub cloud action ${action?.id || "unknown"} must define a label`);
  ensure(typeof action?.command === "string" && action.command.length > 0, `capability activation hub cloud action ${action?.id || "unknown"} must define a command`);
}

ensure(
  mission?.activeMission?.id === "SEIS-M015" || mission?.missionHistory?.some((item) => item.id === "SEIS-M015" && item.status === "committed"),
  "mission control must point to active SEIS-M015 or record SEIS-M015 as committed"
);

if (failures.length > 0) {
  console.error("SEIS capability activation hub check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  mission: hub.mission,
  activationLanes: summary.activationLanes,
  runtimeItems: summary.runtimeItems,
  cloudActions: summary.cloudActions,
  blockerCount: summary.blockerCount
}, null, 2));

function ensure(condition, message) {
  if (!condition) failures.push(message);
}

function findDuplicates(items) {
  const seen = new Set();
  const duplicates = new Set();

  for (const item of items) {
    if (typeof item !== "string" || item.length === 0) {
      continue;
    }

    if (seen.has(item)) {
      duplicates.add(item);
      continue;
    }

    seen.add(item);
  }

  return [...duplicates];
}

function readJson(file) {
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf8"));
}
