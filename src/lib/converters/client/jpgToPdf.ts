import { PDFDocument } from "pdf-lib";

export async function jpgToPdf(file: File): Promise<{ blob: Blob; filename: string }> {
  const filename = file.name.replace(/\.(jpg|jpeg)$/i, ".pdf") || "converted.pdf";
  const bytes = new Uint8Array(await file.arrayBuffer());

  const pdfDoc = await PDFDocument.create();
  const image = await pdfDoc.embedJpg(bytes);

  const { width, height } = image.scale(1);
  const page = pdfDoc.addPage([width, height]);
  page.drawImage(image, { x: 0, y: 0, width, height });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([new Uint8Array(pdfBytes).buffer], { type: "application/pdf" });
  return { blob, filename };
}
