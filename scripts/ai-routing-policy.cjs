// SEIS AI auto-routing policy (executable form of the hybrid routing decision).
//
// Documented policy: docs/platform/hybrid-ai-routing-policy.md
// Machine-readable:   content/governance/ai-routing-policy.json (kept in sync by
//                     check:ai-routing-policy — doc + JSON + code must agree)
// Resolution ADR:     docs/decisions/seis-hybrid-governance-resolution.md
//
// Hybrid model: OpenAI/Codex is the default writer/runtime. A different tool is
// chosen ONLY when a task gives a clear reason in one of the policy categories.
// Two of the four categories are inferable from intent text and routed here:
//   - capability — another model is materially better for the task
//   - privacy    — data must stay local/offline
// The other two are runtime conditions, NOT inferable from intent text, so they
// are explicit operator overrides rather than hint-based routes:
//   - cost         — high-volume / low-value batch work
//   - availability — the default route is down or rate-limited
const DEFAULT_TOOL = "codex";

// Categories a hint-based route may carry (the intent-inferable subset).
const HINT_CATEGORIES = ["capability", "privacy"];

// Categories that exist in the policy but are runtime overrides, not hints.
const RUNTIME_CATEGORIES = ["cost", "availability"];

const ROUTE_HINTS = [
  {
    tool: "ollama",
    category: "privacy",
    hints: [ "local", "offline", "private", "on-device", "llama", "ollama" ]
  },
  {
    tool: "gemini",
    category: "capability",
    hints: [ "browser", "search", "research", "compare docs", "web", "source lookup" ]
  },
  {
    tool: "interpreter",
    category: "capability",
    hints: [ "csv", "spreadsheet", "dataset", "json transform", "log analysis", "trace" ]
  },
  {
    tool: "aider",
    category: "capability",
    hints: [ "quick patch", "repo patch", "small patch", "refactor", "rename", "edit existing file", "diff" ]
  },
  {
    tool: "claude",
    category: "capability",
    hints: [ "brainstorm", "naming", "ux copy", "editorial", "narrative", "strategy memo" ]
  },
  {
    tool: "kimi",
    category: "capability",
    hints: [ "translation", "translate", "localize", "multilingual", "polyglot" ]
  }
];

// Returns the routed tool name (string). Behaviour preserved for callers.
function chooseAutoTool( userIntent ) {
  const text = String( userIntent || "" ).trim().toLowerCase();
  if ( !text ) return DEFAULT_TOOL;

  for ( const route of ROUTE_HINTS ) {
    if ( route.hints.some( hint => text.includes( hint ) ) ) {
      return route.tool;
    }
  }

  // Default to the OpenAI/Codex generalist for repo, governance, accessibility,
  // release, and architecture work (the hybrid default path).
  return DEFAULT_TOOL;
}

// Returns { tool, category, reason } so the policy's "state the reason" rule can
// be satisfied automatically when an exception is taken.
function explainRoute( userIntent ) {
  const text = String( userIntent || "" ).trim().toLowerCase();
  if ( !text ) {
    return { tool: DEFAULT_TOOL, category: "default", reason: "no intent given; default OpenAI/Codex route" };
  }
  for ( const route of ROUTE_HINTS ) {
    const matched = route.hints.find( hint => text.includes( hint ) );
    if ( matched ) {
      return { tool: route.tool, category: route.category, reason: `${route.category} exception matched on "${matched}"` };
    }
  }
  return { tool: DEFAULT_TOOL, category: "default", reason: "no exception matched; default OpenAI/Codex route" };
}

module.exports = { chooseAutoTool, explainRoute, ROUTE_HINTS, DEFAULT_TOOL, HINT_CATEGORIES, RUNTIME_CATEGORIES };
