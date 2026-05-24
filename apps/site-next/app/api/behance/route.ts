import { behanceEmbeds } from "@seis/content";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    profile: "https://www.behance.net/emirhankudun",
    embeds: behanceEmbeds
  });
}
