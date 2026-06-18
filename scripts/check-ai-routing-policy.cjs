#!/usr/bin/env node
// Validates that the executable AI routing policy stays coherent with the
// documented hybrid policy — WITHOUT requiring any AI tool to be installed, so
// it is safe to run in CI. (check:ai-stack additionally probes tool presence.)
//
// Policy doc: docs/platform/hybrid-ai-routing-policy.md
const { existsSync, readFileSync } = require("node:fs");
const {
  chooseAutoTool,
  explainRoute,
  ROUTE_HINTS,
  DEFAULT_TOOL,
  HINT_CATEGORIES,
  RUNTIME_CATEGORIES,
} = require("./ai-routing-policy.cjs");

const policyDoc = "docs/platform/hybrid-ai-routing-policy.md";
const failures = [];
const ensure = (condition, message) => {
  if (!condition) failures.push(message);
};

// 1. OpenAI-first default must be preserved (the hybrid default path).
ensure(DEFAULT_TOOL === "codex", "default route must remain OpenAI/Codex (codex)");
ensure(chooseAutoTool("") === "codex", "empty intent must default to codex");
ensure(
  chooseAutoTool("release governance checklist") === "codex",
  "core governance work must take the default codex route",
);

// 2. Every hint-based route must carry a valid, intent-inferable category.
ensure(Array.isArray(ROUTE_HINTS) && ROUTE_HINTS.length > 0, "ROUTE_HINTS must be defined");
for (const route of ROUTE_HINTS) {
  ensure(route.tool, "each route must define a tool");
  ensure(
    HINT_CATEGORIES.includes(route.category),
    `route ${route.tool} category must be one of ${HINT_CATEGORIES.join("/")} (got "${route.category}")`,
  );
  ensure(
    Array.isArray(route.hints) && route.hints.length > 0,
    `route ${route.tool} must define hints`,
  );
}

// 3. At least one privacy route must exist (data-stays-local path).
ensure(
  ROUTE_HINTS.some((route) => route.category === "privacy"),
  "policy must provide a privacy (local/offline) route",
);

// 4. explainRoute must report the category + a reason for an exception.
const offline = explainRoute("local offline llama draft");
ensure(offline.tool === "ollama" && offline.category === "privacy", "offline intent must explain a privacy route to ollama");
ensure(typeof offline.reason === "string" && offline.reason.length > 0, "explainRoute must state a reason");
const def = explainRoute("ship the release");
ensure(def.tool === "codex" && def.category === "default", "non-exception intent must explain the default route");

// 5. The documented policy must exist and name all four categories + the default.
ensure(existsSync(policyDoc), `missing ${policyDoc}`);
if (existsSync(policyDoc)) {
  const doc = readFileSync(policyDoc, "utf8").toLowerCase();
  for (const category of [...HINT_CATEGORIES, ...RUNTIME_CATEGORIES]) {
    ensure(doc.includes(category), `policy doc must document the "${category}" category`);
  }
  ensure(
    doc.includes("openai") || doc.includes("codex"),
    "policy doc must state the OpenAI/Codex default",
  );
}

if (failures.length > 0) {
  console.error("AI routing policy check failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`AI routing policy check passed (default=${DEFAULT_TOOL}, ${ROUTE_HINTS.length} exception routes).`);
