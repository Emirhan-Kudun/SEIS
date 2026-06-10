import { getRuntimeSnapshot } from "@seis/runtime";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(getRuntimeSnapshot());
}
