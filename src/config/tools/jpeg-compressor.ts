import type { ToolConfig } from "./types";

export const jpegCompressorConfig: ToolConfig = {
  slug: "jpeg-compressor",
  name: "JPEG Compressor",
  description: "Compress .jpg and .jpeg images in your browser at a high-quality setting to reduce file size.",
  category: "image",
  operation: "compress",
  fromFormat: "JPEG",
  toFormat: "JPEG",
  howToSteps: [
    "Upload the JPEG image you want to shrink using the upload box above.",
    'Click "Compress JPEG" — the image is re-encoded right in your browser.',
    "Download the compressed JPEG once it's ready.",
  ],
  faq: [
    {
      question: "How much smaller will my JPEG be?",
      answer:
        "It depends on the source image, but re-encoding a JPEG at a tuned quality level typically cuts file size noticeably while keeping the photo looking sharp. Already heavily-compressed JPEGs will shrink less.",
    },
    {
      question: "What quality setting is used?",
      answer:
        "We compress at a fixed, good-quality setting tuned to balance visual quality against file size, so you don't need to fiddle with sliders.",
    },
    {
      question: "Does compression happen in my browser?",
      answer:
        "Yes, compression runs locally using the Canvas API for typical file sizes. Very large files automatically fall back to our server, which applies MozJPEG-based compression.",
    },
    {
      question: "Will this work on PNG or other formats?",
      answer:
        "This tool is specifically for .jpg/.jpeg files. Use the PNG Compressor for PNGs, or the general Image Compressor for adjustable quality and format options.",
    },
  ],
  converterFn: "compressJpeg",
  relatedTools: ["png-compressor", "image-compressor", "webp-jpg"],
  metaTitle: "JPEG Compressor — Free Online Tool",
  metaDescription:
    "Compress JPEG images online for free, instantly in your browser, to reduce file size while keeping good quality.",
  icon: "🗜️",
  legacyPaths: ["/compress/jpeg-compressor"],
};
