const MAX_META_LENGTH = 155;

/**
 * Google truncates meta descriptions at roughly 155-160 characters. Longer
 * descriptions get cut mid-sentence, which reads as sloppy in the SERP and
 * wastes the click. This clamps to a word boundary so we never ship a
 * half-word fragment.
 */
export function clampMeta(text: string, max: number = MAX_META_LENGTH): string {
  const cleaned = text.replace(/\s+/g, " ").trim();

  if (cleaned.length <= max) return cleaned;

  const clipped = cleaned.slice(0, max);
  const lastSpace = clipped.lastIndexOf(" ");
  const body = lastSpace > max * 0.6 ? clipped.slice(0, lastSpace) : clipped;

  return `${body.replace(/[\s,;:.\-]+$/, "")}…`;
}

/**
 * Picks the best available description for a page that has both a short and a
 * long form. Prefers a hand-written metaDescription, then the short form.
 */
export function pickMetaDescription(
  preferred?: string,
  ...fallbacks: (string | undefined)[]
): string {
  const chosen = [preferred, ...fallbacks].find(
    (value): value is string => typeof value === "string" && value.trim().length > 0
  );

  return clampMeta(chosen ?? "");
}
