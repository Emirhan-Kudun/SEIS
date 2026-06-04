import { spawnSync } from "node:child_process";

const expectedBranch = "UIXAppTTR";
const expectedRemoteHint = "UIX-Apps";
const fullQualityMode = process.env.SEIS_PUBLISH_READINESS_FULL === "1";

function run(command, args) {
  return spawnSync(command, args, {
    encoding: "utf8",
    env: {
      ...process.env,
      GIT_TERMINAL_PROMPT: "0"
    }
  });
}

function trim(value) {
  return String(value || "").trim();
}

function getGitState() {
  const insideWorkTree = run("git", ["rev-parse", "--is-inside-work-tree"]);

  if (insideWorkTree.status !== 0 || trim(insideWorkTree.stdout) !== "true") {
    return {
      ok: false,
      reason: "workspace is not a Git working tree",
      nextStep: "Connect this folder to the intended GitHub repository before commit/push."
    };
  }

  const branch = run("git", ["branch", "--show-current"]);
  const remote = run("git", ["remote", "-v"]);
  const status = run("git", ["status", "--short", "--branch"]);
  const currentBranch = trim(branch.stdout);
  const remoteText = trim(remote.stdout);

  if (currentBranch !== expectedBranch) {
    return {
      ok: false,
      branch: currentBranch,
      remote: remoteText,
      status: trim(status.stdout),
      reason: `expected branch ${expectedBranch}, got ${currentBranch || "unknown"}`,
      nextStep: `Switch to ${expectedBranch} before publishing.`
    };
  }

  if (!remoteText.includes(expectedRemoteHint)) {
    return {
      ok: false,
      branch: currentBranch,
      remote: remoteText,
      status: trim(status.stdout),
      reason: `origin remote must include ${expectedRemoteHint}`,
      nextStep: "Set the intended GitHub remote before publishing."
    };
  }

  return {
    ok: true,
    branch: currentBranch,
    remote: remoteText,
    status: trim(status.stdout),
    reason: "Git branch and remote are publish-ready."
  };
}

function getGithubAuthState() {
  const auth = run("gh", ["auth", "status", "-h", "github.com"]);

  if (auth.status === 0) {
    return {
      ok: true,
      reason: "GitHub CLI authentication is available."
    };
  }

  return {
    ok: false,
    reason: "GitHub CLI authentication is missing.",
    nextStep: "Run gh auth login -h github.com before pushing to origin."
  };
}

function getQualityState() {
  const checks = fullQualityMode
    ? [
        { id: "automation:develop", command: "npm", args: ["run", "automation:develop"] }
      ]
    : [
        { id: "foundation", command: "node", args: ["scripts/check-foundation.mjs"] },
        { id: "seo-metadata", command: "node", args: ["scripts/check-seo-metadata.mjs"] },
        { id: "locales", command: "node", args: ["scripts/check-locales.mjs"] },
        { id: "javascript-syntax", command: "node", args: ["--check", "scripts/check-github-publish-readiness.mjs"] }
      ];

  const results = checks.map(check => {
    const result = run(check.command, check.args);
    return {
      id: check.id,
      ok: result.status === 0,
      status: result.status,
      stdout: trim(result.stdout),
      stderr: trim(result.stderr)
    };
  });
  const failed = results.filter(result => !result.ok);

  return {
    ok: failed.length === 0,
    mode: fullQualityMode ? "full" : "quick",
    reason: failed.length === 0
      ? `${fullQualityMode ? "Full" : "Quick"} publish readiness checks passed.`
      : `${fullQualityMode ? "Full" : "Quick"} publish readiness checks failed.`,
    checks: results,
    nextStep: failed.length === 0
      ? null
      : `Fix failing checks: ${failed.map(result => result.id).join(", ")}.`
  };
}

function buildReport() {
  const git = getGitState();
  const githubAuth = getGithubAuthState();
  const quality = getQualityState();
  const blockers = [
    !git.ok ? { area: "git", reason: git.reason, nextStep: git.nextStep } : null,
    !githubAuth.ok ? { area: "github-auth", reason: githubAuth.reason, nextStep: githubAuth.nextStep } : null,
    !quality.ok ? { area: "quality", reason: quality.reason, nextStep: quality.nextStep } : null
  ].filter(Boolean);

  return {
    ok: blockers.length === 0,
    mode: "publish-readiness-preflight",
    qualityMode: quality.mode,
    expectedBranch,
    expectedRemoteHint,
    git,
    githubAuth,
    quality,
    blockers,
    nextCommand: blockers.length === 0 ? `git push origin ${expectedBranch}` : null
  };
}

const report = buildReport();

console.log(JSON.stringify(report, null, 2));

if (!report.ok) {
  process.exit(1);
}
