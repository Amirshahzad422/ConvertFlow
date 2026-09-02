import type { ToolConfig } from "./types";

export const jfifPngConfig: ToolConfig = {
  slug: "jfif-png",
  name: "JFIF to PNG Converter",
  description: "Convert JFIF images to PNG format with high quality and transparency support.",
  category: "image",
  operation: "convert",
  fromFormat: "JFIF",
  toFormat: "PNG",
  howToSteps: [
    "Upload your JFIF image using the upload box above.",
    'Click "Convert to PNG" to start the conversion — it runs instantly in your browser.',
    "Download your converted PNG file once it's ready.",
  ],
  faq: [
    {
      question: "What is a JFIF file?",
      answer:
        "JFIF (JPEG File Interchange Format) is JPEG image data saved with a .jfif extension. It's visually identical to a regular JPEG, just packaged with a different file extension, which is why some browsers and downloads produce it.",
    },
    {
      question: "Will I lose image quality converting JFIF to PNG?",
      answer:
        "No additional quality is lost during conversion. PNG is a lossless format, so the pixel data from your JFIF file is preserved exactly as-is once it's re-encoded.",
    },
    {
      question: "Does the converted PNG support transparency?",
      answer:
        "JFIF/JPEG images don't store transparency data, so the resulting PNG will have the same fully opaque appearance as the original.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "Most files convert instantly in your browser with no fixed size limit. Very large files are automatically sent to our server for conversion instead.",
    },
  ],
  converterFn: "jfifToPng",
  relatedTools: ["webp-png", "heic-png", "webp-jpg"],
  metaTitle: "JFIF to PNG Converter — Free Online Tool",
  metaDescription:
    "Convert JFIF images to PNG format online for free, instantly in your browser, with high quality preserved.",
  icon: "🖼️",
  legacyPaths: ["/convert/jfif-png"],
};
