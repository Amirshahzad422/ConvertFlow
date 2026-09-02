import type { ToolConfig } from "./types";

export const pdfCompressorConfig: ToolConfig = {
  slug: "pdf-compressor",
  name: "PDF Compressor",
  description: "Compress PDF files by re-saving them to strip redundant structure, instantly in your browser.",
  category: "pdf",
  operation: "compress",
  fromFormat: "PDF",
  toFormat: "PDF",
  howToSteps: [
    "Upload the PDF you want to shrink using the upload box above.",
    'Click "Compress PDF" — the file is reloaded and re-saved right in your browser.',
    "Download the compressed PDF once it's ready.",
  ],
  faq: [
    {
      question: "How much smaller will my PDF be?",
      answer:
        "Honestly, savings from browser-side compression are usually modest. This tool re-saves the PDF's internal structure to remove redundancy, but it doesn't recompress the images embedded inside it — which is where most of a PDF's size usually comes from.",
    },
    {
      question: "Why doesn't this recompress images inside the PDF?",
      answer:
        "Real image-recompression-based PDF compression (downscaling and re-encoding embedded photos) needs to parse and rewrite PDF content streams, which is heavier work best done on a server. That's a documented follow-up — for now, very large files are automatically sent to our server, which applies its own optimizations.",
    },
    {
      question: "Does compression happen on my device?",
      answer:
        "Yes, for typical file sizes the PDF is reloaded and re-saved locally using pdf-lib. Very large files automatically fall back to server-side processing.",
    },
    {
      question: "Will this change the content of my PDF?",
      answer: "No, all pages and their content are preserved exactly — only redundant file structure is reduced.",
    },
  ],
  converterFn: "compressPdf",
  relatedTools: ["pdf-to-images", "image-to-pdf", "jpeg-compressor"],
  metaTitle: "PDF Compressor — Free Online Tool",
  metaDescription:
    "Compress PDF files online for free, instantly in your browser, by removing redundant document structure.",
  icon: "🗜️",
  legacyPaths: ["/compress/pdf-compressor"],
};
