#!/usr/bin/env node
// Validates the SEIS prompt templates stay well-formed (V16 §14, §30): every
// template declares id + integer version + intent and the Inputs/Instructions/
// Output sections, ids are unique, and rendering works. Pure Node — CI-safe.
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { listTemplates, loadTemplate, render, TEMPLATE_DIR } = require("../packages/prompt-engine/index.cjs");

const failures = [];
const ensure = (cond, msg) => { if (!cond) failures.push(msg); };

const templates = listTemplates();
ensure(templates.length > 0, "no prompt templates found");

const seen = new Set();
for (const t of templates) {
  ensure(t.id, `template missing id (${JSON.stringify(t)})`);
  ensure(!seen.has(t.id), `duplicate template id: ${t.id}`);
  if (t.id) seen.add(t.id);
  ensure(/^\d+$/.test(String(t.version || "")), `template ${t.id} version must be an integer`);
  ensure(Boolean(t.intent), `template ${t.id} must declare an intent`);

  const full = loadTemplate(t.id);
  const body = readFileSync(join(TEMPLATE_DIR, full.file), "utf8");
  for (const section of ["## Inputs", "## Instructions", "## Output"]) {
    ensure(body.includes(section), `template ${t.id} must have a "${section}" section`);
  }
  // Rendering with no vars must succeed and keep placeholders intact.
  const out = render(t.id, {});
  ensure(typeof out.text === "string" && out.text.length > 0, `template ${t.id} failed to render`);
}

if (failures.length) {
  console.error("Prompt-engine check failed:");
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`Prompt-engine check passed: ${templates.length} templates valid.`);
