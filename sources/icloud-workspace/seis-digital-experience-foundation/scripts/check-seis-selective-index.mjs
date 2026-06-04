import { existsSync, readFileSync } from "node:fs";

const extractPath = "data/seis/selective-index-extracts.json";
const missionPath = "data/seis/mission-control.json";
const failures = [];

ensure(existsSync(extractPath), `missing selective index extract: ${extractPath}`);
ensure(existsSync(missionPath), `missing mission control: ${missionPath}`);

const extract = readJson(extractPath);
const mission = readJson(missionPath);

ensure(extract?.schemaVersion === "1.0.0", "selective index extract must use schemaVersion 1.0.0");
ensure(extract?.mission === "SEIS-M003", "selective index extract must belong to SEIS-M003");
ensure(extract?.policy?.extractionMode === "selective-index-only", "extract must stay selective-index-only");
ensure(extract?.summary?.eligiblePacks === 7, "extract should target the 7 high-priority packs");
ensure(extract?.summary?.extractedPacks === extract?.summary?.eligiblePacks, "all high-priority packs should be inspected");
ensure(extract?.summary?.extractedEntries >= 20, "extract should preserve useful index coverage");
ensure(extract?.summary?.extractedEntries <= 84, "extract must stay bounded by max entries per pack");

for (const pack of extract?.packs || []) {
  ensure(Array.isArray(pack.extractedEntries), `pack must define extracted entries: ${pack.packName || "unknown"}`);
  ensure(pack.extractedEntries.length <= extract.policy.maxEntriesPerPack, `pack exceeds max entries: ${pack.packName || "unknown"}`);

  for (const entry of pack.extractedEntries) {
    ensure(entry.path && typeof entry.content === "string", `entry must include path and content: ${pack.packName || "unknown"}`);
    ensure(!entry.path.includes("__MACOSX"), `entry must ignore __MACOSX metadata: ${entry.path || "unknown"}`);
    ensure(entry.charCount <= extract.policy.maxContentChars || entry.truncated, `large entry must be marked truncated: ${entry.path || "unknown"}`);
  }
}

ensure(String(mission?.activeMission?.id || "").startsWith("SEIS-M"), "mission control must point to an active SEIS mission");
ensure(mission?.missionHistory?.some((item) => item.id === "SEIS-M002" && item.status === "committed"), "mission history must record SEIS-M002 as committed");
if (mission?.activeMission?.id !== "SEIS-M003") {
  ensure(mission?.missionHistory?.some((item) => item.id === "SEIS-M003" && item.status === "committed"), "mission history must record SEIS-M003 as committed after handoff");
}

if (failures.length > 0) {
  console.error("SEIS selective index check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  mission: extract.mission,
  extractedPacks: extract.summary.extractedPacks,
  extractedEntries: extract.summary.extractedEntries,
  truncatedEntries: extract.summary.truncatedEntries
}, null, 2));

function ensure(condition, message) {
  if (!condition) failures.push(message);
}

function readJson(file) {
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf8"));
}
