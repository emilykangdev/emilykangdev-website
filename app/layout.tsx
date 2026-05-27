import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Emily Kang — Execution-Focused Builder",
  description:
    "Shipping multiple products in 2026. Available for result-based contracts and full-time roles.",
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
