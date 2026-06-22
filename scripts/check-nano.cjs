#!/usr/bin/env node
// Runs the SEIS nano model smoke test (V16 §30). Skip-safe: if python3 is not
// available (e.g. a Node-only CI runner), it reports a skip and exits 0 rather
// than failing the build — the nano model is stdlib Python and not a hard CI
// dependency. Where python3 exists, a failing smoke test fails this check.
const { spawnSync } = require("node:child_process");

const probe = spawnSync("python3", ["--version"], { encoding: "utf8" });
if (probe.status !== 0) {
  console.log("check:nano skipped — python3 not available in this environment.");
  process.exit(0);
}

const result = spawnSync("python3", ["research/nano/smoke_test.py"], {
  stdio: "inherit",
});
process.exit(result.status ?? 1);
