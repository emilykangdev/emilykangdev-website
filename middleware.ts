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

  // Allow root path to pass through (rewritten by Vercel at the edge).
  if (pathname === "/") return NextResponse.next()

  // Blog pages from the BBQ subdomain → main domain with the series tag filter,
  // so the existing ?tag= filtering in app/blog/page.tsx keeps working.
  if (pathname.startsWith("/blog")) {
    const dest = new URL(pathname, `https://${MAIN_HOST}`)
    dest.searchParams.set("tag", BBQ_SERIES_TAG)
    return NextResponse.redirect(dest)
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
