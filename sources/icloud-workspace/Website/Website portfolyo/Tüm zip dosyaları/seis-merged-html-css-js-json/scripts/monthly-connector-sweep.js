#!/usr/bin/env node
"use strict";

const cp = require("node:child_process");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");

const res = cp.spawnSync(process.execPath, ["scripts/run-core-orchestration.js", "--mode", "monthly", "--profile", "monthly_profile"], {
  cwd: ROOT,
  stdio: "inherit"
});

process.exit(typeof res.status === "number" ? res.status : 1);
