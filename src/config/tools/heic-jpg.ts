import type { ToolConfig } from "./types";

export const heicJpgConfig: ToolConfig = {
  slug: "heic-jpg",
  name: "HEIC to JPG Converter",
  description: "Convert HEIC images to JPG format with high quality and compression.",
  category: "image",
  operation: "convert",
  fromFormat: "HEIC",
  toFormat: "JPG",
  howToSteps: [
    "Upload your HEIC photo using the upload box above.",
    'Click "Convert to JPG" — conversion runs in your browser.',
    "Download your converted JPG file once it's ready.",
  ],
  faq: [
    {
      question: "What is a HEIC file?",
      answer:
        "HEIC (High Efficiency Image Container) is the photo format used by default on iPhones and other Apple devices. It's smaller than JPEG but isn't widely supported outside Apple's ecosystem, which is why converting to JPG is often needed.",
    },
    {
      question: "Will I lose image quality?",
      answer:
        "We convert at a high quality setting (0.9) to keep the JPG visually close to the original HEIC photo.",
    },
    {
      question: "Does conversion happen on my device?",
      answer:
        "Yes, conversion runs in your browser for typical file sizes. Very large or memory-heavy HEIC files automatically fall back to server-side conversion.",
    },
    {
      question: "My HEIC file won't convert — what can I do?",
      answer:
        "Make sure the file is a genuine HEIC photo (not renamed) from an iPhone or compatible device. Corrupted files or unsupported HEIC variants may fail — try re-exporting the photo or converting it with another tool first.",
    },
  ],
  converterFn: "heicToJpg",
  relatedTools: ["heic-png", "heic-pdf", "webp-jpg"],
  metaTitle: "HEIC to JPG Converter — Free Online Tool",
  metaDescription:
    "Convert HEIC iPhone photos to JPG format online for free, instantly in your browser, with high quality.",
  icon: "📱",
  popular: true,
  legacyPaths: ["/convert/heic-jpg"],
};
