"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { ToolConfig } from "@/config/tools/types";
import { toolHref } from "./ToolCard";

interface SearchBarProps {
  tools: ToolConfig[];
  placeholder?: string;
  className?: string;
}

/**
 * Client-side fuzzy-ish filter + autocomplete dropdown over the tool
 * registry. At ~50 tools a backend search index is overkill — this just
 * scores by substring matches across name/formats/description.
 */
export function SearchBar({ tools, placeholder = "Try “compress PDF” or “video to MP3”", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return tools
      .map((tool) => {
        const haystack = `${tool.name} ${tool.fromFormat} ${tool.toFormat} ${tool.description} ${tool.category}`.toLowerCase();
        const nameMatch = tool.name.toLowerCase().includes(q);
        if (!haystack.includes(q)) return null;
        return { tool, score: nameMatch ? 0 : 1 };
      })
      .filter((r): r is { tool: ToolConfig; score: number } => r !== null)
      .sort((a, b) => a.score - b.score)
      .slice(0, 8)
      .map((r) => r.tool);
  }, [tools, query]);

  return (
    <div className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search tools"
        className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
      />
      {query && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-2xl">
          {results.length ? (
            results.map((tool) => (
              <Link
                key={tool.slug}
                href={toolHref(tool)}
                onClick={() => setQuery("")}
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-50"
              >
                <span className="text-lg">{tool.icon ?? "🛠️"}</span>
                <div>
                  <p className="text-sm font-bold text-slate-900">{tool.name}</p>
                  <p className="text-xs text-slate-500">{tool.description}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-4 text-sm text-slate-500">No matching tool yet. Try PDF, MP3, or PNG.</p>
          )}
        </div>
      )}
    </div>
  );
}
