"use client"

import { useEffect, useRef } from "react"

/**
 * Beehiiv subscribe form — loads the script-based embed. The script
 * injects into the container ref so the form renders inside our layout,
 * not at the bottom of `<body>`. No extra text — the embed provides its
 * own heading and button.
 */
export function SubscribeForm({
  compact = false,
}: {
  /** Compact layout for end-of-post. Default false → full-width. */
  compact?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || el.querySelector("script[data-beehiiv-form]")) return

    const script = document.createElement("script")
    script.async = true
    script.src = "https://subscribe-forms.beehiiv.com/v3/loader.js"
    script.setAttribute("data-beehiiv-form", "4f7131ac-4152-41e4-885b-a634e4b6e8c3")
    el.appendChild(script)
  }, [])

  return (
    <div className={`subscribe ${compact ? "subscribe--compact" : ""}`}>
      <div ref={containerRef} />
    </div>
  )
}