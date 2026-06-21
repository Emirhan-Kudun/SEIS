#!/usr/bin/env node
// SEIS agent-runtime CLI: list agent roles or check a capability.
//
// Usage:
//   npm run agents                       # list roles
//   npm run agents -- can architect "review and design architecture"
const { listAgents, can } = require("../packages/agent-runtime/index.cjs");

const [cmd, role, ...rest] = process.argv.slice(2);

if (cmd === "can") {
  const action = rest.join(" ");
  const verdict = can(role, action);
  console.log(JSON.stringify({ role, action, ...verdict }, null, 2));
  process.exit(0);
}

console.log("SEIS agent roles:\n");
for (const a of listAgents()) {
  console.log(`  ${a.role} — ${a.responsibility}`);
  console.log(`    allowed: ${(a.allowed || []).length}  forbidden: ${(a.forbidden || []).length}`);
}
