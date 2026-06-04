export type SupremeOsMode = {
  id: string;
  name: string;
  purpose: string;
  signals: string[];
};

export type SupremeOsCapability = {
  id: string;
  domain: string;
  role: string;
  outcome: string;
  status: "active" | "planned";
};

export type SupremeOsLane = {
  id: string;
  label: string;
  scope: string;
  guardrail: string;
};

export type SupremeOsEngineNode = {
  id: string;
  label: string;
  layer: string;
  mode: "active" | "guarded" | "blocked";
  role: string;
  proof: string[];
};

export const supremeOsModes: SupremeOsMode[] = [
  {
    id: "minimal-system",
    name: "Minimal System Mode",
    purpose: "Typography-led portfolio, editorial and documentation surfaces.",
    signals: ["fast", "readable", "calm", "whitespace-led"]
  },
  {
    id: "cinematic-experience",
    name: "Cinematic Experience Mode",
    purpose: "Immersive portfolio, motion-heavy storytelling and premium visual systems.",
    signals: ["Three.js", "WebGL", "calm motion", "reduced-motion parity"]
  },
  {
    id: "ai-workspace",
    name: "Productivity & AI Workspace Mode",
    purpose: "Dashboards, copilots, workflow systems and automation control rooms.",
    signals: ["structured", "modular", "observable", "efficient"]
  },
  {
    id: "future-systems",
    name: "Experimental Future Systems Mode",
    purpose: "Adaptive layouts, procedural systems, generative environments and future UI concepts.",
    signals: ["experimental", "bounded", "timeboxed", "reversible"]
  }
];

export const supremeOsCapabilities: SupremeOsCapability[] = [
  {
    id: "creative-direction",
    domain: "Creative Direction",
    role: "Branding, typography, editorial systems, visual hierarchy and emotional atmosphere.",
    outcome: "Premium visual language that stays calm and memorable.",
    status: "active"
  },
  {
    id: "frontend-architecture",
    domain: "Frontend Engineering",
    role: "Next.js, React, TypeScript, semantic HTML, CSS systems and responsive UI.",
    outcome: "Production-grade portfolio and product surfaces.",
    status: "active"
  },
  {
    id: "motion-3d",
    domain: "Motion & 3D",
    role: "Three.js, WebGL, cinematic pacing, viewport-active scenes and GPU-safe fallbacks.",
    outcome: "Immersive experiences without sacrificing usability.",
    status: "active"
  },
  {
    id: "backend-cloud",
    domain: "Backend & Cloud",
    role: "Node.js APIs, Supabase dual-write, Vercel readiness, cleanup jobs and local fallback.",
    outcome: "Reliable data capture and deployment preparation.",
    status: "active"
  },
  {
    id: "mobile-desktop",
    domain: "Mobile & Desktop",
    role: "Swift, Android, macOS, Windows, Electron, Tauri and native experience planning.",
    outcome: "Cross-platform expansion without fragmenting the brand system.",
    status: "planned"
  },
  {
    id: "governance-security",
    domain: "Governance & Security",
    role: "Branch safety, rollback plans, content checks, source boundaries and secret hygiene.",
    outcome: "A living repo that remains stable while it grows.",
    status: "active"
  },
  {
    id: "automation-ai",
    domain: "AI Workflow & Automation",
    role: "AI-native workflows, scheduled maintenance, archive generation and release evidence.",
    outcome: "Repeatable operations with low cognitive overhead.",
    status: "planned"
  },
  {
    id: "performance-accessibility",
    domain: "Performance & Accessibility",
    role: "Lighthouse, keyboard flow, reduced motion, SEO metadata, image budgets and smoke checks.",
    outcome: "Premium visuals that remain humane, accessible and fast.",
    status: "active"
  }
];

export const supremeOsLanes: SupremeOsLane[] = [
  {
    id: "portfolio",
    label: "Portfolio Ecosystem",
    scope: "Home, works, Behance, drawings, CV, motion and contact.",
    guardrail: "Every addition must preserve hierarchy, image budget and language parity."
  },
  {
    id: "product",
    label: "Product & AI Workspace",
    scope: "Dashboards, copilots, internal tools, automation panels and workflow systems.",
    guardrail: "Productivity surfaces stay scan-friendly and avoid marketing-page excess."
  },
  {
    id: "platform",
    label: "Multi-Platform Expansion",
    scope: "iOS, Android, macOS, Windows, web, backend and cloud adapters.",
    guardrail: "Native lanes start as documented adapters before production code."
  },
  {
    id: "infrastructure",
    label: "Infrastructure & Governance",
    scope: "GitHub, CI/CD, Vercel, Supabase, rollback, release evidence and security.",
    guardrail: "Main remains deploy-ready; experimental work stays isolated and reversible."
  }
];

export const supremeOsEngineNodes: SupremeOsEngineNode[] = [
  {
    id: "plugins-skills",
    label: "Plugin & Skill Mesh",
    layer: "Capability routing",
    mode: "active",
    role: "1895 local and plugin skills are treated as a governed capability map, not a chaotic always-on bundle.",
    proof: ["skills inventory", "task-matched activation", "low-noise routing"]
  },
  {
    id: "mcp-runtime",
    label: "MCP Runtime Matrix",
    layer: "Connector readiness",
    mode: "active",
    role: "Live MCP readiness is collected into runtime data while archive-only references remain visible for future recovery.",
    proof: ["163 MCP records", "80 live entries", "83 archive refs"]
  },
  {
    id: "automation-loop",
    label: "Automation Loop",
    layer: "Maintenance rhythm",
    mode: "guarded",
    role: "The portfolio continuation automation uses connected tools only when the task, auth and rollback path are clear.",
    proof: ["hourly loop", "xhigh reasoning", "low-power execution"]
  },
  {
    id: "github-publish",
    label: "GitHub Publish Channel",
    layer: "Shipment",
    mode: "blocked",
    role: "The branch is clean and bundled in iCloud; remote push is blocked only by SSH public key authentication.",
    proof: ["iCloud bundle", "clean branch", "publickey blocker"]
  }
];
