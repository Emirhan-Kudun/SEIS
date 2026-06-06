import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const model = JSON.parse(readFileSync("content/development/seis-evolution-model.json", "utf8"));
const protocol = model.branchUpdateProtocol || {};

const run = (command, args) => spawnSync(command, args, { encoding: "utf8" });
const currentBranch = run("git", ["branch", "--show-current"]).stdout.trim() || "unknown";
const remotes = run("git", ["remote", "-v"]).stdout.trim();
const status = run("git", ["status", "--short"]).stdout.trim();
const canonicalBranch = protocol.canonicalBranch || "UIXAppTTR";

console.log("SEIS branch update status");
console.log(`- canonical branch: ${canonicalBranch}`);
console.log(`- current local branch: ${currentBranch}`);
console.log(`- worktree: ${status ? "dirty" : "clean"}`);
console.log(`- remote configured: ${remotes ? "yes" : "no"}`);

if (remotes) {
  console.log("- remote update gate: ready for explicit auth/upstream review before push");
} else {
  console.log("- remote update gate: blocked-no-remote-configured");
}

if (currentBranch !== canonicalBranch) {
  console.log(`- branch alignment: local work is not currently on ${canonicalBranch}; update must stay explicit and non-destructive`);
} else {
  console.log("- branch alignment: current local branch matches canonical branch");
}

if (Array.isArray(protocol.updateSequence)) {
  console.log("- update sequence:");
  for (const item of protocol.updateSequence) {
    console.log(`  - ${item.step}: ${item.command} (${item.gate})`);
  }
}
