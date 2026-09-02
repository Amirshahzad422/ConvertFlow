import { PDFDocument } from "pdf-lib";
import { SERVER_FALLBACK_IMAGE_SIZE_BYTES } from "./thresholds";

export async function heicToPdf(file: File): Promise<{ blob: Blob; filename: string }> {
  const filename = file.name.replace(/\.heic$/i, ".pdf") || "converted.pdf";

  if (file.size > SERVER_FALLBACK_IMAGE_SIZE_BYTES) {
    return convertViaServer(file, filename);
  }

  try {
    const heic2any = (await import("heic2any")).default;
    const result = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 });
    const jpegBlob = Array.isArray(result) ? result[0] : result;
    const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());

    const pdfDoc = await PDFDocument.create();
    const image = await pdfDoc.embedJpg(jpegBytes);
    const { width, height } = image.scale(1);
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(image, { x: 0, y: 0, width, height });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes).buffer], { type: "application/pdf" });
    return { blob, filename };
  } catch {
    return convertViaServer(file, filename);
  }
}

async function convertViaServer(file: File, filename: string): Promise<{ blob: Blob; filename: string }> {
  const formData = new FormData();
  formData.append("files", file);

  const res = await fetch("/api/convert/heic-pdf", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to convert image");
  }

  const data = await res.json();
  const byteChars = atob(data.base64);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });

  return { blob, filename };
}
