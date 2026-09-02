import type { Metadata } from "next";
import { tools } from "@/config/tools";
import { CategoryDirectory } from "@/components/tools/CategoryDirectory";

export const metadata: Metadata = {
  title: "Convert tools",
  description: "Free file conversion utilities for images, video, audio, documents, PDFs, and more.",
  alternates: { canonical: "/convert" },
};

export default function ConvertPage() {
  return (
    <CategoryDirectory
      tools={tools}
      operation="convert"
      title="Convert"
      description="Free file conversion utilities covering images, documents, video, and audio."
    />
  );
}
