import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function requireSnippets(relativePath, snippets) {
  const source = read(relativePath);
  for (const snippet of snippets) {
    if (!source.includes(snippet)) {
      errors.push(`${relativePath} missing intake guardrail snippet: ${snippet}`);
    }
  }
}

requireSnippets("apps/site-next/lib/intake-guard.ts", [
  "honeypot_triggered",
  "rate_limited",
  "duplicate_submission",
  "RATE_LIMIT_WINDOW_MS",
  "DEDUP_WINDOW_MS",
  "createHash(\"sha256\")"
]);

requireSnippets("apps/site-next/app/api/contact/route.ts", [
  "guardIntakeRequest",
  "website?: unknown",
  "supabaseConfigured",
  "statusModel: [\"new\", \"reviewed\"]",
  "message_too_short",
  "retentionUntil"
]);

requireSnippets("apps/site-next/app/api/briefs/route.ts", [
  "guardIntakeRequest",
  "website?: unknown",
  "supabaseConfigured",
  "statusModel: [\"new\", \"reviewed\"]",
  "invalid_brief_payload",
  "retentionUntil"
]);

requireSnippets("apps/site-next/app/api/cleanup/route.ts", [
  "CRON_SECRET",
  "retentionDays: 90",
  "cleanupSupabase",
  "retention_until=lt."
]);

const briefFormSource = read("apps/site-next/components/brief-intake-form.tsx");
for (const snippet of ["name=\"website\"", "className=\"honeypot-field\"", "minLength={12}"]) {
  if (!briefFormSource.includes(snippet)) {
    errors.push(`apps/site-next/components/brief-intake-form.tsx missing anti-abuse form guard: ${snippet}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Intake guardrails check passed: abuse protection, retention and cleanup guardrails are complete.");
