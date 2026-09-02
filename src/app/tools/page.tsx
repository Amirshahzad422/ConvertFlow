import type { Metadata } from "next";
import { tools } from "@/config/tools";
import { CategoryDirectory } from "@/components/tools/CategoryDirectory";

export const metadata: Metadata = {
  title: "Tools",
  description: "Utility tools: color picker, image cropper, audio/video joiners and trimmers, calculators, and more.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <CategoryDirectory
      tools={tools}
      operation="tool"
      title="Tools"
      description="Utility tools that don't fit neatly into convert or compress — calculators, croppers, joiners, and more."
    />
  );
}
