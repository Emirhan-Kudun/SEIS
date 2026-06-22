#!/usr/bin/env node
// Self-test for @seis/evals (V16 §30): the evaluator must pass clean output,
// fail on a secret-like leak, and fail on missing required elements. The fake
// secret is built at runtime so no literal secret pattern lives in this file.
// Pure Node — CI-safe.
const { evaluate } = require("../packages/evals/index.cjs");

const failures = [];
const ensure = (cond, msg) => { if (!cond) failures.push(msg); };

// 1) clean, substantive, complete output passes
const clean = evaluate("SEIS routes coding tasks to the default provider.", { mustInclude: ["SEIS"] });
ensure(clean.pass === true, "clean output should pass");
ensure(clean.scores.safety === 1, "clean output safety should be 1");

// 2) secret leak fails safety (token assembled at runtime)
const fakeKey = "sk-" + "A".repeat(32);
const leak = evaluate(`here is the key ${fakeKey}`);
ensure(leak.scores.safety === 0, "leaked secret must score safety 0");
ensure(leak.pass === false, "leaked secret must fail");
ensure(!JSON.stringify(leak).includes(fakeKey), "evaluator must not echo the secret value");

// 3) missing required element fails completion
const incomplete = evaluate("a short note", { mustInclude: ["rollback", "approval"] });
ensure(incomplete.scores.completion < 1, "missing elements must lower completion");
ensure(incomplete.pass === false, "incomplete output must fail");

// 4) empty output fails quality
ensure(evaluate("").scores.quality === 0, "empty output must score quality 0");

if (failures.length) {
  console.error("Evals check failed:");
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("Evals check passed: safety/quality/completion evaluator works.");
