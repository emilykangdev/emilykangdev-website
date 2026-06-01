import Link from "next/link"
import { Hero } from "@/components/Hero"
import { WorkList } from "@/components/WorkList"
import { getAllPosts, formatDate } from "@/lib/posts"

export default function Home() {
  const latest = getAllPosts().slice(0, 4)

  return (
    <main>
      <Hero day="/headers/day-header.png" night="/headers/night-header.png" variant="home">
        <h1 className="hero-title">
          I build software that helps people{" "}
          <span className="underline-accent">think and create.</span>
        </h1>
        <p className="hero-sub">Open to contract and meaningful collaboration.</p>
      </Hero>

      <div className="home-columns">
        <WorkList />

        <section className="writing-col" aria-labelledby="writing-heading">
          <h2 id="writing-heading" className="col-heading">
            Writing
          </h2>
          <ul className="writing-mini">
            {latest.map((post) => (
              <li key={post.slug} className="writing-mini-item">
                <Link href={`/blog/${post.slug}`} className="writing-mini-title">
                  {post.title}
                </Link>
                <time
                  className="writing-mini-date"
                  dateTime={post.date.toISOString().slice(0, 10)}
                >
                  {formatDate(post.date)}
                </time>
              </li>
            ))}
          </ul>
          <Link className="col-more" href="/blog">
            View all writing &rarr;
          </Link>
        </section>
      </div>

      <section className="connect" id="contact" aria-labelledby="connect-heading">
        <h2 id="connect-heading" className="connect-heading">
          Let&rsquo;s connect
        </h2>
        <p className="connect-lead">
          Open to result-based contracts, full-time roles, and conversations
          about execution and shipping.
        </p>
        <div className="connect-links">
          <a className="connect-link" href="mailto:emily@emilykang.dev">
            <span className="connect-key">Email</span>
            emily@emilykang.dev
          </a>
          <a
            className="connect-link"
            href="https://github.com/emilykangdev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="connect-key">GitHub</span>
            github.com/emilykangdev
          </a>
        </div>
      </section>
    </main>
  )
}
