import type { ToolConfig } from "./types";

export const imageGifConfig: ToolConfig = {
  slug: "image-gif",
  name: "Image to GIF Converter",
  description:
    "Turn a single JPG, PNG, or WEBP image into a short, looping animated GIF (3 seconds), right in your browser. Perfect for turning a static image into a shareable animated GIF placeholder.",
  category: "image",
  operation: "convert",
  fromFormat: "Image",
  toFormat: "GIF",
  howToSteps: [
    "Upload a JPG, PNG, or WEBP image using the upload box above.",
    "Click \"Convert to GIF\" to start the conversion — it runs fully in your browser using FFmpeg.wasm, so your image never leaves your device.",
    "Download your converted animated GIF once it's ready.",
  ],
  faq: [
    {
      question: "Does this combine multiple images into a slideshow GIF?",
      answer:
        "No — this tool takes a single source image and loops it into a short (3-second) animated GIF file. It's a simple way to get a static image into GIF format with looping metadata intact.",
    },
    {
      question: "Which image formats are supported?",
      answer: "JPG, PNG, and WEBP are all supported as input formats.",
    },
    {
      question: "Will the GIF loop forever?",
      answer: "Yes, the output GIF loops indefinitely by default.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "Files up to 10MB are supported. Since this runs entirely in your browser via WebAssembly, very large images may be slow to process — files over 100MB in particular can be slow.",
    },
  ],
  converterFn: "imageToGif",
  relatedTools: ["apng-gif", "gif-apng"],
  metaTitle: "Image to GIF Converter — Free Online Tool",
  metaDescription: "Turn a JPG, PNG, or WEBP image into a short looping animated GIF online for free, directly in your browser.",
  icon: "🌆",
  popular: false,
  legacyPaths: ["/convert/image-gif"],
};
