import {
  ecosystemSourceExecutionDigest,
  ecosystemSourceOutputManifest,
  ecosystemSourceRunbook,
  ecosystemSourceTotal
} from "@seis/content";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    generatedAt: new Date().toISOString(),
    policy: {
      source: ecosystemSourceOutputManifest.policy,
      digest: "Digest summarizes local source governance evidence and does not perform provider actions.",
      guardrail: ecosystemSourceRunbook.operatingRule
    },
    summary: {
      totalSources: ecosystemSourceTotal,
      digestMetrics: ecosystemSourceExecutionDigest.metrics.length,
      leadingPacketId: ecosystemSourceExecutionDigest.leadingPacketId
    },
    digest: ecosystemSourceExecutionDigest
  });
}
