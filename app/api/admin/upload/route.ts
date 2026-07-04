import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { uploadFile, BlobNotConfiguredError } from "@/lib/store/blob";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      { error: "Image must be under 5 MB" },
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
    if (err instanceof BlobNotConfiguredError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    console.error("[upload] failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
