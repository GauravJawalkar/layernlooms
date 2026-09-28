import { MetadataRoute } from "next";
import { services } from "./data/services";
import { projects } from "./data/portfolio";
import { blogPosts } from "./data/blogs";

const baseUrl = "https://layernlooms.com";

/**
 * A single build timestamp. Every dynamic entry previously used `new Date()`,
 * which told crawlers that all 32 URLs had changed on every request. Google
 * down-weights lastModified signals that always change, so the honest answer
 * for pages generated from static data is "no recent change".
 */
const buildDate = new Date();

const staticRoutes: MetadataRoute.Sitemap = [
  { url: baseUrl, lastModified: buildDate, changeFrequency: "weekly", priority: 1.0 },
  { url: `${baseUrl}/services`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.9 },
  { url: `${baseUrl}/about`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },
  { url: `${baseUrl}/portfolio`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.8 },
  { url: `${baseUrl}/blog`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.8 },
  { url: `${baseUrl}/pricing`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.8 },
  { url: `${baseUrl}/contact`, lastModified: buildDate, changeFrequency: "yearly", priority: 0.7 },
  { url: `${baseUrl}/terms`, lastModified: buildDate, changeFrequency: "yearly", priority: 0.2 },
  { url: `${baseUrl}/privacy`, lastModified: buildDate, changeFrequency: "yearly", priority: 0.2 },
  // /careers is deliberately omitted. It is noindex until the page is built
  // out, and Google asks that noindex URLs stay out of the sitemap. It stays
  // crawlable via the footer link so the noindex is picked up quickly.
];

const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
  url: `${baseUrl}/services/${service.slug}`,
  lastModified: buildDate,
  changeFrequency: "monthly",
  priority: service.isCoreService ? 0.9 : 0.7,
}));

const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
  url: `${baseUrl}/portfolio/${project.slug}`,
  lastModified: buildDate,
  changeFrequency: "yearly",
  priority: 0.6,
}));

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

/**
 * Blog dates are stored as display strings ("January 15, 2026"). Passing that
 * straight to `new Date()` parses it as local midnight, so on a UTC+5:30
 * machine the serialised value lands on the previous day. Parse the parts and
 * build a UTC date explicitly instead. A future-dated entry is clamped, because
 * a lastmod in the future is ignored by crawlers and signals a scheduling bug.
 */
function toSitemapDate(displayDate: string): Date {
  const match = displayDate
    .trim()
    .match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/);

  if (!match) return buildDate;

  const monthIndex = MONTHS.indexOf(match[1].toLowerCase());
  if (monthIndex === -1) return buildDate;

  const parsed = new Date(Date.UTC(Number(match[3]), monthIndex, Number(match[2])));

  if (Number.isNaN(parsed.getTime()) || parsed.getTime() > Date.now()) {
    return buildDate;
  }

  return parsed;
}

const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
  url: `${baseUrl}/blog/${post.slug}`,
  lastModified: toSitemapDate(post.date),
  changeFrequency: "yearly" as const,
  priority: 0.7,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}
