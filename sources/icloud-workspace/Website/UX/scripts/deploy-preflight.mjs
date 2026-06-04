import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const strict = process.argv.includes("--strict");
const reportPath = path.join(root, "docs/releases/deploy-preflight-report.json");

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function run(command, args = []) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0" }
  });
  return {
    ok: result.status === 0,
    stdout: result.stdout?.trim() || "",
    stderr: result.stderr?.trim() || ""
  };
}

function hasCommand(command) {
  return run("bash", ["-lc", `command -v ${command}`]).ok;
}

function envStatus(keys) {
  return keys.map((key) => ({ key, present: Boolean(process.env[key]?.trim()) }));
}

const packageJson = readJson("package.json");
const deploymentTargets = readJson("packages/runtime/src/deployment-targets.json");
const cloudEnvironment = readJson("packages/runtime/src/cloud-environment.json");
const staticManifest = readJson("apps/static-fallback/runtime-manifest.json");
const gitBranch = run("git", ["branch", "--show-current"]).stdout || "unknown";
const gitHead = run("git", ["rev-parse", "--short", "HEAD"]).stdout || "unknown";
const gitStatus = run("git", ["status", "--porcelain=v1"]).stdout;

const vercelKeys = ["VERCEL_TOKEN", "VERCEL_ORG_ID", "VERCEL_PROJECT_ID"];
const customServerKeys = ["DEPLOY_HOST", "DEPLOY_USER", "DEPLOY_PATH"];
const supabaseKeys = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_BRIEFS_TABLE"];

const checks = [
  { id: "clean-worktree", ok: gitStatus.length === 0, severity: "warn", detail: gitStatus.length ? "worktree has local changes" : "worktree clean" },
  { id: "static-fallback-index", ok: exists("apps/static-fallback/index.html"), severity: "error", detail: "static fallback index exists" },
  { id: "static-fallback-manifest", ok: staticManifest.deploymentTargets?.includes("static-fallback-archive"), severity: "error", detail: "static fallback manifest references archive target" },
  { id: "vercel-config", ok: exists("vercel.json"), severity: "warn", detail: "vercel.json exists" },
  { id: "cloud-env-template", ok: exists(".env.cloud.example"), severity: "error", detail: ".env.cloud.example exists" },
  { id: "deploy-script", ok: packageJson.scripts?.["deploy:static:dry-run"] === "bash scripts/deploy-static.sh", severity: "error", detail: "static deploy dry-run script registered" },
  { id: "preflight-script", ok: packageJson.scripts?.["deploy:preflight"] === "node scripts/deploy-preflight.mjs", severity: "error", detail: "deploy preflight script registered" },
  { id: "rsync-command", ok: hasCommand("rsync"), severity: "warn", detail: "rsync available for custom server fallback" },
  { id: "vercel-command", ok: hasCommand("vercel"), severity: "warn", detail: "Vercel CLI available for cloud deploy" },
  { id: "github-origin-target", ok: deploymentTargets.some((target) => target.id === "github-origin"), severity: "error", detail: "GitHub origin target modeled" },
  { id: "vercel-target", ok: deploymentTargets.some((target) => target.id === "vercel-preview"), severity: "error", detail: "Vercel target modeled" },
  { id: "custom-server-target", ok: deploymentTargets.some((target) => target.id === "custom-server"), severity: "error", detail: "custom server target modeled" },
  { id: "cloud-registry", ok: cloudEnvironment.length >= 6, severity: "error", detail: "cloud environment registry has expected surfaces" }
];

const environment = {
  vercel: envStatus(vercelKeys),
  customServer: envStatus(customServerKeys),
  supabase: envStatus(supabaseKeys)
};

const missingRequired = checks.filter((check) => !check.ok && check.severity === "error");
const watchItems = checks.filter((check) => !check.ok && check.severity === "warn");
const credentialGaps = [
  ...environment.vercel.filter((item) => !item.present),
  ...environment.customServer.filter((item) => !item.present),
  ...environment.supabase.filter((item) => !item.present)
];

const report = {
  generatedAt: new Date().toISOString(),
  branch: gitBranch,
  head: gitHead,
  strict,
  summary: {
    checks: checks.length,
    passing: checks.filter((check) => check.ok).length,
    missingRequired: missingRequired.length,
    watchItems: watchItems.length,
    credentialGaps: credentialGaps.length
  },
  status: missingRequired.length ? "blocked" : credentialGaps.length || watchItems.length ? "watch" : "ready",
  checks,
  environment,
  credentialGaps,
  deploymentTargets: deploymentTargets.map((target) => ({ id: target.id, name: target.name, requiresEnv: target.requiresEnv, command: target.command })),
  nextActions: [
    "Run npm run lint && npm run checks before remote deploy.",
    "Run npm run typecheck && npm run build && npm run report:budgets before remote deploy.",
    "Use npm run deploy:static:dry-run before npm run deploy:static:live.",
    "Store real Vercel, Supabase and server credentials outside git."
  ]
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ reportPath: path.relative(root, reportPath), status: report.status, summary: report.summary }, null, 2));

if (missingRequired.length || (strict && (credentialGaps.length || watchItems.length))) {
  process.exit(1);
}
