export type CloudEnvironmentStatus = "configured" | "needs_credentials" | "active";
export type CloudEnvironmentScope = "public" | "server" | "secret";

export type CloudEnvironmentProfile = {
  id: "local" | "github" | "vercel" | "supabase" | "custom-server" | "observability";
  label: string;
  status: CloudEnvironmentStatus;
  provider: string;
  command: string;
  purpose: string;
  safety: string;
};

export type CloudEnvironmentVariable = {
  key: string;
  scope: CloudEnvironmentScope;
  owner: "site" | "supabase" | "github" | "vercel" | "server" | "observability" | "runtime";
  requiredFor: string[];
  notes: string;
};

export type CloudEnvironmentPrinciple = {
  id: "no-secrets" | "targeted-deploy" | "fallback-first" | "evidence-led";
  label: string;
  rule: string;
};

export const cloudEnvironmentProfiles: CloudEnvironmentProfile[] = [
  {
    id: "local",
    label: "Local SEIS runtime",
    status: "active",
    provider: "local-shell",
    command: "npm run lint && npm run checks",
    purpose: "Validates the portfolio, runtime contracts and release evidence before remote publishing.",
    safety: "No remote mutation and no credential requirement."
  },
  {
    id: "github",
    label: "GitHub source server",
    status: "configured",
    provider: "github",
    command: "npm run github:preflight && npm run github:publish",
    purpose: "Keeps the active Codex branch recoverable on the GitHub server.",
    safety: "Push is branch-scoped, bounded and non-interactive."
  },
  {
    id: "vercel",
    label: "Vercel cloud deploy",
    status: "needs_credentials",
    provider: "vercel",
    command: "vercel env pull --environment=production && vercel deploy --prod",
    purpose: "Hosts the Next.js portfolio with cron cleanup and production environment variables.",
    safety: "Tokens stay in Vercel or local shell; production deploy requires explicit target confirmation."
  },
  {
    id: "supabase",
    label: "Supabase intake database",
    status: "needs_credentials",
    provider: "supabase",
    command: "vercel env add SUPABASE_SERVICE_ROLE_KEY production",
    purpose: "Enables server-only dual-write for brief submissions while preserving local fallback.",
    safety: "Service role keys must never be exposed to client bundles or source files."
  },
  {
    id: "custom-server",
    label: "Custom server fallback",
    status: "needs_credentials",
    provider: "ssh-rsync",
    command: "npm run deploy:static:dry-run",
    purpose: "Publishes static fallback to a chosen server after host, user and path are confirmed.",
    safety: "Dry-run is mandatory before live rsync."
  },
  {
    id: "observability",
    label: "Observability hooks",
    status: "needs_credentials",
    provider: "sentry/rootly",
    command: "vercel env add SENTRY_DSN production",
    purpose: "Keeps incident visibility available without coupling UI work to external dashboards.",
    safety: "Optional until the provider and alert policy are confirmed."
  }
];

export const cloudEnvironmentVariables: CloudEnvironmentVariable[] = [
  { key: "SEIS_RUNTIME_DIR", scope: "server", owner: "runtime", requiredFor: ["local runtime overrides"], notes: "Optional runtime path override for local tooling." },
  { key: "CONTACT_ENDPOINT", scope: "server", owner: "site", requiredFor: ["contact routing"], notes: "Server-side contact endpoint; fallback remains available when unset." },
  { key: "SUPABASE_URL", scope: "server", owner: "supabase", requiredFor: ["brief dual-write"], notes: "Supabase project URL for server-side intake writes." },
  { key: "SUPABASE_SERVICE_ROLE_KEY", scope: "secret", owner: "supabase", requiredFor: ["brief dual-write"], notes: "Server-only key. Never expose to browser bundles." },
  { key: "SUPABASE_BRIEFS_TABLE", scope: "server", owner: "supabase", requiredFor: ["brief dual-write"], notes: "Defaults to brief_submissions." },
  { key: "CRON_SECRET", scope: "secret", owner: "server", requiredFor: ["retention cleanup"], notes: "Bearer secret for cleanup API." },
  { key: "GITHUB_TOKEN", scope: "secret", owner: "github", requiredFor: ["GitHub publish"], notes: "Used only for bounded source publication when needed." },
  { key: "VERCEL_TOKEN", scope: "secret", owner: "vercel", requiredFor: ["Vercel deploy"], notes: "Vercel deploy/auth token." },
  { key: "VERCEL_ORG_ID", scope: "secret", owner: "vercel", requiredFor: ["Vercel deploy"], notes: "Team or account id for Vercel CLI/API." },
  { key: "VERCEL_PROJECT_ID", scope: "secret", owner: "vercel", requiredFor: ["Vercel deploy"], notes: "Project id for Vercel CLI/API." },
  { key: "DEPLOY_HOST", scope: "secret", owner: "server", requiredFor: ["custom server fallback"], notes: "SSH host for static fallback deploy." },
  { key: "DEPLOY_USER", scope: "secret", owner: "server", requiredFor: ["custom server fallback"], notes: "SSH user for static fallback deploy." },
  { key: "DEPLOY_PATH", scope: "secret", owner: "server", requiredFor: ["custom server fallback"], notes: "Remote path for static fallback deploy." },
  { key: "SENTRY_DSN", scope: "server", owner: "observability", requiredFor: ["error monitoring"], notes: "Optional DSN for production monitoring." },
  { key: "ROOTLY_API_TOKEN", scope: "secret", owner: "observability", requiredFor: ["incident workflow"], notes: "Optional incident workflow token; not used by public routes." }
];

export const cloudEnvironmentPrinciples: CloudEnvironmentPrinciple[] = [
  {
    id: "no-secrets",
    label: "No secrets in git",
    rule: "Cloud keys, service-role tokens and server credentials live only in provider secret stores or local shells."
  },
  {
    id: "targeted-deploy",
    label: "Targeted deploy",
    rule: "Vercel and custom server deploys require a named environment, explicit target and green local gates."
  },
  {
    id: "fallback-first",
    label: "Fallback first",
    rule: "Static fallback remains the safest first server handoff because it is dependency-light and reversible."
  },
  {
    id: "evidence-led",
    label: "Evidence-led cloud",
    rule: "Every cloud change should leave command, result, timestamp, bundle and rollback evidence."
  }
];
