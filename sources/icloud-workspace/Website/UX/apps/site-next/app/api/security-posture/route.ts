import { readinessDecision, securityPostureSignals } from "@seis/content";
import { getDeploymentTargets, getRuntimeSnapshot } from "@seis/runtime";

export const dynamic = "force-dynamic";

export function GET() {
  const runtime = getRuntimeSnapshot();
  const deploymentTargets = getDeploymentTargets();
  const watchSignals = securityPostureSignals.filter((signal) => signal.status === "watch");
  const passingSignals = securityPostureSignals.filter((signal) => signal.status === "passing");
  const blockedSignals = securityPostureSignals.filter((signal) => signal.status === "blocked");

  return Response.json({
    ok: true,
    generatedAt: runtime.generatedAt,
    decision: readinessDecision,
    counts: {
      signals: securityPostureSignals.length,
      watchSignals: watchSignals.length,
      passingSignals: passingSignals.length,
      blockedSignals: blockedSignals.length,
      deploymentTargets: deploymentTargets.length
    },
    signals: securityPostureSignals,
    deploymentTargets
  });
}
