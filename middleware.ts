import { NextResponse, type NextRequest } from "next/server"

const BBQ_HOSTNAME_PREFIX = "bbq."
const BBQ_SERIES_TAG = "better-business-questions"
const EMILYKANG_DEV_HOST = "emilykang.dev"

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? ""
  const url = request.nextUrl.clone()

  // Handle bbq.emilykang.dev subdomain traffic
  if (hostname.startsWith(BBQ_HOSTNAME_PREFIX)) {
    // Special handling for the /subscribe route on the BBQ subdomain:
    // always redirects to the Beehiiv subscribe page.
    if (url.pathname === "/subscribe") {
      return NextResponse.redirect(new URL("https://bbq.beehiiv.com/"))
    }

    // Rewrite homepage and /blog to show only BBQ posts
    if (url.pathname === "/" || url.pathname === "/blog") {
      url.pathname = "/blog"
      url.searchParams.set("tag", BBQ_SERIES_TAG)
      return NextResponse.rewrite(url)
    }

    // If it's a BBQ subdomain, and not / or /blog, and not /subscribe,
    // and the current content is NOT BBQ tagged, then redirect to main site.
    // This is hard to do without knowing the post's tag inside middleware.
    // Simpler: if it's not a BBQ post, redirect to emilykang.dev

    // For any other path *not* a BBQ post, redirect to emilykang.dev
    // This effectively ensures only explicitly rewritten or BBQ-tagged content
    // (which middleware can't check) remains on the subdomain.
    // We'll trust the /blog/[slug]/page.tsx to not show subscribe on BBQ subdomain

    // We need to exclude _next/static, _next/image, etc. from redirection
    // This is implicitly handled by the matcher config below.
    if (!url.pathname.startsWith("/_next/") && !url.pathname.startsWith("/api/") && !url.pathname.startsWith("/static/") && url.pathname !== "/favicon.ico") {
        url.protocol = "https"
        url.host = EMILYKANG_DEV_HOST
        return NextResponse.redirect(url)
    }
  }

  // Default behavior for www.emilykang.dev and other hosts
  return NextResponse.next()
}

export const config = {
  // Match all paths except those starting with /api/ or /_next/ (static assets)
  // This ensures assets are served correctly on the BBQ subdomain.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/', '/blog', '/subscribe'],
}
