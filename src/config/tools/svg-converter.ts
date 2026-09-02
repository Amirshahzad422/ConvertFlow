import type { ToolConfig } from "./types";

export const svgConverterConfig: ToolConfig = {
  slug: "svg-converter",
  name: "SVG to PNG Converter",
  description: "Convert SVG images to PNG format with high quality and transparency support.",
  category: "image",
  operation: "convert",
  fromFormat: "SVG",
  toFormat: "PNG",
  howToSteps: [
    "Upload your SVG file using the upload box above.",
    'Click "Convert SVG" to rasterize it — this happens instantly in your browser.',
    "Download your converted PNG file once it's ready.",
  ],
  faq: [
    {
      question: "What size will the PNG be?",
      answer:
        "The PNG is rendered at the SVG's natural (or specified) dimensions, up to a reasonable maximum, so the output looks crisp without producing an unnecessarily huge file.",
    },
    {
      question: "Does this preserve transparency?",
      answer: "Yes, transparent areas in your SVG are preserved as transparency in the resulting PNG.",
    },
    {
      question: "Is this safe for SVGs from an untrusted source?",
      answer:
        "Conversion happens entirely in your browser by drawing the SVG to a canvas — the file never leaves your device, since SVGs are small enough that no server round-trip is needed.",
    },
    {
      question: "Can I convert to JPG instead?",
      answer:
        "This tool outputs PNG so any transparency is kept. If you specifically need a JPG, download the PNG first and run it through our WEBP/PNG to JPG converters, or use the general Image Converter.",
    },
  ],
  converterFn: "svgToPng",
  relatedTools: ["webp-png", "image-converter", "jfif-png"],
  metaTitle: "SVG to PNG Converter — Free Online Tool",
  metaDescription:
    "Convert SVG images to PNG format online for free, instantly in your browser, with transparency preserved.",
  icon: "🎨",
  legacyPaths: ["/convert/svg-converter"],
};
