import type { ToolConfig } from "./types";

export const mp3ConverterConfig: ToolConfig = {
  slug: "mp3-converter",
  name: "MP3 Converter",
  description:
    "Convert WAV, OGG, FLAC, AAC, M4A, WMA, and AIFF audio files to loudness-normalized MP3, entirely in your browser.",
  category: "audio",
  operation: "convert",
  fromFormat: "Audio",
  toFormat: "MP3",
  howToSteps: [
    "Upload an audio file (MP3, WAV, OGG, FLAC, AAC, M4A, WMA, or AIFF) using the upload box above.",
    'Click "Convert to MP3" — the file is normalized and encoded locally in your browser via WebAssembly.',
    "Download your converted MP3 file once it's ready.",
  ],
  faq: [
    {
      question: "How is this different from the Audio Converter tool?",
      answer:
        "This tool applies loudness normalization during conversion, evening out volume levels, in addition to encoding to MP3 at 192kbps stereo.",
    },
    {
      question: "Is my file uploaded to a server?",
      answer:
        "No. Conversion and normalization both happen entirely in your browser using FFmpeg compiled to WebAssembly.",
    },
    {
      question: "What quality is the output MP3?",
      answer: "Output is encoded at 192kbps, 44.1kHz stereo.",
    },
    {
      question: "Will large files be slow to convert?",
      answer:
        "Yes — because everything runs in-browser via WebAssembly rather than on a server, files 100MB and larger may take noticeably longer to process.",
    },
  ],
  converterFn: "convertToMp3",
  relatedTools: ["audio-converter", "video-mp3", "mp3-compressor"],
  metaTitle: "MP3 Converter — Convert Audio to Normalized MP3 Free",
  metaDescription:
    "Convert WAV, OGG, FLAC, AAC, M4A, WMA, and AIFF audio files to loudness-normalized MP3 online for free.",
  icon: "🎼",
  popular: false,
  legacyPaths: ["/convert/mp3-converter"],
};
