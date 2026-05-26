"""
Seed Adiuvatai content: offers and sample content objects.
Run after seed_brand_wiki.py — depends on brand_offers table data.

Usage:
  python seed_content.py
"""

import os, json
from supabase import create_client

SUPABASE_URL = "https://uilbnbgvgmepmhkdjdwo.supabase.co"
env_path = "/workspace/adiuvatai-digital-home/.env"
service_key = None
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            if line.startswith("SUPABASE_SERVICE_ROLE_KEY="):
                service_key = line.split("=", 1)[1].strip()
if not service_key:
    service_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not service_key:
    print("ERROR: No SUPABASE_SERVICE_ROLE_KEY found.")
    exit(1)

supabase = create_client(SUPABASE_URL, service_key)

# ── SEO meta entries ──
seo_meta_entries = [
    {
        "title": "AI Consulting — Clarity Before Algorithms",
        "description": "Adiuvatai helps businesses move from AI confusion to AI results. We bring strategy, working systems, and implementation discipline.",
        "canonical_url": "https://adiuvatai.com",
        "og_image_url": "",
        "schema_type": "Organization",
        "target_keyword": "AI consulting",
        "secondary_keywords": ["AI strategy", "business AI implementation", "AI adoption"],
        "keyword_cluster": "ai-consulting",
    },
    {
        "title": "AI Authority Builder — Turn Expertise Into Market Proof",
        "description": "Build a personal brand system for consultants, agency operators, and technical experts who need qualified business conversations.",
        "canonical_url": "https://adiuvatai.com/offers/ai-authority-builder",
        "schema_type": "Service",
        "target_keyword": "personal brand builder consulting",
        "secondary_keywords": ["LinkedIn authority", "thought leadership", "consulting personal brand"],
        "keyword_cluster": "personal-brand",
    },
]

# ── Offers ──
offers = [
    {
        "slug": "ai-clarity-sprint",
        "name": "AI Authority Builder",
        "tagline": "Build a working personal brand system.",
        "description": "## AI Authority Builder\n\nBuild a founder-led personal brand system for consultants, agency operators, and technical experts who need their public presence to create qualified business conversations.\n\n### What's Included\n\n**Brand Foundation** — positioning, audience definition, founder narrative, voice rules.\n\n\n**Content System** — 3-5 content pillars, 30-day editorial calendar, 12 post drafts, 4 carousel scripts.\n\n\n**Conversion System** — LinkedIn profile rewrite, featured section strategy, DM templates.\n\n\n**Operating System** — weekly capture process, review checklist, measurement dashboard.\n\n\n### Best For\n- AI consultants making the move into consulting\n- Ad agency founders building personal brand\n- Fractional CMOs and B2B service operators\n- Technical founders with commercial expertise",
        "price_display": "From $1,500",
        "price_cents": 150000,
        "billing_cycle": "fixed",
        "who_its_for": "Consultants, agency operators, and technical practitioners who need market-visible authority.",
        "target_segments": ["founder", "consultant", "operator"],
        "position_in_ladder": 1,
        "benefits": json.dumps([
            "Brand Foundation (positioning, audience, narrative, voice)",
            "Content System (pillars, calendar, post drafts, carousel scripts)",
            "Conversion System (profile rewrite, featured strategy, DM templates)",
            "Operating System (capture, review checklist, measurement)"
        ]),
        "cta_text": "Start with a clarity conversation",
        "cta_url": "mailto:hello@adiuvatai.com",
        "status": "active",
    },
    {
        "slug": "ai-clarity-sprint-standalone",
        "name": "AI Clarity Sprint",
        "tagline": "Diagnose. Map. Define the first system.",
        "description": "## AI Clarity Sprint\n\nDiagnose the business, map use cases, separate signal from noise, and define the first useful AI system.\n\n**2-week engagement.**\n\n### What You Get\n- Business diagnosis session\n- AI use case mapping\n- Priority system definition\n- First workflow design\n- Adoption risk assessment",
        "price_display": "$750",
        "price_cents": 75000,
        "billing_cycle": "one-time",
        "who_its_for": "Businesses in the early AI adoption phase, unsure where to start or how to evaluate options.",
        "target_segments": ["founder", "operator"],
        "position_in_ladder": 0,
        "benefits": json.dumps(["Business diagnosis", "Use case map", "Priority definition", "Workflow design", "Adoption risk assessment"]),
        "cta_text": "Book a sprint",
        "cta_url": "mailto:hello@adiuvatai.com",
        "status": "active",
    },
    {
        "slug": "adoption-partner",
        "name": "Adoption Partner",
        "tagline": "Stay embedded while the team learns.",
        "description": "## Adoption Partner\n\nStay embedded while the team learns, adjusts, and turns the AI system into normal work.\n\n**Monthly engagement.**",
        "price_display": "Price on application",
        "price_cents": None,
        "billing_cycle": "monthly",
        "who_its_for": "Teams that have built an AI system and need support through the adoption phase.",
        "target_segments": ["operator", "team"],
        "position_in_ladder": 2,
        "benefits": json.dumps(["Monthly embedded check-ins", "Workflow adjustment", "Team coaching", "Adoption measurement"]),
        "cta_text": "Talk about adoption",
        "cta_url": "mailto:hello@adiuvatai.com",
        "status": "paused",
    },
]

# ── Content objects ──
content_objects = [
    {
        "slug": "clarity-before-algorithms",
        "title": "Clarity Before Algorithms",
        "subtitle": "Why most AI projects fail before the model is chosen.",
        "content_type": "article",
        "body": """## Most organizations do not have an AI problem. They have a clarity problem.

The question is rarely "which AI tool should we use?" The question is almost always "what decision are we trying to make better, and what would have to be true for that decision to be made well?"

### The Procurement Trap

Organizations buy AI tools the way they used to buy enterprise software: evaluate, select, negotiate, deploy. The problem is that AI is not a static tool — it requires ongoing calibration, human oversight, and organizational adjustment that、采购 cycles are not designed to accommodate.

The result: expensive AI infrastructure sitting next to workflows that never changed to accommodate it.

### The Question That Changes Everything

Before touching any tool, answer this:

**What does done look like?**

Not "successful AI implementation." That's not a result. That's a project name.

A result is:
- A analyst who previously spent 4 hours on weekly reporting now spends 20 minutes
- A sales team that consistently documents customer conversations in a system that actually gets reviewed
- A content workflow that produces a first draft in 3 minutes instead of 3 hours

Specific. Ownable. Measurable.

### Start With The Workflow, Not The Model

The AI tools that stick are the ones that fit into a workflow someone already owns. The AI tools that become shelfware are the ones that required someone to build a new workflow around them.

Map the current workflow first. Find where friction actually lives. Then evaluate whether AI reduces that friction — and at what cost to organizational knowledge, decision visibility, and human capability.

### The Signal Test

Before any AI deployment, apply the signal test:

1. Can a human do this task today?
2. Do they want to do this task?
3. Does doing it well create measurable value?
4. Does doing it poorly create measurable risk?

If the answers are yes/yes/yes/yes, AI will help. If the answers are no/yes/yes/yes, you're automating boredom, not expertise. If the answers are no/no/yes/no... you have a workflow design problem, not an AI problem.

### What We Do

Adiuvatai works with organizations that have already tried the tool-first approach and found it wanting. We start with the decision architecture — what needs to be true — then work backward to the tools, workflows, and adoption paths that make it real.

Working systems. Clear strategy. Durable adoption.

Augmented. Not Artificial.""",
        "excerpt": "The question is rarely which AI tool should we use. The question is what decision are we trying to make better.",
        "semantic_tags": ["ai-strategy", "clarity", "workflow", "adoption"],
        "target_segments": ["founder", "operator", "consultant"],
        "status": "published",
        "author_name": "Adiuvatai",
        "published_at": "2026-05-20T00:00:00Z",
        "seo_meta_id": None,  # will be linked after seo_meta insert
    },
    {
        "slug": "agencies-personal-brand-builder",
        "title": "The AI-Powered Personal Brand Builder for Agencies",
        "subtitle": "Turn your agency's expertise into a defensible market position.",
        "content_type": "landing_page",
        "body": """## The Market Moved. Your Personal Brand Should Too.

Agency founders who built their reputation on craft are competing in a market that now demands category authority, public thinking, and consistent content output they're not equipped to produce.

### What This Is

A structured system for converting consulting judgment into market-visible personal brand. Not content theatre. Not Performance content. Qualified trust.

### The Gap We're Bridging

Most agency founders have the expertise. They're making the right calls for clients day in and day out. But:

- They don't have time to produce content at the pace the algorithm rewards
- They haven't systematized how their thinking translates into public-format material
- They're aware that performance content damages credibility with the buyers they actually want

### What The System Delivers

**Brand Foundation** — positioning, audience definition, founder narrative, voice rules.

**Content System** — 3-5 pillars, 30-day calendar, 12 post drafts, 4 carousel scripts. Real material, not fill-in-the-blank templates.

**Conversion System** — LinkedIn profile rewrite, featured section strategy, DM templates that open qualified conversations.

**Operating System** — weekly capture process, review checklist, measurement you can act on.

### Who This Is For

- AI consultants moving into consulting
- Ad agency founders building personal authority
- Fractional CMOs who need a personal brand to support their practice
- Technical founders with commercial expertise who are too close to the work

### Who This Is Not For

Founders who want virality over credibility. Practitioners who want shortcuts over systems. Operators who want to hear what's worked for others rather than develop their own framework.

### Next Step

Start with a clarity conversation. 30 minutes. No deck. We'll map your current position, identify where the gap is, and determine whether we're a fit.""",
        "excerpt": "A structured system for converting consulting judgment into market-visible personal brand.",
        "semantic_tags": ["personal-brand", "agency", "content-strategy", "authority"],
        "target_segments": ["founder", "consultant"],
        "status": "published",
        "author_name": "Adiuvatai",
        "published_at": "2026-05-21T00:00:00Z",
        "seo_meta_id": None,
    },
    {
        "slug": "augmented-not-artificial",
        "title": "Augmented. Not Artificial.",
        "subtitle": "What we mean when we say it, and why it matters.",
        "content_type": "article",
        "body": """## The word augmented means you stay in the room.

Not artificial. Not synthetic. Not replaceable.

Augmented means the work is still yours. The decisions are still yours. The outcomes are still yours. The AI makes you faster, sharper, more consistent — it does not make you optional.

### Why This Language Matters

AI sells itself on replacement. The implicit promise of most AI tools is: do more with less. Fewer people. Less time. Less expertise.

That promise is hollow for knowledge work. The expert who delegates everything to AI ends up unable to evaluate, challenge, or improve what AI produces. They become a bottleneck instead of a capability.

### What Augmented Actually Means

In practice, augmented means:

- The accountant who previously spent 3 hours reconciling now spends 20 minutes, but still reviews every anomaly the AI flags
- The strategist who uses AI to test frameworks still challenges the AI's assumptions before presenting to a client
- The content writer who uses AI for drafts still controls the POV, the evidence, and the final word on what goes out under their name

The augmented expert stays in the loop. They are more capable because of AI, not because of it.

### What We Are Not

We are not building AI systems that replace human judgment. We are building AI systems that raise the floor for human judgment — making good practitioners faster, more consistent, and more capable without eroding the expertise that makes them valuable.

### The Operational Test

Apply this to any AI tool or workflow:

- Can you explain what the AI is doing?
- Can you override it when it's wrong?
- Would a human with full knowledge of the task still make this decision better?

If the answer to the last question is yes, the AI is a tool. If the answer is no, the AI has replaced the expertise — and the organization has lost something it may not know it lost until the AI is wrong and no one can tell why.

Augmented. Not artificial. The distinguishing word says what we build and what we refuse to build.""",
        "excerpt": "Augmented means the work is still yours. The decisions are still yours. The outcomes are still yours.",
        "semantic_tags": ["positioning", "ai-philosophy", "human-first", "brand-voice"],
        "target_segments": ["founder", "operator", "consultant"],
        "status": "published",
        "author_name": "Adiuvatai",
        "published_at": "2026-05-21T00:00:00Z",
        "seo_meta_id": None,
    },
]

def seed():
    # Seed seo_meta first (needed for foreign key in content_objects)
    print("\n=== SEO Meta ===")
    seo_ids = {}
    for entry in seo_meta_entries:
        r = supabase.table("seo_meta").insert(entry).execute()
        if r.data:
            seo_ids[r.data[0]["id"]] = entry["target_keyword"]
            print(f"  INSERTED seo_meta: {entry['title'][:50]}")

    # Seed offers
    print("\n=== Offers ===")
    # Link to brand_offers entries already seeded in seed_brand_wiki.py
    existing_offers = supabase.table("brand_offers").select("name,id").execute()
    print(f"  brand_offers already has {len(existing_offers.data)} rows (inserted by seed_brand_wiki.py)")

    # Also seed to public-facing 'offers' table
    for offer in offers:
        existing = supabase.table("offers").select("id").eq("slug", offer["slug"]).execute()
        if existing.data:
            supabase.table("offers").update(offer).eq("id", existing.data[0]["id"]).execute()
            print(f"  UPDATED offer: {offer['name']}")
        else:
            r = supabase.table("offers").insert(offer).execute()
            if r.data:
                print(f"  INSERTED offer: {offer['name']} (id: {r.data[0]['id']})")

    # Add brand_offers entries as content_objects
    print("\n=== Content Objects ===")
    for co in content_objects:
        existing = supabase.table("content_objects").select("id").eq("slug", co["slug"]).execute()
        if existing.data:
            supabase.table("content_objects").update(co).eq("id", existing.data[0]["id"]).execute()
            print(f"  UPDATED: {co['slug']}")
        else:
            r = supabase.table("content_objects").insert(co).execute()
            if r.data:
                print(f"  INSERTED: {co['slug']} (id: {r.data[0]['id']})")

    print("\n✅ Seed complete!")

if __name__ == "__main__":
    seed()
