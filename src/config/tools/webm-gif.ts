import type { ToolConfig } from "./types";

export const webmGifConfig: ToolConfig = {
  slug: "webm-gif",
  name: "WEBM to GIF Converter",
  description:
    "Convert WEBM video files to animated GIF format with optimized quality. Perfect for creating shareable animated content from your WEBM videos, right in your browser.",
  category: "video",
  operation: "convert",
  fromFormat: "WEBM",
  toFormat: "GIF",
  howToSteps: [
    "Upload your WEBM video using the upload box above.",
    "Click \"Convert to GIF\" to start the conversion — it runs fully in your browser using FFmpeg.wasm, so your video never leaves your device.",
    "Download your converted GIF file once it's ready.",
  ],
  faq: [
    {
      question: "Why is the GIF only 5 seconds long?",
      answer:
        "GIFs get very large very quickly, so this tool trims the output to the first 5 seconds of your video by default, which keeps file sizes reasonable for sharing.",
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
      question: "Is there a file size limit?",
      answer:
        "Files up to 100MB are supported. Since this runs entirely in your browser via WebAssembly, very large files may be slow to process — try a smaller file if conversion stalls.",
    },
  ],
  converterFn: "webmToGif",
  relatedTools: ["video-gif", "mp4-gif", "gif-mp4"],
  metaTitle: "WEBM to GIF Converter — Free Online Tool",
  metaDescription: "Convert WEBM video files to animated GIF format online for free, directly in your browser.",
  icon: "🌐",
  popular: false,
  legacyPaths: ["/convert/webm-gif"],
};
