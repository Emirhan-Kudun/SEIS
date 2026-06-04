import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredEnv = ["DEPLOY_HOST", "DEPLOY_USER", "DEPLOY_PATH"];
const staticFallbackPath = path.join(root, "apps/static-fallback/index.html");
const manifestPath = path.join(root, "apps/static-fallback/runtime-manifest.json");
const missingEnv = requiredEnv.filter((key) => !process.env[key] || !String(process.env[key]).trim());

const result = {
  ok: missingEnv.length === 0 && fs.existsSync(staticFallbackPath) && fs.existsSync(manifestPath),
  mode: "dry-run-required",
  staticFallbackPath,
  manifestPath,
  staticFallbackOk: fs.existsSync(staticFallbackPath),
  manifestOk: fs.existsSync(manifestPath),
  requiredEnv,
  missingEnv,
  nextCommand: missingEnv.length === 0 ? "npm run deploy:static:dry-run" : "export DEPLOY_HOST DEPLOY_USER DEPLOY_PATH outside git"
};

console.log(JSON.stringify(result, null, 2));

if (!result.ok) {
  process.exit(1);
}
