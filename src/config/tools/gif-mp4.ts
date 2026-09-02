import type { ToolConfig } from "./types";

export const gifMp4Config: ToolConfig = {
  slug: "gif-mp4",
  name: "GIF to MP4 Converter",
  description:
    "Convert animated GIF files to MP4 video format with smooth playback. Perfect for creating high-quality, much smaller video files from your animated GIFs.",
  category: "video",
  operation: "convert",
  fromFormat: "GIF",
  toFormat: "MP4",
  howToSteps: [
    "Upload your animated GIF using the upload box above.",
    "Click \"Convert to MP4\" to start the conversion — it runs fully in your browser using FFmpeg.wasm, so your file never leaves your device.",
    "Download your converted MP4 video once it's ready.",
  ],
  faq: [
    {
      question: "Why convert a GIF to MP4?",
      answer:
        "MP4 videos are typically far smaller than the equivalent GIF and support smoother playback, making MP4 a better choice for sharing on social media or embedding in web pages.",
    },
    {
      question: "Will the MP4 loop like a GIF?",
      answer:
        "The MP4 file itself doesn't force looping — that depends on the player, but most video players and platforms (Twitter, Discord, etc.) will loop short MP4 clips automatically.",
    },
    {
      question: "Will image quality be affected?",
      answer:
        "No — MP4 uses far more colors than GIF's 256-color palette, so the converted video typically looks smoother and less banded than the source GIF.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "Files up to 100MB are supported. Since this runs entirely in your browser via WebAssembly, very large GIFs may be slow to process.",
    },
  ],
  converterFn: "gifToMp4",
  relatedTools: ["gif-apng", "mp4-gif", "mp4-converter"],
  metaTitle: "GIF to MP4 Converter — Free Online Tool",
  metaDescription: "Convert animated GIF files to MP4 video format online for free, directly in your browser.",
  icon: "🎥",
  popular: false,
  legacyPaths: ["/convert/gif-mp4"],
};
