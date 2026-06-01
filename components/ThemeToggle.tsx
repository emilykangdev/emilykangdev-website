"use client"

import { useEffect, useState } from "react"

type Theme = "day" | "night"

export function ThemeToggle() {
  // null until mounted — the server can't know the theme, so we render a
  // stable placeholder first and resolve the real icon in the effect.
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme) || "day"
    setTheme(current)

    // Follow the OS only while the user hasn't made an explicit choice.
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return // manual choice wins
      const next: Theme = e.matches ? "night" : "day"
      document.documentElement.dataset.theme = next
      setTheme(next)
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  function toggle() {
    const next: Theme = theme === "night" ? "day" : "night"
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem("theme", next)
    } catch {}
    setTheme(next)
  }

  const label =
    theme === null
      ? "Toggle theme"
      : theme === "night"
        ? "Switch to day"
        : "Switch to night"

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      {/* Sun shows in night (to go to day); moon shows in day (to go to night). */}
      {theme === "night" ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <line x1="12" y1="2.4" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="21.6" />
        <line x1="2.4" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="21.6" y2="12" />
        <line x1="5.2" y1="5.2" x2="7" y2="7" />
        <line x1="17" y1="17" x2="18.8" y2="18.8" />
        <line x1="18.8" y1="5.2" x2="17" y2="7" />
        <line x1="7" y1="17" x2="5.2" y2="18.8" />
      </g>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 14.5A8 8 0 1 1 9.5 4a6.3 6.3 0 0 0 10.5 10.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
