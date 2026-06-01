import type { Metadata } from "next"
import { Hero } from "@/components/Hero"
import { WritingIndex } from "@/components/WritingIndex"

export const metadata: Metadata = {
  title: "Writing — Emily Kang",
  description: "Field notes on building software, AI workflows, and shipping.",
}

export default function BlogIndexPage() {
  return (
    <main>
      <Hero
        day={null}
        night="/headers/night-crescent-stars.png"
        variant="index"
        eyebrow="Field notes"
        title="Writing"
      />
      <div className="page-body">
        <WritingIndex />
      </div>
    </main>
  )
}
