import type { ToolConfig } from "./types";

export const pdfMergeConfig: ToolConfig = {
  slug: "pdf-merge",
  name: "Merge PDF",
  description: "Combine multiple PDF files into one document privately in your browser.",
  category: "pdf",
  operation: "tool",
  fromFormat: "PDF",
  toFormat: "PDF",
  howToSteps: ["Add two or more PDF files.", "Arrange them in the order you want to upload them.", "Select Merge PDF and download the combined document."],
  faq: [
    { question: "How many PDFs can I merge?", answer: "You can merge up to 20 PDFs in one batch." },
    { question: "Is the original quality preserved?", answer: "Yes. Pages are copied without rasterizing their text or graphics." },
    { question: "What determines page order?", answer: "Documents are merged in the order shown in the upload list." },
  ],
  converterFn: "mergePdfs",
  batchMode: true,
  relatedTools: ["pdf-split", "pdf-rotate", "pdf-compressor"],
  metaTitle: "Merge PDF Files Online — Free & Private",
  metaDescription: "Combine multiple PDFs into one file online. Fast, private browser-based PDF merging with no watermark.",
  icon: "📚",
  popular: true,
};
