import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const ROOT = path.join(process.cwd(), "content/blog")

export type Post = {
  slug: string
  title: string
  description: string
  date: Date
  tags: string[]
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
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: coerceDate(data.pubDate ?? data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
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
