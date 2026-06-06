import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { PRODUCTS, SERIES_SLUGS, PRODUCT_SLUGS, type TagDef } from "./taxonomy"

const ROOT = path.join(process.cwd(), "content/blog")

export type Post = {
  slug: string
  title: string
  description: string
  date: Date
  series?: string
  product?: string
  topics: string[]
  issue?: number
  author?: string
  body: string
}

// gray-matter / js-yaml turns an unquoted `pubDate: 2026-05-22` into a Date and a
// quoted `pubDate: "2026-05-22"` into a string. Normalize both to a Date.
function coerceDate(value: unknown): Date {
  if (value instanceof Date) return value
  return new Date(String(value))
}

// Format and group by year using UTC so an ISO date at UTC-midnight never shifts a day.
export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getYear(d: Date): number {
  return d.getUTCFullYear()
}

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(ROOT, file), "utf8")
  const { data, content } = matter(raw)
  const slug = file.replace(/\.mdx?$/, "")

  // series and product are optional, but if present must be registered — a
  // typo'd slug fails the build rather than rendering a post unfilterable.
  const series = data.series ? String(data.series) : undefined
  if (series && !SERIES_SLUGS.has(series)) {
    throw new Error(
      `${file}: unknown series "${series}" — must be one of: ${[...SERIES_SLUGS].join(", ")}`
    )
  }
  const product = data.product ? String(data.product) : undefined
  if (product && !PRODUCT_SLUGS.has(product)) {
    throw new Error(
      `${file}: unknown product "${product}" — must be one of: ${[...PRODUCT_SLUGS].join(", ")}`
    )
  }

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: coerceDate(data.pubDate ?? data.date),
    series,
    product,
    topics: Array.isArray(data.topics) ? data.topics.map(String) : [],
    issue: typeof data.issue === "number" ? data.issue : undefined,
    author: data.author ? String(data.author) : undefined,
    body: content,
  }
}

function isDraft(file: string): boolean {
  const raw = fs.readFileSync(path.join(ROOT, file), "utf8")
  const { data } = matter(raw)
  return data.draft === true
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(ROOT)) return []
  const files = fs
    .readdirSync(ROOT)
    .filter((f) => /\.mdx?$/.test(f))
    .filter((f) => !isDraft(f))
  return files
    .map(readPost)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(ROOT)) return null
  const file = fs
    .readdirSync(ROOT)
    .find((f) => f.replace(/\.mdx?$/, "") === slug)
  if (!file) return null
  return readPost(file)
}

// Every facet value a post can be filtered by, in reading order: series,
// product, then topics. The one place facets flatten into filterable tags.
export function postTags(p: Post): string[] {
  return [p.series, p.product, ...p.topics].filter(Boolean) as string[]
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => postTags(p).includes(tag))
}

// Registered series / products that have at least one published post — the set
// the hero turns into clickable filters (empty series stay non-clickable).
export function seriesWithPosts(): Set<string> {
  const present = new Set<string>()
  for (const p of getAllPosts()) if (p.series) present.add(p.series)
  return present
}

export function productsWithPosts(): TagDef[] {
  const present = new Set<string>()
  for (const p of getAllPosts()) if (p.product) present.add(p.product)
  return PRODUCTS.filter((p) => present.has(p.slug))
}

// Posts sharing the most facets with `slug`, most-shared first then newest. If
// none share a facet, fall back to the 2 most-recent posts. `slug` is excluded.
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const all = getAllPosts()
  const others = all.filter((p) => p.slug !== slug)
  const current = all.find((p) => p.slug === slug)
  if (!current) return others.slice(0, 2)

  const currentTags = new Set(postTags(current))
  const shared = others
    .map((post) => ({
      post,
      count: postTags(post).filter((t) => currentTags.has(t)).length,
    }))
    .filter((x) => x.count > 0)
    .sort((a, b) => b.count - a.count || b.post.date.getTime() - a.post.date.getTime())

  if (shared.length === 0) return others.slice(0, 2)
  return shared.slice(0, limit).map((x) => x.post)
}
