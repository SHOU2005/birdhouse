"use server";

import { redirect } from "next/navigation";
import { timingSafeEqual } from "node:crypto";
import { createSession, deleteSession } from "./session";

export type LoginState = { error?: string };

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  // timingSafeEqual requires equal lengths; length itself isn't secret here.
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return {
      error:
        "Admin password is not configured. Set the ADMIN_PASSWORD environment variable.",
    };
  }
  if (!password || !safeEqual(password, expected)) {
    return { error: "Incorrect password." };
  }

  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
