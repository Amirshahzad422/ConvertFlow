import type { ToolConfig } from "./types";

export const gifCompressorConfig: ToolConfig = {
  slug: "gif-compressor",
  name: "GIF Compressor",
  description:
    "Shrink GIF file size using FFmpeg's palette-based re-encoding, entirely in your browser.",
  category: "image",
  operation: "compress",
  fromFormat: "GIF",
  toFormat: "GIF",
  howToSteps: [
    "Upload a GIF file using the upload box above.",
    'Click "Compress GIF" — a custom color palette is generated and applied locally in your browser via WebAssembly.',
    "Download your smaller, compressed GIF file once it's ready.",
  ],
  faq: [
    {
      question: "How does this shrink a GIF?",
      answer:
        "This tool uses FFmpeg's two-pass palette workflow (palettegen + paletteuse) at 10fps and up to 128 colors, generating an optimized color palette for your specific GIF instead of using GIF's generic default palette, which usually reduces file size noticeably.",
    },
    {
      question: "Will the animation quality change?",
      answer:
        "Frame rate is capped at 10fps and colors at 128, so very smooth or highly colorful GIFs may show some banding or slightly choppier motion in exchange for a smaller file.",
    },
    {
      question: "Is my GIF uploaded to a server?",
      answer:
        "No. Both the palette generation and re-encoding passes run entirely client-side using FFmpeg compiled to WebAssembly.",
    },
    {
      question: "Will large GIF files be slow to process?",
      answer:
        "Yes — the two-pass process runs twice over your file, and since it's all WebAssembly with no server involved, large GIFs (100MB+) may take a while to finish.",
    },
  ],
  converterFn: "compressGif",
  relatedTools: ["video-compressor", "webp-png"],
  metaTitle: "GIF Compressor — Reduce GIF File Size Free",
  metaDescription:
    "Compress GIF files to reduce their size online for free, right in your browser.",
  icon: "🖼️",
  popular: false,
  legacyPaths: ["/compress/gif-compressor"],
};
