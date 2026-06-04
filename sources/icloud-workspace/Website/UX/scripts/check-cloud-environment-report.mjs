import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

const packageJson = JSON.parse(read("package.json"));
const script = read("scripts/cloud-environment-preflight.mjs");
const cloudDocs = read("docs/cloud-environment.md");
const reportPath = path.join(root, "docs/releases/cloud-environment-report.json");

if (packageJson.scripts?.["cloud:env:preflight"] !== "node scripts/cloud-environment-preflight.mjs") {
  errors.push("package.json must expose cloud:env:preflight.");
}

if (packageJson.scripts?.["check:cloud-environment-report"] !== "node scripts/check-cloud-environment-report.mjs") {
  errors.push("package.json must expose check:cloud-environment-report.");
}

for (const snippet of [
  "cloud-environment-report.json",
  "missingVariables",
  "activationPlan",
  "vercel env add",
  "vercel env pull --environment=production",
  "npm i -g vercel",
  "present"
]) {
  if (!script.includes(snippet)) {
    errors.push(`cloud environment preflight script missing snippet: ${snippet}`);
  }
}

for (const phrase of ["npm run cloud:env:preflight", "cloud-environment-report.json", "npm i -g vercel"]) {
  if (!cloudDocs.includes(phrase)) {
    errors.push(`cloud environment docs missing phrase: ${phrase}`);
  }
}

if (!fs.existsSync(reportPath)) {
  errors.push("cloud environment report must exist after running npm run cloud:env:preflight.");
} else {
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  if (!report.summary || !Array.isArray(report.missingVariables) || !Array.isArray(report.activationPlan) || !report.activationCommands) {
    errors.push("cloud environment report missing summary, missingVariables, activationPlan or activationCommands.");
  }
  if ((report.activationPlan || []).length < 5) {
    errors.push("cloud environment report must include the staged activation plan.");
  }
  const serializedReport = JSON.stringify(report);
  if (/sk-[A-Za-z0-9_-]{12,}|ghp_[A-Za-z0-9_]{12,}|vercel_[A-Za-z0-9_]{12,}/.test(serializedReport)) {
    errors.push("cloud environment report must not contain token-like secret values.");
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Cloud environment report check passed: activation report is present and secret-safe.");
