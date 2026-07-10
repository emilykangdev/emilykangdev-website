import { getAllPosts } from "@/lib/posts"
import { buildRssXml } from "@/lib/feed"

// Every published post. This is what emilykang.dev's main newsletter
// (everything) polls for RSS-to-email -- see /blog/feed-bbq.xml for the
// better-business-questions-only feed that bbq.emilykang.dev's newsletter
// consumes instead.
export async function GET() {
  const xml = await buildRssXml(getAllPosts(), {
    title: "Emily Kang — Building and Thinking",
    description: "Field notes on building software, AI workflows, and shipping.",
    path: "/blog/feed.xml",
  })
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
