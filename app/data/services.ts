export interface Service {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    icon: string;
    image: string;
    features: string[];
    benefits: string[];
    technologies: string[];
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
        longDescription: "Our web development services deliver high-performance, scalable, and secure web applications tailored to your business needs. We use the latest frameworks and best practices to ensure your web presence stands out.",
        icon: "/icons/web-dev.svg",
        image: "/web-dev.png",
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
        longDescription: "We develop high-quality mobile applications that deliver exceptional user experiences. Whether you need native iOS/Android apps or cross-platform solutions, we've got you covered.",
        icon: "/icons/mobile-dev.svg",
        image: "/mobile-app.png",
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
        longDescription: "Harness the power of artificial intelligence and machine learning to automate processes, gain insights, and create intelligent products that learn and adapt.",
        icon: "/icons/ai-ml.svg",
        image: "/ai-ml.png",
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
        longDescription: "Transform your infrastructure with cloud-native solutions. We help you leverage the full potential of cloud computing for scalability, reliability, and cost efficiency.",
        icon: "/icons/cloud.svg",
        image: "/cloud-infra.png",
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
        icon: "/icons/design.svg",
        image: "/ui-ux.png",
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
        icon: "/icons/marketing.svg",
        image: "/digital-marketing.png",
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
        icon: "/icons/analytics.svg",
        image: "/saas-analytics.png",
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
