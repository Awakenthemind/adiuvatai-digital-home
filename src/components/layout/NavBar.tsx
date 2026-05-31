'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a08]/85 border-b border-[#ffffff10]' : ''
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="px-3 py-1 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/8 text-[0.62rem] font-medium tracking-[0.02em] text-[#c9a84c]">
            AI Operations
          </span>
          <span className="font-semibold text-lg tracking-tight text-[#e8e4d8]">
            AeyeGentic
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[0.95rem] font-medium transition-colors ${
                (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                  ? 'text-[#e8e4d8]'
                  : 'text-[#ffffff55] hover:text-[#e8e4d8]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full text-[0.95rem] font-medium border border-[#c9a84c] text-[#c9a84c] px-6 py-2.5 hover:bg-[#c9a84c]/10 transition-all"
          >
            Fix my operations
          </Link>
        </div>
      </div>
    </nav>
  );
}
