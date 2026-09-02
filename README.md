# ConvertFlow

ConvertFlow is a responsive, privacy-first file conversion platform built with Next.js 15, React 19, TypeScript, and Tailwind CSS. It combines browser conversion for lightweight work with server routes for formats that need Sharp or native FFmpeg.

## Run locally

Requirements: Node.js 20+, npm, and FFmpeg on `PATH` for the server-side audio/video routes.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Use `npm run build` for the production/type check and `npm run lint` for static analysis.

Set `NEXT_PUBLIC_SITE_URL` to the public frontend origin before building so canonical URLs, Open Graph metadata, and the generated sitemap use the deployed domain.

## Architecture

- `src/app/(tools)/[slug]/page.tsx` is the shared statically generated SEO page for standard tools.
- `src/config/tools/` is the tool registry: names, formats, category, instructions, FAQs, metadata, related tools, and converter keys.
- `src/lib/converters/client/` contains browser converters using Canvas, pdf-lib, pdfjs-dist, heic2any, JSZip, and lazy-loaded FFmpeg.wasm.
- `src/app/api/` contains server conversion endpoints using Sharp and native media tooling.
- `src/components/tools/` contains the shared upload, progress, result, directory, search, and FAQ experience.
- `src/store/` holds shared conversion history and toast state with Zustand.

Standard tools support drag-and-drop, up to 20 files, per-file validation and removal, status feedback, individual downloads, and download-all-as-ZIP. Bespoke editors such as the cropper, color picker, joiners, and calculators use dedicated client pages but remain in the central registry for navigation and SEO discovery.

## Add a tool

1. Add one `ToolConfig` file under `src/config/tools/`.
2. Add a converter under `src/lib/converters/client/` that returns `{ blob, filename }`.
3. Export the converter from `src/lib/converters/client/registry.ts` using the config's `converterFn` key.
4. Import the config into `src/config/tools/index.ts`.

The route, metadata, SoftwareApplication and FAQ JSON-LD, sitemap entry, directory card, search result, how-to content, FAQ, and related-tool section are then generated automatically. Set `batchMode: true` and register a function in `batchConverterRegistry` when the converter consumes the entire queue, such as Merge PDF.

## Deployment

The Next.js frontend and lightweight API routes can be deployed to Vercel. Copy the FFmpeg assets in `public/ffmpeg/` unchanged; the cross-origin isolation headers in `next.config.ts` are required for SharedArrayBuffer and FFmpeg.wasm.

Native FFmpeg, Ghostscript, and LibreOffice workloads should be deployed in a separate container service such as Railway or Fly.io and connected through authenticated worker endpoints. Do not assume those binaries exist in a Vercel function. Configure a one-hour object-storage lifecycle for temporary outputs and keep worker credentials server-only.

## Privacy and limits

Browser-compatible files stay on the user's device. Shared upload flows enforce the free 100 MB per-file limit and clearly identify temporary server processing. Server routes validate file type and size before conversion. Production deployments should add rate limiting, durable job storage, malware scanning for document uploads, and authenticated worker-to-frontend requests.

See [AUDIT.md](./AUDIT.md) for the implementation inventory and remaining deployment-dependent work.
