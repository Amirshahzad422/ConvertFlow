import { SERVER_FALLBACK_IMAGE_SIZE_BYTES } from "./thresholds";

export async function compressPng(file: File): Promise<{ blob: Blob; filename: string }> {
  const filename = `compressed_${file.name}`;

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
  ctx.drawImage(bitmap, 0, 0);

  // Note: re-encoding through Canvas is lighter-weight than the server's
  // pngquant-level compression — large or already-optimized PNGs may not
  // shrink much. That's expected; see FAQ.
  const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Failed to encode PNG");

  return { blob, filename };
}

async function compressViaServer(file: File, filename: string): Promise<{ blob: Blob; filename: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/compress/png", {
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
