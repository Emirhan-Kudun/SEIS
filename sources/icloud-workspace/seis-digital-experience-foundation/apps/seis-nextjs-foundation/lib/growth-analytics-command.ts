export type FunnelHealth = {
  id: string;
  stage: string;
  conversion: string;
  trend: "up" | "flat" | "down";
  status: "healthy" | "watch" | "critical";
  action: string;
};

export type SegmentInsight = {
  id: string;
  segment: string;
  signal: string;
  confidence: "high" | "medium" | "low";
  status: "validated" | "exploring" | "blocked";
};

const funnelHealth: FunnelHealth[] = [
  {
    id: "funnel-landing-to-work",
    stage: "Landing -> Works",
    conversion: "42%",
    trend: "up",
    status: "healthy",
    action: "Maintain current narrative and project preview rhythm."
  },
  {
    id: "funnel-work-to-service",
    stage: "Works -> Services",
    conversion: "23%",
    trend: "flat",
    status: "watch",
    action: "Improve service relevance cues on work detail pages."
  },
  {
    id: "funnel-service-to-contact",
    stage: "Services -> Contact",
    conversion: "8%",
    trend: "down",
    status: "critical",
    action: "Reduce friction and tighten value proof near CTA clusters."
  },
  {
    id: "funnel-insight-to-newsletter",
    stage: "Insights -> Newsletter",
    conversion: "15%",
    trend: "up",
    status: "healthy",
    action: "Expand topical insight cadence with intent-aligned CTAs."
  }
];

const segmentInsights: SegmentInsight[] = [
  {
    id: "segment-startup-founder",
    segment: "Startup founders",
    signal: "Strong engagement with orchestration and speed messaging.",
    confidence: "high",
    status: "validated"
  },
  {
    id: "segment-agency-lead",
    segment: "Agency leads",
    signal: "High interest in case studies, moderate intent on automation labs.",
    confidence: "medium",
    status: "exploring"
  },
  {
    id: "segment-enterprise-tech",
    segment: "Enterprise technical buyers",
    signal: "Trust improves with visible governance/security surfaces.",
    confidence: "high",
    status: "validated"
  },
  {
    id: "segment-freelance-creator",
    segment: "Independent creators",
    signal: "Mobile-heavy traffic with shorter session depth.",
    confidence: "medium",
    status: "exploring"
  }
];

export function getFunnelHealth(): FunnelHealth[] {
  return funnelHealth;
}

export function getSegmentInsights(): SegmentInsight[] {
  return segmentInsights;
}

export function getGrowthAnalyticsSummary() {
  return {
    totalStages: funnelHealth.length,
    healthyStages: funnelHealth.filter((item) => item.status === "healthy").length,
    watchStages: funnelHealth.filter((item) => item.status === "watch").length,
    criticalStages: funnelHealth.filter((item) => item.status === "critical").length,
    segments: segmentInsights.length,
    validatedSegments: segmentInsights.filter((item) => item.status === "validated").length,
    exploringSegments: segmentInsights.filter((item) => item.status === "exploring").length
  };
}
