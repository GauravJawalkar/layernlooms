const brandedBlogCovers: Record<string, string> = {
  "future-of-web-development-2026": "/blogs/covers/web-platforms.svg",
  "the-future-of-web-development-in-2026": "/blogs/covers/web-platforms.svg",
  "building-scalable-microservices-nodejs": "/blogs/covers/service-network.svg",
  "ai-powered-applications-developer-guide": "/blogs/covers/ai-systems.svg",
  "ai-powered-applications-a-developers-guide": "/blogs/covers/ai-systems.svg",
  "why-your-business-needs-progressive-web-app": "/blogs/covers/progressive-apps.svg",
  "why-your-business-needs-a-progressive-web-app": "/blogs/covers/progressive-apps.svg",
  "complete-guide-cloud-migration": "/blogs/covers/cloud-migration.svg",
  "the-complete-guide-to-cloud-migration": "/blogs/covers/cloud-migration.svg",
  "modern-frontend-development-react-nextjs": "/blogs/covers/frontend-systems.svg",
  "modern-frontend-development-with-react--nextjs": "/blogs/covers/frontend-systems.svg",
  "cybersecurity-best-practices-web-applications": "/blogs/covers/application-security.svg",
  "cybersecurity-best-practices-for-web-applications": "/blogs/covers/application-security.svg",
  "rise-of-low-code-no-code-platforms": "/blogs/covers/visual-building.svg",
  "the-rise-of-low-code-and-no-code-platforms": "/blogs/covers/visual-building.svg",
  "optimizing-web-performance": "/blogs/covers/web-performance.svg",
  "optimizing-web-performance-for-better-user-experience": "/blogs/covers/web-performance.svg",
  "how-to-choose-right-tech-stack": "/blogs/covers/technology-stack.svg",
  "how-to-choose-the-right-tech-stack-for-your-project": "/blogs/covers/technology-stack.svg",
};

export function getBlogCoverImage(slug: string, fallbackImage?: string | null): string {
  return brandedBlogCovers[slug] || fallbackImage || "/og-image.png";
}

export function getBlogSocialImage(slug: string, fallbackImage?: string | null): string {
  const cover = brandedBlogCovers[slug];
  return cover ? cover.replace(/\.svg$/, ".png") : fallbackImage || "/og-image.png";
}

export function hasBrandedBlogCover(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(brandedBlogCovers, slug);
}
