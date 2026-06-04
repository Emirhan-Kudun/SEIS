import { contactQa, services, studioCrmLanes, studioCrmSignals } from "@seis/content";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    counts: {
      lanes: studioCrmLanes.length,
      signals: studioCrmSignals.length,
      qa: contactQa.length,
      services: services.length
    },
    lanes: studioCrmLanes,
    signals: studioCrmSignals
  });
}
