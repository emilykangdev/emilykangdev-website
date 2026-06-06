# Blog post frontmatter format

Every `.mdx` file in `content/blog/` is a post. Frontmatter is parsed by
`lib/posts.ts` (gray-matter) and validated at build time — a bad `series`,
`product`, or `topics` value **fails the build**, it does not silently degrade.
Registered series/product slugs live in `lib/taxonomy.ts`.

## Filename

Kebab-case slug, no date prefix: `build-your-own-harness.mdx`.
The filename (minus extension) is the URL slug: `/blog/<slug>`.

Gotcha: the loader matches `.md` **and** `.mdx`, so don't put non-post
markdown (notes, READMEs) in `content/blog/` — it would render as a post.

## Template

```yaml
---
title: "Post title"
description: "One- or two-sentence summary. Renders in listings and previews."
pubDate: "2026-06-05"
issue: 6
series: "signals-over-vibes"   # optional — must be a registered slug
product: "mortrel"             # optional — must be a registered slug
topics: ["ai-workflow"]        # freeform, may be []
---
```

## Fields

| Field | Required | Rules |
|---|---|---|
| `title` | yes | Quoted string. Falls back to the slug if missing, so don't omit it. |
| `description` | yes | Quoted string. Shown in listings; empty string renders blank. |
| `pubDate` | yes | `"YYYY-MM-DD"`, quoted. (Unquoted also parses, but quote it for uniformity.) |
| `issue` | yes | Sequential integer across **all** posts, regardless of series. Next = highest existing + 1. |
| `series` | no | One registered slug from `SERIES` in `lib/taxonomy.ts`. Use the slug (`"product-posts"`), not the label (`"Product posts"`). Unknown slug = build failure. Omit for one-off posts. |
| `product` | no | One registered slug from `PRODUCTS` in `lib/taxonomy.ts` (currently `"mortrel"`). Same validation as series. |
| `topics` | no | Freeform kebab-case strings. Must be a list (a scalar fails), entries unique and non-empty, and must **not** collide with any registered series/product slug. Defaults to `[]`. |
| `draft` | no | `draft: true` hides the post from all listings and tag pages. Omit (or `false`) to publish. |
| `author` | no | Quoted string. Rarely used. |
| `last-updated` | no | Display-only date; not parsed by `lib/posts.ts`. |

## How facets work

`series`, `product`, and `topics` share one filter namespace (`/blog?tag=`),
which is why topic names can't reuse a registered slug. Related-post matching
counts shared facets across all three.

## Adding a new series or product

Add a `{ slug, label }` entry to `SERIES` or `PRODUCTS` in `lib/taxonomy.ts`
first, then reference the slug here. Array order in `SERIES` is the display
order in the hero guide.
