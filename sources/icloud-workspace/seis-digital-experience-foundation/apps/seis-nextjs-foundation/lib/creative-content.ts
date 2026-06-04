import { Locale } from "@/lib/content";

type Localized = Record<Locale, string>;
type LocalizedList = Record<Locale, string[]>;

function allLocales(value: string): Localized {
  return {
    tr: value,
    en: value,
    fr: value,
    it: value,
    de: value
  };
}

export type WorkCategory = "ui" | "product" | "brand" | "motion" | "ai";

export type WorkItem = {
  slug: string;
  category: WorkCategory;
  year: string;
  client: string;
  title: string;
  summary: string;
  metrics: string[];
  stack: string[];
  challenge: string;
  execution: string[];
  outcome: string;
};

type LocalizedWorkItem = {
  slug: string;
  category: WorkCategory;
  year: string;
  client: string;
  title: Localized;
  summary: Localized;
  metrics: LocalizedList;
  stack: string[];
  challenge: Localized;
  execution: LocalizedList;
  outcome: Localized;
};

const localizedWorks: LocalizedWorkItem[] = [
  {
    slug: "aurora-saas-command-center",
    category: "product",
    year: "2026",
    client: "Aurora Systems",
    title: allLocales("Aurora SaaS Command Center"),
    summary: allLocales("Reframed a fragmented SaaS dashboard into a cinematic, conversion-driven command center."),
    metrics: {
      tr: ["+34% activation flow completion", "-29% support tickets", "3.1x clearer navigation map"],
      en: ["+34% activation flow completion", "-29% support tickets", "3.1x clearer navigation map"],
      fr: ["+34% activation flow completion", "-29% support tickets", "3.1x clearer navigation map"],
      it: ["+34% activation flow completion", "-29% support tickets", "3.1x clearer navigation map"],
      de: ["+34% activation flow completion", "-29% support tickets", "3.1x clearer navigation map"]
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    challenge: allLocales("Multiple product modules had inconsistent hierarchy and weak visual trust."),
    execution: {
      tr: [
        "IA 3 ana gorev akisina gore yeniden kuruldu.",
        "Widget sistemi token bazli tek card primitive altina alindi.",
        "Dashboard transitions reduced-motion destekli choreograph edildi."
      ],
      en: [
        "Rebuilt IA around three primary task journeys.",
        "Unified widgets under one tokenized card primitive.",
        "Choreographed dashboard transitions with reduced-motion fallbacks."
      ],
      fr: [
        "Rebuilt IA around three primary task journeys.",
        "Unified widgets under one tokenized card primitive.",
        "Choreographed dashboard transitions with reduced-motion fallbacks."
      ],
      it: [
        "Rebuilt IA around three primary task journeys.",
        "Unified widgets under one tokenized card primitive.",
        "Choreographed dashboard transitions with reduced-motion fallbacks."
      ],
      de: [
        "Rebuilt IA around three primary task journeys.",
        "Unified widgets under one tokenized card primitive.",
        "Choreographed dashboard transitions with reduced-motion fallbacks."
      ]
    },
    outcome: allLocales("A stable dashboard system that feels premium, faster, and more trustable at first glance.")
  },
  {
    slug: "atlas-brand-experience",
    category: "brand",
    year: "2026",
    client: "Atlas Creative",
    title: allLocales("Atlas Brand Experience"),
    summary: allLocales("Built an editorial portfolio language with cinematic pacing and high-end whitespace control."),
    metrics: {
      tr: ["+41% portfolio dwell time", "+22% qualified leads", "0 layout regressions on mobile QA"],
      en: ["+41% portfolio dwell time", "+22% qualified leads", "0 layout regressions on mobile QA"],
      fr: ["+41% portfolio dwell time", "+22% qualified leads", "0 layout regressions on mobile QA"],
      it: ["+41% portfolio dwell time", "+22% qualified leads", "0 layout regressions on mobile QA"],
      de: ["+41% portfolio dwell time", "+22% qualified leads", "0 layout regressions on mobile QA"]
    },
    stack: ["Next.js", "GSAP", "Tailwind"],
    challenge: allLocales("The visual identity looked premium in static mocks but collapsed under responsive behavior."),
    execution: {
      tr: [
        "Hero, story ve case akislari icin unified spacing rhythm kuruldu.",
        "Blur, glass ve shadow tokenlari performans limitine gore optimize edildi.",
        "Typography scale mobile-first yeniden kalibre edildi."
      ],
      en: [
        "Established unified spacing rhythm across hero, story, and case flows.",
        "Optimized blur, glass, and shadow tokens against performance budgets.",
        "Recalibrated typography scale mobile-first."
      ],
      fr: [
        "Established unified spacing rhythm across hero, story, and case flows.",
        "Optimized blur, glass, and shadow tokens against performance budgets.",
        "Recalibrated typography scale mobile-first."
      ],
      it: [
        "Established unified spacing rhythm across hero, story, and case flows.",
        "Optimized blur, glass, and shadow tokens against performance budgets.",
        "Recalibrated typography scale mobile-first."
      ],
      de: [
        "Established unified spacing rhythm across hero, story, and case flows.",
        "Optimized blur, glass, and shadow tokens against performance budgets.",
        "Recalibrated typography scale mobile-first."
      ]
    },
    outcome: allLocales("A designer-grade portfolio system with stable rendering and premium emotional tone.")
  },
  {
    slug: "pulse-motion-library",
    category: "motion",
    year: "2026",
    client: "Pulse Interface Lab",
    title: allLocales("Pulse Motion Library"),
    summary: allLocales("Created reusable cinematic motion assets for hero transitions, cards, and micro-feedback loops."),
    metrics: {
      tr: ["42 reusable motion variants", "-18% animation paint cost", "AA reduced-motion coverage"],
      en: ["42 reusable motion variants", "-18% animation paint cost", "AA reduced-motion coverage"],
      fr: ["42 reusable motion variants", "-18% animation paint cost", "AA reduced-motion coverage"],
      it: ["42 reusable motion variants", "-18% animation paint cost", "AA reduced-motion coverage"],
      de: ["42 reusable motion variants", "-18% animation paint cost", "AA reduced-motion coverage"]
    },
    stack: ["Framer Motion", "GSAP", "Motion system docs"],
    challenge: allLocales("Animations looked attractive individually but lacked system-level consistency."),
    execution: {
      tr: [
        "Easing, duration ve reveal pattern library standardize edildi.",
        "Critical vs decorative motion ayrimi yapildi.",
        "Reduced-motion alternatifleri component seviyesinde zorunlu kilindi."
      ],
      en: [
        "Standardized easing, duration, and reveal pattern libraries.",
        "Separated critical and decorative motion layers.",
        "Enforced reduced-motion alternatives at component level."
      ],
      fr: [
        "Standardized easing, duration, and reveal pattern libraries.",
        "Separated critical and decorative motion layers.",
        "Enforced reduced-motion alternatives at component level."
      ],
      it: [
        "Standardized easing, duration, and reveal pattern libraries.",
        "Separated critical and decorative motion layers.",
        "Enforced reduced-motion alternatives at component level."
      ],
      de: [
        "Standardized easing, duration, and reveal pattern libraries.",
        "Separated critical and decorative motion layers.",
        "Enforced reduced-motion alternatives at component level."
      ]
    },
    outcome: allLocales("A motion design system that feels expensive while staying lightweight and reliable.")
  },
  {
    slug: "nova-ai-landing",
    category: "ai",
    year: "2026",
    client: "Nova AI Studio",
    title: allLocales("Nova AI Landing Platform"),
    summary: allLocales("Designed an AI-native landing ecosystem with modular copy blocks and future API integration paths."),
    metrics: {
      tr: ["+27% demo conversion", "<2.0s LCP on mobile", "5-locale scalable copy model"],
      en: ["+27% demo conversion", "<2.0s LCP on mobile", "5-locale scalable copy model"],
      fr: ["+27% demo conversion", "<2.0s LCP on mobile", "5-locale scalable copy model"],
      it: ["+27% demo conversion", "<2.0s LCP on mobile", "5-locale scalable copy model"],
      de: ["+27% demo conversion", "<2.0s LCP on mobile", "5-locale scalable copy model"]
    },
    stack: ["Next.js", "OpenAI-ready backend", "Sentry"],
    challenge: allLocales("The site needed cinematic storytelling without damaging performance or governance safety."),
    execution: {
      tr: [
        "Content model locale-aware sekilde moduller halinde ayrildi.",
        "Conversion CTA noktalarinda trust signal katmani guclendirildi.",
        "Future AI endpoints icin API-ready route contracts eklendi."
      ],
      en: [
        "Split content model into locale-aware modular blocks.",
        "Strengthened trust-signal layers around key conversion CTAs.",
        "Added API-ready route contracts for future AI endpoints."
      ],
      fr: [
        "Split content model into locale-aware modular blocks.",
        "Strengthened trust-signal layers around key conversion CTAs.",
        "Added API-ready route contracts for future AI endpoints."
      ],
      it: [
        "Split content model into locale-aware modular blocks.",
        "Strengthened trust-signal layers around key conversion CTAs.",
        "Added API-ready route contracts for future AI endpoints."
      ],
      de: [
        "Split content model into locale-aware modular blocks.",
        "Strengthened trust-signal layers around key conversion CTAs.",
        "Added API-ready route contracts for future AI endpoints."
      ]
    },
    outcome: allLocales("A future-ready AI product layer that stays cinematic, secure, and production-safe.")
  }
];

export function getWorkItems(locale: Locale): WorkItem[] {
  return localizedWorks.map((item) => ({
    slug: item.slug,
    category: item.category,
    year: item.year,
    client: item.client,
    title: item.title[locale],
    summary: item.summary[locale],
    metrics: item.metrics[locale],
    stack: item.stack,
    challenge: item.challenge[locale],
    execution: item.execution[locale],
    outcome: item.outcome[locale]
  }));
}

export function getWorkBySlug(locale: Locale, slug: string): WorkItem | null {
  return getWorkItems(locale).find((item) => item.slug === slug) ?? null;
}

export function getStaticWorkSlugs(): { slug: string }[] {
  return localizedWorks.map((item) => ({ slug: item.slug }));
}

export type MotionShowcaseItem = {
  id: string;
  name: string;
  detail: string;
  technique: string;
};

const motionShowcaseItems: MotionShowcaseItem[] = [
  {
    id: "hero-reveal",
    name: "Hero Narrative Reveal",
    detail: "Staggered typography reveal synced with gradient depth transitions.",
    technique: "Framer Motion + opacity/transform budget"
  },
  {
    id: "card-resonance",
    name: "Card Resonance Hover",
    detail: "Micro depth response on hover to improve tactile confidence.",
    technique: "GPU-safe transform + border accent"
  },
  {
    id: "scroll-cues",
    name: "Scroll Cue Choreography",
    detail: "Section pacing signals that guide attention without visual noise.",
    technique: "Viewport reveal with reduced-motion fallback"
  },
  {
    id: "menu-transition",
    name: "Navigation Transition Layer",
    detail: "Mobile overlay transitions designed for calm orientation retention.",
    technique: "Opacity ramps + controlled blur"
  }
];

export function getMotionShowcaseItems(): MotionShowcaseItem[] {
  return motionShowcaseItems;
}

export type VisualResearchItem = {
  id: string;
  source: string;
  angle: string;
  translation: string;
};

const visualResearchItems: VisualResearchItem[] = [
  {
    id: "research-01",
    source: "Awwwards / cinematic minimal interfaces",
    angle: "High-contrast focal hierarchy",
    translation: "Applied as tokenized typography ramps with constrained glow usage."
  },
  {
    id: "research-02",
    source: "Linear / Raycast product clarity",
    angle: "Dense information with calm rhythm",
    translation: "Translated to modular cards with strict spacing and interactive restraint."
  },
  {
    id: "research-03",
    source: "Framer / motion-first storytelling",
    angle: "Narrative transitions",
    translation: "Implemented as reusable reveal primitives with accessibility fallbacks."
  },
  {
    id: "research-04",
    source: "Stripe / premium SaaS composition",
    angle: "Layered depth and trust signals",
    translation: "Integrated into service and workflow sections with performance-safe gradients."
  }
];

export function getVisualResearchItems(): VisualResearchItem[] {
  return visualResearchItems;
}

export type CreativeExperiment = {
  id: string;
  name: string;
  status: "active" | "beta" | "planned";
  summary: string;
};

const creativeExperiments: CreativeExperiment[] = [
  {
    id: "exp-01",
    name: "Magnetic CTA System",
    status: "beta",
    summary: "Investigating pointer-aware CTA magnetism with strict motion budgets."
  },
  {
    id: "exp-02",
    name: "Adaptive Hero Mood",
    status: "active",
    summary: "Testing time-of-day gradient shifts without destabilizing readability."
  },
  {
    id: "exp-03",
    name: "AI Prompt Gallery",
    status: "planned",
    summary: "Future showcase mapping design prompts to rendered creative outcomes."
  }
];

export function getCreativeExperiments(): CreativeExperiment[] {
  return creativeExperiments;
}

export type ExperienceItem = {
  id: string;
  period: string;
  role: string;
  summary: string;
};

const experienceItems: ExperienceItem[] = [
  {
    id: "xp-01",
    period: "2026 - Current",
    role: "SEIS Creative Engineering System",
    summary: "Building AI-native portfolio ecosystems with cinematic UI and production-safe fullstack governance."
  },
  {
    id: "xp-02",
    period: "2024 - 2026",
    role: "Senior Frontend + Product Design",
    summary: "Delivered SaaS redesign programs with measurable conversion and accessibility gains."
  },
  {
    id: "xp-03",
    period: "2022 - 2024",
    role: "Creative Developer",
    summary: "Built interactive brand platforms blending motion systems and modular architecture."
  }
];

export function getExperienceItems(): ExperienceItem[] {
  return experienceItems;
}

export type ServiceItem = {
  id: string;
  title: string;
  summary: string;
  deliverables: string[];
};

const serviceItems: ServiceItem[] = [
  {
    id: "svc-01",
    title: "Cinematic Portfolio OS",
    summary: "End-to-end premium portfolio architecture with cinematic storytelling and multilingual foundations.",
    deliverables: ["Design system tokens", "Cinematic section choreography", "SEO + metadata", "Quality gates"]
  },
  {
    id: "svc-02",
    title: "SaaS Product Experience",
    summary: "Conversion-oriented product sites and dashboard frontends with reusable content architecture.",
    deliverables: ["Information architecture", "Reusable UI components", "Analytics hooks", "Performance tuning"]
  },
  {
    id: "svc-03",
    title: "AI Integration Readiness",
    summary: "Future-safe integration mapping for AI, automation, and data systems without bloating the core UX.",
    deliverables: ["API contracts", "Security constraints", "Observability planning", "Rollout roadmap"]
  }
];

export function getServiceItems(): ServiceItem[] {
  return serviceItems;
}

export type ToolGroup = {
  id: string;
  label: string;
  items: string[];
};

const toolGroups: ToolGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SCSS layering"]
  },
  {
    id: "motion",
    label: "Motion",
    items: ["Framer Motion", "GSAP", "Reduced-motion patterns", "Interaction choreography"]
  },
  {
    id: "product",
    label: "Product & Ops",
    items: ["GitHub flow", "Linear issue mapping", "Sentry monitoring", "Rollback-safe release notes"]
  },
  {
    id: "future",
    label: "Future Integrations",
    items: ["OpenAI APIs", "Gemini APIs", "Claude APIs", "Supabase", "Firebase", "Flutter"]
  }
];

export function getToolGroups(): ToolGroup[] {
  return toolGroups;
}

export type SocialItem = {
  id: string;
  label: string;
  href: string;
};

const socialItems: SocialItem[] = [
  { id: "portfolio", label: "MyPortfolio", href: "https://emirhankudun.myportfolio.com" },
  { id: "behance", label: "Behance", href: "https://www.behance.net/emirhankudun" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/emirhankudun" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@emirhankudun" },
  { id: "github", label: "GitHub", href: "https://github.com/emirhankudun-ux" }
];

export function getSocialItems(): SocialItem[] {
  return socialItems;
}
