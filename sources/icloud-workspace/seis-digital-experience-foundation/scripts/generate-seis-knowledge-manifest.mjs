import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, extname, join } from "node:path";

const archivePath =
  process.env.SEIS_ARCHIVE_PATH ||
  "/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/_SEIS_ARCHIVE/2026-05-31/SEIS.zip";
const outputPath = "data/seis/knowledge-intake-manifest.json";

const archiveStat = statSync(archivePath);
const outerEntries = listZipEntries(archivePath);
const nestedPacks = outerEntries
  .filter((entry) => entry.startsWith("SEIS/"))
  .filter((entry) => entry.endsWith(".zip"))
  .filter((entry) => !entry.includes("__MACOSX"))
  .filter((entry) => !basename(entry).startsWith("._"))
  .sort((a, b) => basename(a).localeCompare(basename(b)));

const tempRoot = mkdtempSync(join(tmpdir(), "seis-knowledge-"));

try {
  const packs = nestedPacks.map((entry) => inspectNestedPack(archivePath, entry, tempRoot));
  const summary = summarize(packs);

  const manifest = {
    schemaVersion: "1.0.0",
    generatedAt: archiveStat.mtime.toISOString(),
    mission: "SEIS-M002",
    sourceArchive: {
      path: archivePath,
      sizeBytes: archiveStat.size,
      modifiedAt: archiveStat.mtime.toISOString(),
      storageLayer: "iCloud archive",
      gitPolicy: "archive outside Git; manifest inside Git"
    },
    policy: {
      intakeMode: "manifest-first",
      importMode: "selective",
      largePackRule: "defer packs with more than 10000 entries unless a focused mission approves them",
      appleDoubleRule: "ignore __MACOSX and ._* archive metadata"
    },
    summary,
    packs
  };

  writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ ok: true, outputPath, ...summary }, null, 2));
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}

function inspectNestedPack(outerArchive, entry, tempRootPath) {
  const name = basename(entry);
  const nestedPath = join(tempRootPath, name);
  const nestedBuffer = execFileSync("unzip", ["-p", outerArchive, entry], { maxBuffer: 1024 * 1024 * 80 });
  writeFileSync(nestedPath, nestedBuffer);

  const rawEntries = listZipEntries(nestedPath);
  const cleanEntries = rawEntries
    .filter((item) => item && !item.includes("__MACOSX"))
    .filter((item) => !basename(item).startsWith("._"));
  const extensionCounts = countExtensions(cleanEntries);
  const route = routePack(name, cleanEntries.length);

  return {
    id: slug(name.replace(/\.zip$/i, "")),
    name,
    archiveEntry: entry,
    entryCount: cleanEntries.length,
    extensionCounts,
    sampleEntries: cleanEntries.slice(0, 24),
    priority: route.priority,
    domains: route.domains,
    ownerAgents: route.ownerAgents,
    intakeDecision: route.decision,
    rationale: route.rationale
  };
}

function listZipEntries(zipPath) {
  return execFileSync("unzip", ["-Z1", zipPath], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 40
  })
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function countExtensions(entries) {
  return entries.reduce((counts, entry) => {
    if (entry.endsWith("/")) {
      counts.directory = (counts.directory || 0) + 1;
      return counts;
    }
    const extension = extname(entry).replace(".", "").toLowerCase() || "no-extension";
    counts[extension] = (counts[extension] || 0) + 1;
    return counts;
  }, {});
}

function routePack(name, entryCount) {
  const lower = name.toLowerCase();
  const huge = entryCount > 10000;

  if (huge) {
    return {
      priority: "deferred",
      domains: ["data-core", "ai-core"],
      ownerAgents: ["data-agent", "research-agent"],
      decision: "archive-only-until-focused-mission",
      rationale: "Large markdown knowledge packs must not enter active context without a focused mission."
    };
  }

  if (lower.includes("agent")) {
    return {
      priority: "high",
      domains: ["ai-core", "governance-core"],
      ownerAgents: ["chief-architect-agent", "governance-agent", "documentation-agent"],
      decision: "inspect-index-first",
      rationale: "Agent ecosystem files can strengthen the model-independent role registry."
    };
  }

  if (lower.includes("foundation") || lower.includes("constitution") || lower.includes("master_archive")) {
    return {
      priority: "high",
      domains: ["governance-core", "ai-core"],
      ownerAgents: ["chief-architect-agent", "governance-agent"],
      decision: "inspect-index-first",
      rationale: "Foundation and constitution packs define operating principles and architecture."
    };
  }

  if (lower.includes("token")) {
    return {
      priority: "high",
      domains: ["ai-core", "data-core", "governance-core"],
      ownerAgents: ["data-agent", "research-agent", "governance-agent"],
      decision: "inspect-index-first",
      rationale: "Token-efficiency packs directly support small active context routing."
    };
  }

  if (lower.includes("multi_language") || lower.includes("language")) {
    return {
      priority: "high",
      domains: ["polyglot-core", "engineering-core"],
      ownerAgents: ["engineering-language-agent", "chief-architect-agent"],
      decision: "inspect-index-first",
      rationale: "Language packs should inform activation rules without enabling stacks by default."
    };
  }

  if (entryCount > 1000) {
    return {
      priority: "medium",
      domains: ["data-core", "ai-core"],
      ownerAgents: ["data-agent", "research-agent"],
      decision: "defer-content-import",
      rationale: "Expansion packs need domain routing before selective import."
    };
  }

  return {
    priority: "medium",
    domains: ["ai-core", "governance-core"],
    ownerAgents: ["research-agent", "documentation-agent"],
    decision: "review-when-needed",
    rationale: "Pack is available for future selective intake."
  };
}

function summarize(packs) {
  const summary = {
    totalPacks: packs.length,
    highPriorityPacks: packs.filter((pack) => pack.priority === "high").length,
    deferredPacks: packs.filter((pack) => pack.priority === "deferred").length,
    totalNestedEntries: packs.reduce((total, pack) => total + pack.entryCount, 0),
    markdownEntries: packs.reduce((total, pack) => total + (pack.extensionCounts.md || 0), 0)
  };
  return summary;
}

function slug(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
