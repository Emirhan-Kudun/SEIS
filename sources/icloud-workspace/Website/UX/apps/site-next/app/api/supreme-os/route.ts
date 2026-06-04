import { supremeOsCapabilities, supremeOsLanes, supremeOsModes } from "@seis/content";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    ok: true,
    modes: supremeOsModes,
    capabilities: supremeOsCapabilities,
    lanes: supremeOsLanes
  });
}
