import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

const packageJson = JSON.parse(read("package.json"));
const script = read("scripts/deploy-preflight.mjs");
const runbook = read("docs/deployment-server-runbook.md");
const cloudDocs = read("docs/cloud-environment.md");

if (packageJson.scripts?.["deploy:preflight"] !== "node scripts/deploy-preflight.mjs") {
  errors.push("package.json must expose deploy:preflight.");
}
if (packageJson.scripts?.["check:deploy-preflight"] !== "node scripts/check-deploy-preflight.mjs") {
  errors.push("package.json must expose check:deploy-preflight.");
}

for (const snippet of ["deploy-preflight-report.json", "credentialGaps", "strict", "deploy:static:dry-run", "Store real Vercel, Supabase and server credentials outside git"]) {
  if (!script.includes(snippet)) {
    errors.push(`deploy-preflight script missing snippet: ${snippet}`);
  }
}

for (const phrase of ["npm run deploy:preflight", "npm run deploy:static:dry-run", "npm run deploy:static:live"]) {
  if (!runbook.includes(phrase)) {
    errors.push(`deployment runbook missing phrase: ${phrase}`);
  }
}

if (!cloudDocs.includes("deploy-preflight-report.json")) {
  errors.push("cloud environment docs must mention deploy-preflight-report.json.");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Deploy preflight check passed: scripts, runbook and cloud docs are aligned.");
