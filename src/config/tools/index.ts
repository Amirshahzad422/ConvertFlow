import type { ToolConfig } from "./types";
import { webpPngConfig } from "./webp-png";

export const tools: ToolConfig[] = [webpPngConfig];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolConfig["category"]): ToolConfig[] {
  return tools.filter((tool) => tool.category === category);
}