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
   * True when this tool has its own bespoke route (e.g. a calculator or a
   * multi-file timeline editor) instead of rendering through the generic
   * src/app/(tools)/[slug]/page.tsx template. It still appears in the
   * registry (directory, search, sitemap) via its own route.
   */
  customPage?: boolean;
  /**
   * Only meaningful when customPage is true: the tool's real route, since
   * it doesn't live at the canonical /<slug> path (e.g. "/tools/color-picker").
   * Every link into the tool (ToolCard, SearchBar, directories) resolves
   * through this when present.
   */
  route?: string;
  /** Old /convert|/compress|/tools URLs that should 301 to /<slug>. Do not set this for customPage tools whose route hasn't moved. */
  legacyPaths?: string[];
}
