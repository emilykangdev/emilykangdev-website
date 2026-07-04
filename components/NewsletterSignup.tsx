"use client"

import { useId, useState, type FormEvent } from "react"

const BUTTONDOWN_USERNAME = "emilykangdev"
const ENDPOINT = `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

type Status = "idle" | "submitting" | "done" | "error"

export function NewsletterSignup({ variant }: { variant?: "footer" }) {
  const [email, setEmail] = useState("")
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
      await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email: email.trim() }),
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
          Random topics. Sign up if, somehow, the writing offers value and
          encourages you to think. No regular cadence.
        </p>
      )}

      {status === "done" ? (
        <p className="newsletter-status" data-state="done" role="status" aria-live="polite">
          {message}
        </p>
      ) : (
        <form className="newsletter-form" onSubmit={onSubmit} noValidate>
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
