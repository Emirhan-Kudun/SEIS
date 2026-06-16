import { existsSync, readFileSync } from "node:fs";

const targetsPath = "deploy/access-targets.json";
const matrixPath = "deploy/access-matrix.json";
const docsPath = "docs/deployment/remote-access.md";
// Real values live here on the deploy machine; this file is gitignored.
const localPath = "deploy/access-targets.local.json";

const strict = process.argv.includes("--strict");
const failures = [];

if (!existsSync(targetsPath)) failures.push(`missing ${targetsPath}`);
if (!existsSync(matrixPath)) failures.push(`missing ${matrixPath}`);

const targets = existsSync(targetsPath) ? JSON.parse(readFileSync(targetsPath, "utf8")) : null;
const matrix = existsSync(matrixPath) ? JSON.parse(readFileSync(matrixPath, "utf8")) : null;
const local = existsSync(localPath) ? JSON.parse(readFileSync(localPath, "utf8")) : {};

const docs = existsSync(docsPath) ? readFileSync(docsPath, "utf8") : "";
if (!docs) {
  failures.push(`missing ${docsPath}`);
} else if (!docs.includes("npm run check:access-targets")) {
  failures.push("remote access docs must reference npm run check:access-targets");
}

const tiers = targets?.tiers || [];
const matrixCandidates = matrix?.candidates || [];
const matrixIds = new Set(matrixCandidates.map(candidate => candidate.id));
const tierCandidateIds = new Set();

const tierReports = [];

for (const tier of tiers) {
  if (!tier.id) failures.push("tier missing id");
  const candidates = tier.candidates || [];
  const candidateIds = new Set(candidates.map(candidate => candidate.id));

  for (const candidate of candidates) {
    tierCandidateIds.add(candidate.id);
    if (!matrixIds.has(candidate.id)) {
      failures.push(`access candidate missing matrix entry: ${candidate.id}`);
    }
    if (!Array.isArray(candidate.requiredInput)) {
      failures.push(`access candidate requiredInput must be an array: ${candidate.id}`);
    }
  }

  const activeTarget = tier.activeTarget || null;
  if (activeTarget && !candidateIds.has(activeTarget)) {
    failures.push(`tier ${tier.id} active target is not a known candidate: ${activeTarget}`);
  }

  const activeCandidate = activeTarget
    ? candidates.find(candidate => candidate.id === activeTarget)
    : null;
  const activeValues = {
    ...(tier.targetConfig?.values || {}),
    ...((local[tier.id] && local[tier.id].values) || {})
  };
  const missingActiveInput = activeCandidate
    ? (activeCandidate.requiredInput || []).filter(key => !activeValues[key])
    : [];
  // A recorded selection awaiting local (gitignored) values is a reported state,
  // not a failure — unless --strict is requested (e.g. on the deploy machine).
  if (strict && activeCandidate && missingActiveInput.length > 0) {
    failures.push(`tier ${tier.id} active target missing configured input: ${missingActiveInput.join(", ")}`);
  }

  const requiredQuestions = tier.confirmationFlow?.requiredQuestions || [];
  const blockedBy = activeTarget
    ? []
    : requiredQuestions.map(question => ({
        id: question.id,
        question: question.question,
        blocks: question.blocks || []
      }));

  tierReports.push({
    id: tier.id,
    audience: tier.audience || null,
    selected: activeTarget,
    noSelection: !activeTarget,
    pendingLocalValues: missingActiveInput,
    readyToOpen: Boolean(activeTarget && missingActiveInput.length === 0),
    blockedBy,
    recommendation: tier.recommendation || null,
    candidateRequirements: candidates.map(candidate => ({
      id: candidate.id,
      status: candidate.status,
      requiredInput: candidate.requiredInput || []
    }))
  });
}

for (const candidate of matrixCandidates) {
  if (!tierCandidateIds.has(candidate.id)) {
    failures.push(`matrix entry missing tier candidate: ${candidate.id}`);
  }
  for (const field of ["connectionModel", "verify", "rollback"]) {
    if (!candidate[field]) {
      failures.push(`matrix candidate ${candidate.id} missing ${field}`);
    }
  }
}

if (failures.length > 0) {
  console.error("SEIS access target check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

const anyPending = tierReports.some(tier => tier.selected && tier.pendingLocalValues.length > 0);
console.log(JSON.stringify({
  ok: true,
  strict,
  allTiersSelected: tierReports.every(tier => Boolean(tier.selected)),
  anyReadyToOpen: tierReports.some(tier => tier.readyToOpen),
  tiers: tierReports,
  nextCommand: anyPending
    ? "fill real values in deploy/access-targets.local.json (gitignored) then run: npm run check:access-targets -- --strict"
    : "verify with deploy/access-matrix.json before opening access"
}, null, 2));
