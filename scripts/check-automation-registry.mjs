#!/usr/bin/env node
// Validates data/automation-registry.json: a global kill switch is defined,
// every registered automation maps to a known state-model entity with a sync
// rule and a disable path, and the kill-switch decision record exists. This is
// the machine guard behind the automation_expansion security gate.
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));

const registry = readJson("data/automation-registry.json");
const stateModel = readJson("apps/fullstack/state-model.json");
const knownEntities = new Set(Object.keys(stateModel.entities));

if (!registry.decision_record || !existsSync(resolve(root, registry.decision_record))) {
  errors.push(`decision record not found: ${registry.decision_record}`);
}

const kill = registry.global_kill_switch;
if (!kill) {
  errors.push("missing global_kill_switch");
} else {
  for (const key of ["flag", "effect", "ultimate_disable"]) {
    if (!kill[key]) errors.push(`global_kill_switch missing ${key}`);
  }
}

if (!registry.coverage_rule) errors.push("missing coverage_rule");

const automations = registry.automations ?? [];
if (automations.length === 0) errors.push("registry must list at least one automation");

const seen = new Set();
for (const item of automations) {
  const id = item.id ?? "unknown";
  if (!item.id) errors.push("automation entry missing id");
  if (seen.has(id)) errors.push(`duplicate automation id: ${id}`);
  seen.add(id);
  for (const key of ["command", "sync_rule", "disable_path"]) {
    if (!item[key]) errors.push(`${id}: missing ${key}`);
  }
  if (!Array.isArray(item.writes) || item.writes.length === 0) {
    errors.push(`${id}: writes must be a non-empty array`);
  }
  // Coverage may name one entity (state_model_entity) or several
  // (state_model_entities) when an automation materializes the whole model.
  const entities = item.state_model_entities ?? (item.state_model_entity ? [item.state_model_entity] : []);
  if (entities.length === 0) {
    errors.push(`${id}: must reference at least one state_model_entity`);
  }
  for (const entity of entities) {
    if (!knownEntities.has(entity)) {
      errors.push(`${id}: references unknown state-model entity: ${entity}`);
    }
  }
}

if (errors.length > 0) {
  console.error("automation-registry check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`automation-registry check passed (${automations.length} automations, kill switch defined).`);
