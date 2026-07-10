import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeHighlight from "rehype-highlight"
import rehypeStringify from "rehype-stringify"
import type { Post } from "./posts"

export const SITE_URL = "https://www.emilykang.dev"

// RSS 2.0 + the Content module's <content:encoded>. Buttondown, beehiiv, and
// every other RSS-to-email tool read title / link / pubDate / description /
// content:encoded / guid off an <item> the same way, so one feed shape serves
// any downstream consumer.
export type FeedMeta = {
  title: string
  description: string
  path: string // e.g. "/blog/feed.xml" -- used for the feed's own <link>/self URL
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

// CDATA can't contain the literal sequence "]]>" -- split it across two
// CDATA sections if a post's rendered HTML or raw text ever contains one
// (e.g. a code sample that itself shows CDATA usage).
function cdata(value: string): string {
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`
}

// Renders a post's raw MDX body to a static HTML string via the same
// remark-gfm + rehype-highlight plugins as the website's MDXRemote pipeline
// (app/blog/[slug]/page.tsx), so structure never drifts between site and
// feed. This deliberately skips MDX/JSX evaluation (no compileMDX, no React)
// -- Next's app-router build rejects any module reachable from a Route
// Handler that imports react-dom/server, and none of the current posts use
// inline JSX/HTML anyway (mdxComponents.tsx only re-styles standard markdown
// `a`/`img`, which plain markdown already produces without a component
// override). Styling (`.prose`, rehype-highlight's `.hljs-*` theme) is
// CSS-class-based and does not travel into email regardless of renderer.
export async function renderPostHtml(post: Post): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(post.body)
  return String(file)
}

export async function buildRssXml(posts: Post[], meta: FeedMeta): Promise<string> {
  const items = await Promise.all(
    posts.map(async (post) => {
      const url = `${SITE_URL}/blog/${post.slug}`
      const html = await renderPostHtml(post)
      return `    <item>
      <title>${cdata(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${cdata(post.description)}</description>
      <content:encoded>${cdata(html)}</content:encoded>
    </item>`
    })
  )

  // Date.toUTCString() happens to produce RFC-822-compliant output, which is
  // what RSS's pubDate/lastBuildDate fields require.
  const lastBuildDate =
    posts.length > 0 ? posts[0].date.toUTCString() : new Date().toUTCString()

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xml:base="${SITE_URL}">
  <channel>
    <title>${escapeXml(meta.title)}</title>
    <link>${SITE_URL}${meta.path.replace(/\/feed(-[a-z]+)?\.xml$/, "")}</link>
    <description>${escapeXml(meta.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items.join("\n")}
  </channel>
</rss>
`
}
