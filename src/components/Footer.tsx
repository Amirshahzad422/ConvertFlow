import Link from 'next/link';
import { ArrowRightLeft, Github, Heart, ShieldCheck } from 'lucide-react';

const columns = [
  { title: 'Convert', links: [['Image Converter', '/convert/image-converter'], ['Video to MP3', '/convert/video-mp3'], ['PDF to Images', '/convert/pdf-to-images'], ['Audio Converter', '/convert/audio-converter']] },
  { title: 'Compress', links: [['Image Compressor', '/compress/image-compressor'], ['Video Compressor', '/compress/video-compressor'], ['PDF Compressor', '/compress/pdf-compressor'], ['GIF Compressor', '/compress/gif-compressor']] },
  { title: 'Resources', links: [['All Tools', '/tools'], ['API', '/api'], ['Pricing', '/pricing'], ['Terms of Use', '/terms']] },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-white"><span className="grid size-9 place-items-center rounded-xl bg-indigo-600"><ArrowRightLeft className="size-5" /></span><span>Convert<span className="text-indigo-400">Flow</span></span></Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Fast, private, easy-to-use tools for the files you work with every day.</p>
            <div className="mt-5 flex items-center gap-4"><span className="inline-flex items-center gap-1.5 text-xs text-slate-500"><ShieldCheck className="size-4 text-emerald-400" /> Privacy-first</span><a href="https://github.com/verxeon-ai/ConvertFlow" aria-label="ConvertFlow on GitHub" className="text-slate-500 transition hover:text-white"><Github className="size-5" /></a></div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => <div key={column.title}><h3 className="text-sm font-bold text-white">{column.title}</h3><ul className="mt-4 space-y-3">{column.links.map(([label, href]) => <li key={href}><Link href={href} className="text-sm text-slate-400 transition hover:text-white">{label}</Link></li>)}</ul></div>)}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} ConvertFlow. All rights reserved.</p><p className="flex items-center gap-1">Made with <Heart className="size-3.5 fill-rose-500 text-rose-500" /> for simpler file conversion.</p></div>
      </div>
    </footer>
  );
}
