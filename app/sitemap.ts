import { MetadataRoute } from "next";
import { site } from "@/app/lib/site";
import {
  getPublishedPosts,
  getPublishedProjects,
  getPublishedServices,
  resolveLastModified,
} from "@/app/lib/firestore-content";

export const revalidate = 3600;

/**
 * The public index pages render from Firestore, so the sitemap has to as well.
 * Otherwise a post published in the admin panel is linked from /blog and
 * carries a self-referencing canonical, but is absent from the sitemap and from
 * generateStaticParams.
 *
 * `lastModified` is omitted for the fixed routes on purpose. These pages only
 * change when someone edits a file, and a build timestamp is not that. Google
 * ignores a `<lastmod>` it cannot verify, and a value that moves on every
 * deploy teaches it to stop trusting the whole signal. The dynamic routes carry
 * real CMS write times.
 */
const staticRoutes: MetadataRoute.Sitemap = [
  { url: site.url },
  { url: `${site.url}/services` },
  { url: `${site.url}/about` },
  { url: `${site.url}/portfolio` },
  { url: `${site.url}/blog` },
  { url: `${site.url}/pricing` },
  { url: `${site.url}/contact` },
  { url: `${site.url}/terms` },
  { url: `${site.url}/privacy` },
  // /careers is deliberately omitted. It is noindex until the page is built
  // out, and Google asks that noindex URLs stay out of the sitemap. It stays
  // crawlable through the footer link so the noindex is picked up quickly.
];

function toEntry(path: string, lastModified: Date | null): MetadataRoute.Sitemap[number] {
  return lastModified
    ? { url: `${site.url}${path}`, lastModified }
    : { url: `${site.url}${path}` };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, services, projects] = await Promise.all([
    getPublishedPosts(),
    getPublishedServices(),
    getPublishedProjects(),
  ]);

  return [
    ...staticRoutes,
    ...services.map((service) =>
      toEntry(`/services/${service.slug}`, resolveLastModified(service))
    ),
    ...projects.map((project) =>
      toEntry(`/portfolio/${project.slug}`, resolveLastModified(project))
    ),
    ...posts.map((post) => toEntry(`/blog/${post.slug}`, resolveLastModified(post))),
  ];
}
