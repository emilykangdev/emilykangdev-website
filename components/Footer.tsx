import { SubscribeForm } from "./SubscribeForm"

export function Footer() {
  return (
    <footer className="footer">
      <SubscribeForm compact />
      <div className="footer-inner">
        <span className="footer-mark">emilykang.dev</span>
        <span className="footer-note">
          Building in public — last updated {LAST_UPDATED}.
        </span>
      </div>
    </footer>
  )
}

const LAST_UPDATED = "May 2026"