#!/usr/bin/env node
// SEIS prompt-engine CLI: render a versioned prompt template.
//
// Usage:
//   npm run prompt                          # list templates
//   npm run prompt -- repository-scan       # render (unfilled placeholders kept)
//   npm run prompt -- pr-review pr_diff=... pr_context=...
const { listTemplates, render } = require("../packages/prompt-engine/index.cjs");

const [id, ...rest] = process.argv.slice(2);

if (!id) {
  console.log("Available prompt templates:\n");
  for (const t of listTemplates()) {
    const ph = t.placeholders.length ? ` {{${t.placeholders.join("}} {{")}}}` : "";
    console.log(`  ${t.id} (v${t.version}) — ${t.intent}${ph}`);
  }
  process.exit(0);
}

const vars = {};
for (const pair of rest) {
  const eq = pair.indexOf("=");
  if (eq > 0) vars[pair.slice(0, eq)] = pair.slice(eq + 1);
}

const out = render(id, vars);
process.stdout.write(out.text.endsWith("\n") ? out.text : out.text + "\n");
if (out.missing.length) {
  console.error(`\n[prompt] unfilled placeholders: ${out.missing.map((m) => `{{${m}}}`).join(" ")}`);
}
