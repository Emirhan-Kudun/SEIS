import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { digitalLabEngagements, services } from "@seis/content";

import { cleanString, guardIntakeRequest, isEmail } from "../../../lib/intake-guard";
import { writeSupabaseIntake } from "../../../lib/supabase-intake";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type BriefPayload = {
  name?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
  engagement?: unknown;
  scope?: unknown;
  timeline?: unknown;
  budget?: unknown;
  priority?: unknown;
  goal?: unknown;
  website?: unknown;
};

function workspaceRoot() {
  if (process.env.SEIS_RUNTIME_DIR) {
    return path.resolve(process.env.SEIS_RUNTIME_DIR);
  }

  return process.cwd().endsWith(path.join("apps", "site-next"))
    ? path.resolve(process.cwd(), "../..")
    : process.cwd();
}

async function appendRuntimeRecord(fileName: string, payload: Record<string, unknown>) {
  const runtimeDirectory = process.env.SEIS_RUNTIME_DIR
    ? path.resolve(process.env.SEIS_RUNTIME_DIR)
    : path.join(workspaceRoot(), "runtime");
  const target = path.join(runtimeDirectory, fileName);
  await mkdir(runtimeDirectory, { recursive: true });
  await appendFile(target, `${JSON.stringify(payload)}\n`, "utf8");
  return path.relative(workspaceRoot(), target);
}

export function GET() {
  return Response.json({
    fields: ["name", "email", "service", "message", "engagement", "scope", "timeline", "budget", "priority", "goal"],
    required: ["name", "email", "service", "message"],
    services: services.map((service) => ({
      id: service.id,
      title: service.title
    })),
    engagements: digitalLabEngagements.map((engagement) => ({
      id: engagement.id,
      title: engagement.title,
      pace: engagement.pace
    })),
    storage: "local_jsonl_with_optional_supabase_dual_write",
    supabaseConfigured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    statusModel: ["new", "reviewed"],
    externalDeliveryConfigured: Boolean(process.env.CONTACT_ENDPOINT)
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
  const body = (await request.json().catch(() => null)) as BriefPayload | null;
  const message = cleanString(body?.message ?? body?.goal, "", 1600);

  if (
    !body ||
    typeof body.name !== "string" ||
    !isEmail(body.email) ||
    typeof body.service !== "string" ||
    message.length < 12
  ) {
    return Response.json({ ok: false, error: "invalid_brief_payload" }, { status: 400 });
  }

  const guard = guardIntakeRequest({
    request,
    body: body as Record<string, unknown>,
    dedupSeed: `${body.email}:${body.service}:${message}`
  });

  if (!guard.ok) {
    return Response.json({ ok: guard.status === 202, error: guard.error }, { status: guard.status });
  }

  const now = new Date().toISOString();
  const record = {
    id: crypto.randomUUID(),
    kind: "brief",
    status: "new",
    createdAt: now,
    retentionUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    fingerprint: guard.fingerprint,
    name: cleanString(body.name, "not_specified", 180),
    email: isEmail(body.email) ? body.email.trim() : "not_specified",
    service: cleanString(body.service, "not_specified", 180),
    message,
    engagement: cleanString(body.engagement, "prototype-sprint", 180),
    scope: cleanString(body.scope),
    timeline: cleanString(body.timeline, "not_specified", 180),
    budget: cleanString(body.budget, "not_specified", 180),
    priority: cleanString(body.priority, "calm", 80),
    goal: message,
    readinessScore: body.email && body.service && body.engagement && body.scope ? "qualified" : "needs_followup",
    storage: "local_jsonl"
  };

  const runtimePath = await appendRuntimeRecord("brief-submissions.jsonl", record).catch(() => null);
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
      engagement: record.engagement,
      scope: record.scope,
      timeline: record.timeline,
      budget: record.budget,
      priority: record.priority,
      readinessScore: record.readinessScore,
      fingerprint: record.fingerprint
    }
  });

  return Response.json(
    {
      ok: true,
      briefId: record.id,
      status: supabase.ok ? "accepted_dual_write" : runtimePath ? "accepted_local_fallback" : "accepted_memory_only",
      runtimePath,
      supabase,
      received: {
        service: record.service,
        engagement: record.engagement,
        scope: record.scope,
        timeline: record.timeline,
        priority: record.priority,
        readinessScore: record.readinessScore
      }
    },
    { status: 202 }
  );
}
