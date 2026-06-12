#!/usr/bin/env node
// Validates the mobile shell and macOS inspector contracts: structure,
// entity references into apps/fullstack/state-model.json, and scaffold paths.
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const stateModel = JSON.parse(
  readFileSync(resolve(root, "apps/fullstack/state-model.json"), "utf8"),
);
const knownEntities = new Set(Object.keys(stateModel.entities));

const contracts = [
  { path: "apps/android/shell-contract.json", unitsKey: "screens", idKey: "screen_id" },
  { path: "apps/macos/inspector-contract.json", unitsKey: "views", idKey: "view_id" },
];

for (const { path, unitsKey, idKey } of contracts) {
  const contract = JSON.parse(readFileSync(resolve(root, path), "utf8"));
  for (const key of ["name", "platform", "status", "purpose", "data_contract", unitsKey]) {
    if (!contract[key]) errors.push(`${path}: missing ${key}`);
  }
  if (contract.data_contract?.source !== "apps/fullstack/state-model.json") {
    errors.push(`${path}: data_contract.source must be apps/fullstack/state-model.json`);
  }
  const units = contract[unitsKey] ?? [];
  if (units.length === 0) errors.push(`${path}: ${unitsKey} must not be empty`);
  for (const unit of units) {
    if (!unit[idKey] || !unit.title || !unit.purpose) {
      errors.push(`${path}: ${unitsKey} entry missing ${idKey}/title/purpose`);
    }
    for (const entity of unit.entities ?? []) {
      if (!knownEntities.has(entity)) {
        errors.push(`${path}: ${unit[idKey]}: unknown entity ${entity}`);
      }
    }
  }
  if (contract.scaffold && !existsSync(resolve(root, contract.scaffold))) {
    errors.push(`${path}: scaffold not found: ${contract.scaffold}`);
  }
  if (contract.navigation) {
    const ids = new Set(units.map((unit) => unit[idKey]));
    for (const id of contract.navigation.order ?? []) {
      if (!ids.has(id)) errors.push(`${path}: navigation references unknown ${idKey}: ${id}`);
    }
  }
}

if (errors.length > 0) {
  console.error("app-shell-contracts check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`app-shell-contracts check passed (${contracts.length} contracts).`);
