// Executable entrypoint for @seis/agent-runtime.
//
// Loads the agent role contracts in packages/agent-runtime/roles/*.md (each a
// fenced yaml block) into a registry, and provides a capability checker that
// enforces allowed/forbidden with least-privilege defaults. The role files stay
// the source of truth (format: agents.md). No secrets, no privilege escalation.
const { readFileSync, readdirSync } = require("node:fs");
const { join } = require("node:path");

const ROLES_DIR = join(__dirname, "roles");

// Minimal parser for the constrained yaml block used by the role files:
//   key: value            -> scalar
//   key:                  -> list header
//     - item              -> list item
function parseRoleBlock(text) {
  const m = text.match(/```ya?ml\s*([\s\S]*?)```/i);
  if (!m) return null;
  const out = {};
  let listKey = null;
  for (const raw of m[1].split("\n")) {
    if (!raw.trim()) continue;
    const item = raw.match(/^\s+-\s+(.*)$/);
    if (item && listKey) { out[listKey].push(item[1].trim()); continue; }
    const kv = raw.match(/^([a-z_]+):\s*(.*)$/i);
    if (kv) {
      const [, key, val] = kv;
      if (val.trim() === "") { out[key] = []; listKey = key; }
      else { out[key] = val.trim(); listKey = null; }
    }
  }
  return out;
}

function roleFiles() {
  return readdirSync(ROLES_DIR).filter((f) => f.endsWith(".md"));
}

function listAgents() {
  return roleFiles()
    .map((f) => ({ file: f, ...(parseRoleBlock(readFileSync(join(ROLES_DIR, f), "utf8")) || {}) }))
    .filter((a) => a.role);
}

function getAgent(role) {
  const a = listAgents().find((x) => x.role === role);
  if (!a) throw new Error(`unknown agent role: ${role}`);
  return a;
}

// Capability check with least-privilege default: explicit forbidden wins; an
// action must be explicitly allowed; otherwise it is denied (V16 §13, §26).
function can(role, action) {
  const a = getAgent(role);
  const allowed = a.allowed || [];
  const forbidden = a.forbidden || [];
  const hit = (list) => list.some((x) => x.toLowerCase().includes(String(action).toLowerCase()));
  if (hit(forbidden)) return { allowed: false, reason: "matched a forbidden action" };
  if (hit(allowed)) return { allowed: true, reason: "matched an allowed action" };
  return { allowed: false, reason: "not in allowed set (least-privilege default)" };
}

module.exports = { listAgents, getAgent, can, ROLES_DIR };
