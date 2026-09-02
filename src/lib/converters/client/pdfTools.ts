import { degrees, PDFDocument } from "pdf-lib";
import JSZip from "jszip";

const pdfBlob = (bytes: Uint8Array) =>
  new Blob([new Uint8Array(bytes).buffer], { type: "application/pdf" });

export async function rotatePdf(file: File) {
  const pdf = await PDFDocument.load(await file.arrayBuffer());
  for (const page of pdf.getPages()) {
    page.setRotation(degrees((page.getRotation().angle + 90) % 360));
  }
  const bytes = await pdf.save();
  return {
    blob: pdfBlob(bytes),
    filename: `${file.name.replace(/\.pdf$/i, "")}-rotated.pdf`,
  };
}

export async function splitPdf(file: File) {
  const source = await PDFDocument.load(await file.arrayBuffer());
  const zip = new JSZip();
  const base = file.name.replace(/\.pdf$/i, "");

  for (let index = 0; index < source.getPageCount(); index += 1) {
    const output = await PDFDocument.create();
    const [page] = await output.copyPages(source, [index]);
    output.addPage(page);
    zip.file(`${base}-page-${index + 1}.pdf`, await output.save());
  }

  return {
    blob: await zip.generateAsync({ type: "blob" }),
    filename: `${base}-split.zip`,
  };
}

export async function mergePdfs(files: File[]) {
  if (files.length < 2) throw new Error("Choose at least two PDF files to merge.");
  const output = await PDFDocument.create();

  for (const file of files) {
    const source = await PDFDocument.load(await file.arrayBuffer());
    const pages = await output.copyPages(source, source.getPageIndices());
    pages.forEach((page) => output.addPage(page));
  }

  return { blob: pdfBlob(await output.save()), filename: "merged.pdf" };
}
