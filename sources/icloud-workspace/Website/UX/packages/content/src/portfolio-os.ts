export type PortfolioOsPanel = {
  id: "portfolio" | "motion" | "governance" | "publishing";
  title: string;
  signal: string;
  proof: string[];
};

export const portfolioOsPanels: PortfolioOsPanel[] = [
  {
    id: "portfolio",
    title: "Portfolio intelligence",
    signal: "Behance visuals, drawings, selected work and case-study framing stay connected as one editorial portfolio system.",
    proof: ["unified index", "collection routing", "case-study builder"]
  },
  {
    id: "motion",
    title: "Cinematic motion control",
    signal: "Scene modes, presets, reduced-motion fallbacks and runtime budgets define how immersive work can grow safely.",
    proof: ["scene presets", "mobile-safe modes", "reduced-motion contract"]
  },
  {
    id: "governance",
    title: "Launch governance",
    signal: "Readiness gates, smoke routes, API contracts and rollback evidence keep the public website release-safe.",
    proof: ["quality gates", "smoke matrix", "rollback cue"]
  },
  {
    id: "publishing",
    title: "Publishing console",
    signal: "Runtime connectors, deployment targets and iCloud/Git archive flow separate local readiness from remote publication.",
    proof: ["runtime registry", "source archives", "credential-aware deploy"]
  }
];
