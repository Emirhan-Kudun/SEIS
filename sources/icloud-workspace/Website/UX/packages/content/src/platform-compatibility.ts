export type PlatformFamily = "web" | "data" | "mobile" | "desktop" | "wearable";

export type PlatformReadinessStatus = "active" | "planned";

export type PlatformCompatibilityTarget = {
  id: string;
  label: string;
  family: PlatformFamily;
  baseline: string;
  checks: string[];
  status: PlatformReadinessStatus;
};

export type PlatformCompatibilityDevice = {
  id: string;
  label: string;
  viewport: string;
  input: string;
  watchouts: string[];
};

export type PlatformCompatibilityPrinciple = {
  id: string;
  label: string;
  rule: string;
};

export const platformCompatibilityTargets: PlatformCompatibilityTarget[] = [
  {
    id: "html",
    label: "HTML",
    family: "web",
    baseline: "Semantic document structure for portfolio, SEO, keyboard flow and readable fallback states.",
    checks: ["landmarks", "single H1", "link meaning", "no-script tolerance"],
    status: "active"
  },
  {
    id: "css",
    label: "CSS",
    family: "web",
    baseline: "Responsive layout, design tokens, focus states, safe-area spacing and calm visual rhythm.",
    checks: ["fluid grid", "focus-visible", "safe areas", "reduced motion"],
    status: "active"
  },
  {
    id: "javascript",
    label: "JavaScript",
    family: "web",
    baseline: "Progressive enhancement for interaction, motion control and low-power runtime behavior.",
    checks: ["method guards", "event cleanup", "idle pause", "fallback copy"],
    status: "active"
  },
  {
    id: "json",
    label: "JSON",
    family: "data",
    baseline: "Portable content contracts for localization, APIs, platform maps and future app handoff.",
    checks: ["locale parity", "placeholder parity", "schema shape", "stable ids"],
    status: "active"
  },
  {
    id: "android",
    label: "Android",
    family: "mobile",
    baseline: "Chrome Android and future Kotlin lane readiness with touch-first, thermal-aware behavior.",
    checks: ["tap targets", "viewport fit", "PWA metadata", "motion budget"],
    status: "planned"
  },
  {
    id: "ios-iphone",
    label: "iPhone / iOS",
    family: "mobile",
    baseline: "Safari iOS readiness for iPhone, safe areas, reduced motion and premium touch pacing.",
    checks: ["safe-area inset", "tap target", "Safari media", "handoff CTA"],
    status: "planned"
  },
  {
    id: "windows",
    label: "Windows",
    family: "desktop",
    baseline: "Edge and Chrome desktop readiness with keyboard, pointer and high-density screen support.",
    checks: ["keyboard nav", "hover parity", "font rendering", "scroll stability"],
    status: "planned"
  },
  {
    id: "macos",
    label: "macOS",
    family: "desktop",
    baseline: "Safari and Chrome macOS readiness for retina imagery, trackpad motion and color scheme parity.",
    checks: ["retina images", "trackpad pacing", "Safari checks", "color scheme"],
    status: "planned"
  },
  {
    id: "apple-watch",
    label: "Apple Watch",
    family: "wearable",
    baseline: "Low-attention companion planning for reminders, short status surfaces and calm handoff.",
    checks: ["short text", "glanceable state", "notification tone", "handoff"],
    status: "planned"
  }
];

export const platformCompatibilityDevices: PlatformCompatibilityDevice[] = [
  {
    id: "phone",
    label: "Phone",
    viewport: "360-430px first-view",
    input: "touch",
    watchouts: ["drawer clarity", "safe-area spacing", "first-view image budget"]
  },
  {
    id: "tablet",
    label: "Tablet",
    viewport: "768-1024px editorial grid",
    input: "touch + keyboard",
    watchouts: ["two-column collapse", "tap target spacing", "orientation rhythm"]
  },
  {
    id: "desktop",
    label: "Desktop",
    viewport: "1280px+ cinematic canvas",
    input: "keyboard + pointer",
    watchouts: ["focus order", "hover parity", "GPU-safe motion"]
  },
  {
    id: "companion",
    label: "Companion",
    viewport: "watch / notification / glance",
    input: "low-attention",
    watchouts: ["short copy", "actionable status", "no visual overload"]
  }
];

export const platformCompatibilityPrinciples: PlatformCompatibilityPrinciple[] = [
  {
    id: "progressive-enhancement",
    label: "Progressive enhancement",
    rule: "HTML and content must remain useful before advanced motion, native wrappers or 3D scenes load."
  },
  {
    id: "motion-budget",
    label: "Motion budget",
    rule: "Animations stay viewport-active, reduced-motion aware and mobile parallax stays off by default."
  },
  {
    id: "native-lanes",
    label: "Native lanes",
    rule: "Swift, Android, desktop and wearable work starts from documented adapters before production code."
  },
  {
    id: "brand-parity",
    label: "Brand parity",
    rule: "Every platform keeps the same calm typography, hierarchy, CTA language and accessibility baseline."
  }
];
