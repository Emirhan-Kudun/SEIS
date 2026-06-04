import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    primaryBranch: "codex/premium-local-foundation",
    protectedBranches: ["main", "master"],
    rules: [
      "Never work directly on protected branches.",
      "Keep commits isolated by one primary purpose.",
      "Run branch-governance-check and local-quality-gate before merge.",
      "Prefer rollback-safe incremental patches over broad rewrites.",
      "Do not deploy without explicit approval."
    ],
    mergeFlow: [
      "Implement on codex/premium-local-foundation",
      "Review release-readiness and quality-scorecard outputs",
      "Prepare PR summary with risk and rollback notes",
      "Merge only after approval and blocker resolution"
    ]
  });
}
