import { existsSync, readFileSync } from "node:fs";

const manifestPath = "data/seis/knowledge-intake-manifest.json";
const missionPath = "data/seis/mission-control.json";
const failures = [];

ensure(existsSync(manifestPath), `missing knowledge intake manifest: ${manifestPath}`);
ensure(existsSync(missionPath), `missing mission control: ${missionPath}`);

const manifest = readJson(manifestPath);
const mission = readJson(missionPath);

ensure(manifest?.schemaVersion === "1.0.0", "knowledge intake manifest must use schemaVersion 1.0.0");
ensure(manifest?.mission === "SEIS-M002", "knowledge intake manifest must belong to SEIS-M002");
ensure(manifest?.sourceArchive?.storageLayer === "iCloud archive", "SEIS archive must stay in iCloud archive storage");
ensure(manifest?.sourceArchive?.gitPolicy?.includes("manifest inside Git"), "Git policy must keep archives out of Git");
ensure(Array.isArray(manifest?.packs), "knowledge intake manifest must define packs");
ensure(manifest?.packs?.length >= 20, "knowledge intake manifest should include the nested SEIS packs");
ensure(manifest?.summary?.totalPacks === manifest?.packs?.length, "summary totalPacks must match pack count");
ensure(manifest?.summary?.markdownEntries > 30000, "manifest should preserve the markdown scale signal");

const packNames = new Set((manifest?.packs || []).map((pack) => pack.name));
const requiredPacks = [
  "SEIS_Agent_Ecosystem_Pack.zip",
  "SEIS_Foundation_Pack_v1.zip",
  "SEIS_Token_Efficient_Universal_Pack.zip",
  "SEIS_Multi_Language_Engineering_Pack.zip",
  "SEIS_Master_Archive_Unified_v1.zip"
];

for (const pack of requiredPacks) {
  ensure(packNames.has(pack), `knowledge intake manifest must include ${pack}`);
}

for (const pack of manifest?.packs || []) {
  ensure(pack.id, `pack must define id: ${pack.name || "unknown"}`);
  ensure(pack.archiveEntry?.startsWith("SEIS/"), `pack must come from SEIS archive path: ${pack.name || "unknown"}`);
  ensure(!pack.archiveEntry.includes("__MACOSX"), `pack must ignore __MACOSX metadata: ${pack.name || "unknown"}`);
  ensure(pack.entryCount > 0, `pack must have entries: ${pack.name || "unknown"}`);
  ensure(Array.isArray(pack.domains) && pack.domains.length > 0, `pack must define domains: ${pack.name || "unknown"}`);
  ensure(Array.isArray(pack.ownerAgents) && pack.ownerAgents.length > 0, `pack must define owner agents: ${pack.name || "unknown"}`);

  if (pack.entryCount > 10000) {
    ensure(
      pack.priority === "deferred" && pack.intakeDecision === "archive-only-until-focused-mission",
      `huge pack must stay deferred: ${pack.name || "unknown"}`
    );
  }
}

ensure(String(mission?.activeMission?.id || "").startsWith("SEIS-M"), "mission control must point to an active SEIS mission");
ensure(mission?.missionHistory?.some((item) => item.id === "SEIS-M001" && item.status === "committed"), "mission history must record SEIS-M001 as committed");
if (mission?.activeMission?.id !== "SEIS-M002") {
  ensure(mission?.missionHistory?.some((item) => item.id === "SEIS-M002" && item.status === "committed"), "mission history must record SEIS-M002 as committed after handoff");
}

if (failures.length > 0) {
  console.error("SEIS knowledge intake check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  mission: manifest.mission,
  packs: manifest.summary.totalPacks,
  highPriorityPacks: manifest.summary.highPriorityPacks,
  deferredPacks: manifest.summary.deferredPacks,
  markdownEntries: manifest.summary.markdownEntries
}, null, 2));

function ensure(condition, message) {
  if (!condition) failures.push(message);
}

function readJson(file) {
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf8"));
}
