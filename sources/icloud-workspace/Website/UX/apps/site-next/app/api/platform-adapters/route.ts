import { platformAdapterPrinciples, platformAdapters, platformCompatibilityTargets } from "@seis/content";
import { getDeploymentTargets, getRuntimeSnapshot, getSourceArchives } from "@seis/runtime";

export const dynamic = "force-dynamic";

export function GET() {
  const runtime = getRuntimeSnapshot();
  const deploymentTargets = getDeploymentTargets();
  const archives = getSourceArchives();
  const readyAdapters = platformAdapters.filter((adapter) => adapter.status === "ready");
  const watchAdapters = platformAdapters.filter((adapter) => adapter.status === "watch");
  const plannedAdapters = platformAdapters.filter((adapter) => adapter.status === "planned");
  const plannedTargets = platformCompatibilityTargets.filter((target) => target.status === "planned");
  const endpoints = platformAdapters.map((adapter) => adapter.entrypoint);

  return Response.json({
    ok: true,
    generatedAt: runtime.generatedAt,
    counts: {
      adapters: platformAdapters.length,
      readyAdapters: readyAdapters.length,
      watchAdapters: watchAdapters.length,
      plannedAdapters: plannedAdapters.length,
      plannedTargets: plannedTargets.length,
      principles: platformAdapterPrinciples.length,
      deploymentTargets: deploymentTargets.length,
      archives: archives.length
    },
    adapters: platformAdapters,
    principles: platformAdapterPrinciples,
    targets: platformCompatibilityTargets,
    plannedTargets,
    endpoints,
    deploymentTargets,
    archives
  });
}
