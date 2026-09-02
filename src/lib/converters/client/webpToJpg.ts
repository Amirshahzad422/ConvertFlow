import { SERVER_FALLBACK_IMAGE_SIZE_BYTES } from "./thresholds";

export async function webpToJpg(file: File): Promise<{ blob: Blob; filename: string }> {
  const filename = file.name.replace(/\.webp$/i, ".jpg") || "converted.jpg";

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
  // JPG has no alpha channel — paint a white background first so any
  // transparent WEBP pixels don't turn black.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0);

  const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.9));
  if (!blob) throw new Error("Failed to encode JPG");

  return { blob, filename };
}

async function convertViaServer(file: File, filename: string): Promise<{ blob: Blob; filename: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/convert/webp-jpg", {
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
  const blob = new Blob([byteArray], { type: "image/jpeg" });

  return { blob, filename };
}
