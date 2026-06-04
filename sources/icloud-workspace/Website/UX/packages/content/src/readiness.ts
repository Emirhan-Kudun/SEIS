export type ReadinessStatus = "passing" | "watch" | "planned";

export type ReadinessGate = {
  id: string;
  label: string;
  area: string;
  status: ReadinessStatus;
  signal: string;
  proof: string[];
};

export type ReadinessSmokeRoute = {
  id: string;
  path: string;
  surface: "public" | "motion" | "intake" | "quality";
  expectation: string;
};

export type ReadinessFeature = {
  id: string;
  label: string;
  surface: string;
  value: string;
};

export type ReadinessDecision = {
  status: "ready" | "watch" | "blocked";
  label: string;
  signal: string;
  watchlist: string[];
  rollbackCue: string;
};

export const readinessGates: ReadinessGate[] = [
  {
    id: "content",
    label: "Content integrity",
    area: "Portfolio",
    status: "passing",
    signal: "39 Behance embeds, 5 locales and placeholder parity are guarded.",
    proof: ["check:content", "39 embeds", "locale parity"]
  },
  {
    id: "locale",
    label: "Locale routing",
    area: "International SEO",
    status: "passing",
    signal: "Locale prefixes, legacy lang redirects and hreflang map are guarded.",
    proof: ["check:locale-map", "301 grace", "x-default"]
  },
  {
    id: "api",
    label: "API contracts",
    area: "Runtime",
    status: "passing",
    signal: "Public and runtime API routes expose explicit dynamic GET contracts.",
    proof: ["check:api-contract", "method guards", "node runtime"]
  },
  {
    id: "ai-workflow",
    label: "AI workflow policy",
    area: "Automation",
    status: "passing",
    signal: "Lovable remains the preferred prototype builder and suspended builder references are blocked by policy checks.",
    proof: ["check:ai-workflow-policy", "preferredPrototypeBuilder", "suspended refs blocked"]
  },
  {
    id: "intake",
    label: "Brief intake safety",
    area: "Contact",
    status: "passing",
    signal: "Honeypot, rate limit, dedup, retention and cleanup guards are active.",
    proof: ["check:intake-guardrails", "90 day retention", "local fallback"]
  },
  {
    id: "a11y",
    label: "Accessibility baseline",
    area: "Interface",
    status: "passing",
    signal: "Skip links, focus states, labels and polite status regions are guarded.",
    proof: ["check:a11y-smoke", "focus-visible", "reduced motion"]
  },
  {
    id: "motion",
    label: "Motion safety",
    area: "3D",
    status: "passing",
    signal: "WebGL scenes use low-power, viewport pause and cleanup guardrails.",
    proof: ["check:motion-guardrails", "DPR cap", "observer cleanup"]
  },
  {
    id: "platform",
    label: "Platform readiness",
    area: "PWA",
    status: "passing",
    signal: "Manifest, PNG icons, safe areas and platform compatibility matrix are guarded.",
    proof: ["check:platform-compatibility", "apple-touch-icon", "viewport-fit"]
  },
  {
    id: "budget",
    label: "Performance budget",
    area: "Delivery",
    status: "passing",
    signal: "First-view image transfer and gzip JS budgets are reported after build.",
    proof: ["report:budgets", "image budget", "gzip JS"]
  }
];

export const readinessSmokeRoutes: ReadinessSmokeRoute[] = [
  { id: "home", path: "/", surface: "public", expectation: "portfolio hero and locale redirect work" },
  { id: "portfolio", path: "/portfolio", surface: "public", expectation: "full Behance and portfolio index render" },
  { id: "portfolio-os", path: "/portfolio-os", surface: "quality", expectation: "portfolio operating dashboard and API CTA render" },
  { id: "studio-crm", path: "/studio-crm", surface: "intake", expectation: "CRM-lite lanes, signals and contact CTA render" },
  { id: "brief-triage", path: "/brief-triage", surface: "intake", expectation: "brief scoring rules and action buckets render" },
  { id: "connector-console", path: "/connector-console", surface: "quality", expectation: "connector, skill and MCP readiness inventory render" },
  { id: "platform-adapters", path: "/platform-adapters", surface: "quality", expectation: "platform adapter contracts and release handoffs render" },
  { id: "cloud-environment", path: "/cloud-environment", surface: "quality", expectation: "cloud, server and environment variable contracts render" },
  { id: "server-handoff", path: "/server-handoff", surface: "quality", expectation: "server dry-run, fallback artifact and rollback contracts render" },
  { id: "security-posture", path: "/security-posture", surface: "quality", expectation: "GitHub, scanning, dependency and secret-hygiene signals render" },
  { id: "publishing-console", path: "/publishing-console", surface: "quality", expectation: "publishing targets, archive flow and auth blockers render" },
  { id: "case-study-builder", path: "/case-study-builder", surface: "public", expectation: "case-study stages and templates render" },
  { id: "motion", path: "/motion", surface: "motion", expectation: "3D scene fallback and language matrix render" },
  { id: "motion-presets", path: "/motion-presets", surface: "motion", expectation: "scene preset registry and API CTA render" },
  { id: "compatibility", path: "/compatibility", surface: "quality", expectation: "platform matrix and device rules render" },
  { id: "readiness", path: "/readiness", surface: "quality", expectation: "quality gates and smoke matrix render" },
  { id: "cv", path: "/cv", surface: "public", expectation: "experience route and contact CTA render" },
  { id: "contact", path: "/contact", surface: "intake", expectation: "brief form and local fallback contract render" }
];

export const readinessFeatures: ReadinessFeature[] = [
  {
    id: "portfolio-os-dashboard",
    label: "Portfolio OS dashboard",
    surface: "/portfolio-os",
    value: "Portfolio counts, motion signals, readiness smoke routes and runtime summary are visible in one calm control surface."
  },
  {
    id: "studio-crm-lite",
    label: "Studio CRM-lite",
    surface: "/studio-crm",
    value: "Inquiry, discovery, production and launch lanes make client relationship flow visible without adding heavy CRM dependencies."
  },
  {
    id: "brief-triage",
    label: "Brief triage",
    surface: "/brief-triage",
    value: "Incoming briefs are scored through fit, urgency, scope clarity and proof path before a reply or estimate is shaped."
  },
  {
    id: "connector-console",
    label: "Connector console",
    surface: "/connector-console",
    value: "Connector, skill, MCP readiness and archive inventories are visible without randomly invoking every tool."
  },
  {
    id: "platform-adapters",
    label: "Platform adapter hub",
    surface: "/platform-adapters",
    value: "Web, iPhone, Android, desktop and PHP expansion paths are mapped before native code or fallback hosting work begins."
  },
  {
    id: "cloud-environment",
    label: "Cloud environment",
    surface: "/cloud-environment",
    value: "Cloud, server, intake and observability variables are classified before any remote deployment is attempted."
  },
  {
    id: "server-handoff",
    label: "Server handoff",
    surface: "/server-handoff",
    value: "Static fallback, dry-run deploy, live handoff and rollback proof are staged before server mutation."
  },
  {
    id: "security-posture",
    label: "Security posture",
    surface: "/security-posture",
    value: "GitHub protection, code scanning, dependency alerts and secret hygiene stay visible without mixing security debt into UI feature commits."
  },
  {
    id: "publishing-console",
    label: "Publishing console",
    surface: "/publishing-console",
    value: "Local readiness, iCloud bundle exports, GitHub auth blockers and deployment targets are separated before remote publication."
  },
  {
    id: "quality-center",
    label: "Quality center",
    surface: "/readiness",
    value: "Visible gate matrix for launch confidence."
  },
  {
    id: "platform-api",
    label: "Platform API",
    surface: "/api/platform-compatibility",
    value: "Structured compatibility data for future native adapters."
  },
  {
    id: "site-readiness-api",
    label: "Readiness API",
    surface: "/api/site-readiness",
    value: "Machine-readable quality status for automation and release evidence."
  },
  {
    id: "ai-native-policy",
    label: "AI-native policy",
    surface: "/api/digital-lab",
    value: "Lovable preference is explicit and suspended builder references are rejected by repository checks."
  },
  {
    id: "motion-scene-modes",
    label: "Motion scene modes",
    surface: "/motion",
    value: "Calm, editorial, cinematic and experimental scene modes are typed, localized and guardrail-checked."
  },
  {
    id: "runtime-budgets",
    label: "Runtime budgets",
    surface: "/motion",
    value: "WebGL DPR, active scene count, mobile fallback and idle pause limits are visible before heavier 3D work."
  },
  {
    id: "motion-preset-editor",
    label: "Motion preset editor",
    surface: "/motion-presets",
    value: "Scene presets are visible through a calm registry, public UI and API counts before heavier animation work expands."
  },
  {
    id: "case-study-builder",
    label: "Case study builder",
    surface: "/case-study-builder",
    value: "Portfolio work can be structured into context, evidence, system and outcome narratives."
  },
  {
    id: "guarded-intake",
    label: "Guarded intake",
    surface: "/api/briefs",
    value: "Brief capture with abuse protection and Supabase-ready dual write."
  }
];

export const readinessDecision: ReadinessDecision = {
  status: "watch",
  label: "Ready with GitHub auth watchlist",
  signal: "Local quality gates, archive exports and public readiness surfaces are passing; remote publication waits on SSH/GitHub authentication.",
  watchlist: [
    "GitHub SSH auth is required before server push can succeed.",
    "Browser-based accessibility snapshots remain future work until a lightweight runner is intentionally adopted.",
    "Security scanning should stay opt-in until dependency and runtime cost are accepted."
  ],
  rollbackCue: "Use the latest iCloud Git bundle from UX-exports, then rerun npm run checks before any publish attempt."
};
