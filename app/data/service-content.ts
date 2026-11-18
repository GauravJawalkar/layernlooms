/**
 * Long-form editorial content for service pages.
 *
 * This lives outside `services.ts` on purpose. `services.ts` carries the
 * scannable record a card or a schema needs; everything here is the depth that
 * only the detail page has room for. Keeping them apart means adding a service
 * does not mean rewriting a wall of prose, and a rewrite of the summary never
 * costs you the detailed version.
 *
 * Nothing here is a client claim. No project counts, no outcome metrics, no
 * testimonials. Every statement is about how the work is delivered and what
 * the client receives, which is the part that can be written accurately.
 */

export interface ProcessStep {
  title: string;
  description: string;
}

export interface StackRationale {
  tech: string;
  reason: string;
}

export interface ServiceContent {
  deliverables: string[];
  process: ProcessStep[];
  stackRationale: StackRationale[];
  idealFor: string[];
  timeline: string;
  support: string;
  faqs: { question: string; answer: string }[];
}

export const serviceContent: Record<string, ServiceContent> = {
  "web-development": {
    deliverables: [
      "A production deployment with CI/CD wired to your repository",
      "A component library covering the design system you signed off",
      "Documented API layer, either REST or GraphQL, with typed clients",
      "A data model and migration set you own outright",
      "Core Web Vitals budgets agreed up front and verified after launch",
      "A handover session with your team, recorded and written up",
    ],
    process: [
      {
        title: "Architecture before interface",
        description:
          "We settle the data model, the boundaries between modules, and the rendering strategy before any visual work starts. Most expensive rebuilds trace back to a decision made here in week one and never revisited.",
      },
      {
        title: "Design built against real content",
        description:
          "Wireframes and visual design are worked through against representative data, not lorem ipsum. If a layout only works with a short title and no images, it does not survive contact with production content.",
      },
      {
        title: "Iterative delivery in reviewable increments",
        description:
          "Work ships in slices you can click through rather than one large reveal at the end. You see progress weekly and course-correct while changes are still cheap.",
      },
      {
        title: "Performance verified, not assumed",
        description:
          "Lighthouse and field data are checked before launch, not after. Budgets set during the architecture phase are enforced in code review so regressions do not reach users.",
      },
    ],
    idealFor: [
      "Teams replacing a slow or unmaintainable existing platform",
      "Startups that need a production-grade MVP rather than a prototype",
      "Enterprises consolidating several internal tools into one system",
      "Companies with an in-house team that needs an experienced delivery partner",
    ],
    timeline: "Marketing site 2-4 weeks, web application 8-16 weeks",
    support: "Ongoing retainer or 30 days post-launch warranty",
    stackRationale: [
      {
        tech: "Next.js",
        reason:
          "Server rendering and static generation are built in, which is what makes a content or commerce site rank and load quickly without a separate backend. The App Router also gives streaming and caching primitives that would otherwise require custom infrastructure.",
      },
      {
        tech: "TypeScript",
        reason:
          "A refactor across a large codebase is only safe if the compiler can tell you what broke. On projects of any size, TypeScript pays for itself the first time a schema changes.",
      },
      {
        tech: "React",
        reason:
          "The largest hiring pool and ecosystem of any frontend framework, which matters when you need to maintain the system after we hand it over. It is the safest default for long-lived codebases.",
      },
      {
        tech: "Tailwind CSS",
        reason:
          "Cuts the volume of bespoke CSS a system accumulates while keeping design decisions in one place. It also makes component APIs consistent, which is most of what makes a design system enforceable in code.",
      },
      {
        tech: "PostgreSQL",
        reason:
          "A relational database suits most business domains because the data genuinely is relational, and the constraints enforce correctness in the database rather than in every code path that touches it. JSONB covers the genuinely unstructured cases.",
      },
      {
        tech: "GraphQL",
        reason:
          "Useful when several different clients need different slices of the same data, which is common in multi-role products. For a single client with a known shape, a well-designed REST API is simpler and we will say so.",
      },
    ],
    faqs: [
      {
        question: "How long does it take to build a web application?",
        answer:
          "A marketing site takes roughly 2-4 weeks. A business web application with authentication, data modelling and third-party integrations typically runs 8-16 weeks. Complex multi-tenant platforms take longer. You get a specific date range after the architecture call, not a generic estimate.",
      },
      {
        question: "Will I own the code?",
        answer:
          "Yes. The repository, infrastructure configuration and cloud accounts stay in your name from the first commit. We develop inside your accounts rather than holding a hostage copy on ours.",
      },
      {
        question: "What happens after launch?",
        answer:
          "Every project includes a 30-day warranty for defects. After that you can take it in-house, move to a retainer with us, or hand it to another team. The documentation and handover session exist so that third option is realistic.",
      },
      {
        question: "Do you work with our existing design system?",
        answer:
          "Yes, and we prefer to. If you have Figma libraries or a component library in production we extend it rather than replacing it, which avoids the most common source of regression in a redesign.",
      },
      {
        question: "Can you integrate with tools we already use?",
        answer:
          "In most cases yes. We regularly integrate with Salesforce, HubSpot, Shopify, Stripe, Zoho, QuickBooks and internal systems. We will tell you during scoping if an integration is a poor fit.",
      },
    ],
  },

  "mobile-app-development": {
    deliverables: [
      "Signed iOS and Android builds ready for App Store and Play Store submission",
      "A shared component library, or native equivalents if you need platform-specific UX",
      "Offline-first data handling and a defined sync strategy",
      "Push notification and deep linking infrastructure",
      "Analytics and crash reporting wired in from the first release",
      "Store submission, review response and launch support",
    ],
    process: [
      {
        title: "Decide native or cross-platform first",
        description:
          "This is the decision that matters most and it is expensive to reverse. If your product depends on platform-specific APIs, background behaviour or gesture conventions, native wins. If the UI is conventional, cross-platform cuts cost substantially.",
      },
      {
        title: "Prototype the risky parts on device",
        description:
          "The parts most likely to fail are the parts we test first, on real hardware, before building around them. Performance and offline behaviour are verified early rather than discovered late.",
      },
      {
        title: "Ship in store-testable increments",
        description:
          "Internal builds go to TestFlight and Play Console testing throughout, so feedback arrives from the actual store install path rather than a browser preview.",
      },
      {
        title: "Handle submission and review",
        description:
          "We manage the store listings, privacy declarations and review responses. Rejections are common and usually mechanical, but they stall launches if nobody owns them.",
      },
    ],
    idealFor: [
      "Products where mobile is the primary surface rather than a secondary one",
      "Teams moving an existing responsive web app to native",
      "Startups that need to validate an app idea without funding a full native team",
      "Companies with iOS and Android release processes that need strengthening",
    ],
    timeline: "App 10-20 weeks depending on platform count and feature depth",
    support: "Release cycle support and crash triage",
    stackRationale: [
      {
        tech: "React Native",
        reason:
          "One codebase across iOS and Android with access to native modules when you need them. For products with conventional UI it roughly halves the delivery cost of two native apps, and components that genuinely need native behaviour can still be written in Swift or Kotlin.",
      },
      {
        tech: "Flutter",
        reason:
          "Strong when the interface is custom or animation-heavy, because it renders its own layer rather than mapping to native widgets. That consistency is also its weakness for apps that need to feel entirely at home on each platform.",
      },
      {
        tech: "Swift and Kotlin",
        reason:
          "The right answer when performance, battery life or platform-specific APIs drive the product. Background processing, complex camera or Bluetooth work, and AR all still justify native in 2026.",
      },
      {
        tech: "Firebase",
        reason:
          "Auth, storage and realtime data without operating a backend, which is usually the fastest route to a working app. It constrains you later, so we introduce it deliberately and migrate off it when scale or pricing demands.",
      },
      {
        tech: "App Store and Play Console",
        reason:
          "Shipping is a separate discipline from building. Review rejections, privacy declarations and phased rollouts stall more launches than engineering problems do, and they need to be planned for rather than discovered.",
      },
    ],
    faqs: [
      {
        question: "React Native or native development?",
        answer:
          "React Native when your UI is conventional and you want one codebase across both platforms. Native Swift and Kotlin when you need platform-specific APIs, heavy background work, or the absolute best performance in a specific area. We will give you a direct recommendation rather than defaulting to whichever is faster to quote.",
      },
      {
        question: "How do you handle app store review?",
        answer:
          "We manage submission, including the privacy nutrition labels Apple now requires. Rejections usually concern account deletion flows or vague descriptions, both of which we handle before submitting.",
      },
      {
        question: "Do you build for iOS and Android simultaneously?",
        answer:
          "Usually yes, on one codebase. If the requirements genuinely diverge we will say so early, because two native apps is a materially different budget and timeline.",
      },
      {
        question: "Can you take over an existing app?",
        answer:
          "Yes. We start with an audit of the codebase, build configuration and store history. Inherited apps usually carry real debt, and knowing the size of it early is what makes a plan possible.",
      },
    ],
  },

  "ai-ml-solutions": {
    deliverables: [
      "A working integration in your product, not a demonstration",
      "An evaluation harness so you can measure output quality before and after changes",
      "Cost and latency modelling for the model calls you will actually make",
      "Prompt and configuration management you can version and roll back",
      "Human review paths for decisions the system should not make alone",
      "Documentation covering the failure modes we expect",
    ],
    process: [
      {
        title: "Establish whether AI is the right tool at all",
        description:
          "A meaningful share of projects we are asked to quote do not need a model. If a deterministic rule handles your case, we will say so. The first deliverable is often that answer.",
      },
      {
        title: "Build the evaluation set before the feature",
        description:
          "Without a representative set of real cases you cannot tell whether a change improved the product or quietly broke it. We assemble this from your data before writing feature code, which is what makes iteration safe.",
      },
      {
        title: "Integrate with production discipline",
        description:
          "Caching, rate limiting, fallbacks, timeouts and cost ceilings are part of the integration, not an optimisation phase afterwards. An AI feature without a fallback is an outage waiting for a bad day.",
      },
      {
        title: "Ship with review and monitoring",
        description:
          "Critical decisions keep a human in the loop. Drift and regression monitoring are in place from launch so degradation is visible rather than reported by customers.",
      },
    ],
    idealFor: [
      "Teams with unstructured data and no practical way to process it manually",
      "Product teams adding AI features to an existing product rather than starting new",
      "Businesses automating document-heavy back-office workflows",
      "Companies evaluating whether a model approach is worth the engineering cost",
    ],
    timeline: "Evaluation prototype 2-4 weeks, production integration 6-14 weeks",
    support: "Evaluation monitoring and model upgrade support",
    stackRationale: [
      {
        tech: "Python",
        reason:
          "The dominant language for machine learning, with the deepest library ecosystem and the most available hiring pool. Using it for training and data work avoids the impedance mismatch of crossing into another runtime.",
      },
      {
        tech: "OpenAI and Anthropic APIs",
        reason:
          "Frontier models are now good enough that training your own is rarely the fastest route to value. We use hosted APIs for most work, which removes GPU procurement and infrastructure from the critical path entirely.",
      },
      {
        tech: "LangChain and orchestration",
        reason:
          "Chains models together with retrieval, tools and structured output. Used where it earns its complexity, and skipped where a direct API call is clearer and cheaper to maintain.",
      },
      {
        tech: "Vector databases",
        reason:
          "Pinecone or Qdrant for semantic search over your own documents. This is the practical route to retrieval-augmented generation without training anything.",
      },
      {
        tech: "TensorFlow and PyTorch",
        reason:
          "Still the right tools for fine-tuning and custom models where you have unique data and enough volume to justify the maintenance. Both are heavier operations than a hosted API call and should be a considered decision.",
      },
      {
        tech: "Evaluation and observability",
        reason:
          "The part most projects skip, and the reason quality regresses unnoticed. An evaluation set plus drift monitoring tells you whether a change helped, which is the only way to iterate on AI features without guessing.",
      },
    ],
    faqs: [
      {
        question: "Do we need our own machine learning models?",
        answer:
          "Rarely at the start. Most production value comes from integrating existing models well, with good evaluation and a sensible fallback. Fine-tuning or training from scratch only makes sense with unique data and volume that justifies the maintenance.",
      },
      {
        question: "Which model providers do you work with?",
        answer:
          "OpenAI, Anthropic and Google are the common choices, along with open-weight models through Hugging Face where cost or data residency requires it. We are provider-neutral by default and will recommend the cheapest option that meets your accuracy bar.",
      },
      {
        question: "How do you control AI cost?",
        answer:
          "We model cost per request before building, use caching aggressively, choose the smallest capable model, and put hard ceilings in place. AI features that are not costed before launch are the ones that become expensive later.",
      },
      {
        question: "How do you handle AI errors in production?",
        answer:
          "With fallbacks, retries, timeouts and human review on consequential decisions. Any system making decisions about money, people or safety keeps a person in the loop by default.",
      },
      {
        question: "Can you work with our existing data?",
        answer:
          "Yes. We regularly build retrieval pipelines over existing document stores and connect to the systems you already run. You keep ownership of the data and decide what leaves your infrastructure.",
      },
    ],
  },

  "cloud-infrastructure": {
    deliverables: [
      "Infrastructure defined as code, versioned and reviewable",
      "A CI/CD pipeline that deploys without manual steps",
      "Monitoring, alerting and logging configured before go-live",
      "A cost model with the specific line items that will grow",
      "Documented backup and restore, tested rather than assumed",
      "A rollback path that has been exercised at least once",
    ],
    process: [
      {
        title: "Audit what exists before changing it",
        description:
          "We inventory the current estate, find the spend that is not earning its keep, and identify the components that are genuinely at risk. Most infrastructure problems are diagnosable without a redesign.",
      },
      {
        title: "Design for the failure you will actually have",
        description:
          "Not every system needs multi-region redundancy, and over-engineering is expensive. We size resilience to the real cost of downtime for your business.",
      },
      {
        title: "Automate the deployment path end to end",
        description:
          "The goal is that deploying is boring. Manual steps are where incidents originate, and they are also where the most time is lost.",
      },
      {
        title: "Verify recovery, not just backup",
        description:
          "A backup you have never restored from is a hypothesis. We test restores in staging so that the first real recovery is not also the first rehearsal.",
      },
    ],
    idealFor: [
      "Teams whose cloud bill has grown faster than their traffic",
      "Businesses running production workloads on manual or undocumented setups",
      "Companies preparing for a security or compliance review",
      "Startups that need reliable infrastructure without a dedicated platform engineer",
    ],
    timeline: "Assessment 1-2 weeks, migration or build 4-12 weeks",
    support: "Cost monitoring and on-call support options",
    stackRationale: [
      {
        tech: "AWS, Azure and Google Cloud",
        reason:
          "We work across all three and do not push a particular vendor. The decision usually comes down to where your team already has expertise, since the running cost of an unfamiliar platform is far higher than any pricing difference.",
      },
      {
        tech: "Terraform",
        reason:
          "Infrastructure described in version control means changes are reviewable and reversible. A change applied by hand is invisible in the codebase and effectively undocumented, which is how small outages begin.",
      },
      {
        tech: "Docker",
        reason:
          "Removes the class of problem where an application works locally and fails in production because of an environment difference. It also makes scaling and rollback predictable.",
      },
      {
        tech: "Kubernetes",
        reason:
          "Justified by real scaling, scheduling or multi-team deployment needs. For a single service or a modest workload, managed container platforms are cheaper and far simpler, and we will usually recommend those instead.",
      },
      {
        tech: "CI/CD with GitHub Actions",
        reason:
          "Deployments stop being an event that can go wrong when they are a repeatable pipeline. This is also what makes rollback routine rather than an emergency procedure.",
      },
    ],
    faqs: [
      {
        question: "Do you work with our existing cloud provider?",
        answer:
          "Yes. AWS, Azure and Google Cloud all appear in production systems we maintain, and we migrate between them when the economics justify it. We do not push a provider for our own convenience.",
      },
      {
        question: "Can you reduce our cloud costs?",
        answer:
          "Usually. We start with a cost audit because the largest savings usually come from rightsizing, removing idle resources and fixing storage tiering, none of which require a migration. Savings are shared visibly in the reporting.",
      },
      {
        question: "Do you handle Kubernetes?",
        answer:
          "Only where it earns its operational cost. For a lot of teams, managed container services are cheaper and simpler than self-managed Kubernetes. We will tell you when we think it is not the right tool.",
      },
      {
        question: "What happens if our current setup fails?",
        answer:
          "We document the recovery path, set up alerting that would surface the failure, and make rollback routine. If nobody knows how to get back, that is the first thing we fix regardless of the original scope.",
      },
    ],
  },

  "ui-ux-design": {
    deliverables: [
      "A design system in Figma, structured as reusable components",
      "Interactive prototypes covering the flows that matter",
      "Accessibility decisions documented against WCAG 2.2 AA",
      "A responsive specification covering real breakpoints and content",
      "Developer handoff with tokens exported for implementation",
      "Usability findings from testing with real participants",
    ],
    process: [
      {
        title: "Research the problem before drawing anything",
        description:
          "Interviews, analytics and support tickets tell you where the actual friction is. Designing before that reliably produces work that is polished and solves the wrong problem.",
      },
      {
        title: "Structure the interface, then style it",
        description:
          "Layout, hierarchy and flow get settled first. Visual styling applied to an unresolved structure just makes the problems harder to see.",
      },
      {
        title: "Test with people who are not your team",
        description:
          "Internal review tells you what the team expects. Usability testing with actual users tells you what works. These are different questions and only one of them is useful.",
      },
      {
        title: "Hand off a system, not a folder of screens",
        description:
          "Components with clear states and constraints survive contact with development. Static mockups do not, and they get reinterpreted differently by every engineer who touches them.",
      },
    ],
    idealFor: [
      "Products with high drop-off in a specific step of the funnel",
      "Teams whose design and engineering output has drifted apart",
      "Companies preparing a redesign without a clear hypothesis",
      "Startups that need to validate an interface before funding the build",
    ],
    timeline: "Discovery 1-2 weeks, design 3-6 weeks",
    support: "Design system maintenance as the product evolves",
    stackRationale: [
      {
        tech: "Figma",
        reason:
          "The practical default for interface design. Shared libraries, variants and auto-layout map well to component-based code, and the designer and engineer can work in the same file.",
      },
      {
        tech: "Component-based design systems",
        reason:
          "Screens drawn as components rather than fixed layouts is what makes a design system enforceable in code. It also means redesigns touch a component once instead of four hundred screens.",
      },
      {
        tech: "Interactive prototypes",
        reason:
          "Testing a static screen tells you whether people like it. Testing a working flow tells you whether they can complete it, which is the question that actually predicts conversion.",
      },
      {
        tech: "Design tokens",
        reason:
          "Spacing, type scale and colour exported as values rather than eyeballed. This is what keeps implementation visually consistent six months later when the original designer has moved on.",
      },
    ],
    faqs: [
      {
        question: "Do you design and build, or just design?",
        answer:
          "Both, as one team. The people who make design decisions stay involved through implementation, which is where most design quality is lost. It also means we can tell you honestly when a design is expensive to build.",
      },
      {
        question: "What tools do you use?",
        answer:
          "Figma as the primary tool, with a documented component library and exported design tokens so implementation stays consistent with the design.",
      },
      {
        question: "Is accessibility included?",
        answer:
          "Yes, targeting WCAG 2.2 AA. We handle contrast, focus order, keyboard navigation, screen reader labelling and reduced motion. It is cheaper to build in than to retrofit.",
      },
      {
        question: "Will you work from an existing brand?",
        answer:
          "Yes. We extend existing brand systems into a usable product interface rather than reinventing the identity, and we flag the cases where a brand guideline genuinely conflicts with usability.",
      },
    ],
  },

  "digital-marketing": {
    deliverables: [
      "A technical SEO baseline covering crawlability, indexation and Core Web Vitals",
      "Content built around commercial intent rather than volume",
      "Technical fixes specified in developer-ready detail",
      "A measurement setup tied to pipeline, not vanity metrics",
      "Conversion experiments with a stated hypothesis and outcome",
      "A plain-language monthly report on what changed and why",
    ],
    process: [
      {
        title: "Establish the baseline before spending anything",
        description:
          "Traffic, rankings, conversions and technical health get measured first. Without a baseline you cannot tell whether later activity worked or whether the season did.",
      },
      {
        title: "Fix what blocks crawling and indexing",
        description:
          "Technical problems cap every other investment. We clear those first, because content and outreach cannot compound on a site that is not being crawled properly.",
      },
      {
        title: "Build around what buyers actually search",
        description:
          "We target the queries that indicate a real project rather than high volume and low intent. Traffic that never converts is expensive noise.",
      },
      {
        title: "Report against revenue, not impressions",
        description:
          "Rankings and sessions are diagnostics. The number that matters is qualified enquiries, and the report is written so a non-marketer can read it in two minutes.",
      },
    ],
    idealFor: [
      "B2B software companies whose traffic does not convert",
      "Businesses rebuilding a site that under-performs technically",
      "Teams that have been sold tactics by an agency and cannot tell what worked",
      "Companies that need marketing reported against pipeline for an investor or board",
    ],
    timeline: "Audit 2-3 weeks, ongoing programmes quarterly",
    support: "Monthly reporting and quarterly strategy review",
    stackRationale: [
      {
        tech: "Google Analytics 4 and Search Console",
        reason:
          "The measurement baseline. We use these for traffic and query data, and they are the reference point every reported change is judged against.",
      },
      {
        tech: "Ahrefs and Semrush",
        reason:
          "Competitive and backlink analysis that informs what to build and where links are worth pursuing. Tools for investigation rather than a source of traffic on their own.",
      },
      {
        tech: "Search Console and log analysis",
        reason:
          "Real query data from your own site beats any third-party estimate. Combined with server logs it shows exactly what Googlebot saw, which is how indexation problems get diagnosed rather than guessed at.",
      },
      {
        tech: "Structured data and technical auditing",
        reason:
          "Schema markup, internal linking and Core Web Vitals work. It is unglamorous, and it is usually what limits a site before content or links become the constraint.",
      },
    ],
    faqs: [
      {
        question: "How is this different from an SEO agency?",
        answer:
          "We are an engineering firm that does marketing, so the technical side is done by people who build the systems rather than by someone reading a checklist. Most of our engagements start with engineering work rather than content, because that is usually the constraint.",
      },
      {
        question: "Do you guarantee rankings?",
        answer:
          "No, and neither should you trust anyone who does. What we commit to is a defined scope of work, transparent measurement, and reporting that makes it clear what worked. Ranking guarantees are not something a technical provider can honestly deliver.",
      },
      {
        question: "How quickly will we see results?",
        answer:
          "Technical fixes can move things within weeks. Competitive rankings take three to six months to compound honestly. Anyone promising page one in thirty days is either buying placements or not measuring the right thing.",
      },
      {
        question: "Do you work alongside our internal marketing team?",
        answer:
          "Yes. A frequent arrangement is that we handle technical and search work while your team handles content and outbound. We are comfortable being the specialists rather than the whole department.",
      },
    ],
  },

  "saas-analytics": {
    deliverables: [
      "An event schema designed around your actual product questions",
      "A tracking plan your engineers can implement consistently",
      "Live dashboards for the metrics that drive decisions",
      "Funnel and cohort analysis wired to your activation definition",
      "Revenue and retention reporting alongside usage",
      "Documentation so new engineers instrument correctly without us",
    ],
    process: [
      {
        title: "Define the questions before choosing the tools",
        description:
          "Most analytics projects fail because nobody agreed what the business needed to know. We start with the decisions, then work out what data those decisions require.",
      },
      {
        title: "Design the event schema deliberately",
        description:
          "Event naming and properties are an interface. Get it wrong and you cannot fix historical data later, so this gets reviewed properly rather than assembled ad hoc during implementation.",
      },
      {
        title: "Instrument once, consistently",
        description:
          "We provide the tracking plan and review the implementation. Instrumentation is where analytics projects quietly break, and it is cheap to prevent.",
      },
      {
        title: "Connect usage to revenue",
        description:
          "Product usage only matters in relation to what customers pay. We connect behaviour to subscription data so the numbers support prioritisation rather than curiosity.",
      },
    ],
    idealFor: [
      "SaaS companies making roadmap decisions without reliable usage data",
      "Teams whose product analytics are assembled from ad hoc queries",
      "Businesses that need usage evidence to support a pricing change",
      "Product-led companies moving from growth experiments to systematic retention work",
    ],
    timeline: "Schema and tracking plan 1-2 weeks, dashboards 3-6 weeks",
    support: "Schema evolution and metric definition support",
    stackRationale: [
      {
        tech: "Event-based tracking",
        reason:
          "Capturing user actions as discrete events rather than page views is what makes funnels and cohorts possible at all. Page-view analytics cannot answer why users leave a flow.",
      },
      {
        tech: "PostgreSQL",
        reason:
          "A well-indexed relational store handles behavioural event volumes at a fraction of the cost of a dedicated analytics warehouse, and keeps your data joinable with subscription and billing records.",
      },
      {
        tech: "D3.js and Chart.js",
        reason:
          "For dashboards that need real interactivity and custom visualisation. Where the requirement is straightforward, a simpler charting approach keeps maintenance lower.",
      },
      {
        tech: "Documented event schema",
        reason:
          "The single highest-leverage decision in an analytics build. Naming and properties form an interface you cannot retroactively change, so it gets reviewed up front rather than assembled during implementation.",
      },
    ],
    faqs: [
      {
        question: "What can we track?",
        answer:
          "User behaviour, feature adoption, revenue and subscription metrics, funnels, cohorts and retention, plus custom events you define. The schema is built around the questions your team needs answered, which is what keeps it maintainable.",
      },
      {
        question: "Do we need to replace our current tools?",
        answer:
          "Not usually. We work with the analytics stack you have and add what is missing. Replacing a working stack mid-cycle costs more than it returns, so we only recommend it when the current tools genuinely cannot answer your questions.",
      },
      {
        question: "Is this suitable for an early-stage startup?",
        answer:
          "Yes, though we would start with a tracking plan and a small set of dashboards rather than a full platform. Early stage, the priority is instrumenting correctly once, not building sophisticated reporting.",
      },
      {
        question: "How do you keep the data trustworthy?",
        answer:
          "By agreeing definitions up front, reviewing the instrumentation, and writing the metric definitions down so everyone means the same thing by activation, retention or churn. Most disagreements about analytics turn out to be disagreements about definitions.",
      },
    ],
  },

  "e-commerce-development": {
    deliverables: [
      "A production storefront deployed to your domain with SSL and CDN",
      "Full product catalogue, collections and variant configuration",
      "Payment gateway integration with Stripe or your preferred provider",
      "Order management, fulfilment hooks and inventory sync",
      "Analytics pipeline covering sessions, funnel steps and revenue attribution",
      "A handover session covering the admin panel, order flow and deployment process",
    ],
    process: [
      {
        title: "Platform decision first",
        description:
          "We start by mapping your catalogue structure, pricing rules and fulfilment requirements against the platforms on offer. Most businesses land on Shopify. When they do not, we say so early, before any code is written.",
      },
      {
        title: "Design against real products",
        description:
          "Mockups are built around your actual catalogue, real image aspect ratios, real title lengths and real pricing structures. A design that only works with a single product variant is not a design that works.",
      },
      {
        title: "Checkout conversion is engineered, not assumed",
        description:
          "Form fields, trust signals, cart logic and error states are reviewed against conversion research, not left to defaults. We reduce friction at every step that stands between a browser and a completed order.",
      },
      {
        title: "Performance verified before launch",
        description:
          "Storefront load time and Core Web Vitals are checked on real mobile hardware before launch, not in a lighthouse simulator on a desktop. Images, fonts and third-party scripts are audited and trimmed to budget.",
      },
    ],
    stackRationale: [
      {
        tech: "Shopify",
        reason:
          "The widest ecosystem of payment gateways, fulfilment providers and third-party apps of any hosted platform. The right default unless your data model or pricing rules cannot fit inside Shopify's structures.",
      },
      {
        tech: "Medusa.js",
        reason:
          "An open-source headless commerce engine that gives you full control over the data model and business logic when Shopify's constraints become real constraints rather than hypothetical ones.",
      },
      {
        tech: "Next.js",
        reason:
          "Handles server-side rendering and static generation for product pages, which is what makes a large catalogue rank in search and load quickly on slow connections.",
      },
      {
        tech: "Algolia",
        reason:
          "Search that returns results in milliseconds, handles typos, and supports merchandising rules. Native platform search is adequate for catalogues under a few hundred products; anything larger benefits from a dedicated search service.",
      },
      {
        tech: "Stripe",
        reason:
          "The most complete payment and fraud infrastructure available. Handles card payments, wallets, buy-now-pay-later and recurring billing from a single integration, with strong documentation and predictable pricing.",
      },
    ],
    idealFor: [
      "Brands moving from a legacy Magento or WooCommerce store to a faster, lower-maintenance platform",
      "Direct-to-consumer businesses launching their first owned channel",
      "B2B businesses that need quote workflows, tier pricing or account-level catalogues",
      "Retailers adding an online channel to complement physical stores",
    ],
    timeline: "Simple Shopify theme: 2-4 weeks. Custom storefront or headless build: 8-14 weeks.",
    support: "30-day post-launch warranty included. Ongoing retainer available for content, promotions and platform updates.",
    faqs: [
      {
        question: "Should I use Shopify or a custom platform?",
        answer:
          "Shopify is the right default for most product-led businesses. The platform, the payment ecosystem and the app store cover the majority of commerce requirements without custom code. A custom or headless platform makes sense when your catalogue structure, pricing rules or fulfilment logic genuinely cannot be expressed inside Shopify's data model.",
      },
      {
        question: "Do you build headless storefronts?",
        answer:
          "Yes. A headless approach uses the commerce platform for inventory, orders and checkout while serving the frontend through a separate Next.js application. The benefit is full control over performance and UX. The trade-off is higher build and maintenance cost. We will recommend it only when the gain justifies it.",
      },
      {
        question: "How do you handle payment and tax compliance?",
        answer:
          "We integrate with Stripe, PayPal and regional gateways and configure tax calculation through your platform or a service such as TaxJar. We ensure the plumbing is correct; legal advice on tax obligations in specific jurisdictions is outside our scope.",
      },
      {
        question: "Can you migrate our existing product catalogue?",
        answer:
          "Yes. We handle catalogue migration from Magento, WooCommerce, Squarespace Commerce and most CSV-exportable platforms. The migration includes products, variants, images, historical orders where the target platform supports it, and customer accounts where it is legally straightforward.",
      },
      {
        question: "What happens if traffic spikes during a sale or launch?",
        answer:
          "For Shopify-based builds, traffic scaling is managed by the platform. For custom storefronts, we deploy to infrastructure that scales horizontally and run load tests before a known high-traffic event so there are no surprises.",
      },
    ],
  },
  "custom-software": {
    deliverables: [
      "Production deployment on your own cloud provider with complete CI/CD automation",
      "Clean, modular domain architecture with typed schemas and complete source code ownership",
      "Role-based access control (RBAC) and security policy configuration",
      "Interactive API documentation and comprehensive database migration files",
      "Automated unit and integration test suites covering critical business paths",
      "Handover sessions with technical documentation and architecture blueprints",
    ],
    process: [
      {
        title: "Domain modelling & workflow discovery",
        description:
          "We map out your business logic, system boundaries, and data dependencies before writing application code. Clear domain boundaries prevent costly architecture rewrites later.",
      },
      {
        title: "Iterative sprint delivery & working prototypes",
        description:
          "We ship testable, clickable software increments every two weeks, giving you immediate visibility into progress and letting you refine requirements while changes are straightforward.",
      },
      {
        title: "Rigorous automated testing & security audits",
        description:
          "Every PR undergoes automated linting, type validation, regression testing, and dependency scanning to ensure stability and zero vulnerabilities.",
      },
      {
        title: "Cloud rollout & operational handover",
        description:
          "We deploy directly into your cloud accounts, wire up monitoring and automated alerts, and train your engineering or operations team on system maintenance.",
      },
    ],
    idealFor: [
      "Organizations with proprietary workflows that off-the-shelf software cannot accommodate",
      "Companies paying steep per-user SaaS licenses seeking an owned software asset",
      "Teams consolidating multiple fragmented internal tools into a unified portal",
      "Fast-scaling businesses outgrowing manual spreadsheets and basic no-code tools",
    ],
    timeline: "Core business applications 8-16 weeks, complex enterprise platforms 16-24 weeks",
    support: "60 days warranty post-launch with ongoing monthly SLA support options",
    stackRationale: [
      {
        tech: "Next.js & TypeScript",
        reason:
          "End-to-end type safety between frontend interfaces and server actions prevents runtime crashes and ensures code maintainability.",
      },
      {
        tech: "Node.js / Python / Go",
        reason:
          "Provides battle-tested performance and rich package ecosystems for business automation, microservices, and high-throughput data processing.",
      },
      {
        tech: "PostgreSQL",
        reason:
          "ACID compliance and relational integrity guarantee zero data corruption for critical operational and financial transactions.",
      },
      {
        tech: "Docker & AWS",
        reason:
          "Containerization guarantees consistency across local development, staging, and production environments with effortless cloud autoscaling.",
      },
    ],
    faqs: [
      {
        question: "Who owns the code and intellectual property?",
        answer:
          "You do. 100% of the code, repositories, infrastructure configurations, and credentials belong to your company from day one.",
      },
      {
        question: "Can the software connect with our existing tools?",
        answer:
          "Yes. We engineer secure REST, GraphQL, or webhook integrations with your existing CRMs, accounting systems, ERPs, and cloud storage.",
      },
      {
        question: "What happens if our requirements evolve midway?",
        answer:
          "We review backlogs at the start of each two-week sprint. You can reprioritize features freely within sprint boundaries, ensuring the final build fits current business realities.",
      },
    ],
  },
  "enterprise-software": {
    deliverables: [
      "Enterprise-grade distributed system deployed with multi-region redundancy and high availability",
      "SOC2, HIPAA, or GDPR compliance audit documentation and encryption key management",
      "Bidirectional integrations with SAP, Oracle, Salesforce, or existing legacy mainframes",
      "Comprehensive automated test suites including end-to-end, regression, and load testing",
      "Centralized logging, distributed tracing, and real-time observability telemetry",
      "Full disaster recovery runbooks and technical training for enterprise sysadmins",
    ],
    process: [
      {
        title: "Enterprise compliance & architecture review",
        description:
          "We assess your security frameworks, data residency requirements, and legacy integration points to create a zero-downtime architecture plan.",
      },
      {
        title: "Modular microservices & event streaming build",
        description:
          "We construct decoupled services communicating via message brokers (Kafka/RabbitMQ) to ensure isolated failures never cascade to core systems.",
      },
      {
        title: "Stress testing & penetration audits",
        description:
          "We simulate massive transaction spikes with distributed load testing tools and perform penetration testing before production sign-off.",
      },
      {
        title: "Blue-green deployment & SLA handover",
        description:
          "We execute zero-downtime blue-green deployments, verify real-time telemetry, and transition operational runbooks to your IT leadership.",
      },
    ],
    idealFor: [
      "Enterprises managing high-concurrency transactional volume with strict SLA tolerances",
      "Regulated companies requiring verifiable SOC2, HIPAA, or ISO 27001 data compliance",
      "Large organizations needing unified workflows across disparate ERP and CRM silos",
      "Institutions modernizing legacy core business platforms without risking outages",
    ],
    timeline: "12-24 weeks depending on security, compliance, and legacy integration depth",
    support: "90 days warranty with enterprise 24/7 on-call SLA options",
    stackRationale: [
      {
        tech: "Java / Go",
        reason:
          "Offers exceptional throughput, predictable memory usage, and robust multi-threading for compute-heavy enterprise backends.",
      },
      {
        tech: "Apache Kafka",
        reason:
          "Provides immutable, high-throughput distributed event streaming for reliable cross-service data propagation.",
      },
      {
        tech: "Kubernetes",
        reason:
          "Standardizes container orchestration, automated self-healing, rolling updates, and elastic horizontal pod scaling.",
      },
      {
        tech: "Terraform",
        reason:
          "Infrastructure as Code (IaC) ensures repeatable, auditable cloud provisioning across staging, DR, and production regions.",
      },
    ],
    faqs: [
      {
        question: "How do you guarantee high availability and zero downtime?",
        answer:
          "We deploy multi-availability-zone architectures with automated health checks, blue-green deployment pipelines, and database read-replicas.",
      },
      {
        question: "Can you sign NDAs and enterprise vendor agreements?",
        answer:
          "Yes. We routinely work under enterprise MSAs, mutual NDAs, and vendor compliance frameworks.",
      },
    ],
  },
  "api-backend": {
    deliverables: [
      "Production-ready REST and/or GraphQL API gateway with OpenAPI/Swagger specifications",
      "Modular microservices architecture with asynchronous message queuing and caching",
      "Granular authentication using JWT, OAuth2, and scoped API key management",
      "Rate limiting, request throttling, and DDoS mitigation policies configured at edge",
      "Automated contract testing and integration test suites wired into CI/CD",
      "Distributed tracing, centralized log aggregation, and real-time uptime monitoring",
    ],
    process: [
      {
        title: "API contract & data modelling",
        description:
          "We design clear, typed API schemas and endpoint contracts before implementation, ensuring web and mobile clients can develop in parallel.",
      },
      {
        title: "High-throughput service implementation",
        description:
          "We build stateless backend services with optimized database query execution, connection pooling, and multi-tier Redis caching.",
      },
      {
        title: "Load testing & concurrency benchmarking",
        description:
          "We benchmark endpoints under simulated production concurrency with k6, tuning bottlenecks to achieve sub-50ms response times.",
      },
      {
        title: "Production rollout & documentation delivery",
        description:
          "We launch the API behind a secure reverse proxy or cloud gateway, providing complete developer documentation and SDK examples.",
      },
    ],
    idealFor: [
      "Companies powering multiple frontend clients (web, iOS, Android, IoT) from a single core",
      "SaaS businesses opening developer APIs or partner integration ecosystems",
      "Applications experiencing database bottlenecks under heavy concurrent request volumes",
      "Teams decoupling monolithic backends into agile, maintainable microservices",
    ],
    timeline: "4-8 weeks for focused microservices or API gateways, 8-14 weeks for complex backends",
    support: "30 days warranty with optional 24/7 monitoring and response agreements",
    stackRationale: [
      {
        tech: "Node.js & Go",
        reason:
          "Node provides incredible ecosystem speed for REST/GraphQL endpoints; Go provides raw concurrent throughput for performance-critical microservices.",
      },
      {
        tech: "Redis",
        reason:
          "Sub-millisecond in-memory caching and distributed locking dramatically lower database load and accelerate response times.",
      },
      {
        tech: "PostgreSQL & Prisma",
        reason:
          "Combines the robustness of relational databases with type-safe query generation and automated migration management.",
      },
      {
        tech: "Docker & AWS ECS",
        reason:
          "Lightweight containerization allows instant horizontal scaling as request traffic surges.",
      },
    ],
    faqs: [
      {
        question: "Do you supply documentation for frontend or third-party developers?",
        answer:
          "Yes. Every API includes an interactive Swagger / OpenAPI portal and typed TypeScript client definitions for seamless consumption.",
      },
      {
        question: "How do you secure endpoints against abuse?",
        answer:
          "We enforce rate limiting, IP throttling, strict CORS headers, JWT expiration validation, and input sanitization on all exposed endpoints.",
      },
    ],
  },
  "crm-erp-solutions": {
    deliverables: [
      "Custom web-based CRM/ERP platform tailored to your organization's exact workflows",
      "Lead management, sales pipeline, and customer lifecycle tracking dashboards",
      "Inventory management, order processing, and supplier tracking modules",
      "Automated PDF invoicing, payment processing, and recurring subscription billing",
      "Role-based permission hierarchy safeguarding confidential payroll and customer records",
      "Data migration scripts and historical data import from spreadsheets and legacy tools",
    ],
    process: [
      {
        title: "Operational workflow audit",
        description:
          "We analyze how your sales, inventory, and operations teams currently communicate, identifying friction points, duplicates, and manual data-entry bottlenecks.",
      },
      {
        title: "Unified database architecture",
        description:
          "We model an integrated schema that ties customers, deals, products, inventory, and invoices into a single synchronized relational core.",
      },
      {
        title: "Module-by-module agile rollout",
        description:
          "We deploy core modules (e.g. Sales CRM first, followed by Inventory and Invoicing) allowing your staff to adapt smoothly without operational overwhelm.",
      },
      {
        title: "Staff training & legacy decommissioning",
        description:
          "We import your historical data, train department leaders with recorded video sessions, and safely sunset legacy spreadsheets.",
      },
    ],
    idealFor: [
      "Companies constrained by inflexible off-the-shelf software or paying exorbitant per-seat fees",
      "Growing businesses drowning in disconnected spreadsheets across multiple offices",
      "Wholesale, manufacturing, and distribution businesses requiring bespoke inventory rules",
      "Service firms needing combined customer tracking, project delivery, and billing",
    ],
    timeline: "8-16 weeks for targeted CRM or ERP modules, 16-24 weeks for full-suite platforms",
    support: "60 days warranty with ongoing workflow enhancements and staff support",
    stackRationale: [
      {
        tech: "Next.js & React",
        reason:
          "Delivers fast, responsive web dashboards that staff can access on desktop, tablet, or mobile in the field.",
      },
      {
        tech: "PostgreSQL",
        reason:
          "Enforces strict relational constraints and audit logs essential for accounting, stock balance, and order histories.",
      },
      {
        tech: "Tailwind CSS",
        reason:
          "Enables highly legible, dense data tables, interactive kanban boards, and status indicators without UI bloat.",
      },
      {
        tech: "Stripe / Plaid",
        reason:
          "Automates client payments, ACH direct debits, and invoice reconciliation securely.",
      },
    ],
    faqs: [
      {
        question: "Can we migrate our historical data without downtime?",
        answer:
          "Yes. We run test migration dry runs against staging databases, validate record integrity with your team, and perform the final migration off-hours.",
      },
      {
        question: "Can field staff access the CRM on mobile devices?",
        answer:
          "Yes. The interface is fully responsive, optimized for smartphones and tablets with touch-friendly controls.",
      },
    ],
  },
  "software-modernization": {
    deliverables: [
      "Modern, cloud-native codebase refactored from legacy frameworks into modern TypeScript/Next.js/Node",
      "Zero-downtime strangler-fig migration architecture isolating legacy risk",
      "Comprehensive automated regression test suite safeguarding core domain logic",
      "Containerized deployment pipelines (Docker, Kubernetes) on modern cloud infrastructure",
      "Modernized database schemas with automated migration tracking and clean indexes",
      "Developer onboarding documentation and architectural transition guides",
    ],
    process: [
      {
        title: "Legacy codebase audit & risk mapping",
        description:
          "We inspect your existing repository, database schemas, and external dependencies to pinpoint technical debt, security gaps, and decoupleable modules.",
      },
      {
        title: "Strangler-fig proxy implementation",
        description:
          "We place a modern API gateway in front of your legacy system, allowing new features to be built on modern stacks while legacy endpoints run undisturbed.",
      },
      {
        title: "Incremental module extraction",
        description:
          "We peel off legacy modules one by one into clean, well-tested services, verifying output equivalence using shadow traffic before switching live routes.",
      },
      {
        title: "Final cutover & legacy decommissioning",
        description:
          "Once all modules are modernized, we decommission legacy servers, eliminating outdated hosting expenses and licensing liabilities.",
      },
    ],
    idealFor: [
      "Businesses running critical software on deprecated frameworks (PHP 5/7, AngularJS, ASP.NET WebForms)",
      "Teams where making small changes in a monolithic codebase causes frequent production regressions",
      "Companies struggling to hire or retain developers willing to work on obsolete technology stacks",
      "Organizations paying excessive hosting and maintenance costs on aging dedicated servers",
    ],
    timeline: "Incremental milestones every 4 weeks; full project duration 12-24 weeks",
    support: "60 days warranty per milestone with ongoing post-migration optimization",
    stackRationale: [
      {
        tech: "TypeScript & Next.js",
        reason:
          "Modernizes UI rendering, boosts performance, and equips your team with the industry's most popular, hireable stack.",
      },
      {
        tech: "Docker & Kubernetes",
        reason:
          "Eliminates 'works on my machine' configuration bugs and enables instant rollbacks and painless cloud migrations.",
      },
      {
        tech: "PostgreSQL",
        reason:
          "Modern relational features (JSONB, logical replication) provide a clean target for migrating off legacy databases.",
      },
    ],
    faqs: [
      {
        question: "Is a complete rewrite better than incremental modernization?",
        answer:
          "Complete rewrites fail over 70% of the time because business rules accumulated over years are forgotten. Incremental modernization proves value every 2-4 weeks with near-zero operational risk.",
      },
      {
        question: "How do you ensure zero data loss during database migrations?",
        answer:
          "We use dual-write and logical replication techniques, allowing both legacy and modern databases to stay synchronized until the cutover is validated.",
      },
    ],
  },
  "database-design": {
    deliverables: [
      "Production-ready normalized relational schema (PostgreSQL/MySQL) or document model (MongoDB)",
      "Optimized index architectures, foreign key constraints, and integrity triggers",
      "Query performance tuning report with EXPLAIN analysis and benchmark metrics",
      "Automated migration scripts using modern schema management tools (Prisma, Flyway)",
      "Disaster recovery, automated point-in-time backup, and replication topology configuration",
      "Comprehensive data dictionary and entity-relationship diagrams (ERDs)",
    ],
    process: [
      {
        title: "Data modelling & entity mapping",
        description:
          "We analyze your transactional use cases, access patterns, and query frequencies to design normalized, efficient schemas that prevent anomalies.",
      },
      {
        title: "Index strategy & constraint hardening",
        description:
          "We configure composite indexes, partial indexes, and unique constraints to guarantee lightning-fast lookups without bloating write costs.",
      },
      {
        title: "Benchmarking & stress testing",
        description:
          "We run synthetic load tests simulating millions of records and concurrent connections, fine-tuning memory buffers, connection pools, and query plans.",
      },
      {
        title: "High-availability deployment & replication",
        description:
          "We deploy the database across multi-AZ configurations with automated read-replicas, failover automation, and encrypted backups.",
      },
    ],
    idealFor: [
      "Applications experiencing slow page loads, query timeouts, and database CPU spikes",
      "New software ventures requiring an architecture built right from the ground up",
      "Companies preparing for massive user growth, seasonal traffic surges, or enterprise clients",
      "Teams needing to migrate safely from unstructured no-code databases to robust SQL",
    ],
    timeline: "2-4 weeks for new schema architecture; 4-8 weeks for complex database refactoring and tuning",
    support: "30 days post-deployment performance monitoring and query review warranty",
    stackRationale: [
      {
        tech: "PostgreSQL",
        reason:
          "The gold standard for transactional data integrity, rich indexing (GIN, GiST, BRIN), and native JSONB flexibility.",
      },
      {
        tech: "Redis",
        reason:
          "In-memory caching layer that eliminates redundant database roundtrips for hot keys and session states.",
      },
      {
        tech: "Prisma",
        reason:
          "Provides end-to-end type safety, automated migration histories, and eliminates SQL injection vulnerabilities.",
      },
    ],
    faqs: [
      {
        question: "Can you fix query bottlenecks without rewriting our entire application?",
        answer:
          "Yes. In most cases, adding strategic composite indexes, connection pooling, and caching resolves 80%+ of database latency without code changes.",
      },
      {
        question: "How do you handle zero-downtime schema migrations?",
        answer:
          "We employ expand-and-contract migration patterns, adding nullable columns or views first so older code continues operating smoothly during deploys.",
      },
    ],
  },
  "third-party-api-integration": {
    deliverables: [
      "Robust API connectors with automated authentication, token refresh, and rate-limit governance",
      "Resilient webhook ingestion pipeline with cryptographic signature verification",
      "Idempotency controls, retry mechanisms, and dead-letter queues for failed events",
      "Data transformation and normalization middleware bridging external and internal schemas",
      "Interactive integration health dashboard with real-time delivery telemetry and error logs",
      "Comprehensive developer documentation and integration testing suites",
    ],
    process: [
      {
        title: "Integration mapping & API discovery",
        description:
          "We review the third-party API specifications, rate limits, webhook guarantees, and error formats, designing reliable contract boundaries.",
      },
      {
        title: "Queue-backed connector development",
        description:
          "We build asynchronous workers that buffer incoming events and outgoing requests through durable queues (BullMQ/SQS), preventing data loss.",
      },
      {
        title: "Edge-case & failure simulation",
        description:
          "We rigorously test edge cases: third-party downtime, rate-limiting HTTP 429s, duplicate webhook payloads, and malformed responses.",
      },
      {
        title: "Live cutover & monitoring setup",
        description:
          "We configure production webhook endpoints, verify cryptographic signatures, and set up automated alerting for any integration anomalies.",
      },
    ],
    idealFor: [
      "Products needing seamless payments, payouts, and subscriptions via Stripe or PayPal",
      "Companies integrating customer activity directly into Salesforce, HubSpot, or Klaviyo",
      "Logistics and e-commerce platforms connecting with carriers, ERPs, and inventory feeds",
      "SaaS applications offering bi-directional syncing with third-party productivity tools",
    ],
    timeline: "2-4 weeks for standard SaaS APIs (Stripe, HubSpot), 4-8 weeks for custom enterprise feeds",
    support: "30 days warranty with ongoing integration maintenance and API version update options",
    stackRationale: [
      {
        tech: "Node.js & TypeScript",
        reason:
          "Non-blocking event-driven architecture handles high-volume webhook streams effortlessly with full type safety.",
      },
      {
        tech: "Redis & BullMQ",
        reason:
          "Provides battle-tested persistent queuing, exponential backoff retries, and job deduplication.",
      },
      {
        tech: "PostgreSQL",
        reason:
          "Stores idempotent transaction logs and webhook delivery receipts for auditable reconciliation.",
      },
    ],
    faqs: [
      {
        question: "What happens if a third-party API is temporarily down?",
        answer:
          "Our queue automatically schedules retries using exponential backoff with jitter. If failures persist, jobs enter a dead-letter queue with alerts, ensuring zero lost data.",
      },
      {
        question: "How do you prevent duplicate charges or double records?",
        answer:
          "We enforce idempotency keys on every transaction and store incoming event IDs, rejecting duplicate payloads before processing business logic.",
      },
    ],
  },
  "mvp-development": {
    deliverables: [
      "Full-stack, production-grade Minimum Viable Product deployed on scalable cloud infrastructure",
      "Essential core feature set prioritized for high user engagement and problem validation",
      "Secure user authentication (social logins, magic links, or passwordless) and profiles",
      "Payment processing and subscription monetization integration (Stripe / LemonSqueezy)",
      "Embedded product analytics (PostHog / Mixpanel) tracking conversion funnels and user actions",
      "Clean, well-documented repository ready for handoff or rapid feature expansion",
    ],
    process: [
      {
        title: "Scope ruthless prioritization",
        description:
          "We trim unnecessary features to isolate the single core value proposition that solves your target customer's pain point.",
      },
      {
        title: "Rapid wireframing & clickable prototype",
        description:
          "We create interactive Figma prototypes within days, ensuring UX clarity before writing any production code.",
      },
      {
        title: "Full-stack agile build sprints",
        description:
          "We build the application in fast 1-week sprints using modern full-stack frameworks, delivering working demo builds weekly.",
      },
      {
        title: "Production launch & analytics telemetry",
        description:
          "We launch your MVP on production domains, configure SSL, SEO, and analytics, and ensure you are ready to onboard real paying customers.",
      },
    ],
    idealFor: [
      "Startup founders validating an innovative concept before raising external funding",
      "Established companies launching new digital business units or experimental products",
      "Businesses needing a working production platform to pitch angel investors and VCs",
      "Entrepreneurs looking to test market demand with minimal financial risk",
    ],
    timeline: "4-8 weeks from kickoff to live production launch",
    support: "30 days post-launch warranty with immediate post-MVP scaling roadmap options",
    stackRationale: [
      {
        tech: "Next.js & React",
        reason:
          "Allows building frontend and backend in one unified, ultra-fast framework, cutting development time nearly in half.",
      },
      {
        tech: "Supabase / PostgreSQL",
        reason:
          "Provides instant auth, database, and storage out of the box without locking you into proprietary architectures.",
      },
      {
        tech: "Tailwind CSS",
        reason:
          "Accelerates UI development and delivers clean, modern aesthetics without bloat.",
      },
      {
        tech: "Stripe",
        reason:
          "Enables immediate payment collection and subscription billing from day one.",
      },
    ],
    faqs: [
      {
        question: "Is this MVP disposable or can we scale it?",
        answer:
          "We never build disposable prototypes. We use standard production architecture (Next.js, TypeScript, PostgreSQL) so you can seamlessly build on it for years.",
      },
      {
        question: "What is required from me during the build?",
        answer:
          "A 45-minute sprint review call each week to test the latest build, give feedback, and confirm priorities for the next sprint.",
      },
    ],
  },
  "qa-testing": {
    deliverables: [
      "Automated end-to-end regression test suite (Playwright / Cypress) covering critical user journeys",
      "CI/CD integration running automated test gates on every commit and pull request",
      "Load and stress testing scripts (k6) with performance bottleneck diagnostics",
      "Cross-browser and cross-device visual testing matrix report",
      "API contract validation test suite with schema validation",
      "Security audit report highlighting dependency vulnerabilities and OWASP checks",
    ],
    process: [
      {
        title: "Test strategy & critical path mapping",
        description:
          "We identify your highest-risk revenue flows (checkout, authentication, onboarding) to prioritize test automation for maximum ROI.",
      },
      {
        title: "Automated test suite authoring",
        description:
          "We write clean, resilient Page Object Model tests using Playwright or Cypress that run fast and do not suffer from flakiness.",
      },
      {
        title: "CI/CD pipeline integration",
        description:
          "We wire the test suite into GitHub Actions, GitLab CI, or your deployment pipeline, automatically blocking broken PRs from merging.",
      },
      {
        title: "Load benchmarking & reporting",
        description:
          "We run simulated peak-traffic stress tests, document response degradation points, and deliver a clear remediation roadmap.",
      },
    ],
    idealFor: [
      "Fast-moving engineering teams tired of manual regression testing before each release",
      "Applications experiencing frequent user-reported bugs and regressions in production",
      "E-commerce or fintech platforms preparing for major promotional sales or traffic spikes",
      "Companies undergoing compliance audits or client vendor security reviews",
    ],
    timeline: "2-4 weeks for core automated regression suite; 4-6 weeks for full end-to-end and load testing",
    support: "30 days warranty with options for ongoing automated test maintenance",
    stackRationale: [
      {
        tech: "Playwright",
        reason:
          "The fastest, most reliable headless browser automation tool with native support for Chromium, WebKit, and Firefox.",
      },
      {
        tech: "k6",
        reason:
          "Developer-centric load testing written in JavaScript, generating tens of thousands of concurrent virtual users.",
      },
      {
        tech: "GitHub Actions",
        reason:
          "Runs tests automatically on every pull request with visual diff artifacts and test run videos.",
      },
    ],
    faqs: [
      {
        question: "Can you automate tests for our existing live application?",
        answer:
          "Yes. End-to-end tests run from the outside like real users in real browsers, so we can build a complete test suite without touching your source code.",
      },
      {
        question: "How do you avoid flaky tests that fail randomly?",
        answer:
          "We enforce auto-waiting locators, deterministic test data seeding, and test isolation, eliminating arbitrary sleep timers that cause flakiness.",
      },
    ],
  },
  "software-maintenance": {
    deliverables: [
      "24/7 automated uptime, health, and error telemetry with real-time alerting",
      "Guaranteed response-time SLA for critical production incidents",
      "Monthly security patch updates, library dependency upgrades, and vulnerability remediation",
      "Continuous database query optimization, log rotation, and cloud cost management",
      "Dedicated monthly engineering hours for feature enhancements, bug fixes, and UI polish",
      "Comprehensive monthly operational reports detailing uptime, performance, and completed tasks",
    ],
    process: [
      {
        title: "System onboarding & security audit",
        description:
          "We review your repository, server architecture, dependencies, and environment configurations, resolving immediate security vulnerabilities.",
      },
      {
        title: "Observability & alert wiring",
        description:
          "We install telemetry probes (Datadog, Sentry, CloudWatch) with thresholds routed to on-call engineering alerts.",
      },
      {
        title: "Proactive monthly maintenance cycles",
        description:
          "We update dependencies, patch OS and runtime security vulnerabilities, tune database indexes, and trim unused cloud resources.",
      },
      {
        title: "Sprint feature delivery & reporting",
        description:
          "We use allocated maintenance hours to implement backlog improvements and deliver a monthly health summary to your leadership.",
      },
    ],
    idealFor: [
      "Businesses needing dependable technical coverage without hiring full-time internal DevOps/sysadmins",
      "Companies with live revenue-generating applications that cannot afford downtime",
      "Founders who outsourced their original build and now need ongoing technical stewardship",
      "Organizations seeking predictable monthly software maintenance expenses",
    ],
    timeline: "Immediate onboarding within 48-72 hours; ongoing monthly engagement",
    support: "Continuous monthly SLA with 15–30 minute emergency response times",
    stackRationale: [
      {
        tech: "Datadog / Sentry",
        reason:
          "Provides instant stack-trace error capture and performance anomaly detection before users report issues.",
      },
      {
        tech: "AWS / Cloudflare",
        reason:
          "Provides enterprise-grade CDN caching, DDoS mitigation, and SSL certificate management.",
      },
      {
        tech: "Docker & GitHub Actions",
        reason:
          "Automates safe staging deployments and zero-downtime production releases.",
      },
    ],
    faqs: [
      {
        question: "What if a critical bug happens on a weekend or holiday?",
        answer:
          "Our on-call engineering team monitors high-severity alerts 24/7/365 with guaranteed response times under our support agreements.",
      },
      {
        question: "Can unused monthly maintenance hours roll over?",
        answer:
          "Yes, up to 50% of unused hours can roll over into the following month for larger feature sprints.",
      },
    ],
  },
};

export function getServiceContent(slug: string): ServiceContent | undefined {
  const content = serviceContent[slug];

  if (!content && process.env.NODE_ENV !== "production") {
    console.warn(
      `[service-content] No editorial content for slug "${slug}". The page will fall back to the ` +
        `short copy on the service record and lose its deliverables, process, timeline, support ` +
        `and editorial FAQ sections.`
    );
  }

  return content;
}
