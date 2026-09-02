import type { Metadata } from "next";
import { tools } from "@/config/tools";
import { CategoryDirectory } from "@/components/tools/CategoryDirectory";

export const metadata: Metadata = {
  title: "Archive Tools",
  description: "Create ZIP archives online — free, fast, and private.",
  alternates: { canonical: "/archive-tools" },
};

export default function ArchiveToolsPage() {
  return (
    <CategoryDirectory
      tools={tools}
      fixedCategory="archive"
      title="Archive Tools"
      description="Zip files up right in your browser — no upload required."
    />
  );
}
