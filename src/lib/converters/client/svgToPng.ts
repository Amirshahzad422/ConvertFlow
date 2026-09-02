const MAX_DIMENSION = 1024;

export async function svgToPng(file: File): Promise<{ blob: Blob; filename: string }> {
  const filename = file.name.replace(/\.[^/.]+$/, "") + ".png" || "converted.png";

  const svgText = await file.text();
  const svgUrl = URL.createObjectURL(new Blob([svgText], { type: "image/svg+xml" }));

  try {
    const img = new Image();
    img.decoding = "async";

    const loaded = new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load SVG"));
    });
    img.src = svgUrl;
    await loaded;

    let width = img.naturalWidth || MAX_DIMENSION;
    let height = img.naturalHeight || MAX_DIMENSION;

    // Scale down oversized SVGs (e.g. ones with huge intrinsic viewBoxes)
    // to a reasonable maximum dimension.
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not supported in this browser");
    ctx.drawImage(img, 0, 0, width, height);

    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) throw new Error("Failed to encode PNG");

    return { blob, filename };
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}
