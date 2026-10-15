import { MetadataRoute } from "next";
import { site } from "@/app/lib/site";
import { getAllServiceSlugs } from "@/app/data/services";
import {
  getPublishedPosts,
  getPublishedProjects,
  resolveLastModified,
} from "@/app/lib/firestore-content";

export const revalidate = 3600;

/**
 * The blog and portfolio index pages render from Firestore, so the sitemap has
 * to as well. Otherwise a post published in the admin panel is linked from
 * /blog and carries a self-referencing canonical, but is absent from the
 * sitemap and from generateStaticParams. Services are static, so their routes
 * are known at build time and carry no lastmod.
 *
 * `lastModified` is omitted for the fixed routes on purpose. These pages only
 * change when someone edits a file, and a build timestamp is not that. Google
 * ignores a `<lastmod>` it cannot verify, and a value that moves on every
 * deploy teaches it to stop trusting the whole signal. The dynamic routes carry
 * real CMS write times.
 */
const STATIC_CONTENT_DATE = new Date("2026-04-10T00:00:00.000Z");

const staticRoutes: MetadataRoute.Sitemap = [
  { url: site.url, lastModified: STATIC_CONTENT_DATE, changeFrequency: "weekly", priority: 1.0 },
  { url: `${site.url}/services`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "weekly", priority: 0.9 },
  { url: `${site.url}/about`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.8 },
  { url: `${site.url}/portfolio`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "weekly", priority: 0.8 },
  { url: `${site.url}/blog`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "weekly", priority: 0.8 },
  { url: `${site.url}/pricing`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${site.url}/contact`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "monthly", priority: 0.7 },
  { url: `${site.url}/terms`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "yearly", priority: 0.3 },
  { url: `${site.url}/privacy`, lastModified: STATIC_CONTENT_DATE, changeFrequency: "yearly", priority: 0.3 },
];

function toEntry(
  path: string,
  lastModified: Date | null,
  changeFrequency: "weekly" | "monthly" = "monthly",
  priority = 0.7
): MetadataRoute.Sitemap[number] {
  return {
    url: `${site.url}${path}`,
    lastModified: lastModified || STATIC_CONTENT_DATE,
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([
    getPublishedPosts(),
    getPublishedProjects(),
  ]);

  return [
    ...staticRoutes,
    ...getAllServiceSlugs().map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified: STATIC_CONTENT_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...projects.map((project) =>
      toEntry(`/portfolio/${project.slug}`, resolveLastModified(project), "monthly", 0.8)
    ),
    ...posts.map((post) =>
      toEntry(`/blog/${post.slug}`, resolveLastModified(post), "weekly", 0.7)
    ),
  ];
}
