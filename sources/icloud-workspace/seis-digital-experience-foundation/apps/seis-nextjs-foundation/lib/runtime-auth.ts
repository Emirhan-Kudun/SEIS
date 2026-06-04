import { timingSafeEqual } from "node:crypto";

export type AdminAuthResult =
  | { ok: true }
  | { ok: false; status: 401 | 503; message: string; reason: "admin_disabled" | "missing_token" | "invalid_token" };

function safeCompare(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

function readToken(request: Request): string {
  const authorization = request.headers.get("authorization") || "";
  if (authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.slice(7).trim();
  }

  return request.headers.get("x-admin-token")?.trim() || "";
}

export function requireAdmin(request: Request): AdminAuthResult {
  const expected = process.env.SEIS_ADMIN_TOKEN?.trim();

  if (!expected) {
    return {
      ok: false,
      status: 503,
      message: "Admin API disabled. Configure SEIS_ADMIN_TOKEN to enable it.",
      reason: "admin_disabled"
    };
  }

  const token = readToken(request);
  if (!token) {
    return {
      ok: false,
      status: 401,
      message: "Missing admin token.",
      reason: "missing_token"
    };
  }

  if (!safeCompare(token, expected)) {
    return {
      ok: false,
      status: 401,
      message: "Invalid admin token.",
      reason: "invalid_token"
    };
  }

  return { ok: true };
}
