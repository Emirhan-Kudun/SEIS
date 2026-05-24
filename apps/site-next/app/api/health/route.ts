import { getMcpReadinessSnapshot, getSourceArchives, getRuntimeSnapshot } from "@seis/runtime";

export const dynamic = "force-dynamic";

export function GET() {
  const snapshot = getRuntimeSnapshot();
  const mcp = getMcpReadinessSnapshot();
  const archives = getSourceArchives();

  return Response.json({
    ok: true,
    service: "seis-premium-portfolio",
    generatedAt: snapshot.generatedAt,
    summary: snapshot.summary,
    mcpSummary: mcp.summary,
    sourceArchiveCount: archives.length
  });
}
