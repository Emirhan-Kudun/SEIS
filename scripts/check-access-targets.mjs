import { existsSync, readFileSync } from "node:fs";

const targetsPath = "deploy/access-targets.json";
const matrixPath = "deploy/access-matrix.json";
const docsPath = "docs/deployment/remote-access.md";

const failures = [];

if (!existsSync(targetsPath)) failures.push(`missing ${targetsPath}`);
if (!existsSync(matrixPath)) failures.push(`missing ${matrixPath}`);

const targets = existsSync(targetsPath) ? JSON.parse(readFileSync(targetsPath, "utf8")) : null;
const matrix = existsSync(matrixPath) ? JSON.parse(readFileSync(matrixPath, "utf8")) : null;

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
  const activeValues = tier.targetConfig?.values || {};
  const missingActiveInput = activeCandidate
    ? (activeCandidate.requiredInput || []).filter(key => !activeValues[key])
    : [];
  if (activeCandidate && missingActiveInput.length > 0) {
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
    activeTarget,
    accessBlocked: !activeTarget,
    activeTargetReady: Boolean(activeTarget && missingActiveInput.length === 0),
    missingActiveInput,
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

console.log(JSON.stringify({
  ok: true,
  anyAccessOpen: tierReports.some(tier => !tier.accessBlocked),
  tiers: tierReports,
  nextCommand: tierReports.every(tier => tier.accessBlocked)
    ? "answer confirmation questions in deploy/access-targets.json then set activeTarget"
    : "verify with deploy/access-matrix.json before opening access"
}, null, 2));
