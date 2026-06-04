import { existsSync, readFileSync } from "node:fs";

const registryPath = "data/seis/mcp-skill-connector-registry.json";
const missionPath = "data/seis/mission-control.json";
const failures = [];

ensure(existsSync(registryPath), `missing MCP connector registry: ${registryPath}`);
ensure(existsSync(missionPath), `missing mission control: ${missionPath}`);

const registry = readJson(registryPath);
const mission = readJson(missionPath);

ensure(registry?.schemaVersion === "1.0.0", "MCP connector registry must use schemaVersion 1.0.0");
ensure(registry?.mission === "SEIS-M004", "MCP connector registry must belong to SEIS-M004");
ensure(registry?.policy?.mode === "registry-first-tool-activation", "registry must enforce registry-first tool activation");
ensure(registry?.policy?.blanketActivationAllowed === false, "blanket activation must be disabled");
ensure(registry?.policy?.defaultExecution === "read-only-first", "default execution must be read-only-first");
ensure(Array.isArray(registry?.surfaces) && registry.surfaces.length >= 10, "registry must define at least 10 tool surfaces");

const requiredSurfaceIds = [
  "skill-runtime",
  "local-development-tools",
  "node-repl-browser-automation",
  "github-governance-connectors",
  "design-collaboration-connectors",
  "documentation-knowledge-mcps",
  "cloud-infrastructure-mcps",
  "data-backend-mcps",
  "observability-security-mcps",
  "product-collaboration-connectors",
  "business-payment-connectors"
];

const surfaceIds = new Set((registry?.surfaces || []).map((surface) => surface.id));
for (const id of requiredSurfaceIds) {
  ensure(surfaceIds.has(id), `registry must include surface ${id}`);
}

for (const surface of registry?.surfaces || []) {
  ensure(surface.id, "surface must define id");
  ensure(surface.ownerAgent, `surface must define ownerAgent: ${surface.id || "unknown"}`);
  ensure(Array.isArray(surface.domains) && surface.domains.length > 0, `surface must define domains: ${surface.id || "unknown"}`);
  ensure(Array.isArray(surface.examples) && surface.examples.length > 0, `surface must define examples: ${surface.id || "unknown"}`);
  ensure(surface.activationRule, `surface must define activationRule: ${surface.id || "unknown"}`);
  ensure(Array.isArray(surface.guardrails) && surface.guardrails.length > 0, `surface must define guardrails: ${surface.id || "unknown"}`);
  ensure(["low", "medium", "high"].includes(surface.risk), `surface must use low, medium, or high risk: ${surface.id || "unknown"}`);
}

const highRiskSurfaces = registry.surfaces.filter((surface) => surface.risk === "high");
for (const surface of highRiskSurfaces) {
  const text = `${surface.status} ${surface.activationRule} ${surface.guardrails.join(" ")}`.toLowerCase();
  ensure(
    text.includes("read-only") || text.includes("blocked") || text.includes("confirmation") || text.includes("auth"),
    `high-risk surface needs explicit safety language: ${surface.id}`
  );
}

const observations = registry.runtimeObservations || [];
ensure(observations.some((item) => item.id === "codex-mcp-list" && item.status === "available"), "runtime observations must record codex mcp list availability");
ensure(observations.some((item) => item.id === "github-local-cli" && item.status === "available-authenticated"), "runtime observations must record authenticated GitHub CLI availability");
ensure(observations.some((item) => item.id === "github-app-connector" && item.status === "blocked-transport"), "runtime observations must record GitHub connector transport blocker");

ensure(
  mission?.activeMission?.id === "SEIS-M004" || mission?.missionHistory?.some((item) => item.id === "SEIS-M004" && item.status === "committed"),
  "mission control must point to active SEIS-M004 or record SEIS-M004 as committed"
);
ensure(mission?.missionHistory?.some((item) => item.id === "SEIS-M003" && item.status === "committed"), "mission history must record SEIS-M003 as committed");

if (failures.length > 0) {
  console.error("SEIS MCP connector registry check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  mission: registry.mission,
  surfaces: registry.surfaces.length,
  highRiskSurfaces: highRiskSurfaces.length,
  observations: observations.length
}, null, 2));

function ensure(condition, message) {
  if (!condition) failures.push(message);
}

function readJson(file) {
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf8"));
}
