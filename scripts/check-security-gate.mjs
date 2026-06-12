#!/usr/bin/env node
// Validates data/security-gate-status.json against the gate policy:
// required gates present, states within the allowed set, policy doc exists,
// and every gate is mentioned in the policy document.
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const status = JSON.parse(readFileSync(resolve(root, "data/security-gate-status.json"), "utf8"));

if (!status.policy || !existsSync(resolve(root, status.policy))) {
  errors.push(`policy document not found: ${status.policy}`);
}
const policyText = status.policy ? readFileSync(resolve(root, status.policy), "utf8") : "";

const requiredGates = [
  "closed_code",
  "no_large_binaries",
  "source_deletion",
  "deployment",
  "automation_expansion",
];
const validStates = new Set(["enforced", "open", "blocked"]);

const seen = new Map((status.gates ?? []).map((gate) => [gate.gate_id, gate]));
for (const id of requiredGates) {
  const gate = seen.get(id);
  if (!gate) {
    errors.push(`missing gate: ${id}`);
    continue;
  }
  if (!validStates.has(gate.state)) errors.push(`${id}: invalid state ${gate.state}`);
  if (!gate.label) errors.push(`${id}: missing label`);
  if (!gate.guard) errors.push(`${id}: missing guard`);
  if (policyText && !policyText.includes(id)) {
    errors.push(`${id}: not documented in ${status.policy}`);
  }
}

if (errors.length > 0) {
  console.error("security-gate check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`security-gate check passed (${requiredGates.length} gates).`);
