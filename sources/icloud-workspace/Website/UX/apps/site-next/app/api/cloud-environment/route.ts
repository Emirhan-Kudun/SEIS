import { cloudEnvironmentPrinciples, readinessDecision } from "@seis/content";
import { getCloudActivationPlan, getCloudEnvironment, getDeploymentTargets, getRuntimeSnapshot } from "@seis/runtime";

export const dynamic = "force-dynamic";

export function GET() {
  const runtime = getRuntimeSnapshot();
  const cloudEnvironment = getCloudEnvironment();
  const activationPlan = getCloudActivationPlan();
  const deploymentTargets = getDeploymentTargets();
  const configuredItems = cloudEnvironment.filter((item) => item.status === "configured");
  const needsCredentialsItems = cloudEnvironment.filter((item) => item.status === "needs_credentials");

  return Response.json({
    ok: true,
    generatedAt: runtime.generatedAt,
    decision: readinessDecision,
    activationPacket: {
      reportPath: "docs/releases/cloud-environment-report.json",
      command: "npm run cloud:env:preflight",
      recommendedTooling: "npm i -g vercel",
      vercelDocs: [
        "https://vercel.com/docs/cli/env",
        "https://vercel.com/docs/deployments/environments"
      ]
    },
    counts: {
      cloudEnvironment: cloudEnvironment.length,
      configuredItems: configuredItems.length,
      needsCredentialsItems: needsCredentialsItems.length,
      activationPlan: activationPlan.length,
      deploymentTargets: deploymentTargets.length,
      principles: cloudEnvironmentPrinciples.length
    },
    cloudEnvironment,
    activationPlan,
    deploymentTargets,
    principles: cloudEnvironmentPrinciples
  });
}
