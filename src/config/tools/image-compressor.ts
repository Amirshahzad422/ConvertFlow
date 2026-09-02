import type { ToolConfig } from "./types";

export const imageCompressorConfig: ToolConfig = {
  slug: "image-compressor",
  name: "Image Compressor",
  description: "Compress JPG, PNG, and WEBP images directly in your browser. Adjust quality, resize dimensions, and change output format.",
  category: "image",
  operation: "compress",
  fromFormat: "Image",
  toFormat: "Image",
  howToSteps: [
    "Upload a JPG, PNG, or WEBP image using the upload box above.",
    "Adjust the quality slider and, optionally, the maximum width/height and output format.",
    'Click "Compress Image" — everything runs locally via the Canvas API.',
    "Download the compressed image once it's ready.",
  ],
  faq: [
    {
      question: "Which formats are supported?",
      answer: "JPG, PNG, and WEBP images can be uploaded, and you can choose any of those three as the output format.",
    },
    {
      question: "Can I resize the image while compressing?",
      answer: "Yes, you can set a maximum width and/or height and the image will be scaled down to fit, preserving aspect ratio.",
    },
    {
      question: "Does this upload my image anywhere?",
      answer: "No, compression is 100% client-side using the Canvas API — your image never leaves your browser.",
    },
    {
      question: "What's the file size limit?",
      answer: "Uploads up to 50MB are supported.",
    },
  ],
  converterFn: "",
  relatedTools: ["jpeg-compressor", "png-compressor", "pdf-compressor"],
  metaTitle: "Image Compressor (JPG/PNG/WEBP) — Free Online Tool",
  metaDescription:
    "Compress JPG, PNG, and WEBP images online for free, entirely in your browser, with adjustable quality and resizing.",
  icon: "🗜️",
  customPanel: "image-compressor",
  legacyPaths: ["/compress/image-compressor"],
};
