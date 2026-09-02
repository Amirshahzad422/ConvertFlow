import Link from "next/link";
import type { ToolConfig } from "@/config/tools/types";

export function toolHref(tool: ToolConfig): string {
  return tool.route ?? `/${tool.slug}`;
}

interface ToolCardProps {
  tool: ToolConfig;
  className?: string;
}

export function ToolCard({ tool, className = "" }: ToolCardProps) {
  return (
    <Link
      href={toolHref(tool)}
      className={`group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/60 ${className}`}
    >
      <div className="flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-xl">
          {tool.icon ?? "🛠️"}
        </span>
        {tool.popular && (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-amber-700">
            Popular
          </span>
        )}
      </div>
      <h3 className="mt-5 font-extrabold text-slate-900 group-hover:text-indigo-600">{tool.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{tool.description}</p>
    </Link>
  );
}
