"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

/**
 * Single-image uploader. The file is uploaded directly from the browser to
 * Vercel Blob (client upload → no 4.5 MB serverless limit) and the resulting
 * URL is submitted with the form as a hidden `<input name={name}>`.
 */
export default function ImageUpload({
  name,
  defaultValue = "",
}: {
  name: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const result = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      setUrl(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      {/* The URL is the source of truth submitted with the form. */}
      <input type="hidden" name={name} value={url} readOnly />

      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt="Preview"
          className="h-40 w-full rounded-lg border border-slate-200 object-cover"
        />
      ) : (
        <div className="flex h-40 w-full items-center justify-center rounded-lg border border-dashed border-slate-300 text-sm text-slate-400">
          No image selected
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-900 disabled:opacity-60"
        >
          {busy ? "Uploading…" : url ? "Replace image" : "Upload image"}
        </button>
        {url && (
          <button
            type="button"
            onClick={() => setUrl("")}
            className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:text-slate-800"
          >
            Remove
          </button>
        )}
        <span className="text-xs text-slate-400">
          JPEG, PNG, WebP or AVIF · up to 8 MB
        </span>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleFile}
          className="hidden"
        />
      </div>

      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="…or paste an image URL / path like /images/foo.webp"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
