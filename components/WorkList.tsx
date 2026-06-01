import products from "@/data/software_products.json"

type Product = {
  name: string
  tagline: string
  description: string
  status: string
  link: string
  linkType: string
  featured: boolean
}

const GITHUB = "https://github.com/emilykangdev"

const STATUS_LABEL: Record<string, string> = {
  shipping: "Shipping",
  "in-development": "In development",
  planned: "Planned",
}

export function WorkList() {
  const items = (products as Product[]).filter((p) => p.featured)

  return (
    <section className="work" id="work" aria-labelledby="work-heading">
      <h2 id="work-heading" className="col-heading">
        Selected work
      </h2>
      <ul className="work-list">
        {items.map((p) => (
          <li key={p.name} className="work-item">
            <a className="work-link" href={p.link}>
              <span className="work-icon" aria-hidden="true">
                {p.name.charAt(0)}
              </span>
              <span className="work-body">
                <span className="work-name-row">
                  <span className="work-name">{p.name}</span>
                  <span className={`pill pill--${p.status}`}>
                    {STATUS_LABEL[p.status] ?? p.status}
                  </span>
                </span>
                <span className="work-desc">{p.tagline}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <a className="col-more" href={GITHUB}>
        View all work &rarr;
      </a>
    </section>
  )
}
