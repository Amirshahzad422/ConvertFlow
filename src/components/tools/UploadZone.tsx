"use client";

import { useCallback, useState } from "react";
import { useDropzone, type Accept } from "react-dropzone";
import { cn } from "@/lib/utils/cn";

export interface UploadZoneFile {
  id: string;
  file: File;
  previewUrl?: string;
}

interface UploadZoneProps {
  accept?: Accept; // e.g. { "image/*": [".png", ".jpg", ".webp"] }
  maxFiles?: number;
  maxSizeMB?: number;
  onFilesChange?: (files: UploadZoneFile[]) => void;
  className?: string;
}

function makeId() {
  return crypto.randomUUID();
}

export function UploadZone({
  accept,
  maxFiles = 20,
  maxSizeMB = 100,
  onFilesChange,
  className,
}: UploadZoneProps) {
  const [files, setFiles] = useState<UploadZoneFile[]>([]);
  const [sizeError, setSizeError] = useState<string | null>(null);

  const updateFiles = useCallback(
    (next: UploadZoneFile[]) => {
      setFiles(next);
      onFilesChange?.(next);
    },
    [onFilesChange]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setSizeError(null);

      const maxBytes = maxSizeMB * 1024 * 1024;
      const oversized = acceptedFiles.filter((f) => f.size > maxBytes);
      const valid = acceptedFiles.filter((f) => f.size <= maxBytes);

      if (oversized.length > 0) {
        setSizeError(
          `${oversized.length} file(s) exceed the ${maxSizeMB}MB limit and were skipped.`
        );
      }

      const room = Math.max(0, maxFiles - files.length);
      const toAdd = valid.slice(0, room);

      const newItems: UploadZoneFile[] = toAdd.map((file) => ({
        id: makeId(),
        file,
        previewUrl: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      }));

      updateFiles([...files, ...newItems]);
    },
    [files, maxFiles, maxSizeMB, updateFiles]
  );

  const removeFile = useCallback(
    (id: string) => {
      const target = files.find((f) => f.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      updateFiles(files.filter((f) => f.id !== id));
    },
    [files, updateFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    disabled: files.length >= maxFiles,
  });

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-[#00B4D8] bg-[#00B4D8]/5"
            : "border-gray-300 hover:border-[#1A2B4C]/40",
          files.length >= maxFiles && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <p className="text-sm font-medium text-[#1A2B4C]">
          {isDragActive ? "Drop files here" : "Drag & drop files, or click to select"}
        </p>
        <p className="text-xs text-gray-400">
          Up to {maxFiles} files, max {maxSizeMB}MB each
        </p>
      </div>

      {sizeError && (
        <p className="mt-2 text-xs text-red-600">{sizeError}</p>
      )}

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {files.map((item) => (
            <div
              key={item.id}
              className="relative rounded-lg border border-gray-200 bg-white p-2"
            >
              {item.previewUrl ? (
                <img
                  src={item.previewUrl}
                  alt={item.file.name}
                  className="h-20 w-full rounded-md object-cover"
                />
              ) : (
                <div className="flex h-20 w-full items-center justify-center rounded-md bg-gray-100 text-xs text-gray-400">
                  {item.file.name.split(".").pop()?.toUpperCase() ?? "FILE"}
                </div>
              )}
              <p className="mt-1 truncate text-xs text-gray-600">{item.file.name}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(item.id);
                }}
                className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs hover:bg-red-600"
                aria-label={`Remove ${item.file.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}