import Link from "next/link"
import { getRelatedPosts, formatDate } from "@/lib/posts"

// Quiet "keep reading" block at the foot of a post: a few related titles, no
// descriptions. Reuses .post-row-title (hover underline) and .post-row-meta.
export function RelatedPosts({ slug }: { slug: string }) {
  const related = getRelatedPosts(slug)
  if (related.length === 0) return null

  return (
    <nav className="related" aria-label="Related posts">
      <p className="related-label">Related</p>
      <ul className="related-list">
        {related.map((post) => (
          <li key={post.slug} className="related-item">
            <Link href={`/blog/${post.slug}`} className="post-row-title">
              {post.title}
            </Link>
            <p className="post-row-meta">
              <time dateTime={post.date.toISOString().slice(0, 10)}>
                {formatDate(post.date)}
              </time>
            </p>
          </li>
        ))}
      </ul>
    </nav>
  )
}
