import type { ToolConfig } from "./types";

export const videoJoinerConfig: ToolConfig = {
  slug: "video-joiner",
  name: "Video Joiner",
  description:
    "Merge multiple video files into one MP4, with drag-to-reorder, per-clip trimming, volume control, and a professional timeline editor.",
  category: "video",
  operation: "tool",
  fromFormat: "Video",
  toFormat: "MP4",
  howToSteps: [
    "Add two or more video files.",
    "Drag clips by the handle to reorder them on the timeline — they merge in the order shown.",
    "Optionally trim each clip and adjust its volume (overall or per waveform segment).",
    'Click "Merge" to combine everything into one MP4, then download the result.',
  ],
  faq: [
    {
      question: "What video formats can I merge?",
      answer:
        "Common video formats are supported; files are automatically converted to a consistent MP4/H.264 encoding before merging so mixed formats and resolutions merge cleanly.",
    },
    {
      question: "Can I reorder or trim clips before merging?",
      answer:
        "Yes — drag clips by the grip handle to reorder them, and use the trim controls to cut each clip down to just the section you want.",
    },
    {
      question: "Can I control volume per clip?",
      answer:
        "Yes — each clip has its own volume slider, and you can select a waveform segment to apply a custom volume to just part of a clip.",
    },
    {
      question: "What format is the merged video?",
      answer: "The merged output is delivered as a single MP4 file (H.264 video, AAC audio).",
    },
  ],
  converterFn: "",
  relatedTools: ["audio-joiner", "audio-trimmer"],
  metaTitle: "Video Joiner — Merge Multiple Videos Online Free",
  metaDescription:
    "Merge multiple video files into one MP4 online for free, with drag-to-reorder, per-clip trimming, and volume control.",
  icon: "🎬",
  popular: false,
  customPage: true,
  route: "/tools/video-joiner",
};
