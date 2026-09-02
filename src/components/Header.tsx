'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRightLeft, ChevronDown, Menu, Search, X } from 'lucide-react';

const navGroups = [
  { label: 'Convert', href: '/convert', links: [['Image Converter', '/image-converter'], ['Video Converter', '/mp4-converter'], ['Audio Converter', '/audio-converter'], ['PDF to Images', '/pdf-to-images'], ['Archive Converter', '/archive-converter']] },
  { label: 'Compress', href: '/compress', links: [['Image Compressor', '/image-compressor'], ['Video Compressor', '/video-compressor'], ['PDF Compressor', '/pdf-compressor'], ['GIF Compressor', '/gif-compressor']] },
  { label: 'Tools', href: '/tools', links: [['Image Cropper', '/image-cropper'], ['Rotate Image', '/image-rotate'], ['Audio Trimmer', '/audio-trimmer'], ['Audio Joiner', '/audio-joiner'], ['Video Joiner', '/video-joiner'], ['Color Picker', '/color-picker']] },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-slate-950" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200"><ArrowRightLeft className="size-5" strokeWidth={2.4} /></span>
          <span>Convert<span className="text-indigo-600">Flow</span></span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navGroups.map((group) => (
            <div key={group.label} className="group relative">
              <Link href={group.href} className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950">{group.label}<ChevronDown className="size-4 transition group-hover:rotate-180" /></Link>
              <div className="invisible absolute left-0 top-full w-60 translate-y-2 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl shadow-slate-200/60 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {group.links.map(([label, href]) => <Link key={href} href={href} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-700">{label}</Link>)}
                <Link href={group.href} className="mt-1 block border-t border-slate-100 px-3 pb-2 pt-3 text-sm font-bold text-indigo-600">View all {group.label.toLowerCase()} tools →</Link>
              </div>
            </div>
          ))}
          <Link href="/api" className="rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">API</Link>
          <Link href="/pricing" className="rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Pricing</Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/#find-a-tool" aria-label="Search tools" className="grid size-10 place-items-center rounded-xl text-slate-600 hover:bg-slate-100"><Search className="size-5" /></Link>
          <Link href="/login" className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-600">Log in</Link>
        </div>
        <button onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-700 md:hidden" aria-label="Toggle navigation" aria-expanded={open}>{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
      </nav>
      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg md:hidden"><div className="mx-auto max-w-7xl space-y-1">
          {navGroups.map((group) => <Link key={group.href} href={group.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-semibold text-slate-800 hover:bg-slate-50">{group.label}</Link>)}
          <Link href="/api" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-semibold text-slate-800">API</Link><Link href="/pricing" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-semibold text-slate-800">Pricing</Link>
          <Link href="/login" onClick={() => setOpen(false)} className="mt-3 block rounded-xl bg-slate-950 px-4 py-3 text-center font-bold text-white">Log in</Link>
        </div></div>
      )}
    </header>
  );
}
