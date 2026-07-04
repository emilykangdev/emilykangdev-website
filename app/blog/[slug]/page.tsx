import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { Hero } from "@/components/Hero"
import { mdxComponents } from "@/components/mdxComponents"
import { TagLink } from "@/components/TagLink"
import { RelatedPosts } from "@/components/RelatedPosts"
import { NewsletterSignup } from "@/components/NewsletterSignup"
import { getAllPosts, getPostBySlug, formatDate, postTags } from "@/lib/posts"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — Emily Kang`,
    description: post.description,
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <main>
      <Hero
        day="/headers/day-mist-sun.png"
        night="/headers/night-moon-hills.png"
        variant="post"
        title={post.title}
      />

      <article className="reading">
        <Link className="back-link" href="/blog">
          &larr; Back to writing
        </Link>

        <p className="byline">
          <time dateTime={post.date.toISOString().slice(0, 10)}>
            {formatDate(post.date)}
          </time>
          {postTags(post).map((t) => (
            <TagLink key={t} tag={t} variant="byline-tag" />
          ))}
          <span className="byline-author">{post.author ?? "Emily Kang"}</span>
        </p>

        <div className="prose">
          <MDXRemote
            source={post.body}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </div>

        <RelatedPosts slug={post.slug} />

        <NewsletterSignup />

        <Link className="back-link back-link--end" href="/blog">
          &larr; Back to writing
        </Link>
      </article>
    </main>
  )
}
