import type { ToolConfig } from "./types";

export const videoMp3Config: ToolConfig = {
  slug: "video-mp3",
  name: "Video to MP3 Converter",
  description:
    "Extract the audio track from any video file and convert it to MP3, entirely in your browser.",
  category: "audio",
  operation: "convert",
  fromFormat: "Video",
  toFormat: "MP3",
  howToSteps: [
    "Upload a video file (MP4, AVI, MOV, WMV, FLV, WEBM, MKV, 3GP, OGV, or M4V) using the upload box above.",
    'Click "Convert to MP3" to start the extraction — everything runs locally in your browser via WebAssembly, no upload to a server.',
    "Download your extracted MP3 audio file once it's ready.",
  ],
  faq: [
    {
      question: "Does my video get uploaded to a server?",
      answer:
        "No. This tool runs FFmpeg compiled to WebAssembly directly in your browser, so your video never leaves your device.",
    },
    {
      question: "What audio quality does the MP3 use?",
      answer:
        "The extracted audio is encoded at 192kbps, 44.1kHz stereo — a good balance of quality and file size for most uses.",
    },
    {
      question: "What video formats are supported?",
      answer:
        "MP4, AVI, MOV, WMV, FLV, WEBM, MKV, 3GP, OGV, and M4V files up to 100MB are supported.",
    },
    {
      question: "Will large files be slow to process?",
      answer:
        "Yes — since conversion happens entirely in-browser via WebAssembly rather than on a server, very large files (100MB+) may take noticeably longer to process than a native app would.",
    },
  ],
  converterFn: "videoToMp3",
  relatedTools: ["mp4-mp3", "audio-converter", "mp3-converter"],
  metaTitle: "Video to MP3 Converter — Free Online Tool",
  metaDescription:
    "Extract audio from any video file and convert it to MP3 online for free, right in your browser.",
  icon: "🎵",
  popular: true,
  legacyPaths: ["/convert/video-mp3"],
};
