import { existsSync, readFileSync } from "node:fs";

const targetsPath = "deploy/server-targets.json";
const matrixPath = "deploy/provider-matrix.json";
const strictFiles = process.argv.includes("--strict-files");
const failures = [];

if (!existsSync(targetsPath)) failures.push(`missing ${targetsPath}`);
if (!existsSync(matrixPath)) failures.push(`missing ${matrixPath}`);

let targets = null;
let matrix = null;

if (existsSync(targetsPath)) {
  targets = JSON.parse(readFileSync(targetsPath, "utf8"));
}

if (existsSync(matrixPath)) {
  matrix = JSON.parse(readFileSync(matrixPath, "utf8"));
}

const candidates = targets?.candidates || [];
const providers = matrix?.providers || [];
const candidateIds = new Set(candidates.map(candidate => candidate.id));
const providerIds = new Set(providers.map(provider => provider.id));

for (const candidate of candidates) {
  if (!providerIds.has(candidate.id)) {
    failures.push(`target candidate missing provider matrix entry: ${candidate.id}`);
  }
  if (!Array.isArray(candidate.requiredInput)) {
    failures.push(`target candidate requiredInput must be an array: ${candidate.id}`);
  }
}

for (const provider of providers) {
  if (!candidateIds.has(provider.id)) {
    failures.push(`provider matrix entry missing target candidate: ${provider.id}`);
  }
  for (const field of ["uploadModel", "requiredFiles", "verifyRoutes", "rollback"]) {
    if (!provider[field]) {
      failures.push(`provider ${provider.id} missing ${field}`);
    }
  }
  for (const requiredFile of provider.requiredFiles || []) {
    if ((strictFiles || !requiredFile.startsWith("dist/")) && !existsSync(requiredFile)) {
      failures.push(`provider ${provider.id} references missing file: ${requiredFile}`);
    }
  }
}

const activeTarget = targets?.activeTarget || null;
if (activeTarget && !candidateIds.has(activeTarget)) {
  failures.push(`active target is not a known candidate: ${activeTarget}`);
}

if (failures.length > 0) {
  console.error("SEIS server target check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  activeTarget,
  liveUploadBlocked: !activeTarget,
  providerCount: providers.length,
  strictFiles
}, null, 2));
