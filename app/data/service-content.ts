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
