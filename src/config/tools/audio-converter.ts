import type { ToolConfig } from "./types";

export const audioConverterConfig: ToolConfig = {
  slug: "audio-converter",
  name: "Audio Converter",
  description:
    "Convert WAV, OGG, FLAC, AAC, M4A, WMA, AIFF, and AU audio files to MP3, entirely in your browser.",
  category: "audio",
  operation: "convert",
  fromFormat: "Audio",
  toFormat: "MP3",
  howToSteps: [
    "Upload an audio file (MP3, WAV, OGG, FLAC, AAC, M4A, WMA, AIFF, or AU) using the upload box above.",
    'Click "Convert to MP3" to start the conversion — it runs locally in your browser via WebAssembly.',
    "Download your converted MP3 file once it's ready.",
  ],
  faq: [
    {
      question: "Which audio formats can I convert from?",
      answer:
        "MP3, WAV, OGG, FLAC, AAC, M4A, WMA, AIFF, and AU are all supported as input formats.",
    },
    {
      question: "Is my audio file uploaded to a server?",
      answer:
        "No. This tool uses FFmpeg compiled to WebAssembly to convert your file entirely inside your browser.",
    },
    {
      question: "What quality is the output MP3?",
      answer: "Files are encoded at 192kbps, 44.1kHz stereo, a solid default for everyday use.",
    },
    {
      question: "Will large audio files take a long time?",
      answer:
        "Since conversion happens client-side via WebAssembly, very large files (100MB+) may process more slowly than a native desktop app would.",
    },
  ],
  converterFn: "audioToMp3",
  relatedTools: ["mp3-converter", "video-mp3", "mp3-compressor"],
  metaTitle: "Audio Converter — Convert Any Audio to MP3 Free",
  metaDescription:
    "Convert WAV, OGG, FLAC, AAC, M4A, WMA, AIFF, and AU audio files to MP3 online for free, right in your browser.",
  icon: "🎧",
  popular: false,
  legacyPaths: ["/convert/audio-converter"],
};
