import type { ToolConfig } from "./types";

export const mp3CompressorConfig: ToolConfig = {
  slug: "mp3-compressor",
  name: "MP3 Compressor",
  description:
    "Shrink MP3 file size by re-encoding at a lower bitrate, entirely in your browser.",
  category: "audio",
  operation: "compress",
  fromFormat: "MP3",
  toFormat: "MP3",
  howToSteps: [
    "Upload an MP3 file using the upload box above.",
    'Click "Compress MP3" — the file is re-encoded locally in your browser via WebAssembly.',
    "Download your smaller, compressed MP3 file once it's ready.",
  ],
  faq: [
    {
      question: "How much smaller will my MP3 be?",
      answer:
        "This tool re-encodes your MP3 at a constant 96kbps bitrate, which typically shrinks files encoded at higher bitrates (like 192kbps or 320kbps) significantly, at a small cost to audio fidelity.",
    },
    {
      question: "Is my file uploaded to a server?",
      answer:
        "No. Compression runs entirely client-side using FFmpeg compiled to WebAssembly — your file never leaves your device.",
    },
    {
      question: "Will compressing an already low-bitrate MP3 help?",
      answer:
        "Not much — if your source file is already at or below 96kbps, re-encoding won't meaningfully reduce size and may slightly reduce quality.",
    },
    {
      question: "Will large MP3 files take a long time to compress?",
      answer:
        "Since this runs in-browser via WebAssembly, very large files (100MB+) may process more slowly than a native desktop app would.",
    },
  ],
  converterFn: "compressMp3",
  relatedTools: ["wav-compressor", "audio-converter", "mp3-converter"],
  metaTitle: "MP3 Compressor — Reduce MP3 File Size Free",
  metaDescription:
    "Compress MP3 files to reduce their size online for free, right in your browser.",
  icon: "🗜️",
  popular: false,
  legacyPaths: ["/compress/mp3-compressor"],
};
