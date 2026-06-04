export type CapabilityMeshStatus = "active" | "preferred" | "needs_credentials" | "available" | "blocked";
export type CapabilityMeshType = "builder" | "connector" | "skill" | "plugin" | "mcp";

export type CapabilityMeshItem = {
  id: string;
  name: string;
  type: CapabilityMeshType;
  status: CapabilityMeshStatus;
  lane: "product" | "design" | "engineering" | "cloud" | "seo" | "ops" | "content";
  use: string;
  guardrail: string;
};

export const capabilityMeshItems: CapabilityMeshItem[] = [
  {
    id: "lovable-builder",
    name: "Lovable",
    type: "builder",
    status: "preferred",
    lane: "product",
    use: "Preferred AI-native product builder and prototyping surface for SEIS experiments.",
    guardrail: "Use for product prototyping direction; do not replace repository source of truth."
  },
  {
    id: "github-source",
    name: "GitHub",
    type: "connector",
    status: "active",
    lane: "engineering",
    use: "Branch publishing, source recovery, PR governance and code review context.",
    guardrail: "Push only the active branch and keep main protected."
  },
  {
    id: "icloud-archive",
    name: "iCloud Drive GitHub Folder",
    type: "connector",
    status: "active",
    lane: "ops",
    use: "Local-first bundle export and rollback archive for every completed SEIS change.",
    guardrail: "Generate bundles after successful commit/push evidence."
  },
  {
    id: "codex-code-continuation",
    name: "SEIS Code Continuation Automation",
    type: "skill",
    status: "active",
    lane: "engineering",
    use: "Recurring `seis-code-continuation` loop for scoped new code, validation, GitHub push and iCloud export.",
    guardrail: "One reversible improvement per run; missing credentials become blockers instead of retry loops."
  },
  {
    id: "vercel-cloud",
    name: "Vercel",
    type: "connector",
    status: "needs_credentials",
    lane: "cloud",
    use: "Cloud deployment, environment pull, logs and production hosting readiness.",
    guardrail: "Requires Vercel CLI and credentials outside git before deploy."
  },
  {
    id: "supabase-intake",
    name: "Supabase",
    type: "connector",
    status: "needs_credentials",
    lane: "cloud",
    use: "Future server-side brief persistence and structured intake storage.",
    guardrail: "Service role keys must stay server-only."
  },
  {
    id: "figma-system",
    name: "Figma",
    type: "plugin",
    status: "available",
    lane: "design",
    use: "Design-system inspection, future frame handoff and UI architecture alignment.",
    guardrail: "Use only when a Figma file or explicit design sync task exists."
  },
  {
    id: "canva-creative",
    name: "Canva",
    type: "plugin",
    status: "available",
    lane: "content",
    use: "Fast social, presentation and campaign visual adaptation when SEIS needs marketing assets.",
    guardrail: "Do not mix generated campaign assets into source without review."
  },
  {
    id: "adobe-creative",
    name: "Adobe Creative Cloud",
    type: "plugin",
    status: "available",
    lane: "design",
    use: "Image, layout and motion asset workflows that support premium portfolio presentation.",
    guardrail: "Keep source assets separate from optimized web exports."
  },
  {
    id: "semrush-seo",
    name: "Semrush",
    type: "mcp",
    status: "needs_credentials",
    lane: "seo",
    use: "SEO visibility, keyword and competitive intelligence when credentials are configured.",
    guardrail: "Use metrics to guide metadata and content decisions, not to add clutter."
  },
  {
    id: "frontend-design-skill",
    name: "Frontend Design Skill",
    type: "skill",
    status: "active",
    lane: "design",
    use: "Premium UI, spacing, accessibility and responsive interaction polish.",
    guardrail: "Keep motion restrained and reduced-motion aware."
  },
  {
    id: "serena-code-intelligence",
    name: "Serena Code Intelligence",
    type: "mcp",
    status: "active",
    lane: "engineering",
    use: "Low-power codebase navigation and targeted editing support.",
    guardrail: "Prefer targeted reads over repo-wide scans."
  },
  {
    id: "restricted-builder-policy",
    name: "Restricted Builder Policy",
    type: "mcp",
    status: "blocked",
    lane: "ops",
    use: "Protects SEIS from disallowed prototype-builder activation.",
    guardrail: "Use Lovable as the preferred prototype builder and keep blocked builders out of execution paths."
  }
];

export const capabilityMeshSummary = {
  total: capabilityMeshItems.length,
  active: capabilityMeshItems.filter((item) => item.status === "active").length,
  preferred: capabilityMeshItems.filter((item) => item.status === "preferred").length,
  needsCredentials: capabilityMeshItems.filter((item) => item.status === "needs_credentials").length,
  blocked: capabilityMeshItems.filter((item) => item.status === "blocked").length
};
