import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { tools, getToolBySlug } from "@/config/tools";
import { FaqAccordion } from "@/components/tools/FaqAccordion";
import { ToolConverterPanel } from "@/components/tools/ToolConverterPanel";
import { CustomToolPanel } from "@/components/tools/panels/CustomToolPanel";
import { toolJsonLd } from "@/lib/utils/jsonLd";
import { toolHref } from "@/components/tools/ToolCard";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Every tool in the registry renders through this single template — the
// standard ones use ToolConverterPanel, interactive ones swap in a
// `customPanel` component. Nothing else in the app defines a tool route.
export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
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

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const related = tools.filter((t) => tool.relatedTools.includes(t.slug));
  const faq = [
    ...tool.faq,
    {
      question: `Are my files private when I use ${tool.name}?`,
      answer: `Yes. ConvertFlow processes compatible files in your browser whenever possible. When server processing is required, files are handled only for the conversion and are not shared.`,
    },
    {
      question: `Can I use ${tool.name} on a phone or tablet?`,
      answer: `Yes. The upload, conversion, and download flow is designed for modern mobile and desktop browsers.`,
    },
    {
      question: `Do I need an account to use ${tool.name}?`,
      answer: `No. Everyday conversions can be completed without registration or a watermark.`,
    },
    {
      question: `Can I process several files with ${tool.name}?`,
      answer: `Yes. Add up to 20 compatible files and follow each file's status in the shared conversion queue.`,
    },
  ].slice(0, Math.max(5, tool.faq.length));
  const jsonLd = toolJsonLd({ ...tool, faq }, siteUrl);

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1A2B4C] mb-3">
            {tool.name}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{tool.description}</p>
        </div>

        {/* Upload / convert panel */}
        {tool.customPanel ? (
          <CustomToolPanel panelKey={tool.customPanel} />
        ) : (
          <ToolConverterPanel
            toolName={tool.name}
            converterFn={tool.converterFn}
            batchMode={tool.batchMode}
            operation={tool.operation}
            fromFormat={tool.fromFormat}
            toFormat={tool.toFormat}
            category={tool.category}
          />
        )}

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
            <FaqAccordion items={faq} />
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
                  href={toolHref(rt)}
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
