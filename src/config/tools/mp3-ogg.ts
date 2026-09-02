import type { ToolConfig } from "./types";

export const mp3OggConfig: ToolConfig = {
  slug: "mp3-ogg",
  name: "MP3 to OGG Converter",
  description:
    "Convert MP3 (and other audio) files to OGG Vorbis format with balanced, high-quality encoding — ideal for open-source projects, games, and web audio.",
  category: "audio",
  operation: "convert",
  fromFormat: "MP3",
  toFormat: "OGG",
  howToSteps: [
    "Upload your MP3 file using the upload box above.",
    "Click \"Convert to OGG\" to start the conversion — it runs fully in your browser using FFmpeg.wasm, so your file never leaves your device.",
    "Download your converted OGG file once it's ready.",
  ],
  faq: [
    {
      question: "Why convert MP3 to OGG?",
      answer:
        "OGG Vorbis is a royalty-free, open format often preferred for games, web audio, and open-source projects, and it can achieve similar quality to MP3 at a smaller file size.",
    },
    {
      question: "What quality setting does this use?",
      answer:
        "The conversion uses libvorbis at quality level 4 (VBR), a balanced setting that gives good audio quality without an unnecessarily large file.",
    },
    {
      question: "Will the audio quality noticeably drop?",
      answer:
        "Since MP3 is already a lossy format, converting to OGG re-encodes already-compressed audio, so there may be a very slight additional quality loss, though it's generally not noticeable at this quality level.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "Files up to 100MB are supported. Since conversion runs entirely in your browser via WebAssembly, very large files (over 100MB) may be slow to process.",
    },
  ],
  converterFn: "mp3ToOgg",
  relatedTools: [],
  metaTitle: "MP3 to OGG Converter — Convert MP3 to OGG Online | Free Tool",
  metaDescription: "Convert MP3 files to OGG format online for free, directly in your browser.",
  icon: "🎵",
  popular: false,
  legacyPaths: ["/convert/mp3-ogg"],
};
