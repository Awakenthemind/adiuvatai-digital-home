import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import NavBar from '@/components/layout/NavBar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AeyeGentics - AI Operations & Brand Systems',
  description:
    'Systems built so you can work on your business, not in it. AI automations and brand systems for small business owners and coaches.',
  keywords: ['AI operations', 'AI automation', 'brand systems', 'business automation', 'coaches', 'small business owners'],
  openGraph: {
    title: 'AeyeGentics - AI Operations & Brand Systems',
    description: 'AI automations and client-attracting brand systems that handle the heavy lifting.',
    type: 'website',
    url: 'https://aeyegentic.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
