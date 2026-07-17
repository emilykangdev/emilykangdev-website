import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contract — Emily Kang",
  description:
    "I'm a solo entrepreneur and product engineer. I ship my own products and occasionally take short-term contracts.",
}

export default function ContractPage() {
  return (
    <main>
      <article className="page-body contract-page">
        <h1>Contract</h1>

        <section>
          <h2>What I do</h2>
          <p>
            I&rsquo;m a solo entrepreneur and product engineer. I built{" "}
            <strong><a href="https://github.com/emilykangdev/stower">Stower</a></strong> from scratch. It&rsquo;s a Mac app that reads
            iMessage&rsquo;s database and lets you write drafts for important
            conversations. It&rsquo;s shipping, and I&rsquo;m working on getting
            it into the Mac App Store. I&rsquo;ve also built PodcastBrief, an
            AI-powered pipeline that digests podcast feeds into structured
            briefs.
          </p>
          <p>
            My process is spec-first: I write down exactly what needs to happen,
            then let AI execute against that spec. Since Stower, I build and
            evolve the harness around every project, through guardrails like
            tests, linting, and skills to keep shipping clean and reliable code.
            (See <a href="/blog/build-your-own-harness">Build your own harness</a>.)
          </p>
        </section>

        <section>
          <h2>How I contract</h2>
          <p>
            I&rsquo;m not looking for full-time work at someone else&rsquo;s
            company, and I don&rsquo;t do retainers or ongoing services. Most of
            the year I&rsquo;m focused on shipping my own products and getting
            customers.
          </p>
          <p>
            If a project is a good fit and I have the bandwidth, I&rsquo;ll take
            it on as a one-time engagement with my full attention. Here&rsquo;s
            what I look for:
          </p>
          <ul>
            <li>A fixed total price.</li>
            <li>Milestone-based payments, not hourly billing.</li>
            <li>
              Around 4 weeks. That&rsquo;s enough time for me to deliver, but
              not dragging anything out.
            </li>
          </ul>
          <p>
            Scope is agreed up front during a paid scoping phase. I&rsquo;ll be honest with you based on the project about what I can reasonably deliver in 4 weeks.
            If you&rsquo;re not satisfied, the contract ends and we go our own ways. If we proceed and scope
            changes later, we write it down and adjust.
          </p>
          <p>
            When the engagement is over, you&rsquo;re not left with code only I
            can maintain. There will be documentation for you to review, and the
            codebase comes with a harness: guardrails, specifications, and
            skills so you or your team can continue shipping clean code.
          </p>
        </section>

        <section>
          <h2>Getting in touch</h2>
          <p>
            If you have a scoped problem that needs shipping, email me at{" "}
            <a href="mailto:emily@emilykang.dev" className="underline-accent">
              emily@emilykang.dev
            </a>
          </p>
          <p>
            Currently open to one contract at a time between July to September 2026.
          </p>
        </section>
      </article>
    </main>
  )
}
