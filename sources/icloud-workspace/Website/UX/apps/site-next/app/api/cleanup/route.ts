import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RETENTION_MS = 90 * 24 * 60 * 60 * 1000;
const runtimeFiles = ["brief-submissions.jsonl", "contact-submissions.jsonl"];

function workspaceRoot() {
  if (process.env.SEIS_RUNTIME_DIR) {
    return path.resolve(process.env.SEIS_RUNTIME_DIR);
  }

  return process.cwd().endsWith(path.join("apps", "site-next"))
    ? path.resolve(process.cwd(), "../..")
    : process.cwd();
}

function runtimeDirectory() {
  return process.env.SEIS_RUNTIME_DIR
    ? path.resolve(process.env.SEIS_RUNTIME_DIR)
    : path.join(workspaceRoot(), "runtime");
}

async function cleanupRuntimeFile(fileName: string, now: number) {
  const target = path.join(runtimeDirectory(), fileName);
  const raw = await readFile(target, "utf8").catch(() => "");
  const lines = raw.split("\n").filter(Boolean);
  const kept = lines.filter((line) => {
    try {
      const record = JSON.parse(line) as { createdAt?: string; retentionUntil?: string };
      const retentionTime = record.retentionUntil ? Date.parse(record.retentionUntil) : Date.parse(record.createdAt || "") + RETENTION_MS;
      return Number.isFinite(retentionTime) && retentionTime > now;
    } catch {
      return true;
    }
  });

  await mkdir(runtimeDirectory(), { recursive: true });
  await writeFile(target, kept.length ? `${kept.join("\n")}\n` : "", "utf8");
  return { fileName, removed: lines.length - kept.length, kept: kept.length };
}

async function cleanupSupabase(nowIso: string) {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_BRIEFS_TABLE || "brief_submissions";

  if (!url || !serviceRoleKey) {
    return { configured: false, ok: false };
  }

  const response = await fetch(`${url}/rest/v1/${table}?retention_until=lt.${encodeURIComponent(nowIso)}`, {
    method: "DELETE",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "return=minimal"
    }
  }).catch((error: unknown) => ({
    ok: false,
    status: 0,
    statusText: error instanceof Error ? error.message : "network_error"
  }));

  return {
    configured: true,
    ok: response.ok,
    table,
    error: response.ok ? undefined : `${response.status}:${response.statusText}`
  };
}

export async function GET(request: Request) {
  const configuredSecret = process.env.CRON_SECRET;
  const providedSecret = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (configuredSecret && providedSecret !== configuredSecret) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  const files = await Promise.all(runtimeFiles.map((fileName) => cleanupRuntimeFile(fileName, now)));
  const supabase = await cleanupSupabase(new Date(now).toISOString());

  return Response.json({
    ok: true,
    cleanedAt: new Date(now).toISOString(),
    retentionDays: 90,
    files,
    supabase
  });
}
