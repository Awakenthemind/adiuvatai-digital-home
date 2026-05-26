import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Adiuvatai',
  description: 'Adiuvatai helps businesses move from AI confusion to AI results. Working systems. Clear strategy. Durable adoption.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 pt-32 pb-20 flex flex-col justify-center">
      <div className="max-w-[900px] mx-auto w-full">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#c9a84c] mb-6">
          About
        </p>

        <h1 className="text-4xl md:text-6xl xl:text-7xl font-semibold tracking-[-0.065em] text-[#e8e4d8] leading-[0.95] mb-6">
          We solve the AI clarity problem.
          <br />
          Not the AI tool problem.
        </h1>

        <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed mb-14">
          Most organizations do not have an AI problem. They have a clarity problem. The question is rarely which tool to use — it is what decision you are trying to make better, and what would have to be true for that decision to be made well.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-14">
          {[
            ['The Problem', 'AI tools are sold as solutions. Most organizations buy them, struggle with adoption, and conclude AI does not work. The tool was never the problem.'],
            ['The Approach', 'Adiuvatai works on the workflow layer first. We diagnose what is actually slowing the business down, then design AI systems that fit into how people already work.'],
            ['The Difference', 'We build working systems, not dashboards. Every engagement ends with something that runs, something the team can actually use, and something that creates measurable value.'],
            ['The Constraint', 'AI only works when the human stays in the loop. We design for augmentation, not automation. The expert is always in the room.'],
          ].map(([label, note]) => (
            <div
              key={label}
              className="rounded-[1.25rem] border border-[#ffffff08] bg-[#ffffff03] px-5 py-5"
            >
              <span className="inline-flex rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/8 px-3 py-1 text-[0.65rem] font-mono uppercase tracking-[0.12em] text-[#c9a84c] mb-4">
                {label}
              </span>
              <p className="text-sm text-neutral-400 leading-relaxed">{note}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-[#ffffff08] pt-8">
          <p className="text-sm text-neutral-400 leading-relaxed">
            Ready to move from confusion to clarity?{' '}
            <a
              href="mailto:hello@adiuvatai.com"
              className="text-[#c9a84c] hover:text-[#e8e4d8] transition-colors"
            >
              Start a conversation &rarr;
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
