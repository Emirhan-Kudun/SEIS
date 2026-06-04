import { getConnectorActivationManifest, getRuntimeSnapshot } from "@seis/runtime";

export const dynamic = "force-dynamic";

export function GET() {
  const runtime = getRuntimeSnapshot();
  const manifest = getConnectorActivationManifest();

  return Response.json({
    ok: true,
    generatedAt: runtime.generatedAt,
    counts: {
      lanes: manifest.lanes.length,
      active: manifest.lanes.filter((lane) => lane.status === "active").length,
      configured: manifest.lanes.filter((lane) => lane.status === "configured").length,
      available: manifest.lanes.filter((lane) => lane.status === "available").length,
      needsCredentials: manifest.lanes.filter((lane) => lane.status === "needs_credentials").length
    },
    policy: manifest.policy,
    lanes: manifest.lanes
  });
}
