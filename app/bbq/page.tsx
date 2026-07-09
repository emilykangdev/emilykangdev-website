import type { Metadata } from "next"
import Link from "next/link"
import { Hero } from "@/components/Hero"
import { NewsletterSignup } from "@/components/NewsletterSignup"

export const metadata: Metadata = {
  title: "Better Business Questions — Emily Kang",
  description:
    "One business question a day, worked through in public. A tagged track inside Emily Kang's newsletter — subscribe here, unsubscribe from the rest.",
}

export default function BetterBusinessQuestionsPage() {
  return (
    <main>
      <Hero day={null} night="/headers/night-crescent-stars.png" variant="index" title="Better Business Questions">
        <p className="hero-sub">
          One business question a day — worked through in writing, not answered from a
          template. Unions, pricing, ownership, incentives: the stuff that&rsquo;s obvious
          in hindsight and murky in the room.
        </p>
      </Hero>

      <NewsletterSignup
        tag="bbq"
        lede="This is a tag on my regular newsletter, not a separate list — subscribing here only opts you into Better Business Questions posts. Manage what you get anytime from the confirmation email's account link."
      />

      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        <Link href="/blog">&larr; Back to all writing</Link>
      </p>
    </main>
  )
}
