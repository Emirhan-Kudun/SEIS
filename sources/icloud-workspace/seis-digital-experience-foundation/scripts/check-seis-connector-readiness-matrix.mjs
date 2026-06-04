import { existsSync, readFileSync } from "node:fs";

const matrixPath = "data/seis/connector-readiness-matrix.json";
const missionPath = "data/seis/mission-control.json";
const failures = [];

ensure(existsSync(matrixPath), `missing connector readiness matrix: ${matrixPath}`);
ensure(existsSync(missionPath), `missing mission control: ${missionPath}`);

const matrixSnapshot = readJson(matrixPath);
const mission = readJson(missionPath);
const matrix = matrixSnapshot?.matrix || [];
const matrixIds = new Set(matrix.map((entry) => entry.id));
const summary = matrixSnapshot?.summary || {};

ensure(matrixSnapshot?.schemaVersion === "1.0.0", "connector readiness matrix must use schemaVersion 1.0.0");
ensure(matrixSnapshot?.mission === "SEIS-M009", "connector readiness matrix must belong to SEIS-M009");
ensure(matrixSnapshot?.generatedBy === "scripts/generate-seis-connector-readiness-matrix.mjs", "connector readiness matrix must keep its generator contract");
ensure(matrixSnapshot?.policy?.blanketInvocationAllowed === false, "connector readiness matrix must block blanket invocation");
ensure(matrixSnapshot?.policy?.defaultMode === "mission-routed-read-only-first", "connector readiness matrix must stay mission-routed-read-only-first");
ensure(Array.isArray(matrix) && matrix.length >= 10, "connector readiness matrix must preserve at least 10 governed surfaces");
ensure(summary.surfaceCount === matrix.length, "surfaceCount must match matrix length");
ensure(summary.runtimeItems >= 100, "connector readiness matrix must preserve runtime coverage");
ensure(summary.authRequiredSurfaces >= 1, "connector readiness matrix must preserve auth-required surfaces");
ensure(summary.blockedSurfaces >= 1, "connector readiness matrix must preserve blocked surfaces");
ensure(summary.operationsStatus, "connector readiness matrix must preserve operations status");

for (const id of [
  "github-governance-connectors",
  "documentation-knowledge-mcps",
  "cloud-infrastructure-mcps",
  "business-payment-connectors"
]) {
  ensure(matrixIds.has(id), `connector readiness matrix must include ${id}`);
}

for (const entry of matrix) {
  ensure(entry.id, "matrix entry must define id");
  ensure(entry.label, `matrix entry must define label: ${entry.id || "unknown"}`);
  ensure(entry.activationState, `matrix entry must define activationState: ${entry.id || "unknown"}`);
  ensure(typeof entry.runtimeItems === "number", `matrix entry must define runtimeItems: ${entry.id || "unknown"}`);
  ensure(typeof entry.recommendedAction === "string" && entry.recommendedAction.length > 0, `matrix entry must define recommendedAction: ${entry.id || "unknown"}`);
  ensure(Array.isArray(entry.guardrails), `matrix entry must define guardrails: ${entry.id || "unknown"}`);
}

ensure(
  mission?.activeMission?.id === "SEIS-M009" || mission?.missionHistory?.some((item) => item.id === "SEIS-M009" && item.status === "committed"),
  "mission control must point to active SEIS-M009 or record SEIS-M009 as committed"
);

if (failures.length > 0) {
  console.error("SEIS connector readiness matrix check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  mission: matrixSnapshot.mission,
  surfaceCount: summary.surfaceCount,
  runtimeItems: summary.runtimeItems,
  authRequiredSurfaces: summary.authRequiredSurfaces,
  blockedSurfaces: summary.blockedSurfaces
}, null, 2));

function ensure(condition, message) {
  if (!condition) failures.push(message);
}

function readJson(file) {
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf8"));
}
