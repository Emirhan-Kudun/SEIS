import { NextResponse } from "next/server";

type NewsletterPayload = {
  email?: unknown;
  locale?: unknown;
  source?: unknown;
};

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/newsletter",
    method: "POST",
    payload: {
      email: "string (required)",
      locale: "string (optional)",
      source: "string (optional)"
    }
  });
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: NewsletterPayload;

  try {
    payload = (await request.json()) as NewsletterPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const locale = typeof payload.locale === "string" ? payload.locale.trim() : "";
  const source = typeof payload.source === "string" ? payload.source.trim() : "";

  if (!isValidEmail(email) || email.length > 160) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  if (locale.length > 10 || source.length > 80) {
    return NextResponse.json({ error: "Invalid locale/source." }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    acceptedAt: new Date().toISOString(),
    subscriber: {
      email,
      locale,
      source: source || "unknown"
    }
  });
}
