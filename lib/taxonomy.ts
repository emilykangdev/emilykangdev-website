// Single source of truth for the blog's two registered tag facets: series (the
// content tracks) and products. Topics are freeform and intentionally absent
// here. A post's frontmatter carries the slugs; this file owns their labels,
// order, and validity. Read by posts.ts (validation), the hero (filter
// keywords), TagLink (pill labels), and the filter chip.

export type TagDef = { slug: string; label: string }

// Order here is the order series appear in the hero guide.
export const SERIES: TagDef[] = [
  { slug: "autonomous-companies", label: "Autonomous companies" },
  { slug: "signals-over-vibes", label: "Signals over vibes" },
  { slug: "society-essays", label: "Society essays" },
  { slug: "product-posts", label: "Product posts" },
  { slug: "game-dev", label: "Game dev" },
]

export const PRODUCTS: TagDef[] = [{ slug: "mortrel", label: "Mortrel" }]

export const SERIES_SLUGS = new Set(SERIES.map((s) => s.slug))
export const PRODUCT_SLUGS = new Set(PRODUCTS.map((p) => p.slug))

const LABELS = new Map(
  [...SERIES, ...PRODUCTS].map((t) => [t.slug, t.label] as const)
)

// Friendly label for a registered slug; falls back to the slug itself for
// freeform topics (which have no registry entry).
export function labelFor(slug: string): string {
  return LABELS.get(slug) ?? slug
}
