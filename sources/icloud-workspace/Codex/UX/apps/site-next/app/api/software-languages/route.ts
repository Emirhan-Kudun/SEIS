import { softwareLanguages } from "@seis/content";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    total: softwareLanguages.length,
    languages: softwareLanguages
  });
}
