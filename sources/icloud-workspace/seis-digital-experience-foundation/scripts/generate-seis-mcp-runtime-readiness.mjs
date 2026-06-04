import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const outputPath = "data/seis/mcp-runtime-readiness.json";
const knownAuthStates = ["Unsupported", "OAuth", "Not logged in", "Logged in", "Unknown"];

const surfacePatterns = [
  {
    surfaceId: "observability-security-mcps",
    patterns: ["aikido", "sentry", "datadog", "pagerduty", "logfire", "security", "monitoring", "logging", "trace", "error-reporting", "crowdstrike", "semgrep", "amplitude", "grafana", "clarity", "network-intelligence"]
  },
  {
    surfaceId: "business-payment-connectors",
    patterns: ["stripe", "hubspot", "hunter", "intercom", "legalzoom", "pigment", "pay", "razorpay", "apollo", "close", "salesforce", "ads"]
  },
  {
    surfaceId: "product-collaboration-connectors",
    patterns: ["linear", "notion", "slack", "gmail", "calendar", "drive", "chat", "people", "miro", "asana", "jira", "confluence", "atlassian", "airtable", "circleback", "discord", "imessage", "workiq"]
  },
  {
    surfaceId: "design-collaboration-connectors",
    patterns: ["adobe", "figma", "canva", "design", "carbon", "biorender", "cloudinary", "flowbite", "shadcn", "visualization"]
  },
  {
    surfaceId: "documentation-knowledge-mcps",
    patterns: ["context7", "mdn", "microsoft-learn", "openai-docs", "aws-documentation", "developer-knowledge", "x-docs", "xai-docs", "mapbox-docs", "huggingface", "docs", "docling", "exa", "fetch", "perplexity", "cisco-devnet", "mapbox", "agent-search", "maps-code-assist", "maps-grounding"]
  },
  {
    surfaceId: "data-backend-mcps",
    patterns: ["alloydb", "bigquery", "postgres", "supabase", "neon", "firebase", "firestore", "database", "datacloud", "cloud-sql", "spanner", "pubsub", "duckdb", "appwrite", "mongodb", "sql", "redis", "valkey", "atlan", "bigdata", "clickhouse", "dataplex", "dataproc", "datastream", "bigtable", "fabric", "powerbi", "pinecone", "notebook", "domino", "gemini-enterprise", "stitch"]
  },
  {
    surfaceId: "cloud-infrastructure-mcps",
    patterns: ["aws", "azure", "google-cloud", "google-compute", "google-gke", "cloud-run", "cloud-storage", "cloud-resource", "kubernetes", "vercel", "cloudflare", "netlify", "render", "serverless", "iac", "aurora", "terraform", "hostinger", "oracle-oci", "android-management", "saas-service", "gemini-cloud-assist"]
  },
  {
    surfaceId: "github-governance-connectors",
    patterns: ["github", "gitlab", "greptile", "graphos", "coderabbit", "git-tools"]
  },
  {
    surfaceId: "node-repl-browser-automation",
    patterns: ["chrome", "browser", "playwright", "devtools"]
  },
  {
    surfaceId: "skill-runtime",
    patterns: ["claude-code", "skill", "skills", "memory", "sequential-thinking", "agent-registry"]
  },
  {
    surfaceId: "local-development-tools",
    patterns: ["mcp_docker", "docker", "terminal", "debugmcp", "eslint", "node_repl", "official-filesystem", "xcodebuild", "postman", "cds-mcp", "laravel", "expo", "forge"]
  }
];

const rawOutput = execFileSync("codex", ["mcp", "list"], {
  encoding: "utf8",
  maxBuffer: 1024 * 1024 * 8
});

const entries = parseMcpList(rawOutput);
const snapshot = buildSnapshot(entries);

mkdirSync("data/seis", { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);

console.log(JSON.stringify({
  ok: true,
  outputPath,
  totalItems: snapshot.summary.totalItems,
  mappedItems: snapshot.summary.mappedItems,
  unmappedItems: snapshot.summary.unmappedItems,
  blockedAuthItems: snapshot.summary.byReadiness["blocked-auth"] || 0
}, null, 2));

export function parseMcpList(raw) {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean)
    .filter((line) => !line.startsWith("Name "))
    .map(parseMcpLine)
    .filter(Boolean)
    .map((entry) => ({
      ...entry,
      surfaceId: classifySurface(entry.name),
      readiness: classifyReadiness(entry)
    }));
}

function parseMcpLine(line) {
  const authPattern = knownAuthStates.map(escapeRegExp).join("|");
  const match = line.match(new RegExp(`^(\\S+)\\s+.+\\s+(enabled|disabled)\\s+(${authPattern})\\s*$`));
  if (!match) return null;

  return {
    name: match[1],
    status: match[2],
    auth: match[3]
  };
}

function buildSnapshot(entries) {
  const sortedEntries = entries.sort((a, b) => a.name.localeCompare(b.name));
  const mappedItems = sortedEntries.filter((entry) => entry.surfaceId);

  return {
    schemaVersion: "1.0.0",
    generatedBy: "scripts/generate-seis-mcp-runtime-readiness.mjs",
    generatedAt: new Date().toISOString(),
    mission: "SEIS-M006",
    source: {
      command: "codex mcp list",
      secretsStored: false,
      capturedFields: ["name", "status", "auth", "surfaceId", "readiness"]
    },
    policy: {
      defaultUse: "registry-routed-read-only-first",
      unavailableHandling: "record-as-blocked-or-needs-auth",
      blanketInvocationAllowed: false
    },
    summary: {
      totalItems: sortedEntries.length,
      mappedItems: mappedItems.length,
      unmappedItems: sortedEntries.length - mappedItems.length,
      byStatus: countBy(sortedEntries, "status"),
      byAuth: countBy(sortedEntries, "auth"),
      byReadiness: countBy(sortedEntries, "readiness"),
      bySurface: countBy(mappedItems, "surfaceId")
    },
    items: sortedEntries
  };
}

function classifySurface(name) {
  const normalized = name.toLowerCase();
  const surface = surfacePatterns.find((candidate) => candidate.patterns.some((pattern) => normalized.includes(pattern)));
  return surface?.surfaceId || null;
}

function classifyReadiness(entry) {
  if (entry.status !== "enabled") return "disabled";
  if (entry.auth === "Not logged in") return "blocked-auth";
  if (entry.auth === "OAuth") return "permission-gated";
  if (entry.auth === "Unsupported") return "enabled-no-auth-handshake";
  if (entry.auth === "Logged in") return "ready-authenticated";
  return "unknown";
}

function countBy(entries, field) {
  return entries.reduce((counts, entry) => {
    const key = entry[field] || "unmapped";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
