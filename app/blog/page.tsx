import type { Metadata } from "next"
import Link from "next/link"
import { Hero } from "@/components/Hero"
import { WritingIndex } from "@/components/WritingIndex"
import {
  getPostsByTag,
  seriesWithPosts,
  productsWithPosts,
} from "@/lib/posts"
import { SERIES, labelFor } from "@/lib/taxonomy"

export const metadata: Metadata = {
  title: "Writing — Emily Kang",
  description: "Field notes on building software, AI workflows, and shipping.",
}

// TODO(Emily): final wording. One sentence per series; tone is yours to polish.
const SERIES_BLURB: Record<string, string> = {
  "autonomous-companies":
    "Ongoing efforts to build and grow several products sustainably — being as effective as I can, solo.",
  "signals-over-vibes":
    "The harnesses I build across products to work on signal instead of vibes, especially after sprints.",
  "society-essays":
    "Reading toward business models that put respect for all life first — and putting theory into action.",
  "product-posts":
    "Technical breakdowns of what I'm building — often post-sprint reflections on how it went.",
  "game-dev": "Art plus coding. Short games I make on the side.",
}

export default function BlogIndexPage({
  searchParams,
}: {
  searchParams: { tag?: string | string[] }
}) {
  const activeTag = Array.isArray(searchParams.tag)
    ? searchParams.tag[0]
    : searchParams.tag

  const liveSeries = seriesWithPosts()
  const products = productsWithPosts()
  const posts = activeTag ? getPostsByTag(activeTag) : undefined

  return (
    <main>
      <Hero
        day={null}
        night="/headers/night-crescent-stars.png"
        variant="index"
        title="Building and Thinking"
      >
        {/* TODO(Emily): final intro copy. */}
        <p className="hero-sub">
          One-off posts, plus a few ongoing series. Click a series to read only
          its posts.
        </p>
        <ul className="series-guide">
          {SERIES.map((s) => {
            const live = liveSeries.has(s.slug)
            return (
              <li key={s.slug} className="series-item">
                {live ? (
                  <Link className="series-name" href={`/blog?tag=${s.slug}`}>
                    {s.label}
                  </Link>
                ) : (
                  <span className="series-name series-name--empty">
                    {s.label}
                  </span>
                )}
                <span className="series-blurb">{SERIES_BLURB[s.slug]}</span>
              </li>
            )
          })}
        </ul>
        {products.length > 0 && (
          <p className="series-products">
            <span className="series-products-label">By product</span>
            {products.map((p) => (
              <Link key={p.slug} className="tag" href={`/blog?tag=${p.slug}`}>
                {p.label}
              </Link>
            ))}
          </p>
        )}
      </Hero>

      <div className="page-body">
        {activeTag && (
          <p className="filter-chip">
            <span>
              Showing <strong>{labelFor(activeTag)}</strong>
            </span>
            <Link className="filter-clear" href="/blog" aria-label="Clear filter">
              &times;
            </Link>
          </p>
        )}

        {activeTag && posts && posts.length === 0 ? (
          <p className="filter-empty">No posts in this series yet.</p>
        ) : (
          <WritingIndex posts={posts} />
        )}
      </div>
    </main>
  )
}
