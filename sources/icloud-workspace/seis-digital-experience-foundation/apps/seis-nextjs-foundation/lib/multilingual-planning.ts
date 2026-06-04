import { locales, type Locale } from "@/lib/content";

export type PlanningStatus = "planned" | "approved" | "implemented" | "deferred" | "rejected";
export type PlanningPriority = "critical" | "high" | "medium" | "low";
export type ReleaseRisk = "low" | "medium" | "high";

export type LocaleReadiness = {
  locale: Locale;
  label: string;
  coverage: number;
  mobileRisk: ReleaseRisk;
  seoReady: boolean;
  reviewOwner: string;
  nextAction: string;
};

export type PlanningTrack = {
  id: string;
  title: string;
  status: PlanningStatus;
  priority: PlanningPriority;
  owner: string;
  purpose: string;
  runtimeSurface: "static" | "next" | "api" | "ops" | "shared";
  locales: Locale[];
  gates: string[];
  rollback: string;
};

export type ContentModelField = {
  name: string;
  required: boolean;
  localized: boolean;
  note: string;
};

export type ContentModel = {
  id: string;
  title: string;
  purpose: string;
  publishRule: string;
  fields: ContentModelField[];
};

export type SpatialReadinessPolicy = {
  id: string;
  title: string;
  defaultState: "disabled" | "manual";
  deviceBudget: string;
  reducedMotionBehavior: string;
  activationRules: string[];
};

const localeReadiness: LocaleReadiness[] = [
  {
    locale: "tr",
    label: "Turkish primary source",
    coverage: 100,
    mobileRisk: "low",
    seoReady: true,
    reviewOwner: "brand-content",
    nextAction: "Keep Turkish as the source of truth for narrative changes."
  },
  {
    locale: "en",
    label: "English international baseline",
    coverage: 94,
    mobileRisk: "low",
    seoReady: true,
    reviewOwner: "seo-ops",
    nextAction: "Align all new planning surface metadata with canonical English terms."
  },
  {
    locale: "fr",
    label: "French editorial adaptation",
    coverage: 76,
    mobileRisk: "medium",
    seoReady: false,
    reviewOwner: "ux-writing",
    nextAction: "Shorten long operational labels before route promotion."
  },
  {
    locale: "it",
    label: "Italian product adaptation",
    coverage: 74,
    mobileRisk: "medium",
    seoReady: false,
    reviewOwner: "ux-writing",
    nextAction: "Review tone so labels stay premium without becoming verbose."
  },
  {
    locale: "de",
    label: "German overflow-sensitive adaptation",
    coverage: 68,
    mobileRisk: "high",
    seoReady: false,
    reviewOwner: "i18n-review",
    nextAction: "Run compact-label pass for navigation, cards, and CTA copy."
  }
];

const planningTracks: PlanningTrack[] = [
  {
    id: "static-next-locale-bridge",
    title: "Static to Next locale bridge",
    status: "implemented",
    priority: "critical",
    owner: "platform",
    purpose: "Keep the static ?lang contract and future Next locale routes aligned.",
    runtimeSurface: "shared",
    locales: [...locales],
    gates: ["translation key inventory", "canonical route mapping", "fallback behavior"],
    rollback: "Keep static runtime as public source while Next route remains additive."
  },
  {
    id: "planning-dashboard",
    title: "Multilingual planning dashboard",
    status: "implemented",
    priority: "high",
    owner: "product-ops",
    purpose: "Expose locale, content, gate, and release readiness without running a heavy build.",
    runtimeSurface: "next",
    locales: [...locales],
    gates: ["mobile risk view", "SEO readiness", "content model status", "API parity"],
    rollback: "Remove the route and API without touching static production files."
  },
  {
    id: "content-model-foundation",
    title: "Typed content model foundation",
    status: "implemented",
    priority: "high",
    owner: "content-ops",
    purpose: "Define publish rules for projects, services, insights, and submissions.",
    runtimeSurface: "shared",
    locales: [...locales],
    gates: ["schema stability", "fallback policy", "owner mapping"],
    rollback: "Revert model data only; no database migration is required."
  },
  {
    id: "manual-spatial-preview",
    title: "Manual spatial preview",
    status: "approved",
    priority: "medium",
    owner: "creative-tech",
    purpose: "Allow a lightweight 3D atmosphere preview only after user activation.",
    runtimeSurface: "next",
    locales: ["tr", "en"],
    gates: ["manual activation", "reduced-motion fallback", "low-power WebGL"],
    rollback: "Disable the preview component while keeping content and route intact."
  },
  {
    id: "admin-draft-operations",
    title: "Admin draft operations",
    status: "deferred",
    priority: "medium",
    owner: "ops",
    purpose: "Plan private editing after auth, ownership, and storage policy are explicit.",
    runtimeSurface: "ops",
    locales: [...locales],
    gates: ["auth model", "data retention", "audit log", "permissions"],
    rollback: "No runtime code exists until the gate moves to approved."
  }
];

const contentModels: ContentModel[] = [
  {
    id: "localized-project",
    title: "Localized project",
    purpose: "Case study pages with stable slugs and locale-aware editorial fields.",
    publishRule: "TR and EN are required first; FR/IT/DE require explicit fallback before publish.",
    fields: [
      { name: "slug", required: true, localized: false, note: "Use stable ASCII slugs for long-term redirects." },
      { name: "title", required: true, localized: true, note: "Keep mobile card titles short." },
      { name: "summary", required: true, localized: true, note: "Required for cards, metadata, and search." },
      { name: "process", required: true, localized: true, note: "Editorial process narrative." },
      { name: "outcome", required: true, localized: true, note: "Business or creative result." }
    ]
  },
  {
    id: "service-system",
    title: "Service system",
    purpose: "Reusable service pages and premium offering modules.",
    publishRule: "All five locales required because services are primary conversion content.",
    fields: [
      { name: "name", required: true, localized: true, note: "Short service label." },
      { name: "deliverables", required: true, localized: true, note: "Scannable list, not prose-heavy." },
      { name: "processSteps", required: true, localized: true, note: "3 to 5 predictable steps." },
      { name: "faq", required: false, localized: true, note: "Only for repeated objections." }
    ]
  },
  {
    id: "insight-entry",
    title: "Insight entry",
    purpose: "Editorial knowledge base with SEO-safe metadata.",
    publishRule: "TR source and EN adaptation required; remaining locales can use reviewed fallback.",
    fields: [
      { name: "dek", required: true, localized: true, note: "Short editorial lead." },
      { name: "body", required: true, localized: true, note: "Structured content blocks." },
      { name: "tags", required: true, localized: false, note: "Controlled taxonomy." },
      { name: "seoTitle", required: true, localized: true, note: "Locale-specific metadata." }
    ]
  },
  {
    id: "submission-record",
    title: "Submission record",
    purpose: "Contact and request intake without committing runtime records.",
    publishRule: "Never publish or commit submission data.",
    fields: [
      { name: "locale", required: true, localized: false, note: "Captures user context." },
      { name: "email", required: true, localized: false, note: "Validate server-side." },
      { name: "message", required: true, localized: false, note: "Store outside git." },
      { name: "status", required: true, localized: false, note: "new, reviewed, replied, archived." }
    ]
  }
];

const spatialPolicy: SpatialReadinessPolicy = {
  id: "manual-low-power-spatial-preview",
  title: "Manual low-power spatial preview",
  defaultState: "manual",
  deviceBudget: "No WebGL work runs on initial page load; preview uses low-power renderer settings.",
  reducedMotionBehavior: "Reduced-motion users receive a static atmospheric fallback and no canvas activation.",
  activationRules: [
    "Render only after a button press.",
    "Use low device pixel ratio.",
    "Disable zoom and continuous camera motion.",
    "Keep geometry count tiny.",
    "Keep the static content useful without the preview."
  ]
};

function average(values: number[]): number {
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function countByStatus(status: PlanningStatus): number {
  return planningTracks.filter((track) => track.status === status).length;
}

export function getLocaleReadiness(): LocaleReadiness[] {
  return localeReadiness;
}

export function getPlanningTracks(): PlanningTrack[] {
  return planningTracks;
}

export function getContentModels(): ContentModel[] {
  return contentModels;
}

export function getSpatialReadinessPolicy(): SpatialReadinessPolicy {
  return spatialPolicy;
}

export function getMultilingualPlanningSummary() {
  const averageCoverage = average(localeReadiness.map((item) => item.coverage));
  const seoReadyLocales = localeReadiness.filter((item) => item.seoReady).length;
  const highRiskLocales = localeReadiness.filter((item) => item.mobileRisk === "high").length;
  const implementedTracks = countByStatus("implemented");
  const approvedTracks = countByStatus("approved");
  const releaseReadiness = Math.round(
    averageCoverage * 0.45 +
      (seoReadyLocales / localeReadiness.length) * 100 * 0.2 +
      (implementedTracks / planningTracks.length) * 100 * 0.25 +
      (highRiskLocales === 0 ? 100 : 68) * 0.1
  );

  return {
    locales: localeReadiness.length,
    averageCoverage,
    seoReadyLocales,
    highRiskLocales,
    tracks: planningTracks.length,
    implementedTracks,
    approvedTracks,
    deferredTracks: countByStatus("deferred"),
    contentModels: contentModels.length,
    releaseReadiness,
    releaseRisk: releaseReadiness >= 82 ? "low" : releaseReadiness >= 68 ? "medium" : "high"
  };
}
