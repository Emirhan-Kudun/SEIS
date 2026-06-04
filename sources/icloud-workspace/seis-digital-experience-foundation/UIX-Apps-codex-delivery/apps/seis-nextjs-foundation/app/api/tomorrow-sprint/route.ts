import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    date: "2026-05-15",
    title: "SEIS Website Sprint Kickoff Plan",
    focus: [
      "homepage visual direction lock",
      "navigation and route QA",
      "content depth pass for works/cases/insights",
      "release gate dry run"
    ],
    blocks: [
      {
        id: "block-1",
        time: "09:30-11:00",
        objective: "UI Direction Lock",
        tasks: [
          "Review hero + section hierarchy",
          "Freeze token-level spacing and typography scale",
          "Capture visual QA notes for mobile-first corrections"
        ]
      },
      {
        id: "block-2",
        time: "11:15-13:00",
        objective: "Content and Route Stabilization",
        tasks: [
          "Validate works, insights, services, and playbooks routes",
          "Run content parity pass across TR/EN/FR/IT/DE",
          "Patch high-impact readability and CTA clarity issues"
        ]
      },
      {
        id: "block-3",
        time: "14:00-16:00",
        objective: "Operations and Governance QA",
        tasks: [
          "Review control, ops, governance, and studio endpoints",
          "Check release-readiness + quality-scorecard signals",
          "Prepare risk/rollback notes for merge decision"
        ]
      },
      {
        id: "block-4",
        time: "16:15-18:00",
        objective: "Final Integration Pass",
        tasks: [
          "Consolidate approved fixes on codex/premium-local-foundation",
          "Generate PR summary and verification checklist",
          "Hold deployment until explicit approval"
        ]
      }
    ]
  });
}
