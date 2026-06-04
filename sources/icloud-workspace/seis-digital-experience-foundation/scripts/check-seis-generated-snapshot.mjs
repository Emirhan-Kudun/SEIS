import { existsSync, readFileSync } from "node:fs";

const profileId = process.argv[2];
const failures = [];

const PROFILES = {
  foundation: {
    mode: "foundation"
  },
  "deployment-readiness": {
    path: "data/seis/deployment-readiness.json",
    mission: "SEIS-M007",
    generatedBy: "scripts/generate-seis-deployment-readiness.mjs",
    summaryChecks: [
      ["summary", (value) => typeof value === "object" && value !== null, "deployment readiness must define summary"],
      ["summary.blockers", Array.isArray, "deployment readiness summary must define blockers"],
      ["cloudEnvironment.id", (value) => value === "seis-cloud-uixappttr", "deployment readiness must target seis-cloud-uixappttr"],
      ["github.expectedBranch", (value) => value === "UIXAppTTR", "deployment readiness must target UIXAppTTR"]
    ]
  },
  "operations-readiness": {
    path: "data/seis/operations-readiness.json",
    mission: "SEIS-M008",
    generatedBy: "scripts/generate-seis-operations-readiness.mjs",
    summaryChecks: [
      ["summary.commandCount", (value) => Number.isInteger(value) && value >= 4, "operations readiness must preserve command deck coverage"],
      ["summary.blockerCount", Number.isInteger, "operations readiness must define blockerCount"],
      ["commandDeck", (value) => Array.isArray(value) && value.length >= 4, "operations readiness must preserve command deck entries"]
    ]
  },
  "cloud-server-environment": {
    path: "data/seis/cloud-server-environment.json",
    mission: "SEIS-M010",
    generatedBy: "scripts/generate-seis-cloud-server-environment.mjs",
    summaryChecks: [
      ["cloud.id", (value) => value === "seis-cloud-uixappttr", "cloud server environment must target seis-cloud-uixappttr"],
      ["server.requiredEnvironment", (value) => Array.isArray(value) && value.length >= 3, "cloud server environment must list required server environment variables"],
      ["summary.blockerCount", Number.isInteger, "cloud server environment must define blockerCount"]
    ]
  },
  "deploy-envelope": {
    path: "data/seis/server-cloud-deploy-envelope.json",
    mission: "SEIS-M011",
    generatedBy: "scripts/generate-seis-deploy-envelope.mjs",
    summaryChecks: [
      ["environmentTemplate.requiredNames", (value) => Array.isArray(value) && value.length >= 3, "deploy envelope must preserve required environment names"],
      ["commands", (value) => Array.isArray(value) && value.length >= 4, "deploy envelope must preserve command guidance"],
      ["summary.secretSafe", (value) => value === true, "deploy envelope must remain secret safe"]
    ]
  },
  "remote-shipment-gate": {
    path: "data/seis/remote-shipment-gate.json",
    mission: "SEIS-M012",
    generatedBy: "scripts/generate-seis-remote-shipment-gate.mjs",
    summaryChecks: [
      ["gates", (value) => Array.isArray(value) && value.length >= 5, "remote shipment gate must preserve five gated surfaces"],
      ["summary.readyToPush", (value) => typeof value === "boolean", "remote shipment gate must define readyToPush"],
      ["policy.branch", (value) => value === "UIXAppTTR", "remote shipment gate must stay bound to UIXAppTTR"]
    ]
  },
  "product-engineering-model": {
    path: "data/seis/product-engineering-operating-model.json",
    mission: "SEIS-M013",
    summaryChecks: [
      ["repositoryGovernance.activeBranch", (value) => value === "UIXAppTTR", "product engineering model must preserve UIXAppTTR as the active branch"],
      ["qualityGates", (value) => Array.isArray(value) && value.length >= 5, "product engineering model must preserve quality gates"],
      ["source.secretsStored", (value) => value === false, "product engineering model must remain secret safe"]
    ]
  },
  "github-language-presence": {
    path: "data/seis/github-language-presence.json",
    mission: "SEIS-M014",
    generatedBy: "scripts/generate-seis-github-language-presence.mjs",
    summaryChecks: [
      ["policy.githubLinguistVisible", (value) => value === true, "GitHub language presence must remain linguist visible"],
      ["manifest.entryCount", (value) => Number.isInteger(value) && value >= 50, "GitHub language presence must preserve broad manifest coverage"],
      ["source.secretsStored", (value) => value === false, "GitHub language presence must remain secret safe"]
    ]
  }
};

if (!profileId || !PROFILES[profileId]) {
  console.error("Unknown SEIS snapshot profile.");
  console.error(`Supported profiles: ${Object.keys(PROFILES).sort().join(", ")}`);
  process.exit(1);
}

if (profileId === "foundation") {
  checkFoundation();
  finish("foundation");
  process.exit(0);
}

const profile = PROFILES[profileId];
ensure(existsSync(profile.path), `missing SEIS snapshot: ${profile.path}`);
const snapshot = readJson(profile.path);

ensure(snapshot?.schemaVersion === "1.0.0", `${profileId} snapshot must use schemaVersion 1.0.0`);
ensure(snapshot?.mission === profile.mission, `${profileId} snapshot must belong to ${profile.mission}`);

if (profile.generatedBy) {
  ensure(snapshot?.generatedBy === profile.generatedBy, `${profileId} snapshot must keep generator contract ${profile.generatedBy}`);
}

for (const [path, predicate, message] of profile.summaryChecks || []) {
  ensure(predicate(readPath(snapshot, path)), message);
}

finish(profileId, snapshot);

function checkFoundation() {
  const missionPath = "data/seis/mission-control.json";
  const registryPath = "data/seis/capability-activation-hub.json";
  const matrixPath = "data/seis/connector-readiness-matrix.json";

  ensure(existsSync(missionPath), `missing SEIS foundation mission control: ${missionPath}`);
  ensure(existsSync(registryPath), `missing SEIS foundation capability hub: ${registryPath}`);
  ensure(existsSync(matrixPath), `missing SEIS foundation connector matrix: ${matrixPath}`);

  const mission = readJson(missionPath);
  const registry = readJson(registryPath);
  const matrix = readJson(matrixPath);

  ensure(mission?.schemaVersion === "1.0.0", "SEIS foundation mission control must use schemaVersion 1.0.0");
  ensure(mission?.policy?.singleActiveMission === true, "SEIS foundation must preserve single active mission policy");
  ensure(mission?.activeMission?.id === "SEIS-M015", "SEIS foundation must keep SEIS-M015 active");
  ensure(registry?.mission === "SEIS-M015", "SEIS foundation capability hub must align with SEIS-M015");
  ensure((registry?.summary?.activationLanes || 0) >= 10, "SEIS foundation capability hub must preserve activation lane coverage");
  ensure(matrix?.mission === "SEIS-M009", "SEIS foundation connector matrix must align with SEIS-M009");
  ensure((matrix?.summary?.surfaceCount || 0) >= 10, "SEIS foundation connector matrix must preserve governed surface coverage");
}

function finish(activeProfile, snapshot = null) {
  if (failures.length > 0) {
    console.error(`SEIS ${activeProfile} snapshot check failed:`);
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  const summary = snapshot?.summary || null;
  console.log(JSON.stringify({
    ok: true,
    profile: activeProfile,
    mission: snapshot?.mission || (activeProfile === "foundation" ? "SEIS-M015" : null),
    status: summary?.status || "ready",
    blockerCount: typeof summary?.blockerCount === "number" ? summary.blockerCount : 0
  }, null, 2));
}

function ensure(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function readPath(value, path) {
  return String(path)
    .split(".")
    .reduce((current, key) => (current == null ? undefined : current[key]), value);
}

function readJson(file) {
  if (!existsSync(file)) {
    return null;
  }

  return JSON.parse(readFileSync(file, "utf8"));
}
