import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Hero } from "@/components/Hero"
import { WritingIndex } from "@/components/WritingIndex"
import { getAllTags, getPostsByTag } from "@/lib/posts"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }))
}

export function generateMetadata({
  params,
}: {
  params: { tag: string }
}): Metadata {
  const tag = decodeURIComponent(params.tag)
  return {
    title: `Tagged “${tag}” — Emily Kang`,
    description: `Writing tagged ${tag}.`,
  }
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)
  const posts = getPostsByTag(tag)
  if (posts.length === 0) notFound()

  return (
    <main>
      <Hero
        day={null}
        night="/headers/night-crescent-stars.png"
        variant="index"
        eyebrow="Tagged"
        title={tag}
      />
      <div className="page-body">
        <Link className="back-link" href="/blog">
          &larr; Back to writing
        </Link>
        <WritingIndex posts={posts} />
      </div>
    </main>
  )
}
