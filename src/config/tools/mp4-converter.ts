import type { ToolConfig } from "./types";

export const mp4ConverterConfig: ToolConfig = {
  slug: "mp4-converter",
  name: "MP4 Converter",
  description:
    "Convert AVI, MOV, WEBM, MKV, FLV, WMV, 3GP, and other video formats to MP4 with balanced, high-quality H.264 encoding — the format best supported across devices, players, and platforms.",
  category: "video",
  operation: "convert",
  fromFormat: "Video",
  toFormat: "MP4",
  howToSteps: [
    "Upload a video file (AVI, MOV, WEBM, MKV, FLV, WMV, 3GP, and more are all supported) using the upload box above.",
    "Click \"Convert to MP4\" to start the conversion — it runs fully in your browser using FFmpeg.wasm, so your video never leaves your device.",
    "Download your converted MP4 file once it's ready.",
  ],
  faq: [
    {
      question: "Which video formats can I convert from?",
      answer:
        "AVI, MOV, WEBM, MKV, FLV, WMV, 3GP, OGV, M4V, and QuickTime (.qt) files are all supported as input.",
    },
    {
      question: "Why convert to MP4?",
      answer:
        "MP4 with H.264 video and AAC audio is the most widely supported video format, playing reliably on virtually every device, browser, editor, and platform.",
    },
    {
      question: "What quality settings does this use?",
      answer:
        "The conversion uses H.264 video at CRF 23 (a balanced, visually near-lossless quality-vs-size setting) with AAC audio at 128kbps.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "Files up to 100MB work smoothly. Since everything runs locally in your browser via WebAssembly, larger files may take longer or be slow to process — try a shorter clip if it stalls.",
    },
  ],
  converterFn: "convertToMp4",
  relatedTools: ["mov-mp4", "gif-mp4", "video-gif"],
  metaTitle: "MP4 Converter — Convert Videos to MP4 Online | Free Tool",
  metaDescription:
    "Convert AVI, MOV, WEBM, MKV, FLV, WMV, and other video formats to MP4 online for free, directly in your browser.",
  icon: "🔄",
  popular: false,
  legacyPaths: ["/convert/mp4-converter"],
};
