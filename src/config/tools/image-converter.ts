import type { ToolConfig } from "./types";

export const imageConverterConfig: ToolConfig = {
  slug: "image-converter",
  name: "Image Converter",
  description: "Convert images between JPG, PNG, WEBP, and SVG formats with customizable quality settings.",
  category: "image",
  operation: "convert",
  fromFormat: "Image",
  toFormat: "Image",
  howToSteps: [
    "Upload any supported image (JPG, PNG, GIF, BMP, WEBP, SVG, TIFF, ICO, or AVIF) using the upload box above.",
    "Choose your target format and quality.",
    'Click "Convert Image" to process the file.',
    "Download your converted image once it's ready.",
  ],
  faq: [
    {
      question: "Which formats are supported?",
      answer:
        "You can upload JPG, PNG, GIF, BMP, WEBP, SVG, TIFF, ICO, or AVIF images and convert between the common output formats.",
    },
    {
      question: "Can I control the output quality?",
      answer: "Yes, quality is adjustable for lossy output formats so you can balance file size against fidelity.",
    },
    {
      question: "Is there a dedicated tool for a specific conversion?",
      answer:
        "If you always convert the same pair of formats, our dedicated converters (like WEBP to JPG or HEIC to PNG) are a faster one-click option.",
    },
    {
      question: "Is there a file size limit?",
      answer: "Uploads up to 100MB are supported.",
    },
  ],
  converterFn: "",
  relatedTools: ["webp-jpg", "webp-png", "jfif-png"],
  metaTitle: "Image Converter (JPG/PNG/WEBP/SVG) — Free Online Tool",
  metaDescription:
    "Convert images between JPG, PNG, WEBP, and SVG formats online for free with customizable quality settings.",
  icon: "🔄",
  popular: true,
  customPage: true,
  route: "/convert/image-converter",
};
