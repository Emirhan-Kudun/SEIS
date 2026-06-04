import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = "data/seis/remote-shipment-gate.json";

function readJson(relPath, fallback = null) {
  const absolutePath = join(ROOT, relPath);
  if (!existsSync(absolutePath)) return fallback;
  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

function gate(id, label, ready, blockers = [], evidence = {}) {
  return {
    id,
    label,
    status: ready ? "ready" : "blocked",
    ready: Boolean(ready),
    blockerCount: blockers.length,
    blockers,
    evidence
  };
}

function main() {
  const cloudServer = readJson("data/seis/cloud-server-environment.json", {});
  const deployEnvelope = readJson("data/seis/server-cloud-deploy-envelope.json", {});
  const deployment = readJson("data/seis/deployment-readiness.json", {});
  const operations = readJson("data/seis/operations-readiness.json", {});
  const connectorMatrix = readJson("data/seis/connector-readiness-matrix.json", {});
  const requiredEnvNames = deployEnvelope.environmentTemplate?.requiredNames || [
    "UIX_UPLOAD_HOST",
    "UIX_UPLOAD_USER",
    "UIX_UPLOAD_PATH"
  ];
  const serverMissing = deployEnvelope.server?.missingEnvironment || cloudServer.server?.missingEnvironment || [];
  const serverBlockers = serverMissing.map((name) => `missing server environment variable: ${name}`);
  const gates = [
    gate(
      "github",
      "GitHub UIXAppTTR sync",
      Boolean(deployment.summary?.githubServerSynced && cloudServer.github?.serverSynced && deployEnvelope.summary?.githubServerSynced),
      deployment.summary?.githubServerSynced ? [] : ["GitHub UIXAppTTR is not synced"],
      {
        branch: cloudServer.github?.branch || deployment.github?.branch || null,
        remote: cloudServer.github?.remote || deployment.github?.remote || null
      }
    ),
    gate(
      "cloud",
      "Codex cloud environment",
      Boolean(deployment.summary?.cloudReady && cloudServer.summary?.cloudReady && deployEnvelope.summary?.cloudReady),
      deployment.summary?.cloudReady ? [] : ["SEIS cloud environment is not ready"],
      {
        id: cloudServer.cloud?.id || deployEnvelope.cloud?.id || null,
        branch: cloudServer.cloud?.branch || deployEnvelope.cloud?.branch || null
      }
    ),
    gate(
      "connector",
      "Mission-routed MCP and connector readiness",
      Boolean(cloudServer.summary?.connectorMatrixReady && Number(connectorMatrix.summary?.surfaceCount || 0) >= 10),
      Number(connectorMatrix.summary?.surfaceCount || 0) >= 10 ? [] : ["connector readiness matrix is incomplete"],
      {
        runtimeItems: connectorMatrix.summary?.runtimeItems || 0,
        surfaceCount: connectorMatrix.summary?.surfaceCount || 0,
        blockedSurfaces: connectorMatrix.summary?.blockedSurfaces || 0,
        authRequiredSurfaces: connectorMatrix.summary?.authRequiredSurfaces || 0
      }
    ),
    gate(
      "bundle",
      "Server upload bundle",
      Boolean(deployEnvelope.server?.bundleReady && Number(deployEnvelope.server?.bundleFileCount || 0) > 0),
      deployEnvelope.server?.bundleReady ? [] : ["server upload bundle is missing or empty"],
      {
        bundleDirectory: deployEnvelope.server?.bundleDirectory || null,
        fileCount: deployEnvelope.server?.bundleFileCount || 0
      }
    ),
    gate(
      "server-environment",
      "Server environment",
      serverMissing.length === 0,
      serverBlockers,
      {
        requiredNames: requiredEnvNames,
        envFileSupported: Boolean(deployEnvelope.server?.envFileSupported),
        templatePath: deployEnvelope.environmentTemplate?.templatePath || null,
        localIgnoredPath: deployEnvelope.environmentTemplate?.localIgnoredPath || null
      }
    )
  ];
  const hardBlockers = gates.flatMap((item) => item.blockers.map((message) => `${item.id}: ${message}`));
  const allReady = gates.every((item) => item.ready);

  const snapshot = {
    schemaVersion: "1.0.0",
    generatedBy: "scripts/generate-seis-remote-shipment-gate.mjs",
    generatedAt: new Date().toISOString(),
    mission: "SEIS-M012",
    purpose: "Provide a single secret-safe go/no-go gate for GitHub, cloud, MCP connector, bundle, and server upload readiness.",
    source: {
      secretsStored: false,
      files: [
        "data/seis/cloud-server-environment.json",
        "data/seis/server-cloud-deploy-envelope.json",
        "data/seis/deployment-readiness.json",
        "data/seis/operations-readiness.json",
        "data/seis/connector-readiness-matrix.json"
      ]
    },
    policy: {
      branch: "UIXAppTTR",
      mainPushAllowed: false,
      blanketConnectorExecutionAllowed: false,
      realServerUploadRequiresEnv: requiredEnvNames,
      executeCommandRequiresManualReview: true
    },
    gates,
    commands: [
      "npm run quality:seis",
      "npm run quality:fullstack",
      "npm run publish:preflight",
      "npm run check:github-server-sync",
      "npm run server-upload:dry-run",
      "npm run server-upload:execute"
    ],
    summary: {
      status: allReady ? "ready-to-ship" : "blocked-by-server-environment",
      readyToPush: Boolean(deployment.summary?.githubServerSynced),
      readyToUpload: allReady,
      safeToExecuteUpload: allReady,
      operationStatus: operations.summary?.status || null,
      blockerCount: hardBlockers.length,
      blockers: hardBlockers
    },
    nextActions: allReady
      ? [
          "Run npm run server-upload:dry-run and inspect the generated rsync command.",
          "Run npm run server-upload:execute only after explicit review."
        ]
      : [
          "Fill .env.server.local from config/server-upload.env.example outside Git.",
          "Run npm run server-upload:dry-run to confirm the upload command.",
          "Regenerate this gate with npm run generate:seis-remote-shipment-gate."
        ]
  };

  writeFileSync(join(ROOT, OUTPUT_PATH), `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(JSON.stringify({
    ok: true,
    mission: snapshot.mission,
    outputPath: OUTPUT_PATH,
    status: snapshot.summary.status,
    readyToUpload: snapshot.summary.readyToUpload,
    blockerCount: snapshot.summary.blockerCount
  }, null, 2));
}

main();
