import type { ToolConfig } from "./types";

export const audioJoinerConfig: ToolConfig = {
  slug: "audio-joiner",
  name: "Audio Joiner / Merger",
  description:
    "Combine multiple audio or video files into a single audio track, with drag-to-reorder, per-file trimming, volume control, and a waveform timeline editor.",
  category: "audio",
  operation: "tool",
  fromFormat: "Audio/Video",
  toFormat: "MP3",
  howToSteps: [
    "Add two or more audio or video files (audio is automatically extracted from video).",
    "Drag files by the handle to reorder them — they merge in the order shown on the timeline.",
    "Optionally trim each file and adjust its overall volume, or click-and-drag on a waveform to set volume for just a segment.",
    'Click "Merge" to combine everything into one MP3, then download the result.',
  ],
  faq: [
    {
      question: "What file types can I merge?",
      answer:
        "MP3, WAV, M4A, OGG, FLAC, AAC, WMA audio files, plus common video formats like MP4, AVI, MOV, MKV, WEBM, and WMV — audio is automatically extracted from any video file.",
    },
    {
      question: "Can I reorder files before merging?",
      answer:
        "Yes — drag files by the grip handle in the timeline view to reorder them, or use the Shuffle button to randomize the order.",
    },
    {
      question: "Can I trim individual files before merging?",
      answer:
        "Yes — click the trim icon on any file to set a start and end point, and the waveform preview shows exactly what will be kept.",
    },
    {
      question: "Can I control volume per file or per segment?",
      answer:
        "Yes — each file has its own volume slider, and you can click-and-drag on its waveform to select a segment and set a custom volume just for that range.",
    },
    {
      question: "What format is the merged file?",
      answer: "The merged output is delivered as a single MP3 file.",
    },
  ],
  converterFn: "",
  relatedTools: ["audio-trimmer", "video-joiner"],
  metaTitle: "Audio Joiner / Merger — Combine Audio Files Online Free",
  metaDescription:
    "Merge multiple audio or video files into one MP3 online for free, with drag-to-reorder, per-file trimming, and volume control.",
  icon: "🔊",
  popular: false,
  customPage: true,
  route: "/tools/audio-joiner",
};
