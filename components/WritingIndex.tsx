import Link from "next/link"
import { getAllPosts, formatDate, getYear, type Post } from "@/lib/posts"

export function WritingIndex() {
  const posts = getAllPosts()
  const years = groupByYear(posts)

  return (
    <div className="field-notes">
      {years.map(([year, yearPosts]) => (
        <section key={year} className="year-group" aria-label={`${year}`}>
          <div className="year-head">
            <span className="year-accent" aria-hidden="true" />
            <h2 className="year-label">{year}</h2>
          </div>
          <ol className="post-rows">
            {yearPosts.map((post) => (
              <li key={post.slug} className="post-row">
                <Link href={`/blog/${post.slug}`} className="post-row-title">
                  {post.title}
                </Link>
                {post.description && (
                  <p className="post-row-desc">{post.description}</p>
                )}
                <p className="post-row-meta">
                  <time dateTime={post.date.toISOString().slice(0, 10)}>
                    {formatDate(post.date)}
                  </time>
                  {post.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}

function groupByYear(posts: Post[]): [number, Post[]][] {
  const map = new Map<number, Post[]>()
  for (const p of posts) {
    const y = getYear(p.date)
    if (!map.has(y)) map.set(y, [])
    map.get(y)!.push(p)
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0])
}
