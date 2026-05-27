export default function Home() {
  return (
    <main>
      <header className="header">
        <div className="container">
          <h1>Emily Kang</h1>
          <p className="subtitle">Execution-focused builder.</p>
          <p className="bio">
            Shipping multiple products in 2026 to prove sustained velocity and develop real execution discipline. Available for result-based contracts and full-time roles starting June 1.
          </p>
        </div>
      </header>

      <div className="container">
        <section className="section">
          <h2>Shipping Timeline</h2>
          <div className="timeline">
            <div className="product in-progress">
              <h3>TimeBox (Mortrel)</h3>
              <p className="product-date">Encryption shipping June 2, 2026</p>
              <p className="product-desc">
                AI-native calendar focused on reflection and self-awareness. Shipping end-to-end encryption June 2 with blog post on signal coding. Full UX release early August.
              </p>
              <div className="product-tags">
                <span className="tag in-progress">Encryption Shipping</span>
                <span className="tag">TypeScript, Electron</span>
              </div>
            </div>

            <div className="product in-progress">
              <h3>Parallax</h3>
              <p className="product-date">Shipping June 2–5, 2026</p>
              <p className="product-desc">
                CLI tool for understanding codebases. Uses Claude to build diagrams, traces, and multi-modal scaffolding so you know what you're working with before editing.
              </p>
              <div className="product-tags">
                <span className="tag in-progress">In Development</span>
                <span className="tag">TypeScript, Node.js, Claude API</span>
              </div>
            </div>

            <div className="product in-progress">
              <h3>Stower</h3>
              <p className="product-date">Shipping June 5–15, 2026</p>
              <p className="product-desc">
                AI-native search across your Photos and Messages. Built in Swift. Turns your digital history into something actually navigable.
              </p>
              <div className="product-tags">
                <span className="tag in-progress">In Development</span>
                <span className="tag">Swift, AI-native architecture</span>
              </div>
            </div>

            <div className="product planned">
              <h3>Kern</h3>
              <p className="product-date">Phase 1 Launch Q4 2026</p>
              <p className="product-desc">
                Infinite canvas notes app. Thinking tool for making connections, not a vault for storing things.
              </p>
              <div className="product-tags">
                <span className="tag planned">Planned</span>
                <span className="tag">React, tldraw, TypeScript</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Get in Touch</h2>
          <div className="contact-section">
            <p>Open to result-based contracts, full-time roles, and conversations about execution and shipping.</p>
            <div className="contact-links">
              <a href="mailto:emily@emilykang.dev" className="btn">
                Email
              </a>
              <a href="https://github.com/emilykang" className="btn btn-secondary">
                GitHub
              </a>
              <a href="https://twitter.com/emilykang" className="btn btn-secondary">
                Twitter
              </a>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer">
        <p>Building in public. Last updated May 26, 2026.</p>
      </footer>
    </main>
  )
}
