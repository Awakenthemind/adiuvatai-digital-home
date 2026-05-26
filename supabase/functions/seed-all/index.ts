// supabase/functions/seed-all/index.ts
// Deploy via: supabase functions deploy seed-all
// Or paste this code into the Supabase Dashboard → Edge Functions → New Function
//
// Sets: POST with JSON body { action: "seed-wiki" | "seed-content" | "seed-all" }

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SeedPayload {
  action: "seed-wiki" | "seed-content" | "seed-all";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const body: SeedPayload = await req.json();
    const action = body.action || "seed-all";

    const results: string[] = [];

    // ── Seed Wiki Pages ──────────────────────────────────────────────────────
    if (action === "seed-wiki" || action === "seed-all") {
      const wikiPages = [
        {
          slug: "index",
          title: "Adiuvatai Brand Wiki",
          category: "index",
          markdown_content: "Adiuvatai helps businesses move from AI confusion to AI results.\n\nWe do not sell artificial intelligence as theatre. We build working systems. We bring clarity, strategy, and implementation discipline. The client stays in the room. The work amplifies people. It does not replace them.",
          summary: "Adiuvatai helps businesses move from AI confusion to AI results.",
          word_count: 42,
          source_ref: "manual-seed",
        },
        {
          slug: "voice/tone-guide",
          title: "Voice And Tone",
          category: "voice",
          markdown_content: "## Voice Pillars\n\n**Precise.** No wasted motion. Every word earns its place. We say what we mean and mean what we say.\n\n**Calm Authority.** Already three steps ahead. No hype, no urgency theatre. The room quiets when we speak.\n\n**Credible.** We have built the systems we recommend. Every claim is backed by work already done.\n\n**Human-First.** Augmented means the client stays in the room. Our work amplifies people — it does not replace them.\n\n## Tone Do's\n\n- Measured and direct\n- Specific and earned\n- Confident without bravado\n- Human and grounded\n\n## Tone Never\n\n- Hype or buzzwords\n- Exclamation points\n- AI jargon to impress\n- Urgency theatre\n\n## Signature Line\n\nMost organizations do not have an AI problem. They have a clarity problem.",
          summary: "Precise. Calm Authority. Credible. Human-First.",
          word_count: 86,
          source_ref: "manual-seed",
        },
        {
          slug: "positioning/core-positioning",
          title: "Core Positioning",
          category: "positioning",
          markdown_content: "## Strategic Position\n\nWe are the calm operator behind practical AI transformation.\n\nNot hype. Not dashboards for show. Not jargon to impress.\n\nWorking systems. Clear strategy. Durable adoption.\n\n## Core Insight\n\nMost organizations do not have an AI problem.\n\nThey have a clarity problem.\n\n## What We Are\n\nStrategic. Embedded. Methodical. Practical. Human-first. Precise. Built for measurable outcomes.\n\n## What We Are Not\n\nAI hype. Automation theatre. Generic consulting. Tool-first advice. Urgency theatre. Demos without adoption.",
          summary: "The calm operator behind practical AI transformation.",
          word_count: 59,
          source_ref: "manual-seed",
        },
        {
          slug: "visual-identity",
          title: "Visual Identity",
          category: "visual",
          markdown_content: "## Primary Tagline\n\n**Augmented. Not Artificial.**\n\n## Brand Name\n\nAdiuvatai — derived from Latin adiuvare: to help, to aid, to support.\n\nPrimary meaning: augmented, not artificial.\nLegacy meaning: to assist, to serve at the side.\n\n## Color Palette\n\n- Obsidian #0a0a08 — Primary background\n- Brand Gold #c9a84c — Primary brand accent\n- Warm Bone #e8e4d8 — Primary text\n- Weathered Olive #9a9a82 — Secondary text\n- Dusk #3a3a6a — Rare secondary accent\n\n## Typography\n\n- Cormorant Garamond — Display / headings\n- Archivo Narrow — Body / UI",
          summary: "Augmented. Not Artificial. Obsidian, gold, bone.",
          word_count: 82,
          source_ref: "manual-seed",
        },
      ];

      for (const page of wikiPages) {
        const { data: existing } = await supabase
          .from("brand_wiki_pages")
          .select("id")
          .eq("slug", page.slug)
          .single();

        if (existing) {
          await supabase.from("brand_wiki_pages").update(page).eq("id", existing.id);
          results.push(`UPDATED brand_wiki_pages:${page.slug}`);
        } else {
          await supabase.from("brand_wiki_pages").insert(page);
          results.push(`INSERTED brand_wiki_pages:${page.slug}`);
        }
      }
    }

    // ── Seed Brand Facts ─────────────────────────────────────────────────────
    if (action === "seed-wiki" || action === "seed-all") {
      const facts = [
        { category: "identity", key: "public_name", value: "Adiuvatai / Adiuvat AI", source: "overview-screen" },
        { category: "identity", key: "domain", value: "adiuvatai.com", source: "overview-screen" },
        { category: "identity", key: "founded", value: "2026", source: "overview-screen" },
        { category: "identity", key: "location", value: "Round Rock, Texas", source: "overview-screen" },
        { category: "identity", key: "category", value: "AI consulting", source: "overview-screen" },
        { category: "identity", key: "brand_archetype", value: "The Expert", source: "overview-screen" },
        { category: "identity", key: "archetype_traits", value: "Precision, authority, results", source: "overview-screen" },
        { category: "positioning", key: "derivation", value: "adiuvare (Latin): to help, to aid, to support", source: "brand-board-v2" },
        { category: "positioning", key: "primary_meaning", value: "augmented, not artificial", source: "brand-board-v2" },
        { category: "positioning", key: "tagline_primary", value: "Augmented. Not Artificial.", source: "brand-board-v2" },
        { category: "positioning", key: "tagline_alt_1", value: "Clarity. Strategy. AI.", source: "brand-board-v2" },
        { category: "positioning", key: "core_insight", value: "Most organizations do not have an AI problem. They have a clarity problem.", source: "tone-guide" },
        { category: "positioning", key: "strategic_position", value: "We are the calm operator behind practical AI transformation.", source: "brand-board-v2" },
        { category: "positioning", key: "what_we_are", value: "Strategic, Embedded, Methodical, Practical, Human-first, Precise", source: "core-positioning" },
        { category: "positioning", key: "what_we_are_not", value: "AI hype, Automation theatre, Generic consulting, Tool-first advice", source: "core-positioning" },
        { category: "voice", key: "signature_line", value: "Most organizations do not have an AI problem. They have a clarity problem.", source: "tone-guide" },
      ];

      for (const fact of facts) {
        const { data: existing } = await supabase
          .from("brand_facts")
          .select("id")
          .eq("category", fact.category)
          .eq("key", fact.key)
          .single();

        if (existing) {
          await supabase.from("brand_facts").update(fact).eq("id", existing.id);
          results.push(`UPDATED brand_facts:${fact.category}/${fact.key}`);
        } else {
          await supabase.from("brand_facts").insert(fact);
          results.push(`INSERTED brand_facts:${fact.category}/${fact.key}`);
        }
      }
    }

    // ── Seed Offers ──────────────────────────────────────────────────────────
    if (action === "seed-content" || action === "seed-all") {
      const offers = [
        {
          slug: "ai-authority-builder",
          name: "AI Authority Builder",
          tagline: "Build a working personal brand system.",
          description: "Build a founder-led personal brand system for consultants, agency operators, and technical experts who need their public presence to create qualified business conversations.",
          price_display: "From $1,500",
          price_cents: 150000,
          billing_cycle: "fixed",
          who_its_for: "Consultants, agency operators, and technical practitioners who need market-visible authority.",
          target_segments: ["founder", "consultant", "operator"],
          position_in_ladder: 1,
          benefits: ["Brand Foundation (positioning, audience, narrative, voice)", "Content System (pillars, calendar, post drafts, carousel scripts)", "Conversion System (profile rewrite, featured strategy, DM templates)", "Operating System (capture, review checklist, measurement)"],
          cta_text: "Start with a clarity conversation",
          cta_url: "mailto:hello@adiuvatai.com",
          status: "active",
        },
        {
          slug: "ai-clarity-sprint",
          name: "AI Clarity Sprint",
          tagline: "Diagnose. Map. Define the first system.",
          description: "Diagnose the business, map use cases, separate signal from noise, and define the first useful AI system. 2-week engagement.",
          price_display: "$750",
          price_cents: 75000,
          billing_cycle: "one-time",
          who_its_for: "Businesses in the early AI adoption phase, unsure where to start.",
          target_segments: ["founder", "operator"],
          position_in_ladder: 0,
          benefits: ["Business diagnosis", "Use case map", "Priority definition", "Workflow design", "Adoption risk assessment"],
          cta_text: "Book a sprint",
          cta_url: "mailto:hello@adiuvatai.com",
          status: "active",
        },
      ];

      for (const offer of offers) {
        const { data: existing } = await supabase
          .from("offers")
          .select("id")
          .eq("slug", offer.slug)
          .single();

        if (existing) {
          await supabase.from("offers").update(offer).eq("id", existing.id);
          results.push(`UPDATED offers:${offer.slug}`);
        } else {
          await supabase.from("offers").insert(offer);
          results.push(`INSERTED offers:${offer.slug}`);
        }
      }
    }

    // ── Seed Content Objects ─────────────────────────────────────────────────
    if (action === "seed-content" || action === "seed-all") {
      const contentObjects = [
        {
          slug: "clarity-before-algorithms",
          title: "Clarity Before Algorithms",
          subtitle: "Why most AI projects fail before the model is chosen.",
          content_type: "article",
          body: "Most organizations do not have an AI problem. They have a clarity problem.\n\nThe question is rarely which AI tool should we use. The question is almost always what decision are we trying to make better, and what would have to be true for that decision to be made well?\n\n## The Procurement Trap\n\nOrganizations buy AI tools the way they used to buy enterprise software: evaluate, select, negotiate, deploy. The problem is that AI is not a static tool — it requires ongoing calibration, human oversight, and organizational adjustment that procurement cycles are not designed to accommodate.\n\n## The Question That Changes Everything\n\nBefore touching any tool, answer this: What does done look like?\n\nNot successful AI implementation. That's not a result. A result is specific. Ownable. Measurable.\n\n## Start With The Workflow, Not The Model\n\nThe AI tools that stick are the ones that fit into a workflow someone already owns.\n\n## The Signal Test\n\nBefore any AI deployment: Can a human do this task today? Do they want to? Does doing it well create measurable value? Does doing it poorly create measurable risk?\n\nAugmented. Not Artificial.",
          excerpt: "The question is rarely which AI tool should we use. The question is what decision are we trying to make better.",
          semantic_tags: ["ai-strategy", "clarity", "workflow", "adoption"],
          target_segments: ["founder", "operator", "consultant"],
          status: "published",
          author_name: "Adiuvatai",
          published_at: "2026-05-20T00:00:00Z",
        },
        {
          slug: "augmented-not-artificial",
          title: "Augmented. Not Artificial.",
          subtitle: "What we mean when we say it, and why it matters.",
          content_type: "article",
          body: "The word augmented means you stay in the room.\n\nNot artificial. Not synthetic. Not replaceable.\n\nAugmented means the work is still yours. The decisions are still yours. The outcomes are still yours. The AI makes you faster, sharper, more consistent — it does not make you optional.\n\n## Why This Language Matters\n\nAI sells itself on replacement. The implicit promise of most AI tools is: do more with less. Fewer people. Less time. Less expertise.\n\nThat promise is hollow for knowledge work.\n\n## What Augmented Actually Means\n\nIn practice, augmented means the expert who delegates everything to AI ends up unable to evaluate, challenge, or improve what AI produces.\n\nThe augmented expert stays in the loop. They are more capable because of AI, not because of it.\n\nAugmented. Not Artificial.",
          excerpt: "Augmented means the work is still yours. The decisions are still yours. The outcomes are still yours.",
          semantic_tags: ["positioning", "ai-philosophy", "human-first", "brand-voice"],
          target_segments: ["founder", "operator", "consultant"],
          status: "published",
          author_name: "Adiuvatai",
          published_at: "2026-05-21T00:00:00Z",
        },
      ];

      for (const co of contentObjects) {
        const { data: existing } = await supabase
          .from("content_objects")
          .select("id")
          .eq("slug", co.slug)
          .single();

        if (existing) {
          await supabase.from("content_objects").update(co).eq("id", existing.id);
          results.push(`UPDATED content_objects:${co.slug}`);
        } else {
          await supabase.from("content_objects").insert(co);
          results.push(`INSERTED content_objects:${co.slug}`);
        }
      }
    }

    return new Response(JSON.stringify({ ok: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});