import type { ToolConfig } from "./types";

export const imageToPdfConfig: ToolConfig = {
  slug: "image-to-pdf",
  name: "Image to PDF Converter",
  description:
    "Convert JPG or PNG images to PDF format with a professional layout, instantly in your browser. Each uploaded image becomes its own single-page PDF.",
  category: "pdf",
  operation: "convert",
  fromFormat: "Image",
  toFormat: "PDF",
  howToSteps: [
    "Upload a JPG or PNG image using the upload box above.",
    'Click "Convert to PDF" — the image is embedded into a PDF page right in your browser.',
    "Download your PDF once it's ready.",
  ],
  faq: [
    {
      question: "Can I combine multiple images into one PDF?",
      answer:
        "Each conversion turns one uploaded image into its own single-page PDF sized to fit that image. If you need several photos in one combined document, convert each image and merge the resulting PDFs with a PDF merge tool.",
    },
    {
      question: "Which image formats are supported?",
      answer: "JPG and PNG images are supported and embedded into the PDF at full quality with no recompression.",
    },
    {
      question: "Does conversion happen on my device?",
      answer:
        "Yes, the entire process — reading the image and building the PDF — runs locally in your browser using pdf-lib, so your file never has to be uploaded anywhere.",
    },
    {
      question: "Will the image be resized?",
      answer:
        "No, the PDF page is sized to exactly match your image's pixel dimensions, so nothing is cropped or scaled.",
    },
  ],
  converterFn: "imageToPdf",
  relatedTools: ["jpg-pdf", "heic-pdf", "pdf-to-images"],
  metaTitle: "Image to PDF Converter — Free Online Tool",
  metaDescription:
    "Convert a JPG or PNG image to a PDF document online for free, instantly in your browser.",
  icon: "📄",
  legacyPaths: ["/convert/image-to-pdf"],
};
