import type { ToolConfig } from "./types";

export const archiveConverterConfig: ToolConfig = {
  slug: "archive-converter",
  name: "Zip File",
  description:
    "Compress any single file into a ZIP archive, entirely in your browser. No upload to a server, no waiting.",
  category: "archive",
  operation: "convert",
  fromFormat: "Any file",
  toFormat: "ZIP",
  howToSteps: [
    "Upload the file you want to compress using the upload box above.",
    'Click "Convert" to wrap it into a ZIP archive.',
    "Download your .zip file once it's ready.",
  ],
  faq: [
    {
      question: "What does this tool actually do?",
      answer:
        "It compresses a single file you upload into a standard .zip archive using client-side compression (JSZip) — nothing is uploaded to a server, the archive is built right in your browser.",
    },
    {
      question: "Can I zip multiple files into one archive at once?",
      answer:
        "Not yet — this tool currently handles one file in, one .zip out. Batch/multi-file zipping is a planned follow-up.",
    },
    {
      question: "Can this open or create RAR or 7z archives?",
      answer:
        "No. This tool only creates ZIP archives. Full RAR/7z extraction and creation support is a documented follow-up, not yet built.",
    },
    {
      question: "Is the file size limited?",
      answer:
        "Very large files may be slow to compress since everything happens in your browser's memory, but there's no artificial size cap.",
    },
    {
      question: "Is my file uploaded anywhere?",
      answer:
        "No. The ZIP archive is created entirely client-side in your browser — your file never leaves your device.",
    },
  ],
  converterFn: "zipFile",
  relatedTools: ["webp-png"],
  metaTitle: "Zip a File Online Free — ZIP Archive Converter",
  metaDescription:
    "Compress any file into a ZIP archive online for free, right in your browser. Fast, private, single-file ZIP creation with no upload required.",
  icon: "🗜️",
  popular: false,
  legacyPaths: ["/convert/archive-converter"],
};
