import type { ToolConfig } from "./types";

export const gifApngConfig: ToolConfig = {
  slug: "gif-apng",
  name: "GIF to APNG Converter",
  description:
    "Convert animated GIF files to APNG format online, right in your browser, while preserving transparency and looping.",
  category: "image",
  operation: "convert",
  fromFormat: "GIF",
  toFormat: "APNG",
  howToSteps: [
    "Upload your animated GIF using the upload box above.",
    "Click \"Convert to APNG\" to start the conversion — it runs fully in your browser using FFmpeg.wasm, so your file never leaves your device.",
    "Download your converted APNG file once it's ready.",
  ],
  faq: [
    {
      question: "What does APNG offer over GIF?",
      answer:
        "APNG supports full 24-bit color and true alpha transparency, so converting from GIF removes the color-banding and hard-edged transparency GIF is known for.",
    },
    {
      question: "Will the animation still loop?",
      answer: "Yes, the converted APNG is set to loop indefinitely, matching typical GIF behavior.",
    },
    {
      question: "Where can I use APNG files?",
      answer: "Most modern browsers (Chrome, Firefox, Safari, Edge) support APNG natively, same as they do PNG and GIF.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "Files up to 100MB are supported. Since this runs entirely in your browser via WebAssembly, very large files may be slow to process — try a shorter GIF if conversion stalls.",
    },
  ],
  converterFn: "gifToApng",
  relatedTools: ["apng-gif", "gif-mp4"],
  metaTitle: "GIF to APNG Converter — Free Online Tool",
  metaDescription: "Convert animated GIF files to APNG format online for free, directly in your browser.",
  icon: "🔁",
  popular: false,
  legacyPaths: ["/convert/gif-apng"],
};
