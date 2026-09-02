import { SERVER_FALLBACK_IMAGE_SIZE_BYTES } from "./thresholds";

export async function heicToPng(file: File): Promise<{ blob: Blob; filename: string }> {
  const filename = file.name.replace(/\.heic$/i, ".png") || "converted.png";

  if (file.size > SERVER_FALLBACK_IMAGE_SIZE_BYTES) {
    return convertViaServer(file, filename);
  }

  try {
    const heic2any = (await import("heic2any")).default;
    const result = await heic2any({ blob: file, toType: "image/png" });
    const blob = Array.isArray(result) ? result[0] : result;
    return { blob, filename };
  } catch {
    return convertViaServer(file, filename);
  }
}

async function convertViaServer(file: File, filename: string): Promise<{ blob: Blob; filename: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/convert/heic-png", {
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
