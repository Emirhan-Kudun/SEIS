export type PlatformAdapterStatus = "ready" | "watch" | "planned";

export type PlatformAdapter = {
  id: "web-pwa" | "ios-swift" | "android-kotlin" | "desktop-tauri" | "php-fallback";
  label: string;
  platform: string;
  status: PlatformAdapterStatus;
  entrypoint: string;
  contract: string;
  handoff: string[];
};

export type PlatformAdapterPrinciple = {
  id: "source-of-truth" | "motion-safety" | "native-parity" | "release-proof";
  label: string;
  rule: string;
};

export const platformAdapters: PlatformAdapter[] = [
  {
    id: "web-pwa",
    label: "Web / PWA",
    platform: "HTML, CSS, JavaScript, JSON",
    status: "ready",
    entrypoint: "/manifest.webmanifest + locale routes",
    contract: "The website remains the canonical public surface and feeds every future adapter through stable content and runtime APIs.",
    handoff: ["manifest icons", "locale-safe routes", "readiness API", "budget report"]
  },
  {
    id: "ios-swift",
    label: "iPhone / SwiftUI",
    platform: "Swift, SwiftUI, Safari iOS",
    status: "planned",
    entrypoint: "/api/portfolio-index + /api/site-readiness",
    contract: "A native reader can consume portfolio, readiness and motion-safe signals before any App Store-specific implementation starts.",
    handoff: ["safe-area rules", "reduced-motion parity", "contact CTA", "offline shortlist"]
  },
  {
    id: "android-kotlin",
    label: "Android / Kotlin",
    platform: "Kotlin, Compose, Chrome Android",
    status: "planned",
    entrypoint: "/api/platform-compatibility + /api/source-archives",
    contract: "Android expansion stays touch-first, thermal-aware and content-driven instead of copying desktop-heavy motion patterns.",
    handoff: ["tap target rules", "mobile motion budget", "PWA fallback", "archive recovery"]
  },
  {
    id: "desktop-tauri",
    label: "macOS / Windows Desktop",
    platform: "Tauri-first desktop shell",
    status: "watch",
    entrypoint: "/api/runtime + /api/publishing-console",
    contract: "Desktop tooling should wrap existing runtime, publishing and archive data without duplicating the website source of truth.",
    handoff: ["local archive access", "keyboard-first shell", "GPU-safe motion", "publish blocker view"]
  },
  {
    id: "php-fallback",
    label: "PHP / Traditional Hosting",
    platform: "PHP, JSON export, static fallback",
    status: "planned",
    entrypoint: "iCloud bundle + JSON content export",
    contract: "A lightweight fallback host can preserve content, contact routing and SEO if modern deployment targets are unavailable.",
    handoff: ["static HTML shell", "content JSON", "contact mailto fallback", "canonical map"]
  }
];

export const platformAdapterPrinciples: PlatformAdapterPrinciple[] = [
  {
    id: "source-of-truth",
    label: "One source of truth",
    rule: "Adapters consume content and runtime APIs; they do not fork portfolio data or localization copy."
  },
  {
    id: "motion-safety",
    label: "Motion safety first",
    rule: "Native and desktop surfaces inherit reduced-motion, low-power and viewport-active animation limits."
  },
  {
    id: "native-parity",
    label: "Native parity",
    rule: "Platform-specific UI may differ, but hierarchy, CTA language and accessibility expectations stay aligned."
  },
  {
    id: "release-proof",
    label: "Release proof",
    rule: "Every adapter needs a visible handoff, rollback path and evidence trail before production adoption."
  }
];
