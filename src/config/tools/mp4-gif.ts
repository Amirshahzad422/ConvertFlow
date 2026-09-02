import type { ToolConfig } from "./types";

export const mp4GifConfig: ToolConfig = {
  slug: "mp4-gif",
  name: "MP4 to GIF Converter",
  description:
    "Convert MP4 video files to animated GIF online, for free. Uses a palette-optimized encode and trims to the first 5 seconds to keep file sizes shareable.",
  category: "video",
  operation: "convert",
  fromFormat: "MP4",
  toFormat: "GIF",
  howToSteps: [
    "Upload your MP4 video using the upload box above.",
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
  converterFn: "mp4ToGif",
  relatedTools: ["gif-mp4", "video-gif", "mov-gif"],
  metaTitle: "MP4 to GIF Converter — Free Online Tool",
  metaDescription: "Convert MP4 videos to animated GIF online for free, directly in your browser.",
  icon: "🌀",
  popular: false,
  legacyPaths: ["/convert/mp4-gif"],
};
