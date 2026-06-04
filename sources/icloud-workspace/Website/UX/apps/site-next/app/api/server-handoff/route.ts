import { serverHandoffGuardrails, serverHandoffStages } from "@seis/content";
import { getDeploymentTargets, getSourceArchives } from "@seis/runtime";

export const dynamic = "force-dynamic";

export function GET() {
  const deploymentTargets = getDeploymentTargets();
  const archives = getSourceArchives();
  const blockedStages = serverHandoffStages.filter((stage) => stage.status === "needs_credentials");
  const activeStages = serverHandoffStages.filter((stage) => stage.status === "active");
  const serverTargets = deploymentTargets.filter((target) => target.persistence === "custom-server" || target.persistence === "filesystem");

  return Response.json({
    ok: true,
    counts: {
      stages: serverHandoffStages.length,
      guardrails: serverHandoffGuardrails.length,
      blockedStages: blockedStages.length,
      activeStages: activeStages.length,
      serverTargets: serverTargets.length,
      archives: archives.length
    },
    stages: serverHandoffStages,
    guardrails: serverHandoffGuardrails,
    serverTargets,
    archives
  });
}
