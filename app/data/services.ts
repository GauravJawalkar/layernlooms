export interface Service {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    metaDescription?: string;
    icon: string;
    image: string;
    features: string[];
    benefits: string[];
    technologies: string[];
    isCoreService?: boolean;
    pricing?: {
        starter?: string;
        professional?: string;
        enterprise?: string;
    };
    faqs?: {
        question: string;
        answer: string;
    }[];
}

export const services: Service[] = [
    {
        slug: "web-development",
        title: "Web Development",
        subtitle: "Modern, Scalable Web Applications",
        description: "Build powerful web applications with cutting-edge technologies",
        isCoreService: true,
        longDescription: "Our web development services deliver high-performance, scalable, and secure web applications tailored to your business needs. We use the latest frameworks and best practices to ensure your web presence stands out.",
        metaDescription: "Custom web application development in React, Next.js and Node.js. Scalable, secure, SEO-first builds from $5,000. Book a free scoping call.",
        icon: "/icons/web-dev.svg",
        image: "/services/02-web-app.svg",
        features: [
            "Custom Web Applications",
            "Responsive Design",
            "Progressive Web Apps (PWA)",
            "API Development & Integration",
            "E-commerce Solutions",
            "Content Management Systems"
        ],
        benefits: [
            "Increased user engagement",
            "Faster time to market",
            "Scalable architecture",
            "SEO optimization",
            "Cross-browser compatibility",
            "24/7 technical support"
        ],
        technologies: [
            "React", "Next.js", "Node.js", "TypeScript",
            "Tailwind CSS", "GraphQL", "MongoDB", "PostgreSQL"
        ],
        pricing: {
            starter: "$5,000",
            professional: "$15,000",
            enterprise: "Custom"
        },
        faqs: [
            {
                question: "How long does it take to build a web application?",
                answer: "The timeline varies based on complexity. A basic website takes 2-4 weeks, while complex web applications can take 2-6 months."
            },
            {
                question: "Do you provide ongoing maintenance?",
                answer: "Yes, we offer comprehensive maintenance and support packages to ensure your application runs smoothly."
            }
        ]
    },
    {
        slug: "mobile-app-development",
        title: "Mobile App Development",
        subtitle: "Native & Cross-Platform Mobile Apps",
        description: "Create engaging mobile experiences for iOS and Android",
        isCoreService: true,
        longDescription: "We develop high-quality mobile applications that deliver exceptional user experiences. Whether you need native iOS/Android apps or cross-platform solutions, we've got you covered.",
        metaDescription: "Native and cross-platform mobile app development for iOS and Android using React Native, Flutter, Swift and Kotlin. From $10,000.",
        icon: "/icons/mobile-dev.svg",
        image: "/services/03-mobile-app.svg",
        features: [
            "Native iOS Development (Swift)",
            "Native Android Development (Kotlin)",
            "Cross-Platform (React Native, Flutter)",
            "UI/UX Design",
            "App Store Optimization",
            "Push Notifications"
        ],
        benefits: [
            "Enhanced user engagement",
            "Offline functionality",
            "Device feature integration",
            "App store compliance",
            "Regular updates",
            "Analytics integration"
        ],
        technologies: [
            "React Native", "Flutter", "Swift", "Kotlin",
            "Firebase", "Redux", "GraphQL", "REST APIs"
        ],
        pricing: {
            starter: "$10,000",
            professional: "$25,000",
            enterprise: "Custom"
        }
    },
    {
        slug: "ai-ml-solutions",
        title: "AI & ML Solutions",
        subtitle: "Intelligent Automation & Insights",
        description: "Leverage artificial intelligence for business transformation",
        isCoreService: true,
        longDescription: "Harness the power of artificial intelligence and machine learning to automate processes, gain insights, and create intelligent products that learn and adapt.",
        metaDescription: "Custom AI and machine learning solutions: LLM integrations, RAG systems, NLP, computer vision and predictive models built into production products.",
        icon: "/icons/ai-ml.svg",
        image: "/services/17-ai-ml-solutions.svg",
        features: [
            "Machine Learning Models",
            "Natural Language Processing",
            "Computer Vision",
            "Predictive Analytics",
            "Recommendation Systems",
            "Chatbots & Virtual Assistants"
        ],
        benefits: [
            "Data-driven decisions",
            "Process automation",
            "Improved efficiency",
            "Personalized experiences",
            "Competitive advantage",
            "Scalable AI solutions"
        ],
        technologies: [
            "Python", "TensorFlow", "PyTorch", "OpenAI",
            "LangChain", "Hugging Face", "AWS SageMaker"
        ]
    },
    {
        slug: "cloud-infrastructure",
        title: "Cloud Infrastructure",
        subtitle: "Scalable & Secure Cloud Solutions",
        description: "Modern cloud architecture and DevOps services",
        isCoreService: true,
        longDescription: "Transform your infrastructure with cloud-native solutions. We help you leverage the full potential of cloud computing for scalability, reliability, and cost efficiency.",
        metaDescription: "Cloud infrastructure and DevOps engineering on AWS, Azure and GCP. Kubernetes, Terraform, CI/CD pipelines and cost optimisation for production workloads.",
        icon: "/icons/cloud.svg",
        image: "/services/11-devops-cicd.svg",
        features: [
            "Cloud Migration",
            "DevOps Implementation",
            "Kubernetes Orchestration",
            "CI/CD Pipelines",
            "Infrastructure as Code",
            "Cloud Security"
        ],
        benefits: [
            "Reduced infrastructure costs",
            "Automatic scaling",
            "High availability",
            "Improved security",
            "Faster deployment",
            "Disaster recovery"
        ],
        technologies: [
            "AWS", "Azure", "Google Cloud", "Docker",
            "Kubernetes", "Terraform", "Jenkins", "GitHub Actions"
        ]
    },
    {
        slug: "ui-ux-design",
        title: "UI/UX Design",
        subtitle: "Beautiful, Intuitive Interfaces",
        description: "Design exceptional user experiences that delight",
        longDescription: "Our design team creates beautiful, intuitive interfaces that users love. We focus on user-centered design to ensure your product is both functional and aesthetically pleasing.",
        metaDescription: "User-centred UI/UX design and design systems in Figma. Wireframes, prototypes and usability testing that raise conversion and cut rework.",
        icon: "/icons/design.svg",
        image: "/services/07-ui-ux.svg",
        features: [
            "User Research",
            "Wireframing & Prototyping",
            "UI Design Systems",
            "Usability Testing",
            "Interaction Design",
            "Design Thinking Workshops"
        ],
        benefits: [
            "Higher user satisfaction",
            "Increased conversions",
            "Reduced development costs",
            "Consistent brand experience",
            "Faster time to market",
            "Accessibility compliance"
        ],
        technologies: [
            "Figma", "Adobe XD", "Sketch", "Framer",
            "InVision", "Miro", "UserTesting"
        ]
    },
    {
        slug: "digital-marketing",
        title: "Digital Marketing",
        subtitle: "Data-Driven Growth Strategies",
        description: "Accelerate growth with strategic digital marketing",
        longDescription: "Drive traffic, engagement, and conversions with our comprehensive digital marketing services. We use data-driven strategies to achieve measurable results.",
        metaDescription: "Technical SEO, content marketing, PPC and lifecycle campaigns for B2B software companies. Analytics-first, reported against pipeline not impressions.",
        icon: "/icons/marketing.svg",
        image: "/services/18-digital-marketing.svg",
        features: [
            "SEO Optimization",
            "Content Marketing",
            "Social Media Management",
            "Email Marketing",
            "PPC Advertising",
            "Analytics & Reporting"
        ],
        benefits: [
            "Increased organic traffic",
            "Better conversion rates",
            "Brand awareness",
            "Customer engagement",
            "ROI tracking",
            "Market insights"
        ],
        technologies: [
            "Google Analytics", "SEMrush", "Ahrefs",
            "HubSpot", "Mailchimp", "Meta Ads Manager"
        ]
    },
    {
        slug: "saas-analytics",
        title: "SaaS Analytics",
        subtitle: "Real-time analytics and insights platform",
        description: "Track, analyze, and optimize your SaaS product with powerful real-time insights",
        longDescription: "Our SaaS analytics platform helps businesses monitor performance, understand user behavior, and make data-driven decisions. With real-time dashboards and advanced data visualization, you gain complete visibility into your product's growth and performance.",
        metaDescription: "Real-time SaaS analytics platforms: custom dashboards, product telemetry, funnel and cohort analysis with third-party integrations. From $3,000.",
        icon: "/icons/analytics.svg",
        image: "/services/04-saas-product.svg",
        features: [
            "Real-time Data Tracking",
            "Custom Dashboards",
            "User Behavior Analytics",
            "Revenue & KPI Monitoring",
            "Funnel & Cohort Analysis",
            "Third-party Integrations"
        ],
        benefits: [
            "Better decision making",
            "Improved user retention",
            "Revenue growth insights",
            "Real-time performance tracking",
            "Scalable analytics infrastructure",
            "Actionable data visualization"
        ],
        technologies: [
            "Next.js", "React", "Node.js",
            "PostgreSQL", "MongoDB",
            "D3.js", "Chart.js",
            "AWS", "Firebase"
        ],
        pricing: {
            starter: "$3,000",
            professional: "$10,000",
            enterprise: "Custom"
        },
        faqs: [
            {
                question: "What kind of data can I track?",
                answer: "You can track user behavior, revenue metrics, product usage, funnels, and custom events in real-time."
            },
            {
                question: "Is it suitable for startups?",
                answer: "Yes, our SaaS analytics solutions are scalable and perfect for startups as well as enterprise-level businesses."
            }
        ]
    },
    {
        slug: "e-commerce-development",
        title: "E-Commerce Development",
        subtitle: "Shopify, WooCommerce & Custom Storefronts",
        description: "Build high-converting online stores that drive revenue and scale",
        isCoreService: true,
        longDescription: "We design and build e-commerce experiences that convert browsers into buyers. From headless Shopify storefronts to fully custom platforms, every build is optimised for speed, SEO, and checkout conversion.",
        metaDescription: "Custom e-commerce development on Shopify, WooCommerce and headless platforms. Performance-first storefronts with payment integration, inventory and analytics from $6,000.",
        icon: "/icons/ecommerce.svg",
        image: "/services/08-ecommerce.svg",
        features: [
            "Custom Shopify & WooCommerce Development",
            "Headless Commerce Architecture",
            "Payment Gateway Integration",
            "Inventory & Order Management",
            "Product Catalogue & Search",
            "Multi-currency & Multi-language Support"
        ],
        benefits: [
            "Higher checkout conversion rates",
            "Faster storefront load times",
            "Seamless omnichannel selling",
            "Reduced cart abandonment",
            "Automated inventory workflows",
            "Scalable for seasonal traffic spikes"
        ],
        technologies: [
            "Shopify", "WooCommerce", "Next.js", "Medusa.js",
            "Stripe", "Algolia", "Sanity", "PostgreSQL"
        ],
        pricing: {
            starter: "$6,000",
            professional: "$18,000",
            enterprise: "Custom"
        },
        faqs: [
            {
                question: "Should I use Shopify or a custom platform?",
                answer: "Shopify is the right default for most product-led businesses. A custom platform makes sense when your catalogue, pricing rules, or fulfilment logic cannot be modelled inside Shopify's data structures."
            },
            {
                question: "Do you handle payment and tax compliance?",
                answer: "Yes. We integrate with Stripe, PayPal and regional gateways and configure tax rules through your platform or a service like TaxJar. We do not provide legal tax advice, but we wire up the tools correctly."
            }
        ]
    },
    {
        slug: "custom-software",
        title: "Custom Software Development",
        subtitle: "Bespoke Digital Solutions Tailored to Your Business",
        description: "Tailored enterprise digital solutions engineered to automate complex workflows and scale seamlessly",
        isCoreService: true,
        longDescription: "Our custom software development services engineer resilient, purpose-built platforms tailored precisely to your operational requirements. From complex workflow automation and data processing engines to proprietary internal tools, we transform critical business challenges into competitive digital advantages.",
        metaDescription: "Enterprise custom software development by LayerNLooms. Scalable architectures, workflow automation, and proprietary systems built with Next.js, Node.js, and cloud-native standards.",
        icon: "/icons/custom-software.svg",
        image: "/services/01-custom-software.svg",
        features: [
            "Tailored Business Logic & Workflows",
            "Microservice & Modular Architecture",
            "Cloud-Native Integration & Security",
            "Granular Role-Based Access Governance",
            "Automated CI/CD Delivery Pipelines",
            "100% Intellectual Property & Source Ownership"
        ],
        benefits: [
            "Eliminate limitations of off-the-shelf software",
            "Own your source code and data assets completely",
            "Automate manual, repetitive operational bottlenecks",
            "Seamlessly integrate with legacy internal systems",
            "Scale horizontally as transaction volume multiplies",
            "Dedicated warranty support and technical SLAs"
        ],
        technologies: [
            "TypeScript", "Next.js", "Node.js", "Python",
            "Go", "PostgreSQL", "Docker", "AWS"
        ],
        pricing: {
            starter: "$10,000",
            professional: "$25,000",
            enterprise: "Custom"
        },
        faqs: [
            {
                question: "Why should I choose custom software over off-the-shelf SaaS?",
                answer: "Off-the-shelf tools require you to adapt your workflows to their constraints and charge perpetual per-seat licenses. Custom software maps 100% to your competitive edge, carries no licensing overhead, and becomes an enterprise asset you own entirely."
            },
            {
                question: "How do you handle scope changes during development?",
                answer: "We work in agile, two-week sprint milestones. After each demo, you can re-prioritize backlog items. Scope changes are evaluated transparently against timelines and budget before implementation."
            }
        ]
    },
    {
        slug: "enterprise-software",
        title: "Enterprise Software Development",
        subtitle: "High-Concurrency, High-Security Mission-Critical Platforms",
        description: "Mission-critical architectures engineered for high concurrency, security compliance, and ERP integration",
        isCoreService: true,
        longDescription: "We engineer robust, enterprise-grade software architectures capable of operating at massive transaction volumes with zero downtime tolerance. Designed to enforce stringent data governance, regulatory compliance (SOC2, HIPAA, GDPR), and bidirectional integration with existing ERP and legacy mainframes.",
        metaDescription: "Enterprise software development services by LayerNLooms. High concurrency, SOC2 compliance, fault-tolerant microservices, and ERP integration.",
        icon: "/icons/enterprise.svg",
        image: "/services/05-enterprise.svg",
        features: [
            "Distributed Systems Architecture",
            "High Availability & Multi-Region Redundancy",
            "Enterprise ERP, CRM & Legacy Integration",
            "Strict SOC2, HIPAA & GDPR Compliance",
            "Real-Time Audit Logging & Access Telemetry",
            "Zero-Downtime Migration & Decoupling"
        ],
        benefits: [
            "Target 99.99% uptime with automated failover",
            "Automate complex inter-departmental operations",
            "Handle heavy concurrent load without performance decay",
            "Guarantee institutional regulatory and data security",
            "Eliminate information silos across business units",
            "Future-proof foundational code for long-term expansion"
        ],
        technologies: [
            "Java / Spring Boot", "Go", "Kubernetes", "Apache Kafka",
            "PostgreSQL", "AWS", "Terraform", "Redis"
        ],
        pricing: {
            starter: "$25,000",
            professional: "$60,000",
            enterprise: "Custom"
        },
        faqs: [
            {
                question: "How do you ensure enterprise-grade security and compliance?",
                answer: "We adhere to OWASP Top 10 guidelines, role-based access control (RBAC), end-to-end data encryption at rest and in transit, comprehensive audit logging, and static code security analysis within automated CI/CD pipelines."
            },
            {
                question: "Can you integrate with our legacy on-premise ERP?",
                answer: "Yes. We regularly build secure middleware gateways and REST/SOAP wrappers that connect modern web interfaces with legacy SAP, Oracle, AS/400, or custom database environments."
            }
        ]
    },
    {
        slug: "api-backend",
        title: "API & Backend Development",
        subtitle: "High-Throughput Distributed Backends & Resilient APIs",
        description: "Distributed microservices, high-throughput REST and GraphQL APIs built to process millions of requests",
        isCoreService: true,
        longDescription: "We build bulletproof backend architectures, event-driven streaming pipelines, and low-latency RESTful and GraphQL APIs. Engineered for horizontal autoscaling, high request throughput, and real-time synchronization across web, mobile, and third-party integrations.",
        metaDescription: "Scalable API and backend development services by LayerNLooms. High-throughput REST, GraphQL, microservices, and event-driven architectures with 99.99% uptime.",
        icon: "/icons/backend.svg",
        image: "/services/06-api-backend.svg",
        features: [
            "High-Concurrency Microservices",
            "RESTful & GraphQL API Architecture",
            "Event-Driven Streaming & Message Queues",
            "In-Memory Caching & Query Optimization",
            "Interactive Swagger / OpenAPI Documentation",
            "Rate Limiting, Throttling & DDoS Protection"
        ],
        benefits: [
            "Sub-50ms API response latencies under heavy load",
            "Isolated microservice domains preventing cascade outages",
            "Clear typed contracts for web and mobile frontends",
            "Effortless third-party developer integrations",
            "Robust queue-based background processing",
            "Comprehensive distributed tracing and monitoring"
        ],
        technologies: [
            "Node.js", "Go", "Python", "GraphQL",
            "Redis", "Kafka", "PostgreSQL", "Docker"
        ],
        pricing: {
            starter: "$6,000",
            professional: "$18,000",
            enterprise: "Custom"
        },
        faqs: [
            {
                question: "REST or GraphQL: Which should we build?",
                answer: "GraphQL is ideal when varied clients (web, iOS, Android) require different subsets of data from a single request. REST is better suited for straightforward, highly cacheable resources or public third-party APIs. We help you choose the right balance."
            },
            {
                question: "How do you ensure the API can handle sudden traffic surges?",
                answer: "We implement multi-tier Redis caching, connection pooling, database read-replicas, and container autoscaling on Kubernetes or AWS ECS, verified through load tests before production rollout."
            }
        ]
    },
    {
        slug: "crm-erp-solutions",
        title: "CRM & ERP Solutions",
        subtitle: "Connected Business Engines & Intelligent Workflow Platforms",
        description: "Unified customer relationship platforms and enterprise resource systems connecting sales, inventory, and operations",
        isCoreService: true,
        longDescription: "Streamline multi-departmental operations with custom CRM and ERP platforms tailored to your distinct business workflows. We unify customer lifecycles, lead pipelines, inventory management, financials, and team collaboration into a single, cohesive source of truth.",
        metaDescription: "Custom CRM and ERP software development by LayerNLooms. Streamline sales pipelines, inventory, and cross-departmental operations with automated business software.",
        icon: "/icons/crm.svg",
        image: "/services/09-crm-erp.svg",
        features: [
            "Custom Sales Pipeline & Lead Scoring",
            "Automated Inventory & Supply Chain Tracking",
            "Multi-Department Role-Based Permissions",
            "Real-Time Executive Analytics Dashboards",
            "Automated Invoicing, Subscriptions & Billing",
            "Bidirectional Third-Party Sync & Webhooks"
        ],
        benefits: [
            "Replace fragmented spreadsheets with one source of truth",
            "Shorten deal closing cycles through automated alerts",
            "Eliminate costly stockouts and inventory miscounts",
            "Prevent manual human entry errors across departments",
            "Strictly protect sensitive customer and payroll data",
            "Gain real-time visibility into company-wide KPIs"
        ],
        technologies: [
            "Next.js", "Node.js", "PostgreSQL", "Prisma",
            "Tailwind CSS", "Redis", "AWS", "Stripe"
        ],
        pricing: {
            starter: "$12,000",
            professional: "$30,000",
            enterprise: "Custom"
        },
        faqs: [
            {
                question: "Can you migrate data from our existing spreadsheets and legacy CRM?",
                answer: "Yes. We build ETL migration scripts to extract, cleanse, validate, and import historical customer records, sales transactions, and inventories without data loss."
            },
            {
                question: "Is custom CRM/ERP cheaper than Salesforce or SAP over time?",
                answer: "For teams with specialized operational requirements or scaling user counts, custom platforms eliminate compounding annual per-user seat licenses and third-party app store subscription fees."
            }
        ]
    },
    {
        slug: "software-modernization",
        title: "Software Modernization",
        subtitle: "De-Risk Legacy Systems & Migrate to Cloud-Native Standards",
        description: "Refactor legacy codebases into modern cloud-native architectures, eliminating compounding technical debt",
        isCoreService: true,
        longDescription: "Transform aging legacy codebases, monolithic software, and technical debt into modern, cloud-native modular systems without disrupting day-to-day business operations. Using incremental strangler-fig migration patterns, we preserve critical business rules while modernizing performance, security, and developer velocity.",
        metaDescription: "Legacy software modernization and cloud migration services by LayerNLooms. Refactor monoliths to microservices, eliminate technical debt, and cut maintenance costs.",
        icon: "/icons/modernization.svg",
        image: "/services/10-software-modernization.svg",
        features: [
            "Strangler-Fig Incremental Migration",
            "Monolith-to-Microservices Decomposition",
            "Zero-Downtime Database Schema Migration",
            "Cloud Replatforming & Containerization",
            "Automated Regression Test Suite Backfilling",
            "Security Hardening & Dependency Upgrades"
        ],
        benefits: [
            "Cut annual legacy maintenance costs by up to 60%",
            "Avoid catastrophic 'big bang' rewrite failure risks",
            "Accelerate sprint velocity with modern engineering tools",
            "Resolve unpatched vulnerabilities in outdated runtimes",
            "Scale individual service bottlenecks independently",
            "Preserve decades of hard-won domain business logic"
        ],
        technologies: [
            "TypeScript", "Next.js", "Node.js", "Docker",
            "Kubernetes", "PostgreSQL", "AWS", "Datadog"
        ],
        pricing: {
            starter: "$15,000",
            professional: "$35,000",
            enterprise: "Custom"
        },
        faqs: [
            {
                question: "Will our live production system experience downtime during modernization?",
                answer: "No. We utilize the strangler-fig pattern, routing traffic incrementally through an API gateway to new services while the legacy system continues handling untouched functionality in parallel."
            },
            {
                question: "How do we know the new code will behave like the legacy system?",
                answer: "We capture production inputs and compare outputs between the old and new services (shadow traffic testing) to guarantee 100% behavioral parity before cutting over."
            }
        ]
    },
    {
        slug: "database-design",
        title: "Database Design & Architecture",
        subtitle: "Optimized Schemas, ACID Integrity & High-Throughput Storage",
        description: "High-efficiency SQL and NoSQL database schemas optimized for rapid indexing, distributed replication, and ACID compliance",
        isCoreService: true,
        longDescription: "Architect scalable, high-performance database foundations tailored for transactional velocity and analytical depth. From schema normalization and query indexing to distributed multi-master replication, read replicas, and caching tiers, we ensure data integrity under extreme query volume.",
        metaDescription: "Expert database design, schema optimization, and performance tuning by LayerNLooms. PostgreSQL, MySQL, MongoDB, and Redis architectures.",
        icon: "/icons/database.svg",
        image: "/services/12-database-design.svg",
        features: [
            "Normalized Relational Schema Architecture (3NF)",
            "Distributed Document & Key-Value Data Modeling",
            "Index Strategy & Query Execution Plan Tuning",
            "Read-Replica & Horizontal Sharding Topologies",
            "Automated Point-in-Time Disaster Recovery",
            "Data Encryption at Rest and in Flight"
        ],
        benefits: [
            "Eliminate query timeouts and deadlocks",
            "Guarantee strict ACID consistency for financial records",
            "Seamlessly scale to terabytes of storage and millions of ops",
            "Reduce cloud hosting infrastructure costs through efficiency",
            "Deploy schema migrations safely with zero user disruption",
            "Comply with enterprise audit, SOC2 and GDPR requirements"
        ],
        technologies: [
            "PostgreSQL", "MySQL", "MongoDB", "Redis",
            "ClickHouse", "Prisma", "Elasticsearch", "AWS RDS"
        ],
        pricing: {
            starter: "$5,000",
            professional: "$12,000",
            enterprise: "Custom"
        },
        faqs: [
            {
                question: "Should we choose PostgreSQL, MySQL, or MongoDB?",
                answer: "PostgreSQL is our standard recommendation for transactional systems with relational data and complex querying. MongoDB excels for flexible document structures and catalog ingestion. We evaluate your data shapes to choose the right fit."
            },
            {
                question: "Can you optimize our existing slow database queries?",
                answer: "Yes. We analyze EXPLAIN execution plans, tune index usage, normalize bottlenecks, add connection pooling, and configure caching layers to drastically reduce latency."
            }
        ]
    },
    {
        slug: "third-party-api-integration",
        title: "Third-Party API Integration",
        subtitle: "Seamless Connectivity Across Payments, CRMs & External Services",
        description: "Seamless bidirectional integrations with payment gateways, CRMs, marketing suites, and external data feeds",
        isCoreService: true,
        longDescription: "Connect your core product with the global SaaS ecosystem through secure, fault-tolerant API integrations. We architect robust webhook handling, idempotency safeguards, retry queues, and rate-limit managers for payments, accounting, marketing tools, logistics, and data brokers.",
        metaDescription: "Third-party API integration services by LayerNLooms. Secure connections to Stripe, Salesforce, HubSpot, Twilio, and external enterprise feeds.",
        icon: "/icons/api.svg",
        image: "/services/13-api-integration.svg",
        features: [
            "Payment Gateway Orchestration (Stripe, PayPal, Adyen)",
            "Enterprise CRM Synchronization (Salesforce, HubSpot)",
            "Resilient Webhook Handlers with Exponential Backoff",
            "Idempotency Controls & Double-Charge Protection",
            "Real-Time Health Monitoring & Rate-Limit Management",
            "Custom ETL Transformations & Data Pipelines"
        ],
        benefits: [
            "Eliminate manual data copying across separate software tools",
            "Guarantee zero missed webhooks or failed payment events",
            "Automate customer lifecycle sync from signup to renewal",
            "Maintain bidirectional consistency across external databases",
            "Insulate your application against third-party downtime",
            "Accelerate development by using best-in-class APIs"
        ],
        technologies: [
            "Node.js", "TypeScript", "Redis / BullMQ", "Stripe API",
            "Salesforce API", "Twilio", "AWS SQS", "PostgreSQL"
        ],
        pricing: {
            starter: "$4,000",
            professional: "$10,000",
            enterprise: "Custom"
        },
        faqs: [
            {
                question: "What happens if a third-party API goes down or throttles requests?",
                answer: "We build resilient architectures with durable message queues (SQS/BullMQ), exponential backoff retries, and circuit breakers, ensuring requests are never lost and automatically resume when the service recovers."
            },
            {
                question: "How do you protect against duplicate webhook events?",
                answer: "Every webhook handler incorporates idempotency keys and state checks in a Redis/database store to verify that repeated events are safely ignored."
            }
        ]
    },
    {
        slug: "mvp-development",
        title: "MVP Development",
        subtitle: "Go From Concept to Production in 4–8 Weeks",
        description: "Rapid, agile MVP validation engineered to launch your core product in front of real users and investors within weeks",
        isCoreService: true,
        longDescription: "Turn ambitious product concepts into production-grade Minimum Viable Products (MVPs) in weeks, not months. We focus on high-impact core features, rock-solid architecture, and engaging UX, allowing you to validate market demand, attract angel/VC investment, and acquire initial users without accumulating architectural rework.",
        metaDescription: "Fast MVP development for startups and innovators by LayerNLooms. Launch production-ready web and mobile MVPs in 4-8 weeks from $8,000.",
        icon: "/icons/mvp.svg",
        image: "/services/14-mvp-development.svg",
        features: [
            "Rapid Scope Prioritization & UX Prototyping",
            "Full-Stack Web & Cross-Platform Mobile Build",
            "Authentication, Onboarding & User Profiles",
            "Payment Gateway & Subscription Monetization",
            "Embedded Analytics, Heatmaps & User Telemetry",
            "Production-Grade Scalable Foundation"
        ],
        benefits: [
            "Reach market in 4 to 8 weeks rather than 6+ months",
            "Validate user demand before burning through runway",
            "Present a polished, working product to investors",
            "Avoid disposable 'throwaway' prototypes",
            "Weekly sprint demos with testable clickable builds",
            "Seamless transition into ongoing scaling post-launch"
        ],
        technologies: [
            "Next.js", "React Native", "TypeScript", "Tailwind CSS",
            "Supabase / PostgreSQL", "Stripe", "Vercel", "PostHog"
        ],
        pricing: {
            starter: "$8,000",
            professional: "$18,000",
            enterprise: "Custom"
        },
        faqs: [
            {
                question: "Can an MVP really be built in 4 to 8 weeks without cutting corners?",
                answer: "Yes, by ruthlessly focusing on the single primary problem your product solves and utilizing modern serverless primitives (Next.js, Supabase, Tailwind, Stripe). The code is cleanly structured so you build upon it, not throw it away."
            },
            {
                question: "What happens after the MVP is launched?",
                answer: "We analyze early user metrics alongside you, prioritize feature iterations, and can either transition the codebase to your in-house hires or continue scaling as your technical partner."
            }
        ]
    },
    {
        slug: "qa-testing",
        title: "QA & Automated Testing",
        subtitle: "Zero-Defect Software Through Rigorous Automated & Manual QA",
        description: "Comprehensive automated regression suites, manual end-to-end testing, security penetration audits, and load stress testing",
        isCoreService: true,
        longDescription: "Guarantee software reliability, security, and performance across every release cycle. Our comprehensive quality assurance services combine end-to-end automated testing pipelines, cross-device exploratory testing, performance load testing, and security vulnerability audits so your users never encounter critical bugs in production.",
        metaDescription: "QA and software testing services by LayerNLooms. End-to-end test automation with Playwright and Cypress, security audits, and load testing.",
        icon: "/icons/qa.svg",
        image: "/services/15-qa-testing.svg",
        features: [
            "Automated End-to-End Testing (Playwright / Cypress)",
            "Continuous CI/CD Pipeline Regression Gates",
            "Cross-Browser, Tablet & Mobile Device Verification",
            "High-Concurrency Performance & Stress Testing (k6)",
            "API Schema Validation & Mock Integration Tests",
            "Security Vulnerability & Static Code Scanning"
        ],
        benefits: [
            "Stop embarrassing regressions before they reach customers",
            "Deploy updates multiple times daily with total confidence",
            "Reduce bug resolution cycles from weeks to minutes",
            "Verify steady application response during traffic peaks",
            "Improve App Store ratings and customer satisfaction",
            "Enable developers to focus on features instead of patching bugs"
        ],
        technologies: [
            "Playwright", "Cypress", "Jest", "k6",
            "GitHub Actions", "Postman", "OWASP ZAP", "Sentry"
        ],
        pricing: {
            starter: "$4,500",
            professional: "$11,000",
            enterprise: "Custom"
        },
        faqs: [
            {
                question: "Can you add automated tests to an existing codebase without tests?",
                answer: "Yes. We start by wrapping your critical revenue paths (checkout, authentication, onboarding) with high-value end-to-end smoke tests before backfilling unit and integration tests."
            },
            {
                question: "Do automated tests replace manual QA completely?",
                answer: "Automated tests handle repetitive regression checks and performance benchmarking. We pair automation with human exploratory testing to evaluate real visual polish, UX nuances, and edge cases."
            }
        ]
    },
    {
        slug: "software-maintenance",
        title: "Software Maintenance & Support",
        subtitle: "24/7 SLA Telemetry, Security Patching & Continuous Optimization",
        description: "Proactive 24/7 security patch management, uptime telemetry, continuous performance tuning, and technical SLA support",
        isCoreService: true,
        longDescription: "Protect and evolve your digital assets with comprehensive ongoing software maintenance and dedicated technical support. From real-time uptime monitoring and emergency patch deployments to regular dependency upgrades, database tuning, and feature improvements, we keep your systems running at peak performance around the clock.",
        metaDescription: "Ongoing software maintenance, security updates, and 24/7 SLA support by LayerNLooms. Keep your web and mobile applications fast, secure, and always on.",
        icon: "/icons/maintenance.svg",
        image: "/services/16-software-maintenance.svg",
        features: [
            "24/7 Production Health & Uptime Telemetry",
            "Dedicated On-Call Emergency Bug Resolution",
            "Scheduled Security Audits & Dependency Patching",
            "Database Index Tuning & Cloud Infrastructure Cost Optimization",
            "Monthly Feature Additions, Fixes & UI Enhancements",
            "Guaranteed Response-Time Service Level Agreements (SLAs)"
        ],
        benefits: [
            "Achieve 99.99% application reliability worldwide",
            "Prevent cyber exploits by keeping frameworks up-to-date",
            "Trim unnecessary cloud hosting waste every month",
            "Access senior engineering talent on flexible terms",
            "Transparent monthly incident and performance reports",
            "Predictable operational budget with zero surprise fees"
        ],
        technologies: [
            "Datadog", "Sentry", "AWS CloudWatch", "Docker",
            "GitHub Actions", "Terraform", "PostgreSQL", "Node.js"
        ],
        pricing: {
            starter: "$1,500/mo",
            professional: "$3,500/mo",
            enterprise: "Custom"
        },
        faqs: [
            {
                question: "Can you maintain a codebase that was developed by another team?",
                answer: "Yes. We perform an initial code audit and infrastructure review to document the system, fix immediate security vulnerabilities, and set up continuous monitoring before taking over maintenance."
            },
            {
                question: "What is your emergency incident response time?",
                answer: "Under our professional and enterprise support plans, critical production incidents receive an immediate response within 15–30 minutes, 24/7/365."
            }
        ]
    }
];

export function getAllServices() {
    return services;
}

export function getServiceBySlug(slug: string) {
    return services.find(service => service.slug === slug);
}

export function getAllServiceSlugs() {
    return services.map(service => ({
        slug: service.slug
    }));
}
