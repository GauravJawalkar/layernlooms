# LayerNLooms — Content Calendar

12-month editorial roadmap. Cadence: **2 posts/month sustainable, 3/month aggressive.** Phase 1 is engineering work, so the calendar starts at month 2 with a batch.

---

## 1. Content Pillars

| Pillar | Ratio | Role | Target URLs by M12 |
|--------|-------|------|--------------------|
| **Buying guides** (cost, timeline, process, vendor selection) | 35% | Capture high-intent, converts to `/contact` | 14 |
| **Service depth** (how we do X, technical methodology) | 25% | Rank for service modifiers, feeds `/services` | 8 |
| **Comparison** (X vs Y, alternatives, build vs buy) | 15% | Zero competition in the Pune cohort; converts hard | 6 |
| **Industry** (sector problems + our approach) | 15% | Own the vertical lane, feed `/industries` | 6 |
| **Engineering notes** (current best practice, opinionated) | 10% | Topical authority, links, AI citability | 5 |

Existing 9 posts are engineering-notes heavy. They stay, get refreshed, and get re-assigned an author.

---

## 2. Author Model (prerequisite — do this first)

Current state: every post is `author: "LayerNLooms Team"` (app/data/blogs.ts). No author pages, no Person schema. This is the weakest E-E-A-T signal on the site and it caps how much the blog can rank.

**Setup:**
- 3 recurring authors with real credentials: Sanket Pathare (CTO, full-stack + AI), Gaurav Jawalkar (CEO, strategy/product), Shubham Tawale (COO, delivery/ops)
- Each gets `/about/team/{slug}` with `Person` + `ProfilePage` schema, `sameAs` LinkedIn, bio, and a list of their posts
- Each post gets a byline link + `author.url` in BlogPosting schema
- Add `wordCount`, `dateModified`, `reviewedBy` to the post model

**Author assignment map for existing posts:**

| Post | Author |
|------|--------|
| future-of-web-development-2026 | Sanket |
| modern-frontend-development-react-nextjs | Sanket |
| building-scalable-microservices-nodejs | Sanket |
| ai-powered-applications-developer-guide | Sanket |
| optimizing-web-performance | Sanket |
| cybersecurity-best-practices-web-applications | Sanket |
| complete-guide-cloud-migration | Gaurav |
| how-to-choose-right-tech-stack | Gaurav |
| rise-of-low-code-no-code-platforms | Shubham |

---

## 3. Month-by-Month Calendar

Legend: **P0** = ship first · **P1** = next · **P2** = if capacity allows

### Month 1–2 · Foundation (Phase 1)
*No new posts. Engineering and schema fixes. Refresh the 9 existing posts in one batch.*

Refresh checklist per existing post: named author byline + link, `dateModified`, 2–3 contextual internal links to `/services` and 1 sibling post, add a 3-question FAQ block with FAQPage schema, add a quotable summary box at top for AI extraction, ensure H2s are question-shaped where the query is a question.

### Month 3 · Launch (5 posts) — P0 buying guides

| # | Title | Slug | Type | Author |
|---|-------|------|------|--------|
| 1 | How Much Does Custom Software Development Cost in India in 2026? | `custom-software-development-cost-india-2026` | Buying guide | Gaurav |
| 2 | How to Choose a Software Development Company in India | `how-to-choose-software-development-company` | Buying guide | Gaurav |
| 3 | What Does It Cost to Build a SaaS MVP in 2026? | `saas-mvp-development-cost-2026` | Buying guide | Sanket |
| 4 | Custom Software vs SaaS: When to Build, When to Buy | `custom-software-vs-saas` | Comparison | Gaurav |
| 5 | What Happens in a Software Project: Our Process End to End | `software-development-process-explained` | Methodology | Shubham |

### Month 4 · Buying guides + first comparison (4 posts) — P0

| # | Title | Slug | Type | Author |
|---|-------|------|------|--------|
| 6 | Mobile App Development Cost in India 2026: Full Breakdown | `mobile-app-development-cost-india-2026` | Buying guide | Gaurav |
| 7 | React Native vs Flutter vs Native in 2026 | `react-native-vs-flutter-vs-native` | Comparison | Sanket |
| 8 | What Questions to Ask Before Hiring a Software Developer | `questions-to-ask-software-developer` | Buying guide | Shubham |
| 9 | AI Development Company in Pune: What to Look For | `ai-development-company-pune-what-to-look-for` | Geo + buying | Sanket |

### Month 5 · Service depth (4 posts) — P0

| # | Title | Slug | Type | Author |
|---|-------|------|------|--------|
| 10 | Next.js vs WordPress for Enterprise: An Honest 2026 Take | `nextjs-vs-wordpress-enterprise` | Comparison | Sanket |
| 11 | How We Build AI Agents That Don't Break in Production | `building-production-ai-agents` | Service depth | Sanket |
| 12 | Fixed Price vs Time and Materials: How to Pick a Contract Model | `fixed-price-vs-time-and-materials` | Comparison | Shubham |
| 13 | RAG vs Fine-Tuning: Choosing the Right Approach for Your LLM App | `rag-vs-fine-tuning` | Service depth | Sanket |

### Month 6 · Industry launch (4 posts) — P1

| # | Title | Slug | Type | Author |
|---|-------|------|------|--------|
| 14 | Ecommerce Website Development in India: Complete Cost & Tech Guide | `ecommerce-website-development-india` | Industry | Gaurav |
| 15 | Healthcare App Development: HIPAA, Consent, and Data Handling | `healthcare-app-development-compliance` | Industry | Sanket |
| 16 | SaaS Development Agency: How to Evaluate One for Your Product | `how-to-evaluate-saas-development-agency` | Buying guide | Gaurav |
| 17 | Fintech Software Development: Security and Compliance Requirements | `fintech-software-development-compliance` | Industry | Sanket |

### Month 7 · Case studies (3 posts) — P0, highest conversion value

| # | Title | Slug | Type | Author |
|---|-------|------|------|--------|
| 18 | How We Built a 200-Tool Browser Platform (Imgira) | `case-study-imgira` | Case study | Sanket |
| 19 | Designing a Multi-Vendor Plant Marketplace from Zero | `case-study-ecomm-store` | Case study | Sanket |
| 20 | Building a Real-Time Analytics Dashboard at Scale | `case-study-neritic-dashboard` | Case study | Sanket |

Case study template: 1,000+ words · client + sector · problem · constraints · approach · architecture decisions · what we tried that failed · measurable result with a real number · testimonial with name and role · CTA.

**You currently have no numeric results** in `app/data/portfolio.ts` — the `result` fields are descriptive. Get real numbers from the delivery team. This is the single biggest content blocker.

### Month 8 · Comparison cluster (4 posts) — P1

| # | Title | Slug | Type | Author |
|---|-------|------|------|--------|
| 21 | Outsourcing Software Development vs Building In-House | `outsource-vs-in-house-engineering` | Comparison | Gaurav |
| 22 | Agile vs Waterfall for Software Projects | `agile-vs-waterfall` | Comparison | Shubham |
| 23 | Custom Software vs Low-Code/No-Code | `custom-software-vs-low-code` | Comparison | Gaurav |
| 24 | Managed Development Team vs Fixed Project Vendor | `managed-team-vs-fixed-project` | Comparison | Gaurav |

### Month 9 · Industry + service depth (4 posts) — P1

| # | Title | Slug | Type | Author |
|---|-------|------|------|--------|
| 25 | Logistics Software Development: Route, Fleet and Tracking Systems | `logistics-software-development` | Industry | Sanket |
| 26 | React Native Development: When Cross-Platform Is the Right Call | `react-native-development-guide` | Service depth | Sanket |
| 27 | Cloud Migration Cost and Timeline: What to Expect | `cloud-migration-cost-timeline` | Buying guide | Gaurav |
| 28 | SaaS Analytics Platform Build: Architecture and Trade-offs | `saas-analytics-platform-architecture` | Service depth | Sanket |

### Month 10 · Buying guides (4 posts) — P1

| # | Title | Slug | Type | Author |
|---|-------|------|------|--------|
| 29 | How to Write a Software Project Brief That Gets Accurate Quotes | `how-to-write-software-project-brief` | Buying guide | Shubham |
| 30 | Dedicated Team vs Project-Based Outsourcing | `dedicated-team-vs-project-based` | Comparison | Gaurav |
| 31 | How Long Does a Custom Web App Take to Build? | `custom-web-app-development-timeline` | Buying guide | Shubham |
| 32 | Proptech and Real Estate App Development: A 2026 Guide | `proptech-app-development-guide` | Industry | Sanket |

### Month 11 · Authority + original data (3 posts) — P2, Phase 4

| # | Title | Slug | Type | Author |
|---|-------|------|------|--------|
| 33 | What We Learned Building 10+ Products in 18 Months (original data) | `what-we-learned-building-10-products` | Original research | Gaurav |
| 34 | Education Platform Development: Architecture for Scale | `education-platform-development` | Industry | Sanket |
| 35 | Hiring vs Outsourcing for a 5-Person Engineering Team | `hiring-vs-outsourcing-engineering-team` | Comparison | Gaurav |

### Month 12 · Maintain + refresh (2 posts) — P2

| # | Title | Slug | Type |
|---|-------|------|------|
| 36 | Software Development Cost Benchmarks: What We Actually Charge in 2026 | `software-development-cost-benchmarks-2026` | Original research |
| 37 | Manufacturing Software in India: ERP, IoT and Field Service | `manufacturing-software-india` | Industry |

**Total: 28 new posts + 9 refreshed + 5 case studies = 42 assets in 12 months.**

---

## 4. Refresh Cadence

| Content age | Action |
|------------|--------|
| 0–6 months | Leave alone |
| 6–12 months | Re-verify accuracy, update stats, refresh `dateModified`, add internal links |
| 12–18 months | Full rewrite if ranking on page 2–3; consolidate if ranking page 1 |
| 18+ months | Rewrite, merge, or retire. Retire anything with no impressions after 6 months. |

Also refresh on **event triggers**: a framework major version, a pricing change, an algorithm update that hits your page type, a new case study that supersedes the example.

---

## 5. E-E-A-T Build Plan

| Asset | Status | Action | Owner |
|-------|--------|--------|-------|
| Author pages + Person schema | Missing | Build 3 | CTO |
| Blog byline + author link | Missing | Add to `BlogPost` model | CTO |
| `reviewedBy` on technical posts | Missing | Add field, CTO reviews AI/architecture posts | CTO |
| Case studies with real metrics | Descriptive only | Rewrite all 5 with numbers + testimonials | COO |
| Company `address` in Organization schema | Missing | Add Pune PostalAddress | Founder |
| Company `telephone` in schema | Empty string | Populate (JsonLd.tsx:33) | Founder |
| `foundingDate` in schema | Missing | Add `2024` | Founder |
| `AggregateRating` | Missing | Only add if real reviews exist on GBP. Do not fabricate. | Founder |
| Client logos | Missing | Obtain written permission per client | COO |
| Certifications | Unknown | Audit: AWS/GCP partner, ISO, security certs. Publish if held. | COO |
| Original research | None | Two data-driven posts (M11, M12) | Gaurav |

---

## 6. GEO (Generative Engine Optimization) Content Rules

Every post must satisfy these to be citable by AI answer engines:

1. **Answer-first** — a 40–60 word direct answer to the title question in the first paragraph, before any preamble
2. **Question-shaped H2s** — `## How much does X cost?` not `## Pricing`
3. **Extractable facts** — real numbers, in standalone sentences, not buried in paragraphs. AI systems quote sentences, not sections
4. **Entity clarity** — name LayerNLooms, the author, and the technology versions explicitly. "We use Next.js 16 with React 19" beats "modern frameworks"
5. **Freshness signal** — visible `Published` and `Updated` dates in the body, not just meta
6. **A quotable summary box** at the top: 3–5 bullet key takeaways, phrased as statements an AI could quote verbatim
7. **Tables over prose** for anything comparative — AI engines lift tables cleanly
8. **No LLM tells** — delete "In today's rapidly evolving landscape", "it's important to note", "delve into", "landscape of", "unlock", "revolutionize". These mark content as machine-generated and reduce trust

Also: keep `llms.txt` and `llms-full.txt` current, and refresh them when you add the new pillars.

---

## 7. Distribution Plan

Publishing is not distribution. Each piece ships with:

- **LinkedIn** — Sanket/Gaurav post a specific technical take from the piece, not "read our blog". Personal profiles over company page.
- **Google Business Profile** — posts for anything local/case-study related
- **Dev.to / Hashnode** — republish engineering-notes posts (builds author entity + referral)
- **Relevant communities** — only where the post is genuinely useful: r/webdev, r/ExperiencedDevs, Indie Hackers, specific Slack/Discord groups. No link dumping.
- **Internal LinkedIn** — drive traffic to the best guides; the founders' networks are the cheapest distribution you have
