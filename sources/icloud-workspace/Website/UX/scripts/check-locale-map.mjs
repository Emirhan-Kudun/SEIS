import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const content = JSON.parse(fs.readFileSync(path.join(root, "packages/content/src/data.json"), "utf8"));
const locales = content.locales;
const works = content.works;
const routes = [
  "/",
  "/portfolio",
  "/drawings",
  "/lab",
  "/motion",
  "/os",
  "/compatibility",
  "/cv",
  "/readiness",
  "/design-system",
  "/contact",
  ...works.map((work) => `/portfolio/${work.id}`)
];
const errors = [];

function withLocalePath(locale, route) {
  if (route === "/") return `/${locale}`;
  return `/${locale}${route}`;
}

for (const route of routes) {
  const alternates = locales.reduce((acc, locale) => {
    acc[locale] = withLocalePath(locale, route);
    return acc;
  }, { "x-default": withLocalePath("tr", route) });

  for (const locale of locales) {
    const expected = withLocalePath(locale, route);
    if (alternates[locale] !== expected) {
      errors.push(`${route}: ${locale} alternate expected ${expected}, found ${alternates[locale]}`);
    }
  }

  if (alternates["x-default"] !== withLocalePath("tr", route)) {
    errors.push(`${route}: x-default must point to Turkish default locale.`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Locale link-map check passed: ${routes.length} routes across ${locales.length} locales.`);
