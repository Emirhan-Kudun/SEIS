import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentPath = path.join(root, "packages/content/src/data.json");
const decisionQuestionsPath = path.join(root, "packages/content/src/decision-questions.json");
const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
const polyglotSource = fs.readFileSync(path.join(root, "packages/content/src/polyglot-github.ts"), "utf8");
const capabilityMeshSource = fs.readFileSync(path.join(root, "packages/content/src/capability-mesh.ts"), "utf8");
const decisionQuestions = JSON.parse(fs.readFileSync(decisionQuestionsPath, "utf8"));
const requiredLocales = ["tr", "en", "fr", "it", "de"];
const requiredDictionaryKeys = [
  "behanceTitle",
  "behanceLead",
  "behanceOpen",
  "behanceVisualsTitle",
  "behanceVisualsLead",
  "qaTitle",
  "qaLead",
  "socialTitle",
  "navLab",
  "evolutionTitle",
  "evolutionLead",
  "qualityTitle",
  "qualityLead",
  "drawingFilterAll",
  "drawingFilterFeatured",
  "drawingFilterGraphite",
  "drawingFilterColor",
  "drawingArchiveLead",
  "portfolioIndexTitle",
  "portfolioIndexLead",
  "portfolioFilterAll",
  "portfolioFilterFeatured",
  "portfolioFilterBehance",
  "portfolioFilterDrawings",
  "portfolioFilterWork",
  "portfolioSearchLabel",
  "portfolioSearchPlaceholder",
  "primaryNavigationLabel",
  "languageSelectorLabel",
  "brandHomeLabel",
  "heroPanelHighlightsLabel",
  "heroMetricsLabel",
  "portfolioOpenItem",
  "portfolioIndexEmpty",
  "portfolioCollectionsTitle",
  "portfolioCollectionsLead",
  "portfolioCollectionsEyebrow",
  "portfolioCollectionProof",
  "portfolioCollectionOpen",
  "portfolioFlowEyebrow",
  "portfolioFlowTitle",
  "portfolioFlowLead",
  "portfolioFlowBehanceLead",
  "portfolioFlowDrawingsLead",
  "portfolioFlowWorksLead",
  "portfolioFlowAction",
  "portfolioFlowBehanceAction",
  "portfolioFlowDrawingsAction",
  "portfolioFlowWorksAction",
  "portfolioMetricBehance",
  "portfolioMetricDrawings",
  "portfolioMetricWorks",
  "portfolioMetricCollections",
  "portfolioMetricEmbeds",
  "portfolioPageEyebrow",
  "portfolioPageTitle",
  "drawingPageTitle",
  "designSystemEyebrow",
  "designSystemTitle",
  "designSystemLead",
  "designSystemTokenGroup",
  "skipPortfolio",
  "servicesEyebrow",
  "studioEyebrow",
  "portfolioEyebrow",
  "behancePortfolioEyebrow",
  "drawingArchiveEyebrow",
  "contactEyebrow",
  "contactDirectEyebrow",
  "behanceVisualsEyebrow",
  "behanceEmbedEyebrow",
  "portfolioIndexEyebrow",
  "evolutionEyebrow",
  "qualityEyebrow",
  "projectDetailOpen",
  "studioRailLabel",
  "portfolioMotionGalleryLabel",
  "portfolioDrawingHighlightsLabel",
  "featuredDrawingsLabel",
  "portfolioIndexFiltersLabel",
  "portfolioSourceDrawing",
  "portfolioSourceWork",
  "copyEmbed",
  "showMoreEmbeds",
  "showAllEmbeds",
  "embedLoadStatus",
  "copied",
  "copyFailed",
  "externalLinkLabel",
  "qaEyebrow",
  "briefScopePlaceholder",
  "briefTimelinePlaceholder",
  "briefBudgetPlaceholder",
  "briefPriorityCalm",
  "briefPriorityNear",
  "briefPriorityUrgent",
  "skipContent",
  "projectDetailSkip",
  "projectNavigationLabel",
  "projectDetailEyebrow",
  "detailSignalTitle",
  "detailImpactTitle",
  "detailExecutionTitle",
  "detailExecutionLead",
  "startBrief",
  "navExperience",
  "navPortfolioOs",
  "navConnectorConsole",
  "navCloudEnvironment",
  "navServerHandoff",
  "navStudioCrm",
  "navBriefTriage",
  "navPublishingConsole",
  "navCaseStudyBuilder",
  "navMotion",
  "navMotionPresets",
  "navSupremeOs",
  "navCompatibility",
  "navPlatformAdapters",
  "navSecurityPosture",
  "navReadiness",
  "osEyebrow",
  "osTitle",
  "osLead",
  "osModesTitle",
  "osCapabilitiesTitle",
  "osLanesTitle",
  "osGovernanceTitle",
  "osGovernanceLead",
  "motionEyebrow",
  "motionTitle",
  "motionLead",
  "motionSceneLabel",
  "motionModesEyebrow",
  "motionModesTitle",
  "motionModesLead",
  "motionModeCalmLabel",
  "motionModeCalmIntensity",
  "motionModeCalmPurpose",
  "motionModeCalmConstraint",
  "motionModeEditorialLabel",
  "motionModeEditorialIntensity",
  "motionModeEditorialPurpose",
  "motionModeEditorialConstraint",
  "motionModeCinematicLabel",
  "motionModeCinematicIntensity",
  "motionModeCinematicPurpose",
  "motionModeCinematicConstraint",
  "motionModeExperimentalLabel",
  "motionModeExperimentalIntensity",
  "motionModeExperimentalPurpose",
  "motionModeExperimentalConstraint",
  "motionStackTitle",
  "motionStackLead",
  "motionRoadmapTitle",
  "motionRoadmapOne",
  "motionRoadmapTwo",
  "motionRoadmapThree",
  "motionBudgetEyebrow",
  "motionBudgetTitle",
  "motionBudgetLead",
  "motionBudgetStatusActive",
  "motionBudgetStatusGuarded",
  "motionPresetsEyebrow",
  "motionPresetsTitle",
  "motionPresetsLead",
  "motionPresetsMetricPresets",
  "motionPresetsMetricModes",
  "motionPresetsMetricBudgets",
  "motionPresetsMetricMobileSafe",
  "motionPresetsMetricReduced",
  "motionPresetsRegistryEyebrow",
  "motionPresetsRegistryTitle",
  "motionPresetsRegistryLead",
  "motionPresetsGovernanceEyebrow",
  "motionPresetsGovernanceTitle",
  "motionPresetsGovernanceLead",
  "motionPresetsMotionCta",
  "motionPresetsApiCta",
  "portfolioOsEyebrow",
  "portfolioOsTitle",
  "portfolioOsLead",
  "portfolioOsMetricWorks",
  "portfolioOsMetricAssets",
  "portfolioOsMetricRoutes",
  "portfolioOsMetricRuntime",
  "portfolioOsPanelsTitle",
  "portfolioOsPanelsLead",
  "portfolioOsApiCta",
  "portfolioOsReadinessCta",
  "portfolioOsIndexNote",
  "connectorConsoleEyebrow",
  "connectorConsoleTitle",
  "connectorConsoleLead",
  "connectorConsoleMetricConnectors",
  "connectorConsoleMetricSkills",
  "connectorConsoleMetricMcp",
  "connectorConsoleMetricArchives",
  "connectorConsolePanelsTitle",
  "connectorConsolePanelsLead",
  "connectorConsoleRuntimeTitle",
  "connectorConsoleRuntimeLead",
  "connectorConsoleApiCta",
  "connectorConsoleReadinessCta",
  "cloudEnvironmentEyebrow",
  "cloudEnvironmentTitle",
  "cloudEnvironmentLead",
  "cloudEnvironmentMetricProfiles",
  "cloudEnvironmentMetricVariables",
  "cloudEnvironmentMetricSecrets",
  "cloudEnvironmentMetricActivationStages",
  "cloudEnvironmentMetricTargets",
  "cloudEnvironmentProfilesTitle",
  "cloudEnvironmentProfilesLead",
  "cloudEnvironmentActivationEyebrow",
  "cloudEnvironmentActivationTitle",
  "cloudEnvironmentActivationLead",
  "cloudEnvironmentVariablesTitle",
  "cloudEnvironmentVariablesLead",
  "cloudEnvironmentApiCta",
  "cloudEnvironmentPublishingCta",
  "cloudEnvironmentNeedsCredentials",
  "serverHandoffEyebrow",
  "serverHandoffTitle",
  "serverHandoffLead",
  "serverHandoffMetricStages",
  "serverHandoffMetricGuardrails",
  "serverHandoffMetricTargets",
  "serverHandoffMetricBlocked",
  "serverHandoffStagesTitle",
  "serverHandoffStagesLead",
  "serverHandoffGuardrailsTitle",
  "serverHandoffGuardrailsLead",
  "serverHandoffTargetsTitle",
  "serverHandoffTargetsLead",
  "serverHandoffApiCta",
  "serverHandoffCloudCta",
  "serverHandoffArchiveNote",
  "studioCrmEyebrow",
  "studioCrmTitle",
  "studioCrmLead",
  "studioCrmMetricLanes",
  "studioCrmMetricSignals",
  "studioCrmMetricQa",
  "studioCrmMetricServices",
  "studioCrmLanesTitle",
  "studioCrmLanesLead",
  "studioCrmSignalsTitle",
  "studioCrmSignalsLead",
  "studioCrmApiCta",
  "studioCrmContactCta",
  "briefTriageEyebrow",
  "briefTriageTitle",
  "briefTriageLead",
  "briefTriageMetricRules",
  "briefTriageMetricBuckets",
  "briefTriageMetricServices",
  "briefTriageMetricQuestions",
  "briefTriageRulesTitle",
  "briefTriageRulesLead",
  "briefTriageBucketsTitle",
  "briefTriageBucketsLead",
  "briefTriageApiCta",
  "briefTriageContactCta",
  "publishingConsoleEyebrow",
  "publishingConsoleTitle",
  "publishingConsoleLead",
  "publishingConsoleMetricSteps",
  "publishingConsoleMetricTargets",
  "publishingConsoleMetricArchives",
  "publishingConsoleMetricBlocked",
  "publishingConsoleStepsTitle",
  "publishingConsoleStepsLead",
  "publishingConsoleTargetsTitle",
  "publishingConsoleTargetsLead",
  "publishingConsoleApiCta",
  "publishingConsoleReadinessCta",
  "caseStudyBuilderEyebrow",
  "caseStudyBuilderTitle",
  "caseStudyBuilderLead",
  "caseStudyBuilderMetricStages",
  "caseStudyBuilderMetricTemplates",
  "caseStudyBuilderMetricWorks",
  "caseStudyBuilderStagesTitle",
  "caseStudyBuilderStagesLead",
  "caseStudyBuilderTemplatesTitle",
  "caseStudyBuilderTemplatesLead",
  "caseStudyBuilderApiCta",
  "caseStudyBuilderPortfolioCta",
  "compatibilityEyebrow",
  "compatibilityTitle",
  "compatibilityLead",
  "compatibilityMatrixTitle",
  "compatibilityMatrixLead",
  "compatibilityDevicesTitle",
  "compatibilityDevicesLead",
  "compatibilityGovernanceTitle",
  "compatibilityGovernanceLead",
  "platformAdaptersEyebrow",
  "platformAdaptersTitle",
  "platformAdaptersLead",
  "platformAdaptersMetricAdapters",
  "platformAdaptersMetricReady",
  "platformAdaptersMetricPlanned",
  "platformAdaptersMetricArchives",
  "platformAdaptersMapTitle",
  "platformAdaptersMapLead",
  "platformAdaptersGovernanceTitle",
  "platformAdaptersGovernanceLead",
  "platformAdaptersReleaseTitle",
  "platformAdaptersReleaseLead",
  "platformAdaptersApiCta",
  "platformAdaptersCompatibilityCta",
  "securityPostureEyebrow",
  "securityPostureTitle",
  "securityPostureLead",
  "securityPostureMetricSignals",
  "securityPostureMetricWatch",
  "securityPostureMetricPassing",
  "securityPostureSignalsTitle",
  "securityPostureSignalsLead",
  "securityPostureActionsTitle",
  "securityPostureActionsLead",
  "securityPostureApiCta",
  "securityPosturePublishingCta",
  "readinessEyebrow",
  "readinessTitle",
  "readinessLead",
  "readinessGatesTitle",
  "readinessGatesLead",
  "readinessSmokeTitle",
  "readinessSmokeLead",
  "readinessFeaturesTitle",
  "readinessFeaturesLead",
  "readinessApiCta",
  "cvEyebrow",
  "cvTitle",
  "cvLead",
  "cvTimelineTitle",
  "cvSkillsTitle",
  "cvContactCta",
  "cvTimelineOneTitle",
  "cvTimelineOneMeta",
  "cvTimelineOneBody",
  "cvTimelineTwoTitle",
  "cvTimelineTwoMeta",
  "cvTimelineTwoBody",
  "cvTimelineThreeTitle",
  "cvTimelineThreeMeta",
  "cvTimelineThreeBody",
  "cvSkillDesign",
  "cvSkillMotion",
  "cvSkillEngineering",
  "cvSkillGovernance",
  "languagesTitle",
  "languagesLead",
  "deployTitle",
  "deployLead"
];
const validLanguageStatuses = new Set(["active", "planned"]);
const validEvolutionStatuses = new Set(["live", "next", "planned"]);
const validDrawingCategories = new Set(["graphite", "color"]);
const requiredSoftwareLanguageIds = ["html", "css", "javascript", "json", "swift", "android", "php"];

const errors = [];

function placeholders(value) {
  return Array.from(String(value).matchAll(/\{[a-zA-Z0-9_]+\}/g)).map((match) => match[0]).sort();
}

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

const baseDictionary = content.dictionary.tr || {};
for (const locale of requiredLocales.filter((item) => item !== "tr")) {
  for (const [key, value] of Object.entries(baseDictionary)) {
    const basePlaceholders = placeholders(value);
    const localizedPlaceholders = placeholders(content.dictionary[locale]?.[key] || "");
    if (basePlaceholders.join(",") !== localizedPlaceholders.join(",")) {
      errors.push(`Placeholder mismatch ${locale}.${key}: expected ${basePlaceholders.join(",") || "none"}, found ${localizedPlaceholders.join(",") || "none"}`);
    }
  }
}

for (const drawing of content.drawings) {
  const rel = drawing.src.replace(/^\//, "");
  const nextAsset = path.join(root, "apps/site-next/public", rel);
  const viteAsset = path.join(root, "apps/site-vite/public", rel);
  if (!fs.existsSync(nextAsset)) errors.push(`Missing Next drawing asset: ${drawing.src}`);
  if (!fs.existsSync(viteAsset)) errors.push(`Missing Vite drawing asset: ${drawing.src}`);
  if (!validDrawingCategories.has(drawing.category)) {
    errors.push(`${drawing.id}: invalid drawing category ${drawing.category}`);
  }
  if (!drawing.archiveRole || typeof drawing.sortIndex !== "number") {
    errors.push(`${drawing.id}: drawing archiveRole and sortIndex are required.`);
  }
}

if (content.works.length < 3) errors.push("Expected at least 3 works.");
if (content.services.length < 3) errors.push("Expected at least 3 services.");
if (!content.site.email.includes("@")) errors.push("Invalid contact email.");

if (!Array.isArray(content.behanceEmbeds) || content.behanceEmbeds.length !== 39) {
  errors.push(`Expected exactly 39 Behance embed records, found ${content.behanceEmbeds?.length || 0}.`);
}

if (!Array.isArray(content.behanceVisuals) || content.behanceVisuals.length < 6) {
  errors.push("Expected at least 6 Behance visual records.");
}

for (const visual of content.behanceVisuals || []) {
  if (!visual.id || !visual.projectId || !visual.title || !visual.category || !visual.image || !visual.href || !visual.embedUrl || !visual.embedCode) {
    errors.push("Behance visual item is missing required fields.");
  }
  if (!visual.href.startsWith("https://www.behance.net/")) {
    errors.push(`${visual.id}: Behance visual href must stay on behance.net.`);
  }
  if (!visual.embedUrl.startsWith(`https://www.behance.net/embed/project/${visual.projectId}`)) {
    errors.push(`${visual.id}: Behance visual embedUrl must use the official project embed route.`);
  }
  if (!visual.embedCode.includes(visual.embedUrl) || !visual.embedCode.includes("<iframe")) {
    errors.push(`${visual.id}: Behance visual embedCode must include its iframe embedUrl.`);
  }
  if (!visual.image.startsWith("https://mir-s3-cdn-cf.behance.net/")) {
    errors.push(`${visual.id}: Behance visual image must use the Behance CDN.`);
  }
}

for (const embed of content.behanceEmbeds || []) {
  if (!embed.id || !embed.projectId || !embed.title || !embed.url || !embed.embedUrl || !embed.category || !embed.embedCode) {
    errors.push("Behance embed is missing required fields.");
  }
  if (!embed.url.startsWith("https://www.behance.net/")) {
    errors.push(`${embed.id}: Behance URL must stay on behance.net.`);
  }
  if (!embed.embedUrl.startsWith(`https://www.behance.net/embed/project/${embed.projectId}`)) {
    errors.push(`${embed.id}: embedUrl must use the official Behance project embed route.`);
  }
  if (!embed.embedCode.includes(embed.embedUrl) || !embed.embedCode.includes("<iframe")) {
    errors.push(`${embed.id}: embedCode must include the Behance iframe embedUrl.`);
  }
}

if (!Array.isArray(content.portfolioCollections) || content.portfolioCollections.length < 4) {
  errors.push("Expected at least 4 portfolio collection records.");
}

for (const collection of content.portfolioCollections || []) {
  if (!collection.id || !collection.title || !collection.summary || !collection.tone || !collection.href) {
    errors.push("Portfolio collection is missing required fields.");
  }
  if (!Array.isArray(collection.images) || collection.images.length < 3) {
    errors.push(`${collection.id}: portfolio collection needs at least 3 images.`);
  }
  for (const image of collection.images || []) {
    const isLocalDrawing = image.startsWith("/drawings/");
    const isBehanceImage = image.startsWith("https://mir-s3-cdn-cf.behance.net/");
    if (!isLocalDrawing && !isBehanceImage) {
      errors.push(`${collection.id}: invalid collection image ${image}`);
    }
  }
  if (!Array.isArray(collection.proof) || collection.proof.length < 3) {
    errors.push(`${collection.id}: portfolio collection needs at least 3 proof items.`);
  }
  if (!["gold", "teal", "ivory"].includes(collection.accent)) {
    errors.push(`${collection.id}: invalid portfolio collection accent ${collection.accent}`);
  }
}

if (!Array.isArray(content.socialLinks) || content.socialLinks.length < 4) {
  errors.push("Expected at least 4 social links.");
}

if (!Array.isArray(content.contactQa) || content.contactQa.length < 4) {
  errors.push("Expected at least 4 contact Q&A records.");
}

if (!Array.isArray(content.evolutionTracks) || content.evolutionTracks.length < 4) {
  errors.push("Expected at least 4 evolution track records.");
}

for (const track of content.evolutionTracks || []) {
  if (!track.id || !track.title || !track.timeframe || !track.summary || !Array.isArray(track.focus)) {
    errors.push("Evolution track is missing required fields.");
  }
  if (!validEvolutionStatuses.has(track.status)) {
    errors.push(`${track.id}: invalid evolution status ${track.status}`);
  }
  if ((track.focus || []).length < 2) {
    errors.push(`${track.id}: expected at least 2 focus items.`);
  }
}

if (!Array.isArray(content.qualityStandards) || content.qualityStandards.length < 4) {
  errors.push("Expected at least 4 quality standard records.");
}

for (const standard of content.qualityStandards || []) {
  if (!standard.id || !standard.title || !standard.metric || !standard.summary) {
    errors.push("Quality standard is missing required fields.");
  }
}

if (!Array.isArray(content.softwareLanguages) || content.softwareLanguages.length < 8) {
  errors.push("Expected at least 8 software language records.");
}

for (const id of requiredSoftwareLanguageIds) {
  if (!content.softwareLanguages.some((language) => language.id === id)) {
    errors.push(`Missing required software language: ${id}`);
  }
}

for (const language of content.softwareLanguages || []) {
  if (!language.id || !language.name || !language.layer || !language.role) {
    errors.push("Software language item is missing required fields.");
  }
  if (!validLanguageStatuses.has(language.status)) {
    errors.push(`${language.id}: invalid software language status ${language.status}`);
  }
}

for (const language of ["Swift", "Kotlin", "Python", "Go", "Rust", "PHP", "C#", "Java"]) {
  if (!polyglotSource.includes(language)) {
    errors.push(`Polyglot GitHub registry missing language: ${language}`);
  }
}

for (const capability of ["Lovable", "GitHub", "Vercel", "Figma", "Canva", "Adobe", "Semrush", "Supabase", "SEIS Code Continuation Automation"]) {
  if (!capabilityMeshSource.includes(capability)) {
    errors.push(`Capability mesh missing capability: ${capability}`);
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

console.log(`Content check passed: ${content.locales.length} locales, ${content.works.length} works, ${content.drawings.length} drawings, ${content.behanceVisuals.length} Behance visuals, ${content.behanceEmbeds.length} Behance embeds, ${content.portfolioCollections.length} portfolio collections, ${content.evolutionTracks.length} evolution tracks, ${content.qualityStandards.length} quality standards, ${content.softwareLanguages.length} software languages, ${decisionQuestionCount} decision questions.`);
