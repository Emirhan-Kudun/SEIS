import { getAutomationRegistry, getRuntimeSnapshot } from "@seis/runtime";

export const dynamic = "force-dynamic";

export function GET() {
  const runtime = getRuntimeSnapshot();
  const registry = getAutomationRegistry();

  return Response.json({
    ok: true,
    generatedAt: runtime.generatedAt,
    counts: {
      automations: registry.automations.length,
      active: registry.automations.filter((automation) => automation.status === "active").length,
      blockedLiveActions: registry.blockedLiveActions.length
    },
    policy: registry.policy,
    automations: registry.automations,
    blockedLiveActions: registry.blockedLiveActions
  });
}
