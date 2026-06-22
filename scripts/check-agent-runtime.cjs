#!/usr/bin/env node
// Validates the SEIS agent role contracts (V16 §13, §26): each role declares the
// required fields, allowed/forbidden are non-empty lists, no action is both
// allowed and forbidden, role names are unique, and the least-privilege default
// holds (an unlisted action is denied). Pure Node — CI-safe.
const { listAgents, can } = require("../packages/agent-runtime/index.cjs");

const failures = [];
const ensure = (cond, msg) => { if (!cond) failures.push(msg); };

const agents = listAgents();
ensure(agents.length > 0, "no agent roles found");

const REQUIRED = ["role", "responsibility", "allowed", "forbidden", "input", "output", "validation", "docs"];
const seen = new Set();

for (const a of agents) {
  for (const field of REQUIRED) {
    ensure(a[field] !== undefined, `agent ${a.role || a.file} missing field: ${field}`);
  }
  ensure(!seen.has(a.role), `duplicate agent role: ${a.role}`);
  if (a.role) seen.add(a.role);
  ensure(Array.isArray(a.allowed) && a.allowed.length > 0, `agent ${a.role} must list allowed actions`);
  ensure(Array.isArray(a.forbidden) && a.forbidden.length > 0, `agent ${a.role} must list forbidden actions`);
  // No action may be both allowed and forbidden.
  for (const act of a.allowed || []) {
    ensure(!(a.forbidden || []).includes(act), `agent ${a.role}: action both allowed and forbidden: "${act}"`);
  }
  // Least-privilege default: an unlisted action is denied.
  if (a.role) {
    const v = can(a.role, "__definitely_not_a_listed_action__");
    ensure(v.allowed === false, `agent ${a.role}: unlisted action must be denied by default`);
  }
}

if (failures.length) {
  console.error("Agent-runtime check failed:");
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`Agent-runtime check passed: ${agents.length} roles valid.`);
