import type { Metadata, Viewport } from "next"
import { Spectral, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Emily Kang — builder who likes to write",
  description:
    "I build software that helps people think and create. Open to contract and meaningful collaboration.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

// Set the theme before first paint so there is no flash of the wrong theme.
const themeBootstrap = `(function(){try{var s=localStorage.getItem('theme');var t=s||(matchMedia('(prefers-color-scheme: dark)').matches?'night':'day');document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='day';}})();`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spectral.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
