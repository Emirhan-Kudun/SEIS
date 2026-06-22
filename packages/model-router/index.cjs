// Consumable entrypoint for @seis/model-router.
//
// SINGLE SOURCE OF TRUTH: the canonical routing logic lives in
// scripts/ai-routing-policy.cjs and is kept in sync with the documented policy
// (docs/platform/hybrid-ai-routing-policy.md) and the machine-readable record
// (content/governance/ai-routing-policy.json) by `npm run check:ai-routing-policy`.
//
// This module only re-exports that logic so callers import from the package
// boundary (a port, V16 §25) instead of reaching into scripts/. It adds no
// behaviour and stores no secrets — providers read credentials from the
// environment, not from here.
module.exports = require("../../scripts/ai-routing-policy.cjs");
