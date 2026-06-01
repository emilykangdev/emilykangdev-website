import type { ComponentProps } from "react"

// Most styling is handled by CSS under `.prose`. We only override a couple of
// elements for behavior (external links) and safety (plain <img>).
export const mdxComponents = {
  a: ({ href = "", children, ...props }: ComponentProps<"a">) => {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    )
  },
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ src = "", alt = "", ...props }: ComponentProps<"img">) => (
    <img src={src as string} alt={alt} loading="lazy" {...props} />
  ),
}
