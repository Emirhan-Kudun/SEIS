import { existsSync, readFileSync, writeFileSync } from "node:fs";

const targetsPath = "deploy/server-targets.json";
const matrixPath = "deploy/provider-matrix.json";
const manifestPath = "dist/server-upload-manifest.json";
const outputPath = "deploy/upload-plan.json";

if (!existsSync(targetsPath)) {
  throw new Error(`Missing ${targetsPath}`);
}
if (!existsSync(manifestPath)) {
  throw new Error(`Missing ${manifestPath}. Run npm run prepare:server first.`);
}
if (!existsSync(matrixPath)) {
  throw new Error(`Missing ${matrixPath}.`);
}

const targets = JSON.parse(readFileSync(targetsPath, "utf8"));
const matrix = JSON.parse(readFileSync(matrixPath, "utf8"));
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const activeCandidate = (targets.candidates || []).find(candidate => candidate.id === targets.activeTarget) || null;
const activeProvider = (matrix.providers || []).find(provider => provider.id === targets.activeTarget) || null;

const plan = {
  version: 1,
  status: activeCandidate ? "ready_for_targeted_upload" : "blocked_until_target_confirmed",
  activeTarget: targets.activeTarget,
  targetType: activeCandidate?.type || null,
  provider: activeProvider ? {
    uploadModel: activeProvider.uploadModel,
    verifyRoutes: activeProvider.verifyRoutes,
    rollback: activeProvider.rollback
  } : null,
  package: {
    path: manifest.packagePath,
    bytes: manifest.packageBytes,
    sha256: manifest.sha256
  },
  steps: buildSteps(activeCandidate),
  rollback: {
    strategy: "restore_previous_release_zip",
    latestPointer: "releases/latest.json",
    healthCheck: "/health.json"
  },
  generatedAt: new Date().toISOString()
};

writeFileSync(outputPath, `${JSON.stringify(plan, null, 2)}\n`);
console.log(`Upload plan ready: ${outputPath}`);

function buildSteps(candidate) {
  if (!candidate) {
    return [
      "Confirm hosting provider, domain, and upload path.",
      "Run scripts/configure-server-target.mjs with the chosen target.",
      "Run npm run check:release again.",
      "Upload dist/seis-static.zip only after checksum verification."
    ];
  }

  if (candidate.id === "hostinger-static" || candidate.id === "apache-shared-hosting") {
    return [
      "Upload dist/seis-static.zip to the confirmed document root.",
      "Extract the zip so index.html is at the web root.",
      "Verify /health.json returns ok=true.",
      "Verify /tr/ and /ar/ routes render.",
      "Keep releases/latest.json for rollback."
    ];
  }

  if (candidate.id === "docker-node-static") {
    return [
      "Build the Docker image from server/docker/Dockerfile.",
      "Run the container with the confirmed host and port.",
      "Verify /_server/health returns ok=true.",
      "Keep dist/server-upload-manifest.json next to the deployed artifact."
    ];
  }

  return [
    "Upload dist/seis-static.zip to the confirmed target.",
    "Verify checksum against dist/server-upload-manifest.json.",
    "Verify /health.json.",
    "Record deployed release in the hosting dashboard or deployment notes."
  ];
}
