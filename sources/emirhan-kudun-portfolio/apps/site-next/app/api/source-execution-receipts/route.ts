import {
  ecosystemSourceExecutionDigest,
  ecosystemSourceExecutionReceipts,
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
      receipts: "Execution receipts describe public/local evidence and do not claim full provider authentication.",
      guardrail: ecosystemSourceRunbook.operatingRule
    },
    summary: {
      totalSources: ecosystemSourceTotal,
      digestMetrics: ecosystemSourceExecutionDigest.metrics.length,
      receipts: ecosystemSourceExecutionReceipts.length,
      runbookSteps: ecosystemSourceRunbook.steps.length
    },
    digestHandoff: "/api/source-execution-digest",
    receipts: ecosystemSourceExecutionReceipts
  });
}
