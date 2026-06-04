import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

const plan = read("docs/code-continuation-automation.md");
const packageJson = JSON.parse(read("package.json"));
const capabilityMesh = read("packages/content/src/capability-mesh.ts");
const automationRegistry = JSON.parse(read("packages/runtime/src/automation-registry.json"));
const runtimeSource = read("packages/runtime/src/index.ts");

for (const requiredPhrase of [
  "seis-code-continuation",
  "hourly",
  "Push the active branch to GitHub",
  "npm run share:icloud-github",
  "Keep Lovable as the preferred AI-native product builder",
  "Treat missing credentials as a clean blocker"
]) {
  if (!plan.includes(requiredPhrase)) {
    errors.push(`Code continuation automation plan missing: ${requiredPhrase}`);
  }
}

if (packageJson.scripts?.["check:code-automation-plan"] !== "node scripts/check-code-automation-plan.mjs") {
  errors.push("package.json must expose check:code-automation-plan.");
}

if (!capabilityMesh.includes("codex-code-continuation") || !capabilityMesh.includes("seis-code-continuation")) {
  errors.push("Capability mesh must include the SEIS code continuation automation.");
}

if (automationRegistry.policy?.mode !== "single-active-mission") {
  errors.push("Automation registry must preserve the single-active-mission policy.");
}

for (const id of ["seis-aggressive-code-expansion-loop", "seis-code-continuation"]) {
  const automation = automationRegistry.automations?.find((item) => item.id === id);
  if (!automation) {
    errors.push(`Automation registry missing canonical automation: ${id}`);
    continue;
  }
  for (const field of ["name", "status", "cadence", "scope", "workspace", "branch", "guardrail"]) {
    if (!automation[field]) {
      errors.push(`${id}: missing automation registry field ${field}.`);
    }
  }
  if (!automation.publish?.includes("npm run share:icloud-github")) {
    errors.push(`${id}: automation registry must include iCloud export in publish sequence.`);
  }
}

for (const requiredSnippet of ["getAutomationRegistry", "AutomationRegistry", "automationRegistry"]) {
  if (!runtimeSource.includes(requiredSnippet)) {
    errors.push(`Runtime automation export missing: ${requiredSnippet}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Code continuation automation plan check passed: scoped coding, GitHub push and iCloud export are guarded.");
