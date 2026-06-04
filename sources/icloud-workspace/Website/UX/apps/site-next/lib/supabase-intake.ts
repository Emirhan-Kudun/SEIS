type SupabaseWriteResult = {
  configured: boolean;
  ok: boolean;
  table?: string;
  error?: string;
};

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_BRIEFS_TABLE || "brief_submissions";

  if (!url || !serviceRoleKey) {
    return null;
  }

  return { url, serviceRoleKey, table };
}

export async function writeSupabaseIntake(record: Record<string, unknown>): Promise<SupabaseWriteResult> {
  const config = getSupabaseConfig();

  if (!config) {
    return { configured: false, ok: false };
  }

  const response = await fetch(`${config.url}/rest/v1/${config.table}`, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(record)
  }).catch((error: unknown) => ({
    ok: false,
    status: 0,
    statusText: error instanceof Error ? error.message : "network_error"
  }));

  if (!response.ok) {
    return {
      configured: true,
      ok: false,
      table: config.table,
      error: `${response.status}:${response.statusText}`
    };
  }

  return { configured: true, ok: true, table: config.table };
}
