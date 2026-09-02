import type { Metadata } from "next";
import { tools } from "@/config/tools";
import { CategoryDirectory } from "@/components/tools/CategoryDirectory";

export const metadata: Metadata = {
  title: "PDF Tools",
  description: "Convert, compress, and create PDF files online — free, fast, and private.",
  alternates: { canonical: "/pdf-tools" },
};

export default function PdfToolsPage() {
  return (
    <CategoryDirectory
      tools={tools}
      fixedCategory="pdf"
      title="PDF Tools"
      description="Convert images to and from PDF, and compress PDF files — all in your browser."
    />
  );
}
