"use client"

import { useId, useState, type FormEvent } from "react"

const BUTTONDOWN_USERNAME = "emilykangdev"
const ENDPOINT = `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

type Status = "idle" | "submitting" | "done" | "error"
type Scope = "everything" | "bbq"

// Tag scheme: `general` = the regular newsletter (Building and Thinking and
// everything else), `bbq` = the Better Business Questions series.
// "Everything" subscribers carry both tags; "BBQ only" subscribers carry
// just `bbq`. Sends must target these tags explicitly going forward —
// targeting "Everyone" would ignore the split and reach BBQ-only
// subscribers with general posts too.
const SCOPE_TAGS: Record<Scope, string[]> = {
  everything: ["general", "bbq"],
  bbq: ["bbq"],
}

export function NewsletterSignup({
  variant,
  defaultScope = "everything",
  lede,
}: {
  variant?: "footer"
  /** Preselected choice — "bbq" on the BBQ landing page, "everything" elsewhere. */
  defaultScope?: Scope
  /** Overrides the default "Random topics…" lede when set. */
  lede?: string
}) {
  const [email, setEmail] = useState("")
  const [scope, setScope] = useState<Scope>(defaultScope)
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")
  const id = useId()
  const isFooter = variant === "footer"

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error")
      setMessage("Please enter a valid email address.")
      return
    }
    setStatus("submitting")
    setMessage("")
    try {
      // no-cors: the embed endpoint 302-redirects to a page without CORS
      // headers, so we fire-and-forget. An opaque response still means the
      // POST landed; only a thrown error is a real failure.
      const body = new URLSearchParams({ email: email.trim() })
      for (const t of SCOPE_TAGS[scope]) body.append("tag", t)
      await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      })
      setStatus("done")
      setMessage("Thanks — check your inbox to confirm.")
    } catch {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <section
      className={isFooter ? "newsletter newsletter--footer" : "newsletter"}
      aria-labelledby={`${id}-kicker`}
    >
      <p className="newsletter-kicker" id={`${id}-kicker`}>
        {isFooter ? "By email" : "The Newsletter"}
      </p>

      {!isFooter && (
        <p className="newsletter-lede">
          {lede ??
            "Random topics. Sign up if, somehow, the writing offers value and encourages you to think. No regular cadence."}
        </p>
      )}

      {status === "done" ? (
        <p className="newsletter-status" data-state="done" role="status" aria-live="polite">
          {message}
        </p>
      ) : (
        <form
          className="newsletter-form"
          action={ENDPOINT}
          method="post"
          onSubmit={onSubmit}
          noValidate
        >
          {/* Native action/method is the no-JS + pre-hydration fallback: it
              POSTs to Buttondown (real subscribe, no email in a GET URL). After
              hydration, onSubmit's preventDefault takes over for the on-site flow. */}
          {!isFooter && (
            <fieldset className="newsletter-scope">
              <legend className="newsletter-scope-legend">What do you want?</legend>
              <label className="newsletter-scope-option">
                <input
                  type="radio"
                  name="scope"
                  value="everything"
                  checked={scope === "everything"}
                  onChange={() => setScope("everything")}
                />
                Everything
              </label>
              <label className="newsletter-scope-option">
                <input
                  type="radio"
                  name="scope"
                  value="bbq"
                  checked={scope === "bbq"}
                  onChange={() => setScope("bbq")}
                />
                Better Business Questions (BBQ) series only
              </label>
            </fieldset>
          )}
          {SCOPE_TAGS[scope].map((t) => (
            <input key={t} type="hidden" name="tag" value={t} />
          ))}
          <input
            id={id}
            className="newsletter-input"
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-label="Email address"
            aria-invalid={status === "error"}
            aria-describedby={message ? `${id}-status` : undefined}
            value={email}
            disabled={status === "submitting"}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === "error") {
                setStatus("idle")
                setMessage("")
              }
            }}
          />
          <button className="newsletter-button" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Subscribing…" : "Subscribe"}
          </button>
          {message && (
            <p
              className="newsletter-status"
              id={`${id}-status`}
              data-state={status}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}
        </form>
      )}
    </section>
  )
}
