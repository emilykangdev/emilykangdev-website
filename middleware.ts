import { NextResponse, type NextRequest } from "next/server"

// bbq.emilykang.dev is the same deployment as www.emilykang.dev, filtered to
// only the "better-business-questions" series.  When on the bbq subdomain, nav
// links (Work, Writing, Contracting, Contact, brand link) must redirect to the
// main domain so content filtering stays correct — a relative link like /blog
// on bbq.emilykang.dev lands unfiltered.
const BBQ_HOSTNAME_PREFIX = "bbq."
const MAIN_HOST = "emilykang.dev"
const BBQ_SERIES_TAG = "better-business-questions"

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? ""
  if (!hostname.startsWith(BBQ_HOSTNAME_PREFIX)) return NextResponse.next()

  const { pathname } = request.nextUrl

  // Root path and /blog on the BBQ subdomain → rewrite to the BBQ-filtered
  // blog index so visitors see only better-business-questions posts with the
  // subscribe form at the top.
  if (pathname === "/" || pathname.startsWith("/blog")) {
    const url = request.nextUrl.clone()
    url.pathname = "/blog"
    url.searchParams.set("tag", BBQ_SERIES_TAG)
    return NextResponse.rewrite(url)
  }

  // Everything else (Work anchor, Contracting, Contact, brand link) → main
  // domain.  The user should never traverse the rest of the site through
  // the BBQ subdomain.
  return NextResponse.redirect(new URL(pathname, `https://${MAIN_HOST}`))
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static          (Next.js JS/CSS bundles)
     * - _next/image           (Next.js image optimization endpoint)
     * - favicon.ico            (browser tab icon)
     * - headers/               (hero banner images)
     * - fonts/                 (font files)
     * - common image extensions
     */
    "/((?!_next/static|_next/image|favicon\\.ico|headers/.*|fonts/.*|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)",
  ],
}
