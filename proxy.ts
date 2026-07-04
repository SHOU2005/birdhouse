import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/auth/session";

/**
 * Optimistic auth gate for the admin area. This is a first line of defense only
 * — every admin Server Action and Route Handler independently calls
 * requireAdmin(), since Server Functions are reachable by direct POST
 * regardless of this matcher.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const authed = await isValidSessionToken(token);
  const isLogin = pathname === "/admin/login";

  if (!authed && !isLogin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (authed && isLogin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
