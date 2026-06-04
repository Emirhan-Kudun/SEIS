import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = "data/seis/connector-readiness-matrix.json";

function readJson(relPath, fallback = null) {
  const absolutePath = join(ROOT, relPath);
  if (!existsSync(absolutePath)) return fallback;
  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

function groupBySurface(items) {
  return items.reduce((groups, item) => {
    const surfaceId = item.surfaceId || "unmapped-runtime-items";
    if (!groups.has(surfaceId)) groups.set(surfaceId, []);
    groups.get(surfaceId).push(item);
    return groups;
  }, new Map());
}

function countBy(items, field) {
  return items.reduce((counts, item) => {
    const key = item[field] || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function activationStateFor(surface, counts) {
  const status = String(surface.status || "").toLowerCase();
  if (status.includes("blocked")) return "blocked";
  if ((counts["blocked-auth"] || 0) > 0) return "auth-required";
  if ((counts["permission-gated"] || 0) > 0 || status.includes("permission")) return "permission-gated";
  if (surface.risk === "high") return "guarded-ready";
  if (String(surface.status || "").includes("read-only")) return "read-only-ready";
  return "ready";
}

function recommendedActionFor(surface, state, blockedAuthItems, permissionGatedItems) {
  if (state === "blocked") {
    return surface.activationRule || "Keep blocked until target, rollback, and permission boundaries are explicit.";
  }

  if (blockedAuthItems.length > 0) {
    return `Authenticate or exclude ${blockedAuthItems.slice(0, 3).map((item) => item.name).join(", ")} before write-capable use.`;
  }

  if (permissionGatedItems.length > 0) {
    return `Confirm permission or OAuth intent for ${permissionGatedItems.slice(0, 3).map((item) => item.name).join(", ")}.`;
  }

  if (surface.risk === "high") {
    return "Run read-only preflight and keep rollback path explicit before any write.";
  }

  return surface.activationRule || "Use only when selected by the mission router.";
}

function surfaceMatrixEntry(surface, items) {
  const readinessCounts = countBy(items, "readiness");
  const authCounts = countBy(items, "auth");
  const blockedAuthItems = items
    .filter((item) => item.readiness === "blocked-auth")
    .map(({ name, auth }) => ({ name, auth }));
  const permissionGatedItems = items
    .filter((item) => item.readiness === "permission-gated")
    .map(({ name, auth }) => ({ name, auth }));
  const state = activationStateFor(surface, readinessCounts);

  return {
    id: surface.id,
    label: surface.label,
    ownerAgent: surface.ownerAgent,
    risk: surface.risk,
    registryStatus: surface.status,
    activationState: state,
    runtimeItems: items.length,
    readinessCounts,
    authCounts,
    blockedAuthItems,
    permissionGatedItems,
    examples: items.slice(0, 8).map(({ name, readiness, auth }) => ({ name, readiness, auth })),
    recommendedAction: recommendedActionFor(surface, state, blockedAuthItems, permissionGatedItems),
    guardrails: surface.guardrails || []
  };
}

function main() {
  const registry = readJson("data/seis/mcp-skill-connector-registry.json", {});
  const readiness = readJson("data/seis/mcp-runtime-readiness.json", {});
  const operations = readJson("data/seis/operations-readiness.json", {});
  const grouped = groupBySurface(readiness.items || []);
  const surfaces = registry.surfaces || [];
  const matrix = surfaces.map((surface) => surfaceMatrixEntry(surface, grouped.get(surface.id) || []));
  const unmappedItems = grouped.get("unmapped-runtime-items") || [];
  const authRequiredSurfaces = matrix.filter((surface) => surface.activationState === "auth-required");
  const permissionGatedSurfaces = matrix.filter((surface) => surface.activationState === "permission-gated");
  const blockedSurfaces = matrix.filter((surface) => surface.activationState === "blocked");
  const guardedReadySurfaces = matrix.filter((surface) => surface.activationState === "guarded-ready");

  const snapshot = {
    schemaVersion: "1.0.0",
    generatedBy: "scripts/generate-seis-connector-readiness-matrix.mjs",
    generatedAt: new Date().toISOString(),
    mission: "SEIS-M009",
    purpose: "Convert the live MCP runtime inventory into a compact connector and skill surface readiness matrix.",
    source: {
      secretsStored: false,
      files: [
        "data/seis/mcp-runtime-readiness.json",
        "data/seis/mcp-skill-connector-registry.json",
        "data/seis/operations-readiness.json"
      ]
    },
    policy: {
      blanketInvocationAllowed: false,
      defaultMode: "mission-routed-read-only-first",
      writeRequires: [
        "explicit mission",
        "auth readiness",
        "permission confirmation",
        "rollback path",
        "validation command"
      ]
    },
    summary: {
      surfaceCount: matrix.length,
      runtimeItems: readiness.summary?.totalItems || 0,
      mappedItems: readiness.summary?.mappedItems || 0,
      unmappedItems: readiness.summary?.unmappedItems || unmappedItems.length,
      blockedAuthItems: readiness.summary?.byReadiness?.["blocked-auth"] || 0,
      permissionGatedItems: readiness.summary?.byReadiness?.["permission-gated"] || 0,
      authRequiredSurfaces: authRequiredSurfaces.length,
      permissionGatedSurfaces: permissionGatedSurfaces.length,
      blockedSurfaces: blockedSurfaces.length,
      guardedReadySurfaces: guardedReadySurfaces.length,
      operationsStatus: operations.summary?.status || null
    },
    matrix,
    unmappedRuntimeItems: unmappedItems.slice(0, 20).map(({ name, readiness, auth }) => ({ name, readiness, auth })),
    nextActions: [
      "Use this matrix before selecting write-capable skills, connectors, or MCP surfaces.",
      "Authenticate or explicitly exclude blocked-auth connectors before external writes.",
      "Treat OAuth and permission-gated surfaces as human-confirmation gates.",
      "Keep high-risk cloud, data, security, payment, and GitHub surfaces read-only-first."
    ]
  };

  writeFileSync(join(ROOT, OUTPUT_PATH), `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(JSON.stringify({
    ok: true,
    mission: snapshot.mission,
    outputPath: OUTPUT_PATH,
    surfaceCount: snapshot.summary.surfaceCount,
    runtimeItems: snapshot.summary.runtimeItems,
    authRequiredSurfaces: snapshot.summary.authRequiredSurfaces,
    blockedSurfaces: snapshot.summary.blockedSurfaces
  }, null, 2));
}

main();
