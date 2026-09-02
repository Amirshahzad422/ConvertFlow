import type { ToolConfig } from "./types";

export const imageRotateConfig: ToolConfig = {
  slug: "image-rotate",
  name: "Rotate Image",
  description:
    "Rotate any image 90° at a time, or straighten it to any exact angle from -45° to 45° with a fine-grained slider. Free, fast, and runs entirely in your browser.",
  category: "image",
  operation: "tool",
  fromFormat: "Image",
  toFormat: "Rotated image",
  howToSteps: [
    "Upload the image you want to rotate.",
    "Use the rotate buttons to turn it 90° clockwise or counter-clockwise.",
    "Fine-tune with the Straighten slider for any angle between -45° and 45°.",
    'Click "Download" to save the rotated image as a PNG.',
  ],
  faq: [
    {
      question: "Can I rotate an image to an exact angle, not just 90°?",
      answer:
        "Yes — besides the 90° rotation buttons, the Straighten slider lets you fine-tune the angle anywhere from -45° to 45°, and both combine together.",
    },
    {
      question: "What format is the rotated image saved as?",
      answer: "The rotated image is downloaded as a PNG file.",
    },
    {
      question: "Will rotating crop or cut off parts of my image?",
      answer:
        "No — the canvas is automatically resized to fit the full rotated image so nothing gets clipped.",
    },
    {
      question: "Is my image uploaded to a server?",
      answer:
        "No, rotation happens entirely client-side using the Canvas API — your image never leaves your browser.",
    },
  ],
  converterFn: "",
  relatedTools: ["image-cropper", "color-picker"],
  metaTitle: "Rotate Image Online Free — Image Rotation Tool",
  metaDescription:
    "Rotate or straighten any image online for free — 90° rotation buttons plus a precise -45° to 45° straighten slider. Fast and runs in your browser.",
  icon: "🔄",
  popular: false,
  customPanel: "image-rotate",
  legacyPaths: ["/tools/image-rotate"],
};
