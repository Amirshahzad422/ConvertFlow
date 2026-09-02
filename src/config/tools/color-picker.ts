import type { ToolConfig } from "./types";

export const colorPickerConfig: ToolConfig = {
  slug: "color-picker",
  name: "Color Picker",
  description:
    "Pick, convert, and copy colors in HEX, RGB, HSV, HSL, and CMYK formats. Includes an image color picker with a magnifier and dominant color palette extraction.",
  category: "utility",
  operation: "tool",
  fromFormat: "Image",
  toFormat: "Color values",
  howToSteps: [
    "Use the Color Picker tab to select a color from the saturation/brightness area and hue slider, or type in exact HEX/RGB/HSV/HSL/CMYK values.",
    "Or switch to the Image Color Picker tab and upload an image.",
    "Move your mouse over the image to preview colors in a magnifier, and click to select the exact pixel color.",
    "Copy any format to your clipboard, or download an extracted color palette as a PNG.",
  ],
  faq: [
    {
      question: "Which color formats are supported?",
      answer: "HEX, RGB (with alpha), HSV, HSL, and CMYK — all update together and can each be copied to your clipboard.",
    },
    {
      question: "Can I pick a color directly from an uploaded image?",
      answer:
        "Yes — the Image Color Picker tab lets you upload an image, hover to preview colors with a live magnifier, and click any pixel to select its exact color.",
    },
    {
      question: "Does it extract a color palette from my image automatically?",
      answer:
        "Yes — uploading an image automatically extracts up to 8 dominant colors, which you can add to, remove from, or download as a PNG swatch sheet.",
    },
    {
      question: "Is my image uploaded to a server?",
      answer:
        "No — all color extraction and pixel sampling happens locally in your browser using the Canvas API.",
    },
  ],
  converterFn: "",
  relatedTools: ["image-cropper", "image-rotate"],
  metaTitle: "Color Picker — HEX, RGB, HSV, HSL, CMYK Converter",
  metaDescription:
    "Free online color picker with HEX, RGB, HSV, HSL, and CMYK support, plus an image color picker with magnifier and dominant palette extraction.",
  icon: "🎨",
  popular: false,
  customPanel: "color-picker",
  legacyPaths: ["/tools/color-picker"],
};
