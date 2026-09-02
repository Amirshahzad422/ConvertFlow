import type { ToolConfig } from "./types";

export const mp4Mp3Config: ToolConfig = {
  slug: "mp4-mp3",
  name: "MP4 to MP3 Converter",
  description:
    "Convert MP4 video files to MP3 audio, entirely in your browser — no server upload required.",
  category: "audio",
  operation: "convert",
  fromFormat: "MP4",
  toFormat: "MP3",
  howToSteps: [
    "Upload an MP4 (or MP4-family: AVI, MOV, WMV, FLV, WEBM, MKV, M4V) file using the upload box above.",
    'Click "Convert to MP3" — the conversion runs locally via WebAssembly, right in your browser.',
    "Download your converted MP3 file once it's ready.",
  ],
  faq: [
    {
      question: "Is my MP4 file uploaded anywhere?",
      answer:
        "No. Conversion runs fully client-side using FFmpeg compiled to WebAssembly, so your file stays on your device.",
    },
    {
      question: "What happens if my MP4 has no audio track?",
      answer:
        "If the video file doesn't contain an audio stream, the conversion will fail — there's simply no audio to extract.",
    },
    {
      question: "What bitrate is the output MP3?",
      answer: "Audio is extracted and encoded at 192kbps, 44.1kHz stereo.",
    },
    {
      question: "Will very large video files be slow?",
      answer:
        "Yes — because this runs entirely in-browser via WebAssembly rather than on a server, files 100MB and larger may take a while to process.",
    },
  ],
  converterFn: "mp4ToMp3",
  relatedTools: ["video-mp3", "audio-converter", "mp3-converter"],
  metaTitle: "MP4 to MP3 Converter — Free Online Tool",
  metaDescription:
    "Convert MP4 video files to MP3 audio online for free, right in your browser.",
  icon: "🎬",
  popular: true,
  legacyPaths: ["/convert/mp4-mp3"],
};
