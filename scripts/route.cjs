#!/usr/bin/env node
// SEIS model-router CLI: print the routing decision for a task intent.
// Uses the canonical policy via the @seis/model-router entrypoint (single
// source of truth). No secrets, no provider calls — decision only.
//
// Usage: npm run route -- "translate this page to Turkish"
const { explainRoute } = require("../packages/model-router/index.cjs");

const intent = process.argv.slice(2).join(" ").trim();
const decision = explainRoute(intent);
console.log(JSON.stringify({ intent: intent || "(empty)", ...decision }, null, 2));
