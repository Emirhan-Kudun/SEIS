import {
  digitalLabAudiences,
  digitalLabCapabilities,
  digitalLabEngagements,
  digitalLabSurfaces,
  digitalLabWorkflow,
  getDigitalLabCopy,
  resolveLocale
} from "@seis/content";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = resolveLocale(searchParams.get("locale") || "tr");

  return Response.json({
    ok: true,
    locale,
    copy: getDigitalLabCopy(locale),
    counts: {
      surfaces: digitalLabSurfaces.length,
      capabilities: digitalLabCapabilities.length,
      workflow: digitalLabWorkflow.length,
      audiences: digitalLabAudiences.length,
      engagements: digitalLabEngagements.length
    },
    surfaces: digitalLabSurfaces,
    capabilities: digitalLabCapabilities,
    workflow: digitalLabWorkflow,
    audiences: digitalLabAudiences,
    engagements: digitalLabEngagements,
    preferredPrototypeBuilder: "Lovable"
  });
}
