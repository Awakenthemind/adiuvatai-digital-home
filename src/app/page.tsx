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
              What we offer
            </p>

            <div className="grid gap-6 sm:grid-cols-2 mb-12">
              {/* AI Clarity Sprint */}
              <div className="rounded-[1.5rem] border border-[#ffffff10] bg-[#ffffff03] px-8 py-8">
                <span className="inline-flex rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/8 px-3 py-1 text-[0.65rem] font-mono uppercase tracking-[0.12em] text-[#c9a84c] mb-5">
                  Entry
                </span>
                <h3 className="text-[#e8e4d8] text-xl font-medium tracking-[-0.02em] mb-2">
                  AI Clarity Sprint
                </h3>
                <p className="text-[#9a9a82] text-sm leading-relaxed mb-4">
                  Diagnose. Map. Define the first system.<br />2-week engagement — $750
                </p>
                <p className="text-[#ffffff50] text-sm">
                  For businesses in the early AI adoption phase, unsure where to start.
                </p>
              </div>

              {/* AI Authority Builder */}
              <div className="rounded-[1.5rem] border border-[#c9a84c]/40 bg-[#c9a84c]/5 px-8 py-8">
                <span className="inline-flex rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10 px-3 py-1 text-[0.65rem] font-mono uppercase tracking-[0.12em] text-[#c9a84c] mb-5">
                  Featured
                </span>
                <h3 className="text-[#e8e4d8] text-xl font-medium tracking-[-0.02em] mb-2">
                  AI Authority Builder
                </h3>
                <p className="text-[#9a9a82] text-sm leading-relaxed mb-4">
                  Build a working personal brand system.<br />From $1,500 — fixed engagement
                </p>
                <p className="text-[#ffffff50] text-sm mb-4">
                  For consultants, agency operators, and technical experts who need market-visible authority.
                </p>
                <a
                  href="mailto:hello@adiuvatai.com"
                  className="inline-flex items-center gap-1.5 text-[#c9a84c] text-sm hover:text-[#e8e4d8] transition-colors"
                >
                  Start with a clarity conversation
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
                  Clarity Before Algorithms
                </h3>
                <p className="text-[#9a9a82] text-sm leading-relaxed">
                  Why most AI projects fail before the model is chosen.
                </p>
              </Link>

              <Link
                href="/blog"
                className="group block rounded-[1.5rem] border border-[#ffffff10] bg-[#ffffff03] px-8 py-8 hover:border-[#c9a84c]/30 transition-colors"
              >
                <p className="text-[#c9a84c] text-xs font-mono mb-3">Article</p>
                <h3 className="text-[#e8e4d8] text-lg font-medium tracking-[-0.02em] mb-2 group-hover:text-[#c9a84c] transition-colors">
                  Augmented. Not Artificial.
                </h3>
                <p className="text-[#9a9a82] text-sm leading-relaxed">
                  What we mean when we say it, and why it matters.
                </p>
              </Link>
            </div>
          </div>

          {/* Final CTA */}
          <div className="border-t border-[#ffffff10] pt-16">
            <p className="text-[#ffffff40] text-sm mb-6">
              Ready to move from confusion to clarity?
            </p>
            <a
              href="mailto:hello@adiuvatai.com"
              className="inline-flex items-center gap-2 rounded-full border border-[#c9a84c] bg-[#c9a84c]/10 px-8 py-4 text-[#c9a84c] text-sm font-medium hover:bg-[#c9a84c]/20 transition-colors"
            >
              Start the conversation
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
