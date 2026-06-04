import { createHash } from "node:crypto";

type GuardResult = {
  ok: true;
  fingerprint: string;
} | {
  ok: false;
  error: "honeypot_triggered" | "rate_limited" | "duplicate_submission";
  status: number;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 4;
const DEDUP_WINDOW_MS = 8 * 60_000;
const requestBuckets = new Map<string, number[]>();
const dedupBuckets = new Map<string, number>();

function cleanBuckets(now: number) {
  for (const [key, timestamps] of requestBuckets.entries()) {
    const active = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
    if (active.length) {
      requestBuckets.set(key, active);
    } else {
      requestBuckets.delete(key);
    }
  }

  for (const [key, timestamp] of dedupBuckets.entries()) {
    if (now - timestamp > DEDUP_WINDOW_MS) {
      dedupBuckets.delete(key);
    }
  }
}

export function isEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function cleanString(value: unknown, fallback = "not_specified", maxLength = 1200) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim().slice(0, maxLength) : fallback;
}

export function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return forwardedFor || realIp || "local";
}

export function guardIntakeRequest({
  request,
  body,
  dedupSeed
}: {
  request: Request;
  body: Record<string, unknown>;
  dedupSeed: string;
}): GuardResult {
  const now = Date.now();
  cleanBuckets(now);

  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return { ok: false, error: "honeypot_triggered", status: 202 };
  }

  const clientKey = getClientKey(request);
  const currentBucket = requestBuckets.get(clientKey) ?? [];
  const activeBucket = currentBucket.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (activeBucket.length >= RATE_LIMIT_MAX) {
    return { ok: false, error: "rate_limited", status: 429 };
  }

  activeBucket.push(now);
  requestBuckets.set(clientKey, activeBucket);

  const fingerprint = createHash("sha256")
    .update(`${clientKey}:${dedupSeed.toLowerCase().trim()}`)
    .digest("hex");
  const previous = dedupBuckets.get(fingerprint);

  if (previous && now - previous < DEDUP_WINDOW_MS) {
    return { ok: false, error: "duplicate_submission", status: 202 };
  }

  dedupBuckets.set(fingerprint, now);
  return { ok: true, fingerprint };
}
