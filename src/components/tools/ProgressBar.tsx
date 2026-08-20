import { cn } from "@/lib/utils/cn";

type ProgressVariant = "linear" | "circular";
type ProgressSize = "sm" | "md" | "lg";

interface ProgressBarProps {
  value: number; // 0-100
  variant?: ProgressVariant;
  size?: ProgressSize;
  showLabel?: boolean;
  className?: string;
}

const circularSizes: Record<ProgressSize, number> = {
  sm: 32,
  md: 48,
  lg: 64,
};

const linearHeights: Record<ProgressSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function ProgressBar({
  value,
  variant = "linear",
  size = "md",
  showLabel = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  if (variant === "circular") {
    const dim = circularSizes[size];
    const strokeWidth = size === "sm" ? 3 : size === "md" ? 4 : 5;
    const radius = (dim - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (clamped / 100) * circumference;

    return (
      <div className={cn("relative inline-flex items-center justify-center", className)}>
        <svg width={dim} height={dim} className="-rotate-90">
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            stroke="#00B4D8"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-300 ease-out"
          />
        </svg>
        {showLabel && (
          <span className="absolute text-xs font-medium text-[#1A2B4C]">
            {Math.round(clamped)}%
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("w-full rounded-full bg-gray-200 overflow-hidden", linearHeights[size])}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#1A2B4C] to-[#00B4D8] transition-all duration-300 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="mt-1 block text-xs text-gray-500">{Math.round(clamped)}%</span>
      )}
    </div>
  );
}