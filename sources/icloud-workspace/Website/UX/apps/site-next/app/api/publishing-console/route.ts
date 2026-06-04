import { publishingConsoleSteps, readinessDecision } from "@seis/content";
import { getDeploymentTargets, getSourceArchives } from "@seis/runtime";

export const dynamic = "force-dynamic";

export function GET() {
  const targets = getDeploymentTargets();
  const archives = getSourceArchives();
  const blockedTargets = targets.filter((target) => target.status === "needs_credentials");
  const cloudEnvStep = publishingConsoleSteps.find((step) => step.id === "cloud-env-preflight");
  const preflightStep = publishingConsoleSteps.find((step) => step.id === "deploy-preflight");

  return Response.json({
    counts: {
      steps: publishingConsoleSteps.length,
      targets: targets.length,
      archives: archives.length,
      blockedTargets: blockedTargets.length
    },
    decision: readinessDecision,
    cloudEnvStep,
    preflightStep,
    steps: publishingConsoleSteps,
    targets,
    archives
  });
}
