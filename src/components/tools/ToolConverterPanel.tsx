"use client";

import { useState } from "react";
import { UploadZone, type UploadZoneFile } from "@/components/tools/UploadZone";
import { FileStatusList, type FileStatusItem } from "@/components/tools/FileStatusList";
import { Button } from "@/components/ui/Button";
import { useToastStore } from "@/store/toastStore";

interface ToolConverterPanelProps {
  toolName: string;
  converterFn: string; // key used to look up the real converter later (Day 2 wiring)
}

export function ToolConverterPanel({ toolName, converterFn }: ToolConverterPanelProps) {
  const [uploaded, setUploaded] = useState<UploadZoneFile[]>([]);
  const [statusFiles, setStatusFiles] = useState<FileStatusItem[]>([]);
  const addToast = useToastStore((s) => s.addToast);

  function handleConvert() {
    if (uploaded.length === 0) {
      addToast("Add at least one file first.", "error");
      return;
    }

    // Placeholder: real converter wiring (using `converterFn`) happens during
    // the Day 2 tool migration. For now this just proves the UI flow works.
    const initial: FileStatusItem[] = uploaded.map((f) => ({
      id: f.id,
      name: f.file.name,
      size: f.file.size,
      progress: 0,
      status: "queued",
    }));
    setStatusFiles(initial);
    addToast(`Converting ${uploaded.length} file(s) with ${converterFn}...`, "info");
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
          onCancel={(id) =>
            setStatusFiles((prev) => prev.filter((f) => f.id !== id))
          }
          onRetry={(id) =>
            setStatusFiles((prev) =>
              prev.map((f) => (f.id === id ? { ...f, status: "queued", progress: 0 } : f))
            )
          }
        />
      )}
    </div>
  );
}