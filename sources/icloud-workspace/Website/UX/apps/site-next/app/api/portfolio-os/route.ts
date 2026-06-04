import {
  behanceVisuals,
  buildPortfolioIndex,
  drawings,
  portfolioOsPanels,
  readinessSmokeRoutes,
  works
} from "@seis/content";
import { getCinematicScenePresetSummary, getCinematicScenePresets, getRuntimeSnapshot } from "@seis/runtime";

export const dynamic = "force-dynamic";

export function GET() {
  const runtime = getRuntimeSnapshot();
  const runtimeSummary = runtime.summary;
  const scenePresetSummary = getCinematicScenePresetSummary(getCinematicScenePresets());
  const portfolioIndex = buildPortfolioIndex();

  return Response.json({
    ok: true,
    generatedAt: runtime.generatedAt,
    counts: {
      works: works.length,
      visualAssets: behanceVisuals.length + drawings.length,
      smokeRoutes: readinessSmokeRoutes.length,
      runtimeItems: runtimeSummary.total,
      scenePresets: scenePresetSummary.total,
      portfolioIndexItems: portfolioIndex.length,
      panels: portfolioOsPanels.length
    },
    panels: portfolioOsPanels,
    runtimeSummary,
    scenePresetSummary
  });
}
