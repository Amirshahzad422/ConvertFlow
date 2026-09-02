import type { Metadata } from "next";
import { tools } from "@/config/tools";
import { CategoryDirectory } from "@/components/tools/CategoryDirectory";

export const metadata: Metadata = {
  title: "Image Tools",
  description: "Convert, compress, crop, and rotate images online — free, fast, and private.",
  alternates: { canonical: "/image-tools" },
};

export default function ImageToolsPage() {
  return (
    <CategoryDirectory
      tools={tools}
      fixedCategory="image"
      title="Image Tools"
      description="Convert, compress, crop, and rotate images — all in your browser."
    />
  );
}
