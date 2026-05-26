import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Adiuvatai',
  description: 'Start a conversation with Adiuvatai. Clarity conversations for businesses moving from AI confusion to AI results.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 pt-32 pb-20 flex flex-col justify-center">
      <div className="max-w-[900px] mx-auto w-full">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#c9a84c] mb-6">
          Contact
        </p>

        <h1 className="text-4xl md:text-6xl xl:text-7xl font-semibold tracking-[-0.065em] text-[#e8e4d8] leading-[0.95] mb-6">
          Start a
          <br />
          conversation.
        </h1>

        <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed mb-14">
          Most organizations do not have an AI problem. They have a clarity problem. If that resonates, reach out. We respond to every serious inquiry.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-14">
          {[
            ['Email', 'hello@adiuvatai.com', 'mailto:hello@adiuvatai.com', 'The best first step. We respond to every serious inquiry within 48 hours.'],
            ['AI Clarity Sprint', '$750 one-time', 'mailto:hello@adiuvatai.com?subject=AI%20Clarity%20Sprint', 'Diagnose. Map. Define the first system. Two weeks. Results you can actually use.'],
          ].map(([label, detail, href, note]) => (
            <div
              key={label as string}
              className="rounded-[1.25rem] border border-[#ffffff08] bg-[#ffffff03] px-5 py-5"
            >
              <span className="inline-flex rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/8 px-3 py-1 text-[0.65rem] font-mono uppercase tracking-[0.12em] text-[#c9a84c] mb-4">
                {label as string}
              </span>
              <a
                href={href as string}
                className="block text-sm text-[#e8e4d8] mb-2 hover:text-[#c9a84c] transition-colors"
              >
                {detail as string} →
              </a>
              <p className="text-sm text-neutral-400 leading-relaxed">{note as string}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-[#ffffff08] pt-8">
          <p className="text-sm text-neutral-400 leading-relaxed">
            Not sure where to start?{' '}
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
