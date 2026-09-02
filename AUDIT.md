# ConvertFlow — Implementation Audit

_Audited against `ConvertFlow.pdf` (Verxeon intern case study) and the reference product
[freeconvert.com](https://www.freeconvert.com/). Last updated: 2026-09-02._

This document is the T1.1 deliverable: an inventory of every tool/page that exists, its
status, and the gap list to reach the spec's Definition of Done for each phase.

---

## 1. Build & run status

| Check | Result |
| --- | --- |
| `npm run build` | ✅ Passes (SSG, 94 routes/pages after duplicate-route removal) |
| Lint | ⚠️ ~60 warnings (unused vars, `any`, `require()` in API routes) — no errors |
| `npm run dev` | ✅ Runs |
| Dependencies from T1.1 | ✅ All present: `jszip`, `file-saver`, `zustand`, `next-sitemap`, `react-dropzone`, `@tanstack/react-query` |

`next-sitemap` and `@tanstack/react-query` are installed but **unused** (sitemap is hand-rolled in
`src/app/sitemap.ts`; no react-query anywhere).

---

## 2. Tool inventory (48 registered configs)

| Category | Count | Notes |
| --- | --- | --- |
| image | 16 | conversions + compress + crop/rotate |
| video | 10 | ffmpeg.wasm client + some server routes |
| audio | 9 | ffmpeg.wasm client + server routes |
| pdf | 8 | merge/split/rotate/extract + jpg↔pdf + compress |
| utility | 4 | age / time / unit converters, color picker |
| archive | 1 | single-file ZIP only |
| **document** | **0** | ❌ no DOCX/PPTX/XLSX ↔ PDF, no PDF→Word |

### Tools rendered by the config-driven `[slug]` template (spec-compliant)
All 48 tools render through `src/app/(tools)/[slug]/page.tsx` — hero, upload/editor panel,
how-to, FAQ, related tools, JSON-LD, and generated metadata. Eleven interactive tools select
a registered custom panel from config while keeping the same page template.

### Pre-refactor custom-route findings — resolved
`age-calculator`, `audio-joiner`, `audio-trimmer`, `color-picker`, `image-compressor`,
`image-converter`, `image-cropper`, `image-rotate`, `time-converter`, `unit-converter`,
`video-joiner`.

These previously lived at hand-written routes (`/convert/image-converter`, `/tools/color-picker`, …). The P0 work below moved them into the shared panel registry and canonical route.
The previous structure created these problems, all resolved by the P0 work below:

1. **Checklist #4 fails** — "every tool page is generated from a single config file, no manual page code."
2. **Broken duplicate routes** — `/image-converter` (the `[slug]` route) resolves the config,
   finds `converterFn: ""`, and renders a dead "No converter wired up" panel. No redirect exists.
3. **Sitemap emits the wrong URL** — `src/app/sitemap.ts` emits `/${slug}` for every tool, so
   all 11 custom tools are listed at their broken canonical path, not their real `route`.
4. **No JSON-LD / generated metadata** on the 11 bespoke pages.

### Legacy `/convert/*`, `/compress/*`, `/tools/*` routes
The duplicate hand-written page tree has been removed. Configured legacy URLs now redirect
to their canonical `/<slug>` pages through `next.config.ts`.

---

## 3. Folder structure vs Section 7

| Spec path | Status |
| --- | --- |
| `src/app/(marketing)/` (Home, About, Pricing, Contact, Blog) | ❌ Not a route group; only `/` and `/pricing` exist. No About/Contact/Blog. |
| `src/app/(tools)/[slug]/page.tsx` | ✅ Exists and works (for non-custom tools) |
| `src/app/api/convert/`, `src/app/api/compress/` | ✅ Present (`api/jobs/` ❌ missing) |
| `src/components/ui/` | ⚠️ Has Button, Card, Badge, Skeleton, Modals, Tabs, Toast. Missing **Input, Select**. |
| `src/components/tools/` | ⚠️ Has UploadZone, ProgressBar, FileStatusList, FaqAccordion. Missing **ToolHero** (inlined in `[slug]/page.tsx`). |
| `src/components/layout/` | ⚠️ Only `CategoryNav`. `Header`/`Footer` are in `src/components/` root. No `Sidebar`. |
| `src/config/tools/` | ✅ One file per tool |
| `src/lib/converters/client/` | ✅ Populated |
| `src/lib/converters/server/` | ❌ **Empty** (`.gitkeep` only). All server logic is inline in `api/*/route.ts`. |
| `src/lib/utils/` | ⚠️ Only `cn.ts`, `jsonLd.ts`. No formatting helpers (bytes/duration are re-implemented per component). |
| `src/hooks/` | ⚠️ Only `useFileUpload`. Spec wants `useUpload`, `useJobStatus`, `useDownload`. |
| `src/store/` | ⚠️ `conversionStore`, `toastStore`. No user-preferences store. |
| `src/styles/` | ❌ Missing (globals.css sits in `src/app/`). |

---

## 4. Subsystem-by-subsystem

### 3.1 Discovery & directory
- ✅ Landing page: hero + search, category grid, popular tools, features, testimonials, CTA, footer.
- ✅ Sticky responsive header with Convert/Compress/Tools dropdowns, search icon, Log in.
- ✅ Header and footer navigation point to canonical tool URLs; configured legacy URLs return permanent redirects.
- ⚠️ Nav dropdown groups are `Convert / Compress / Tools` — spec asks for `Convert / Compress / Tools / API / Pricing` as category dropdowns; API & Pricing are plain links (acceptable).
- ✅ Tool directory with per-category grouping + search (`/convert`, `/compress`, `/tools`, `/image-tools`, …).
- ✅ Search includes an autocomplete dropdown and matches names, source/target formats, descriptions, and categories.
- ❌ No dedicated `/document-tools` category page (no document tools).

### 3.2 Conversion engine
- ✅ UploadZone: drag/drop, click, up to 20 files, type + 100 MB validation, image thumbnails, per-file remove.
- ✅ Client conversion: JPG/PNG/WebP/GIF/HEIC/SVG, PDF merge/split/rotate/extract, jpg↔pdf, ffmpeg.wasm video/audio.
- ⚠️ BMP and TIFF conversion targets are not wired client-side (spec lists them explicitly).
- ✅ Sharp server routes for image convert + compress with size limits.
- ⚠️ Progress: per-file + overall bar, cancel, retry. **Progress is faked** (10% → 100%, no real streaming); no ETA / "estimated time remaining".
- ✅ Download individual + download-all-as-ZIP (JSZip) + retention notice.
- ✅ Config-driven image tools hand files above the client threshold to compatible Sharp API routes; unsupported server formats stay on format-preserving converters.
- ❌ No `api/jobs/` polling, no BullMQ/Redis, no cancel on the server.

### 3.3 Tool pages & SEO
- ✅ `[slug]` pages: hero, how-to, FAQ accordion (padded to ≥5), related tools, JSON-LD (SoftwareApplication + FAQPage), generated title/description.
- ✅ Interactive tools receive the same generated metadata, SEO content, FAQs, related tools, and JSON-LD through the shared template.
- ✅ `sitemap.ts` emits canonical URLs for all tools. It uses the supported App Router sitemap convention instead of the optional `next-sitemap` package.
- ✅ `generateStaticParams` covers all registered tools and `dynamicParams = false` rejects unknown slugs.
- ⚠️ Content depth: most FAQs are 3 hand-written + 4 boilerplate. Spec wants 5–8 genuine Q&A and "unique, non-thin content for at least 30 tool pages" (use-cases section missing entirely).

### 3.4 Accounts, pricing & API
- ❌ No NextAuth (email/password or Google). `/login` is a static stub.
- ❌ No Stripe, no free/pro tiers, no ad slots, no rate limiting.
- ❌ `/api` page is a "to be implemented" placeholder. No API keys, no REST token endpoints, no usage dashboard.
- ⚠️ `/pricing` page exists — content only.

### T4.2 Heavy tools / native binaries
- ❌ No separate Node backend, no Dockerfile, no LibreOffice/Ghostscript/native-FFmpeg image.
- ❌ DOCX→PDF, PDF→Word, PPTX→PDF, Ghostscript PDF compression: not built.
- ⚠️ Several API routes shell out to a `ffmpeg` binary on `PATH` (`api/compress/video`, `api/convert/audio-converter`, …) — works locally, will fail on Vercel. These need to move to the worker.

### T5.1 Polish / SEO / deploy / demo
- ❌ No `next-sitemap.config.js`; sitemap not spec-compliant.
- ⚠️ JSON-LD only on 37/48 tool pages.
- ❌ <30 pages have unique non-thin content.
- ⚠️ Animations: hover lifts + toast exist; no page transitions, limited skeleton usage.
- ❌ Not deployed (no Vercel/Railway config committed).
- ❌ No demo recording.
- ⚠️ README exists and is decent, but references this missing AUDIT.md and describes an architecture the code only half-follows.

---

## 5. Prioritized gap list

### P0 — architecture correctness — ✅ DONE (2026-09-02)
1. ✅ The 11 interactive tools now render through the single `src/app/(tools)/[slug]/page.tsx`
   template via a `customPanel` key + `src/components/tools/panels/` registry
   (`CustomToolPanel`). They get the shared hero, how-to, FAQ, related tools, JSON-LD and
   generated metadata like every other tool. `customPage`/`route` removed from the schema.
2. ✅ The hand-written `/convert/*`, `/compress/*`, `/tools/*` per-tool page tree is deleted
   (44 route folders). `/convert`, `/compress`, `/tools` remain as directory pages only.
3. ✅ `[slug]` is authoritative: `generateStaticParams` returns all 48 tools and
   `export const dynamicParams = false` — no runtime-rendered or broken duplicate routes.
4. ✅ Every tool config carries `legacyPaths`; `next.config.ts` 308-redirects each old URL to
   `/<slug>` (verified with a running server).
5. ✅ `sitemap.ts` `/<slug>` entries are now correct for all tools (routes unified).
6. ✅ `ToolConverterPanel` hands image files above `SERVER_FALLBACK_IMAGE_SIZE_BYTES` (15 MB)
   to the Sharp API routes (`/api/convert/image`, `/api/compress/image`) instead of Canvas.
7. ✅ `Header`/`Footer` nav links repointed to canonical `/<slug>` paths.

_Still open from here: `next-sitemap` adoption (spec names it) and `dynamic`-import SSR
polish for the heavier panels are folded into P1._

### P1 — spec coverage gaps
5. Add `document` category + at least DOCX→PDF / PDF→Word / PPTX→PDF via a worker service (T4.2).
6. Add `api/jobs/[id]` status polling + a real queue (BullMQ+Redis) for heavy conversions.
7. Wire BMP/TIFF client conversions; add real progress + ETA where the converter can report it.
8. `useUpload` / `useJobStatus` / `useDownload` hooks; `Input` + `Select` UI primitives; `src/styles/`; move `Header`/`Footer` into `components/layout/`.
9. Search: format-alias index + autocomplete.

### P2 — monetization & polish
10. NextAuth (Google + credentials); free/pro tiers; Stripe; per-key API + usage dashboard.
11. Real `/api` docs page; `/about`, `/contact`, `/blog` under `(marketing)`.
12. Unique content + use-cases block for 30+ tool pages; JSON-LD on every page.
13. Deploy frontend (Vercel) + worker (Railway); record 5–6 min demo.

### P3 — cleanup
14. Clear lint warnings; delete `next-sitemap`/`react-query` if not adopted.
15. Consolidate the duplicated `prettyBytes`/duration formatters into `lib/utils/`.
