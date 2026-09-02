import type { ToolConfig } from "./types";

export const videoCompressorConfig: ToolConfig = {
  slug: "video-compressor",
  name: "Video Compressor",
  description:
    "Shrink video file size by re-encoding with libx264 at a higher CRF, entirely in your browser.",
  category: "video",
  operation: "compress",
  fromFormat: "Video",
  toFormat: "Video",
  howToSteps: [
    "Upload a video file (MP4, AVI, MOV, WMV, FLV, WEBM, MKV, or M4V) using the upload box above.",
    'Click "Compress Video" — the file is re-encoded locally in your browser via WebAssembly, no upload to a server.',
    "Download your smaller, compressed MP4 file once it's ready.",
  ],
  faq: [
    {
      question: "How much smaller will my video be?",
      answer:
        "This tool re-encodes video with libx264 at CRF 28 (a moderate-to-high compression level), which typically shrinks file size substantially compared to a lightly-compressed source, at some cost to visual quality.",
    },
    {
      question: "Is my video uploaded to a server?",
      answer:
        "No. Compression runs entirely client-side using FFmpeg compiled to WebAssembly — your video never leaves your device.",
    },
    {
      question: "What output format do I get?",
      answer: "The compressed video is always output as an MP4 (H.264 video, AAC audio at 128kbps).",
    },
    {
      question: "Will large video files be very slow to compress?",
      answer:
        "Yes, and this is worth setting expectations on: video encoding is CPU-intensive, and doing it in-browser via WebAssembly (with no hardware acceleration) means large files can take a genuinely long time — potentially many minutes for files well over 100MB. Native server-side FFmpeg processing for large video is a planned follow-up, not yet built, so for now this tool works best on shorter or smaller clips.",
    },
  ],
  converterFn: "compressVideo",
  relatedTools: ["gif-compressor", "video-mp3", "mp4-mp3"],
  metaTitle: "Video Compressor — Reduce Video File Size Free",
  metaDescription:
    "Compress video files to reduce their size online for free, right in your browser.",
  icon: "📹",
  popular: true,
  legacyPaths: ["/compress/video-compressor"],
};
