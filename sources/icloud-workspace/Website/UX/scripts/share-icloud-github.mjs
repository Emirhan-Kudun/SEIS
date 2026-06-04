import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const exportDir = "/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/Website/UX-exports";
const now = new Date();
const isoStamp = now.toISOString();
const dateStamp = isoStamp.slice(0, 10);
const fileStamp = isoStamp.replace(/[:]/g, "-");

function run(command, args) {
  try {
    return {
      ok: true,
      stdout: execFileSync(command, args, {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        env: {
          ...process.env,
          GIT_TERMINAL_PROMPT: "0"
        }
      }).trim()
    };
  } catch (error) {
    return {
      ok: false,
      stdout: error.stdout?.toString().trim() || "",
      stderr: error.stderr?.toString().trim() || error.message,
      status: error.status ?? 1
    };
  }
}

const branch = run("git", ["branch", "--show-current"]).stdout || "codex/seis-ux-cinematic-premium-foundation";
const head = run("git", ["rev-parse", "--short", "HEAD"]).stdout || "unknown";
const clean = !run("git", ["status", "--porcelain"]).stdout;
const origin = run("git", ["remote", "get-url", "origin"]);
const safeBranch = branch.replaceAll("/", "-");
const bundlePath = path.join(exportDir, `${safeBranch}-${fileStamp}-${head}.bundle`);
const shareNotePath = path.join(exportDir, `share-status-${fileStamp}-${head}.md`);

fs.mkdirSync(exportDir, { recursive: true });

const bundle = run("git", ["bundle", "create", bundlePath, branch]);
const ghAuth = run("gh", ["auth", "status", "-h", "github.com"]);
const push = ghAuth.ok
  ? run("git", ["push", "-u", "origin", branch])
  : {
      ok: false,
      stdout: "",
      stderr: "GitHub CLI auth missing. Push skipped.",
      status: 1
    };

const lines = [
  `# Share Status - ${dateStamp}`,
  "",
  `- generated_at: ${isoStamp}`,
  `- branch: \`${branch}\``,
  `- head: \`${head}\``,
  `- clean_worktree: ${clean ? "yes" : "no"}`,
  `- origin: ${origin.ok ? `\`${origin.stdout}\`` : "missing"}`,
  `- bundle: \`${bundlePath}\``,
  `- bundle_status: ${bundle.ok ? "ok" : "failed"}`,
  `- gh_auth: ${ghAuth.ok ? "configured" : "missing"}`,
  `- push_status: ${push.ok ? "ok" : "failed"}`
];

if (!ghAuth.ok && ghAuth.stderr) {
  lines.push(`- gh_auth_error: ${ghAuth.stderr.replace(/\n+/g, " ")}`);
}
if (!push.ok) {
  const pushError = (push.stderr || push.stdout || "unknown push error").replace(/\n+/g, " ");
  lines.push(`- push_error: ${pushError}`);
}

fs.writeFileSync(shareNotePath, `${lines.join("\n")}\n`);

console.log(JSON.stringify({
  generatedAt: isoStamp,
  branch,
  head,
  clean,
  origin: origin.ok ? origin.stdout : null,
  bundlePath,
  shareNotePath,
  bundleOk: bundle.ok,
  githubAuth: ghAuth.ok ? "configured" : "missing",
  pushOk: push.ok,
  pushError: push.ok ? null : (push.stderr || push.stdout || "unknown push error")
}, null, 2));

if (!bundle.ok || !push.ok) {
  process.exit(1);
}
