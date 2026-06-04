import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const contentSource = fs.readFileSync(path.join(root, "packages/content/src/server-handoff.ts"), "utf8");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

for (const snippet of [
  "serverHandoffStages",
  "serverHandoffGuardrails",
  "npm run server:preflight",
  "npm run deploy:static:dry-run",
  "npm run deploy:static:live",
  "npm run share:icloud-github"
]) {
  if (!contentSource.includes(snippet)) {
    errors.push(`Server handoff content missing snippet: ${snippet}`);
  }
}

for (const file of [
  "apps/site-next/app/server-handoff/page.tsx",
  "apps/site-next/app/api/server-handoff/route.ts",
  "apps/static-fallback/index.html",
  "apps/static-fallback/runtime-manifest.json",
  "scripts/server-handoff-preflight.mjs"
]) {
  if (!fs.existsSync(path.join(root, file))) {
    errors.push(`Server handoff file missing: ${file}`);
  }
}

if (packageJson.scripts["server:preflight"] !== "node scripts/server-handoff-preflight.mjs") {
  errors.push("package.json must expose server:preflight.");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Server handoff check passed: staged dry-run contract is guarded.");
