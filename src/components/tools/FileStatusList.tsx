import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/tools/ProgressBar";

export type FileStatus = "queued" | "processing" | "done" | "error";

export interface FileStatusItem {
  id: string;
  name: string;
  size: number; // bytes
  progress: number; // 0-100
  status: FileStatus;
}

interface FileStatusListProps {
  files: FileStatusItem[];
  onCancel?: (id: string) => void;
  onRetry?: (id: string) => void;
  className?: string;
}

const statusBadgeVariant: Record<FileStatus, "default" | "success" | "warning" | "error"> = {
  queued: "default",
  processing: "warning",
  done: "success",
  error: "error",
};

const statusLabel: Record<FileStatus, string> = {
  queued: "Queued",
  processing: "Processing",
  done: "Done",
  error: "Error",
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

export function FileStatusList({ files, onCancel, onRetry, className }: FileStatusListProps) {
  if (files.length === 0) return null;

  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {files.map((file) => (
        <li
          key={file.id}
          className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-3"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-medium text-[#1A2B4C]">
                {file.name}
              </span>
              <Badge variant={statusBadgeVariant[file.status]}>
                {statusLabel[file.status]}
              </Badge>
            </div>
            <span className="text-xs text-gray-400">{formatBytes(file.size)}</span>

            {(file.status === "processing" || file.status === "queued") && (
              <div className="mt-2">
                <ProgressBar value={file.progress} variant="linear" size="sm" showLabel />
              </div>
            )}
          </div>

          <div className="flex shrink-0 gap-2">
            {(file.status === "processing" || file.status === "queued") && onCancel && (
              <button
                onClick={() => onCancel(file.id)}
                className="text-xs font-medium text-gray-500 hover:text-red-600"
              >
                Cancel
              </button>
            )}
            {file.status === "error" && onRetry && (
              <button
                onClick={() => onRetry(file.id)}
                className="text-xs font-medium text-[#00B4D8] hover:text-[#1A2B4C]"
              >
                Retry
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}