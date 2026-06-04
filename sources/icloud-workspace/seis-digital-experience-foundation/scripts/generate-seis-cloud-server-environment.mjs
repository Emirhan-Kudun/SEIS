import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = "data/seis/cloud-server-environment.json";

function readJson(relPath, fallback = null) {
  const absolutePath = join(ROOT, relPath);
  if (!existsSync(absolutePath)) return fallback;
  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

function environmentState(names) {
  return names.map((name) => ({
    name,
    present: Boolean(process.env[name])
  }));
}

function statusFromBlockers(blockers) {
  return blockers.length > 0 ? "ready-with-blockers" : "ready";
}

function main() {
  const cloudConfig = readJson("config/seis-cloud-environment.json", {});
  const serverTarget = readJson("config/server-target-profile.json", {});
  const deployment = readJson("data/seis/deployment-readiness.json", {});
  const operations = readJson("data/seis/operations-readiness.json", {});
  const connectorMatrix = readJson("data/seis/connector-readiness-matrix.json", {});
  const bundleManifest = readJson("runtime/server-upload-bundle/manifest.json", {});
  const target = (serverTarget.targets || []).find((item) => item.id === serverTarget.defaultTarget) || {};
  const requiredServerEnvNames = Object.values(target.requiredEnvironment || {});
  const serverEnvironment = environmentState(requiredServerEnvNames);
  const missingServerEnv = serverEnvironment.filter((item) => !item.present).map((item) => item.name);
  const requiredChecks = [
    "npm run quality:seis",
    "npm run quality:fullstack",
    "npm run check:seis-cloud-server-environment",
    "npm run check:seis-deploy-envelope",
    "npm run check:seis-remote-shipment-gate",
    "npm run publish:preflight",
    "npm run server-upload:dry-run"
  ];
  const cloudCommands = new Set((cloudConfig.cloudActions || []).map((action) => action.command));
  const missingCloudActions = requiredChecks.filter((command) => !cloudCommands.has(command));
  const blockers = [
    ...missingServerEnv.map((name) => `missing server environment variable: ${name}`),
    ...(deployment.summary?.githubServerSynced ? [] : ["GitHub server branch is not synced"]),
    ...(deployment.summary?.cloudReady ? [] : ["Codex cloud environment is not ready"]),
    ...(bundleManifest.fileCount > 0 ? [] : ["server upload bundle manifest is missing or empty"]),
    ...missingCloudActions.map((command) => `cloud action missing: ${command}`)
  ];

  const profile = {
    schemaVersion: "1.0.0",
    generatedBy: "scripts/generate-seis-cloud-server-environment.mjs",
    generatedAt: new Date().toISOString(),
    mission: "SEIS-M010",
    purpose: "Define the safe SEIS cloud and server execution environment without storing secrets.",
    source: {
      secretsStored: false,
      files: [
        "config/seis-cloud-environment.json",
        "config/server-target-profile.json",
        "data/seis/deployment-readiness.json",
        "data/seis/operations-readiness.json",
        "data/seis/connector-readiness-matrix.json",
        "runtime/server-upload-bundle/manifest.json"
      ]
    },
    cloud: {
      id: cloudConfig.environment?.id || null,
      name: cloudConfig.environment?.name || null,
      branch: cloudConfig.environment?.branch || null,
      setupScript: cloudConfig.environment?.setupScript || null,
      writePolicy: cloudConfig.environment?.writePolicy || null,
      internetAccess: cloudConfig.environment?.internetAccess || null,
      executionMode: cloudConfig.environment?.executionMode || null,
      requiredChecks,
      configuredActions: (cloudConfig.cloudActions || []).map((action) => ({
        id: action.id,
        command: action.command,
        writes: Boolean(action.writes)
      }))
    },
    server: {
      targetId: target.id || null,
      method: target.method || null,
      bundleDirectory: target.bundleDirectory || null,
      bundleFileCount: bundleManifest.fileCount || 0,
      dryRunCommand: target.dryRunCommand || "npm run server-upload:dry-run",
      executeCommand: target.executeCommand || "npm run server-upload:execute",
      requiredEnvironment: serverEnvironment,
      missingEnvironment: missingServerEnv,
      safeRemotePathPattern: target.safeRemotePathPattern || null,
      executeReady: missingServerEnv.length === 0 && Boolean(bundleManifest.fileCount)
    },
    github: {
      branch: deployment.github?.branch || null,
      remote: deployment.github?.remote || null,
      serverSynced: Boolean(deployment.summary?.githubServerSynced),
      authReady: Boolean(deployment.github?.authReady),
      workflowScopeReady: Boolean(deployment.github?.workflowScopeReady)
    },
    connectors: {
      runtimeItems: connectorMatrix.summary?.runtimeItems || 0,
      surfaceCount: connectorMatrix.summary?.surfaceCount || 0,
      authRequiredSurfaces: connectorMatrix.summary?.authRequiredSurfaces || 0,
      blockedSurfaces: connectorMatrix.summary?.blockedSurfaces || 0,
      operationsStatus: operations.summary?.status || null
    },
    summary: {
      status: statusFromBlockers(blockers),
      cloudReady: Boolean(deployment.summary?.cloudReady),
      serverUploadReady: missingServerEnv.length === 0 && Boolean(bundleManifest.fileCount),
      githubServerSynced: Boolean(deployment.summary?.githubServerSynced),
      connectorMatrixReady: Number(connectorMatrix.summary?.surfaceCount || 0) >= 10,
      blockerCount: blockers.length,
      blockers
    },
    nextActions: [
      "Keep cloud execution on UIXAppTTR with branch-only writes.",
      "Run npm run check:seis-cloud-server-environment before any server upload attempt.",
      "Set UIX_UPLOAD_HOST, UIX_UPLOAD_USER, and UIX_UPLOAD_PATH outside the repository for real upload.",
      "Run npm run server-upload:dry-run before npm run server-upload:execute."
    ]
  };

  writeFileSync(join(ROOT, OUTPUT_PATH), `${JSON.stringify(profile, null, 2)}\n`);
  console.log(JSON.stringify({
    ok: true,
    mission: profile.mission,
    outputPath: OUTPUT_PATH,
    status: profile.summary.status,
    serverUploadReady: profile.summary.serverUploadReady,
    blockerCount: profile.summary.blockerCount
  }, null, 2));
}

main();
