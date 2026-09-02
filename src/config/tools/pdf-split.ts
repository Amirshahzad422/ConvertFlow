import type { ToolConfig } from "./types";

export const pdfSplitConfig: ToolConfig = {
  slug: "pdf-split",
  name: "Split PDF",
  description: "Separate every page of a PDF into an individual PDF and download them together as a ZIP.",
  category: "pdf",
  operation: "tool",
  fromFormat: "PDF",
  toFormat: "ZIP",
  howToSteps: ["Choose the PDF you want to separate.", "Select Split PDF to extract every page.", "Download the ZIP containing one PDF per page."],
  faq: [
    { question: "What does the ZIP contain?", answer: "It contains one numbered PDF file for every page in the source document." },
    { question: "Does splitting reduce quality?", answer: "No. Original PDF pages are copied without being converted to images." },
    { question: "Can I split more than one PDF?", answer: "Yes. Each uploaded PDF is processed separately, and each result can be downloaded on its own or in a batch ZIP." },
  ],
  converterFn: "splitPdf",
  relatedTools: ["pdf-merge", "pdf-rotate", "pdf-to-images"],
  metaTitle: "Split PDF Pages Online — Free PDF Splitter",
  metaDescription: "Split a PDF into individual page files in your browser and download all pages as a ZIP.",
  icon: "✂️",
};
