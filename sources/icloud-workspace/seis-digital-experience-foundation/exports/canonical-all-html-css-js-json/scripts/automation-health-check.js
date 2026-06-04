#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const SCHEDULES_PATH = path.join(ROOT, "config", "automation-schedules.json");
const AUTOMATION_ROOT = path.join(process.env.HOME || "", ".codex", "automations");

let failures = 0;

function fail(msg) {
  failures += 1;
  console.error("FAIL:", msg);
}

function ok(msg) {
  console.log("OK:", msg);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function parseTomlValue(toml, key) {
  const re = new RegExp("^" + key + " = \"([^\"]*)\"", "m");
  const m = toml.match(re);
  return m ? m[1] : "";
}

function main() {
  if (!fs.existsSync(SCHEDULES_PATH)) {
    fail("Missing config/automation-schedules.json");
    process.exit(1);
  }

  if (!fs.existsSync(AUTOMATION_ROOT)) {
    fail("Missing ~/.codex/automations directory");
    process.exit(1);
  }

  const schedules = readJson(SCHEDULES_PATH);
  if (!Array.isArray(schedules.automations) || schedules.automations.length === 0) {
    fail("No automation schedule definitions found.");
    process.exit(1);
  }

  for (const def of schedules.automations) {
    const filePath = path.join(AUTOMATION_ROOT, def.id, "automation.toml");
    if (!fs.existsSync(filePath)) {
      fail(def.id + " automation.toml not found");
      continue;
    }

    const toml = fs.readFileSync(filePath, "utf8");
    const status = parseTomlValue(toml, "status");
    const rrule = parseTomlValue(toml, "rrule");
    const name = parseTomlValue(toml, "name");

    if (status !== def.status) {
      fail(def.id + " status mismatch: expected " + def.status + " got " + status);
    } else {
      ok(def.id + " status " + status);
    }

    if (rrule !== def.rrule) {
      fail(def.id + " rrule mismatch: expected " + def.rrule + " got " + rrule);
    } else {
      ok(def.id + " rrule matches");
    }

    if (name !== def.name) {
      fail(def.id + " name mismatch: expected " + def.name + " got " + name);
    } else {
      ok(def.id + " name matches");
    }
  }

  if (failures > 0) {
    console.error("\nAutomation health check failed with", failures, "issue(s).");
    process.exit(1);
  }

  console.log("\nAutomation health check passed.");
}

main();
