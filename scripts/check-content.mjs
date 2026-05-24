import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentPath = path.join(root, "packages/content/src/data.json");
const decisionQuestionsPath = path.join(root, "packages/content/src/decision-questions.json");
const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
const decisionQuestions = JSON.parse(fs.readFileSync(decisionQuestionsPath, "utf8"));
const requiredLocales = ["tr", "en", "fr", "it", "de"];
const requiredDictionaryKeys = [
  "behanceTitle",
  "behanceLead",
  "behanceOpen",
  "languagesTitle",
  "languagesLead",
  "deployTitle",
  "deployLead"
];
const validLanguageStatuses = new Set(["active", "planned"]);

const errors = [];

for (const locale of requiredLocales) {
  if (!content.locales.includes(locale)) {
    errors.push(`Missing locale: ${locale}`);
  }
  if (!content.dictionary[locale]) {
    errors.push(`Missing dictionary: ${locale}`);
    continue;
  }
  for (const key of requiredDictionaryKeys) {
    if (!content.dictionary[locale][key]) {
      errors.push(`Missing dictionary key ${locale}.${key}`);
    }
  }
}

for (const drawing of content.drawings) {
  const rel = drawing.src.replace(/^\//, "");
  const nextAsset = path.join(root, "apps/site-next/public", rel);
  const viteAsset = path.join(root, "apps/site-vite/public", rel);
  if (!fs.existsSync(nextAsset)) errors.push(`Missing Next drawing asset: ${drawing.src}`);
  if (!fs.existsSync(viteAsset)) errors.push(`Missing Vite drawing asset: ${drawing.src}`);
}

if (content.works.length < 3) errors.push("Expected at least 3 works.");
if (content.services.length < 3) errors.push("Expected at least 3 services.");
if (!content.site.email.includes("@")) errors.push("Invalid contact email.");

if (!Array.isArray(content.behanceEmbeds) || content.behanceEmbeds.length < 3) {
  errors.push("Expected at least 3 Behance embed records.");
}

for (const embed of content.behanceEmbeds || []) {
  if (!embed.id || !embed.title || !embed.url || !embed.category || !embed.embedCode) {
    errors.push("Behance embed is missing required fields.");
  }
  if (!embed.url.startsWith("https://www.behance.net/")) {
    errors.push(`${embed.id}: Behance URL must stay on behance.net.`);
  }
  if (!embed.embedCode.includes("<iframe") || !embed.embedCode.includes("sandbox=")) {
    errors.push(`${embed.id}: embedCode must include a sandboxed iframe.`);
  }
}

if (!Array.isArray(content.softwareLanguages) || content.softwareLanguages.length < 8) {
  errors.push("Expected at least 8 software language records.");
}

for (const language of content.softwareLanguages || []) {
  if (!language.id || !language.name || !language.layer || !language.role) {
    errors.push("Software language item is missing required fields.");
  }
  if (!validLanguageStatuses.has(language.status)) {
    errors.push(`${language.id}: invalid software language status ${language.status}`);
  }
}

const decisionQuestionCount = decisionQuestions.reduce((total, group) => total + group.questions.length, 0);
if (decisionQuestionCount !== 100) {
  errors.push(`Expected exactly 100 decision questions, found ${decisionQuestionCount}.`);
}

for (const group of decisionQuestions) {
  if (!group.id || !group.title || !Array.isArray(group.questions) || group.questions.length !== 10) {
    errors.push(`${group.id || "unknown"}: decision question group must have 10 questions.`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Content check passed: ${content.locales.length} locales, ${content.works.length} works, ${content.drawings.length} drawings, ${content.behanceEmbeds.length} Behance embeds, ${content.softwareLanguages.length} software languages, ${decisionQuestionCount} decision questions.`);
