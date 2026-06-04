import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function expect(source, pattern, message) {
  if (!pattern.test(source)) {
    errors.push(message);
  }
}

const globalsCss = read("apps/site-next/app/globals.css");
expect(globalsCss, /\.skip-link/, "Global CSS must keep a visible skip-link pattern.");
expect(globalsCss, /:focus-visible/, "Global CSS must define focus-visible states.");
expect(globalsCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)/, "Global CSS must honor reduced-motion preferences.");
expect(globalsCss, /\.sr-only/, "Global CSS must keep a screen-reader-only utility.");

const routePages = [
  "apps/site-next/app/design-system/page.tsx",
  "apps/site-next/app/compatibility/page.tsx",
  "apps/site-next/app/cv/page.tsx",
  "apps/site-next/app/readiness/page.tsx",
  "apps/site-next/app/motion/page.tsx",
  "apps/site-next/app/os/page.tsx",
  "apps/site-next/components/page-surface.tsx",
  "apps/site-next/components/site-shell.tsx"
];

for (const page of routePages) {
  const source = read(page);
  expect(source, /className="skip-link"/, `${page} must expose a skip link.`);
  expect(source, /aria-label=\{.*primaryNavigationLabel.*\}/s, `${page} must label primary navigation.`);
}

const formSource = read("apps/site-next/components/brief-intake-form.tsx");
expect(formSource, /<label[\s>]/, "Brief form must use visible label elements.");
expect(formSource, /<legend className="sr-only"/, "Brief form must keep an accessible fieldset legend.");
expect(formSource, /aria-live="polite"/, "Brief form must announce status updates politely.");

const embedSource = read("apps/site-next/components/behance-embed-panel.tsx");
expect(embedSource, /title=\{`\$\{embed\.title\} live Behance embed`\}/, "Behance iframes must keep descriptive titles.");
expect(embedSource, /aria-live="polite"/, "Behance embed copy status must be announced politely.");

const indexSource = read("apps/site-next/components/portfolio-index.tsx");
expect(indexSource, /aria-pressed=\{activeFilter === filter\.id\}/, "Portfolio filters must expose pressed state.");
expect(indexSource, /type="search"/, "Portfolio search must use a search input type.");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("A11y smoke check passed: skip links, focus states, reduced motion, labels and status regions are guarded.");
