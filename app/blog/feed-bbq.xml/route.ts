import { getPostsByTag } from "@/lib/posts"
import { buildRssXml } from "@/lib/feed"

// Posts tagged with the "better-business-questions" series only -- the feed
// bbq.emilykang.dev's dedicated newsletter polls for RSS-to-email. Reuses the
// same series/product/topics filter as the site's own /blog?tag= view, so a
// post shows up here the moment its frontmatter carries the series slug.
export async function GET() {
  const xml = await buildRssXml(getPostsByTag("better-business-questions"), {
    title: "Emily Kang — Better Business Questions",
    description:
      "Founder/operator-facing posts on business models, structure, and incentives -- no whimsical asides.",
    path: "/blog/feed-bbq.xml",
  })
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
