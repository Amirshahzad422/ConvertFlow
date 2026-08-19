"use client";

import { useToastStore } from "@/store/toastStore";
import { cn } from "@/lib/utils/cn";

const typeStyles = {
  success: "bg-[#3CCF91] text-white",
  error: "bg-red-500 text-white",
  info: "bg-[#1A2B4C] text-white",
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => removeToast(toast.id)}
          className={cn(
            "cursor-pointer rounded-lg px-4 py-3 shadow-lg text-sm min-w-[220px]",
            typeStyles[toast.type]
          )}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}