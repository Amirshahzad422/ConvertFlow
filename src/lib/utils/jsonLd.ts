import type { ToolConfig } from "@/config/tools/types";

export function toolJsonLd(tool: ToolConfig, siteUrl: string) {
  const url = `${siteUrl}/${tool.slug}`;

  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.metaDescription,
    url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (runs in the browser)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqPage = tool.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: tool.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return [softwareApplication, faqPage].filter(Boolean);
}
