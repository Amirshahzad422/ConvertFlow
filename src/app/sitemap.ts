import type { MetadataRoute } from "next";
import { tools } from "@/config/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/convert`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/compress`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tools`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/image-tools`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/video-tools`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/audio-tools`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/pdf-tools`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/archive-tools`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/pricing`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/${tool.slug}`,
    changeFrequency: "monthly",
    priority: tool.popular ? 0.9 : 0.7,
  }));

  return [...staticPages, ...toolPages];
}
