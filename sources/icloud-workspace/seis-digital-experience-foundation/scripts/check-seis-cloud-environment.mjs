import { existsSync, readFileSync } from "node:fs";

const configPath = "config/seis-cloud-environment.json";
const failures = [];

ensure(existsSync(configPath), `missing SEIS cloud environment config: ${configPath}`);

const config = readJson(configPath);
const cloudActions = Array.isArray(config?.cloudActions) ? config.cloudActions : [];
const requiredChecksList = Array.isArray(config?.requiredChecks) ? config.requiredChecks : [];
const blockedActionsList = Array.isArray(config?.blockedActions) ? config.blockedActions : [];
const protectedBranchesList = Array.isArray(config?.environment?.protectedBranches) ? config.environment.protectedBranches : [];
const actionIds = new Set(cloudActions.map((action) => action.id));
const actionCommands = new Set(cloudActions.map((action) => action.command));
const blockedActions = new Set(blockedActionsList);
const requiredChecks = new Set(requiredChecksList);
const protectedBranches = new Set(protectedBranchesList);

ensure(config?.version === "1.0.0", "cloud environment config must use version 1.0.0");
ensure(config?.mission === "SEIS-CLOUD-ENV-001", "cloud environment config must belong to SEIS-CLOUD-ENV-001");
ensure(config?.environment?.id === "seis-cloud-uixappttr", "cloud environment id must stay seis-cloud-uixappttr");
ensure(config?.environment?.branch === "UIXAppTTR", "cloud environment branch must stay UIXAppTTR");
ensure(config?.environment?.writePolicy === "branch-only", "cloud environment write policy must stay branch-only");
ensure(config?.environment?.internetAccess === "off-by-default", "cloud environment internet access must stay off-by-default");
ensure(config?.environment?.executionMode === "token-heavy-machine-light", "cloud environment execution mode must stay token-heavy-machine-light");
ensure(protectedBranches.has("main"), "cloud environment must protect main");
ensure(protectedBranches.has("master"), "cloud environment must protect master");
ensure(requiredChecksList.length === requiredChecks.size, `cloud environment requiredChecks must not contain duplicates: ${findDuplicates(requiredChecksList).join(", ")}`);
ensure(blockedActionsList.length === blockedActions.size, `cloud environment blockedActions must not contain duplicates: ${findDuplicates(blockedActionsList).join(", ")}`);
ensure(cloudActions.length === actionIds.size, `cloud actions must not contain duplicate ids: ${findDuplicates(cloudActions.map((action) => action?.id)).join(", ")}`);
ensure(cloudActions.length === actionCommands.size, `cloud actions must not contain duplicate commands: ${findDuplicates(cloudActions.map((action) => action?.command)).join(", ")}`);

for (const command of [
  "npm run quality:seis",
  "npm run quality:fullstack",
  "npm run check:seis-capability-activation-hub",
  "npm run publish:preflight",
  "npm run server-upload:dry-run"
]) {
  ensure(requiredChecks.has(command), `cloud environment must require ${command}`);
}

for (const actionId of [
  "seis-quality",
  "fullstack-quality",
  "publish-preflight",
  "capability-activation-hub",
  "server-upload-dry-run"
]) {
  ensure(actionIds.has(actionId), `cloud actions must include ${actionId}`);
}

for (const command of [
  "npm run quality:seis",
  "npm run quality:fullstack",
  "npm run check:seis-capability-activation-hub",
  "npm run publish:preflight",
  "npm run server-upload:dry-run"
]) {
  ensure(actionCommands.has(command), `cloud actions must include command ${command}`);
}

for (const action of cloudActions) {
  ensure(typeof action?.id === "string" && action.id.length > 0, "cloud actions must define a non-empty id");
  ensure(typeof action?.label === "string" && action.label.length > 0, `cloud action ${action?.id || "unknown"} must define a label`);
  ensure(typeof action?.command === "string" && action.command.length > 0, `cloud action ${action?.id || "unknown"} must define a command`);
  ensure(typeof action?.writes === "boolean", `cloud action ${action?.id || "unknown"} must define writes as a boolean`);
}

for (const command of requiredChecksList) {
  ensure(actionCommands.has(command), `required check must map to a cloud action command: ${command}`);
}

ensure(cloudActions.length >= 10, "cloud environment must preserve broad guarded action coverage");
ensure(cloudActions.every((action) => action.writes === false), "cloud actions must remain read-only-first");
ensure(blockedActions.has("force push"), "cloud environment must block force push");
ensure(blockedActions.has("push to main or master"), "cloud environment must block main/master pushes");
ensure(blockedActions.has("blanket MCP invocation without mission routing"), "cloud environment must block blanket MCP invocation");
ensure(Array.isArray(config?.secrets?.neverCommit) && config.secrets.neverCommit.length >= 4, "cloud environment must preserve neverCommit secrets guidance");

if (failures.length > 0) {
  console.error("SEIS cloud environment check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  mission: config.mission,
  environmentId: config.environment.id,
  branch: config.environment.branch,
  requiredChecks: requiredChecksList.length,
  cloudActions: cloudActions.length,
  blockedActions: blockedActionsList.length
}, null, 2));

function ensure(condition, message) {
  if (!condition) failures.push(message);
}

function findDuplicates(items) {
  const seen = new Set();
  const duplicates = new Set();

  for (const item of items) {
    if (typeof item !== "string" || item.length === 0) {
      continue;
    }

    if (seen.has(item)) {
      duplicates.add(item);
      continue;
    }

    seen.add(item);
  }

  return [...duplicates];
}

function readJson(file) {
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf8"));
}
