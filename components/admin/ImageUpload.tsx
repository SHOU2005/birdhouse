"use client";

import { useRef, useState } from "react";

/**
 * Multi-image gallery uploader. Each file is downscaled in the browser and
 * POSTed to `/api/admin/upload`, which stores it on Vercel Blob (via the
 * project's OIDC connection) and returns a public URL. Every URL is submitted
 * as a repeated hidden `<input name={name}>`; the first image is the cover.
 */

/**
 * Shrink and re-encode an image to a web-friendly JPEG so it always lands well
 * under the upload size limit — and so HEIC/large phone photos work too. Falls
 * back to the original file if the browser can't decode it.
 */
async function downscale(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const maxDim = 1920;
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.85)
    );
    return blob ?? file;
  } catch {
    return file;
  }
}
export default function ImageUpload({
  name,
  defaultValue = [],
}: {
  name: string;
  defaultValue?: string[];
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [manual, setManual] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setBusy(true);
    setError("");

    const results = await Promise.allSettled(
      files.map(async (file) => {
        const blob = await downscale(file);
        const fd = new FormData();
        const base = file.name.replace(/\.[^.]+$/, "") || "image";
        fd.append("file", blob, `${base}.jpg`);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: fd,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        return data.url as string;
      })
    );

    const ok: string[] = [];
    const errors: string[] = [];
    for (const r of results) {
      if (r.status === "fulfilled") ok.push(r.value);
      else errors.push(r.reason?.message || "Upload failed");
    }
    if (ok.length) setUrls((prev) => [...prev, ...ok]);
    if (errors.length) setError(errors[0]);

    setBusy(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function addManual() {
    const v = manual.trim();
    if (!v) return;
    setUrls((prev) => (prev.includes(v) ? prev : [...prev, v]));
    setManual("");
  }

  const removeAt = (i: number) => setUrls((p) => p.filter((_, j) => j !== i));
  const makeCover = (i: number) =>
    setUrls((p) => [p[i], ...p.filter((_, j) => j !== i)]);

  return (
    <div className="space-y-3">
      {urls.map((url) => (
        <input key={url} type="hidden" name={name} value={url} readOnly />
      ))}

      {urls.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {urls.map((url, i) => (
            <div
              key={url}
              className="group relative overflow-hidden rounded-lg border border-slate-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-28 w-full object-cover" />
              {i === 0 && (
                <span className="absolute left-1.5 top-1.5 rounded bg-sky-700 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  Cover
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/50 px-2 py-1 text-[11px] text-white opacity-0 transition group-hover:opacity-100">
                {i !== 0 ? (
                  <button type="button" onClick={() => makeCover(i)} className="hover:underline">
                    Make cover
                  </button>
                ) : (
                  <span />
                )}
                <button type="button" onClick={() => removeAt(i)} className="hover:underline">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-28 w-full items-center justify-center rounded-lg border border-dashed border-slate-300 text-sm text-slate-400">
          No images yet
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-900 disabled:opacity-60"
        >
          {busy ? "Uploading…" : "Upload images"}
        </button>
        <span className="text-xs text-slate-400">
          JPEG, PNG, WebP or AVIF · resized automatically · select several at once
        </span>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleFiles}
          className="hidden"
        />
      </div>

      <div className="flex gap-2">
        <input
          type="url"
          value={manual}
          onChange={(e) => setManual(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addManual();
            }
          }}
          placeholder="…or paste an image URL / path like /images/foo.webp"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
        />
        <button
          type="button"
          onClick={addManual}
          className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Add
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
