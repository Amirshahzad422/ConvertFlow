import type { ToolConfig } from "./types";

export const aviGifConfig: ToolConfig = {
  slug: "avi-gif",
  name: "AVI to GIF Converter",
  description:
    "Convert AVI video files to animated GIF online, for free. Uses a palette-optimized encode for sharper colors than a naive GIF conversion.",
  category: "video",
  operation: "convert",
  fromFormat: "AVI",
  toFormat: "GIF",
  howToSteps: [
    "Upload your AVI video using the upload box above.",
    "Click \"Convert to GIF\" to start the conversion — it runs fully in your browser using FFmpeg.wasm, so your video never leaves your device.",
    "Download your converted GIF file once it's ready.",
  ],
  faq: [
    {
      question: "Why does the GIF look better than other converters?",
      answer:
        "This tool generates an optimized color palette from your video before encoding the GIF, which produces noticeably sharper colors than a single-pass conversion.",
    },
    {
      question: "Is there a length or size limit?",
      answer:
        "There's no hard length limit, but longer or higher-resolution AVI files produce larger GIFs and take longer to process since everything runs locally in your browser.",
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
  converterFn: "aviToGif",
  relatedTools: ["mov-gif", "video-gif", "mp4-gif"],
  metaTitle: "AVI to GIF Converter — Free Online Tool",
  metaDescription: "Convert AVI videos to animated GIF online for free, directly in your browser.",
  icon: "🎬",
  popular: false,
  legacyPaths: ["/convert/avi-gif"],
};
