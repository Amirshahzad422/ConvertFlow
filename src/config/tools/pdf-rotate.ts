import type { ToolConfig } from "./types";

export const pdfRotateConfig: ToolConfig = {
  slug: "pdf-rotate",
  name: "Rotate PDF",
  description: "Rotate every page of a PDF clockwise by 90 degrees without changing its quality.",
  category: "pdf",
  operation: "tool",
  fromFormat: "PDF",
  toFormat: "PDF",
  howToSteps: ["Upload a PDF from your device.", "Select Rotate PDF to turn every page clockwise.", "Download the corrected document."],
  faq: [
    { question: "Which pages are rotated?", answer: "Every page in the uploaded PDF is rotated 90 degrees clockwise." },
    { question: "Will text remain searchable?", answer: "Yes. Rotation changes page orientation without turning the content into an image." },
    { question: "Can I rotate the result again?", answer: "Yes. Upload the result again to rotate it by another 90 degrees." },
  ],
  converterFn: "rotatePdf",
  relatedTools: ["pdf-merge", "pdf-split", "pdf-compressor"],
  metaTitle: "Rotate PDF Online — Free & Private",
  metaDescription: "Rotate PDF pages 90 degrees online without quality loss. The file is processed privately in your browser.",
  icon: "↻",
};
