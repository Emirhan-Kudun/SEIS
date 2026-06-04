import {
  platformCompatibilityDevices,
  platformCompatibilityPrinciples,
  platformCompatibilityTargets
} from "@seis/content";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    ok: true,
    targets: platformCompatibilityTargets,
    devices: platformCompatibilityDevices,
    principles: platformCompatibilityPrinciples
  });
}
