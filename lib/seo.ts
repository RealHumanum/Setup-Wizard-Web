// SERP budget helpers.
//
// Google truncates titles and descriptions by rendered pixel width, not by
// character count — but character counts are the workable proxy, and staying
// under them keeps the differentiating part of a title visible. These exist
// because the templated bike/manufacturer pages generate ~190 of the site's
// titles: a template that overruns by 20 characters overruns on 190 pages.

export const TITLE_MAX = 60;
export const DESC_MAX = 155;

export const BRAND_SUFFIX = " | Apex Wizard";

/** Trim trailing separator punctuation left behind by a cut. */
function tidy(text: string): string {
  return text.replace(/[\s—–\-,;:|.]+$/u, "");
}

/**
 * Clamp to `max`, preferring a word boundary. Falls back to a hard cut only if
 * the last space sits so early that word-boundary clamping would throw away
 * most of the string.
 */
export function clampText(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return tidy(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut);
}

/**
 * Return the first candidate that fits, else a clamp of the last one.
 *
 * Order candidates richest-first. The brand suffix is the first thing worth
 * sacrificing — "Apex Wizard" is already in the URL, the breadcrumb and
 * og:site_name, whereas the model name is the only part that distinguishes one
 * of 190 near-identical pages from the next.
 */
export function pickTitle(candidates: string[], max = TITLE_MAX): string {
  for (const candidate of candidates) {
    if (candidate.length <= max) return candidate;
  }
  return clampText(candidates[candidates.length - 1] ?? "", max);
}

/** Append the brand suffix only when the result still fits the budget. */
export function withBrand(title: string, max = TITLE_MAX): string {
  return pickTitle([`${title}${BRAND_SUFFIX}`, title], max);
}

/** Safety net for hand-written descriptions. Generated copy should already fit. */
export function clampDescription(text: string, max = DESC_MAX): string {
  return clampText(text, max);
}
