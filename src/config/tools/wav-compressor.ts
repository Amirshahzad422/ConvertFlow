import type { ToolConfig } from "./types";

export const wavCompressorConfig: ToolConfig = {
  slug: "wav-compressor",
  name: "WAV Compressor",
  description:
    "Shrink WAV file size by downsampling to 22.05kHz 16-bit stereo, entirely in your browser.",
  category: "audio",
  operation: "compress",
  fromFormat: "WAV",
  toFormat: "WAV",
  howToSteps: [
    "Upload a WAV file using the upload box above.",
    'Click "Compress WAV" — the file is downsampled locally in your browser via WebAssembly.',
    "Download your smaller, compressed WAV file once it's ready.",
  ],
  faq: [
    {
      question: "How does this shrink a WAV file?",
      answer:
        "WAV is uncompressed audio, so file size scales directly with sample rate and bit depth. This tool downsamples your file to 22.05kHz, 16-bit PCM stereo, roughly halving the size of a typical 44.1kHz source.",
    },
    {
      question: "Will I hear a quality difference?",
      answer:
        "Downsampling reduces the audio's frequency range slightly, which can be audible on music with lots of high-frequency detail, but is usually fine for voice recordings and general use.",
    },
    {
      question: "Is my file uploaded to a server?",
      answer:
        "No. Compression runs entirely client-side using FFmpeg compiled to WebAssembly.",
    },
    {
      question: "Will large WAV files be slow to process?",
      answer:
        "Yes — WAV files are large to begin with, and since processing happens in-browser via WebAssembly rather than on a server, files 100MB and larger may take a while.",
    },
  ],
  converterFn: "compressWav",
  relatedTools: ["mp3-compressor", "audio-converter", "mp3-converter"],
  metaTitle: "WAV Compressor — Reduce WAV File Size Free",
  metaDescription:
    "Compress WAV files to reduce their size online for free, right in your browser.",
  icon: "🔉",
  popular: false,
  legacyPaths: ["/compress/wav-compressor"],
};
