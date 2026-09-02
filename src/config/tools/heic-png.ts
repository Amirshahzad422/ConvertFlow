import type { ToolConfig } from "./types";

export const heicPngConfig: ToolConfig = {
  slug: "heic-png",
  name: "HEIC to PNG Converter",
  description:
    "Convert HEIC images to PNG format with high quality and transparency support. Perfect for sharing iPhone photos and maintaining image quality.",
  category: "image",
  operation: "convert",
  fromFormat: "HEIC",
  toFormat: "PNG",
  howToSteps: [
    "Upload your HEIC photo using the upload box above.",
    'Click "Convert to PNG" — conversion runs in your browser.',
    "Download your converted PNG file once it's ready.",
  ],
  faq: [
    {
      question: "Why convert HEIC to PNG instead of JPG?",
      answer:
        "PNG is lossless, so it's a good choice when you want to avoid any further compression, or if the image will be edited further. If file size matters more, HEIC to JPG usually gives a smaller result.",
    },
    {
      question: "Will I lose image quality?",
      answer:
        "No — PNG is lossless, so once your HEIC photo is decoded, no additional quality is lost writing it out as PNG.",
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
  converterFn: "heicToPng",
  relatedTools: ["heic-jpg", "heic-pdf", "webp-png"],
  metaTitle: "HEIC to PNG Converter — Free Online Tool",
  metaDescription:
    "Convert HEIC iPhone photos to PNG format online for free, instantly in your browser, with full quality.",
  icon: "📱",
  legacyPaths: ["/convert/heic-png"],
};
