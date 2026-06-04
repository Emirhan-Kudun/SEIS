export type CaseStudyBuilderStage = {
  id: "context" | "evidence" | "system" | "outcome";
  label: string;
  purpose: string;
  prompt: string;
};

export type CaseStudyBuilderTemplate = {
  id: string;
  title: string;
  bestFor: string;
  structure: string[];
};

export const caseStudyBuilderStages: CaseStudyBuilderStage[] = [
  {
    id: "context",
    label: "Context",
    purpose: "Clarify audience, problem, role and constraints before visual proof appears.",
    prompt: "What had to become clearer, calmer or more premium for the viewer?"
  },
  {
    id: "evidence",
    label: "Evidence",
    purpose: "Select Behance visuals, drawings, motion frames or interface states that prove the direction.",
    prompt: "Which artifacts show the strongest design decision rather than just decoration?"
  },
  {
    id: "system",
    label: "System",
    purpose: "Explain typography, hierarchy, grid, motion, accessibility and performance choices.",
    prompt: "Which reusable system rule would make the next project faster or more consistent?"
  },
  {
    id: "outcome",
    label: "Outcome",
    purpose: "Close with impact, learning, next iteration and a clear contact path.",
    prompt: "What changed for the brand, product, viewer or workflow after this work?"
  }
];

export const caseStudyBuilderTemplates: CaseStudyBuilderTemplate[] = [
  {
    id: "brand-editorial",
    title: "Brand and editorial case study",
    bestFor: "Identity, layout systems, publication rhythm and premium visual direction.",
    structure: ["problem", "visual language", "typography", "applications", "outcome"]
  },
  {
    id: "portfolio-gallery",
    title: "Portfolio gallery case study",
    bestFor: "Behance collections, drawings, photography and curated visual archives.",
    structure: ["curation logic", "selection rules", "gallery rhythm", "proof", "next collection"]
  },
  {
    id: "motion-interface",
    title: "Motion and interface case study",
    bestFor: "3D scenes, UI/UX flows, motion presets and interaction prototypes.",
    structure: ["intent", "scene mode", "runtime budget", "fallback", "learning"]
  }
];
