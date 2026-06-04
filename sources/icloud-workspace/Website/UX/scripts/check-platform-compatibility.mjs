import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const source = fs.readFileSync(path.join(root, "packages/content/src/platform-compatibility.ts"), "utf8");
const errors = [];

const requiredTargetIds = [
  "html",
  "css",
  "javascript",
  "json",
  "android",
  "ios-iphone",
  "windows",
  "macos",
  "apple-watch"
];
const requiredDeviceIds = ["phone", "tablet", "desktop", "companion"];
const requiredPrincipleIds = ["progressive-enhancement", "motion-budget", "native-lanes", "brand-parity"];

for (const id of requiredTargetIds) {
  if (!source.includes(`id: "${id}"`)) {
    errors.push(`Missing platform compatibility target: ${id}`);
  }
}

for (const id of requiredDeviceIds) {
  if (!source.includes(`id: "${id}"`)) {
    errors.push(`Missing platform compatibility device: ${id}`);
  }
}

for (const id of requiredPrincipleIds) {
  if (!source.includes(`id: "${id}"`)) {
    errors.push(`Missing platform compatibility principle: ${id}`);
  }
}

if (!source.includes('status: "active"') || !source.includes('status: "planned"')) {
  errors.push("Platform compatibility targets must include both active and planned states.");
}

if (!source.includes('family: "web"') || !source.includes('family: "mobile"') || !source.includes('family: "desktop"')) {
  errors.push("Platform compatibility targets must cover web, mobile and desktop families.");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Platform compatibility check passed: targets, devices and principles are complete.");
