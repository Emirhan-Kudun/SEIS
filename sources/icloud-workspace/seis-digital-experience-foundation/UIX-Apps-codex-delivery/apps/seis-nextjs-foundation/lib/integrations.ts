export type IntegrationReadiness = "ready" | "planned";

export type IntegrationEntry = {
  id: string;
  label: string;
  readiness: IntegrationReadiness;
  notes: string;
  envHint?: string;
};

export const integrationEntries: IntegrationEntry[] = [
  {
    id: "openai",
    label: "OpenAI APIs",
    readiness: "planned",
    notes: "Prepared for assistant workflows, prompt orchestration, and content generation endpoints.",
    envHint: "OPENAI_API_KEY"
  },
  {
    id: "gemini",
    label: "Gemini APIs",
    readiness: "planned",
    notes: "Designed for long-context synthesis and multimodal reasoning expansion.",
    envHint: "GEMINI_API_KEY"
  },
  {
    id: "claude",
    label: "Claude APIs",
    readiness: "planned",
    notes: "Reserved for architecture review and analysis-heavy sidecar workflows.",
    envHint: "CLAUDE_API_KEY"
  },
  {
    id: "supabase",
    label: "Supabase",
    readiness: "ready",
    notes: "Schema and auth integration slots are prepared for incremental adoption.",
    envHint: "SUPABASE_URL"
  },
  {
    id: "firebase",
    label: "Firebase",
    readiness: "ready",
    notes: "Realtime data and cloud messaging hooks can be added without routing rewrites.",
    envHint: "FIREBASE_PROJECT_ID"
  },
  {
    id: "flutter",
    label: "Flutter",
    readiness: "ready",
    notes: "API contracts are designed to support future mobile client parity."
  }
];

export function resolveIntegrationStatus(entry: IntegrationEntry): "configured" | "not-configured" | "n/a" {
  if (!entry.envHint) return "n/a";
  return process.env[entry.envHint] ? "configured" : "not-configured";
}
