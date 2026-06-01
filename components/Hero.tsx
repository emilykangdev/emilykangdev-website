import type { ReactNode } from "react"

type HeroProps = {
  /** Day banner image src, or null for "no header in day mode" (blog index). */
  day: string | null
  /** Night banner image src, or null. */
  night: string | null
  variant?: "home" | "post" | "index"
  eyebrow?: string
  title?: ReactNode
  children?: ReactNode
}

export function Hero({
  day,
  night,
  variant = "home",
  eyebrow,
  title,
  children,
}: HeroProps) {
  return (
    <header
      className={`hero hero--${variant} ${day ? "" : "hero--no-day"} ${
        night ? "" : "hero--no-night"
      }`}
    >
      {day && (
        <img className="hero-bg theme-day" src={day} alt="" aria-hidden="true" />
      )}
      {night && (
        <img
          className="hero-bg theme-night"
          src={night}
          alt=""
          aria-hidden="true"
        />
      )}
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-inner">
        {eyebrow && <p className="hero-eyebrow">{eyebrow}</p>}
        {title && <h1 className="hero-title">{title}</h1>}
        {children}
      </div>
    </header>
  )
}
