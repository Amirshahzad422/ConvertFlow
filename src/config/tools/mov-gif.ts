import type { ToolConfig } from "./types";

export const movGifConfig: ToolConfig = {
  slug: "mov-gif",
  name: "MOV to GIF Converter",
  description:
    "Convert MOV (QuickTime) video files to animated GIF online, for free. Uses a palette-optimized encode for sharper colors than a naive GIF conversion.",
  category: "video",
  operation: "convert",
  fromFormat: "MOV",
  toFormat: "GIF",
  howToSteps: [
    "Upload your MOV video using the upload box above.",
    "Click \"Convert to GIF\" to start the conversion — it runs fully in your browser using FFmpeg.wasm, so your video never leaves your device.",
    "Download your converted GIF file once it's ready.",
  ],
  faq: [
    {
      question: "Does this work with iPhone videos?",
      answer: "Yes, MOV is the standard format for videos recorded on iPhones and other Apple devices, and this tool handles them directly.",
    },
    {
      question: "Why does the GIF look better than other converters?",
      answer:
        "This tool generates an optimized color palette from your video before encoding the GIF, which produces noticeably sharper colors than a single-pass conversion.",
    },
    {
      question: "Will the GIF loop automatically?",
      answer: "Yes, the output GIF is set to loop forever by default.",
    },
    {
      question: "Will this be slow for large files?",
      answer:
        "Since conversion runs entirely client-side via WebAssembly, very large files (over 100MB) may be slow to process in the browser — for best results, use shorter clips.",
    },
  ],
  converterFn: "movToGif",
  relatedTools: ["mov-mp4", "avi-gif", "video-gif"],
  metaTitle: "MOV to GIF Converter — Free Online Tool",
  metaDescription: "Convert MOV videos to animated GIF online for free, directly in your browser.",
  icon: "🎞️",
  popular: false,
  legacyPaths: ["/convert/mov-gif"],
};
