import type { ToolConfig } from "./types";

export const webpPngConfig: ToolConfig = {
  slug: "webp-png",
  name: "WEBP to PNG Converter",
  description: "Convert WEBP images to PNG format with high quality and transparency support.",
  category: "image",
  fromFormat: "WEBP",
  toFormat: "PNG",
  howToSteps: [
    "Upload your WEBP image using the upload box above.",
    'Click "Convert to WEBP to PNG Converter" to start the conversion.',
    "Download your converted PNG file once it's ready.",
  ],
  faq: [
    {
      question: "Will I lose image quality converting WEBP to PNG?",
      answer:
        "No, PNG is a lossless format, so your image quality is fully preserved during conversion.",
    },
    {
      question: "Does this support transparent WEBP images?",
      answer: "Yes, transparency is preserved when converting to PNG.",
    },
    {
      question: "Is there a file size limit?",
      answer: "Yes, files up to 10MB are supported for this conversion.",
    },
  ],
  converterFn: "webpToPng",
  relatedTools: ["webp-jpg", "heic-png"],
  metaTitle: "WEBP to PNG Converter — Free Online Tool",
  metaDescription:
    "Convert WEBP images to PNG format online for free, with full quality and transparency support.",
};