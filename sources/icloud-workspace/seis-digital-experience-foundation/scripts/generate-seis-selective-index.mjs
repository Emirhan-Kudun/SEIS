import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { tmpdir } from "node:os";

const intakeManifestPath = "data/seis/knowledge-intake-manifest.json";
const outputPath = "data/seis/selective-index-extracts.json";
const maxEntriesPerPack = 12;
const maxContentChars = 8000;

const intakeManifest = JSON.parse(readFileSync(intakeManifestPath, "utf8"));
const archivePath = intakeManifest.sourceArchive.path;
const tempRoot = mkdtempSync(join(tmpdir(), "seis-selective-"));

try {
  const highPriorityPacks = intakeManifest.packs.filter((pack) => pack.priority === "high");
  const packs = highPriorityPacks.map((pack) => extractPackIndexes(archivePath, pack, tempRoot));
  const totalExtractedEntries = packs.reduce((total, pack) => total + pack.extractedEntries.length, 0);

  const payload = {
    schemaVersion: "1.0.0",
    generatedAt: intakeManifest.generatedAt,
    mission: "SEIS-M003",
    sourceManifest: intakeManifestPath,
    sourceArchive: intakeManifest.sourceArchive,
    policy: {
      extractionMode: "selective-index-only",
      packPriority: "high",
      maxEntriesPerPack,
      maxContentChars,
      largeContentRule: "truncate content but preserve source path, byte size, and truncation flag"
    },
    summary: {
      sourcePacks: intakeManifest.summary.totalPacks,
      eligiblePacks: highPriorityPacks.length,
      extractedPacks: packs.length,
      extractedEntries: totalExtractedEntries,
      truncatedEntries: packs.reduce(
        (total, pack) => total + pack.extractedEntries.filter((entry) => entry.truncated).length,
        0
      )
    },
    packs
  };

  writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(JSON.stringify({ ok: true, outputPath, ...payload.summary }, null, 2));
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}

function extractPackIndexes(outerArchive, pack, tempRootPath) {
  const nestedPath = join(tempRootPath, pack.name);
  const nestedBuffer = execFileSync("unzip", ["-p", outerArchive, pack.archiveEntry], { maxBuffer: 1024 * 1024 * 80 });
  writeFileSync(nestedPath, nestedBuffer);

  const entries = listZipEntries(nestedPath)
    .filter((entry) => !entry.includes("__MACOSX"))
    .filter((entry) => !basename(entry).startsWith("._"))
    .filter((entry) => !entry.endsWith("/"));
  const selectedEntries = entries
    .filter(isIndexEntry)
    .sort((a, b) => scoreEntry(b) - scoreEntry(a) || a.localeCompare(b))
    .slice(0, maxEntriesPerPack);

  return {
    packId: pack.id,
    packName: pack.name,
    domains: pack.domains,
    ownerAgents: pack.ownerAgents,
    intakeDecision: pack.intakeDecision,
    extractedEntries: selectedEntries.map((entry) => extractEntry(nestedPath, entry))
  };
}

function extractEntry(zipPath, entry) {
  const buffer = execFileSync("unzip", ["-p", zipPath, entry], { maxBuffer: 1024 * 1024 * 8 });
  const content = buffer.toString("utf8");
  const truncated = content.length > maxContentChars;

  return {
    path: entry,
    byteSize: buffer.byteLength,
    charCount: content.length,
    truncated,
    content: truncated ? `${content.slice(0, maxContentChars)}\n[TRUNCATED]` : content
  };
}

function isIndexEntry(entry) {
  const lower = entry.toLowerCase();
  if (lower.endsWith(".zip") || lower.endsWith(".docx")) return false;
  if (!lower.endsWith(".md") && !lower.endsWith(".json")) return false;

  return [
    "index",
    "registry",
    "manifest",
    "routing",
    "start",
    "readme",
    "constitution",
    "law",
    "domain",
    "workflow",
    "token",
    "architecture",
    "blueprint"
  ].some((keyword) => lower.includes(keyword));
}

function scoreEntry(entry) {
  const lower = entry.toLowerCase();
  const weights = [
    ["manifest", 60],
    ["index", 55],
    ["registry", 50],
    ["routing", 48],
    ["readme", 45],
    ["start", 42],
    ["constitution", 40],
    ["law", 36],
    ["domain", 34],
    ["workflow", 32],
    ["token", 30],
    ["architecture", 26],
    ["blueprint", 24]
  ];

  return weights.reduce((score, [keyword, weight]) => score + (lower.includes(keyword) ? weight : 0), 0);
}

function listZipEntries(zipPath) {
  return execFileSync("unzip", ["-Z1", zipPath], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 20
  })
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
