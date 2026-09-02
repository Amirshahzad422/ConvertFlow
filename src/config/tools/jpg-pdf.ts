import type { ToolConfig } from "./types";

export const jpgPdfConfig: ToolConfig = {
  slug: "jpg-pdf",
  name: "JPG to PDF Converter",
  description: "Convert JPG images to PDF format with high quality and professional layout.",
  category: "pdf",
  operation: "convert",
  fromFormat: "JPG",
  toFormat: "PDF",
  howToSteps: [
    "Upload a JPG image using the upload box above.",
    'Click "Convert to PDF" — the image is embedded into a PDF page right in your browser.',
    "Download your PDF once it's ready.",
  ],
  faq: [
    {
      question: "Can I combine multiple JPGs into one PDF?",
      answer:
        "Each conversion turns one uploaded JPG into its own single-page PDF sized to fit that image. To combine several photos into one document, convert each and merge the resulting PDFs with a PDF merge tool.",
    },
    {
      question: "Will I lose image quality?",
      answer:
        "No, the original JPG data is embedded directly into the PDF page without any recompression.",
    },
    {
      question: "Does conversion happen on my device?",
      answer:
        "Yes, the entire process runs locally in your browser using pdf-lib, so your image never has to be uploaded anywhere.",
    },
    {
      question: "Will the image be resized to fit a standard page?",
      answer:
        "No, the PDF page is sized to exactly match your JPG's pixel dimensions, so nothing is cropped or scaled.",
    },
  ],
  converterFn: "jpgToPdf",
  relatedTools: ["image-to-pdf", "heic-pdf", "pdf-to-images"],
  metaTitle: "JPG to PDF Converter — Free Online Tool",
  metaDescription: "Convert a JPG image to a PDF document online for free, instantly in your browser.",
  icon: "📄",
  legacyPaths: ["/convert/jpg-pdf"],
};
