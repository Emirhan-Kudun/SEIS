#!/usr/bin/env node
// SEIS evals CLI: score an AI output for safety/quality/completion.
//
// Usage:
//   npm run evals -- "the text to evaluate"
//   npm run evals -- "text" --must "needle1" --must "needle2"
const { evaluate } = require("../packages/evals/index.cjs");

const args = process.argv.slice(2);
const mustInclude = [];
const parts = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--must") mustInclude.push(args[++i]);
  else parts.push(args[i]);
}
console.log(JSON.stringify(evaluate(parts.join(" "), { mustInclude }), null, 2));
