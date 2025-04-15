import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Get IP from X-Forwarded-For header (most reliable when behind a proxy)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  let ip = request.headers.ip;

  // Fallback to other headers if X-Forwarded-For is not available
  if (!ip) {
    ip =
      request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-client-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      "x.x.x.x"; // Fallback for local development
  }

  return NextResponse.json({ ip });
}
