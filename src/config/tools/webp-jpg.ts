import type { ToolConfig } from "./types";

export const webpJpgConfig: ToolConfig = {
  slug: "webp-jpg",
  name: "WEBP to JPG Converter",
  description: "Convert WEBP images to JPG format with high quality and compression.",
  category: "image",
  operation: "convert",
  fromFormat: "WEBP",
  toFormat: "JPG",
  howToSteps: [
    "Upload your WEBP image using the upload box above.",
    'Click "Convert to JPG" to start the conversion — it runs instantly in your browser.',
    "Download your converted JPG file once it's ready.",
  ],
  faq: [
    {
      question: "Will I lose image quality converting WEBP to JPG?",
      answer:
        "JPG uses lossy compression, so there is a small amount of quality loss during conversion. We encode at a high quality setting (0.9) to keep the result visually close to the original.",
    },
    {
      question: "What happens to transparency in my WEBP image?",
      answer:
        "JPG doesn't support transparency, so any transparent areas in your WEBP image will be filled in as an opaque background in the resulting JPG.",
    },
    {
      question: "Where does the conversion happen?",
      answer:
        "Conversion runs directly in your browser using the Canvas API, so your image never needs to leave your device for typical file sizes. Very large files automatically fall back to server-side conversion.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "Most files convert instantly in your browser with no fixed size limit. Very large files are automatically sent to our server for conversion instead.",
    },
  ],
  converterFn: "webpToJpg",
  relatedTools: ["webp-png", "jfif-png", "image-converter"],
  metaTitle: "WEBP to JPG Converter — Free Online Tool",
  metaDescription:
    "Convert WEBP images to JPG format online for free, instantly in your browser, with high quality and compression.",
  icon: "🖼️",
  popular: true,
  legacyPaths: ["/convert/webp-jpg"],
};
