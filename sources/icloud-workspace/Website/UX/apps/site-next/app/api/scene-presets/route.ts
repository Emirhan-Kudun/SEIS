import { getCinematicScenePresetSummary, getCinematicScenePresets } from "@seis/runtime";

export const dynamic = "force-dynamic";

export function GET() {
  const presets = getCinematicScenePresets();
  const summary = getCinematicScenePresetSummary(presets);

  return Response.json({
    summary,
    presets
  });
}
