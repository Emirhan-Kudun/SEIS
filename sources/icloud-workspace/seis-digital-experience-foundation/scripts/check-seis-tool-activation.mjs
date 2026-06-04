import { existsSync, readFileSync } from "node:fs";
import { buildActivationPlan, loadToolActivationData } from "./plan-seis-tool-activation.mjs";

const rulesPath = "data/seis/tool-activation-rules.json";
const missionPath = "data/seis/mission-control.json";
const failures = [];

ensure(existsSync(rulesPath), `missing tool activation rules: ${rulesPath}`);
ensure(existsSync(missionPath), `missing mission control: ${missionPath}`);

const { registry, rules, readiness } = loadToolActivationData();
const mission = readJson(missionPath);
const surfaceIds = new Set(registry.surfaces.map((surface) => surface.id));

ensure(rules?.schemaVersion === "1.0.0", "tool activation rules must use schemaVersion 1.0.0");
ensure(rules?.mission === "SEIS-M005", "tool activation rules must belong to SEIS-M005");
ensure(rules?.policy?.blanketActivationAllowed === false, "blanket activation must stay disabled");
ensure(rules?.policy?.defaultMode === "read-only-first", "default mode must be read-only-first");
ensure(Array.isArray(rules?.intents) && rules.intents.length >= 6, "rules must define at least six mission intents");

const requiredIntents = [
  "mcp-skill-connector-governance",
  "publication",
  "experience-design",
  "ai-workflow-generation",
  "security-observability",
  "general-governance"
];

const intentIds = new Set((rules?.intents || []).map((intent) => intent.id));
for (const id of requiredIntents) {
  ensure(intentIds.has(id), `rules must include intent ${id}`);
}

for (const intent of rules?.intents || []) {
  ensure(Array.isArray(intent.keywords) && intent.keywords.length > 0, `intent must define keywords: ${intent.id || "unknown"}`);
  ensure(Array.isArray(intent.primaryAgents) && intent.primaryAgents.length > 0, `intent must define primaryAgents: ${intent.id || "unknown"}`);
  ensure(Array.isArray(intent.requiredSurfaces) && intent.requiredSurfaces.length > 0, `intent must define requiredSurfaces: ${intent.id || "unknown"}`);
  ensure(Array.isArray(intent.validation) && intent.validation.length > 0, `intent must define validation: ${intent.id || "unknown"}`);

  for (const surfaceId of intent.requiredSurfaces || []) {
    ensure(surfaceIds.has(surfaceId), `intent ${intent.id} references missing required surface ${surfaceId}`);
  }

  for (const surface of intent.conditionalSurfaces || []) {
    ensure(surfaceIds.has(surface.id), `intent ${intent.id} references missing conditional surface ${surface.id}`);
    ensure(Array.isArray(surface.keywords) && surface.keywords.length > 0, `conditional surface must define keywords: ${intent.id}:${surface.id}`);
  }

  for (const surfaceId of intent.blockedByDefault || []) {
    ensure(surfaceIds.has(surfaceId), `intent ${intent.id} references missing blocked surface ${surfaceId}`);
  }
}

const mcpPlan = buildActivationPlan("Gelistirmeye devam edelim tum skills connectorlari kullanalim mcp leri de", { registry, rules, readiness });
ensure(mcpPlan.selectedIntent.id === "mcp-skill-connector-governance", "MCP request must route to connector governance intent");
ensure(mcpPlan.mission === "SEIS-M007", "activation planner must emit runtime-aware SEIS-M007 plans");
ensure(mcpPlan.readinessMission === "SEIS-M006", "activation planner must include SEIS-M006 readiness data");
ensure(hasSurface(mcpPlan, "skill-runtime"), "MCP request must include skill runtime");
ensure(hasSurface(mcpPlan, "documentation-knowledge-mcps"), "MCP request must include documentation knowledge MCPs");
ensure(mcpPlan.runtimeReadiness.totalRuntimeItems > 0, "MCP request must include runtime readiness totals");

const publishPlan = buildActivationPlan("github server a push yap ve icloud drive ile paylas", { registry, rules, readiness });
ensure(publishPlan.selectedIntent.id === "publication", "publication request must route to publication intent");
ensure(hasSurface(publishPlan, "github-governance-connectors"), "publication request must include GitHub governance connectors");
ensure(!publishPlan.blockers.some((blocker) => blocker.id === "github-local-cli"), "publication plan must not preserve stale GitHub auth blocker after gh workflow scope is ready");
ensure(publishPlan.blockers.some((blocker) => blocker.id === "github-app-connector"), "publication plan must preserve GitHub connector transport blocker");
ensure(publishPlan.blockers.some((blocker) => blocker.id.includes("blocked-auth")), "publication plan must surface runtime auth blockers");

const experiencePlan = buildActivationPlan("sinematik web 3b animasyon ve mobile responsive kontrol", { registry, rules, readiness });
ensure(experiencePlan.selectedIntent.id === "experience-design", "experience request must route to experience design intent");
ensure(hasSurface(experiencePlan, "design-collaboration-connectors"), "experience request must include design collaboration connectors");
ensure(hasSurface(experiencePlan, "node-repl-browser-automation"), "experience request must include browser automation when responsive or animation is requested");
ensure(experiencePlan.runtimeReadiness.totalRuntimeItems > 0, "experience request must include runtime readiness totals");

ensure(
  mission?.activeMission?.id === "SEIS-M005" || mission?.missionHistory?.some((item) => item.id === "SEIS-M005" && item.status === "committed"),
  "mission control must point to active SEIS-M005 or record SEIS-M005 as committed"
);
ensure(mission?.missionHistory?.some((item) => item.id === "SEIS-M004" && item.status === "committed"), "mission history must record SEIS-M004 as committed");

if (failures.length > 0) {
  console.error("SEIS tool activation check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  mission: "SEIS-M007",
  basePlannerMission: "SEIS-M005",
  intents: rules.intents.length,
  surfaces: registry.surfaces.length,
  samples: {
    mcp: mcpPlan.selectedSurfaces.length,
    publication: publishPlan.selectedSurfaces.length,
    experience: experiencePlan.selectedSurfaces.length
  }
}, null, 2));

function hasSurface(plan, id) {
  return plan.selectedSurfaces.some((surface) => surface.id === id);
}

function ensure(condition, message) {
  if (!condition) failures.push(message);
}

function readJson(file) {
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf8"));
}
