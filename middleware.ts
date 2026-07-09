import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// bbq.emilykang.dev is the same Vercel project/domain as emilykang.dev (one
// site, one deploy) — this just swaps in the /bbq landing page for that
// subdomain's root so it doesn't show the portfolio homepage. Every other
// path (e.g. bbq.emilykang.dev/blog) still resolves normally.
const BBQ_HOST = "bbq.emilykang.dev"

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? ""

  if (host === BBQ_HOST && request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/bbq", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/",
}
