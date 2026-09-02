import type { ToolConfig } from "./types";

export const movMp4Config: ToolConfig = {
  slug: "mov-mp4",
  name: "MOV to MP4 Converter",
  description:
    "Convert MOV (QuickTime) videos to MP4 format with balanced, high-quality H.264 encoding — the format best supported across devices, players, and platforms.",
  category: "video",
  operation: "convert",
  fromFormat: "MOV",
  toFormat: "MP4",
  howToSteps: [
    "Upload your MOV video using the upload box above.",
    "Click \"Convert to MP4\" to start the conversion — it runs fully in your browser using FFmpeg.wasm, so your video never leaves your device.",
    "Download your converted MP4 file once it's ready.",
  ],
  faq: [
    {
      question: "Why convert MOV to MP4?",
      answer:
        "MOV files (common from iPhones and Mac apps) aren't universally supported. MP4 with H.264 video and AAC audio plays reliably on virtually every device, browser, and platform.",
    },
    {
      question: "What quality settings does this use?",
      answer:
        "The conversion uses H.264 video at CRF 23 (a balanced, visually near-lossless quality-vs-size setting) with AAC audio at 128kbps, matching sensible defaults for everyday use.",
    },
    {
      question: "Will I lose audio or video quality?",
      answer:
        "Quality loss is minimal at these settings — CRF 23 is considered visually transparent for most content, so the difference is generally imperceptible.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "Files up to 100MB work smoothly. Since everything runs locally in your browser via WebAssembly, larger files may take longer or be slow to process — try a shorter clip if it stalls.",
    },
  ],
  converterFn: "movToMp4",
  relatedTools: ["mov-gif", "mp4-converter", "video-gif"],
  metaTitle: "MOV to MP4 Converter — Convert MOV Videos to MP4 Online | Free Tool",
  metaDescription:
    "Convert MOV videos to MP4 format online for free, directly in your browser, with high-quality H.264 encoding.",
  icon: "📹",
  popular: true,
  legacyPaths: ["/convert/mov-mp4"],
};
