# LayerNLooms — SEO Strategy

**Domain:** layernlooms.com
**Business type:** Software development agency / consultancy (Pune, India; serves startups and enterprises globally)
**Template applied:** `assets/agency.md`
**Date:** 2026-09-28
**Planning mode:** Existing-site. Audit performed against the live Next.js codebase; no DataForSEO MCP tools were available, so competitive metrics are estimated from observable SERP signals, not measured DA/traffic figures.

---

## 1. Where the Site Stands

This is a much better technical foundation than a typical 2-year-old agency site. That changes the strategy: this is not a "fix everything" plan, it is a "monetise the foundation" plan.

### Already in place (keep)

| Asset | Location |
|-------|----------|
| Next.js 16 App Router, static generation on all dynamic routes | `generateStaticParams` on blog, portfolio, services |
| Per-route `generateMetadata` with self-referencing canonicals | blog/portfolio/services `[slug]/page.tsx` |
| Schema factory: Organization, WebSite+SearchAction, Service, BlogPosting, SoftwareApplication, FAQPage, BreadcrumbList | `app/components/JsonLd.tsx` |
| Schema actually deployed on detail pages | service, blog, portfolio, about, pricing |
| `sitemap.xml` + `robots.txt` as code | `app/sitemap.ts`, `app/robots.ts` |
| `llms.txt` + `llms-full.txt` as served routes | `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts` |
| Explicit AI-crawler allowlist (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, ByteDanceBot) | `app/robots.ts:12-25` |
| GA4 wired | `app/components/GoogleAnalytics.tsx` |
| Real named leadership with LinkedIn URLs | `app/(Pages)/about/page.tsx:48-73` |
| Real, working portfolio with live project URLs | `app/data/portfolio.ts` |
| Published pricing with point prices | `app/(Pages)/pricing/page.tsx:8-36` |

Roughly 30% of a Tier 2 competitor's technical SEO is already done. Most Pune agencies have none of this.

### Gaps, ranked by impact

**G1 — Sitemap lies about freshness.** `app/sitemap.ts` sets `lastModified: new Date()` on all 32 URLs on every request, and `changeFrequency: "daily"` for home and blog. Every page looks newly modified on every crawl. Google discounts this signal, and it burns crawl budget re-fetching unchanged pages. Real `lastModified` per content type, real `changeFrequency`.

**G2 — Referenced images that do not exist.** `app/layout.tsx:65` references `https://layernlooms.com/og-image.png` and `:78` references `twitter-image.png`. Neither exists in `public/`. Every social share and every blog/portfolio/service post without its own image resolves to a 404 image. That kills share CTR and silently degrades entity perception in AI systems that try to read your OG card.

**G3 — `favicon.svg` does not exist.** Declared at `app/layout.tsx:87`. Also `/icons/*.svg` for all 7 services (declared in `app/data/services.ts`, directory absent). Broken references on every service page.

**G4 — Organization schema is half-empty.** `app/components/JsonLd.tsx:31-37`: `telephone: ""`, no `address`, no `foundingDate`, no `numberOfEmployees`, no `email` consistency with the footer (`info@layernlooms.com` in footer.tsx:29 vs `contact@layernlooms.com` in schema). Empty required-ish fields weaken the entity. For a business with a Google Business Profile and a physical Pune address, this is leaving local and entity signal on the table.

**G5 — No author entity.** Every post is `author: "LayerNLooms Team"` (`app/data/blogs.ts`). No author pages, no `Person` schema, no `author.url` in BlogPosting. Google's helpful-content assessment reads anonymous authorship as a weak experience signal. This is the largest E-E-A-T gap and every Tier 2 competitor has it too, so fixing it is both a quality move and a competitive one.

**G6 — No industry pillar.** No competitor in the surveyed set has a populated `/industries`. This is the single largest open lane.

**G7 — No comparison content.** Zero "X vs Y" pages. The entire Pune cohort is blind here.

**G8 — No `/process` or `/faq` page.** Both are E-E-A-T and conversion assets, and both are standard in the competitive set.

**G9 — Footer lists 4 of 7 services.** `app/components/footer.tsx:16-21`. Web, Mobile, AI, Cloud are linked; UI/UX, Digital Marketing and SaaS Analytics are not linked from anywhere in the footer. Cheapest internal-linking fix available.

**G10 — No case studies with numbers.** `app/data/portfolio.ts` `result` fields are descriptive, e.g. "Comprehensive plant marketplace with multi-vendor support." No metric, no testimonial on 4 of 5 projects. Case studies with quantified results are the highest-converting content an agency can publish and the most-citable content for AI engines.

**G11 — Three future-dated blog posts.** `app/data/blogs.ts` has posts dated August 22, September 5 and October 12, 2026. Today is September 28, 2026, so the October 12 post is in the future. Future-dated content is a trust problem, and `datePublished` in BlogPosting schema is machine-readable — this is visible to crawlers and to AI systems, not just to users.

**G12 — Portfolio schema is the wrong type.** `getCreativeWorkSchema` emits `SoftwareApplication` with `applicationCategory: "BusinessApplication"` for what are marketing/case-study pages (`app/components/JsonLd.tsx:132-157`). For service-delivered client work, `CreativeWork` is a better fit, and the page should carry `Article` for the case-study body. Minor, but it is the page type you most want rich results on.

**G13 — Admin routes are `disallow`ed, not authenticated away.** `app/robots.ts:9` blocks `/admin`. robots.txt is not access control — those URLs are still discoverable via link graphs and still crawlable. Verify `/admin/*` returns 401 for unauthenticated requests. Also confirm `app/api/contact/route.ts` has rate limiting; it is a public POST endpoint wired to nodemailer.

**G14 — No `geo` targeting / no city pages.** Pune is a real asset and no Pune competitor has a location page cluster.

**G15 — 3D/canvas-heavy homepage.** `app/components/Home/` contains EarthModel, ParticleField, InfinityModel, Scene (react-three-fiber), plus gsap, lenis and framer-motion. This is a real Core Web Vitals risk on mid-range mobile. Needs measurement, not assumption — see §5.

---

## 2. Strategic Thesis

**Do not compete on head terms.** `software development company`, `app development company` are held by national agencies with thousands of links. A 10-person team founded in 2024 does not win that fight in 12 months, and pretending otherwise wastes the year.

**Compete on three specific lanes:**

1. **Geo-modified mid-tail** — `software development company in Pune`, `AI development company Pune`, `web development company Pune`. Contested, winnable, converts.
2. **Vertical industry pages** — nobody is there.
3. **Comparison and buying-guide content** — nobody is there, and this content converts hardest because it catches people mid-decision.

**And lead on the one axis where you are already ahead:** you ship `llms.txt`, `llms-full.txt` and an explicit AI-crawler allowlist. Most of the competitive set does not. Given AI Overviews and answer engines are taking a growing share of informational queries, that is a durable advantage — but only if the content behind it is citable, which today it largely is not (see G5, G10, G11).

**The positioning wedge:**

> LayerNLooms is the engineering-led alternative to agency bloat. Founded 2024 in Pune, we ship AI-native web, mobile and cloud products for startups and enterprises — with named engineers, published numbers, and AI-readable documentation.

Every clause maps to a page. Competitors claim all three without evidence.

---

## 3. Architecture Summary

Full detail in `SITE-STRUCTURE.md`. Shape of the change:

- **Add:** `/industries/{8}`, `/process`, `/faq`, `/about/team/{4}`, `/compare/*`
- **Keep as-is:** `/`, `/services/*`, `/portfolio/*`, `/blog/*`, `/pricing`, `/contact`, `/about`
- **Defer (Phase 3, optional):** rename `/portfolio`→`/work` and `/blog`→`/insights`. Low value, real risk. Only do it if the pillar names are settled and you can test redirects in staging. Recommendation: skip it.
- **Sitemap:** fix `lastModified`/`changeFrequency`, apply an 8-point quality gate, keep single sitemap (do not split yet)
- **Internal linking:** footer expands from 4 to all 7 services + 4 industries; every blog post links to a matching service; every industry page links to a service + a case study

---

## 4. Content Strategy Summary

Full detail in `CONTENT-CALENDAR.md`.

**37 new pieces over 12 months, plus 9 refreshed, plus 5 case studies rewritten.** Cadence 2–4/month depending on phase.

| Pillar | Share | Primary target |
|--------|-------|----------------|
| Buying guides | 35% | cost/timeline/vendor-selection queries → `/contact` |
| Service depth | 25% | service modifier queries → `/services` |
| Comparison | 15% | `X vs Y`, alternatives, build vs buy |
| Industry | 15% | vertical queries → `/industries` |
| Engineering notes | 10% | topical authority, links, AI citability |

**E-E-A-T prerequisites, in order:**
1. Three named authors with real pages and `Person` + `ProfilePage` schema (the LinkedIn URLs already exist in `about/page.tsx:48-73`; the data is there, unused)
2. Real numbers in every case study
3. Complete `Organization` schema: address, phone, foundingDate, consistent email
4. Named author byline + `author.url` on every post
5. A `reviewedBy` field so technical posts have a visible reviewer

**GEO content rules:** answer-first opening, question-shaped H2s, extractable standalone facts, explicit entity mentions, visible publish/update dates, a quotable takeaway box, tables over prose, and no LLM-tell phrasing.

---

## 5. Technical Foundation

### 5.1 Core Web Vitals

**Current state: unknown.** No CrUX or field data was available in this session. The homepage's three.js/react-three-fiber/gsap/lenis stack is a plausible LCP and INP risk on mid-range mobile hardware.

**Phase 1 action, before any other performance work:** instrument and measure.
- Vercel Web Analytics or GA4 already collects web-vitals — confirm it is reporting
- Pull PageSpeed Insights for `/`, `/services`, `/services/web-development`, `/blog/{slug}`, `/contact` on mobile
- Add `web-vitals` reporting to GA4 for LCP, INP, CLS by route

**Targets (75th percentile, mobile):**

| Metric | Current | 3 mo | 6 mo | 12 mo |
|--------|---------|------|------|-------|
| LCP | measure | < 3.0s | < 2.5s | < 2.0s |
| INP | measure | < 300ms | < 200ms | < 150ms |
| CLS | measure | < 0.15 | < 0.10 | < 0.05 |
| TTFB | measure | < 600ms | < 400ms | < 300ms |

**Likely interventions, in order of payoff:**
1. Gate the 3D scenes behind an intersection observer and load on idle — not in the critical path. `EarthModel`/`Scene` are decorative; the LCP element is almost certainly a heading or the hero image.
2. `next/dynamic` with `ssr: false` for all `Home/*` canvas components
3. Respect `prefers-reduced-motion` — skip animation entirely, which also helps the accessibility story
4. Audit bundle: framer-motion + gsap + lenis + three is a lot of JS. Consider dropping one of gsap/lenis
5. Convert remaining `.png` marketing assets to AVIF/WebP via `next/image` with proper `sizes`

**Do not ship a JS bundle whose cost is a decorative globe.** The engagement-model and process sections below the fold do not need a WebGL context to exist.

### 5.2 Schema Plan

| Page type | Current | Target | Priority |
|-----------|---------|--------|----------|
| Global | Organization, WebSite | + `ProfessionalService` (subclass of LocalBusiness) with `address`, `telephone`, `email`, `foundingDate`, `numberOfEmployees`, `areaServed`, `hasOfferCatalog` of all 7 services, `sameAs` | **P0** |
| Service detail | Service, BreadcrumbList, FAQPage | + `areaServed`, `offers` with price range, `aggregateRating` only if real reviews exist | P1 |
| Industry (new) | — | `Service` + `BreadcrumbList` + FAQPage | P1 |
| Blog post | BlogPosting, BreadcrumbList | + `author` with `url` and `Person`, `publisher.logo` (exists), `dateModified`, `wordCount`, `mainEntityOfPage`, `image` dimensions | **P0** |
| Team member (new) | — | `Person` + `ProfilePage`, `sameAs` LinkedIn, `worksFor` LayerNLooms | **P0** |
| Case study | SoftwareApplication | change to `CreativeWork` + `Article` | P1 |
| FAQ hub (new) | — | `FAQPage` | P2 |
| Pricing | FAQPage | + `Offer` / `Product` with the three plans | P2 |

**Rule:** validate every template in Schema Markup Validator and Rich Results Test before shipping. Zero errors, zero warnings.

### 5.3 Hosting and Infrastructure

- Next.js 16 on Vercel (assumed from `next.config.ts` + Cloudinary + Firebase). Confirm deployment target.
- **Remove the build-time download side effect.** `next.config.ts:7-88` runs an IIFE at config load that downloads four Earth textures from GitHub on every cold start. This is a reliability risk on Vercel builds, an unexpected outbound network call in CI, and the textures should be committed to the repo regardless. Move them to `public/` in git and delete the downloader.
- Add security headers in `next.config.ts`: `Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. You wrote an article about these on your own blog; ship them.
- Cloudinary for images with explicit width/height and format negotiation.

### 5.4 Mobile-First

- Verify tap targets ≥ 44px, especially the `CustomCursor` (must be disabled on touch) and the FAQ accordion
- Check the navbar at 320px width
- Mobile-first indexation is already implicit in Next.js; confirm no `max-width` or `min-width` meta viewport overrides
- Test the contact form's `Floatinput` components on iOS Safari — `autocomplete` and `inputMode` attributes affect conversion

### 5.5 AI Search Readiness

You are ahead here. Keep it and close the content gaps.

- `robots.ts` AI allowlist — keep, and add `Claude-User`, `Claude-SearchBot`, `Amazonbot`, `Meta-ExternalAgent` to future-proof
- `llms.txt` and `llms-full.txt` — keep, update to reflect the new `/industries`, `/process`, `/compare` pillars and the named authors
- Add `/.well-known/` discovery if any tooling requires it
- Content must be citable: answer-first, extractable numbers, question H2s, entity clarity
- Monitor actual citations: query ChatGPT, Perplexity and Google AI Overviews monthly for `best software development company Pune`, `custom software development cost India`, `React Native vs Flutter`, `how to choose a development agency`. Log whether LayerNLooms appears and where. This is the only way to know if GEO work is working.
- `Google-Extended` in the allowlist is correct (traffic licensing ≠ indexing, and you want indexing)

---

## 6. KPI Targets

Baseline assumptions: domain founded 2024, 32 indexable URLs, minimal backlink profile, near-zero non-brand organic traffic. If real Search Console data shows higher baselines, rebase these.

| Metric | Baseline | 3 Month | 6 Month | 12 Month |
|--------|----------|---------|---------|----------|
| Organic sessions (non-brand) | ~0–100/mo | 250 | 900 | 3,500 |
| Indexed pages | 32 | 38 | 55 | 75 |
| Keywords ranking (top 50) | ~5 | 40 | 120 | 300 |
| Keywords in top 10 | 0–2 | 8 | 30 | 85 |
| Non-brand clicks in top 10 | ~0 | 15 | 70 | 200 |
| Referring domains | ~10 | 15 | 30 | 60 |
| Domain Authority (est.) | ~10 | ~12 | ~16 | ~22 |
| LCP (p75 mobile) | measure in wk 1 | < 3.0s | < 2.5s | < 2.0s |
| INP (p75 mobile) | measure in wk 1 | < 300ms | < 200ms | < 150ms |
| CLS (p75 mobile) | measure in wk 1 | < 0.15 | < 0.10 | < 0.05 |
| Organic → contact form | ~0 | 5/mo | 15/mo | 40/mo |
| Blog → service page clickthrough | 0 | 5% | 10% | 15% |
| AI citation rate (6 tracked queries) | 0% | 10% | 25% | 45% |

**Traffic note:** these are deliberately modest. A young domain with a real content roadmap typically takes 6–9 months before compounding. If you are at 900 sessions by month 6, you are ahead of plan. If you are at 100, the problem is execution speed, not strategy.

**Leading indicators (weekly):** pages published, pages with ≥ 3 internal inbound links, GSC impressions, average position, crawl errors, Core Web Vitals field pass rate.

**Lagging indicators (monthly):** non-brand organic sessions, top-10 keywords, organic conversions, referring domains, AI citation rate.

---

## 7. Success Criteria by Phase

### Phase 1 — Foundation (weeks 1–4)
- All 15 gaps G1–G15 either fixed or explicitly ticketed with an owner
- G2, G3, G4, G11 fixed (each is under an hour of work)
- Core Web Vitals baseline measured on 5 key templates
- Sitemap returns real `lastModified` values
- GSC property verified, submitted sitemap, all 32 pages indexed
- 100% of pages have unique title + description + canonical + H1
- Zero Rich Results errors

### Phase 2 — Expansion (weeks 5–12)
- 3 author pages live with Person + ProfilePage schema
- 9 existing posts refreshed with bylines, internal links, FAQ blocks
- 13 new posts published (M3–M5)
- 2 industry pages live, 2 more drafted
- `/process` and `/faq` live
- All 7 services linked from footer
- 2 case studies rewritten with real numbers
- LCP < 3.0s mobile; INP < 300ms; CLS < 0.15
- 40+ keywords ranking top 50

### Phase 3 — Scale (weeks 13–24)
- 6 industry pages live
- 6 comparison pages live
- 3 case studies live
- 25+ posts total
- GEO content rules applied to all 100% of new content
- LCP < 2.5s; INP < 200ms; CLS < 0.10
- 120+ keywords top 50, 30+ top 10
- 30+ referring domains
- Optional: `/work` + `/insights` renames, fully tested with 301s

### Phase 4 — Authority (months 7–12)
- 2 original-research posts with proprietary data
- 37 posts total live
- LCP < 2.0s; INP < 150ms; CLS < 0.05 across all templates
- 300+ keywords top 50; 85+ top 10
- 60+ referring domains
- AI citation rate ≥ 45% across tracked queries
- At least 1 earned media mention or industry publication feature

---

## 8. Resource Requirements

| Role | Allocation | Notes |
|------|------------|-------|
| CTO / senior dev | ~10 hrs/wk in Phases 1–2 | Schema, performance, author pages, technical review of posts |
| Content lead (can be the COO or a contractor) | ~15 hrs/wk Phases 2–3 | Writing, editing, internal linking |
| Delivery team | ~3 hrs/client/month | Pull real metrics for case studies |
| Founder | ~2 hrs/wk | GBP, NAP consistency, community distribution, backlink outreach |
| SEO contractor (optional) | ~5 hrs/wk | Keyword tracking, reporting, backlink prospecting |

**Budget assumptions:** organic-only execution on existing infrastructure runs at near-zero cash cost. Realistic spend if you buy help: ₹25,000–60,000/month for content + technical SEO retainer, or ~$400–900/month. The expensive part is writing 37 good pieces, not tooling.

**Hard dependency:** case studies with real numbers require the delivery team to document outcomes as they happen. If you do not start collecting metrics now, Phase 4's conversion goals are unreachable. Start a metrics log per project immediately.

---

## 9. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Case studies never get real numbers | High | High | Make it a delivery-team PR requirement. Block Phase 4 content on it. Ship case studies with named clients and honest qualitative results if numbers never arrive — do not fabricate. |
| Content ships slowly (2/mo becomes 1/mo) | High | Medium | Batch-write in Phase 2. Batch of 5 in one sitting beats 5 posts across 5 weeks. |
| Three.js homepage tanks CWV | Medium | High | Measure in week 1. If LCP > 3.5s on mobile, gate the 3D scenes immediately — it is a 30-minute change. |
| Renames cause a traffic dip | Medium | Low | Skip the renames. No ranking equity to protect, no upside worth the risk. |
| A Tier 1 agency targets Pune | Low | Medium | Depth over breadth. Industry pillar + author entity is harder to copy than a city page. |
| AI answer engines reduce informational traffic | Medium | Medium | This is the biggest structural risk to the content play. Offset with comparison + industry content that AI cannot fully replace, and with `llms.txt` so you are the cited source rather than a casualty. |
| Dev resources diverted to client work mid-phase | High | High | Time-box SEO work to scheduled blocks. A 2-day sprint every two weeks beats good intentions. |
| Schema added but wrong | Medium | Medium | Validate every change in Rich Results Test before merge. |
| Competitors copy the industry pillar | Medium | Low | Six months of published depth is a real moat. Ship fast. |

---

## 10. First 10 Actions

1. Create missing `og-image.png` (1200×630), `twitter-image.png`, `favicon.svg` — every social share is currently a broken image
2. Fix `Organization` schema: real `telephone`, add `PostalAddress` (Pune, MH, India), `foundingDate: 2024`, align email with the footer, switch to `ProfessionalService` with a 7-service `OfferCatalog`
3. Fix the three future-dated blog posts and set real `dateModified` values
4. Replace the downloader IIFE in `next.config.ts:7-88` with committed texture files
5. Fix `lastModified` and `changeFrequency` in `app/sitemap.ts`; remove `daily`
6. Expand the footer to all 7 services + 4 top industries
7. Add security headers to `next.config.ts`
8. Measure Core Web Vitals on `/`, `/services`, `/services/web-development`, `/blog/{slug}`, `/contact` and set the week-1 baseline
9. Verify `/admin/*` returns 401 unauthenticated; add rate limiting to `app/api/contact/route.ts`
10. Create `app/about/team/[slug]/page.tsx` with `Person` + `ProfilePage` schema, using the LinkedIn URLs already in `about/page.tsx:48-73`

---

## 11. Documents in This Plan

| File | Contents |
|------|----------|
| `SEO-STRATEGY.md` | This document — strategy, gaps, technical foundation, KPIs, risks |
| `COMPETITOR-ANALYSIS.md` | 13 competitors, their strengths, your strengths, keyword gaps, E-E-A-T comparison |
| `SITE-STRUCTURE.md` | Current and target URL hierarchy, sitemap rules, internal linking, migration map |
| `CONTENT-CALENDAR.md` | 37 posts across 12 months, author model, E-E-A-T plan, GEO rules |
| `IMPLEMENTATION-ROADMAP.md` | 4 phases, task-level detail, dependencies, owner assignments |
