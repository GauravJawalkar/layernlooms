export interface Project {
    slug: string;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    image: string;
    client: string;
    year: string;
    url?: string;
    services: string[];
    technologies: string[];
    result: string;
    testimonial?: {
        text: string;
        author: string;
        role: string;
    };
}

export const projects: Project[] = [
  
     {
        slug: "ecomm-store",
        title: "ECOMM_STORE",
        category: "E-Commerce",
        description: "A digital marketplace for plants, gardening supplies, and botanical decor.",
        longDescription: "ECOMM_STORE is an e-commerce website dedicated to the sale of plants, gardening supplies, and related decor. It serves as a digital marketplace connecting customers with a wide variety of botanical products. The platform offers diverse categories including Indoor Plants, Outdoor Plants, Herbal Plants, Cactus Plants, Fruit Plants, Air Purifying varieties, and Climber Plants. Beyond plants, the store provides essential gardening accessories such as Garden Tool Sets, Watering Cans, Heavy Duty Gardening Gloves, and plant health products like NPK Fertilizers. The site includes standard e-commerce features including a search bar, user login portal, and a Become Seller option for third-party vendors, along with Best Selling and Top Rated sections to guide purchasing decisions.",
        image: "/portfolio/Ecomm_Store.png",
        client: "ECOMM_STORE",
        year: "2025",
        url: "https://ecco-web-demo.vercel.app/",
        services: ["Web Development", "E-Commerce", "UI/UX Design"],
        technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Stripe"],
        result: "Comprehensive plant marketplace with multi-vendor support and diverse product catalog.",
    },
    {
        slug: "imgira-tools",
        title: "Imgira Tools",
        category: "Design & Developer Tools",
        description: "200+ free, browser-based tools for creators, designers, and developers — no installs or sign-ups required.",
        longDescription: "Imgira is a comprehensive online platform offering 200+ free, browser-based tools for creators, designers, and developers. It requires no installations, downloads, or sign-ups. Key tool categories include: Image Editing & Analysis with advanced features like edge detection, threshold tools, channel splitters, histogram viewers, and built-in drawing workspaces; GIF & Media Utilities for converting video to GIF, adjusting speed, optimizing file sizes, and editing metadata; Design & Typography tools for generating custom shape cutouts, removing watermarks, and designing 3D text effects; and Math & Generative Art features such as ASCII art generation from images, recursive fractal tree simulation (Pythagoras tree generator), and Pascal's Triangle visualization.",
        image: "/portfolio/imgira.png",
        client: "Imgira Inc.",
        year: "2025",
        url: "https://www.imgira.site/",
        services: ["Web Development", "UI/UX Design", "Cloud Infrastructure"],
        technologies: ["Next.js", "React", "TypeScript", "Node.js", "Canvas API", "WebAssembly", "Tailwind CSS"],
        result: "200+ free tools launched with zero sign-up friction, serving thousands of daily active creators and developers.",
    },
    {
        slug: "temp-nova",
        title: "Temp Nova",
        category: "Privacy & Security",
        description: "Disposable email, temporary SMS, and privacy utilities for protecting your digital identity.",
        longDescription: "TempNova is a comprehensive privacy and security utility suite designed to provide disposable, anonymous digital identifiers for modern web users and developers. It serves as a tool for protecting personal data by replacing permanent information with transient, temporary alternatives. Core features include: Disposable Email for generating temporary email addresses to avoid spam, newsletter subscriptions, and tracking pixels during registrations; Temporary SMS for providing virtual phone numbers to receive OTPs and verification codes while keeping your real mobile number private; Identity Protection tools including a Temp Username Generator and self-destructing notes with encrypted links; Testing & Development utilities for QA testing with multiple concurrent inboxes to test registration flows and multi-user scenarios. The platform operates on a stateless architecture — no personal information, email content, or location data is permanently logged or stored.",
        image: "/portfolio/temp-nova.png",
        client: "TempNova Systems",
        year: "2025",
        url: "https://www.temp-nova.com/",
        services: ["Web Development", "Security Engineering", "Cloud Infrastructure"],
        technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
        result: "Privacy-first platform serving thousands of users with zero data retention and full stateless architecture.",
    },
    {
        slug: "explore-with-unity",
        title: "Explore with Unity",
        category: "Social & Travel",
        description: "A community-driven travel social platform to document and discover personal travel experiences.",
        longDescription: "Explore with Unity is a community-driven travel social platform designed for users to document and discover personal travel experiences. Core features include: Community Journaling where travelers can create and publish their own digital travel journals to document their journeys; a Discovery Feed allowing users to browse an Explore feed to see adventures shared by other travelers from around the world; Social Connectivity facilitating networking among travelers through messaging and the ability to follow others; and Trip Planning tools to help users organize and create their own trips. It acts as a niche social network dedicated specifically to travel storytelling and trip inspiration.",
        image: "/portfolio/Explore%20with%20unity.png",
        client: "Explore with Unity",
        year: "2025",
        url: "https://www.explorewithunity.in/",
        services: ["Web Development", "UI/UX Design", "Social Platform Development"],
        technologies: ["Next.js", "React", "TypeScript", "Node.js", "Firebase", "Socket.io", "Tailwind CSS"],
        result: "Niche travel social network connecting thousands of travelers through shared journaling and trip inspiration.",
    },
    {
        slug: "neritic-wellness",
        title: "Neritic Wellness",
        category: "E-Commerce",
        description: "A powerful admin panel for managing products, orders, customers, and analytics.",
        longDescription: "Neritic Wellness Admin Panel provides administrators with complete control over the eCommerce platform, allowing for efficient product management, order tracking, customer oversight, and insightful analytics to drive business decisions. Features include: Product Management with add/edit/delete, category management, bulk uploads, pricing and stock control; Order Management with status tracking, invoice generation, filtering, and automated email notifications; Customer Management with role-based permissions, activity monitoring, and data export; Dashboard & Analytics with real-time sales insights, revenue trends, top-selling products, and downloadable reports; Secure Authentication with OAuth and multi-factor authentication; and Settings for branding, payment gateways, shipping, tax rates, and discount codes.",
        image: "/portfolio/neritic-dashboard..png",
        client: "Neritic Wellness",
        year: "2025",
        url: "https://neritic-dashboard.vercel.app",
        services: ["Web Development", "Dashboard & Analytics", "Admin Panel Development"],
        technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Chart.js", "Tailwind CSS", "Redis", "Docker"],
        result: "Full-featured admin dashboard with real-time analytics, role-based access, and comprehensive order/product management.",
    }
];

export function getAllProjects() {
    return projects;
}

export function getProjectBySlug(slug: string) {
    return projects.find(project => project.slug === slug);
}
