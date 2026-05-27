# Portfolio Website

Next.js portfolio showcasing shipping timeline and execution focus.

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the site.

## Structure

- `app/page.tsx` — Main portfolio page
- `app/layout.tsx` — Root layout with metadata
- `app/globals.css` — All styling (simple, responsive)
- `package.json` — Next.js dependencies
- `next.config.js` — Next.js configuration

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Connects to GitHub, auto-deploys on push, instant setup. Free tier included.

### Other Options

- **Netlify**: Connect GitHub repo, auto-deploy on push
- **GitHub Pages**: `next export` then push to gh-pages branch
- **Self-hosted**: `npm run build && npm start`

## Customization

Edit `app/page.tsx` to update:
- Product descriptions and shipping dates
- Contact email and social links
- Timeline and tags

Styling lives in `app/globals.css` — all responsive, no external dependencies.

## Notes

- Clean, minimal design — no unnecessary JS
- Fully responsive (desktop, tablet, mobile)
- Fast (optimized by Next.js)
- Easy to iterate on (TypeScript + React)

## Next Steps

1. `npm install`
2. `vercel` to deploy
3. Point `emilykang.dev` to Vercel project
4. Add to email signature for outreach
