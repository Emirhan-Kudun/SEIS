#!/usr/bin/env node
// Validates apps/fullstack/state-model.json: required structure per entity
// and existence of every declared seed source file.
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const modelPath = resolve(root, "apps/fullstack/state-model.json");

const errors = [];
let model;
try {
  model = JSON.parse(readFileSync(modelPath, "utf8"));
} catch (error) {
  console.error(`backend-state-model check failed: ${error.message}`);
  process.exit(1);
}

for (const key of ["name", "decision_record", "backend", "entities", "consumer_contract"]) {
  if (!model[key]) errors.push(`missing top-level field: ${key}`);
}

if (model.decision_record && !existsSync(resolve(root, model.decision_record))) {
  errors.push(`decision record not found: ${model.decision_record}`);
}

const requiredEntities = [
  "plugin_registry",
  "plugin_lanes",
  "repositories",
  "source_branches",
  "workspace_links",
  "governance_gates",
];

for (const name of requiredEntities) {
  const entity = model.entities?.[name];
  if (!entity) {
    errors.push(`missing entity: ${name}`);
    continue;
  }
  for (const key of ["description", "fields", "seed_sources", "sync_rule"]) {
    if (!entity[key]) errors.push(`${name}: missing ${key}`);
  }
  if (entity.fields && Object.keys(entity.fields).length === 0) {
    errors.push(`${name}: fields must not be empty`);
  }
  for (const source of entity.seed_sources ?? []) {
    if (!existsSync(resolve(root, source))) {
      errors.push(`${name}: seed source not found: ${source}`);
    }
  }
}

if (errors.length > 0) {
  console.error("backend-state-model check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(
  `backend-state-model check passed (${requiredEntities.length} entities, decision record present).`,
);
