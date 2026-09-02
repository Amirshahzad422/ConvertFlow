import type { Metadata } from "next";
import { tools } from "@/config/tools";
import { CategoryDirectory } from "@/components/tools/CategoryDirectory";

export const metadata: Metadata = {
  title: "Audio Tools",
  description: "Convert, compress, join, and trim audio files online — free, fast, and private.",
  alternates: { canonical: "/audio-tools" },
};

export default function AudioToolsPage() {
  return (
    <CategoryDirectory
      tools={tools}
      fixedCategory="audio"
      title="Audio Tools"
      description="Convert, compress, join, and trim audio files — all in your browser."
    />
  );
}
