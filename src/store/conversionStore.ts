import { create } from "zustand";

export type ConversionStatus = "queued" | "processing" | "done" | "error";

export interface QueuedFile {
  id: string;
  name: string;
  size: number;
  status: ConversionStatus;
  progress: number;
}

export interface DownloadHistoryEntry {
  id: string;
  toolSlug: string;
  filename: string;
  size: number;
  convertedAt: number;
}

interface ConversionState {
  queue: QueuedFile[];
  history: DownloadHistoryEntry[];
  setQueue: (files: QueuedFile[]) => void;
  updateFile: (id: string, patch: Partial<QueuedFile>) => void;
  clearQueue: () => void;
  addHistoryEntry: (entry: Omit<DownloadHistoryEntry, "id" | "convertedAt">) => void;
  clearHistory: () => void;
}

/**
 * Shared upload-queue / conversion-status / download-history state so
 * ToolConverterPanel (and eventually a "recent downloads" widget) can
 * consume it instead of each tool page owning isolated local state.
 */
export const useConversionStore = create<ConversionState>((set) => ({
  queue: [],
  history: [],
  setQueue: (files) => set({ queue: files }),
  updateFile: (id, patch) =>
    set((state) => ({
      queue: state.queue.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    })),
  clearQueue: () => set({ queue: [] }),
  addHistoryEntry: (entry) =>
    set((state) => ({
      history: [
        { ...entry, id: crypto.randomUUID(), convertedAt: Date.now() },
        ...state.history,
      ].slice(0, 50),
    })),
  clearHistory: () => set({ history: [] }),
}));
