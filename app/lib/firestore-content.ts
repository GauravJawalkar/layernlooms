import { cache } from "react";
import { collection, getDocsFromServer } from "firebase/firestore";
import { db } from "./firebase.server";
import type { AdminBlogPost } from "./admin/blog";
import type { AdminProject } from "./admin/portfolio";
import type { AdminService } from "./admin/services";

export type PostDoc = AdminBlogPost;
export type ProjectDoc = AdminProject;
export type ServiceDoc = AdminService;

/**
 * The index pages have always hidden anything with `visible === false`, and
 * they read Firestore. A hidden document therefore has no presence in the
 * static data modules, so the sitemap has to apply the same filter or it would
 * advertise URLs that render as not-found for visitors.
 */
function isPublished(doc: { slug?: unknown; visible?: unknown }): boolean {
  return typeof doc.slug === "string" && doc.slug.trim().length > 0 && doc.visible !== false;
}

async function fetchCollection<T>(name: string): Promise<T[]> {
  const snapshot = await getDocsFromServer(collection(db, name));
  return snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })) as T[];
}

export const getPublishedPosts = cache(async (): Promise<PostDoc[]> =>
  (await fetchCollection<PostDoc>("blog")).filter(isPublished)
);

export const getPublishedServices = cache(async (): Promise<ServiceDoc[]> =>
  (await fetchCollection<ServiceDoc>("services")).filter(isPublished)
);

export const getPublishedProjects = cache(async (): Promise<ProjectDoc[]> =>
  (await fetchCollection<ProjectDoc>("portfolio")).filter(isPublished)
);

export const getPublishedPostBySlug = cache(
  async (slug: string): Promise<PostDoc | null> =>
    (await getPublishedPosts()).find((post) => post.slug === slug) ?? null
);

export const getPublishedServiceBySlug = cache(
  async (slug: string): Promise<ServiceDoc | null> =>
    (await getPublishedServices()).find((service) => service.slug === slug) ?? null
);

export const getPublishedProjectBySlug = cache(
  async (slug: string): Promise<ProjectDoc | null> =>
    (await getPublishedProjects()).find((project) => project.slug === slug) ?? null
);

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
 * Blog `date` is a display string ("January 15, 2026"). `new Date()` parses it
 * as local midnight, so on a UTC+5:30 machine the serialised value lands on the
 * previous day. Parse the parts and build a UTC date explicitly.
 */
export function parseDisplayDate(displayDate: string): Date | null {
  const match = displayDate.trim().match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (!match) return null;

  const monthIndex = MONTHS.indexOf(match[1].toLowerCase());
  if (monthIndex === -1) return null;

  const parsed = new Date(Date.UTC(Number(match[3]), monthIndex, Number(match[2])));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function coerceDate(value: unknown): Date | null {
  if (value === null || value === undefined) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === "object" && typeof (value as { toDate?: unknown }).toDate === "function") {
    const converted = (value as { toDate: () => Date }).toDate();
    return Number.isNaN(converted.getTime()) ? null : converted;
  }

  if (typeof value === "string") return parseDisplayDate(value);

  return null;
}

/**
 * Google only honours `<lastmod>` when it is verifiably accurate, so prefer the
 * CMS write timestamp and fall back through creation date, then the published
 * display date. A future value is dropped rather than emitted — crawlers ignore
 * it and it is always a scheduling bug.
 */
export function resolveLastModified(doc: {
  updatedAt?: unknown;
  createdAt?: unknown;
  date?: unknown;
}): Date | null {
  for (const candidate of [doc.updatedAt, doc.createdAt, doc.date]) {
    const resolved = coerceDate(candidate);
    if (resolved && resolved.getTime() <= Date.now()) return resolved;
  }

  return null;
}
