import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { siteMeta } from "@seis/content";

import { cleanString, guardIntakeRequest, isEmail } from "../../../lib/intake-guard";
import { writeSupabaseIntake } from "../../../lib/supabase-intake";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function workspaceRoot() {
  if (process.env.SEIS_RUNTIME_DIR) {
    return path.resolve(process.env.SEIS_RUNTIME_DIR);
  }

  return process.cwd().endsWith(path.join("apps", "site-next"))
    ? path.resolve(process.cwd(), "../..")
    : process.cwd();
}

async function appendRuntimeRecord(payload: Record<string, unknown>) {
  const runtimeDirectory = process.env.SEIS_RUNTIME_DIR
    ? path.resolve(process.env.SEIS_RUNTIME_DIR)
    : path.join(workspaceRoot(), "runtime");
  const target = path.join(runtimeDirectory, "contact-submissions.jsonl");
  await mkdir(runtimeDirectory, { recursive: true });
  await appendFile(target, `${JSON.stringify(payload)}\n`, "utf8");
  return path.relative(workspaceRoot(), target);
}

export function GET() {
  return Response.json({
    email: siteMeta.email,
    endpointConfigured: Boolean(process.env.CONTACT_ENDPOINT),
    localRuntimeCapture: true,
    supabaseConfigured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    required: ["name", "email", "service", "message"],
    statusModel: ["new", "reviewed"]
  });
}

export function PUT() {
  return Response.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}

export function PATCH() {
  return Response.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}

export function DELETE() {
  return Response.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    service?: unknown;
    website?: unknown;
  } | null;
  const normalizedMessage = cleanString(body?.message, "", 1600);

  if (
    !body ||
    typeof body.name !== "string" ||
    !isEmail(body.email) ||
    typeof body.service !== "string" ||
    typeof body.message !== "string"
  ) {
    return Response.json({ ok: false, error: "invalid_contact_payload" }, { status: 400 });
  }

  if (normalizedMessage.length < 12) {
    return Response.json({ ok: false, error: "message_too_short" }, { status: 400 });
  }

  const guard = guardIntakeRequest({
    request,
    body: body as Record<string, unknown>,
    dedupSeed: `${body.email}:${body.service}:${normalizedMessage}`
  });

  if (!guard.ok) {
    return Response.json({ ok: guard.status === 202, error: guard.error }, { status: guard.status });
  }

  const record = {
    id: crypto.randomUUID(),
    kind: "contact",
    status: "new",
    createdAt: new Date().toISOString(),
    retentionUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    fingerprint: guard.fingerprint,
    name: cleanString(body.name, "not_specified", 180),
    email: body.email.trim(),
    service: cleanString(body.service, "not_specified", 180),
    message: normalizedMessage,
    storage: "local_jsonl"
  };
  const runtimePath = await appendRuntimeRecord(record).catch(() => null);
  const supabase = await writeSupabaseIntake({
    id: record.id,
    kind: record.kind,
    status: record.status,
    created_at: record.createdAt,
    retention_until: record.retentionUntil,
    name: record.name,
    email: record.email,
    service: record.service,
    message: record.message,
    metadata: {
      fingerprint: record.fingerprint
    }
  });

  return Response.json(
    {
      ok: true,
      status: supabase.ok ? "accepted_dual_write" : runtimePath ? "queued_local" : "accepted_memory_only",
      runtimePath,
      supabase,
      nextStep: process.env.CONTACT_ENDPOINT
        ? "Contact endpoint is configured for downstream handling."
        : `No CONTACT_ENDPOINT is configured. Use mailto:${siteMeta.email} as the safe fallback.`
    },
    { status: 202 }
  );
}
