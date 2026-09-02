import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Free File Converter — Images, Video, Audio & PDF',
  description: 'Convert images, videos, audio, PDFs, and more online with fast, secure, no-watermark tools.',
};

export default function HomePage() {
  return <HomePageClient />;
}
