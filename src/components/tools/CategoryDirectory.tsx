"use client";

import { useMemo, useState } from "react";
import type { ToolConfig, ToolOperation } from "@/config/tools/types";
import { ToolCard } from "./ToolCard";
import { SearchBar } from "./SearchBar";
import { CategoryNav } from "@/components/layout/CategoryNav";

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  image: "Image",
  pdf: "PDF",
  video: "Video",
  audio: "Audio",
  document: "Document",
  archive: "Archive",
};

interface CategoryDirectoryProps {
  tools: ToolConfig[];
  operation?: ToolOperation;
  fixedCategory?: ToolConfig["category"];
  title: string;
  description: string;
}

export function CategoryDirectory({ tools, operation, fixedCategory, title, description }: CategoryDirectoryProps) {
  const scoped = useMemo(
    () =>
      tools.filter(
        (tool) =>
          (!operation || tool.operation === operation) &&
          (!fixedCategory || tool.category === fixedCategory)
      ),
    [tools, operation, fixedCategory]
  );

  const categories = useMemo(() => {
    if (fixedCategory) return [];
    const present = Array.from(new Set(scoped.map((t) => t.category)));
    return [{ id: "all", label: "All" }, ...present.map((id) => ({ id, label: CATEGORY_LABELS[id] ?? id }))];
  }, [scoped, fixedCategory]);

  const [active, setActive] = useState<string>("all");
  const visible = active === "all" ? scoped : scoped.filter((t) => t.category === active);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
        <p className="mt-3 text-slate-600">{description}</p>
      </header>

      <div className="mx-auto mt-8 max-w-xl">
        <SearchBar tools={scoped} />
      </div>

      {categories.length > 1 && (
        <div className="mt-8 flex justify-center">
          <CategoryNav categories={categories} active={active} onChange={setActive} />
        </div>
      )}

      {visible.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-slate-500">No tools in this category yet.</p>
      )}
    </div>
  );
}
