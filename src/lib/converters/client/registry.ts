import { webpToPng } from "./webpToPng";

export type ConverterFn = (file: File) => Promise<{ blob: Blob; filename: string }>;

export const converterRegistry: Record<string, ConverterFn> = {
  webpToPng,
};