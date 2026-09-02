import type { ToolConfig } from "./types";

export const pngCompressorConfig: ToolConfig = {
  slug: "png-compressor",
  name: "PNG Compressor",
  description: "Compress .png images in your browser to reduce file size while keeping full transparency.",
  category: "image",
  operation: "compress",
  fromFormat: "PNG",
  toFormat: "PNG",
  howToSteps: [
    "Upload the PNG image you want to shrink using the upload box above.",
    'Click "Compress PNG" — the image is re-encoded right in your browser.',
    "Download the compressed PNG once it's ready.",
  ],
  faq: [
    {
      question: "How much smaller will my PNG be?",
      answer:
        "It varies a lot by image. Browser-side PNG re-encoding is lighter-weight than the pngquant-style palette compression our server can apply, so savings are typically modest — large or already-optimized PNGs may shrink very little, and that's expected.",
    },
    {
      question: "Will I lose transparency or quality?",
      answer:
        "No. PNG compression is lossless, so transparency and pixel data are fully preserved — only redundant file structure is reduced.",
    },
    {
      question: "Does compression happen in my browser?",
      answer:
        "Yes, for typical file sizes it runs locally via the Canvas API. Very large files automatically fall back to our server, which uses palette and compression-level optimizations for a smaller result.",
    },
    {
      question: "I need much smaller files — what should I use?",
      answer:
        "For maximum size reduction (at the cost of some quality), try converting to JPG or WEBP instead, or use the general Image Compressor which lets you resize and adjust quality.",
    },
  ],
  converterFn: "compressPng",
  relatedTools: ["jpeg-compressor", "image-compressor", "webp-png"],
  metaTitle: "PNG Compressor — Free Online Tool",
  metaDescription:
    "Compress PNG images online for free, instantly in your browser, with transparency and quality fully preserved.",
  icon: "🗜️",
  legacyPaths: ["/compress/png-compressor"],
};
