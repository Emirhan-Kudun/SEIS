#!/usr/bin/env node

const { execSync } = require("node:child_process");

function run(command) {
  return execSync(command, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
}

function safeRun(command) {
  try {
    return run(command);
  } catch (error) {
    return `ERROR: ${error.message}`;
  }
}

function parseBranches(raw) {
  if (!raw) return [];
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const current = line.startsWith("*");
      const cleaned = current ? line.slice(1).trim() : line;
      const [name, tracking] = cleaned.split(" ");
      return {
        name,
        current,
        tracking: tracking || ""
      };
    });
}

function parseWorktrees(raw) {
  if (!raw) return [];
  const output = [];
  const lines = raw.split("\n");
  let current = null;

  for (const line of lines) {
    if (line.startsWith("worktree ")) {
      if (current) output.push(current);
      current = {
        path: line.slice("worktree ".length),
        commit: "",
        branch: "(detached)"
      };
      continue;
    }

    if (!current) continue;

    if (line.startsWith("HEAD ")) {
      current.commit = line.slice("HEAD ".length);
      continue;
    }

    if (line.startsWith("branch ")) {
      current.branch = line.slice("branch ".length);
      continue;
    }

    if (line.startsWith("detached")) {
      current.branch = "(detached)";
      continue;
    }

    if (!line.trim()) {
      output.push(current);
      current = null;
    }
  }

  if (current) output.push(current);

  return output;
}

function branchDivergence(branchName) {
  const raw = safeRun(`git rev-list --left-right --count origin/${branchName}...${branchName}`);
  if (raw.startsWith("ERROR:")) {
    return { behind: 0, ahead: 0, error: raw };
  }

  const [behindRaw, aheadRaw] = raw.split(/\s+/);
  const behind = Number(behindRaw || 0);
  const ahead = Number(aheadRaw || 0);
  return { behind, ahead, error: null };
}

function main() {
  const branchRaw = safeRun("git branch --list");
  const worktreeRaw = safeRun("git worktree list --porcelain");
  const status = safeRun("git status --short --branch");

  const branches = parseBranches(branchRaw);
  const worktrees = parseWorktrees(worktreeRaw);

  console.log("SEIS Worktree Integration Audit");
  console.log("--------------------------------");
  console.log(status);
  console.log("");

  console.log("Branches:");
  branches.forEach((branch) => {
    const name = branch.name.replace(/^\*/, "");
    if (name === "main" || name === "master") {
      console.log(`- ${name}${branch.current ? " (current)" : ""} [protected]`);
      return;
    }

    const divergence = branchDivergence(name);
    if (divergence.error) {
      console.log(`- ${name}${branch.current ? " (current)" : ""} | divergence: unavailable`);
      return;
    }

    console.log(
      `- ${name}${branch.current ? " (current)" : ""} | ahead: ${divergence.ahead}, behind: ${divergence.behind}`
    );
  });

  console.log("");
  console.log("Worktrees:");
  if (!worktrees.length) {
    console.log("- none detected");
  } else {
    worktrees.forEach((item) => {
      console.log(`- ${item.path} | ${item.branch} | ${item.commit.slice(0, 12)}`);
    });
  }

  console.log("");
  console.log("Recommendations:");
  console.log("- Keep main/master untouched for direct development.");
  console.log("- Rebase or merge integration branches when behind count grows.");
  console.log("- Close stale worktrees after integration to reduce drift risk.");
}

main();
