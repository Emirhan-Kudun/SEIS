// Validates the SEIS V14 constitution subsystem: the canonical doc, its
// machine-readable source, the audit, the adoption ADR, and the discoverability
// wiring (README + AGENTS links, PR template) stay present and coherent.
//
// Run: node scripts/check-seis-master-prompt-v14.mjs
//      (npm run check:constitution)
import { existsSync, readFileSync } from "node:fs";

const modelPath = "content/governance/seis-master-prompt-v14.json";
const docPath = "docs/governance/seis-master-prompt-v14.md";
const auditPath = "docs/governance/seis-master-prompt-v14-audit.md";
const adrPath = "docs/decisions/seis-master-prompt-v14-adoption.md";
const prTemplatePath = ".github/pull_request_template.md";
const readmePath = "README.md";
const agentsPath = "AGENTS.md";
const packagePath = "package.json";

const failures = [];
const readText = (path) => (existsSync(path) ? readFileSync(path, "utf8") : "");
const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const ensure = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const path of [
  modelPath,
  docPath,
  auditPath,
  adrPath,
  prTemplatePath,
  readmePath,
  agentsPath,
  packagePath,
]) {
  ensure(existsSync(path), `missing ${path}`);
}

const model = existsSync(modelPath) ? readJson(modelPath) : null;
const doc = readText(docPath);
const readme = readText(readmePath);
const agents = readText(agentsPath);
const prTemplate = readText(prTemplatePath);
const manifest = existsSync(packagePath) ? readJson(packagePath) : null;

if (model) {
  ensure(model.id === "seis-master-prompt-v14", "model id must stay stable");
  ensure(model.version === 14, "model version must be 14");
  ensure(model.role === "meta-constitution", "model role must be meta-constitution");
  ensure(model.doc === docPath, "model.doc must point at the canonical constitution doc");
  ensure(model.audit === auditPath, "model.audit must point at the audit doc");
  ensure(
    model.decisionRecord === adrPath,
    "model.decisionRecord must point at the adoption ADR",
  );

  const sections = Array.isArray(model.sections) ? model.sections : [];
  ensure(sections.length === 47, "constitution must define 47 sections (0..46)");
  ensure(
    model.sectionCount === sections.length,
    "model.sectionCount must match the sections array length",
  );
  for (let n = 0; n <= 46; n += 1) {
    ensure(
      sections.some((section) => section.n === n),
      `constitution missing section number ${n}`,
    );
  }

  ensure(
    Array.isArray(model.operatingModes) && model.operatingModes.length === 9,
    "model must list the 9 operating modes",
  );
  ensure(
    Array.isArray(model.productLayers) && model.productLayers.length === 9,
    "model must list the 9 product layers",
  );
  ensure(
    Array.isArray(model.maturityStages) && model.maturityStages.length === 6,
    "model must list maturity stages 0..5",
  );

  // Divergences must stay honest: each open item names which side is
  // authoritative so no silent strategy flip can hide here.
  const divergences = Array.isArray(model.divergences) ? model.divergences : [];
  ensure(divergences.length >= 3, "model must record the known divergences");
  for (const divergence of divergences) {
    ensure(divergence.id, "each divergence must define an id");
    ensure(divergence.status, `divergence ${divergence.id || "?"} must define a status`);
    ensure(
      divergence.authoritative,
      `divergence ${divergence.id || "?"} must name the authoritative side`,
    );
  }
  ensure(
    typeof model.resolutionGate === "string" && model.resolutionGate.length > 0,
    "model must document the divergence resolution gate",
  );
}

// The constitution doc must carry its self-describing markers.
ensure(doc.includes("SEIS Supreme Unified Master Prompt"), "doc missing title");
ensure(doc.includes("## 0. Single Master Prompt Rule"), "doc missing section 0");
ensure(doc.includes("## 46. Final Operating Command"), "doc missing section 46");

// Discoverability wiring (V14 §0/§14/§17).
ensure(
  readme.includes("docs/governance/seis-master-prompt-v14.md"),
  "README must link the constitution",
);
ensure(
  agents.includes("docs/governance/seis-master-prompt-v14.md"),
  "AGENTS.md must link the constitution",
);

// PR template must mirror V14 §36 structure.
for (const heading of ["## Summary", "## Validation", "## Risks", "## Rollback"]) {
  ensure(prTemplate.includes(heading), `pull request template missing ${heading}`);
}

// The check must be self-registered so it never silently drops out of CI.
if (manifest) {
  const scripts = manifest.scripts || {};
  ensure(
    Object.values(scripts).some((command) =>
      command.includes("check-seis-master-prompt-v14.mjs"),
    ),
    "package.json must register the constitution check",
  );
}

if (failures.length > 0) {
  console.error("SEIS V14 constitution check failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`SEIS V14 constitution check passed (${model?.sections?.length ?? 0} sections).`);
