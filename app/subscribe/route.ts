import { redirect } from "next/navigation"

// bbq.emilykang.dev/subscribe redirects to the Beehiiv publication's
// subscribe page. Update this URL if your publication's hosted address
// changes or if you set up a custom domain on Beehiiv.
export function GET() {
  redirect(
    "https://embeds.beehiiv.com/pub_2f0e4eb7-ece5-4332-80e8-15266bc3d46b"
  )
}
