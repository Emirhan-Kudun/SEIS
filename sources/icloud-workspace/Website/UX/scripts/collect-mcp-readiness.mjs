import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputPath = path.join(root, "packages/runtime/src/mcp-readiness.generated.json");
const sourceArchivesPath = path.join(root, "packages/runtime/src/source-archives.json");
const archiveCatalogEntry = "config/mcp-catalog.json";
const defaultArchivePath = "/Users/emirhan/Downloads/PortfolioWebsite/emirhan-kudun-fullstack-portfolio-fullstack-infra-v1.zip";

function normalizeId(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function resolveArchiveCandidates() {
  const candidates = [];
  const envOverride = process.env.MCP_ARCHIVE_ZIP_PATH?.trim();
  if (envOverride) {
    candidates.push(envOverride);
  }

  if (fs.existsSync(sourceArchivesPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(sourceArchivesPath, "utf8"));
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (item?.role === "runtime_infra" && typeof item.sourcePath === "string") {
            candidates.push(item.sourcePath);
          }
        }
      }
    } catch {
      // Source archive registry may be absent or malformed in early bootstraps.
    }
  }

  candidates.push(defaultArchivePath);
  return [...new Set(candidates.filter(Boolean))];
}

function readArchiveCatalog() {
  const candidates = resolveArchiveCandidates();
  const errors = [];

  for (const archivePath of candidates) {
    if (!fs.existsSync(archivePath)) {
      continue;
    }

    try {
      const raw = execFileSync("unzip", ["-p", archivePath, archiveCatalogEntry], {
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024
      });
      const parsed = JSON.parse(raw);
      const mcps = Array.isArray(parsed.mcps) ? parsed.mcps : [];
      return {
        count: mcps.length,
        ids: new Set(mcps.map((item) => normalizeId(item.id || item.name))),
        mode: "live_archive",
        archivePath,
        errors
      };
    } catch (error) {
      errors.push({
        archivePath,
        message: error?.message || "archive-read-failed"
      });
    }
  }

  return {
    count: 0,
    ids: new Set(),
    mode: "none",
    archivePath: null,
    errors
  };
}

function readPreviousArchiveOnlyItems() {
  const candidates = [];

  if (fs.existsSync(outputPath)) {
    candidates.push(fs.readFileSync(outputPath, "utf8"));
  }

  try {
    candidates.push(execFileSync("git", ["show", `HEAD:${path.relative(root, outputPath)}`], {
      encoding: "utf8",
      maxBuffer: 16 * 1024 * 1024
    }));
  } catch {
    // The repository may not have a previous generated snapshot yet.
  }

  for (const raw of candidates) {
    try {
      const parsed = JSON.parse(raw);
      const items = Array.isArray(parsed.items) ? parsed.items : [];
      const archiveOnly = items.filter((item) => item.archiveStatus === "archive_only");
      if (archiveOnly.length) return archiveOnly;
    } catch {
      // Ignore malformed stale snapshots and continue to the next candidate.
    }
  }

  return [];
}

function parseMcpList(raw) {
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const body = lines.filter((line) => !line.startsWith("Name "));
  const items = [];

  for (const line of body) {
    const columns = line.trim().split(/\s{2,}/);
    if (columns.length < 7) continue;

    const [name, command, args, env, cwd, status, auth] = columns;
    const id = normalizeId(name);
    const hasMaskedEnv = env !== "-" && env.includes("*****");
    const writeCapable = /\b(write|deploy|send|payment|terminal_control|allow-write|telegram|slack|gmail|resend)\b/i.test(
      `${name} ${command} ${args}`
    );

    let readiness = "active";
    let notes = "Listed by codex mcp list. No tool call was made.";
    let probe = "list_readiness";

    if (writeCapable) {
      readiness = "skipped_with_reason";
      notes = "Write-capable or externally side-effectful surface; listed but not invoked without explicit target and approval.";
      probe = "not_run";
    } else if (/not logged in/i.test(auth)) {
      readiness = "needs_credentials";
      notes = "Account-scoped connector is present but not authenticated.";
    } else if (/oauth/i.test(auth)) {
      readiness = "needs_credentials";
      notes = "OAuth-scoped connector needs account authorization before live use.";
    } else if (hasMaskedEnv) {
      readiness = "configured";
      notes = "Environment-backed connector appears configured; only readiness metadata is exposed.";
    } else if (!/enabled/i.test(status)) {
      readiness = "unavailable";
      notes = "Connector is listed but not enabled.";
    }

    items.push({
      id,
      name,
      category: "mcp",
      status: readiness,
      scope: `${command} ${args}`.trim().slice(0, 220),
      requiresEnv: hasMaskedEnv ? ["configured_env"] : [],
      lastChecked: new Date().toISOString(),
      notes,
      auth,
      sourceType: cwd && cwd !== "-" ? "workspace" : "local",
      archiveStatus: "unknown",
      probe
    });
  }

  return items;
}

function summarize(items) {
  return {
    total: items.length,
    active: items.filter((item) => item.status === "active").length,
    configured: items.filter((item) => item.status === "configured").length,
    needsCredentials: items.filter((item) => item.status === "needs_credentials").length,
    unavailable: items.filter((item) => item.status === "unavailable").length,
    skippedWithReason: items.filter((item) => item.status === "skipped_with_reason").length
  };
}

const archive = readArchiveCatalog();
const fallbackArchiveOnlyItems = archive.count === 0 ? readPreviousArchiveOnlyItems() : [];
const rawList = execFileSync("codex", ["mcp", "list"], {
  encoding: "utf8",
  maxBuffer: 32 * 1024 * 1024
});
const generatedAt = new Date().toISOString();
const items = parseMcpList(rawList).map((item) => ({
  ...item,
  archiveStatus: archive.ids.has(item.id) ? "matched" : "live_only",
  lastChecked: generatedAt
}));

const liveIds = new Set(items.map((item) => item.id));
for (const id of archive.ids) {
  if (liveIds.has(id)) continue;
  items.push({
    id,
    name: id,
    category: "mcp",
    status: "skipped_with_reason",
    scope: "Present in infra-v1 archive MCP catalog but not present in live codex mcp list.",
    requiresEnv: [],
    lastChecked: generatedAt,
    notes: "Archive-only MCP reference retained for readiness comparison.",
    auth: "archive",
    sourceType: "archive",
    archiveStatus: "archive_only",
    probe: "not_run"
  });
}

if (archive.count === 0) {
  for (const item of fallbackArchiveOnlyItems) {
    if (liveIds.has(item.id)) continue;
    items.push({
      ...item,
      lastChecked: generatedAt,
      notes: "Archive-only MCP reference retained from the previous snapshot because the source archive was unavailable.",
      probe: "not_run"
    });
  }
}

items.sort((a, b) => a.name.localeCompare(b.name));

const archiveSummary = {
  matched: items.filter((item) => item.archiveStatus === "matched").length,
  liveOnly: items.filter((item) => item.archiveStatus === "live_only").length,
  archiveOnly: items.filter((item) => item.archiveStatus === "archive_only").length,
  unknown: items.filter((item) => item.archiveStatus === "unknown").length
};
const sourceArchiveMode = archive.count > 0
  ? "live_archive"
  : fallbackArchiveOnlyItems.length > 0
    ? "fallback_snapshot"
    : "none";
const snapshot = {
  generatedAt,
  sourceCommand: "codex mcp list",
  sourceArchiveCount: archive.count || fallbackArchiveOnlyItems.length,
  sourceArchiveMode,
  sourceArchivePath: archive.archivePath,
  sourceArchiveCatalogEntry: archiveCatalogEntry,
  sourceArchiveErrors: archive.errors,
  archiveSummary,
  summary: summarize(items),
  items
};

fs.writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(
  `MCP readiness snapshot written: ${items.length} items, archive mode=${sourceArchiveMode}, archive entries=${snapshot.sourceArchiveCount}.`
);
