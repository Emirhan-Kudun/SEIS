import { NextResponse } from "next/server";

type EstimatePayload = {
  serviceType?: unknown;
  pages?: unknown;
  motionLevel?: unknown;
  locales?: unknown;
  cmsNeeded?: unknown;
};

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : NaN;
  }
  return NaN;
}

const SERVICE_MULTIPLIER: Record<string, number> = {
  "cinematic-portfolio-os": 1,
  "saas-product-experience": 1.8,
  "ai-integration-readiness": 2.1,
  other: 1.3
};

const MOTION_MULTIPLIER: Record<string, number> = {
  low: 1,
  medium: 1.25,
  high: 1.5
};

export async function POST(request: Request) {
  let payload: EstimatePayload;

  try {
    payload = (await request.json()) as EstimatePayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const serviceType = typeof payload.serviceType === "string" ? payload.serviceType : "other";
  const motionLevel = typeof payload.motionLevel === "string" ? payload.motionLevel : "medium";
  const pages = toNumber(payload.pages);
  const locales = toNumber(payload.locales);
  const cmsNeeded = payload.cmsNeeded === true;

  if (!Number.isFinite(pages) || pages < 1 || pages > 50) {
    return NextResponse.json({ error: "Pages must be between 1 and 50." }, { status: 400 });
  }

  if (!Number.isFinite(locales) || locales < 1 || locales > 10) {
    return NextResponse.json({ error: "Locales must be between 1 and 10." }, { status: 400 });
  }

  const base = 1800;
  const pageCost = pages * 320;
  const localeCost = (locales - 1) * 210;
  const cmsCost = cmsNeeded ? 1300 : 0;

  const serviceMultiplier = SERVICE_MULTIPLIER[serviceType] ?? SERVICE_MULTIPLIER.other;
  const motionMultiplier = MOTION_MULTIPLIER[motionLevel] ?? MOTION_MULTIPLIER.medium;

  const subtotal = (base + pageCost + localeCost + cmsCost) * serviceMultiplier * motionMultiplier;
  const estimate = Math.round(subtotal);

  const durationWeeks = Math.max(2, Math.ceil((pages / 3) * motionMultiplier + (cmsNeeded ? 2 : 0)));

  return NextResponse.json({
    ok: true,
    estimate,
    currency: "USD",
    durationWeeks,
    breakdown: {
      base,
      pageCost,
      localeCost,
      cmsCost,
      serviceMultiplier,
      motionMultiplier
    }
  });
}
