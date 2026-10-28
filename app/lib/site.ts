export const site = {
  name: "LayerNLooms",
  legalName: "LayerNLooms",
  alternateName: "Layer N Looms",
  url: "https://layernlooms.com",
  tagline: "Weaving Digital Excellence",
  description:
    "LayerNLooms is a custom software development agency building web applications, mobile apps, AI systems, and cloud infrastructure for startups and enterprises worldwide.",
  email: "info@layernlooms.com",
  phone: "+91-9730516224",
  foundingDate: "2024",
  priceRange: "$$$",
  address: {
    streetAddress: "Pune, Maharashtra, India",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411001",
    addressCountry: "IN",
  },
  geo: {
    latitude: 18.5204,
    longitude: 73.8567,
  },
  social: {
    twitter: "https://twitter.com/layernlooms",
    linkedin: "https://linkedin.com/company/layernlooms",
    instagram: "https://instagram.com/layernlooms",
    googleBusiness: "https://share.google/S46H7wVpxAKJO4Eom",
    whatsapp: "https://wa.me/9511864578",
  },
  socialHandles: {
    twitter: "@layernlooms",
  },
  sameAs: [
    "https://twitter.com/layernlooms",
    "https://linkedin.com/company/layernlooms",
    "https://instagram.com/layernlooms",
    "https://share.google/S46H7wVpxAKJO4Eom",
    "https://wa.me/9511864578",
  ],
} as const;

export const sameAs = site.sameAs;

export interface TeamMember {
  slug: string;
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  sameAs?: string[];
  knowsAbout?: string[];
}

export const team: TeamMember[] = [
  {
    slug: "gaurav-jawalkar",
    name: "Gaurav Jawalkar",
    jobTitle: "Founder & CEO",
    description:
      "Entrepreneur and business strategist leading LayerNLooms' company vision, client partnerships, and long-term growth.",
    url: `${site.url}/about#gaurav-jawalkar`,
    sameAs: ["https://linkedin.com/company/layernlooms"],
    knowsAbout: ["Business Strategy", "Client Partnership", "Product Strategy"],
  },
  {
    slug: "sanket-pathare",
    name: "Sanket Pathare",
    jobTitle: "Co-Founder & CTO",
    description:
      "Full-stack engineer specialising in Next.js, React, Node.js, and cloud architecture. Leads LayerNLooms' technology strategy and architecture decisions.",
    url: `${site.url}/about#sanket-pathare`,
    knowsAbout: [
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "Cloud Architecture",
      "Technical SEO",
    ],
  },
  {
    slug: "shubham-tawale",
    name: "Shubham Tawale",
    jobTitle: "Co-Founder & COO",
    description:
      "Operations leader overseeing project execution, team coordination, and business processes. Ensures efficient delivery while maintaining operational excellence.",
    url: `${site.url}/about#shubham-tawale`,
    sameAs: ["https://www.linkedin.com/in/shubham-tawale-b6a9b8200"],
    knowsAbout: ["Software Delivery", "Operations Management", "Mobile Development"],
  },
  {
    slug: "jay-jawalkar",
    name: "Jay Jawalkar",
    jobTitle: "Managing Director (MD)",
    description:
      "Responsible for business management, strategic partnerships, and organizational growth at LayerNLooms.",
    url: `${site.url}/about#jay-jawalkar`,
    sameAs: ["https://www.linkedin.com/in/jay-jawalkar/"],
    knowsAbout: ["Business Management", "Strategic Partnerships", "Organizational Growth"],
  },
];
