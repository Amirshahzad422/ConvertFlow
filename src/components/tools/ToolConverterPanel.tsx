"use client";

import { useState } from "react";
import { UploadZone, type UploadZoneFile } from "@/components/tools/UploadZone";
import { FileStatusList, type FileStatusItem } from "@/components/tools/FileStatusList";
import { Button } from "@/components/ui/Button";
import { useToastStore } from "@/store/toastStore";
import { converterRegistry } from "@/lib/converters/client/registry";

interface ToolConverterPanelProps {
  toolName: string;
  converterFn: string;
}

interface ResultFile {
  id: string;
  blob: Blob;
  filename: string;
}

export function ToolConverterPanel({ toolName, converterFn }: ToolConverterPanelProps) {
  const [uploaded, setUploaded] = useState<UploadZoneFile[]>([]);
  const [statusFiles, setStatusFiles] = useState<FileStatusItem[]>([]);
  const [results, setResults] = useState<ResultFile[]>([]);
  const addToast = useToastStore((s) => s.addToast);

  async function handleConvert() {
    if (uploaded.length === 0) {
      addToast("Add at least one file first.", "error");
      return;
    }

    const converter = converterRegistry[converterFn];
    if (!converter) {
      addToast(`No converter wired up yet for "${converterFn}".`, "error");
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

    for (const item of uploaded) {
      try {
        const { blob, filename } = await converter(item.file);
        setResults((prev) => [...prev, { id: item.id, blob, filename }]);
        setStatusFiles((prev) =>
          prev.map((f) => (f.id === item.id ? { ...f, status: "done", progress: 100 } : f))
        );
      } catch (err) {
        setStatusFiles((prev) =>
          prev.map((f) => (f.id === item.id ? { ...f, status: "error", progress: 0 } : f))
        );
        addToast(`Failed to convert ${item.file.name}`, "error");
      }
    }
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
      <UploadZone maxFiles={20} maxSizeMB={100} onFilesChange={setUploaded} />

      <Button onClick={handleConvert} disabled={uploaded.length === 0}>
        Convert to {toolName}
      </Button>

      {statusFiles.length > 0 && (
        <FileStatusList
          files={statusFiles}
          onCancel={(id) => setStatusFiles((prev) => prev.filter((f) => f.id !== id))}
          onRetry={(id) =>
            setStatusFiles((prev) =>
              prev.map((f) => (f.id === id ? { ...f, status: "processing", progress: 0 } : f))
            )
          }
        />
      )}

      {results.length > 0 && (
        <div className="flex flex-col gap-2">
          {results.map((r) => (
            <button
              key={r.id}
              onClick={() => handleDownload(r)}
              className="text-left text-sm font-medium text-[#00B4D8] hover:underline"
            >
              Download {r.filename}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}