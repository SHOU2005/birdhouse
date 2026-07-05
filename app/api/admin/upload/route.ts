import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { uploadFile, hasBlob } from "@/lib/store/blob";

/**
 * Server-side listing photo upload.
 *
 * The browser POSTs the (already downscaled) image here and we forward it to
 * Vercel Blob with `put()` — which authenticates via the project's OIDC
 * connection (`BLOB_STORE_ID` + `VERCEL_OIDC_TOKEN`), so no read-write token is
 * required. Going through the server also avoids the browser→Blob CORS handshake
 * that the client-upload flow needs. The client shrinks images below the limit
 * before sending, so Vercel's ~4.5 MB request-body cap isn't hit in practice.
 */
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB — stays under Vercel's ~4.5 MB body limit
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasBlob) {
    return NextResponse.json(
      {
        error:
          "Image storage isn't set up yet. Connect a Vercel Blob store to the project (Storage tab).",
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

  const safeName = (file.name || "image").replace(/[^a-zA-Z0-9._-]/g, "-");
  try {
    const url = await uploadFile(
      `listings/${safeName}`,
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
