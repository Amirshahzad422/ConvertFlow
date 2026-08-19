import type { ToolConfig } from "./types";

/**
 * Central registry of every tool on the platform.
 * Each tool is defined by one ToolConfig object here.
 * The generic [slug]/page.tsx template reads from this registry
 * to render every tool page — no manual page code needed per tool.
 *
 * TODO: populate this with real ToolConfig entries as tools are migrated.
 */
export const tools: ToolConfig[] = [];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolConfig["category"]): ToolConfig[] {
  return tools.filter((tool) => tool.category === category);
}