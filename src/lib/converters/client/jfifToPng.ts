import { SERVER_FALLBACK_IMAGE_SIZE_BYTES } from "./thresholds";

export async function jfifToPng(file: File): Promise<{ blob: Blob; filename: string }> {
  const filename = file.name.replace(/\.jfif$/i, ".png") || "converted.png";

  if (file.size > SERVER_FALLBACK_IMAGE_SIZE_BYTES) {
    return convertViaServer(file, filename);
  }

  try {
    return await convertInBrowser(file, filename);
  } catch {
    return convertViaServer(file, filename);
  }
}

async function convertInBrowser(file: File, filename: string): Promise<{ blob: Blob; filename: string }> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser");
  ctx.drawImage(bitmap, 0, 0);

  const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Failed to encode PNG");

  return { blob, filename };
}

async function convertViaServer(file: File, filename: string): Promise<{ blob: Blob; filename: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/convert/jfif-png", {
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
  const blob = new Blob([byteArray], { type: "image/png" });

  return { blob, filename };
}
