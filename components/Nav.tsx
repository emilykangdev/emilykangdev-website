"use client"

import Link from "next/link"
import { useState } from "react"
import { ThemeToggle } from "./ThemeToggle"

const LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "/#contact" },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-name">
            emilykang<span className="brand-dot">.</span>dev
          </span>
          <span className="brand-tag">builder who likes to write</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="nav-mobile-controls">
          <ThemeToggle />
          <button
            type="button"
            className="hamburger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`hamburger-box ${open ? "is-open" : ""}`}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="nav-drawer" aria-label="Mobile">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-drawer-link"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
