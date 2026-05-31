import Link from 'next/link';
import Hero from '@/components/ui/Hero';

export default function HomePage() {
  return (
    <>
      <Hero />

      <main className="px-6 pt-24 pb-20">
        <div className="max-w-[1100px] mx-auto w-full">

          {/* Offers */}
          <div className="border-t border-[#ffffff10] pt-16 mb-16">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#ffffff40] mb-10">
              What we build
            </p>

            <div className="grid gap-6 sm:grid-cols-2 mb-12">
              {/* AI Operations Sprint */}
              <div className="rounded-[1.5rem] border border-[#ffffff10] bg-[#ffffff03] px-8 py-8">
                <span className="inline-flex rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/8 px-3 py-1 text-[0.65rem] font-mono uppercase tracking-[0.12em] text-[#c9a84c] mb-5">
                  Operations
                </span>
                <h3 className="text-[#e8e4d8] text-xl font-medium tracking-[-0.02em] mb-2">
                  AI Operations Systems
                </h3>
                <p className="text-[#9a9a82] text-sm leading-relaxed mb-4">
                  Automations for admin, scheduling, follow-up, intake, and repeatable client workflows.
                </p>
                <p className="text-[#ffffff50] text-sm">
                  For owners who need the business to stop eating the calendar.
                </p>
              </div>

              {/* Founder Brand Builder */}
              <div className="rounded-[1.5rem] border border-[#c9a84c]/40 bg-[#c9a84c]/5 px-8 py-8">
                <span className="inline-flex rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10 px-3 py-1 text-[0.65rem] font-mono uppercase tracking-[0.12em] text-[#c9a84c] mb-5">
                  Brand
                </span>
                <h3 className="text-[#e8e4d8] text-xl font-medium tracking-[-0.02em] mb-2">
                  Founder Brand Builder
                </h3>
                <p className="text-[#9a9a82] text-sm leading-relaxed mb-4">
                  A client-attracting content system that turns raw insight into posts, emails, and follow-up assets.
                </p>
                <p className="text-[#ffffff50] text-sm mb-4">
                  For coaches, consultants, and SMB owners who need visibility without losing 10 hours a week to content.
                </p>
                <a
                  href="mailto:hello@aeyegentic.com"
                  className="inline-flex items-center gap-1.5 text-[#c9a84c] text-sm hover:text-[#e8e4d8] transition-colors"
                >
                  Fix my operations
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Articles */}
          <div className="border-t border-[#ffffff10] pt-16 mb-16">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#ffffff40] mb-10">
              Recent thinking
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <Link
                href="/blog"
                className="group block rounded-[1.5rem] border border-[#ffffff10] bg-[#ffffff03] px-8 py-8 hover:border-[#c9a84c]/30 transition-colors"
              >
                <p className="text-[#c9a84c] text-xs font-mono mb-3">Article</p>
                <h3 className="text-[#e8e4d8] text-lg font-medium tracking-[-0.02em] mb-2 group-hover:text-[#c9a84c] transition-colors">
                  Work On The Business
                </h3>
                <p className="text-[#9a9a82] text-sm leading-relaxed">
                  Why the right systems give owners their calendar back.
                </p>
              </Link>

              <Link
                href="/blog"
                className="group block rounded-[1.5rem] border border-[#ffffff10] bg-[#ffffff03] px-8 py-8 hover:border-[#c9a84c]/30 transition-colors"
              >
                <p className="text-[#c9a84c] text-xs font-mono mb-3">Article</p>
                <h3 className="text-[#e8e4d8] text-lg font-medium tracking-[-0.02em] mb-2 group-hover:text-[#c9a84c] transition-colors">
                  The Invisible Engine
                </h3>
                <p className="text-[#9a9a82] text-sm leading-relaxed">
                  AI should run the repeatable work, not replace the owner’s judgment.
                </p>
              </Link>
            </div>
          </div>

          {/* Final CTA */}
          <div className="border-t border-[#ffffff10] pt-16">
            <p className="text-[#ffffff40] text-sm mb-6">
              Ready to stop living inside the daily grind?
            </p>
            <a
              href="mailto:hello@aeyegentic.com"
              className="inline-flex items-center gap-2 rounded-full border border-[#c9a84c] bg-[#c9a84c]/10 px-8 py-4 text-[#c9a84c] text-sm font-medium hover:bg-[#c9a84c]/20 transition-colors"
            >
              Fix my operations
              <ArrowRightIcon />
            </a>
          </div>

        </div>
      </main>
    </>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
