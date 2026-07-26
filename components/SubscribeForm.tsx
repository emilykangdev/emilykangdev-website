"use client"

/**
 * Beehiiv subscribe form — loads the script-based embed with the BBQ
 * newsletter's form ID. Theme-aware (day/night).
 */
export function SubscribeForm({
  compact = false,
}: {
  /** Compact layout for end-of-post. Default false → full-width. */
  compact?: boolean
}) {
  return (
    <div className={`subscribe ${compact ? "subscribe--compact" : ""}`}>
      <div className="subscribe-inner">
        <h3 className="subscribe-heading">
          Subscribe to Better Business Questions
        </h3>
        <p className="subscribe-blurb">
          One question at a time — grilling the assumptions we take for granted
          about business today.
        </p>
        <script
          async
          src="https://subscribe-forms.beehiiv.com/v3/loader.js"
          data-beehiiv-form="4f7131ac-4152-41e4-885b-a634e4b6e8c3"
        />
      </div>
    </div>
  )
}
