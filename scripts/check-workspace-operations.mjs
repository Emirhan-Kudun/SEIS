#!/usr/bin/env node
// Validates integrations/workspace-operations.json: lane structure, artifact
// references into integrations/google-workspace.json, and repo mirror paths.
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const ops = JSON.parse(readFileSync(resolve(root, "integrations/workspace-operations.json"), "utf8"));
const registry = JSON.parse(readFileSync(resolve(root, ops.artifact_registry), "utf8"));
const registeredArtifacts = new Set([
  ...Object.keys(registry.drive ?? {}),
  ...Object.keys(registry.calendar ?? {}),
]);

const requiredLanes = ["docs", "backlog", "calendar", "mail", "team_updates"];
const validStatus = new Set(["active", "not_provisioned"]);

for (const name of requiredLanes) {
  const lane = ops.lanes?.[name];
  if (!lane) {
    errors.push(`missing lane: ${name}`);
    continue;
  }
  for (const key of ["surface", "status", "artifacts", "plugin_route", "cadence", "seis_record_rule"]) {
    if (lane[key] === undefined) errors.push(`${name}: missing ${key}`);
  }
  if (lane.status && !validStatus.has(lane.status)) {
    errors.push(`${name}: invalid status ${lane.status}`);
  }
  if (lane.status === "active" && (lane.artifacts ?? []).length === 0) {
    errors.push(`${name}: active lane must register at least one artifact`);
  }
  for (const artifact of lane.artifacts ?? []) {
    if (!registeredArtifacts.has(artifact)) {
      errors.push(`${name}: artifact not in ${ops.artifact_registry}: ${artifact}`);
    }
  }
  if (lane.repo_mirror && !existsSync(resolve(root, lane.repo_mirror))) {
    errors.push(`${name}: repo mirror not found: ${lane.repo_mirror}`);
  }
}

if (errors.length > 0) {
  console.error("workspace-operations check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
const active = requiredLanes.filter((name) => ops.lanes[name].status === "active").length;
console.log(`workspace-operations check passed (${requiredLanes.length} lanes, ${active} active).`);
