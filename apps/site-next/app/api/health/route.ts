import { getRuntimeSnapshot } from "@seis/runtime";

export const dynamic = "force-dynamic";

export function GET() {
  const snapshot = getRuntimeSnapshot();

  return Response.json({
    ok: true,
    service: "seis-premium-portfolio",
    generatedAt: snapshot.generatedAt,
    summary: snapshot.summary
  });
}
