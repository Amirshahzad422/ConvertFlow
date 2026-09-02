import type { ToolConfig } from "./types";

export const videoGifConfig: ToolConfig = {
  slug: "video-gif",
  name: "Video to GIF Converter",
  description:
    "Convert MP4, AVI, MOV, WMV, FLV, or WEBM video files to animated GIF online, for free. Uses a palette-optimized encode and trims to the first 5 seconds to keep file sizes shareable.",
  category: "video",
  operation: "convert",
  fromFormat: "Video",
  toFormat: "GIF",
  howToSteps: [
    "Upload a video file (MP4, AVI, MOV, WMV, FLV, or WEBM) using the upload box above.",
    "Click \"Convert to GIF\" to start the conversion — it runs fully in your browser using FFmpeg.wasm, so your video never leaves your device.",
    "Download your converted GIF file once it's ready.",
  ],
  faq: [
    {
      question: "Which video formats are supported?",
      answer: "MP4, AVI, MOV, WMV, FLV, and WEBM are all supported by this converter.",
    },
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
      question: "Is there a file size limit?",
      answer:
        "Files up to 100MB are supported. Since this runs entirely in your browser via WebAssembly, very large files may be slow to process — try a smaller file or shorter clip if it stalls.",
    },
  ],
  converterFn: "videoToGif",
  relatedTools: ["mp4-gif", "webm-gif", "mov-gif"],
  metaTitle: "Video to GIF Converter — Free Online Tool",
  metaDescription: "Convert MP4, AVI, MOV, WMV, FLV, or WEBM videos to animated GIF online for free, directly in your browser.",
  icon: "📽️",
  popular: true,
  legacyPaths: ["/convert/video-gif"],
};
