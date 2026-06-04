import { existsSync, readFileSync } from "node:fs";

const readinessPath = "data/seis/mcp-runtime-readiness.json";
const registryPath = "data/seis/mcp-skill-connector-registry.json";
const missionPath = "data/seis/mission-control.json";
const failures = [];

ensure(existsSync(readinessPath), `missing MCP runtime readiness snapshot: ${readinessPath}`);
ensure(existsSync(registryPath), `missing MCP connector registry: ${registryPath}`);
ensure(existsSync(missionPath), `missing mission control: ${missionPath}`);

const readiness = readJson(readinessPath);
const registry = readJson(registryPath);
const mission = readJson(missionPath);
const registrySurfaceIds = new Set((registry?.surfaces || []).map((surface) => surface.id));
const items = readiness?.items || [];

ensure(readiness?.schemaVersion === "1.0.0", "runtime readiness snapshot must use schemaVersion 1.0.0");
ensure(readiness?.mission === "SEIS-M006", "runtime readiness snapshot must belong to SEIS-M006");
ensure(readiness?.source?.command === "codex mcp list", "runtime readiness source command must be codex mcp list");
ensure(readiness?.source?.secretsStored === false, "runtime readiness snapshot must not store secrets");
ensure(readiness?.policy?.blanketInvocationAllowed === false, "runtime readiness must reject blanket invocation");
ensure(Array.isArray(items) && items.length >= 50, "runtime readiness snapshot must include at least 50 MCP entries");

const seenNames = new Set();
for (const item of items) {
  ensure(item.name, "readiness item must define name");
  ensure(["enabled", "disabled"].includes(item.status), `readiness item must use supported status: ${item.name || "unknown"}`);
  ensure(item.auth, `readiness item must define auth state: ${item.name || "unknown"}`);
  ensure(item.readiness, `readiness item must define readiness: ${item.name || "unknown"}`);
  ensure(!("command" in item), `readiness item must not store command details: ${item.name || "unknown"}`);
  ensure(!("env" in item), `readiness item must not store environment details: ${item.name || "unknown"}`);

  if (item.surfaceId) {
    ensure(registrySurfaceIds.has(item.surfaceId), `readiness item references unknown surface: ${item.name}:${item.surfaceId}`);
  }

  ensure(!seenNames.has(item.name), `duplicate MCP entry: ${item.name}`);
  seenNames.add(item.name);
}

const summary = readiness?.summary || {};
ensure(summary.totalItems === items.length, "summary totalItems must match item count");
ensure(summary.mappedItems + summary.unmappedItems === items.length, "mapped and unmapped counts must equal totalItems");
ensure((summary.byReadiness?.["blocked-auth"] || 0) >= 1, "snapshot must preserve at least one blocked-auth MCP");
ensure((summary.byReadiness?.["permission-gated"] || 0) >= 1, "snapshot must preserve at least one permission-gated MCP");
ensure((summary.bySurface?.["documentation-knowledge-mcps"] || 0) >= 1, "snapshot must map documentation knowledge MCPs");
ensure((summary.bySurface?.["cloud-infrastructure-mcps"] || 0) >= 1, "snapshot must map cloud infrastructure MCPs");
ensure((summary.bySurface?.["data-backend-mcps"] || 0) >= 1, "snapshot must map data backend MCPs");
ensure((summary.bySurface?.["observability-security-mcps"] || 0) >= 1, "snapshot must map observability security MCPs");

ensure(
  mission?.activeMission?.id === "SEIS-M006" || mission?.missionHistory?.some((item) => item.id === "SEIS-M006" && item.status === "committed"),
  "mission control must point to active SEIS-M006 or record SEIS-M006 as committed"
);
ensure(mission?.missionHistory?.some((item) => item.id === "SEIS-M005" && item.status === "committed"), "mission history must record SEIS-M005 as committed");

if (failures.length > 0) {
  console.error("SEIS MCP runtime readiness check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  mission: "SEIS-M006",
  totalItems: summary.totalItems,
  mappedItems: summary.mappedItems,
  unmappedItems: summary.unmappedItems,
  blockedAuthItems: summary.byReadiness?.["blocked-auth"] || 0,
  permissionGatedItems: summary.byReadiness?.["permission-gated"] || 0
}, null, 2));

function ensure(condition, message) {
  if (!condition) failures.push(message);
}

function readJson(file) {
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf8"));
}
