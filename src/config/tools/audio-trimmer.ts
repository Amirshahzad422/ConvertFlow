import type { ToolConfig } from "./types";

export const audioTrimmerConfig: ToolConfig = {
  slug: "audio-trimmer",
  name: "Audio Trimmer",
  description:
    "Trim or cut your audio files with precision. Keep a start-to-end range, or remove a middle section, then export to MP3, WAV, AAC, OGG, or FLAC.",
  category: "audio",
  operation: "tool",
  fromFormat: "Audio/Video",
  toFormat: "Trimmed audio",
  howToSteps: [
    "Upload an audio or video file (audio is extracted automatically from video).",
    "Choose a trim mode: keep a start-to-end range, or remove a section from the middle.",
    "Set your trim points, and choose an output format (MP3, WAV, AAC, OGG, or FLAC).",
    "Trim the file and download the result.",
  ],
  faq: [
    {
      question: "What file types can I trim?",
      answer:
        "Any audio file, plus video files — when you upload a video, its audio track is extracted and trimmed automatically.",
    },
    {
      question: "Can I remove a section from the middle instead of just cutting the ends?",
      answer:
        "Yes — the \"middle remove\" trim mode cuts out a section from the middle of the track and seamlessly joins the remaining start and end segments.",
    },
    {
      question: "What output formats are supported?",
      answer: "MP3, WAV, AAC, OGG, and FLAC.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "The tool is built for typical audio/video file sizes; very large files may take longer to process since trimming runs on the server.",
    },
  ],
  converterFn: "",
  relatedTools: ["audio-joiner", "video-joiner"],
  metaTitle: "Audio Trimmer — Trim & Cut Audio Online Free",
  metaDescription:
    "Trim or cut audio files online for free with precise start/end or middle-removal trimming. Export to MP3, WAV, AAC, OGG, or FLAC.",
  icon: "✂️",
  popular: false,
  customPanel: "audio-trimmer",
  legacyPaths: ["/tools/audio-trimmer"],
};
