export type ToolCategory =
  | "image"
  | "pdf"
  | "video"
  | "audio"
  | "document"
  | "archive"
  | "utility";

export interface ToolFaqItem {
  question: string;
  answer: string;
}

export type ToolOperation = "convert" | "compress" | "tool";

export interface ToolConfig {
  slug: string;              // matches the route, e.g. "webp-png"
  name: string;               // display name, e.g. "WebP to PNG Converter"
  description: string;
  category: ToolCategory;
  operation: ToolOperation;   // drives /convert, /compress, /tools groupings
  fromFormat: string;
  toFormat: string;
  howToSteps: string[];
  faq: ToolFaqItem[];
  converterFn: string;        // key used to look up the actual converter function
  batchMode?: boolean;        // converter consumes the complete upload queue at once
  relatedTools: string[];     // slugs of other tools
  metaTitle: string;
  metaDescription: string;
  icon?: string;               // emoji, shown on ToolCard
  popular?: boolean;           // surfaced on directory/homepage "popular" grids
  /**
   * For tools whose experience is an interactive editor/calculator rather than
   * a drop-in file converter (cropper, color picker, calculators, timeline
   * editors). Set to a key registered in
   * src/components/tools/panels/registry.ts. The tool still renders through the
   * single src/app/(tools)/[slug]/page.tsx template — hero, how-to, FAQ,
   * related tools, JSON-LD and metadata are all generated the same way — only
   * the conversion panel is swapped for the named component. When set,
   * `converterFn` is ignored and may be "".
   */
  customPanel?: string;
  /** Old /convert|/compress|/tools URLs that should 301 to /<slug>. */
  legacyPaths?: string[];
}
