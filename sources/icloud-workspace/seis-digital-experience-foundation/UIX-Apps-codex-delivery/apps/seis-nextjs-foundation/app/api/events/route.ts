import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { queueRuntimeEvent } from "@/lib/runtime-store";

type EventPayload = {
  name?: unknown;
  scope?: unknown;
  label?: unknown;
  locale?: unknown;
  path?: unknown;
  metadata?: unknown;
};

function toStringSafe(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: EventPayload;

  try {
    payload = (await request.json()) as EventPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const name = toStringSafe(payload.name);
  const scope = toStringSafe(payload.scope);
  const label = toStringSafe(payload.label);
  const locale = toStringSafe(payload.locale);
  const path = toStringSafe(payload.path);

  if (!name || name.length > 80) {
    return NextResponse.json({ error: "Invalid event name." }, { status: 400 });
  }

  if (!scope || scope.length > 80) {
    return NextResponse.json({ error: "Invalid event scope." }, { status: 400 });
  }

  if (label.length > 160 || locale.length > 10 || path.length > 400) {
    return NextResponse.json({ error: "Invalid event payload length." }, { status: 400 });
  }

  const metadata =
    payload.metadata && typeof payload.metadata === "object" && !Array.isArray(payload.metadata)
      ? payload.metadata
      : undefined;

  const acceptedAt = new Date().toISOString();
  const event = {
    id: `event-${randomUUID().slice(0, 12)}`,
    acceptedAt,
    name,
    scope,
    label,
    locale,
    path,
    metadata: metadata as Record<string, string | number | boolean | null> | undefined
  };
  const queued = await queueRuntimeEvent(event);

  return NextResponse.json({
    ok: true,
    acceptedAt,
    stored: queued.stored,
    event
  });
}
