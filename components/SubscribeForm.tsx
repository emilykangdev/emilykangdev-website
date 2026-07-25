"use client"

import { useEffect, useState } from "react"

/**
 * Beehiiv embed — wraps the publication's iframe embed with theme awareness.
 *
 * Set NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID in your environment, or pass it as
 * the `publicationId` prop.
 *
 * Will render nothing (hidden placeholder) until publicationId is set.
 */
export function SubscribeForm({
  publicationId: explicitId,
  compact = false,
}: {
  /** Override the env-var publication ID (optional). */
  publicationId?: string
  /** Compact layout for footer / end-of-post. Default false → full-width. */
  compact?: boolean
}) {
  const publicationId =
    explicitId ?? process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID

  const [theme, setTheme] = useState<string>("light")

  // Sync with the site's theme attribute so the embed matches day/night.
  useEffect(() => {
    const el = document.documentElement
    const update = () => setTheme(el.dataset.theme === "night" ? "dark" : "light")
    update()
    const observer = new MutationObserver(update)
    observer.observe(el, { attributes: true, attributeFilter: ["data-theme"] })
    return () => observer.disconnect()
  }, [])

  if (!publicationId) {
    // Quiet placeholder until the user configures their Beehiiv ID.
    return (
      <div className="subscribe-placeholder" aria-hidden="true" />
    )
  }

  const embedUrl = `https://embeds.beehiiv.com/${publicationId}?size=${compact ? "compact" : "standard"}&theme=${theme}`

  return (
    <div className={`subscribe ${compact ? "subscribe--compact" : ""}`}>
      <div className="subscribe-inner">
        <h3 className="subscribe-heading">Subscribe to the newsletter</h3>
        <p className="subscribe-blurb">
          Field notes on building software, AI workflows, and shipping — sent
          when there&rsquo;s something worth saying.
        </p>
        <iframe
          src={embedUrl}
          className="subscribe-embed"
          height={compact ? 120 : 220}
          width="100%"
          frameBorder="0"
          scrolling="no"
          title="Newsletter subscription form"
          loading="lazy"
        />
      </div>
    </div>
  )
}