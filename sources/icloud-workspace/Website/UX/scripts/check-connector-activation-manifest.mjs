import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const manifestPath = path.join(root, "packages/runtime/src/connector-activation-manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const vercelConfig = fs.readFileSync(path.join(root, "vercel.ts"), "utf8");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

if (manifest.policy?.secretRule !== "No provider secrets, tokens or server credentials are stored in git") {
  errors.push("Connector activation manifest must preserve the no-secrets policy.");
}

const requiredLanes = [
  "source-control",
  "icloud-rollback",
  "cloud-hosting",
  "data-intake",
  "design-systems",
  "code-intelligence",
  "seo-observability",
  "automation"
];

for (const laneId of requiredLanes) {
  const lane = manifest.lanes?.find((item) => item.id === laneId);
  if (!lane) {
    errors.push(`Connector activation manifest missing lane: ${laneId}`);
    continue;
  }
  for (const field of ["label", "tools", "status", "activationCommand", "guardrail"]) {
    if (!lane[field] || (Array.isArray(lane[field]) && lane[field].length === 0)) {
      errors.push(`${laneId} missing required field: ${field}`);
    }
  }
}

for (const snippet of [
  "@vercel/config/v1",
  "routes.cacheControl",
  "npm run build --workspace apps/site-next",
  "/api/cleanup"
]) {
  if (!vercelConfig.includes(snippet)) {
    errors.push(`vercel.ts missing snippet: ${snippet}`);
  }
}

if (!packageJson.devDependencies?.["@vercel/config"]) {
  errors.push("package.json must include @vercel/config for vercel.ts support.");
}

const serialized = JSON.stringify(manifest);
for (const forbidden of ["sk-", "ghp_", "vercel_"]) {
  if (serialized.includes(forbidden)) {
    errors.push(`Connector activation manifest contains token-like value: ${forbidden}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Connector activation manifest check passed: ${requiredLanes.length} lanes guarded.`);
