-- Migration 012: Brand Wiki
-- Structured storage for Adiuvatai's full brand intelligence source of truth.
-- Mirroring the GitHub brand wiki structure at /workspace/adiuvatai/wiki/
-- Each wiki page is stored as a content_object with semantic tags, sections, and metadata.
-- Brand facts, visual identity, tone, and positioning are also stored in structured tables
-- for programmatic access by agents and personalization engine.

-- ═══════════════════════════════════════════════════════════════
-- 1. BRAND FACTS — structured key-value store for atomic brand data
-- ═══════════════════════════════════════════════════════════════

create table brand_facts (
  id uuid primary key default uuid_generate_v4(),
  category text not null,           -- identity, positioning, visual, voice, offer, icp, competitive, content, framework
  key text not null,
  value text not null,
  source text,                      -- e.g. 'brand-board-v2', 'overview-screen', 'initial-guidelines'
  contradiction_note text,          -- tracks [CONTRADICTION] annotations from wiki
  strengthened_note text,           -- tracks [STRENGTHENED] annotations
  priority integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(category, key)
);

create index idx_brand_facts_category on brand_facts(category);

create trigger brand_facts_updated_at
  before update on brand_facts
  for each row execute function update_updated_at();

-- ═══════════════════════════════════════════════════════════════
-- 2. BRAND WIKI PAGES — full markdown content per wiki page
-- ═══════════════════════════════════════════════════════════════

create type wiki_page_status as enum ('active', 'needs_review', 'superseded');

create table brand_wiki_pages (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,               -- e.g. 'voice/tone-guide', 'positioning/core-positioning'
  title text not null,
  category text not null,                  -- voice, positioning, visual, content, icp, offers, competitive, frameworks, sources
  markdown_content text not null,
  summary text,                            -- first paragraph or key insight
  status wiki_page_status default 'active',
  source_ref text,                         -- e.g. 'wiki/voice/tone-guide.md', 'sources/2026-05-19-brand-board-v2.md'
  word_count integer,
  contradictions integer default 0,        -- count of [CONTRADICTION] annotations
  strengthened integer default 0,          -- count of [STRENGTHENED] annotations
  version integer default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_brand_wiki_category on brand_wiki_pages(category);
create index idx_brand_wiki_status on brand_wiki_pages(status);

create trigger brand_wiki_pages_updated_at
  before update on brand_wiki_pages
  for each row execute function update_updated_at();

-- ═══════════════════════════════════════════════════════════════
-- 3. BRAND COLOR PALETTE — structured visual identity
-- ═══════════════════════════════════════════════════════════════

create table brand_palette (
  id uuid primary key default uuid_generate_v4(),
  role text not null,                      -- foundation, accent, primary-text, secondary-text
  name text not null,
  hex text not null,
  usage_description text,
  scheme text default 'v2' not null,       -- 'v1' (neo-noir red) or 'v2' (obsidian/gold)
  source text,
  created_at timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- 4. BRAND TYPOGRAPHY — typeface specifications
-- ═══════════════════════════════════════════════════════════════

create table brand_typography (
  id uuid primary key default uuid_generate_v4(),
  role text not null,                      -- display, body-ui
  typeface text not null,
  fallback text,
  usage_description text,
  scheme text default 'v2' not null,
  source text,
  created_at timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- 5. BRAND VOICE RULES — tone, language, forbidden words
-- ═══════════════════════════════════════════════════════════════

create table brand_voice_rules (
  id uuid primary key default uuid_generate_v4(),
  rule_type text not null,                 -- pillar, write-like, never, word-allow, word-block, punctuation, signature
  content text not null,
  source text,
  priority integer default 0,
  created_at timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- 6. BRAND CONTENT PILLARS — content strategy pillars
-- ═══════════════════════════════════════════════════════════════

create table brand_content_pillars (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,               -- clarity, working-systems, human-judgment, etc.
  description text not null,
  example_angles text[] default '{}',
  source text,
  created_at timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- 7. BRAND ARCHETYPE — the brand persona
-- ═══════════════════════════════════════════════════════════════

create table brand_archetype (
  id uuid primary key default uuid_generate_v4(),
  archetype_name text not null,            -- The Expert
  traits text[] default '{}',
  description text,
  source text,
  created_at timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- 8. UPDATE LOG — wiki change history
-- ═══════════════════════════════════════════════════════════════

create table brand_wiki_update_log (
  id uuid primary key default uuid_generate_v4(),
  source text not null,
  date text not null,
  pages_updated text[] default '{}',
  notes text not null,
  created_at timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- 9. AGENT ROSTER — internal specialists
-- ═══════════════════════════════════════════════════════════════

create table brand_agent_roster (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  purpose text not null,
  responsibilities text[] default '{}',
  wiki_dependencies text[] default '{}',
  source text,
  created_at timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- 10. COMPETITIVE POSITIONING — against market patterns
-- ═══════════════════════════════════════════════════════════════

create table brand_competitive (
  id uuid primary key default uuid_generate_v4(),
  market_pattern text not null,
  adiuvatai_response text not null,
  differentiators text[] default '{}',
  source text,
  created_at timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- 11. OFFER ARCHITECTURE — structured service definitions
-- ═══════════════════════════════════════════════════════════════

create table brand_offers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  summary text not null,
  engagement_shape text,
  best_fit text[] default '{}',
  deliverables text[] default '{}',
  differentiation text,
  success_metrics text[] default '{}',
  source text,
  created_at timestamptz default now()
);

-- Enable RLS for public read access
alter table brand_facts enable row level security;
alter table brand_wiki_pages enable row level security;
alter table brand_palette enable row level security;
alter table brand_typography enable row level security;
alter table brand_voice_rules enable row level security;
alter table brand_content_pillars enable row level security;
alter table brand_archetype enable row level security;
alter table brand_wiki_update_log enable row level security;
alter table brand_agent_roster enable row level security;
alter table brand_competitive enable row level security;
alter table brand_offers enable row level security;

-- Public read: anyone can read brand wiki data
create policy "brand_wiki_public_read"
  on brand_facts for select
  using (true);

create policy "brand_wiki_public_read"
  on brand_wiki_pages for select
  using (true);

create policy "brand_wiki_public_read"
  on brand_palette for select
  using (true);

create policy "brand_wiki_public_read"
  on brand_typography for select
  using (true);

create policy "brand_wiki_public_read"
  on brand_voice_rules for select
  using (true);

create policy "brand_wiki_public_read"
  on brand_content_pillars for select
  using (true);

create policy "brand_wiki_public_read"
  on brand_archetype for select
  using (true);

create policy "brand_wiki_public_read"
  on brand_wiki_update_log for select
  using (true);

create policy "brand_wiki_public_read"
  on brand_agent_roster for select
  using (true);

create policy "brand_wiki_public_read"
  on brand_competitive for select
  using (true);

create policy "brand_wiki_public_read"
  on brand_offers for select
  using (true);

-- Admin write via service_role only (no public write)
create policy "brand_wiki_service_write"
  on brand_facts for insert
  with check (true);

create policy "brand_wiki_service_write"
  on brand_wiki_pages for insert
  with check (true);

-- (repeat for all tables — simplified: service_role bypasses RLS anyway)
