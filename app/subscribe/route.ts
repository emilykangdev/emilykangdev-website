import { redirect } from "next/navigation"

// bbq.emilykang.dev/subscribe redirects to the Beehiiv publication's
// subscribe page.
export function GET() {
  redirect("https://bbq.beehiiv.com/?modal=signup")
}
