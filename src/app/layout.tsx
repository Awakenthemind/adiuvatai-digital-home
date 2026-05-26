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
  title: 'Adiuvatai — Augmented. Not Artificial.',
  description:
    'Adiuvatai helps businesses move from AI confusion to AI results. Working systems. Clear strategy. Durable adoption.',
  keywords: ['AI consulting', 'AI strategy', 'business AI implementation', 'personal brand builder'],
  openGraph: {
    title: 'Adiuvatai — Augmented. Not Artificial.',
    description: 'AI that keeps you in the room. Clarity, strategy, and implementation discipline.',
    type: 'website',
    url: 'https://adiuvatai.com',
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
