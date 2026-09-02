import type { NextConfig } from "next";
import { tools } from "./src/config/tools";

const nextConfig: NextConfig = {
  async redirects() {
    return tools.flatMap((tool) =>
      (tool.legacyPaths ?? []).map((source) => ({
        source,
        destination: `/${tool.slug}`,
        permanent: true,
      }))
    );
  },
  async headers() {
    return [
      {
        // Required for @ffmpeg/ffmpeg (SharedArrayBuffer) to work in the browser.
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};

export default nextConfig;
