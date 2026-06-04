import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const source = fs.readFileSync(path.join(root, "packages/content/src/supreme-os.ts"), "utf8");
const errors = [];

const requiredModeIds = ["minimal-system", "cinematic-experience", "ai-workspace", "future-systems"];
const requiredCapabilityIds = [
  "creative-direction",
  "frontend-architecture",
  "motion-3d",
  "backend-cloud",
  "mobile-desktop",
  "governance-security",
  "automation-ai",
  "performance-accessibility"
];
const requiredLaneIds = ["portfolio", "product", "platform", "infrastructure"];
const requiredEngineNodeIds = ["plugins-skills", "mcp-runtime", "automation-loop", "github-publish"];

for (const id of requiredModeIds) {
  if (!source.includes(`id: "${id}"`)) {
    errors.push(`Missing Supreme OS mode: ${id}`);
  }
}

for (const id of requiredCapabilityIds) {
  if (!source.includes(`id: "${id}"`)) {
    errors.push(`Missing Supreme OS capability: ${id}`);
  }
}

for (const id of requiredLaneIds) {
  if (!source.includes(`id: "${id}"`)) {
    errors.push(`Missing Supreme OS lane: ${id}`);
  }
}

for (const id of requiredEngineNodeIds) {
  if (!source.includes(`id: "${id}"`)) {
    errors.push(`Missing Supreme OS engine node: ${id}`);
  }
}

if (!source.includes('status: "planned"') || !source.includes('status: "active"')) {
  errors.push("Supreme OS capabilities must include both active and planned states.");
}

if (!source.includes('mode: "blocked"') || !source.includes('mode: "guarded"') || !source.includes('mode: "active"')) {
  errors.push("Supreme OS engine nodes must expose active, guarded and blocked states.");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Supreme OS check passed: modes, capabilities, lanes and engine nodes are complete.");
