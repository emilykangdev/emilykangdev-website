import { NextResponse, type NextRequest } from "next/server"

// bbq.emilykang.dev is the same deployment as www.emilykang.dev, filtered to
// only the "better-business-questions" series -- founder/operator-facing
// posts, no whimsical asides. Reusing the existing /blog?tag= filter (see
// app/blog/page.tsx) means the bbq subdomain needs zero new listing/rendering
// code: it's a rewrite, not a fork.
const BBQ_HOSTNAME_PREFIX = "bbq."
const BBQ_SERIES_TAG = "better-business-questions"

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? ""
  if (!hostname.startsWith(BBQ_HOSTNAME_PREFIX)) return NextResponse.next()

  if (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/blog") {
    const url = request.nextUrl.clone()
    url.pathname = "/blog"
    url.searchParams.set("tag", BBQ_SERIES_TAG)
    return NextResponse.rewrite(url)
  }

  // Individual posts (/blog/[slug]) and everything else pass through
  // unchanged -- a bbq newsletter link should open the post directly
  // regardless of which domain it's opened from.
  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/blog"],
}
