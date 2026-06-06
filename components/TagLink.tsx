import Link from "next/link"
import { labelFor } from "@/lib/taxonomy"

// One source of truth for tag-pill markup. `variant` selects the existing pill
// style so the index list (.tag) and post byline (.byline-tag) stay identical.
// Every facet value — series, product, or topic — links to its filtered view of
// the index; registered slugs show their friendly label, topics show the slug.
export function TagLink({
  tag,
  variant,
}: {
  tag: string
  variant: "tag" | "byline-tag"
}) {
  return (
    <Link href={`/blog?tag=${encodeURIComponent(tag)}`} className={variant}>
      {labelFor(tag)}
    </Link>
  )
}
