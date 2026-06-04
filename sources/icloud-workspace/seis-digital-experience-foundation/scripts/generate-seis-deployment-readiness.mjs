import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = "data/seis/deployment-readiness.json";
const EXPECTED_BRANCH = "UIXAppTTR";
const EXPECTED_REMOTE = "https://github.com/emirhankudun-ux/UIX-Apps.git";

const COMMANDS = [
  "git branch --show-current",
  "git status --short --branch",
  "git rev-parse HEAD",
  "git rev-parse origin/UIXAppTTR",
  "git ls-remote origin refs/heads/UIXAppTTR",
  "gh auth status -h github.com"
];

function run(command, args) {
  try {
    const stdout = execFileSync(command, args, {
      cwd: ROOT,
      encoding: "utf8",
      env: {
        ...process.env,
        GIT_TERMINAL_PROMPT: "0"
      },
      stdio: ["ignore", "pipe", "pipe"]
    });

    return { ok: true, stdout: stdout.trim(), stderr: "" };
  } catch (error) {
    return {
      ok: false,
      stdout: String(error.stdout || "").trim(),
      stderr: String(error.stderr || error.message || "").trim()
    };
  }
}

function readJson(relPath, fallback = null) {
  const absolutePath = join(ROOT, relPath);
  if (!existsSync(absolutePath)) return fallback;
  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

function readText(relPath) {
  const absolutePath = join(ROOT, relPath);
  if (!existsSync(absolutePath)) return "";
  return readFileSync(absolutePath, "utf8");
}

function normalizeRemoteUrl(url) {
  return String(url || "")
    .trim()
    .replace(/^git@github\.com:/, "https://github.com/")
    .replace(/\.git$/, ".git");
}

function parseAheadBehind(statusText) {
  const firstLine = String(statusText || "").split("\n")[0] || "";
  const aheadMatch = firstLine.match(/ahead (\d+)/);
  const behindMatch = firstLine.match(/behind (\d+)/);
  return {
    ahead: aheadMatch ? Number(aheadMatch[1]) : 0,
    behind: behindMatch ? Number(behindMatch[1]) : 0
  };
}

function getGithubState() {
  const branch = run("git", ["branch", "--show-current"]).stdout;
  const status = run("git", ["status", "--short", "--branch"]);
  const localHead = run("git", ["rev-parse", "HEAD"]);
  const trackingHead = run("git", ["rev-parse", `origin/${EXPECTED_BRANCH}`]);
  const remoteUrl = run("git", ["config", "--get", "remote.origin.url"]);
  const githubHead = run("git", ["ls-remote", "origin", `refs/heads/${EXPECTED_BRANCH}`]);
  const auth = run("gh", ["auth", "status", "-h", "github.com"]);

  const normalizedRemote = normalizeRemoteUrl(remoteUrl.stdout);
  const cleanWorkingTree = status.ok && !String(status.stdout).split("\n").slice(1).some(Boolean);
  const { ahead, behind } = parseAheadBehind(status.stdout);
  const githubHeadSha = githubHead.ok ? String(githubHead.stdout).split(/\s+/)[0] || "" : "";
  const authOutput = `${auth.stdout}\n${auth.stderr}`;
  const authReady = auth.ok && /Logged in to github\.com/i.test(authOutput);
  const workflowScopeReady = authReady && /workflow/.test(authOutput);
  const branchReady = branch === EXPECTED_BRANCH;
  const remoteReady = normalizedRemote === EXPECTED_REMOTE;
  const syncReady = localHead.ok && githubHeadSha && localHead.stdout === githubHeadSha;
  const pushReady = branchReady && remoteReady && cleanWorkingTree && behind === 0 && authReady && workflowScopeReady;

  const blockers = [
    !branchReady ? `expected branch ${EXPECTED_BRANCH}, found ${branch || "unknown"}` : null,
    !remoteReady ? `expected remote ${EXPECTED_REMOTE}, found ${normalizedRemote || "unknown"}` : null,
    !cleanWorkingTree ? "working tree has uncommitted changes" : null,
    behind > 0 ? `local branch is behind origin/${EXPECTED_BRANCH} by ${behind}` : null,
    !authReady ? "GitHub CLI auth is not ready" : null,
    authReady && !workflowScopeReady ? "GitHub CLI token is missing workflow scope" : null
  ].filter(Boolean);

  return {
    expectedBranch: EXPECTED_BRANCH,
    branch,
    expectedRemote: EXPECTED_REMOTE,
    remote: normalizedRemote,
    localHead: localHead.ok ? localHead.stdout : null,
    trackingHead: trackingHead.ok ? trackingHead.stdout : null,
    githubHead: githubHeadSha || null,
    cleanWorkingTree,
    ahead,
    behind,
    authReady,
    workflowScopeReady,
    pushReady,
    syncReady: Boolean(syncReady),
    blockers
  };
}

function getServerUploadState() {
  const config = readJson("config/server-target-profile.json", {});
  const targetId = process.env.UIX_UPLOAD_TARGET || config.defaultTarget;
  const target = (config.targets || []).find((item) => item.id === targetId) || null;
  const manifest = readJson("runtime/server-upload-bundle/manifest.json", null);
  const requiredEnvironment = target?.requiredEnvironment || {};
  const requiredNames = Object.values(requiredEnvironment);
  const requiredEnvironmentState = requiredNames.map((name) => ({
    name,
    present: Boolean(process.env[name])
  }));
  const missingEnvironment = requiredEnvironmentState.filter((item) => !item.present).map((item) => item.name);
  const remotePathName = requiredEnvironment.path;
  const remotePath = remotePathName ? process.env[remotePathName] : "";
  const safeRemotePathReady = !remotePath || !target?.safeRemotePathPattern
    ? false
    : new RegExp(target.safeRemotePathPattern).test(remotePath);
  const bundleDirectory = target?.bundleDirectory || null;
  const bundleReady = Boolean(
    target &&
    manifest &&
    bundleDirectory &&
    existsSync(join(ROOT, bundleDirectory)) &&
    Number(manifest.fileCount || 0) > 0
  );
  const dryRunReady = Boolean(target && bundleReady);
  const executeReady = Boolean(dryRunReady && missingEnvironment.length === 0 && safeRemotePathReady);
  const blockers = [
    !target ? "server upload target is not configured" : null,
    !bundleReady ? "server upload bundle is not ready" : null,
    ...missingEnvironment.map((name) => `missing environment variable: ${name}`),
    missingEnvironment.length === 0 && !safeRemotePathReady ? "remote path does not match safe upload pattern" : null
  ].filter(Boolean);

  return {
    targetId,
    method: target?.method || null,
    bundleDirectory,
    bundleFileCount: manifest?.fileCount || 0,
    requiredEnvironment: requiredEnvironmentState,
    bundleReady,
    dryRunReady,
    executeReady,
    blockers
  };
}

function getCloudEnvironmentState() {
  const config = readJson("config/seis-cloud-environment.json", {});
  const toml = readText(".codex/environments/seis-cloud.toml");
  const requiredChecks = config.requiredChecks || [];
  const cloudActions = config.cloudActions || [];
  const ready = Boolean(
    config.environment?.id === "seis-cloud-uixappttr" &&
    config.environment?.branch === EXPECTED_BRANCH &&
    requiredChecks.includes("npm run check:seis-deployment-readiness") &&
    cloudActions.some((action) => action.command === "npm run check:seis-deployment-readiness") &&
    toml.includes("npm run check:seis-deployment-readiness")
  );

  return {
    id: config.environment?.id || null,
    branch: config.environment?.branch || null,
    setupScript: config.environment?.setupScript || null,
    internetAccess: config.environment?.internetAccess || null,
    actions: cloudActions.map((action) => ({
      id: action.id,
      command: action.command,
      writes: Boolean(action.writes)
    })),
    requiredChecks,
    ready,
    blockers: ready ? [] : ["cloud environment does not include deployment readiness check/action"]
  };
}

function getMcpRuntimeState() {
  const readiness = readJson("data/seis/mcp-runtime-readiness.json", {});
  const summary = readiness.summary || {};
  return {
    mission: readiness.mission || null,
    totalItems: summary.totalItems || 0,
    mappedItems: summary.mappedItems || 0,
    blockedAuthItems: summary.byReadiness?.["blocked-auth"] || 0,
    permissionGatedItems: summary.byReadiness?.["permission-gated"] || 0,
    snapshotReady: readiness.source?.secretsStored === false && Number(summary.totalItems || 0) >= 50
  };
}

function main() {
  const github = getGithubState();
  const serverUpload = getServerUploadState();
  const cloudEnvironment = getCloudEnvironmentState();
  const mcpRuntime = getMcpRuntimeState();
  const summaryBlockers = [
    ...github.blockers.map((message) => `github: ${message}`),
    ...serverUpload.blockers.map((message) => `server: ${message}`),
    ...cloudEnvironment.blockers.map((message) => `cloud: ${message}`),
    !mcpRuntime.snapshotReady ? "mcp: runtime snapshot is not ready" : null
  ].filter(Boolean);

  const snapshot = {
    schemaVersion: "1.0.0",
    generatedBy: "scripts/generate-seis-deployment-readiness.mjs",
    generatedAt: new Date().toISOString(),
    mission: "SEIS-M007",
    source: {
      secretsStored: false,
      capturedFields: [
        "branch",
        "remote",
        "commit-sha",
        "auth-readiness",
        "server-env-presence",
        "cloud-actions",
        "mcp-summary"
      ],
      commands: COMMANDS
    },
    policy: {
      branchOnly: true,
      targetBranch: EXPECTED_BRANCH,
      mainPushAllowed: false,
      serverUploadRequiresExplicitEnvironment: true,
      blanketMcpInvocationAllowed: false
    },
    github,
    serverUpload,
    cloudEnvironment,
    mcpRuntime,
    summary: {
      pushReady: github.pushReady,
      githubServerSynced: github.syncReady,
      serverUploadReady: serverUpload.executeReady,
      cloudReady: cloudEnvironment.ready,
      mcpSnapshotReady: mcpRuntime.snapshotReady,
      blockers: summaryBlockers
    }
  };

  writeFileSync(join(ROOT, OUTPUT_PATH), `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(JSON.stringify({
    ok: true,
    mission: snapshot.mission,
    outputPath: OUTPUT_PATH,
    pushReady: snapshot.summary.pushReady,
    githubServerSynced: snapshot.summary.githubServerSynced,
    serverUploadReady: snapshot.summary.serverUploadReady,
    cloudReady: snapshot.summary.cloudReady,
    blockers: snapshot.summary.blockers.length
  }, null, 2));
}

main();
