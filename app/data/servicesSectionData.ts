export interface ServiceItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  href: string;
}

export const servicesSectionData: ServiceItem[] = [
  {
    id: "custom-software",
    number: "01",
    category: "ENGINEERING",
    title: "Custom Software Development",
    description:
      "Tailored enterprise digital solutions engineered to automate complex workflows, streamline business operations, and scale with your organizational growth.",
    image: "/services/01-custom-software.svg",
    slug: "custom-software",
    href: "/services/custom-software",
  },
  {
    id: "web-app",
    number: "02",
    category: "DEVELOPMENT",
    title: "Web Application Development",
    description:
      "High-performance, secure web applications built with modern frontend frameworks and resilient cloud architectures engineered for effortless scalability.",
    image: "/services/02-web-app.svg",
    slug: "web-development",
    href: "/services/web-development",
  },
  {
    id: "mobile-app",
    number: "03",
    category: "MOBILE & CROSS-PLATFORM",
    title: "Mobile App Development",
    description:
      "Intuitive native iOS, Android, and cross-platform mobile experiences crafted for silky responsiveness, offline reliability, and peak user retention.",
    image: "/services/03-mobile-app.svg",
    slug: "mobile-app-development",
    href: "/services/mobile-app-development",
  },
  {
    id: "saas-product",
    number: "04",
    category: "PRODUCT ENGINEERING",
    title: "SaaS Product Development",
    description:
      "End-to-end multi-tenant SaaS platforms featuring automated subscription billing, role-based access governance, real-time analytics, and self-serve onboarding.",
    image: "/services/04-saas-product.svg",
    slug: "saas-analytics",
    href: "/services/saas-analytics",
  },
  {
    id: "enterprise-software",
    number: "05",
    category: "ENTERPRISE SOLUTIONS",
    title: "Enterprise Software Development",
    description:
      "Mission-critical architectures engineered for high concurrency, rock-solid security compliance, data sovereignty, and frictionless ERP integration.",
    image: "/services/05-enterprise.svg",
    slug: "enterprise-software",
    href: "/services/enterprise-software",
  },
  {
    id: "api-backend",
    number: "06",
    category: "CLOUD & BACKEND",
    title: "API & Backend Development",
    description:
      "Distributed microservices, high-throughput REST and GraphQL APIs, and event-driven backend systems built to reliably process millions of requests.",
    image: "/services/06-api-backend.svg",
    slug: "api-backend",
    href: "/services/api-backend",
  },
  {
    id: "ui-ux",
    number: "07",
    category: "DESIGN & RESEARCH",
    title: "UI/UX Design",
    description:
      "User-centered design systems, responsive wireframes, and interactive micro-prototypes crafted to convert visitors into loyal, long-term customers.",
    image: "/services/07-ui-ux.svg",
    slug: "ui-ux-design",
    href: "/services/ui-ux-design",
  },
  {
    id: "ecommerce",
    number: "08",
    category: "COMMERCE & SCALE",
    title: "E-Commerce Development",
    description:
      "Ultra-fast headless commerce storefronts, custom checkout funnels, and automated multichannel inventory synchronization built for maximum conversion.",
    image: "/services/08-ecommerce.svg",
    slug: "e-commerce-development",
    href: "/services/e-commerce-development",
  },
  {
    id: "crm-erp",
    number: "09",
    category: "BUSINESS SYSTEMS",
    title: "CRM & ERP Solutions",
    description:
      "Unified customer relationship platforms and enterprise resource systems that connect sales pipelines, inventory, and cross-departmental operations.",
    image: "/services/09-crm-erp.svg",
    slug: "crm-erp-solutions",
    href: "/services/crm-erp-solutions",
  },
  {
    id: "software-modernization",
    number: "10",
    category: "MODERNIZATION",
    title: "Software Modernization",
    description:
      "Refactor legacy codebases into modern cloud-native architectures, eliminating compounding technical debt and reducing long-term maintenance overhead.",
    image: "/services/10-software-modernization.svg",
    slug: "software-modernization",
    href: "/services/software-modernization",
  },
  {
    id: "devops-cicd",
    number: "11",
    category: "INFRASTRUCTURE & AUTOMATION",
    title: "DevOps & CI/CD",
    description:
      "Automated continuous integration and deployment pipelines, containerized deployments with Kubernetes, and robust monitoring for 99.99% uptime.",
    image: "/services/11-devops-cicd.svg",
    slug: "cloud-infrastructure",
    href: "/services/cloud-infrastructure",
  },
  {
    id: "database-design",
    number: "12",
    category: "DATA ARCHITECTURE",
    title: "Database Design",
    description:
      "High-efficiency SQL and NoSQL database schemas optimized for rapid indexing, distributed replication, ACID compliance, and enterprise data integrity.",
    image: "/services/12-database-design.svg",
    slug: "database-design",
    href: "/services/database-design",
  },
  {
    id: "api-integration",
    number: "13",
    category: "SYSTEMS INTEGRATION",
    title: "Third-Party API Integration",
    description:
      "Seamless bidirectional integrations with payment gateways, CRMs, marketing suites, and external data feeds with resilient webhook fallbacks.",
    image: "/services/13-api-integration.svg",
    slug: "third-party-api-integration",
    href: "/services/third-party-api-integration",
  },
  {
    id: "mvp-development",
    number: "14",
    category: "STARTUP ACCELERATION",
    title: "MVP Development",
    description:
      "Rapid, agile MVP validation engineered to launch your core product in front of real users and investors within weeks, without compromising architectural rigor.",
    image: "/services/14-mvp-development.svg",
    slug: "mvp-development",
    href: "/services/mvp-development",
  },
  {
    id: "qa-testing",
    number: "15",
    category: "QUALITY ASSURANCE",
    title: "QA & Testing",
    description:
      "Comprehensive automated regression suites, manual end-to-end user testing, security penetration audits, and load stress testing for zero-defect releases.",
    image: "/services/15-qa-testing.svg",
    slug: "qa-testing",
    href: "/services/qa-testing",
  },
  {
    id: "software-maintenance",
    number: "16",
    category: "SUPPORT & RELIABILITY",
    title: "Software Maintenance",
    description:
      "Proactive 24/7 security patch management, uptime telemetry, continuous performance tuning, and technical SLA support to keep production systems thriving.",
    image: "/services/16-software-maintenance.svg",
    slug: "software-maintenance",
    href: "/services/software-maintenance",
  },
];
