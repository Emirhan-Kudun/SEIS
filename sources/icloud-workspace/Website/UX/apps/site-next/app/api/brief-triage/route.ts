import { briefTriageBuckets, briefTriageRules, contactQa, services } from "@seis/content";

export const dynamic = "force-dynamic";

type TriageSample = {
  service?: string;
  priority?: string;
  scope?: string;
  timeline?: string;
  budget?: string;
  message?: string;
};

function hasText(value: unknown, minLength = 3) {
  return typeof value === "string" && value.trim().length >= minLength;
}

function scoreSample(sample: TriageSample) {
  const score = [
    hasText(sample.service) ? 25 : 0,
    sample.priority === "urgent" || sample.priority === "near" ? 15 : hasText(sample.priority) ? 10 : 0,
    hasText(sample.scope, 8) ? 20 : 0,
    hasText(sample.timeline) && hasText(sample.budget) ? 20 : 0,
    hasText(sample.message, 24) ? 20 : 0
  ].reduce((total, value) => total + value, 0);

  const bucket = score >= 75 ? "ready" : score >= 45 ? "clarify" : "defer";
  return { score, bucket };
}

export function GET() {
  return Response.json({
    ok: true,
    counts: {
      rules: briefTriageRules.length,
      buckets: briefTriageBuckets.length,
      services: services.length,
      qa: contactQa.length
    },
    rules: briefTriageRules,
    buckets: briefTriageBuckets,
    sample: scoreSample({
      service: "ui-ux",
      priority: "near",
      scope: "Premium portfolio and motion system",
      timeline: "2-6 weeks",
      budget: "scoped",
      message: "I need a calm, premium portfolio system with case studies and publishing readiness."
    })
  });
}
