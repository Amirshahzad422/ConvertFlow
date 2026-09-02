import type { Metadata } from "next";
import { tools } from "@/config/tools";
import { CategoryDirectory } from "@/components/tools/CategoryDirectory";

export const metadata: Metadata = {
  title: "Compress tools",
  description: "Free compression utilities for video, audio, images, and PDFs.",
  alternates: { canonical: "/compress" },
};

export default function CompressPage() {
  return (
    <CategoryDirectory
      tools={tools}
      operation="compress"
      title="Compress"
      description="Free compression utilities covering video, audio, images, and PDFs."
    />
  );
}
