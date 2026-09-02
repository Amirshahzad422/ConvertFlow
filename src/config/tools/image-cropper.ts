import type { ToolConfig } from "./types";

export const imageCropperConfig: ToolConfig = {
  slug: "image-cropper",
  name: "Image Cropper",
  description:
    "Crop any image online with a draggable crop box, preset aspect ratios, and precise width/height/position controls. Free, fast, and runs entirely in your browser.",
  category: "image",
  operation: "tool",
  fromFormat: "Image",
  toFormat: "Cropped image",
  howToSteps: [
    "Upload a JPG, PNG, WebP, or GIF image.",
    "Drag the crop box to reposition it, or type exact width, height, and position (X/Y) values.",
    "Optionally lock a preset aspect ratio (1:1, 4:3, 16:9, 3:2, or 2:3), or leave it free-form.",
    'Click "Crop" to download the cropped image as a PNG.',
  ],
  faq: [
    {
      question: "What image formats can I upload?",
      answer: "JPG, JPEG, PNG, WebP, and GIF images are supported, up to 1GB.",
    },
    {
      question: "Can I crop to a specific aspect ratio?",
      answer:
        "Yes — choose from FreeForm, 1:1, 4:3, 16:9, 3:2, or 2:3, and the crop box will constrain itself to that ratio as you resize it.",
    },
    {
      question: "What format is the cropped image downloaded as?",
      answer: "The cropped result is downloaded as a PNG file.",
    },
    {
      question: "Is my image uploaded to a server?",
      answer:
        "No — cropping happens entirely in your browser using the Canvas API. Your image is never sent anywhere.",
    },
  ],
  converterFn: "",
  relatedTools: ["image-rotate", "color-picker"],
  metaTitle: "Image Cropper — Crop Images Online Free",
  metaDescription:
    "Crop any image online for free with a draggable crop box, aspect ratio presets, and precise controls. Fast, private, and runs in your browser.",
  icon: "✂️",
  popular: false,
  customPanel: "image-cropper",
  legacyPaths: ["/tools/image-cropper"],
};
