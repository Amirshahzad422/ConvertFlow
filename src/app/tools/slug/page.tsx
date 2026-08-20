import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { tools, getToolBySlug } from "@/config/tools";
import { FaqAccordion } from "@/components/tools/FaqAccordion";
import { ToolConverterPanel } from "@/components/tools/ToolConverterPanel";

interface ToolPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export function generateMetadata({ params }: ToolPageProps): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: { canonical: `/${tool.slug}` },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      type: "website",
    },
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const related = tools.filter((t) => tool.relatedTools.includes(t.slug));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1A2B4C] mb-3">
            {tool.name}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{tool.description}</p>
        </div>

        {/* Upload / convert panel */}
        <ToolConverterPanel toolName={tool.name} converterFn={tool.converterFn} />

        {/* How-to steps */}
        {tool.howToSteps.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#1A2B4C] mb-6">How it works</h2>
            <ol className="space-y-4">
              {tool.howToSteps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00B4D8] text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="text-gray-700 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* FAQ */}
        {tool.faq.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#1A2B4C] mb-4">Frequently asked questions</h2>
            <FaqAccordion items={tool.faq} />
          </div>
        )}

        {/* Related tools */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#1A2B4C] mb-6">Related tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {related.map((rt) => (
                <Link
                  key={rt.slug}
                  href={`/${rt.slug}`}
                  className="rounded-lg border border-gray-200 p-4 text-sm font-medium text-[#1A2B4C] hover:border-[#00B4D8] transition-colors"
                >
                  {rt.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}