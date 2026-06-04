import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = "data/seis/capability-activation-hub.json";

function readJson(relPath, fallback = null) {
  const absolutePath = join(ROOT, relPath);
  if (!existsSync(absolutePath)) return fallback;
  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item?.[key] || "unknown";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function firstExamples(items, limit = 8) {
  return items.slice(0, limit).map((item) => ({
    name: item.name,
    readiness: item.readiness,
    auth: item.auth
  }));
}

function surfaceState(matrixSurface) {
  if (!matrixSurface) return "not-mapped";
  if (matrixSurface.activationState === "ready") return "usable-read-only-first";
  if (matrixSurface.activationState === "permission-gated") return "permission-gated";
  if (matrixSurface.activationState === "auth-required") return "auth-required";
  return matrixSurface.activationState || "guarded";
}

function main() {
  const runtime = readJson("data/seis/mcp-runtime-readiness.json", { items: [], summary: {} });
  const registry = readJson("data/seis/mcp-skill-connector-registry.json", { surfaces: [] });
  const connectorMatrix = readJson("data/seis/connector-readiness-matrix.json", { matrix: [], summary: {} });
  const toolRules = readJson("data/seis/tool-activation-rules.json", { intents: [] });
  const pluginRegistry = readJson("content/development/plugin-skill-registry.json", { surfaces: [] });
  const capabilityMap = readJson("content/development/plugin-skill-capability-map.json", { capabilities: [] });
  const cloudEnvironment = readJson("config/seis-cloud-environment.json", { cloudActions: [], requiredChecks: [] });
  const deploymentReadiness = readJson("data/seis/deployment-readiness.json", { summary: {} });
  const remoteShipmentGate = readJson("data/seis/remote-shipment-gate.json", { summary: {} });

  const runtimeItems = Array.isArray(runtime.items) ? runtime.items : [];
  const registrySurfaces = Array.isArray(registry.surfaces) ? registry.surfaces : [];
  const connectorSurfaces = Array.isArray(connectorMatrix.matrix) ? connectorMatrix.matrix : [];
  const pluginSurfaces = Array.isArray(pluginRegistry.surfaces) ? pluginRegistry.surfaces : [];
  const capabilities = Array.isArray(capabilityMap.capabilities) ? capabilityMap.capabilities : [];
  const cloudActions = Array.isArray(cloudEnvironment.cloudActions) ? cloudEnvironment.cloudActions : [];
  const intents = Array.isArray(toolRules.intents) ? toolRules.intents : [];
  const connectorById = new Map(connectorSurfaces.map((surface) => [surface.id, surface]));
  const runtimeBySurface = runtimeItems.reduce((acc, item) => {
    const surfaceId = item.surfaceId || "unmapped";
    if (!acc[surfaceId]) acc[surfaceId] = [];
    acc[surfaceId].push(item);
    return acc;
  }, {});

  const activationLanes = registrySurfaces.map((surface) => {
    const matrixSurface = connectorById.get(surface.id);
    const items = runtimeBySurface[surface.id] || [];
    return {
      id: surface.id,
      label: surface.label,
      ownerAgent: surface.ownerAgent,
      domains: surface.domains || [],
      risk: surface.risk,
      registryStatus: surface.status,
      activationState: surfaceState(matrixSurface),
      runtimeItems: items.length,
      readinessCounts: countBy(items, "readiness"),
      authCounts: countBy(items, "auth"),
      examples: firstExamples(items),
      activationRule: surface.activationRule,
      guardrails: surface.guardrails || []
    };
  });

  const usableRuntimeItems = runtimeItems.filter((item) => item.readiness === "enabled-no-auth-handshake");
  const permissionGatedItems = runtimeItems.filter((item) => item.readiness === "permission-gated");
  const blockedAuthItems = runtimeItems.filter((item) => item.readiness === "blocked-auth");
  const linkedCloudActions = cloudActions.filter((action) => action.writes === false).map((action) => ({
    id: action.id,
    label: action.label,
    command: action.command
  }));

  const blockers = [
    registry?.policy?.blanketActivationAllowed === false ? null : "blanket MCP/plugin activation must remain disabled",
    runtime?.policy?.blanketInvocationAllowed === false ? null : "runtime readiness must block blanket invocation",
    connectorMatrix?.policy?.blanketInvocationAllowed === false ? null : "connector matrix must block blanket invocation",
    registrySurfaces.length >= 10 ? null : "capability hub requires at least 10 registry surfaces",
    runtimeItems.length >= 100 ? null : "capability hub requires live MCP runtime inventory",
    pluginSurfaces.length >= 8 ? null : "plugin skill registry surface coverage is incomplete",
    capabilities.length >= 10 ? null : "plugin skill capability map is incomplete",
    cloudActions.some((action) => action.id === "github-language-presence") ? null : "cloud actions must include GitHub language presence gate",
    cloudActions.some((action) => action.id === "server-upload-dry-run") ? null : "cloud actions must include server upload dry-run",
    remoteShipmentGate?.summary?.readyToUpload === false ? null : "server upload gate must stay explicit"
  ].filter(Boolean);

  const hub = {
    schemaVersion: "1.0.0",
    generatedBy: "scripts/generate-seis-capability-activation-hub.mjs",
    generatedAt: new Date().toISOString(),
    mission: "SEIS-M015",
    purpose: "Connect usable SEIS apps, skills, plugins, MCPs, GitHub publication, cloud actions, and server handoff into one mission-routed activation hub.",
    source: {
      secretsStored: false,
      files: [
        "data/seis/mcp-runtime-readiness.json",
        "data/seis/mcp-skill-connector-registry.json",
        "data/seis/connector-readiness-matrix.json",
        "data/seis/tool-activation-rules.json",
        "content/development/plugin-skill-registry.json",
        "content/development/plugin-skill-capability-map.json",
        "config/seis-cloud-environment.json",
        "data/seis/deployment-readiness.json",
        "data/seis/remote-shipment-gate.json"
      ]
    },
    policy: {
      branch: "UIXAppTTR",
      defaultMode: "mission-routed-read-only-first",
      blanketActivationAllowed: false,
      runtimeDependencyAdded: false,
      writeRequires: [
        "explicit mission",
        "auth readiness",
        "permission confirmation",
        "rollback path",
        "validation command"
      ],
      serverUploadRequires: ["UIX_UPLOAD_HOST", "UIX_UPLOAD_USER", "UIX_UPLOAD_PATH"]
    },
    summary: {
      status: blockers.length > 0 ? "ready-with-blockers" : "ready",
      ready: blockers.length === 0,
      runtimeItems: runtimeItems.length,
      usableRuntimeItems: usableRuntimeItems.length,
      permissionGatedItems: permissionGatedItems.length,
      blockedAuthItems: blockedAuthItems.length,
      activationLanes: activationLanes.length,
      pluginSkillSurfaces: pluginSurfaces.length,
      pluginSkillCapabilities: capabilities.length,
      toolIntents: intents.length,
      cloudActions: cloudActions.length,
      linkedReadOnlyCloudActions: linkedCloudActions.length,
      githubPushReady: Boolean(remoteShipmentGate?.summary?.readyToPush || deploymentReadiness?.summary?.pushReady),
      serverUploadReady: Boolean(remoteShipmentGate?.summary?.readyToUpload),
      blockerCount: blockers.length,
      blockers
    },
    activationLanes,
    missionRouter: intents.map((intent) => ({
      id: intent.id,
      label: intent.label,
      primaryAgents: intent.primaryAgents || [],
      requiredSurfaces: intent.requiredSurfaces || [],
      conditionalSurfaces: (intent.conditionalSurfaces || []).map((surface) => surface.id),
      validation: intent.validation || []
    })),
    pluginSkillBridge: {
      registrySurfaces: pluginSurfaces.map((surface) => ({
        id: surface.id,
        type: surface.type,
        ownerAgent: surface.ownerAgent,
        status: surface.status,
        risk: surface.risk,
        allowedSurfaces: surface.allowedSurfaces || []
      })),
      capabilityFamilies: capabilities.map((capability) => ({
        id: capability.id,
        label: capability.label,
        surfaceId: capability.surfaceId,
        ownerAgent: capability.ownerAgent,
        activationMode: capability.activationMode,
        risk: capability.risk,
        examples: capability.pluginExamples || []
      }))
    },
    cloudBridge: {
      environment: cloudEnvironment.environment?.id || "unknown",
      branch: cloudEnvironment.environment?.branch || "unknown",
      writePolicy: cloudEnvironment.environment?.writePolicy || "unknown",
      readOnlyActions: linkedCloudActions
    },
    nextActions: [
      "Use the mission router before selecting any skill, connector, plugin, or MCP.",
      "Prefer read-only capability checks before external writes.",
      "Keep GitHub as source of truth and iCloud as synchronized local workspace.",
      "Do not execute real server upload until required environment variables are present outside Git.",
      "Do not add dependencies merely to increase perceived capability breadth."
    ]
  };

  writeFileSync(join(ROOT, OUTPUT_PATH), `${JSON.stringify(hub, null, 2)}\n`);
  console.log(JSON.stringify({
    ok: true,
    mission: hub.mission,
    outputPath: OUTPUT_PATH,
    status: hub.summary.status,
    runtimeItems: hub.summary.runtimeItems,
    usableRuntimeItems: hub.summary.usableRuntimeItems,
    activationLanes: hub.summary.activationLanes,
    cloudActions: hub.summary.cloudActions,
    blockerCount: hub.summary.blockerCount
  }, null, 2));
}

main();
