import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";

const targetsPath = "deploy/server-targets.json";
const packagePath = "dist/seis-static.zip";
const manifestPath = "dist/server-upload-manifest.json";

const failures = [];

if (!existsSync(targetsPath)) failures.push(`missing ${targetsPath}`);
if (!existsSync(packagePath)) failures.push(`missing ${packagePath}`);
if (!existsSync(manifestPath)) failures.push(`missing ${manifestPath}`);

let targets = null;
let manifest = null;

if (existsSync(targetsPath)) {
  targets = JSON.parse(readFileSync(targetsPath, "utf8"));
}

if (existsSync(manifestPath)) {
  manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
}

if (existsSync(packagePath) && manifest) {
  const digest = createHash("sha256").update(readFileSync(packagePath)).digest("hex");
  if (digest !== manifest.sha256) {
    failures.push("server package sha256 does not match manifest");
  }
}

const activeTarget = targets?.activeTarget || null;
if (activeTarget) {
  const candidate = (targets.candidates || []).find(item => item.id === activeTarget);
  const values = targets.targetConfig?.values || {};
  if (!candidate) {
    failures.push(`active target is not listed in candidates: ${activeTarget}`);
  } else {
    const missing = (candidate.requiredInput || []).filter(key => !values[key]);
    if (missing.length > 0) {
      failures.push(`active target missing configured values: ${missing.join(", ")}`);
    }
  }
}

if (failures.length > 0) {
  console.error("SEIS deploy readiness failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  activeTarget,
  packagePath,
  sha256: manifest?.sha256 || null,
  liveUploadBlocked: !activeTarget
}, null, 2));

