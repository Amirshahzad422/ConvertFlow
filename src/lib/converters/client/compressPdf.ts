import { PDFDocument } from "pdf-lib";
import { SERVER_FALLBACK_IMAGE_SIZE_BYTES } from "./thresholds";

export async function compressPdf(file: File): Promise<{ blob: Blob; filename: string }> {
  const filename = file.name.replace(/\.[^.]+$/, "") + "-compressed.pdf";

  if (file.size > SERVER_FALLBACK_IMAGE_SIZE_BYTES) {
    return compressViaServer(file, filename);
  }

  try {
    const input = new Uint8Array(await file.arrayBuffer());
    const srcPdf = await PDFDocument.load(input, { updateMetadata: true });
    const outPdf = await PDFDocument.create();

    const pages = await outPdf.copyPages(srcPdf, srcPdf.getPageIndices());
    pages.forEach((page) => outPdf.addPage(page));

    const bytes = await outPdf.save({ useObjectStreams: false });
    const blob = new Blob([new Uint8Array(bytes).buffer], { type: "application/pdf" });
    return { blob, filename };
  } catch {
    return compressViaServer(file, filename);
  }
}

async function compressViaServer(file: File, filename: string): Promise<{ blob: Blob; filename: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/compress/pdf", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to compress PDF");
  }

  const blob = await res.blob();
  return { blob, filename };
}
