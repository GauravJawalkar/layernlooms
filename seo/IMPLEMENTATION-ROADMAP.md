# LayerNLooms — Implementation Roadmap

4 phases, 12 months. Task-level. Owners are roles, not names — CTO, Content Lead, Founder, Delivery.

Legend: **P0** blocks everything else · **P1** needed within the phase · **P2** nice-to-have

---

## Phase 1 — Foundation (Weeks 1–4)

**Goal:** make the site technically correct and measurable. No new content except refreshes.
**Exit criteria:** all P0 gaps closed, CWV baseline measured, GSC verified, zero schema errors.

### Week 1 — Stop the bleeding (P0, ~6 hours total)

| # | Task | Owner | File |
|---|------|-------|------|
| 1.1 | Create `public/og-image.png` at 1200×630 with logo + value prop | Founder | new |
| 1.2 | Create `public/twitter-image.png` (or point Twitter at og-image) | Founder | `app/layout.tsx:78` |
| 1.3 | Create `public/favicon.svg` | Founder | `app/layout.tsx:87` |
| 1.4 | Either create `public/icons/*.svg` for all 7 services, or remove the `icon` field from `Service` | CTO | `app/data/services.ts` |
| 1.5 | Fix the 3 future-dated blog posts; re-date and add `dateModified` | Content Lead | `app/data/blogs.ts` |
| 1.6 | Verify `/admin/*` returns 401 unauthenticated; add rate limiting to contact API | CTO | `app/api/contact/route.ts` |

**Why first:** 1.1–1.3 are under an hour and currently every social share renders a broken image.

### Week 1 — Measure (P0, ~4 hours)

| # | Task | Owner |
|---|------|-------|
| 1.7 | Confirm GA4 web-vitals reporting is active; add route-level breakdown | CTO |
| 1.8 | Run PageSpeed Insights (mobile) on `/`, `/services`, `/services/web-development`, `/blog/{slug}`, `/contact`. Record the baseline in SEO-STRATEGY.md | CTO |
| 1.9 | Verify GSC property, submit sitemap, check indexed page count | CTO |

### Week 2 — Entity and schema (P0, ~10 hours)

| # | Task | Owner | File |
|---|------|-------|------|
| 2.1 | Rewrite `organizationSchema`: `ProfessionalService` type, real `telephone` (+91 9730516224), `address` (Pune, Maharashtra, India), `foundingDate: "2024"`, `numberOfEmployees`, `areaServed`, `priceRange`, `email` aligned to `info@layernlooms.com` | Founder | `app/components/JsonLd.tsx:16-38` |
| 2.2 | Add `hasOfferCatalog` listing all 7 services with URLs | Founder | same |
| 2.3 | Add `Person` + `ProfilePage` schema factory; create `app/about/team/[slug]/page.tsx` with `generateStaticParams` for the 4 founders, using LinkedIn URLs already in `about/page.tsx:48-73` | CTO | new |
| 2.4 | Add `url` and `sameAs` to `author` in `getBlogPostingSchema`; add `dateModified` and `wordCount` | CTO | `app/components/JsonLd.tsx:94-130` |
| 2.5 | Validate every schema in Rich Results Test + Schema Markup Validator. Zero errors | CTO | — |

### Week 2 — Technical hygiene (P0, ~4 hours)

| # | Task | Owner | File |
|---|------|-------|------|
| 2.6 | Delete the texture-downloading IIFE; commit the four Earth textures to `public/` | CTO | `next.config.ts:7-88` |
| 2.7 | Fix `lastModified` to real content dates and `changeFrequency` to realistic values across all four route groups | CTO | `app/sitemap.ts` |
| 2.8 | Add security headers: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy | CTO | `next.config.ts` |
| 2.9 | Add `/privacy` and `/terms` to the sitemap (currently missing) | CTO | `app/sitemap.ts:9-18` |
| 2.10 | Confirm `max-image-preview:large` and `max-snippet:-1` are in the rendered robots meta (they are, at `app/layout.tsx:50-52`) — no change | — | — |

### Weeks 3–4 — Content foundation (P0/P1, ~20 hours)

| # | Task | Owner |
|---|------|-------|
| 3.1 | Add `author` (as slug ref), `dateModified`, `faq`, `reviewedBy` to the `BlogPost` model | CTO |
| 3.2 | Reassign all 9 existing posts to named authors per CONTENT-CALENDAR.md §2 | Content Lead |
| 3.3 | Refresh all 9 posts: named byline linking to author page, 2–3 contextual internal links to `/services`, 1–2 sibling links, 3-question FAQ block with FAQPage schema, quotable takeaway box at top, visible publish/update dates | Content Lead |
| 3.4 | Remove LLM-tell phrasing from all 9 posts ("rapidly evolving landscape", "it's important to note", "delve into", "unlock", "revolutionize") | Content Lead |
| 3.5 | Expand footer: all 7 services + 4 top industries (`app/components/footer.tsx:16-21`) | CTO |
| 3.6 | Publish `/process` — methodology, 5 stages, team credentials, FAQPage schema | Content Lead |
| 3.7 | Publish `/faq` — 12–15 questions covering cost, timeline, process, engagement models, tech choices. FAQPage schema | Content Lead |
| 3.8 | Expand `/pricing` with price ranges, timelines and INR equivalents alongside existing point prices (ITD GrowthLabs model) | Content Lead |
| 3.9 | Change portfolio schema from `SoftwareApplication` to `CreativeWork` + `Article` | CTO |

### Weeks 3–4 — Performance (P1, ~8 hours, contingent on week-1 measurements)

**Do these only if LCP > 3.5s or INP > 400ms on mobile.**

| # | Task | Owner |
|---|------|-------|
| 4.1 | `next/dynamic` with `ssr: false` for all `app/components/Home/*` canvas components | CTO |
| 4.2 | Gate 3D scenes behind IntersectionObserver; do not load on initial paint | CTO |
| 4.3 | Disable animation entirely under `prefers-reduced-motion` | CTO |
| 4.4 | Audit gsap vs lenis vs framer-motion overlap; drop one | CTO |
| 4.5 | Convert remaining `.png` marketing assets to AVIF/WebP with proper `sizes` | CTO |

### Phase 1 dependencies
- 2.1 needs the exact registered address and phone confirmed by the Founder
- 2.3 needs 3 founder headshots and expanded bios (2–3 sentences each, with a credential)
- 3.3 depends on 2.3 (author pages must exist before bylines link to them)
- 4.x depends on 1.8 (do not optimise blind)

### Phase 1 risks
- CSP (2.8) will likely break something in a stack this heavy (Cloudinary, EmailJS, GA4, Firebase, three.js). Build it in report-only mode first.
- The texture downloader (2.6) may be load-bearing on a machine where the files were never committed. Check `public/` before deleting.

---

## Phase 2 — Expansion (Weeks 5–12)

**Goal:** publish the highest-intent content, open the industry and geo lanes.
**Exit criteria:** 13 new posts, 2 industry pages, `/process` + `/faq` live, 40+ keywords top 50, LCP < 3.0s.

### Weeks 5–8 · Buying guides and first comparisons (P0)

| # | Task | Owner | Post # |
|---|------|-------|--------|
| 5.1 | Write + publish buying-guide batch (batch-write all 5 in two sittings) | Content Lead | 1–5 |
| 5.2 | Internal-link every new post to a `/services` page and 1 sibling post | Content Lead | — |
| 5.3 | Add all new URLs to sitemap with correct `lastModified` | CTO | — |
| 5.4 | Google Business Profile: add the 5 new URLs as posts; verify category, NAP, services list | Founder | — |

### Weeks 9–12 · Industry launch and comparison (P0/P1)

| # | Task | Owner | Post # |
|---|------|-------|--------|
| 6.1 | Create `app/data/industries.ts` and `app/(Pages)/industries/[slug]/page.tsx` with Service + BreadcrumbList + FAQPage schema | CTO | — |
| 6.2 | Publish `/industries/fintech` and `/industries/ecommerce-retail` (800+ words each, real case-study link, compliance-specific content) | Content Lead | 14, 17 |
| 6.3 | Create `/industries` hub listing all planned industries | CTO | — |
| 6.4 | Write + publish comparison batch | Content Lead | 4, 7, 10, 12 |
| 6.5 | Add Pune geo signals: city name in service page H1s, `areaServed` Pune/Maharashtra, city-contextual paragraph on `/services` | Content Lead | — |
| 6.6 | Start the metrics log: for every active project, record scope, timeline, outcome metric, testimonial. This unblocks Phase 4. | Delivery | — |
| 6.7 | Re-measure CWV on all 5 templates. If LCP still > 3.0s, escalate to full performance pass | CTO | — |

### Phase 2 dependencies
- 6.1 blocks 6.2 — build the industry template before writing industry pages
- 6.6 must start in week 9, not week 20. Case studies need 3–4 months of metric collection.
- 5.x depends on Phase 1 author model being live

### Phase 2 risks
- Industry pages written before a relevant case study exists become thin. Ship fintech and e-commerce only, since you have e-commerce proof already.
- 6.5 (Pune in H1s) risks looking keyword-stuffed. Keep it to one natural H1 mention plus a contextual paragraph, not a geo-spam block.

---

## Phase 3 — Scale (Weeks 13–24)

**Goal:** build topical authority, expand verticals, start earning links.
**Exit criteria:** 6 industry pages, 6 comparison pages, 3 case studies, 25+ posts, LCP < 2.5s, 120 keywords top 50, 30 referring domains.

### Weeks 13–16

| # | Task | Owner |
|---|------|-------|
| 7.1 | Publish remaining 4 industry pages: healthcare, SaaS/startups, logistics, education | Content Lead |
| 7.2 | Rewrite 2 case studies with real metrics + testimonials (template in CONTENT-CALENDAR.md §3, Month 7) | Delivery + Content Lead |
| 7.3 | Full performance pass to LCP < 2.5s, INP < 200ms, CLS < 0.10 | CTO |
| 7.4 | Publish comparison batch 2 | Content Lead |

### Weeks 17–20

| # | Task | Owner |
|---|------|-------|
| 8.1 | Publish remaining 2 comparison pages | Content Lead |
| 8.2 | Publish 4 service-depth + buying-guide posts (Month 9–10 calendar) | Content Lead |
| 8.3 | **Optional, skip by default:** rename `/portfolio`→`/work` and `/blog`→`/insights` with tested 301s. Only if the pillar names are final. | CTO |
| 8.4 | Backlink prospecting: 50 relevant Dev.to/Hashnode republishes of engineering posts | Founder + CTO |
| 8.5 | Dev.to and Hashnode author profiles for the 3 named authors | Founder |

### Weeks 21–24

| # | Task | Owner |
|---|------|-------|
| 9.1 | 3rd case study with real numbers | Delivery + Content Lead |
| 9.2 | Build 2–3 Pune-adjacent city pages only if the geo cluster shows traction in GSC; otherwise skip | Content Lead |
| 9.3 | Second performance pass; CWV green on all templates | CTO |
| 9.4 | AI citation audit: query the 6 tracked prompts in ChatGPT, Perplexity and Google AI Overviews. Log mentions and citations | Founder |
| 9.5 | Mid-year review against the KPI table in SEO-STRATEGY.md. Rebase the 12-month targets if needed. | Founder |

### Phase 3 dependencies
- 7.2 depends on 6.6 (metrics log) having 3+ months of data. This is the critical path of the whole plan.
- 8.3 is optional and should stay skipped unless there is a specific reason. No ranking equity exists to protect, and renames carry regression risk.
- 9.4 needs prompts defined; use the 6 from SEO-STRATEGY.md §5.5.

### Phase 3 risks
- **Case study bottleneck is the real risk.** Everything downstream of 7.2 is blocked on delivery-team documentation. Escalate if metrics are not being collected by week 16.
- Dev.to republishing can look like scaled content if done mechanically. Republish the 3 best engineering posts, not 12.

---

## Phase 4 — Authority (Months 7–12)

**Goal:** own the lanes, become citable, convert organic into pipeline.
**Exit criteria:** 37 posts, 60 referring domains, 85 top-10 keywords, AI citation rate ≥ 45%, LCP < 2.0s / INP < 150ms / CLS < 0.05.

### Months 7–8

| # | Task | Owner |
|---|------|-------|
| 10.1 | Publish 2 original-research posts with proprietary data (Month 11 calendar). Requires delivery-team data. | Gaurav + Delivery |
| 10.2 | Refresh all posts older than 6 months: update stats, `dateModified`, internal links | Content Lead |
| 10.3 | Earned media: pitch 2–3 original-data stories to tech publications | Founder |

### Months 9–10

| # | Task | Owner |
|---|------|-------|
| 11.1 | Publish 2 final posts (Month 12 calendar) | Content Lead |
| 11.2 | Link-earning push: publish 3 open-source dev tools or a genuinely useful free resource. This is the highest-ROI link tactic available. | CTO |
| 11.3 | Client co-marketing: ask 3 satisfied clients to co-author a case study or link to your site from theirs | Founder + Delivery |
| 11.4 | Update `llms.txt` and `llms-full.txt` with all new pillars and authors | CTO |

### Months 11–12

| # | Task | Owner |
|---|------|-------|
| 12.1 | Final performance pass: CWV green everywhere, bundle audited | CTO |
| 12.2 | Full schema audit + validation across all page types | CTO |
| 12.3 | Annual AI citation audit; publish results internally as a positioning asset | Founder |
| 12.4 | Consolidate: merge or retire any post with no impressions in 6 months | Content Lead |
| 12.5 | Year-2 planning: re-baseline KPIs, identify which of the 4 lanes earned traction, cut the ones that did not | Founder |

### Phase 4 dependencies
- 10.1 depends on 6.6 and 12.5 on 12.4. Cutting losers at month 12 requires having tracked per-post impressions for at least 6 months, i.e. GSC reporting from Phase 1.

### Phase 4 risks
- Original research requires data you may not have. Fall back to an aggregation of your own delivery metrics (timeline accuracy, scope-change rates, tech-stack outcomes) — that is genuinely proprietary and easier to collect than survey data.
- Open-source link tactics work slowly. Start at 11.2, not earlier, so there is time to compound.

---

## Dependency Map

```
W1: measure ──────────────► W3-4: performance work (conditional)
W1: og images ────────────► everything social/AI related
W2: Person schema ────────► W3: post refreshes (bylines link to author pages)
W2: sitemap fix ──────────► GSC indexing quality
W6: metrics log starts ──► W13: case studies ──► M7: original research
W9: industry template ───► W10+: industry pages
M6: AI citation audit ────► M9: citation audit ──► M12: positioning asset
```

**The one dependency that is easy to miss and hard to recover:** the delivery-team metrics log starting in week 9. Everything in Phases 3 and 4 that converts depends on real numbers from past projects, and numbers cannot be retroactively manufactured.

---

## Effort Summary

| Phase | Dev hours | Content hours | Total |
|-------|-----------|---------------|-------|
| Phase 1 | ~32 | ~20 | ~52 |
| Phase 2 | ~16 | ~60 | ~76 |
| Phase 3 | ~24 | ~80 | ~104 |
| Phase 4 | ~16 | ~60 | ~76 |
| **Total** | **~88** | **~220** | **~308** over 12 months |

~26 hours/month average, ~5 hours/week. Spread across CTO, Content Lead and Founder rather than concentrated in one person.

---

## Quarterly Checkpoints

| Quarter | Review | Decide |
|---------|--------|--------|
| End of Month 3 | GSC impressions, indexed pages, CWV, first 5 posts | Is the content cadence sustainable? Adjust before adding more. |
| End of Month 6 | Mid-tier target check, AI citation rate, geo signals in GSC | Which geo/vertical queries show impressions? Double down there. |
| End of Month 9 | Referring domains, case studies live, CWV | Are links coming? If not, escalate 11.2 earlier. |
| End of Month 12 | Full KPI review | Year-2 lanes: cut what failed, scale what worked. |
