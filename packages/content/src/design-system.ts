export type DesignPrinciple = {
  id: string;
  title: string;
  summary: string;
  signal: string;
};

export type DesignTokenGroup = {
  id: string;
  label: string;
  values: string[];
};

export const designPrinciples: DesignPrinciple[] = [
  {
    id: "cinematic-minimalism",
    title: "Cinematic minimalism",
    summary: "Large editorial type, quiet contrast, and deliberate negative space carry the identity without visual noise.",
    signal: "The first viewport should feel premium before it explains itself."
  },
  {
    id: "calm-runtime",
    title: "Calm runtime visibility",
    summary: "Operational data is visible, but grouped by readiness so the interface avoids dashboard overload.",
    signal: "Status should reduce uncertainty, not create new work."
  },
  {
    id: "humane-motion",
    title: "Humane motion",
    summary: "Motion stays restrained, reversible, and compatible with reduced-motion preferences.",
    signal: "Animation supports comprehension instead of demanding attention."
  },
  {
    id: "rollback-surface",
    title: "Rollback surface",
    summary: "The static fallback and shared content package keep the system recoverable if the app layer changes.",
    signal: "A premium site should still have a low-dependency exit path."
  }
];

export const designTokenGroups: DesignTokenGroup[] = [
  {
    id: "atmosphere",
    label: "Atmosphere",
    values: ["#090908", "#141311", "#1c1915", "soft grain", "low glow"]
  },
  {
    id: "typography",
    label: "Typography",
    values: ["Cormorant Garamond", "DM Sans", "DM Mono", "large serif rhythm"]
  },
  {
    id: "interaction",
    label: "Interaction",
    values: ["44px targets", "visible focus", "reduced motion", "email-first contact"]
  },
  {
    id: "runtime",
    label: "Runtime",
    values: ["active", "configured", "needs_credentials", "unavailable"]
  }
];
