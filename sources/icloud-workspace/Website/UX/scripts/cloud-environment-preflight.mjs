import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const reportPath = path.join(root, "docs/releases/cloud-environment-report.json");

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

function envPresence(keys) {
  return keys.map((key) => ({
    key,
    present: Boolean(process.env[key]?.trim())
  }));
}

const cloudEnvironment = readJson("packages/runtime/src/cloud-environment.json");
const activationPlan = readJson("packages/runtime/src/cloud-activation-plan.json");
const deploymentTargets = readJson("packages/runtime/src/deployment-targets.json");
const branch = run("git", ["branch", "--show-current"]).stdout || "unknown";
const head = run("git", ["rev-parse", "--short", "HEAD"]).stdout || "unknown";
const gitStatus = run("git", ["status", "--porcelain=v1"]).stdout;
const uniqueRequiredEnv = [...new Set(cloudEnvironment.flatMap((item) => item.requiredEnv))].sort();
const environmentItems = cloudEnvironment.map((item) => {
  const requiredEnv = envPresence(item.requiredEnv);
  const optionalEnv = envPresence(item.optionalEnv);
  const missingEnv = requiredEnv.filter((env) => !env.present).map((env) => env.key);

  return {
    id: item.id,
    name: item.name,
    provider: item.provider,
    environment: item.environment,
    status: missingEnv.length ? "needs_credentials" : "ready",
    missingEnv,
    requiredEnv,
    optionalEnv,
    setupCommand: item.setupCommand,
    safety: item.safety
  };
});
const missingVariables = [...new Set(environmentItems.flatMap((item) => item.missingEnv))].sort();
const vercelKeys = uniqueRequiredEnv.filter((key) => key.startsWith("VERCEL_") || ["CONTACT_ENDPOINT", "CRON_SECRET", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_BRIEFS_TABLE", "SENTRY_DSN"].includes(key));
const customServerKeys = uniqueRequiredEnv.filter((key) => key.startsWith("DEPLOY_"));
const report = {
  generatedAt: new Date().toISOString(),
  branch,
  head,
  cleanWorktree: gitStatus.length === 0,
  status: missingVariables.length ? "watch" : "ready",
  summary: {
    environmentItems: environmentItems.length,
    readyItems: environmentItems.filter((item) => item.status === "ready").length,
    needsCredentialsItems: environmentItems.filter((item) => item.status === "needs_credentials").length,
    requiredVariables: uniqueRequiredEnv.length,
    missingVariables: missingVariables.length,
    activationPlan: activationPlan.length,
    deploymentTargets: deploymentTargets.length
  },
  localTools: {
    vercelCli: hasCommand("vercel"),
    ghCli: hasCommand("gh"),
    rsync: hasCommand("rsync")
  },
  missingVariables,
  environmentItems,
  activationPlan,
  activationCommands: {
    installVercelCli: "npm i -g vercel",
    vercelPullPreview: "vercel env pull --environment=preview",
    vercelPullProduction: "vercel env pull --environment=production",
    vercelAddProduction: vercelKeys.map((key) => `vercel env add ${key} production`),
    customServerShell: customServerKeys.map((key) => `export ${key}=<set-outside-git>`),
    customServerDryRun: "npm run deploy:static:dry-run",
    githubPublishGate: "npm run github:preflight && npm run github:publish"
  },
  docs: [
    "https://vercel.com/docs/cli/env",
    "https://vercel.com/docs/deployments/environments"
  ],
  nextActions: [
    "Install Vercel CLI only when live cloud operations are needed.",
    "Add real Vercel, Supabase and server credentials only to provider secret stores or the local shell.",
    "Run npm run deploy:preflight before any Vercel or custom server deploy.",
    "Run npm run server:preflight before custom server rsync."
  ]
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ reportPath: path.relative(root, reportPath), status: report.status, summary: report.summary }, null, 2));
