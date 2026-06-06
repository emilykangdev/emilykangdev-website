import Link from "next/link"

// One source of truth for tag-pill markup. `variant` selects the existing pill
// style so the index list (.tag) and post byline (.byline-tag) stay identical —
// now linking to their tag page instead of rendering as inert spans.
export function TagLink({
  tag,
  variant,
}: {
  tag: string
  variant: "tag" | "byline-tag"
}) {
  return (
    <Link href={`/blog/tags/${encodeURIComponent(tag)}`} className={variant}>
      {tag}
    </Link>
  )
}
