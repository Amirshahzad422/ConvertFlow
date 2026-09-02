"use client";

import { useMemo, useRef, useState } from "react";
import JSZip from "jszip";
import { UploadZone, type UploadZoneFile } from "@/components/tools/UploadZone";
import { FileStatusList, type FileStatusItem } from "@/components/tools/FileStatusList";
import { Button } from "@/components/ui/Button";
import { useToastStore } from "@/store/toastStore";
import { batchConverterRegistry, converterRegistry } from "@/lib/converters/client/registry";
import { ProgressBar } from "@/components/tools/ProgressBar";
import { Download, RotateCcw } from "lucide-react";
import { useConversionStore } from "@/store/conversionStore";
import { SERVER_FALLBACK_IMAGE_SIZE_BYTES } from "@/lib/converters/client/thresholds";
import type { Accept } from "react-dropzone";

interface ToolConverterPanelProps {
  toolName: string;
  converterFn: string;
  batchMode?: boolean;
  operation?: "convert" | "compress" | "tool";
  fromFormat?: string;
  toFormat?: string;
  category?: string;
}

const SERVER_IMAGE_TARGETS = new Set(["jpg", "jpeg", "png", "webp", "svg"]);

const FORMAT_ACCEPT: Record<string, Accept> = {
  pdf: { "application/pdf": [".pdf"] },
  image: { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tif", ".tiff", ".heic", ".heif", ".svg", ".jfif", ".apng"] },
  video: { "video/*": [".mp4", ".mov", ".webm", ".avi", ".mkv", ".mpeg", ".mpg"] },
  audio: { "audio/*": [".mp3", ".wav", ".ogg", ".m4a", ".aac", ".flac", ".wma"] },
};

function acceptedFileTypes(fromFormat?: string): Accept | undefined {
  if (!fromFormat || fromFormat === "*") return undefined;
  const format = fromFormat.toLowerCase();
  if (FORMAT_ACCEPT[format]) return FORMAT_ACCEPT[format];
  if (["jpg", "jpeg", "jfif"].includes(format)) return { "image/jpeg": [`.${format}`] };
  if (["png", "apng"].includes(format)) return { "image/png": [`.${format}`] };
  if (["heic", "heif"].includes(format)) return { "image/heic": [".heic", ".heif"] };
  if (["webp", "gif", "svg", "bmp", "tiff"].includes(format)) return { [`image/${format === "svg" ? "svg+xml" : format}`]: [`.${format}`] };
  if (["mp4", "mov", "webm", "avi"].includes(format)) return { [`video/${format === "mov" ? "quicktime" : format}`]: [`.${format}`] };
  if (["mp3", "wav", "ogg"].includes(format)) return { [`audio/${format === "mp3" ? "mpeg" : format}`]: [`.${format}`] };
  return undefined;
}

/**
 * Large images are slow and memory-hungry to convert with Canvas in the
 * browser, so hand them to the Sharp-powered API route instead. Returns null
 * when the client converter should handle the file after all.
 */
async function convertLargeImageOnServer(
  file: File,
  operation: ToolConverterPanelProps["operation"],
  toFormat?: string,
): Promise<{ blob: Blob; filename: string } | null> {
  if (file.size <= SERVER_FALLBACK_IMAGE_SIZE_BYTES) return null;
  if (!file.type.startsWith("image/")) return null;

  const base = file.name.replace(/\.[^.]+$/, "");
  const body = new FormData();
  body.append("file", file);

  if (operation === "compress") {
    const requested = (toFormat || "").toLowerCase();
    if (!["jpg", "jpeg", "png", "webp"].includes(requested)) return null;
    const ext = requested === "jpeg" ? "jpg" : requested;
    body.append("output", ext);
    body.append("quality", "80");
    const res = await fetch("/api/compress/image", { method: "POST", body });
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Server compression failed");
    return { blob: await res.blob(), filename: `${base}-compressed.${ext}` };
  }

  const target = (toFormat || "png").toLowerCase();
  if (!SERVER_IMAGE_TARGETS.has(target)) return null;
  body.append("target", target);
  body.append("quality", "90");
  const res = await fetch("/api/convert/image", { method: "POST", body });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Server conversion failed");
  const ext = target === "jpeg" ? "jpg" : target;
  return { blob: await res.blob(), filename: `${base}.${ext}` };
}

interface ResultFile {
  id: string;
  blob: Blob;
  filename: string;
}

export function ToolConverterPanel({ toolName, converterFn, batchMode = false, operation, fromFormat, toFormat, category }: ToolConverterPanelProps) {
  const [uploaded, setUploaded] = useState<UploadZoneFile[]>([]);
  const [statusFiles, setStatusFiles] = useState<FileStatusItem[]>([]);
  const [results, setResults] = useState<ResultFile[]>([]);
  const addToast = useToastStore((s) => s.addToast);
  const addHistoryEntry = useConversionStore((s) => s.addHistoryEntry);
  const [isConverting, setIsConverting] = useState(false);
  const [uploadSession, setUploadSession] = useState(0);
  const cancelledIds = useRef(new Set<string>());

  const overallProgress = useMemo(() => {
    if (!statusFiles.length) return 0;
    return statusFiles.reduce((sum, file) => sum + file.progress, 0) / statusFiles.length;
  }, [statusFiles]);

  async function handleConvert() {
    if (uploaded.length === 0) {
      addToast("Add at least one file first.", "error");
      return;
    }

    const converter = converterRegistry[converterFn];
    const batchConverter = batchConverterRegistry[converterFn];
    if ((!batchMode && !converter) || (batchMode && !batchConverter)) {
      addToast(`No converter wired up yet for "${converterFn}".`, "error");
      return;
    }

    if (batchMode && uploaded.length < 2) {
      addToast("Add at least two files for this tool.", "error");
      return;
    }

    const initial: FileStatusItem[] = uploaded.map((f) => ({
      id: f.id,
      name: f.file.name,
      size: f.file.size,
      progress: 0,
      status: "processing",
    }));
    setStatusFiles(initial);
    setResults([]);
    setIsConverting(true);
    cancelledIds.current.clear();

    if (batchMode && batchConverter) {
      try {
        const result = await batchConverter(uploaded.map((item) => item.file));
        setResults([{ id: crypto.randomUUID(), ...result }]);
        setStatusFiles((prev) => prev.map((file) => ({ ...file, status: "done", progress: 100 })));
        addHistoryEntry({ toolSlug: converterFn, filename: result.filename, size: result.blob.size });
      } catch (error) {
        setStatusFiles((prev) => prev.map((file) => ({ ...file, status: "error", progress: 0 })));
        addToast(error instanceof Error ? error.message : "Conversion failed.", "error");
      } finally {
        setIsConverting(false);
      }
      return;
    }

    for (const item of uploaded) {
      await processItem(item, converter);
    }
    setIsConverting(false);
  }

  async function processItem(item: UploadZoneFile, converter = converterRegistry[converterFn]) {
    if (!converter) return;
    cancelledIds.current.delete(item.id);
    setStatusFiles((prev) => prev.map((file) => file.id === item.id ? { ...file, status: "processing", progress: 10 } : file));
    try {
      let result: { blob: Blob; filename: string } | null = null;
      if (category === "image" && (operation === "convert" || operation === "compress")) {
        result = await convertLargeImageOnServer(item.file, operation, toFormat);
      }
      const { blob, filename } = result ?? (await converter(item.file));
      if (cancelledIds.current.has(item.id)) return;
      setResults((prev) => [...prev.filter((result) => result.id !== item.id), { id: item.id, blob, filename }]);
      addHistoryEntry({ toolSlug: converterFn, filename, size: blob.size });
      setStatusFiles((prev) => prev.map((file) => file.id === item.id ? { ...file, status: "done", progress: 100 } : file));
    } catch {
      if (cancelledIds.current.has(item.id)) return;
      setStatusFiles((prev) => prev.map((file) => file.id === item.id ? { ...file, status: "error", progress: 0 } : file));
      addToast(`Failed to convert ${item.file.name}`, "error");
    }
  }

  function cancel(id: string) {
    cancelledIds.current.add(id);
    setStatusFiles((prev) => prev.filter((file) => file.id !== id));
  }

  function retry(id: string) {
    const item = uploaded.find((file) => file.id === id);
    if (item) void processItem(item);
  }

  async function handleDownloadAll() {
    const zip = new JSZip();
    results.forEach((result) => zip.file(result.filename, result.blob));
    const blob = await zip.generateAsync({ type: "blob" });
    handleDownload({ id: "all", blob, filename: "convertflow-results.zip" });
  }

  function reset() {
    setUploaded([]);
    setStatusFiles([]);
    setResults([]);
    setUploadSession((value) => value + 1);
  }

  function handleDownload(result: ResultFile) {
    const url = URL.createObjectURL(result.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = result.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-4">
      <UploadZone key={uploadSession} accept={acceptedFileTypes(fromFormat)} maxFiles={20} maxSizeMB={100} onFilesChange={setUploaded} />

      <Button onClick={handleConvert} disabled={uploaded.length === 0 || isConverting}>
        {isConverting ? "Processing…" : operation === "compress" ? `Compress ${fromFormat ?? "file"}` : operation === "convert" ? `Convert to ${toFormat ?? "output"}` : toolName}
      </Button>

      {statusFiles.length > 1 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Overall progress</span><span>{Math.round(overallProgress)}%</span>
          </div>
          <ProgressBar value={overallProgress} size="sm" />
        </div>
      )}

      {statusFiles.length > 0 && (
        <FileStatusList
          files={statusFiles}
          onCancel={cancel}
          onRetry={retry}
        />
      )}

      {results.length > 0 && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
          <div className="flex flex-col gap-2">
          {results.map((r) => (
            <button
              key={r.id}
              onClick={() => handleDownload(r)}
              className="flex items-center gap-2 text-left text-sm font-bold text-emerald-700 hover:underline"
            >
              <Download className="size-4" /> Download {r.filename}
            </button>
          ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-emerald-200 pt-4">
            {results.length > 1 && <Button onClick={handleDownloadAll}>Download all as ZIP</Button>}
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-slate-600 hover:bg-white"><RotateCcw className="size-4" /> Convert more</button>
          </div>
          <p className="mt-3 text-xs text-slate-500">Browser results stay on this device. Temporary server files are deleted after one hour.</p>
        </div>
      )}
    </div>
  );
}
