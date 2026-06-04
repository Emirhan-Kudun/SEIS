import {
  behanceEmbeds,
  behanceVisuals,
  briefTriageBuckets,
  briefTriageRules,
  caseStudyBuilderStages,
  caseStudyBuilderTemplates,
  connectorConsolePanels,
  drawings,
  locales,
  motionRuntimeBudgets,
  motionSceneModes,
  platformAdapters,
  portfolioCollections,
  portfolioOsPanels,
  publishingConsoleSteps,
  readinessDecision,
  readinessFeatures,
  readinessGates,
  readinessSmokeRoutes,
  resolveLocale,
  securityPostureSignals,
  serverHandoffStages,
  softwareLanguages,
  studioCrmLanes,
  studioCrmSignals,
  supremeOsEngineNodes,
  works
} from "@seis/content";
import { getCinematicScenePresetSummary, getCinematicScenePresets, getCloudEnvironment, getRuntimeSnapshot } from "@seis/runtime";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = resolveLocale(searchParams.get("locale") || "tr");
  const runtime = getRuntimeSnapshot();
  const cloudEnvironment = getCloudEnvironment();
  const scenePresets = getCinematicScenePresets();
  const scenePresetSummary = getCinematicScenePresetSummary(scenePresets);

  return Response.json({
    ok: true,
    locale,
    generatedAt: runtime.generatedAt,
    gates: readinessGates,
    decision: readinessDecision,
    smokeRoutes: readinessSmokeRoutes,
    features: readinessFeatures,
    counts: {
      locales: locales.length,
      works: works.length,
      drawings: drawings.length,
      behanceVisuals: behanceVisuals.length,
      behanceEmbeds: behanceEmbeds.length,
      briefTriageRules: briefTriageRules.length,
      briefTriageBuckets: briefTriageBuckets.length,
      connectorConsolePanels: connectorConsolePanels.length,
      caseStudyBuilderStages: caseStudyBuilderStages.length,
      caseStudyBuilderTemplates: caseStudyBuilderTemplates.length,
      cloudEnvironment: cloudEnvironment.length,
      portfolioCollections: portfolioCollections.length,
      portfolioOsPanels: portfolioOsPanels.length,
      studioCrmLanes: studioCrmLanes.length,
      studioCrmSignals: studioCrmSignals.length,
      publishingConsoleSteps: publishingConsoleSteps.length,
      securityPostureSignals: securityPostureSignals.length,
      serverHandoffStages: serverHandoffStages.length,
      softwareLanguages: softwareLanguages.length,
      motionSceneModes: motionSceneModes.length,
      motionRuntimeBudgets: motionRuntimeBudgets.length,
      platformAdapters: platformAdapters.length,
      scenePresets: scenePresetSummary.total,
      mobileSafeScenePresets: scenePresetSummary.mobileSafe,
      reducedMotionScenePresets: scenePresetSummary.reducedMotion,
      supremeOsEngineNodes: supremeOsEngineNodes.length,
      runtimeConnectors: runtime.summary.total
    }
  });
}
