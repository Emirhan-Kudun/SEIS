import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = "data/seis/server-cloud-deploy-envelope.json";
const ENV_TEMPLATE_PATH = "config/server-upload.env.example";
const LOCAL_ENV_PATH = ".env.server.local";

function readJson(relPath, fallback = null) {
  const absolutePath = join(ROOT, relPath);
  if (!existsSync(absolutePath)) return fallback;
  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

function readText(relPath) {
  const absolutePath = join(ROOT, relPath);
  if (!existsSync(absolutePath)) return "";
  return readFileSync(absolutePath, "utf8");
}

function requiredEnvironmentState(names) {
  return names.map((name) => ({
    name,
    present: Boolean(process.env[name])
  }));
}

function main() {
  const serverTarget = readJson("config/server-target-profile.json", {});
  const cloudEnvironment = readJson("data/seis/cloud-server-environment.json", {});
  const deployment = readJson("data/seis/deployment-readiness.json", {});
  const connectorMatrix = readJson("data/seis/connector-readiness-matrix.json", {});
  const bundleManifest = readJson("runtime/server-upload-bundle/manifest.json", {});
  const gitignore = readText(".gitignore");
  const target = (serverTarget.targets || []).find((item) => item.id === serverTarget.defaultTarget) || {};
  const requiredNames = Object.values(target.requiredEnvironment || {});
  const requiredEnvironment = requiredEnvironmentState(requiredNames);
  const missingEnvironment = requiredEnvironment.filter((item) => !item.present).map((item) => item.name);
  const bundleReady = Boolean(bundleManifest.fileCount && existsSync(join(ROOT, target.bundleDirectory || "")));
  const localEnvIgnored = gitignore.includes(".env.*.local");
  const blockers = [
    ...missingEnvironment.map((name) => `missing server environment variable: ${name}`),
    !bundleReady ? "server upload bundle is missing or empty" : null,
    !localEnvIgnored ? ".env.server.local is not covered by .gitignore" : null,
    deployment.summary?.githubServerSynced ? null : "GitHub UIXAppTTR is not synced",
    cloudEnvironment.summary?.cloudReady ? null : "SEIS cloud environment is not ready"
  ].filter(Boolean);

  const envelope = {
    schemaVersion: "1.0.0",
    generatedBy: "scripts/generate-seis-deploy-envelope.mjs",
    generatedAt: new Date().toISOString(),
    mission: "SEIS-M011",
    purpose: "Prepare the SEIS server and cloud deploy envelope without storing deployment secrets.",
    source: {
      secretsStored: false,
      files: [
        "config/server-target-profile.json",
        "config/server-upload.env.example",
        "data/seis/cloud-server-environment.json",
        "data/seis/deployment-readiness.json",
        "data/seis/connector-readiness-matrix.json",
        "runtime/server-upload-bundle/manifest.json"
      ]
    },
    environmentTemplate: {
      templatePath: ENV_TEMPLATE_PATH,
      localIgnoredPath: LOCAL_ENV_PATH,
      ignoredByGit: localEnvIgnored,
      loaderCommand: "npm run server-upload:dry-run",
      explicitLoaderCommand: "node scripts/server-upload-dry-run.cjs --env-file .env.server.local",
      requiredNames
    },
    server: {
      targetId: target.id || null,
      method: target.method || null,
      bundleDirectory: target.bundleDirectory || null,
      bundleFileCount: bundleManifest.fileCount || 0,
      bundleReady,
      requiredEnvironment,
      missingEnvironment,
      dryRunCommand: target.dryRunCommand || "npm run server-upload:dry-run",
      executeCommand: target.executeCommand || "npm run server-upload:execute",
      envFileSupported: true,
      safeRemotePathPattern: target.safeRemotePathPattern || null
    },
    cloud: {
      id: cloudEnvironment.cloud?.id || null,
      branch: cloudEnvironment.cloud?.branch || null,
      requiredChecks: [
        "npm run check:seis-deploy-envelope",
        "npm run check:seis-remote-shipment-gate",
        "npm run check:seis-cloud-server-environment",
        "npm run publish:preflight",
        "npm run server-upload:dry-run"
      ],
      connectorSurfaceCount: connectorMatrix.summary?.surfaceCount || 0,
      blockedConnectorSurfaces: connectorMatrix.summary?.blockedSurfaces || 0
    },
    commands: [
      {
        id: "copy-template",
        command: "cp config/server-upload.env.example .env.server.local",
        writes: true,
        scope: "local ignored environment file"
      },
      {
        id: "build-bundle",
        command: "npm run build:server-upload-bundle",
        writes: true,
        scope: "runtime/server-upload-bundle"
      },
      {
        id: "check-envelope",
        command: "npm run check:seis-deploy-envelope",
        writes: false,
        scope: "deploy readiness validation"
      },
      {
        id: "dry-run",
        command: "npm run server-upload:dry-run",
        writes: false,
        scope: "server upload command preview"
      },
      {
        id: "execute",
        command: "npm run server-upload:execute",
        writes: true,
        scope: "server upload after explicit environment readiness"
      }
    ],
    summary: {
      status: blockers.length > 0 ? "ready-to-configure" : "ready-to-upload",
      deployReady: blockers.length === 0,
      dryRunReady: bundleReady,
      githubServerSynced: Boolean(deployment.summary?.githubServerSynced),
      cloudReady: Boolean(cloudEnvironment.summary?.cloudReady),
      secretSafe: true,
      blockerCount: blockers.length,
      blockers
    },
    nextActions: [
      "Copy config/server-upload.env.example to .env.server.local.",
      "Fill UIX_UPLOAD_HOST, UIX_UPLOAD_USER, and UIX_UPLOAD_PATH in .env.server.local only.",
      "Run npm run server-upload:dry-run and inspect the command.",
      "Run npm run server-upload:execute only after dry-run and GitHub sync are acceptable."
    ]
  };

  writeFileSync(join(ROOT, OUTPUT_PATH), `${JSON.stringify(envelope, null, 2)}\n`);
  console.log(JSON.stringify({
    ok: true,
    mission: envelope.mission,
    outputPath: OUTPUT_PATH,
    status: envelope.summary.status,
    deployReady: envelope.summary.deployReady,
    blockerCount: envelope.summary.blockerCount
  }, null, 2));
}

main();
