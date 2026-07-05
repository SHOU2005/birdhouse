import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { requireAdmin } from "@/lib/auth/session";
import { hasBlob } from "@/lib/store/blob";

/**
 * Client-upload token endpoint for listing photos.
 *
 * Files are uploaded directly from the browser to Vercel Blob (via
 * `upload()` from `@vercel/blob/client`), which avoids Vercel's ~4.5 MB
 * serverless request-body limit — the usual cause of "upload failed" on real
 * photos — and lets several images upload in parallel.
 */
export async function POST(request: Request): Promise<NextResponse> {
  if (!hasBlob) {
    return NextResponse.json(
      {
        error:
          "Image storage isn't set up yet. Add a Vercel Blob store to the project (Storage tab) so uploads can be saved.",
      },
      { status: 503 }
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Only a signed-in admin may obtain an upload token.
        await requireAdmin();
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
          ],
          maximumSizeInBytes: 8 * 1024 * 1024, // 8 MB
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // The client keeps the returned URL and submits it with the form.
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("[upload] failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 400 }
    );
  }
}
