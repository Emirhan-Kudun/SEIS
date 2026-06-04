import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const apiRoot = path.join(root, "apps/site-next/app/api");
const errors = [];
const mutatingRoutes = new Set(["briefs", "contact", "cleanup"]);

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
      continue;
    }
    if (entry.name === "route.ts") {
      files.push(fullPath);
    }
  }
  return files;
}

const routes = walk(apiRoot)
  .map((file) => path.relative(root, file))
  .sort();

if (routes.length < 20) {
  errors.push(`Expected at least 20 API routes, found ${routes.length}.`);
}

for (const route of routes) {
  const source = read(route);
  const routeName = route.split("/").at(-2) || "unknown";

  if (!source.includes('export const dynamic = "force-dynamic"')) {
    errors.push(`${route}: API routes must declare force-dynamic explicitly.`);
  }

  if (!source.includes("export function GET") && !source.includes("export async function GET")) {
    errors.push(`${route}: API routes must expose a GET contract.`);
  }

  if (source.includes('from "node:fs') && !mutatingRoutes.has(routeName)) {
    errors.push(`${route}: filesystem access is only allowed in guarded mutating runtime routes.`);
  }

  if (mutatingRoutes.has(routeName) && !source.includes('export const runtime = "nodejs"')) {
    errors.push(`${route}: mutating API route must run on nodejs runtime.`);
  }
}

const briefsSource = read("apps/site-next/app/api/briefs/route.ts");
const contactSource = read("apps/site-next/app/api/contact/route.ts");
for (const [name, source] of [["briefs", briefsSource], ["contact", contactSource]]) {
  for (const method of ["PUT", "PATCH", "DELETE"]) {
    if (!source.includes(`export function ${method}`) || !source.includes("method_not_allowed")) {
      errors.push(`/api/${name}: ${method} must return method_not_allowed.`);
    }
  }
  for (const requiredSnippet of ["guardIntakeRequest", "retentionUntil", "writeSupabaseIntake", "status: 202"]) {
    if (!source.includes(requiredSnippet)) {
      errors.push(`/api/${name}: missing intake safety snippet ${requiredSnippet}.`);
    }
  }
}

const cleanupSource = read("apps/site-next/app/api/cleanup/route.ts");
for (const requiredSnippet of ["CRON_SECRET", "authorization", "Bearer", "retentionDays"]) {
  if (!cleanupSource.includes(requiredSnippet)) {
    errors.push(`/api/cleanup: missing cleanup guard snippet ${requiredSnippet}.`);
  }
}

const digitalLabSource = read("apps/site-next/app/api/digital-lab/route.ts");
for (const requiredSnippet of ["resolveLocale", "preferredPrototypeBuilder", "Lovable", "counts"]) {
  if (!digitalLabSource.includes(requiredSnippet)) {
    errors.push(`/api/digital-lab: missing AI-native lab contract snippet ${requiredSnippet}.`);
  }
}

const siteReadinessSource = read("apps/site-next/app/api/site-readiness/route.ts");
for (const requiredSnippet of ["resolveLocale", "readinessGates", "readinessDecision", "readinessSmokeRoutes", "readinessFeatures", "caseStudyBuilderStages", "caseStudyBuilderTemplates", "portfolioOsPanels", "connectorConsolePanels", "getCloudEnvironment", "cloudEnvironment", "studioCrmLanes", "studioCrmSignals", "briefTriageRules", "briefTriageBuckets", "publishingConsoleSteps", "securityPostureSignals", "serverHandoffStages", "platformAdapters", "motionSceneModes", "motionRuntimeBudgets", "getCinematicScenePresetSummary", "scenePresets", "mobileSafeScenePresets", "reducedMotionScenePresets", "supremeOsEngineNodes", "counts"]) {
  if (!siteReadinessSource.includes(requiredSnippet)) {
    errors.push(`/api/site-readiness: missing readiness contract snippet ${requiredSnippet}.`);
  }
}

const connectorConsoleSource = read("apps/site-next/app/api/connector-console/route.ts");
for (const requiredSnippet of ["connectorConsolePanels", "capabilityMeshItems", "capabilityMeshSummary", "getConnectorActivationManifest", "getRuntimeSnapshot", "getMcpReadinessSnapshot", "getSourceArchives", "connectorActivationManifest", "activationLanes", "runtimeSummary", "mcpSummary", "counts", "capabilityMesh", "panels", "archives"]) {
  if (!connectorConsoleSource.includes(requiredSnippet)) {
    errors.push(`/api/connector-console: missing connector console contract snippet ${requiredSnippet}.`);
  }
}

const connectorActivationSource = read("apps/site-next/app/api/connector-activation/route.ts");
for (const requiredSnippet of ["getConnectorActivationManifest", "getRuntimeSnapshot", "manifest.lanes", "needsCredentials", "policy", "lanes"]) {
  if (!connectorActivationSource.includes(requiredSnippet)) {
    errors.push(`/api/connector-activation: missing connector activation contract snippet ${requiredSnippet}.`);
  }
}

const automationRegistrySource = read("apps/site-next/app/api/automation-registry/route.ts");
for (const requiredSnippet of ["getAutomationRegistry", "getRuntimeSnapshot", "blockedLiveActions", "automations", "policy", "counts"]) {
  if (!automationRegistrySource.includes(requiredSnippet)) {
    errors.push(`/api/automation-registry: missing automation registry contract snippet ${requiredSnippet}.`);
  }
}

const cloudEnvironmentSource = read("apps/site-next/app/api/cloud-environment/route.ts");
for (const requiredSnippet of ["cloudEnvironmentPrinciples", "getCloudActivationPlan", "getCloudEnvironment", "getDeploymentTargets", "getRuntimeSnapshot", "activationPacket", "cloud-environment-report.json", "configuredItems", "needsCredentialsItems", "activationPlan", "counts", "cloudEnvironment", "deploymentTargets", "principles"]) {
  if (!cloudEnvironmentSource.includes(requiredSnippet)) {
    errors.push(`/api/cloud-environment: missing cloud environment contract snippet ${requiredSnippet}.`);
  }
}

const serverHandoffSource = read("apps/site-next/app/api/server-handoff/route.ts");
for (const requiredSnippet of ["serverHandoffStages", "serverHandoffGuardrails", "getDeploymentTargets", "getSourceArchives", "blockedStages", "activeStages", "serverTargets", "counts", "stages", "guardrails", "archives"]) {
  if (!serverHandoffSource.includes(requiredSnippet)) {
    errors.push(`/api/server-handoff: missing server handoff contract snippet ${requiredSnippet}.`);
  }
}

const studioCrmSource = read("apps/site-next/app/api/studio-crm/route.ts");
for (const requiredSnippet of ["studioCrmLanes", "studioCrmSignals", "contactQa", "services", "counts", "lanes", "signals"]) {
  if (!studioCrmSource.includes(requiredSnippet)) {
    errors.push(`/api/studio-crm: missing Studio CRM contract snippet ${requiredSnippet}.`);
  }
}

const publishingConsoleSource = read("apps/site-next/app/api/publishing-console/route.ts");
for (const requiredSnippet of ["publishingConsoleSteps", "readinessDecision", "getDeploymentTargets", "getSourceArchives", "cloud-env-preflight", "deploy-preflight", "cloudEnvStep", "blockedTargets", "counts", "steps", "targets", "archives"]) {
  if (!publishingConsoleSource.includes(requiredSnippet)) {
    errors.push(`/api/publishing-console: missing publishing console contract snippet ${requiredSnippet}.`);
  }
}

const briefTriageSource = read("apps/site-next/app/api/brief-triage/route.ts");
for (const requiredSnippet of ["briefTriageRules", "briefTriageBuckets", "scoreSample", "sample", "counts", "rules", "buckets"]) {
  if (!briefTriageSource.includes(requiredSnippet)) {
    errors.push(`/api/brief-triage: missing brief triage contract snippet ${requiredSnippet}.`);
  }
}

const platformAdaptersSource = read("apps/site-next/app/api/platform-adapters/route.ts");
for (const requiredSnippet of ["platformAdapters", "platformAdapterPrinciples", "getDeploymentTargets", "getSourceArchives", "readyAdapters", "watchAdapters", "plannedAdapters", "counts", "adapters", "principles"]) {
  if (!platformAdaptersSource.includes(requiredSnippet)) {
    errors.push(`/api/platform-adapters: missing platform adapter contract snippet ${requiredSnippet}.`);
  }
}

const securityPostureSource = read("apps/site-next/app/api/security-posture/route.ts");
for (const requiredSnippet of ["securityPostureSignals", "readinessDecision", "getDeploymentTargets", "watchSignals", "passingSignals", "blockedSignals", "counts", "signals", "deploymentTargets"]) {
  if (!securityPostureSource.includes(requiredSnippet)) {
    errors.push(`/api/security-posture: missing security posture contract snippet ${requiredSnippet}.`);
  }
}

const portfolioOsSource = read("apps/site-next/app/api/portfolio-os/route.ts");
for (const requiredSnippet of ["portfolioOsPanels", "buildPortfolioIndex", "getRuntimeSnapshot", "runtimeSummary", "scenePresetSummary", "counts", "panels"]) {
  if (!portfolioOsSource.includes(requiredSnippet)) {
    errors.push(`/api/portfolio-os: missing Portfolio OS contract snippet ${requiredSnippet}.`);
  }
}

const caseStudyBuilderSource = read("apps/site-next/app/api/case-study-builder/route.ts");
for (const requiredSnippet of ["caseStudyBuilderStages", "caseStudyBuilderTemplates", "counts", "stages", "templates"]) {
  if (!caseStudyBuilderSource.includes(requiredSnippet)) {
    errors.push(`/api/case-study-builder: missing builder contract snippet ${requiredSnippet}.`);
  }
}

const scenePresetsSource = read("apps/site-next/app/api/scene-presets/route.ts");
for (const requiredSnippet of ["getCinematicScenePresets", "getCinematicScenePresetSummary", "presets", "summary"]) {
  if (!scenePresetsSource.includes(requiredSnippet)) {
    errors.push(`/api/scene-presets: missing scene preset contract snippet ${requiredSnippet}.`);
  }
}

const softwareLanguagesSource = read("apps/site-next/app/api/software-languages/route.ts");
for (const requiredSnippet of ["softwareLanguages", "polyglotGithubLanguages", "githubLanguageTotal", "githubLanguages"]) {
  if (!softwareLanguagesSource.includes(requiredSnippet)) {
    errors.push(`/api/software-languages: missing software language contract snippet ${requiredSnippet}.`);
  }
}

const robotsSource = read("apps/site-next/app/robots.ts");
if (!robotsSource.includes('"/api/"')) {
  errors.push("robots.ts must disallow API indexing.");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`API contract check passed: ${routes.length} routes guarded.`);
