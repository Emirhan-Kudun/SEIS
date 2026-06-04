import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = "data/seis/operations-readiness.json";

function readJson(relPath, fallback = null) {
  const absolutePath = join(ROOT, relPath);
  if (!existsSync(absolutePath)) return fallback;
  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

function statusFromBoolean(value) {
  return value ? "ready" : "blocked";
}

function countSurfaceStates(registry) {
  return (registry.surfaces || []).reduce((counts, surface) => {
    const key = surface.status || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function buildCommandDeck(deployment, mcp, registry, mission) {
  const summary = deployment.summary || {};
  const mcpSummary = mcp.summary || {};
  const surfaces = registry.surfaces || [];
  const highRiskSurfaces = surfaces.filter((surface) => surface.risk === "high");

  return [
    {
      id: "github-server-sync",
      label: "GitHub server sync",
      status: statusFromBoolean(summary.githubServerSynced),
      ownerAgent: "governance-agent",
      detail: summary.githubServerSynced
        ? "Local branch and GitHub server branch are aligned in the latest deployment snapshot."
        : "Local and GitHub server branch are not aligned; run publish preflight before push."
    },
    {
      id: "server-upload-gate",
      label: "Server upload gate",
      status: statusFromBoolean(summary.serverUploadReady),
      ownerAgent: "security-agent",
      detail: summary.serverUploadReady
        ? "Server upload execution has the required environment."
        : "Server upload remains blocked until UIX_UPLOAD_HOST, UIX_UPLOAD_USER, and UIX_UPLOAD_PATH are supplied outside the repository."
    },
    {
      id: "mcp-runtime-snapshot",
      label: "MCP runtime snapshot",
      status: statusFromBoolean(summary.mcpSnapshotReady && Number(mcpSummary.totalItems || 0) >= 50),
      ownerAgent: "automation-agent",
      detail: `${mcpSummary.totalItems || 0} MCP entries are visible, with ${mcpSummary.byReadiness?.["blocked-auth"] || 0} auth-blocked and ${mcpSummary.byReadiness?.["permission-gated"] || 0} permission-gated.`
    },
    {
      id: "connector-surface-discipline",
      label: "Connector surface discipline",
      status: highRiskSurfaces.length > 0 ? "guarded" : "ready",
      ownerAgent: "security-agent",
      detail: `${highRiskSurfaces.length} high-risk surfaces remain guarded by read-only-first, auth, rollback, or explicit mission checks.`
    },
    {
      id: "single-active-mission",
      label: "Single active mission",
      status: mission.activeMission?.status === "active" ? "ready" : "blocked",
      ownerAgent: mission.activeMission?.ownerAgent || "chief-architect-agent",
      detail: `Current mission is ${mission.activeMission?.id || "unknown"}: ${mission.activeMission?.title || "Untitled mission"}.`
    }
  ];
}

function main() {
  const deployment = readJson("data/seis/deployment-readiness.json", {});
  const mcp = readJson("data/seis/mcp-runtime-readiness.json", {});
  const registry = readJson("data/seis/mcp-skill-connector-registry.json", {});
  const mission = readJson("data/seis/mission-control.json", {});

  const commandDeck = buildCommandDeck(deployment, mcp, registry, mission);
  const persistentDeploymentBlockers = (deployment.summary?.blockers || []).filter((detail) => {
    return !String(detail).includes("working tree has uncommitted changes");
  });
  const blockers = [
    ...persistentDeploymentBlockers.map((detail) => ({
      id: `deployment:${detail.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
      surface: "deployment",
      detail
    })),
    ...(registry.runtimeObservations || [])
      .filter((observation) => String(observation.status || "").startsWith("blocked"))
      .map((observation) => ({
        id: `registry:${observation.id}`,
        surface: "connector-runtime",
        detail: observation.detail
      }))
  ];

  const readiness = {
    schemaVersion: "1.0.0",
    generatedBy: "scripts/generate-seis-operations-readiness.mjs",
    generatedAt: new Date().toISOString(),
    mission: "SEIS-M008",
    purpose: "Expose SEIS operations readiness across GitHub, server upload, cloud environment, MCP runtime, and connector governance.",
    source: {
      secretsStored: false,
      files: [
        "data/seis/deployment-readiness.json",
        "data/seis/mcp-runtime-readiness.json",
        "data/seis/mcp-skill-connector-registry.json",
        "data/seis/mission-control.json"
      ]
    },
    summary: {
      status: blockers.length > 0 ? "ready-with-blockers" : "ready",
      commandCount: commandDeck.length,
      blockerCount: blockers.length,
      githubServerSynced: Boolean(deployment.summary?.githubServerSynced),
      serverUploadReady: Boolean(deployment.summary?.serverUploadReady),
      cloudReady: Boolean(deployment.summary?.cloudReady),
      mcpTotalItems: mcp.summary?.totalItems || 0,
      mcpBlockedAuthItems: mcp.summary?.byReadiness?.["blocked-auth"] || 0,
      mcpPermissionGatedItems: mcp.summary?.byReadiness?.["permission-gated"] || 0,
      connectorSurfaceCount: (registry.surfaces || []).length,
      connectorSurfaceStates: countSurfaceStates(registry)
    },
    commandDeck,
    blockers,
    nextActions: [
      "Run npm run quality:seis before each protected push.",
      "Use mission-routed connector activation instead of blanket MCP invocation.",
      "Provide UIX_UPLOAD_HOST, UIX_UPLOAD_USER, and UIX_UPLOAD_PATH outside the repo before real server upload.",
      "Keep GitHub delivery on UIXAppTTR and avoid direct main/master writes."
    ]
  };

  writeFileSync(join(ROOT, OUTPUT_PATH), `${JSON.stringify(readiness, null, 2)}\n`);
  console.log(JSON.stringify({
    ok: true,
    mission: readiness.mission,
    outputPath: OUTPUT_PATH,
    status: readiness.summary.status,
    commandCount: readiness.summary.commandCount,
    blockerCount: readiness.summary.blockerCount
  }, null, 2));
}

main();
