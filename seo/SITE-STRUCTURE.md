# LayerNLooms — Site Structure & URL Architecture

Domain: `layernlooms.com` · Platform: Next.js 16 (App Router) · Generated: 2026-09-28

---

## 1. Current Structure (as built)

```
/                                   Home            (sitemap prio 1.0)
/about                                              (0.8)
/services                                           (0.9)
  /services/web-development
  /services/mobile-app-development
  /services/ai-ml-solutions
  /services/cloud-infrastructure
  /services/ui-ux-design
  /services/digital-marketing
  /services/saas-analytics
/portfolio                                          (0.9)
  /portfolio/ecomm-store
  /portfolio/imgira-tools
  /portfolio/temp-nova
  /portfolio/neritic-dashboard
  /portfolio/explore-with-unity
/pricing                                            (0.8)
/blog                                               (0.9)
  /blog/{slug}   ×9                                  (0.8)
/careers                                            (0.7)
/contact                                            (0.8)
/privacy, /terms                                    (not in sitemap)
/llms.txt, /llms-full.txt                           (AI surfaces)
/sitemap.xml, /robots.txt
```

Admin surface (`/admin`) is `disallow`ed in robots — but see Gap G-13, robots.txt is not an access control.

---

## 2. Target Structure (12 months)

Pillars: **Services** (what we sell) · **Industries** (who we sell to) · **Work** (proof) · **Insights** (authority).

```
/
├── /services                                     ← service hub
│   ├── /services/web-development
│   ├── /services/mobile-app-development
│   ├── /services/ai-ml-solutions
│   ├── /services/cloud-infrastructure
│   ├── /services/ui-ux-design
│   ├── /services/digital-marketing
│   └── /services/saas-analytics
│
├── /industries                                   ← NEW: highest-leverage gap
│   ├── /industries/fintech
│   ├── /industries/healthcare
│   ├── /industries/ecommerce-retail
│   ├── /industries/saas-startups
│   ├── /industries/logistics-supply-chain
│   ├── /industries/education
│   ├── /industries/real-estate-proptech
│   └── /industries/manufacturing
│
├── /work                                         ← rename of /portfolio (301)
│   └── /work/{slug}                              ← full case-study format
│
├── /pricing
├── /process                                      ← NEW: methodology, E-E-A-T
├── /faq                                          ← NEW: FAQPage hub
├── /about
│   ├── /about/team                               ← NEW: Person + ProfilePage
│   │   ├── /about/team/gaurav-jawalkar
│   │   ├── /about/team/sanket-pathare
│   │   ├── /about/team/shubham-tawale
│   │   └── /about/team/jay-jawalkar
│   └── /about/careers                            ← move from /careers (301)
├── /insights                                    ← rename of /blog (301)
│   ├── /insights/guides                          ← long-form, 1.5k–3k words
│   ├── /insights/compare                         ← "X vs Y" / alternatives
│   └── /insights/{slug}
├── /contact
├── /privacy, /terms
└── /llms.txt, /llms-full.txt
```

Total target indexable URL count: **~75** (from 32 today).

---

## 3. URL Rules

| Rule | Value |
|------|-------|
| Case | lowercase, hyphen-separated |
| Trailing slash | none (`next.config` default) |
| Depth | max 3 segments (`/services/web-development`, `/insights/slug`) |
| Underscores / IDs | never — slugs only, stable, no dates in blog slugs |
| Params | no query-param dependence for indexable content; all variants must have self-canonical |
| Redirects | one hop max, permanent (301), no chains |
| `noindex` | `/admin/*`, `/api/*`, thank-you pages, search results, pagination page 2+ |

---

## 4. Sitemap Strategy with Quality Gates

Single `sitemap.xml` via `app/sitemap.ts`. Current implementation sets `lastModified: new Date()` on **every** URL on **every** crawl (app/sitemap.ts:10-39) — this tells Google all 32 pages changed daily. That is a trust signal you do not have and it wastes crawl budget.

**Fix:** real `lastModified` from content dates; real `changeFrequency`; split into indexable pages only.

| URL set | lastModified source | changeFrequency | priority |
|---------|--------------------|-----------------|----------|
| `/` | deploy timestamp | weekly | 1.0 |
| `/services` + children | service `updatedAt` | monthly | 0.9 / 0.8 |
| `/industries` + children | `updatedAt` | monthly | 0.8 / 0.7 |
| `/work` + children | project `year`/case study date | quarterly | 0.7 / 0.6 |
| `/insights` + children | post `date` | monthly | 0.7 / 0.6 |
| `/pricing`, `/process`, `/faq`, `/about`, `/contact` | `updatedAt` | monthly | 0.6 |

**Quality gate — a URL may only enter the sitemap when:**
1. Title ≥ 30 chars, unique across the set
2. Meta description 120–158 chars, unique
3. Canonical self-referencing and matching the sitemap URL exactly
4. ≥ 300 words of indexable body copy (service/industry 800+)
5. One H1, no duplicate H1s
6. Schema validates with zero errors (Rich Results Test)
7. Internal links in from at least two other pages
8. Thin/duplicate pages excluded (the `/work/{slug}` vs `/services` overlap rule below)

**`/sitemap-index.xml` split at scale:** if indexable URLs exceed 500, split by pillar (services / industries / insights) with a sitemap index. Not needed at current scale — do not add yet.

---

## 5. Internal Linking Strategy

**Orphan prevention:** every URL must be linked from the navbar, footer, or a hub within one click.

**Link flow by pillar:**

```
/insights/{slug}  ──contextual──▶  /services/{matching}   (1 in-body link, anchored)
                ──related──▶     /insights/{related}      (2–4 internal links)
                ──CTA──▶        /contact

/industries/{i}  ──────────────▶  /services/{primary}     (in-body, anchored)
                ──────────────▶  /work/{case study}       (near-verified example)
                ──CTA──▶        /contact

/work/{slug}     ──────────────▶  /services/{delivered}   ("How we built this")
                ──────────────▶  /industries/{sector}
                ──CTA──▶        /contact

/services/{s}    ──breadcrumb──▶ /services
                ──────────────▶  /process
                ──related──▶    /work/{case study}
                ──FAQ──▶       /faq  +  /pricing
```

**Anchor text:** varied, descriptive, keyword-bearing. Never "click here", never the URL itself.

**Footer:** currently 4 of 7 services (footer.tsx:16-21). Expand to all 7 + all 4 top industries. This is the highest-leverage internal link change in the codebase — one edit, ~11 new crawl paths discovered faster.

**Pruning:** no page should receive zero inbound internal links. Monthly check via a crawl; any page with < 3 internal inbound links gets a linking pass or goes `noindex`.

---

## 6. Information Architecture & User Journeys

**Journey A — "I need a custom app built" (primary, ~60% of traffic)**
`/` → `/services` → `/services/{relevant}` → `/work/{proof}` → `/process` → `/contact`
Cross-links: `/pricing` at the FAQ stage, `/industries/{their sector}` from step 3.

**Journey B — "I need a vendor in my city / near me"**
`/` → `/industries/{sector}` or `/about` → `/contact` (with city-level NAP)
Local signals: Pune address, phone, GBP link, `LocalBusiness` schema, city landing page (`/industries` variants referencing Pune/Mumbai/Bengaluru) — Phase 2 only.

**Journey C — "I am researching before I buy"**
`/insights/{guide}` → `/compare/{x}` → `/services/{s}` → `/pricing` → `/contact`
This is the journey Google AI Overviews most often intercepts. Make the guides citable and the comparison pages opinionated.

**Journey D — "AI recruiter evaluating you"**
`/llms.txt` → `/services` → `/about/team` → `/work/{slug}` → `/contact`
Reinforce with consistent entity data (see SEO-STRATEGY.md §5).

---

## 7. Migration Map (renames)

| From | To | Method |
|------|----|--------|
| `/portfolio` | `/work` | 301 in `next.config.ts` redirects |
| `/portfolio/{slug}` | `/work/{slug}` | 301, per-slug map |
| `/blog` | `/insights` | 301 |
| `/blog/{slug}` | `/insights/{slug}` | 301 |
| `/careers` | `/about/careers` | 301 |

**Recommendation: do NOT execute this in Phase 1.** Renames carry risk and the current `/blog` and `/portfolio` URLs have no ranking equity to protect. Ship it in Phase 3 (week 13+) only if the pillar names are stable and the redirect map is tested in staging. If you skip the rename, keep `/blog` and `/portfolio` and just add the new pillars around them.
