import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

const requiredFiles = [
  "apps/site-next/app/manifest.ts",
  "apps/site-next/public/apple-touch-icon.png",
  "apps/site-next/public/icon-192.png",
  "apps/site-next/public/icon-512.png",
  "apps/site-next/app/case-study-builder/page.tsx",
  "apps/site-next/app/portfolio-os/page.tsx",
  "apps/site-next/app/connector-console/page.tsx",
  "apps/site-next/app/cloud-environment/page.tsx",
  "apps/site-next/app/server-handoff/page.tsx",
  "apps/site-next/app/studio-crm/page.tsx",
  "apps/site-next/app/brief-triage/page.tsx",
  "apps/site-next/app/publishing-console/page.tsx",
  "apps/site-next/app/security-posture/page.tsx",
  "apps/site-next/app/compatibility/page.tsx",
  "apps/site-next/app/platform-adapters/page.tsx",
  "apps/site-next/app/motion/page.tsx",
  "apps/site-next/app/motion-presets/page.tsx",
  "apps/site-next/app/os/page.tsx",
  "apps/site-next/app/cv/page.tsx",
  "apps/site-next/app/readiness/page.tsx",
  "apps/site-next/app/api/platform-compatibility/route.ts",
  "apps/site-next/app/api/platform-adapters/route.ts",
  "apps/site-next/app/api/security-posture/route.ts",
  "apps/site-next/app/api/supreme-os/route.ts",
  "apps/site-next/app/api/case-study-builder/route.ts",
  "apps/site-next/app/api/portfolio-os/route.ts",
  "apps/site-next/app/api/connector-console/route.ts",
  "apps/site-next/app/api/cloud-environment/route.ts",
  "apps/site-next/app/api/server-handoff/route.ts",
  "apps/site-next/app/api/studio-crm/route.ts",
  "apps/site-next/app/api/brief-triage/route.ts",
  "apps/site-next/app/api/publishing-console/route.ts",
  "apps/site-next/app/api/cleanup/route.ts",
  "apps/site-next/app/api/site-readiness/route.ts"
];

const requiredSitemapRoutes = [
  "/portfolio",
  "/portfolio-os",
  "/connector-console",
  "/cloud-environment",
  "/server-handoff",
  "/studio-crm",
  "/brief-triage",
  "/publishing-console",
  "/security-posture",
  "/case-study-builder",
  "/drawings",
  "/lab",
  "/design-system",
  "/motion",
  "/motion-presets",
  "/os",
  "/compatibility",
  "/platform-adapters",
  "/cv",
  "/readiness",
  "/contact"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    errors.push(`Missing route contract file: ${file}`);
  }
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

const sitemapSource = read("apps/site-next/app/sitemap.ts");
for (const route of requiredSitemapRoutes) {
  if (!sitemapSource.includes(`"${route}"`)) {
    errors.push(`Missing sitemap route: ${route}`);
  }
}

const proxySource = read("apps/site-next/proxy.ts");
if (!proxySource.includes("LEGACY_LANG_GRACE_END")) {
  errors.push("Locale proxy must keep the legacy ?lang= grace window visible.");
}
if (!proxySource.includes("x-robots-tag") || !proxySource.includes("/ops") || !proxySource.includes("/runtime")) {
  errors.push("Locale proxy must apply technical noindex to /ops and /runtime.");
}

const layoutSource = read("apps/site-next/app/layout.tsx");
for (const requiredSnippet of ["manifest: \"/manifest.webmanifest\"", "appleWebApp", "formatDetection", "viewportFit: \"cover\""]) {
  if (!layoutSource.includes(requiredSnippet)) {
    errors.push(`Missing platform metadata snippet: ${requiredSnippet}`);
  }
}

const digitalLabApiSource = read("apps/site-next/app/api/digital-lab/route.ts");
for (const requiredSnippet of ["resolveLocale", "searchParams.get(\"locale\")", "counts"]) {
  if (!digitalLabApiSource.includes(requiredSnippet)) {
    errors.push(`Digital Lab API must expose locale-aware integration metadata: ${requiredSnippet}`);
  }
}
if (!layoutSource.includes("apple: \"/apple-touch-icon.png\"")) {
  errors.push("Apple metadata must point to the PNG touch icon.");
}

const manifestSource = read("apps/site-next/app/manifest.ts");
for (const requiredSnippet of ["/icon-192.png", "/icon-512.png", "/apple-touch-icon.png", "display: \"standalone\""]) {
  if (!manifestSource.includes(requiredSnippet)) {
    errors.push(`Manifest missing platform asset or mode: ${requiredSnippet}`);
  }
}

const globalsSource = read("apps/site-next/app/globals.css");
for (const requiredSnippet of ["--safe-top", "--safe-bottom", "safe-area-inset-top", "safe-area-inset-bottom"]) {
  if (!globalsSource.includes(requiredSnippet)) {
    errors.push(`Global CSS missing safe-area guard: ${requiredSnippet}`);
  }
}

const siteShellSource = read("apps/site-next/components/site-shell.tsx");
if (siteShellSource.includes("href={`/portfolio/${work.id}`}")) {
  errors.push("Home work links must use locale-aware portfolio paths.");
}
if (!siteShellSource.includes("\"/design-system\", \"navDesign\"")) {
  errors.push("Home navigation must expose the design system route.");
}
if (!siteShellSource.includes("\"/readiness\", \"navReadiness\"")) {
  errors.push("Home navigation must expose the readiness route.");
}
if (!siteShellSource.includes("\"/motion-presets\", \"navMotionPresets\"")) {
  errors.push("Home navigation must expose the motion preset editor route.");
}
if (!siteShellSource.includes("\"/case-study-builder\", \"navCaseStudyBuilder\"")) {
  errors.push("Home navigation must expose the case study builder route.");
}
if (!siteShellSource.includes("\"/portfolio-os\", \"navPortfolioOs\"")) {
  errors.push("Home navigation must expose the Portfolio OS route.");
}
if (!siteShellSource.includes("\"/platform-adapters\", \"navPlatformAdapters\"")) {
  errors.push("Home navigation must expose the platform adapters route.");
}
if (!siteShellSource.includes("\"/security-posture\", \"navSecurityPosture\"")) {
  errors.push("Home navigation must expose the security posture route.");
}
if (!siteShellSource.includes("\"/connector-console\", \"navConnectorConsole\"")) {
  errors.push("Home navigation must expose the connector console route.");
}
if (!siteShellSource.includes("\"/cloud-environment\", \"navCloudEnvironment\"")) {
  errors.push("Home navigation must expose the cloud environment route.");
}
if (!siteShellSource.includes("\"/server-handoff\", \"navServerHandoff\"")) {
  errors.push("Home navigation must expose the server handoff route.");
}
if (!siteShellSource.includes("\"/studio-crm\", \"navStudioCrm\"")) {
  errors.push("Home navigation must expose the Studio CRM route.");
}
if (!siteShellSource.includes("\"/brief-triage\", \"navBriefTriage\"")) {
  errors.push("Home navigation must expose the brief triage route.");
}
if (!siteShellSource.includes("\"/publishing-console\", \"navPublishingConsole\"")) {
  errors.push("Home navigation must expose the publishing console route.");
}
const portfolioIndexSource = read("apps/site-next/components/portfolio-index.tsx");
if (!portfolioIndexSource.includes("resolvePortfolioHref") || !portfolioIndexSource.includes("withLocalePath")) {
  errors.push("Portfolio index must localize internal links.");
}

const pageSurfaceSource = read("apps/site-next/components/page-surface.tsx");
for (const requiredSnippet of ["\"drawing-archive\": withLocalePath(locale, \"/drawings\")", "\"cinematic-web\": withLocalePath(locale, \"/motion\")"]) {
  if (!pageSurfaceSource.includes(requiredSnippet)) {
    errors.push(`Portfolio collection route map missing: ${requiredSnippet}`);
  }
}
if (!pageSurfaceSource.includes("\"/readiness\", \"navReadiness\"")) {
  errors.push("Page navigation must expose the readiness route.");
}
if (!pageSurfaceSource.includes("\"/motion-presets\", \"navMotionPresets\"")) {
  errors.push("Page navigation must expose the motion preset editor route.");
}
if (!pageSurfaceSource.includes("\"/case-study-builder\", \"navCaseStudyBuilder\"")) {
  errors.push("Page navigation must expose the case study builder route.");
}
if (!pageSurfaceSource.includes("\"/portfolio-os\", \"navPortfolioOs\"")) {
  errors.push("Page navigation must expose the Portfolio OS route.");
}
if (!pageSurfaceSource.includes("\"/platform-adapters\", \"navPlatformAdapters\"")) {
  errors.push("Page navigation must expose the platform adapters route.");
}
if (!pageSurfaceSource.includes("\"/security-posture\", \"navSecurityPosture\"")) {
  errors.push("Page navigation must expose the security posture route.");
}
if (!pageSurfaceSource.includes("\"/connector-console\", \"navConnectorConsole\"")) {
  errors.push("Page navigation must expose the connector console route.");
}
if (!pageSurfaceSource.includes("\"/cloud-environment\", \"navCloudEnvironment\"")) {
  errors.push("Page navigation must expose the cloud environment route.");
}
if (!pageSurfaceSource.includes("\"/server-handoff\", \"navServerHandoff\"")) {
  errors.push("Page navigation must expose the server handoff route.");
}
if (!pageSurfaceSource.includes("\"/studio-crm\", \"navStudioCrm\"")) {
  errors.push("Page navigation must expose the Studio CRM route.");
}
if (!pageSurfaceSource.includes("\"/brief-triage\", \"navBriefTriage\"")) {
  errors.push("Page navigation must expose the brief triage route.");
}
if (!pageSurfaceSource.includes("\"/publishing-console\", \"navPublishingConsole\"")) {
  errors.push("Page navigation must expose the publishing console route.");
}
const localizedMetadataPages = [
  "apps/site-next/app/portfolio/page.tsx",
  "apps/site-next/app/drawings/page.tsx",
  "apps/site-next/app/contact/page.tsx",
  "apps/site-next/app/portfolio-os/page.tsx",
  "apps/site-next/app/connector-console/page.tsx",
  "apps/site-next/app/cloud-environment/page.tsx",
  "apps/site-next/app/server-handoff/page.tsx",
  "apps/site-next/app/studio-crm/page.tsx",
  "apps/site-next/app/brief-triage/page.tsx",
  "apps/site-next/app/publishing-console/page.tsx",
  "apps/site-next/app/security-posture/page.tsx",
  "apps/site-next/app/platform-adapters/page.tsx",
  "apps/site-next/app/case-study-builder/page.tsx",
  "apps/site-next/app/lab/page.tsx",
  "apps/site-next/app/design-system/page.tsx",
  "apps/site-next/app/motion-presets/page.tsx",
  "apps/site-next/app/readiness/page.tsx"
];

for (const file of localizedMetadataPages) {
  const source = read(file);
  if (!source.includes("getDictionary(locale)") || source.includes('title: "')) {
    errors.push(`Public page metadata must stay locale-aware: ${file}`);
  }
}

const standalonePublicPages = [
  "apps/site-next/app/design-system/page.tsx",
  "apps/site-next/app/portfolio-os/page.tsx",
  "apps/site-next/app/connector-console/page.tsx",
  "apps/site-next/app/cloud-environment/page.tsx",
  "apps/site-next/app/server-handoff/page.tsx",
  "apps/site-next/app/studio-crm/page.tsx",
  "apps/site-next/app/brief-triage/page.tsx",
  "apps/site-next/app/publishing-console/page.tsx",
  "apps/site-next/app/security-posture/page.tsx",
  "apps/site-next/app/platform-adapters/page.tsx",
  "apps/site-next/app/case-study-builder/page.tsx",
  "apps/site-next/app/motion/page.tsx",
  "apps/site-next/app/motion-presets/page.tsx",
  "apps/site-next/app/os/page.tsx",
  "apps/site-next/app/compatibility/page.tsx",
  "apps/site-next/app/cv/page.tsx",
  "apps/site-next/app/readiness/page.tsx"
];

for (const file of standalonePublicPages) {
  if (!read(file).includes("skip-link")) {
    errors.push(`Standalone public page must keep a skip link: ${file}`);
  }
}

const readinessPageSource = read("apps/site-next/app/readiness/page.tsx");
for (const requiredSnippet of ["readinessDecision", "readiness-decision", "readinessDecision.watchlist", "readinessDecision.rollbackCue"]) {
  if (!readinessPageSource.includes(requiredSnippet)) {
    errors.push(`Readiness page must expose launch decision snippet: ${requiredSnippet}`);
  }
}

const osPageSource = read("apps/site-next/app/os/page.tsx");
for (const requiredSnippet of ["dict.osEngineTitle", "dict.osEngineLead", "engineModeLabels[node.mode]"]) {
  if (!osPageSource.includes(requiredSnippet)) {
    errors.push(`SEIS OS page must keep locale-aware engine copy: ${requiredSnippet}`);
  }
}
if (osPageSource.includes("Omni Engine Control Layer")) {
  errors.push("SEIS OS page must not hardcode Omni Engine title text.");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Route contract check passed: locale routes, metadata and key internal links are guarded.");
