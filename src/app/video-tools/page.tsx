import type { Metadata } from "next";
import { tools } from "@/config/tools";
import { CategoryDirectory } from "@/components/tools/CategoryDirectory";

export const metadata: Metadata = {
  title: "Video Tools",
  description: "Convert and compress video files online — free, fast, and private.",
  alternates: { canonical: "/video-tools" },
};

export default function VideoToolsPage() {
  return (
    <CategoryDirectory
      tools={tools}
      fixedCategory="video"
      title="Video Tools"
      description="Convert, compress, and join video files — processed right in your browser."
    />
  );
}
