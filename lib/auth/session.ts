import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

/**
 * Stateless single-admin session: a jose-signed JWT stored in an HttpOnly
 * cookie. There is no user table — auth is a single shared password
 * (ADMIN_PASSWORD). The cookie is signed with SESSION_SECRET so it can't be
 * forged client-side.
 */

export const SESSION_COOKIE = "bh_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecretKey(): Uint8Array {
  const secret =
    process.env.SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "dev-insecure-secret-change-me";
  if (!process.env.SESSION_SECRET && !process.env.ADMIN_PASSWORD) {
    console.warn(
      "[auth] Neither SESSION_SECRET nor ADMIN_PASSWORD is set — using an insecure dev secret."
    );
  }
  return new TextEncoder().encode(secret);
}

type SessionPayload = { admin: true };

async function encrypt(): Promise<string> {
  return new SignJWT({ admin: true } satisfies SessionPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(getSecretKey());
}

async function decrypt(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify<SessionPayload>(token, getSecretKey(), {
      algorithms: ["HS256"],
    });
    return payload.admin === true ? payload : null;
  } catch {
    return null;
  }
}

export async function createSession(): Promise<void> {
  const token = await encrypt();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/** True if the current request carries a valid admin session cookie. */
export async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return (await decrypt(token)) !== null;
}

/** Verify a raw token value (used by proxy.ts for optimistic checks). */
export async function isValidSessionToken(token?: string): Promise<boolean> {
  return (await decrypt(token)) !== null;
}

/**
 * Secure guard for every admin mutation. Server Actions and Route Handlers are
 * reachable via direct POST regardless of proxy matchers, so each one must
 * re-check auth close to the data (see the Next.js Data Security guide).
 */
export async function requireAdmin(): Promise<void> {
  if (!(await isAuthed())) {
    throw new Error("Unauthorized");
  }
}
