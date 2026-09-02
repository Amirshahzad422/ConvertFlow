'use client';

import Link from 'next/link';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { Archive, ArrowRight, AudioLines, Check, ChevronRight, Download, File, FileText, Film, Image as ImageIconLucide, LockKeyhole, ShieldCheck, Sparkles, UploadCloud, WandSparkles, X, Zap, type LucideIcon } from 'lucide-react';
import { tools as toolRegistry } from '@/config/tools';
import type { ToolCategory } from '@/config/tools/types';
import { toolHref } from '@/components/tools/ToolCard';
import { SearchBar } from '@/components/tools/SearchBar';

const CATEGORY_META: Partial<Record<ToolCategory, { label: string; icon: LucideIcon; color: string; href: string }>> = {
  image: { label: 'Image', icon: ImageIconLucide, color: 'bg-violet-50 text-violet-600', href: '/image-tools' },
  pdf: { label: 'PDF', icon: FileText, color: 'bg-rose-50 text-rose-600', href: '/pdf-tools' },
  video: { label: 'Video', icon: Film, color: 'bg-blue-50 text-blue-600', href: '/video-tools' },
  audio: { label: 'Audio', icon: AudioLines, color: 'bg-amber-50 text-amber-600', href: '/audio-tools' },
  archive: { label: 'Archive', icon: Archive, color: 'bg-cyan-50 text-cyan-600', href: '/archive-tools' },
};

const categories = (Object.keys(CATEGORY_META) as ToolCategory[])
  .map((id) => {
    const meta = CATEGORY_META[id]!;
    const count = toolRegistry.filter((t) => t.category === id).length;
    return { id, ...meta, count };
  })
  .filter((c) => c.count > 0);

const popularTools = toolRegistry.filter((t) => t.popular);

const features = [
  { icon: Zap, title: 'Fast by design', copy: 'Lightweight conversions happen right in your browser, so you spend less time uploading and waiting.' },
  { icon: ShieldCheck, title: 'Privacy first', copy: 'Your files are handled securely. Browser-based tools keep compatible files on your device.' },
  { icon: WandSparkles, title: 'Quality preserved', copy: 'Carefully chosen conversion settings keep your documents, media, and images looking their best.' },
];

const testimonials = [
  { quote: 'I converted a whole batch of product images in minutes, without creating an account.', name: 'Maya Chen', role: 'E-commerce designer' },
  { quote: 'The privacy-first tools are exactly what I want for client documents and everyday media.', name: 'Daniel Brooks', role: 'Independent consultant' },
  { quote: 'Clean on mobile, quick to understand, and there is no watermark waiting at the end.', name: 'Amara Okafor', role: 'Content producer' },
];

function prettyBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function HomePageClient() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [target, setTarget] = useState('png');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ url: string; name: string } | null>(null);

  const chooseFile = (selected?: File) => {
    if (!selected) return;
    setFile(selected);
    setError('');
    if (result) URL.revokeObjectURL(result.url);
    setResult(null);
  };
  const onInput = (event: ChangeEvent<HTMLInputElement>) => chooseFile(event.target.files?.[0]);
  const onDrop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setDragging(false); chooseFile(event.dataTransfer.files?.[0]); };

  const convertImage = async () => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Quick Convert currently supports images. Choose the matching tool below for video, audio, PDF, or archive files.');
      return;
    }
    setBusy(true); setError('');
    try {
      const body = new FormData();
      body.append('file', file); body.append('target', target); body.append('quality', '90');
      const response = await fetch('/api/convert/image', { method: 'POST', body });
      if (!response.ok) { const message = await response.json().catch(() => ({})); throw new Error(message.error || 'We could not convert that image.'); }
      const blob = await response.blob();
      const name = `${file.name.replace(/\.[^.]+$/, '')}.${target}`;
      setResult({ url: URL.createObjectURL(blob), name });
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Conversion failed. Please try again.'); }
    finally { setBusy(false); }
  };

  return (
    <div className="-mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
      <section className="relative border-b border-indigo-100 bg-[linear-gradient(180deg,#f8faff_0%,#ffffff_100%)] px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,.13),transparent_38%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-sm"><Sparkles className="size-3.5" /> Fast, private, and always free</div>
          <h1 className="text-balance text-4xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-6xl">Convert any file.<br /><span className="text-indigo-600">Keep the quality.</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Simple, secure file conversion for images, video, audio, PDFs, documents, and archives—without watermarks or surprise paywalls.</p>

          <div onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop} className={`mx-auto mt-10 max-w-3xl rounded-3xl border-2 border-dashed bg-white p-5 shadow-[0_24px_70px_-28px_rgba(67,56,202,.35)] transition sm:p-8 ${dragging ? 'scale-[1.01] border-indigo-500 bg-indigo-50' : 'border-indigo-200'}`}>
            <input ref={inputRef} type="file" className="sr-only" onChange={onInput} />
            {!file ? (
              <div className="py-7 sm:py-10">
                <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-indigo-50 text-indigo-600"><UploadCloud className="size-8" /></span>
                <h2 className="mt-5 text-xl font-extrabold text-slate-900">Drop a file here to get started</h2><p className="mt-2 text-sm text-slate-500">or choose one from your device</p>
                <button onClick={() => inputRef.current?.click()} className="mt-6 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700">Choose file</button>
                <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-400"><LockKeyhole className="size-3.5" /> Your files are handled securely and never shared.</p>
              </div>
            ) : (
              <div className="text-left">
                <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-indigo-100 text-indigo-600"><File className="size-6" /></span><div className="min-w-0 flex-1"><p className="truncate font-bold text-slate-900">{file.name}</p><p className="mt-0.5 text-xs text-slate-500">{prettyBytes(file.size)}</p></div><button onClick={() => setFile(null)} aria-label="Remove file" className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-white hover:text-rose-600"><X className="size-5" /></button></div>
                <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-end"><label className="flex-1 text-xs font-bold uppercase tracking-wider text-slate-500">Convert image to<select value={target} onChange={(e) => setTarget(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none focus:border-indigo-500"><option value="png">PNG</option><option value="jpg">JPG</option><option value="webp">WEBP</option></select></label><button disabled={busy} onClick={convertImage} className="h-12 rounded-xl bg-indigo-600 px-7 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:opacity-60">{busy ? 'Converting…' : 'Convert now'}</button></div>
                {error && <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p>}
                {result && <a href={result.url} download={result.name} className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-emerald-700"><Download className="size-4" /> Download {result.name}</a>}
              </div>
            )}
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-xs font-semibold text-slate-500 sm:text-sm"><span className="flex items-center gap-1.5"><Check className="size-4 text-emerald-500" /> No registration</span><span className="flex items-center gap-1.5"><Check className="size-4 text-emerald-500" /> No watermarks</span><span className="flex items-center gap-1.5"><Check className="size-4 text-emerald-500" /> Works on every device</span></div>
        </div>
      </section>

      <section id="find-a-tool" className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Everything you need</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Find the right tool in seconds</h2><p className="mt-4 text-slate-600">Search by format, task, or file type.</p></div>
        <div className="mx-auto mt-8 max-w-xl"><SearchBar tools={toolRegistry} /></div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{categories.map((category) => <Link key={category.id} href={category.href} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/60"><span className={`grid size-11 place-items-center rounded-xl ${category.color}`}><category.icon className="size-5" /></span><h3 className="mt-4 font-extrabold text-slate-900">{category.label}</h3><p className="mt-1 text-xs text-slate-500">{category.count} tool{category.count === 1 ? '' : 's'}</p><ChevronRight className="mt-4 size-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600" /></Link>)}</div>
      </div></section>

      {popularTools.length > 0 && (
        <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-6"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Most popular</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">Tools people love</h2></div><Link href="/tools" className="hidden items-center gap-1 text-sm font-bold text-indigo-600 sm:flex">View all tools <ArrowRight className="size-4" /></Link></div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{popularTools.map((tool) => <Link key={tool.slug} href={toolHref(tool)} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"><div className="flex items-start justify-between"><span className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-xl">{tool.icon ?? '🛠️'}</span><span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-amber-700">Popular</span></div><h3 className="mt-5 font-extrabold text-slate-900 group-hover:text-indigo-600">{tool.name}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{tool.description}</p><span className="mt-5 flex items-center gap-1 text-xs font-bold text-indigo-600">Open tool <ArrowRight className="size-3.5 transition group-hover:translate-x-1" /></span></Link>)}</div>
        </div></section>
      )}

      <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mx-auto max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Made for real work</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Powerful conversion, refreshingly simple</h2></div><div className="mt-12 grid gap-8 md:grid-cols-3">{features.map((feature) => <div key={feature.title} className="text-center"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200"><feature.icon className="size-6" /></span><h3 className="mt-5 text-lg font-extrabold text-slate-900">{feature.title}</h3><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">{feature.copy}</p></div>)}</div></div></section>

      <section className="border-y border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Trusted workflow</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Less friction, more finished work</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">{testimonials.map((item) => <figure key={item.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex gap-1 text-amber-400" aria-label="5 out of 5 stars">★★★★★</div><blockquote className="mt-4 text-sm leading-7 text-slate-700">“{item.quote}”</blockquote><figcaption className="mt-5 border-t border-slate-100 pt-4"><p className="font-extrabold text-slate-900">{item.name}</p><p className="mt-1 text-xs text-slate-500">{item.role}</p></figcaption></figure>)}</div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-center text-white sm:px-12 sm:py-16"><p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-300">Ready when you are</p><h2 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Your next conversion is just a few clicks away.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-300">Choose from dozens of focused tools. No account needed for everyday conversions.</p><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-slate-950 hover:bg-indigo-50">Convert a file <ArrowRight className="size-4" /></button></div></section>
    </div>
  );
}
