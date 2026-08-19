export type ToolCategory =
  | "image"
  | "pdf"
  | "video"
  | "audio"
  | "document"
  | "archive";

export interface ToolFaqItem {
  question: string;
  answer: string;
}

export interface ToolConfig {
  slug: string;              // matches the route, e.g. "webp-png"
  name: string;               // display name, e.g. "WebP to PNG Converter"
  description: string;
  category: ToolCategory;
  fromFormat: string;
  toFormat: string;
  howToSteps: string[];
  faq: ToolFaqItem[];
  converterFn: string;        // key used to look up the actual converter function
  relatedTools: string[];     // slugs of other tools
  metaTitle: string;
  metaDescription: string;
  icon?: string;               // optional icon identifier
}