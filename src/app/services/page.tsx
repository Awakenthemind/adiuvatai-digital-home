import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Adiuvatai',
  description: 'Working systems. Clear strategy. Durable adoption. Two engagements to move your business from AI confusion to AI results.',
};

const OFFERS = [
  {
    slug: 'ai-clarity-sprint',
    badge: 'Entry point',
    name: 'AI Clarity Sprint',
    tagline: 'Diagnose. Map. Define the first system.',
    description:
      'A focused 2-week engagement to diagnose your business, map real AI use cases, and define the first working system. For businesses in the early adoption phase.',
    price: '$750',
    priceNote: 'one-time',
    whoItIsFor: 'Founders and operators who are serious about AI but do not know where to start.',
    outcomes: ['Business diagnosis', 'Use case map', 'Priority definition', 'Workflow design'],
    cta: 'Book a sprint',
    ctaUrl: 'mailto:hello@adiuvatai.com',
  },
  {
    slug: 'ai-authority-builder',
    badge: 'Flagship',
    name: 'AI Authority Builder',
    tagline: 'Build a working personal brand system.',
    description:
      'A complete personal brand system for consultants, agency operators, and technical experts who need to be visible, credible, and findable online. From strategy to working infrastructure.',
    price: 'From $1,500',
    priceNote: 'fixed engagement',
    whoItIsFor: 'Consultants and agency operators who want a brand that generates qualified leads.',
    outcomes: ['Brand Foundation', 'Content System', 'Conversion System', 'Operating System'],
    cta: 'Start with a clarity conversation',
    ctaUrl: 'mailto:hello@adiuvatai.com',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen px-6 pt-32 pb-20 flex flex-col justify-center">
      <div className="max-w-[1100px] mx-auto w-full">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#c9a84c] mb-6">
          Services
        </p>

        <h1 className="text-4xl md:text-6xl xl:text-7xl font-semibold tracking-[-0.065em] text-[#e8e4d8] leading-[0.95] mb-6">
          Two ways to work
          <br />
          with us.
        </h1>

        <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed mb-14">
          Augmented. Not Artificial. We build working systems, not dashboards. Every engagement ends with something that runs and creates measurable value.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 mb-14">
          {OFFERS.map((offer) => (
            <div
              key={offer.slug}
              className="rounded-[1.5rem] border border-[#ffffff08] bg-[#ffffff03] px-8 py-8 flex flex-col"
            >
              <span className="inline-flex w-fit rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/8 px-4 py-1 text-[0.65rem] font-mono uppercase tracking-[0.12em] text-[#c9a84c] mb-6">
                {offer.badge}
              </span>

              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#e8e4d8] mb-2">
                {offer.name}
              </h2>
              <p className="text-sm text-[#c9a84c] mb-6">{offer.tagline}</p>

              <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-1">
                {offer.description}
              </p>

              <div className="mb-6">
                <span className="text-3xl font-semibold tracking-tight text-[#e8e4d8]">
                  {offer.price}
                </span>
                <span className="text-sm text-neutral-500 ml-2">{offer.priceNote}</span>
              </div>

              <div className="mb-6">
                <p className="text-xs font-mono uppercase tracking-[0.12em] text-neutral-500 mb-3">
                  Who it is for
                </p>
                <p className="text-sm text-neutral-400">{offer.whoItIsFor}</p>
              </div>

              <div className="mb-8">
                <p className="text-xs font-mono uppercase tracking-[0.12em] text-neutral-500 mb-3">
                  Outcomes
                </p>
                <div className="flex flex-wrap gap-2">
                  {offer.outcomes.map((outcome) => (
                    <span
                      key={outcome}
                      className="rounded-full border border-[#ffffff08] bg-[#ffffff03] px-3 py-1 text-xs text-neutral-400"
                    >
                      {outcome}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={offer.ctaUrl}
                className="rounded-full border border-[#c9a84c] text-[#c9a84c] text-center px-6 py-3 text-sm font-medium hover:bg-[#c9a84c]/10 transition-all"
              >
                {offer.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="border-t border-[#ffffff08] pt-8">
          <p className="text-sm text-neutral-400 leading-relaxed">
            Not sure which engagement is right?{' '}
            <a
              href="mailto:hello@adiuvatai.com"
              className="text-[#c9a84c] hover:text-[#e8e4d8] transition-colors"
            >
              Tell us about your situation &rarr;
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
