import type { ToolConfig } from "./types";

export const apngGifConfig: ToolConfig = {
  slug: "apng-gif",
  name: "APNG to GIF Converter",
  description:
    "Convert APNG animations to GIF format online, right in your browser. Preserves the animation frames and loop while re-encoding to the universally-supported GIF format.",
  category: "image",
  operation: "convert",
  fromFormat: "APNG",
  toFormat: "GIF",
  howToSteps: [
    "Upload your APNG file using the upload box above.",
    "Click \"Convert to GIF\" to start the conversion — it runs fully in your browser using FFmpeg.wasm, so your file never leaves your device.",
    "Download your converted GIF file once it's ready.",
  ],
  faq: [
    {
      question: "Will my animation still loop after converting to GIF?",
      answer: "Yes, the animation's frames and looping behavior are preserved when converting from APNG to GIF.",
    },
    {
      question: "Why convert APNG to GIF at all?",
      answer:
        "APNG isn't supported everywhere (some apps, editors, and older browsers only handle GIF), so converting to GIF maximizes compatibility for sharing animated images.",
    },
    {
      question: "Does this preserve transparency?",
      answer:
        "GIF only supports binary (on/off) transparency, not the full alpha transparency APNG supports, so partially-transparent pixels are converted to fully opaque or fully transparent.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "Files up to 50MB work well. Since conversion runs entirely in your browser via WebAssembly, very large files (over 100MB) may be slow to process — try a smaller file or a shorter animation if it stalls.",
    },
  ],
  converterFn: "apngToGif",
  relatedTools: ["gif-apng", "image-gif"],
  metaTitle: "APNG to GIF Converter — Free Online Tool",
  metaDescription: "Convert APNG animations to GIF format online for free, directly in your browser.",
  icon: "🖼️",
  popular: false,
  legacyPaths: ["/convert/apng-gif"],
};
