import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { queueContactSubmission } from "@/lib/runtime-store";

export const runtime = "nodejs";

const SERVICE_OPTIONS = new Set([
  "cinematic-portfolio-os",
  "saas-product-experience",
  "ai-integration-readiness",
  "other"
]);

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 6;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
  locale?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
  hcaptchaToken?: unknown;
};

type ContactResponse = {
  ok: boolean;
  request_id: string;
  channel_used: "resend" | "api" | "mailto" | "php";
  fallback_level: 0 | 1 | 2 | 3;
  message: string;
  error_code?: string;
};

type CaptchaVerification = {
  ok: boolean;
  source: "turnstile" | "hcaptcha" | "none";
  reason?: string;
};

const ipBucket = new Map<string, { count: number; resetAt: number }>();

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  const first = forwarded.split(",")[0]?.trim();
  if (first) return first;
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function enforceRateLimit(ip: string): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const entry = ipBucket.get(ip);

  if (!entry || now > entry.resetAt) {
    ipBucket.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfterSec = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return { ok: false, retryAfterSec };
  }

  entry.count += 1;
  ipBucket.set(ip, entry);
  return { ok: true };
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const payload = new URLSearchParams();
  payload.set("secret", secret);
  payload.set("response", token);
  if (ip && ip !== "unknown") payload.set("remoteip", ip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: payload
  });

  if (!response.ok) return false;
  const data = (await response.json()) as { success?: boolean };
  return Boolean(data.success);
}

async function verifyHCaptcha(token: string, ip: string): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET_KEY;
  if (!secret) return false;

  const payload = new URLSearchParams();
  payload.set("secret", secret);
  payload.set("response", token);
  if (ip && ip !== "unknown") payload.set("remoteip", ip);

  const response = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    body: payload
  });

  if (!response.ok) return false;
  const data = (await response.json()) as { success?: boolean };
  return Boolean(data.success);
}

async function verifyCaptcha(
  turnstileToken: string,
  hcaptchaToken: string,
  ip: string
): Promise<CaptchaVerification> {
  const hasTurnstileSecret = Boolean(process.env.TURNSTILE_SECRET_KEY);
  const hasHCaptchaSecret = Boolean(process.env.HCAPTCHA_SECRET_KEY);

  if (!hasTurnstileSecret && !hasHCaptchaSecret) {
    return { ok: true, source: "none", reason: "captcha-secrets-missing" };
  }

  if (hasTurnstileSecret && turnstileToken) {
    const verified = await verifyTurnstile(turnstileToken, ip);
    if (verified) return { ok: true, source: "turnstile" };
  }

  if (hasHCaptchaSecret && hcaptchaToken) {
    const verified = await verifyHCaptcha(hcaptchaToken, ip);
    if (verified) return { ok: true, source: "hcaptcha" };
  }

  return {
    ok: false,
    source: hasTurnstileSecret ? "turnstile" : "hcaptcha",
    reason: "captcha-verification-failed"
  };
}

async function sendViaResend(input: {
  name: string;
  email: string;
  service: string;
  message: string;
  locale: string;
  requestId: string;
}): Promise<{ ok: boolean; status: number; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  if (!apiKey || !to) {
    return { ok: false, status: 0, reason: "provider-not-configured" };
  }

  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: input.email,
      subject: `New portfolio request • ${input.service}`,
      text: [
        `Request ID: ${input.requestId}`,
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        `Locale: ${input.locale}`,
        `Service: ${input.service}`,
        "",
        "Message:",
        input.message
      ].join("\n")
    })
  });

  if (!response.ok) {
    return { ok: false, status: response.status, reason: "provider-response-not-ok" };
  }

  return { ok: true, status: response.status };
}

function successResponse(payload: ContactResponse, status = 200) {
  return NextResponse.json(payload, { status });
}

function errorResponse(payload: ContactResponse, status = 400) {
  return NextResponse.json(payload, { status });
}

export async function POST(request: Request) {
  const requestId = `contact-${randomUUID().slice(0, 12)}`;
  const ip = getClientIp(request);

  const rateLimit = enforceRateLimit(ip);
  if (!rateLimit.ok) {
    return errorResponse(
      {
        ok: false,
        request_id: requestId,
        channel_used: "api",
        fallback_level: 1,
        message: "Too many requests. Please retry in a minute.",
        error_code: "rate_limited"
      },
      429
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return errorResponse(
      {
        ok: false,
        request_id: requestId,
        channel_used: "api",
        fallback_level: 1,
        message: "Invalid JSON payload.",
        error_code: "invalid_json"
      },
      400
    );
  }

  const name = normalizeString(payload.name);
  const email = normalizeString(payload.email);
  const service = normalizeString(payload.service);
  const message = normalizeString(payload.message);
  const locale = normalizeString(payload.locale) || "tr";
  const website = normalizeString(payload.website);
  const turnstileToken = normalizeString(payload.turnstileToken);
  const hcaptchaToken = normalizeString(payload.hcaptchaToken);

  if (website.length > 0) {
    return successResponse({
      ok: true,
      request_id: requestId,
      channel_used: "api",
      fallback_level: 1,
      message: "Request accepted.",
      error_code: "honeypot_triggered"
    });
  }

  if (name.length < 2 || name.length > 80) {
    return errorResponse(
      {
        ok: false,
        request_id: requestId,
        channel_used: "api",
        fallback_level: 1,
        message: "Name must be between 2 and 80 characters.",
        error_code: "invalid_name"
      },
      400
    );
  }

  if (!isValidEmail(email) || email.length > 160) {
    return errorResponse(
      {
        ok: false,
        request_id: requestId,
        channel_used: "api",
        fallback_level: 1,
        message: "Invalid email address.",
        error_code: "invalid_email"
      },
      400
    );
  }

  if (!SERVICE_OPTIONS.has(service)) {
    return errorResponse(
      {
        ok: false,
        request_id: requestId,
        channel_used: "api",
        fallback_level: 1,
        message: "Invalid service option.",
        error_code: "invalid_service"
      },
      400
    );
  }

  if (message.length < 24 || message.length > 2000) {
    return errorResponse(
      {
        ok: false,
        request_id: requestId,
        channel_used: "api",
        fallback_level: 1,
        message: "Message must be between 24 and 2000 characters.",
        error_code: "invalid_message"
      },
      400
    );
  }

  const captcha = await verifyCaptcha(turnstileToken, hcaptchaToken, ip);
  if (!captcha.ok) {
    return errorResponse(
      {
        ok: false,
        request_id: requestId,
        channel_used: "api",
        fallback_level: 1,
        message: "Captcha verification failed.",
        error_code: captcha.reason || "captcha_failed"
      },
      403
    );
  }

  try {
    const resend = await sendViaResend({
      name,
      email,
      service,
      message,
      locale,
      requestId
    });

    if (resend.ok) {
      await queueContactSubmission({
        id: requestId,
        receivedAt: new Date().toISOString(),
        name,
        email,
        service,
        message,
        locale,
        channelUsed: "resend",
        fallbackLevel: 0,
        status: "sent"
      });

      return successResponse({
        ok: true,
        request_id: requestId,
        channel_used: "resend",
        fallback_level: 0,
        message: "Request sent via primary provider."
      });
    }

    const queued = await queueContactSubmission({
      id: requestId,
      receivedAt: new Date().toISOString(),
      name,
      email,
      service,
      message,
      locale,
      channelUsed: "api",
      fallbackLevel: 1,
      status: "queued",
      errorCode: resend.reason || "provider_unavailable"
    });

    if (!queued.stored) {
      return errorResponse(
        {
          ok: false,
          request_id: requestId,
          channel_used: "api",
          fallback_level: 1,
          message: "Primary provider unavailable and local queue could not be written.",
          error_code: "queue_write_failed"
        },
        503
      );
    }

    return successResponse({
      ok: true,
      request_id: requestId,
      channel_used: "api",
      fallback_level: 1,
      message: "Primary provider unavailable. Request accepted by API fallback queue.",
      error_code: resend.reason || "provider_unavailable"
    });
  } catch {
    await queueContactSubmission({
      id: requestId,
      receivedAt: new Date().toISOString(),
      name,
      email,
      service,
      message,
      locale,
      channelUsed: "api",
      fallbackLevel: 1,
      status: "failed",
      errorCode: "api_fallback_failed"
    });

    return errorResponse(
      {
        ok: false,
        request_id: requestId,
        channel_used: "api",
        fallback_level: 1,
        message: "Primary and API fallback failed. Continue with mailto/contact.php fallback.",
        error_code: "api_fallback_failed"
      },
      503
    );
  }
}
