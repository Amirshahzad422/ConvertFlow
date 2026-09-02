import JSZip from "jszip";

// Render at roughly 144 DPI (2x the standard 72 DPI PDF unit scale).
const RENDER_SCALE = 144 / 72;

export async function pdfToImages(file: File): Promise<{ blob: Blob; filename: string }> {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  const zip = new JSZip();

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: RENDER_SCALE });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not supported in this browser");

    await page.render({ canvasContext: ctx, viewport, canvas }).promise;

    const pageBlob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!pageBlob) throw new Error(`Failed to render page ${pageNumber}`);

    zip.file(`page-${pageNumber}.png`, pageBlob);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  return { blob, filename: "pages.zip" };
}
