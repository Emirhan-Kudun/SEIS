// Executable entrypoint for @seis/prompt-engine.
//
// Loads the Markdown prompt templates in packages/prompt-engine/templates/ and
// renders them by substituting {{placeholders}}. The templates remain the single
// source of truth (format: prompt-format.md); this adds no hidden behaviour and
// stores no secrets.
const { readFileSync, readdirSync } = require("node:fs");
const { join } = require("node:path");

const TEMPLATE_DIR = join(__dirname, "templates");
const PLACEHOLDER = /\{\{\s*([a-z0-9_]+)\s*\}\}/gi;

function templateFiles() {
  return readdirSync(TEMPLATE_DIR).filter((f) => f.endsWith(".md"));
}

function parseTemplate(file) {
  const path = join(TEMPLATE_DIR, file);
  const text = readFileSync(path, "utf8");
  const field = (name) => {
    const m = text.match(new RegExp(`^- ${name}:\\s*(.+)$`, "m"));
    return m ? m[1].trim() : null;
  };
  const placeholders = [...new Set([...text.matchAll(PLACEHOLDER)].map((m) => m[1]))];
  return {
    id: field("id"),
    version: field("version"),
    intent: field("intent"),
    placeholders,
    body: text,
    file,
  };
}

function listTemplates() {
  return templateFiles()
    .map(parseTemplate)
    .filter((t) => t.id)
    .map(({ id, version, intent, placeholders }) => ({ id, version, intent, placeholders }));
}

function loadTemplate(id) {
  for (const file of templateFiles()) {
    const t = parseTemplate(file);
    if (t.id === id) return t;
  }
  throw new Error(`unknown prompt template: ${id}`);
}

// Render a template, substituting {{name}} from vars. Unfilled placeholders are
// left intact and reported in `missing`.
function render(id, vars = {}) {
  const t = loadTemplate(id);
  const missing = [];
  const text = t.body.replace(PLACEHOLDER, (whole, name) => {
    if (Object.prototype.hasOwnProperty.call(vars, name)) return String(vars[name]);
    missing.push(name);
    return whole;
  });
  return { id, version: t.version, text, missing: [...new Set(missing)] };
}

module.exports = { listTemplates, loadTemplate, render, TEMPLATE_DIR };
