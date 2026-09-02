import type { ToolConfig } from "./types";

export const pdfToImagesConfig: ToolConfig = {
  slug: "pdf-to-images",
  name: "PDF to Images Converter",
  description: "Convert PDF pages to PNG images with high quality, instantly in your browser.",
  category: "pdf",
  operation: "convert",
  fromFormat: "PDF",
  toFormat: "PNG",
  howToSteps: [
    "Upload the PDF you want to convert using the upload box above.",
    'Click "Convert to Images" — every page is rendered to a PNG right in your browser.',
    "Download the ZIP file containing a PNG for each page.",
  ],
  faq: [
    {
      question: "What do I get after converting?",
      answer:
        "A single ZIP file containing one PNG image per page of your PDF, named page-1.png, page-2.png, and so on.",
    },
    {
      question: "Does this work for multi-page PDFs?",
      answer: "Yes, every page in the PDF is rendered — there's no page limit beyond what your browser can handle.",
    },
    {
      question: "Does conversion happen on my device?",
      answer:
        "Yes, rendering uses PDF.js entirely in your browser, and the pages are zipped together locally before download — your PDF never has to be uploaded anywhere.",
    },
    {
      question: "What resolution are the images?",
      answer:
        "Pages are rendered at roughly 144 DPI (2x normal screen resolution), which keeps text and images crisp without producing oversized files.",
    },
  ],
  converterFn: "pdfToImages",
  relatedTools: ["pdf-compressor", "image-to-pdf", "jpg-pdf"],
  metaTitle: "PDF to Images Converter — Free Online Tool",
  metaDescription:
    "Convert PDF pages to PNG images online for free, instantly in your browser, packaged as a ZIP file.",
  icon: "🖼️",
  legacyPaths: ["/convert/pdf-to-images"],
};
