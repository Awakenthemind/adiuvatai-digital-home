"""
Seed the brand wiki into Supabase.
Reads all markdown files from /workspace/adiuvatai/wiki/ and inserts them into the brand_wiki tables.

Usage:
  python seed_brand_wiki.py
  
Uses Supabase service_role key from .env file or SUPABASE_SERVICE_ROLE_KEY env var.
"""

import re
import os
from pathlib import Path
from supabase import create_client, Client

# ── Config ──
SUPABASE_URL = "https://uilbnbgvgmepmhkdjdwo.supabase.co"
# Read service key from .env or env var
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
    print("ERROR: No SUPABASE_SERVICE_ROLE_KEY found. Set it in .env or as env var.")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, service_key)

WIKI_ROOT = Path("/workspace/adiuvatai/wiki")

# ── Helper: count annotations ──
def count_annotations(text, marker):
    return len(re.findall(rf"\[{marker}\]", text, re.IGNORECASE))

# ── Parse markdown into structured sections ──
def parse_sections(text):
    """Get h2 sections as list of (heading, body) tuples."""
    sections = []
    current_heading = None
    current_body = []
    for line in text.split("\n"):
        if line.startswith("## "):
            if current_heading:
                sections.append((current_heading.strip(), "\n".join(current_body).strip()))
            current_heading = line.replace("## ", "")
            current_body = []
        elif current_heading:
            current_body.append(line)
    if current_heading:
        sections.append((current_heading.strip(), "\n".join(current_body).strip()))
    return sections

def first_paragraph(text):
    """Extract first paragraph (non-empty, non-heading)."""
    for line in text.split("\n"):
        line = line.strip()
        if line and not line.startswith("#"):
            return line
    return ""

# ── Seed wiki pages ──
def seed_wiki_pages():
    pages_data = [
        {
            "slug": "index",
            "title": "Adiuvatai Brand Wiki",
            "category": "index",
            "source_ref": "wiki/index.md",
            "markdown_content": open("/workspace/adiuvatai/wiki/index.md").read(),
        },
        {
            "slug": "voice/tone-guide",
            "title": "Voice And Tone",
            "category": "voice",
            "source_ref": "wiki/voice/tone-guide.md",
            "markdown_content": open("/workspace/adiuvatai/wiki/voice/tone-guide.md").read(),
        },
        {
            "slug": "positioning/core-positioning",
            "title": "Core Positioning",
            "category": "positioning",
            "source_ref": "wiki/positioning/core-positioning.md",
            "markdown_content": open("/workspace/adiuvatai/wiki/positioning/core-positioning.md").read(),
        },
        {
            "slug": "visual-identity",
            "title": "Visual Identity",
            "category": "visual",
            "source_ref": "wiki/visual-identity.md",
            "markdown_content": open("/workspace/adiuvatai/wiki/visual-identity.md").read(),
        },
        {
            "slug": "visual-art-bible",
            "title": "Adiuvat AI Website Art Bible",
            "category": "visual",
            "source_ref": "wiki/visual-art-bible.md",
            "markdown_content": open("/workspace/adiuvatai/wiki/visual-art-bible.md").read(),
        },
        {
            "slug": "content/content-pillars",
            "title": "Content Pillars",
            "category": "content",
            "source_ref": "wiki/content/content-pillars.md",
            "markdown_content": open("/workspace/adiuvatai/wiki/content/content-pillars.md").read(),
        },
        {
            "slug": "content/linkedin-authority-playbook",
            "title": "LinkedIn Authority Playbook",
            "category": "content",
            "source_ref": "wiki/content/linkedin-authority-playbook.md",
            "markdown_content": open("/workspace/adiuvatai/wiki/content/linkedin-authority-playbook.md").read(),
        },
        {
            "slug": "icp/ideal-customer-profile",
            "title": "Ideal Customer Profile",
            "category": "icp",
            "source_ref": "wiki/icp/ideal-customer-profile.md",
            "markdown_content": open("/workspace/adiuvatai/wiki/icp/ideal-customer-profile.md").read(),
        },
        {
            "slug": "offers/offer-architecture",
            "title": "Offer Architecture",
            "category": "offers",
            "source_ref": "wiki/offers/offer-architecture.md",
            "markdown_content": open("/workspace/adiuvatai/wiki/offers/offer-architecture.md").read(),
        },
        {
            "slug": "offers/personal-brand-builder-offer",
            "title": "Personal Brand Builder Offer",
            "category": "offers",
            "source_ref": "wiki/offers/personal-brand-builder-offer.md",
            "markdown_content": open("/workspace/adiuvatai/wiki/offers/personal-brand-builder-offer.md").read(),
        },
        {
            "slug": "competitive/competitive-edge",
            "title": "Competitive Edge",
            "category": "competitive",
            "source_ref": "wiki/competitive/competitive-edge.md",
            "markdown_content": open("/workspace/adiuvatai/wiki/competitive/competitive-edge.md").read(),
        },
        {
            "slug": "frameworks/ai-ad-agency-personal-brand-builder",
            "title": "AI Ad Agency Consulting Personal Brand Builder",
            "category": "frameworks",
            "source_ref": "wiki/frameworks/ai-ad-agency-personal-brand-builder.md",
            "markdown_content": open("/workspace/adiuvatai/wiki/frameworks/ai-ad-agency-personal-brand-builder.md").read(),
        },
        {
            "slug": "frameworks/agent-roster",
            "title": "Adiuvatai Agent Roster",
            "category": "frameworks",
            "source_ref": "wiki/frameworks/agent-roster.md",
            "markdown_content": open("/workspace/adiuvatai/wiki/frameworks/agent-roster.md").read(),
        },
    ]

    for page in pages_data:
        text = page["markdown_content"]
        page["summary"] = first_paragraph(text)
        page["word_count"] = len(text.split())
        page["contradictions"] = count_annotations(text, "CONTRADICTION")
        page["strengthened"] = count_annotations(text, "STRENGTHENED")
        
        # Upsert by slug
        existing = supabase.table("brand_wiki_pages").select("id").eq("slug", page["slug"]).execute()
        if existing.data and len(existing.data) > 0:
            page_id = existing.data[0]["id"]
            supabase.table("brand_wiki_pages").update(page).eq("id", page_id).execute()
            print(f"  UPDATED  {page['slug']}")
        else:
            supabase.table("brand_wiki_pages").insert(page).execute()
            print(f"  INSERTED {page['slug']}")

# ── Seed brand facts ──
def seed_brand_facts():
    facts = [
        # Identity
        ("identity", "public_name", "Adiuvatai / Adiuvat AI", "overview-screen", "Treat Adiuvatai as brand system name, Adiuvat AI as public offer name", None),
        ("identity", "domain", "adiuvatai.com", "overview-screen", None, None),
        ("identity", "founded", "2026", "overview-screen", None, None),
        ("identity", "location", "Round Rock, Texas", "overview-screen", None, None),
        ("identity", "category", "AI consulting", "overview-screen", "The overview screen says 'AI consulting and solutions agency.' The word 'solutions' conflicts with voice rules.", None),
        ("identity", "brand_archetype", "The Expert", "overview-screen", None, None),
        ("identity", "archetype_traits", "Precision, authority, results", "overview-screen", None, None),
        
        # Brand essence
        ("positioning", "derivation", "adiuvare (Latin): to help, to aid, to support", "brand-board-v2", None, "Both meanings point to embedded support"),
        ("positioning", "primary_meaning", "augmented, not artificial", "brand-board-v2", None, None),
        ("positioning", "tagline_primary", "Augmented. Not Artificial.", "brand-board-v2", "Supersedes initial tagline 'The Work Behind The Work'", None),
        ("positioning", "tagline_alt_1", "Clarity. Strategy. AI.", "brand-board-v2", None, None),
        ("positioning", "tagline_alt_2", "AI that actually helps.", "brand-board-v2", None, None),
        ("positioning", "tagline_alt_3", "Ancient wisdom. Modern intelligence.", "brand-board-v2", None, None),
        ("positioning", "strategic_position", "We are the calm operator behind practical AI transformation.", "brand-board-v2", None, None),
        ("positioning", "core_insight", "Most organizations do not have an AI problem. They have a clarity problem.", "overview-screen", None, None),
        ("positioning", "one_line", "AI strategy and implementation partner for businesses that need clarity, working systems, and durable adoption.", "overview-screen", None, None),
        ("positioning", "signature_line", "Most organizations do not have an AI problem. They have a clarity problem.", "tone-guide", None, None),
        
        # What we are / are not
        ("positioning", "what_we_are", "Strategic, Embedded, Methodical, Practical, Human-first, Precise, Built for measurable outcomes", "core-positioning", None, None),
        ("positioning", "what_we_are_not", "AI hype, Automation theatre, Generic consulting, Tool-first advice, Urgency theatre, Demos without adoption", "core-positioning", None, None),
    ]
    
    for category, key, value, source, contradiction, strengthened in facts:
        data = {
            "category": category,
            "key": key,
            "value": value,
            "source": source,
        }
        if contradiction:
            data["contradiction_note"] = contradiction
        if strengthened:
            data["strengthened_note"] = strengthened
        
        existing = supabase.table("brand_facts").select("id").eq("category", category).eq("key", key).execute()
        if existing.data and len(existing.data) > 0:
            supabase.table("brand_facts").update(data).eq("id", existing.data[0]["id"]).execute()
            print(f"  UPDATED  fact:{category}/{key}")
        else:
            supabase.table("brand_facts").insert(data).execute()
            print(f"  INSERTED fact:{category}/{key}")

# ── Seed palette ──
def seed_palette():
    colors = [
        ("foundation", "Obsidian", "#0a0a08", "Primary background", "v2", "brand-board-v2"),
        ("accent", "Brand Gold", "#c9a84c", "Primary brand accent, rules, priority labels", "v2", "brand-board-v2"),
        ("primary-text", "Warm Bone", "#e8e4d8", "Main text on dark", "v2", "brand-board-v2"),
        ("secondary-text", "Weathered Olive", "#9a9a82", "Secondary copy, metadata, supporting UI", "v2", "brand-board-v2"),
        ("accent", "Dusk", "#3a3a6a", "Rare secondary accent", "v2", "brand-board-v2"),
    ]
    for role, name, hex, usage, scheme, source in colors:
        data = {"role": role, "name": name, "hex": hex, "usage_description": usage, "scheme": scheme, "source": source}
        supabase.table("brand_palette").insert(data).execute()
        print(f"  INSERTED palette:{name}")

# ── Seed typography ──
def seed_typography():
    fonts = [
        ("display", "Cormorant Garamond", "Georgia, serif", "Logo, major headings, brand-led statements", "v2", "brand-board-v2"),
        ("body-ui", "Archivo Narrow", "Arial, sans-serif", "Body copy, interface labels, operational text", "v2", "brand-board-v2"),
    ]
    for role, typeface, fallback, usage, scheme, source in fonts:
        data = {"role": role, "typeface": typeface, "fallback": fallback, "usage_description": usage, "scheme": scheme, "source": source}
        supabase.table("brand_typography").insert(data).execute()
        print(f"  INSERTED typography:{typeface}")

# ── Seed voice rules ──
def seed_voice():
    rules = [
        ("pillar", "Precise: No wasted motion. Every word earns its place.", "tone-guide", 1),
        ("pillar", "Calm Authority: Already 3 steps ahead. No hype. No urgency theatre.", "tone-guide", 2),
        ("pillar", "Credible: We have built the systems we recommend.", "tone-guide", 3),
        ("pillar", "Human-First: Augmented means the client stays in the room.", "tone-guide", 4),
        ("write-like", "Measured and direct.", "tone-guide", 1),
        ("write-like", "Specific and earned.", "tone-guide", 2),
        ("write-like", "Confident without bravado.", "tone-guide", 3),
        ("write-like", "Human and grounded.", "tone-guide", 4),
        ("never", "Hype or buzzwords.", "tone-guide", 1),
        ("never", "Exclamation points.", "tone-guide", 2),
        ("never", "AI jargon to impress.", "tone-guide", 3),
        ("never", "Urgency theatre.", "tone-guide", 4),
        ("word-block", "leverage", "tone-guide", 1),
        ("word-block", "synergy", "tone-guide", 2),
        ("word-block", "best-in-class", "tone-guide", 3),
        ("word-block", "cutting-edge", "tone-guide", 4),
        ("word-block", "robust", "tone-guide", 5),
        ("word-block", "holistic", "tone-guide", 6),
        ("word-block", "innovative", "tone-guide", 7),
        ("word-block", "forward-thinking", "tone-guide", 8),
        ("word-block", "solution", "tone-guide", 9),
        ("word-allow", "precise, clear, structural, embedded, measured, durable, proven, human, augmented, methodical, deliberate", "tone-guide", 1),
        ("punctuation", "Periods carry weight. Commas create breath. No exclamation points.", "tone-guide", 1),
        ("signature", "Most organizations do not have an AI problem. They have a clarity problem.", "tone-guide", 1),
    ]
    for rule_type, content, source, priority in rules:
        data = {"rule_type": rule_type, "content": content, "source": source, "priority": priority}
        supabase.table("brand_voice_rules").insert(data).execute()
    print(f"  INSERTED {len(rules)} voice rules")

# ── Seed content pillars ──
def seed_pillars():
    pillars = [
        ("Clarity", "Explain what matters. Remove noise. Show the decision.", ["Most AI projects fail before the model is chosen.", "The first AI use case should remove friction, not impress the board.", "AI readiness is an operating question before it is a technical one."]),
        ("Working Systems", "Show how AI becomes process, not spectacle.", ["A useful AI workflow has an owner, a trigger, an output, and a review point.", "Prompts are not systems.", "The best automation still needs a human decision boundary."]),
        ("Human Judgment", "Position AI as augmentation. Keep people responsible, present, and sharper.", ["Augmentation means responsibility stays visible.", "AI should make experienced people faster, not invisible.", "Teams adopt systems they understand."]),
        ("Proof", "Use examples from systems already built. Earn the claim.", []),
        ("Durable Adoption", "Talk about what survives after the workshop, deck, or launch.", ["A good AI rollout changes the Monday morning workflow.", "Training is not adoption.", "The system is only real when the team uses it under pressure."]),
        ("Ad Intelligence", "Show how AI improves message testing, campaign learning, and paid media operations without pretending the machine replaces taste.", ["AI can speed creative testing, but it cannot define taste for you.", "The campaign is not the system. The learning loop is.", "Better ad copy starts with better diagnosis."]),
        ("Founder-Led Authority", "Turn real consulting judgment into public proof. The goal is qualified trust, not performance content.", []),
    ]
    for name, desc, angles in pillars:
        data = {"name": name.lower().replace(" ", "-"), "description": desc, "source": "content-pillars"}
        supabase.table("brand_content_pillars").insert(data).execute()
    print(f"  INSERTED {len(pillars)} content pillars")

# ── Seed archetype ──
def seed_archetype():
    data = {"archetype_name": "The Expert", "traits": ["precision", "authority", "results"], "description": "Calm operator behind practical AI transformation. Not hype. Not dashboards for show. Not jargon to impress. Working systems. Clear strategy. Durable adoption.", "source": "overview-screen"}
    supabase.table("brand_archetype").insert(data).execute()
    print(f"  INSERTED archetype")

# ── Seed update log ──
def seed_updates():
    updates = [
        ("Initial brand guidelines", "2025-01-XX", ["All"], "Brand wiki established from supplied AGENTS.md guidance"),
        ("Brand Board V2.0 image", "2026-05-19", ["index", "visual-identity", "voice", "positioning", "content", "icp", "offers"], "Primary tagline changed to 'Augmented. Not Artificial.' AI augmentation and human-first authority now central"),
        ("Brand Wiki Overview Screen image", "2026-05-19", ["index", "positioning", "voice", "offers", "icp", "competitive"], "Added founded 2026, Round Rock, domain, archetype, category, and clarity-problem positioning"),
        ("agency-agents and hermes-agent references", "2026-05-20", ["index", "frameworks", "content", "offers"], "Added AI ad agency consulting personal brand builder, internal agent roster, LinkedIn authority playbook, and personal brand builder offer"),
        ("Finished website hero", "2026-05-21", ["index", "visual-art-bible"], "Added reusable website art bible for palette, typography, layout, motion, nav, buttons, image treatment, and future sections"),
    ]
    for source, date, pages, notes in updates:
        data = {"source": source, "date": date, "pages_updated": pages, "notes": notes}
        supabase.table("brand_wiki_update_log").insert(data).execute()
    print(f"  INSERTED {len(updates)} update log entries")

# ── Seed agent roster ──
def seed_agents():
    agents = [
        ("Brand Guardian", "Protects the brand system — enforces voice, tone, naming, and visual/verbal identity", ["Enforce voice and tone", "Remove hype", "Keep naming consistent", "Protect visual and verbal identity", "Check outputs against the current wiki"], ["wiki/voice/tone-guide.md", "wiki/visual-identity.md", "wiki/positioning/core-positioning.md"]),
        ("Personal Brand Strategist", "Turns expertise into market-visible authority", ["Define audience", "Maintain content pillars", "Build point-of-view bank", "Connect content to offers", "Identify buyer objections"], ["wiki/content/content-pillars.md", "wiki/content/linkedin-authority-playbook.md", "wiki/offers/personal-brand-builder-offer.md"]),
        ("AI Systems Consultant", "Converts authority into consulting substance", ["Design AI clarity frameworks", "Map workflows", "Define decision boundaries", "Create adoption plans", "Translate AI ideas into operating systems"], ["wiki/offers/offer-architecture.md", "wiki/frameworks/ai-ad-agency-personal-brand-builder.md"]),
        ("Ad Creative Strategist", "Turns positioning into testable market messages", ["Draft ad angles", "Score message match", "Create creative testing hypotheses", "Build landing page copy variants", "Connect AI consulting to campaign learning"], ["wiki/frameworks/ai-ad-agency-personal-brand-builder.md", "wiki/offers/personal-brand-builder-offer.md"]),
        ("LinkedIn Authority Editor", "Shapes publishable content", ["Write LinkedIn drafts", "Improve hooks", "Maintain specificity", "Adapt proof into public posts", "Protect against generic thought leadership"], ["wiki/content/linkedin-authority-playbook.md", "wiki/voice/tone-guide.md"]),
        ("Proof Librarian", "Maintains evidence", ["Capture client-safe examples", "Track claims and support", "Store reusable proof", "Identify gaps between promise and evidence", "Feed content and sales assets"], ["wiki/case-studies/", "wiki/offers/offer-architecture.md"]),
        ("Studio Producer", "Runs the cadence", ["Maintain publishing calendar", "Assign agent tasks", "Track asset status", "Review weekly signals", "Keep the system moving"], ["wiki/frameworks/ai-ad-agency-personal-brand-builder.md"]),
    ]
    for name, purpose, responsibilities, deps in agents:
        data = {"name": name, "purpose": purpose, "responsibilities": responsibilities, "wiki_dependencies": deps, "source": "agent-roster"}
        supabase.table("brand_agent_roster").insert(data).execute()
    print(f"  INSERTED {len(agents)} agents")

# ── Seed competitive positioning ──
def seed_competitive():
    patterns = [
        ("AI hype", "Clarity"),
        ("Tool-first advice", "Business-first systems"),
        ("Demo culture", "Durable adoption"),
        ("Jargon", "Plain English"),
        ("Fear-driven urgency", "Calm authority"),
    ]
    differentiators = ["Strategy plus implementation", "Operational experience", "Human-first adoption", "Precise, practical systems", "Measurable outcomes", "Calm authority"]
    for pattern, response in patterns:
        data = {"market_pattern": pattern, "adiuvatai_response": response, "differentiators": differentiators, "source": "competitive-edge"}
        supabase.table("brand_competitive").insert(data).execute()
    print(f"  INSERTED {len(patterns)} competitive positions")

# ── Seed offers ──
def seed_offers():
    offers = [
        {
            "name": "AI Clarity Sprint",
            "summary": "Diagnose the business, map use cases, separate signal from noise, and define the first useful system.",
            "engagement_shape": "Sprint (2 weeks)",
        },
        {
            "name": "AI System Build",
            "summary": "Design and implement the workflows, tools, prompts, automations, and governance needed to make AI usable.",
            "engagement_shape": "Build (4-6 weeks)",
        },
        {
            "name": "Adoption Partner",
            "summary": "Stay embedded while the team learns, adjusts, and turns the system into normal work.",
            "engagement_shape": "Embedded (monthly)",
        },
        {
            "name": "AI Authority Builder",
            "summary": "Build a founder-led personal brand system for consultants, agency operators, and technical experts who need their public presence to create qualified business conversations.",
            "engagement_shape": "Sprint (2 weeks) / Build (4-6 weeks) / Embedded (monthly)",
            "best_fit": ["AI consultants", "Ad agency founders", "Fractional CMOs", "B2B service operators", "Technical founders with commercial expertise", "Senior practitioners moving into consulting"],
            "deliverables": ["Brand Foundation: positioning, audience, founder narrative, voice rules", "Content System: 3-5 pillars, 30-day calendar, 12 post drafts, 4 carousel scripts", "Conversion System: profile rewrite, featured section strategy, DM templates", "Operating System: weekly capture, review checklist, measurement dashboard"],
            "differentiation": "Most personal branding services turn people into content machines. Adiuvatai turns expertise into a working business asset.",
            "success_metrics": ["Clearer market category", "Stronger profile conversion", "More qualified inbound messages", "Higher-quality discovery calls", "Reusable proof assets", "Content that supports sales instead of distracting from it"],
        },
    ]
    for offer in offers:
        supabase.table("brand_offers").insert(offer).execute()
    print(f"  INSERTED {len(offers)} offers")

# ── Main ──
if __name__ == "__main__":
    print("Seeding brand wiki into Supabase...")
    seed_wiki_pages()
    seed_brand_facts()
    seed_palette()
    seed_typography()
    seed_voice()
    seed_pillars()
    seed_archetype()
    seed_updates()
    seed_agents()
    seed_competitive()
    seed_offers()
    print("Done!")
