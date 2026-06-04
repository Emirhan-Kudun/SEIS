import type { Locale } from "./index.js";

export type DigitalLabSurface = {
  id: string;
  label: string;
  summary: string;
};

export type DigitalLabCapability = {
  id: string;
  title: string;
  stage: string;
  summary: string;
  signals: string[];
};

export type DigitalLabWorkflowStep = {
  id: string;
  label: string;
  summary: string;
};

export type DigitalLabAudience = {
  id: string;
  name: string;
  need: string;
  labResponse: string;
  deliverables: string[];
};

export type DigitalLabEngagement = {
  id: string;
  title: string;
  pace: string;
  bestFor: string;
  scope: string[];
  qualityGate: string;
};

export type DigitalLabCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  surfacesLabel: string;
  capabilitiesLabel: string;
  workflowLabel: string;
  audiencesLabel: string;
  engagementsLabel: string;
};

const digitalLabCopy: Record<Locale, DigitalLabCopy> = {
  tr: {
    eyebrow: "AI-native UI/UX Digital Lab",
    title: "Portfolyo, urun, uygulama ve deneysel arayuzleri tek sakin sistemde tasarlayan laboratuvar.",
    lead: "SEIS; premium website, SaaS, mobile, desktop, game HUD, dashboard, 3D ve motion-heavy deneyimler icin strateji, prototip, tasarim sistemi ve teslim mantigini ayni okunabilir mimaride birlestirir.",
    surfacesLabel: "Desteklenen yuzeyler",
    capabilitiesLabel: "Sistem kabiliyetleri",
    workflowLabel: "AI-native is akisi",
    audiencesLabel: "Kullanici ve urun senaryolari",
    engagementsLabel: "Calisma modlari"
  },
  en: {
    eyebrow: "AI-native UI/UX Digital Lab",
    title: "A calm system for portfolios, products, apps and experimental interfaces.",
    lead: "SEIS brings strategy, prototyping, design systems and handoff logic into one readable architecture for premium websites, SaaS, mobile, desktop, game HUD, dashboard, 3D and motion-heavy experiences.",
    surfacesLabel: "Supported surfaces",
    capabilitiesLabel: "System capabilities",
    workflowLabel: "AI-native workflow",
    audiencesLabel: "Audience and product scenarios",
    engagementsLabel: "Engagement modes"
  },
  fr: {
    eyebrow: "Laboratoire UI/UX IA-native",
    title: "Un systeme calme pour portfolios, produits, apps et interfaces experimentales.",
    lead: "SEIS relie strategie, prototypage, design systems et logique de livraison pour sites premium, SaaS, mobile, desktop, HUD de jeu, dashboards, 3D et experiences animees.",
    surfacesLabel: "Surfaces supportees",
    capabilitiesLabel: "Capacites systeme",
    workflowLabel: "Flux IA-native",
    audiencesLabel: "Scenarios d'audience et de produit",
    engagementsLabel: "Modes de collaboration"
  },
  it: {
    eyebrow: "Laboratorio UI/UX AI-native",
    title: "Un sistema calmo per portfolio, prodotti, app e interfacce sperimentali.",
    lead: "SEIS unisce strategia, prototipazione, design system e logica di handoff per siti premium, SaaS, mobile, desktop, HUD di gioco, dashboard, 3D ed esperienze animate.",
    surfacesLabel: "Superfici supportate",
    capabilitiesLabel: "Capacita di sistema",
    workflowLabel: "Workflow AI-native",
    audiencesLabel: "Scenari audience e prodotto",
    engagementsLabel: "Modalita di lavoro"
  },
  de: {
    eyebrow: "AI-native UI/UX Digital Lab",
    title: "Ein ruhiges System fur Portfolios, Produkte, Apps und experimentelle Interfaces.",
    lead: "SEIS verbindet Strategie, Prototyping, Designsysteme und Handoff-Logik fur Premium-Websites, SaaS, Mobile, Desktop, Game-HUDs, Dashboards, 3D und motion-starke Erlebnisse.",
    surfacesLabel: "Unterstutzte Oberflachen",
    capabilitiesLabel: "Systemfahigkeiten",
    workflowLabel: "AI-native Workflow",
    audiencesLabel: "Zielgruppen- und Produktszenarien",
    engagementsLabel: "Arbeitsmodi"
  }
};

export const digitalLabSurfaces: DigitalLabSurface[] = [
  {
    id: "portfolio-websites",
    label: "Personal and creative portfolios",
    summary: "Editorial identity, proof of work, case studies, galleries and contact paths stay coherent."
  },
  {
    id: "saas-product-websites",
    label: "SaaS, product websites and web apps",
    summary: "Landing pages, onboarding, product flows and conversion surfaces use one structured UI rhythm."
  },
  {
    id: "mobile-desktop-apps",
    label: "iOS, Android, macOS and Windows interfaces",
    summary: "Native-feeling screens, responsive states and platform-aware controls remain design-system ready."
  },
  {
    id: "dashboards-huds",
    label: "Dashboards and game HUDs",
    summary: "Dense operational data and immersive overlays are organized for scanning, focus and low fatigue."
  },
  {
    id: "motion-3d-experiences",
    label: "3D, motion-heavy and experimental experiences",
    summary: "Cinematic scenes, animated product stories and immersive prototypes stay bounded by performance rules."
  },
  {
    id: "minimal-sites",
    label: "Minimal websites and simple launch surfaces",
    summary: "Small sites keep premium hierarchy, SEO basics and rollback-safe structure without heavy machinery."
  }
];

export const digitalLabCapabilities: DigitalLabCapability[] = [
  {
    id: "product-architecture",
    title: "Product architecture",
    stage: "01 / Clarify",
    summary: "Turn scattered goals into a clear product surface, audience model, content hierarchy and delivery path.",
    signals: ["scope map", "user intent", "launch path"]
  },
  {
    id: "lovable-prototyping",
    title: "AI-native prototyping",
    stage: "02 / Prototype",
    summary: "Use Lovable as the preferred fast product-building surface before hardening the strongest direction in code.",
    signals: ["Lovable draft", "interaction path", "decision record"]
  },
  {
    id: "design-system-strategy",
    title: "Design-system strategy",
    stage: "03 / Systemize",
    summary: "Create reusable tokens, components, layout rules and motion principles that scale across product types.",
    signals: ["tokens", "components", "governance"]
  },
  {
    id: "accessibility-seo-performance",
    title: "Quality and discoverability",
    stage: "04 / Validate",
    summary: "Review accessibility, SEO, responsive behavior, page speed, reduced motion and semantic structure together.",
    signals: ["a11y", "SEO", "performance"]
  }
];

export const digitalLabWorkflow: DigitalLabWorkflowStep[] = [
  {
    id: "intent",
    label: "Intent",
    summary: "Define who the surface serves, what it must prove and which product type it should become."
  },
  {
    id: "prototype",
    label: "Prototype",
    summary: "Explore fast in Lovable, keep the strongest interaction model and discard visual noise early."
  },
  {
    id: "harden",
    label: "Harden",
    summary: "Move the validated direction into accessible, responsive, readable code with minimal dependencies."
  },
  {
    id: "govern",
    label: "Govern",
    summary: "Document decisions, preserve rollback paths and keep future additions modular."
  }
];

export const digitalLabAudiences: DigitalLabAudience[] = [
  {
    id: "founder-launch",
    name: "Founder or product team",
    need: "A launchable product website or SaaS surface that explains value quickly without looking generic.",
    labResponse: "Clarify offer, prototype the landing flow in Lovable, then harden the chosen direction into responsive sections, SEO metadata and reusable UI rules.",
    deliverables: ["positioning map", "landing flow", "conversion sections", "SEO-ready structure"]
  },
  {
    id: "creative-portfolio",
    name: "Designer, artist or studio",
    need: "A premium portfolio that makes real work visible while preserving editorial calm and visual memory.",
    labResponse: "Build a portfolio index, gallery rhythm, case-study path and contact surface that can grow without becoming a crowded archive.",
    deliverables: ["portfolio taxonomy", "gallery system", "case-study shell", "contact path"]
  },
  {
    id: "app-interface",
    name: "Mobile or desktop app builder",
    need: "A coherent interface direction for iOS, Android, macOS, Windows or cross-platform product screens.",
    labResponse: "Shape information architecture, core screens, component states and platform-aware interaction rules before production implementation.",
    deliverables: ["screen map", "component states", "responsive rules", "handoff notes"]
  },
  {
    id: "immersive-experience",
    name: "Experimental brand or game team",
    need: "A cinematic 3D, motion-heavy or HUD-style interface that feels immersive without exhausting attention.",
    labResponse: "Define motion boundaries, reduced-motion parity, performance budgets and readable overlays before deep animation work begins.",
    deliverables: ["motion rules", "HUD hierarchy", "performance budget", "fallback model"]
  }
];

export const digitalLabEngagements: DigitalLabEngagement[] = [
  {
    id: "prototype-sprint",
    title: "Prototype sprint",
    pace: "Fast direction",
    bestFor: "Early ideas, Lovable exploration, product positioning and investor/demo surfaces.",
    scope: ["intent brief", "Lovable prototype path", "hero and flow direction", "decision notes"],
    qualityGate: "The prototype must prove hierarchy, audience fit and interaction rhythm before code hardening."
  },
  {
    id: "launch-system",
    title: "Launch system",
    pace: "Structured build",
    bestFor: "Premium portfolio, SaaS landing page, product website or service launch.",
    scope: ["content model", "responsive sections", "SEO metadata", "contact or intake path"],
    qualityGate: "The launch surface must pass responsive, accessibility, SEO and rollback checks."
  },
  {
    id: "interface-system",
    title: "Interface system",
    pace: "Product depth",
    bestFor: "Mobile apps, desktop tools, dashboards, operational products and repeated workflows.",
    scope: ["screen architecture", "component states", "empty/error/loading states", "design-system notes"],
    qualityGate: "The interface must support repeated use without cognitive overload or unclear action paths."
  },
  {
    id: "immersive-system",
    title: "Immersive system",
    pace: "Cinematic refinement",
    bestFor: "3D, motion-heavy, game HUD, creative technology or experimental brand experiences.",
    scope: ["motion model", "scene hierarchy", "reduced-motion parity", "performance budget"],
    qualityGate: "The experience must remain readable, GPU-conscious and usable without the animated layer."
  }
];

export function getDigitalLabCopy(locale: Locale): DigitalLabCopy {
  return digitalLabCopy[locale] ?? digitalLabCopy.tr;
}
