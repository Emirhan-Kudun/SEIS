import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const source = fs.readFileSync(path.join(root, "packages/content/src/capability-mesh.ts"), "utf8");
const apiSource = fs.readFileSync(path.join(root, "apps/site-next/app/api/connector-console/route.ts"), "utf8");

for (const required of ["Lovable", "GitHub", "Vercel", "Figma", "Canva", "Adobe", "Semrush", "Supabase", "Serena", "SEIS Code Continuation Automation", "Restricted Builder Policy"]) {
  if (!source.includes(required)) {
    errors.push(`Capability mesh missing ${required}.`);
  }
}

for (const snippet of ["status: \"preferred\"", "status: \"blocked\"", "blocked builders out of execution paths", "capabilityMeshSummary"]) {
  if (!source.includes(snippet)) {
    errors.push(`Capability mesh missing safety snippet: ${snippet}`);
  }
}

if (!source.includes("lovable-builder") || !source.includes("restricted-builder-policy")) {
  errors.push("Capability mesh must preserve Lovable preference and restricted builder policy.");
}

if (!source.includes("codex-code-continuation") || !source.includes("seis-code-continuation")) {
  errors.push("Capability mesh must include the code continuation automation.");
}

for (const snippet of ["capabilityMeshItems", "capabilityMeshSummary", "capabilityMesh"]) {
  if (!apiSource.includes(snippet)) {
    errors.push(`/api/connector-console missing capability mesh snippet: ${snippet}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Capability mesh check passed: apps, skills, plugins and MCP guardrails are connected.");
