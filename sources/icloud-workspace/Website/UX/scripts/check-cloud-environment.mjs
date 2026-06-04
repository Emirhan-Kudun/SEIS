import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const contentSource = fs.readFileSync(path.join(root, "packages/content/src/cloud-environment.ts"), "utf8");
const envExample = fs.readFileSync(path.join(root, ".env.example"), "utf8");
const cloudEnvExample = fs.readFileSync(path.join(root, ".env.cloud.example"), "utf8");
const cloudEnvironment = JSON.parse(fs.readFileSync(path.join(root, "packages/runtime/src/cloud-environment.json"), "utf8"));
const activationPlan = JSON.parse(fs.readFileSync(path.join(root, "packages/runtime/src/cloud-activation-plan.json"), "utf8"));
const deploymentTargets = JSON.parse(fs.readFileSync(path.join(root, "packages/runtime/src/deployment-targets.json"), "utf8"));

const requiredVariables = [
  "SEIS_RUNTIME_DIR",
  "CRON_SECRET",
  "GITHUB_TOKEN",
  "VERCEL_TOKEN",
  "VERCEL_ORG_ID",
  "VERCEL_PROJECT_ID",
  "DEPLOY_HOST",
  "DEPLOY_USER",
  "DEPLOY_PATH",
  "CONTACT_ENDPOINT",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SENTRY_DSN"
];

const serializedCloudEnvironment = JSON.stringify(cloudEnvironment);

for (const key of requiredVariables) {
  if (!serializedCloudEnvironment.includes(key)) {
    errors.push(`Cloud environment registry missing variable: ${key}`);
  }
  if (!envExample.includes(`${key}=`)) {
    errors.push(`.env.example missing variable: ${key}`);
  }
  if (!cloudEnvExample.includes(`${key}=`)) {
    errors.push(`.env.cloud.example missing variable: ${key}`);
  }
}

for (const snippet of ["cloudEnvironmentPrinciples", "No secrets in git", "Targeted deploy", "Fallback first", "Evidence-led cloud"]) {
  if (!contentSource.includes(snippet)) {
    errors.push(`Cloud environment principles missing snippet: ${snippet}`);
  }
}

for (const item of cloudEnvironment) {
  if (!item.id || !item.name || !item.provider || !item.environment || !item.purpose || !item.safety || !item.setupCommand) {
    errors.push("Cloud environment item missing required metadata.");
  }
  if (!Array.isArray(item.requiredEnv) || !Array.isArray(item.optionalEnv)) {
    errors.push(`${item.id}: cloud environment requiredEnv and optionalEnv must be arrays.`);
  }
}

if (!Array.isArray(activationPlan) || activationPlan.length < 5) {
  errors.push("Cloud activation plan must contain at least 5 staged items.");
}

for (const item of activationPlan || []) {
  if (!item.id || !item.name || !item.provider || !item.stage || !item.proof || !item.safety) {
    errors.push("Cloud activation plan item missing required metadata.");
  }
  if (!Array.isArray(item.requiresEnv) || !Array.isArray(item.commands)) {
    errors.push(`${item.id}: activation plan requiresEnv and commands must be arrays.`);
  }
  const serializedItem = JSON.stringify(item);
  if (serializedItem.includes("sk-") || serializedItem.includes("ghp_") || serializedItem.includes("vercel_")) {
    errors.push(`${item.id}: activation plan must not contain token-like sample secrets.`);
  }
}

for (const requiredStage of ["prepare", "cloud-env", "data-env", "server-dry-run", "rollback"]) {
  if (!activationPlan.some((item) => item.stage === requiredStage)) {
    errors.push(`Cloud activation plan missing stage: ${requiredStage}`);
  }
}

if (!activationPlan.some((item) => item.commands.includes("npm i -g vercel"))) {
  errors.push("Cloud activation plan must surface Vercel CLI installation.");
}

for (const targetId of ["github-origin", "vercel-preview", "custom-server", "static-fallback-archive"]) {
  if (!deploymentTargets.some((target) => target.id === targetId)) {
    errors.push(`Deployment target registry missing ${targetId}`);
  }
}

if (cloudEnvExample.includes("sk-") || cloudEnvExample.includes("ghp_") || cloudEnvExample.includes("vercel_")) {
  errors.push(".env.cloud.example must not contain token-like sample secrets.");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Cloud environment check passed: ${requiredVariables.length} variables guarded, ${activationPlan.length} activation stages.`);
