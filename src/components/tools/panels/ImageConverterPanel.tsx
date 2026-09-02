"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";

type Target = "png" | "jpg" | "webp" | "svg";

const TARGETS: { value: Target; label: string }[] = [
  { value: "png", label: "PNG" },
  { value: "jpg", label: "JPG" },
  { value: "webp", label: "WEBP" },
  { value: "svg", label: "SVG" },
];

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg", "image/jpg", "image/png", "image/gif", "image/bmp",
  "image/webp", "image/svg+xml", "image/tiff", "image/x-icon", "image/avif",
];
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff", "ico", "avif"];

export default function ImageConverterPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [target, setTarget] = useState<Target>("png");
  const [isLoading, setIsLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setResultName("");
    setResultSize(0);
    setError(null);
  };

  const handleFileChange = (selected: File | null) => {
    reset();
    setFile(selected);
  };

  async function handleConvert() {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("target", target);
      form.append("quality", "90");

      const res = await fetch("/api/convert/image", { method: "POST", body: form });
      if (!res.ok) {
        throw new Error((await res.json().catch(() => ({}))).error || "Conversion failed.");
      }
      const blob = await res.blob();
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const base = file.name.replace(/\.[^.]+$/, "");
      setResultUrl(URL.createObjectURL(blob));
      setResultName(`${base}.${target === "jpg" ? "jpg" : target}`);
      setResultSize(blob.size);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleDownload() {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = resultName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 sm:flex-row sm:items-center">
        Convert to
        <select
          value={target}
          onChange={(e) => {
            setTarget(e.target.value as Target);
            reset();
          }}
          className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500 sm:w-40"
        >
          {TARGETS.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </label>

      <FileUpload
        placeholder="Choose Files"
        icon=""
        boxed
        showHelp
        maxFileSize={MAX_FILE_SIZE}
        allowedMimeTypes={ALLOWED_MIME_TYPES}
        allowedExtensions={ALLOWED_EXTENSIONS}
        onFileChange={handleFileChange}
        onError={setError}
        actionButtonText={`Convert to ${target.toUpperCase()}`}
        onAction={handleConvert}
        isLoading={isLoading}
        showResult={!!resultUrl}
        resultUrl={resultUrl || undefined}
        resultFileName={resultName}
        resultFileSize={resultSize}
        onDownload={handleDownload}
        className="space-y-2"
      />

      {error && (
        <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
