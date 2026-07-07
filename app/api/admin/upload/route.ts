import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { uploadFile, hasSupabase } from "@/lib/store/supabase";

/**
 * Server-side listing photo upload.
 *
 * The browser POSTs the (already downscaled) image here and we forward it to
 * the Supabase Storage `listings` bucket with the service-role key, so no
 * credentials reach the browser. The client shrinks images before sending, so
 * the request stays well under the platform body-size limit.
 */
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB — stays under Vercel's ~4.5 MB body limit
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasSupabase) {
    return NextResponse.json(
      {
        error:
          "Image storage isn't set up yet. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY and create a public 'listings' bucket.",
      },
      { status: 503 }
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP or AVIF images are allowed" },
      { status: 415 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image is too large — please use one under 4 MB." },
      { status: 413 }
    );
  }

  try {
    const url = await uploadFile(
      file.name || "image",
      await file.arrayBuffer(),
      file.type
    );
    return NextResponse.json({ url });
  } catch (err) {
    console.error("[upload] failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    );
  }
}
