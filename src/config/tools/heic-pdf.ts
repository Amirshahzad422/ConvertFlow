import type { ToolConfig } from "./types";

export const heicPdfConfig: ToolConfig = {
  slug: "heic-pdf",
  name: "HEIC to PDF Converter",
  description: "Convert HEIC images to PDF format with high quality and professional layout.",
  category: "pdf",
  operation: "convert",
  fromFormat: "HEIC",
  toFormat: "PDF",
  howToSteps: [
    "Upload your HEIC photo using the upload box above.",
    'Click "Convert to PDF" — your photo is decoded and embedded into a PDF right in your browser.',
    "Download your single-page PDF once it's ready.",
  ],
  faq: [
    {
      question: "How many photos does this put in one PDF?",
      answer:
        "Each upload creates its own single-page PDF sized to fit your photo. Upload and convert multiple times if you need several PDFs.",
    },
    {
      question: "Will I lose image quality?",
      answer:
        "Your HEIC photo is first decoded to a high-quality JPEG (quality 0.9) and then embedded into the PDF page at its full size, so quality loss is minimal.",
    },
    {
      question: "Does conversion happen on my device?",
      answer:
        "Yes, for typical file sizes the HEIC decode and PDF creation both run in your browser. Very large or memory-heavy HEIC files automatically fall back to server-side conversion.",
    },
    {
      question: "My HEIC file won't convert — what can I do?",
      answer:
        "Make sure the file is a genuine HEIC photo (not renamed) from an iPhone or compatible device. Corrupted files or unsupported HEIC variants may fail — try re-exporting the photo or converting it with another tool first.",
    },
  ],
  converterFn: "heicToPdf",
  relatedTools: ["heic-jpg", "heic-png", "image-to-pdf"],
  metaTitle: "HEIC to PDF Converter — Free Online Tool",
  metaDescription:
    "Convert HEIC iPhone photos to a PDF document online for free, instantly in your browser.",
  icon: "📄",
  legacyPaths: ["/convert/heic-pdf"],
};
