import { SERVER_FALLBACK_IMAGE_SIZE_BYTES } from "./thresholds";

// Fixed quality setting that balances visual quality against file size,
// matching the "good default" the old JPEG compressor page shipped with.
const JPEG_QUALITY = 0.75;

export async function compressJpeg(file: File): Promise<{ blob: Blob; filename: string }> {
  const filename = file.name.replace(/\.[^.]+$/, "") + "-compressed.jpg";

  if (file.size > SERVER_FALLBACK_IMAGE_SIZE_BYTES) {
    return compressViaServer(file, filename);
  }

  try {
    return await compressInBrowser(file, filename);
  } catch {
    return compressViaServer(file, filename);
  }
}

async function compressInBrowser(file: File, filename: string): Promise<{ blob: Blob; filename: string }> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY)
  );
  if (!blob) throw new Error("Failed to encode JPEG");

  return { blob, filename };
}

async function compressViaServer(file: File, filename: string): Promise<{ blob: Blob; filename: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("quality", String(Math.round(JPEG_QUALITY * 100)));

  const res = await fetch("/api/compress/jpeg", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to compress image");
  }

  const blob = await res.blob();
  return { blob, filename };
}
