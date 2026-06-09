# Sai Saketh Bavisetti — Portfolio

Personal portfolio for **Sai Saketh Bavisetti**, AI Product Manager & Analyst. Built with React 19, TypeScript, Vite, Tailwind CSS v4, and Framer Motion. Installable as a PWA on iOS, Android, and desktop.

---

## Live Demo

> Deploy to GitHub Pages or your host of choice and update the URL here.

---

## Features

- **Single-page layout** — Hero, About, Impact metrics (Bento grid), Experience, Projects, Recommendations, Blog, Contact
- **Framer Motion animations** — Parallax hero, scroll-triggered reveals, spring-physics magnetic cards, staggered word entrance
- **Glassmorphism UI** — Multi-layer glass panels with `-webkit-backdrop-filter` support for iOS Safari
- **PWA ready** — Web App Manifest, Workbox service worker, offline caching, installable on iOS and Android
- **Cross-platform** — Safe-area insets for notched iPhones, `touch-action` tap delay fix, Android adaptive icons
- **Performance optimised** — `will-change: transform` on all CSS keyframe elements, blur removed from scroll-triggered animations, GPU-composited motion values throughout
- **Responsive** — Mobile-first, tested across phone, tablet, and desktop breakpoints

---

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5 |
| Bundler | Vite 7 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 12 |
| UI Primitives | Radix UI + shadcn/ui |
| PWA | vite-plugin-pwa + Workbox |
| Icon generation | @vite-pwa/assets-generator |
| Routing | TanStack Router (single route) |
| Data fetching | TanStack Query |
| Fonts | Space Grotesk, Inter, JetBrains Mono, Nohemi |
| Linting | ESLint + Prettier |

---

## Project Structure

```
portfolio/
├── public/                         # Static assets served at root
│   ├── blogs/
│   │   └── netflix-house-of-cards.html   # Published blog post
│   ├── fonts/
│   │   └── nohemi/                 # Self-hosted Nohemi typeface
│   ├── img/                        # Recommender avatars
│   │   ├── cayla.jpg
│   │   ├── joseph.jpg
│   │   └── sanika.jpg
│   ├── apple-touch-icon-180x180.png
│   ├── favicon.ico
│   ├── maskable-icon-512x512.png   # Android adaptive icon
│   ├── pwa-64x64.png
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   ├── pwa-logo.svg                # Source icon (gradient S mark)
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── assets/
│   │   └── portrait.jpeg           # Hero portrait (imported as module)
│   ├── components/
│   │   └── ui/                     # shadcn/ui component library
│   │       ├── accordion.tsx
│   │       ├── avatar.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       └── ...                 # Full Radix UI primitive set
│   ├── lib/
│   │   └── utils.ts                # cn() class merge utility
│   ├── routes/
│   │   └── index.tsx               # Entire portfolio — all sections, data, components
│   ├── main.tsx                    # React root mount
│   └── styles.css                  # Global styles, design tokens, animations
│
├── .gitignore
├── components.json                 # shadcn/ui config
├── eslint.config.js
├── index.html                      # HTML shell with all meta/PWA tags
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts                  # Vite + PWA plugin config
```

---

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (Vite 7 requirement)
- npm 10+

### Install

```bash
git clone https://github.com/BAVISETTISAKETH/portfolio.git
cd portfolio
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`. Hot module replacement is active — edits to `src/routes/index.tsx` reflect instantly.

### Build

```bash
npm run build
```

Output lands in `dist/`. The PWA service worker and manifest are generated automatically.

### Preview production build locally

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Customisation

All content — experience, projects, blog posts, recommendations, hero copy — lives in a single file:

```
src/routes/index.tsx
```

The data arrays at the top of the file are the only things you need to edit for content updates:

| Constant | What it controls |
|---|---|
| `ROLES` | Experience section tabs and bullets |
| `PROJECTS` | Project grid cards |
| `RECOMMENDATIONS` | Testimonial cards |
| `BLOG_POSTS` | Blog section cards |
| `HERO_ROLES` | Typewriter cycling roles in the hero |
| `MARQUEE_ITEMS` | Scrolling tech strip |

Design tokens (colours, typography, spacing) are in `src/styles.css` under `:root`.

---

## PWA / Mobile Support

Icons are generated from `public/pwa-logo.svg` using `@vite-pwa/assets-generator`. To regenerate after changing the logo:

```bash
npx pwa-assets-generator --preset minimal-2023 public/pwa-logo.svg
```

The manifest is injected into `index.html` automatically at build time by `vite-plugin-pwa`. The service worker (Workbox `generateSW` strategy) pre-caches all JS, CSS, HTML, fonts, and icons, and applies a `CacheFirst` strategy for Google Fonts and a `StaleWhileRevalidate` strategy for Iconify SVGs.

### iOS

- Add to Home Screen via Safari share sheet
- Status bar blends with the nav via `black-translucent` + `viewport-fit=cover`
- Safe-area insets applied to the sticky nav (top) and footer (bottom) for notched devices

### Android

- Chrome install prompt triggered by the manifest
- Adaptive icon (`maskable-icon-512x512.png`) fills any icon shape without white borders
- `theme-color` colours the system status bar

---

## Deployment

### GitHub Pages

1. Set `base` in `vite.config.ts` if deploying to a sub-path:
   ```ts
   export default defineConfig({
     base: '/portfolio/',
     // ...
   })
   ```
2. Build and push the `dist/` folder to the `gh-pages` branch, or use the GitHub Actions workflow below.

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Other hosts (Vercel, Netlify, Cloudflare Pages)

Point the build command to `npm run build` and the output directory to `dist`. No additional configuration needed — the PWA plugin handles everything at build time.

---

## Performance Notes

- All scroll-triggered animations use `opacity` + `translateY` only — no animated `filter: blur()` which would block GPU compositing
- Background blobs and the marquee strip have `will-change: transform` so they're promoted to their own compositor layers before animation starts
- The cursor-follow glow is 400×400px with `blur(80px)`, hidden on touch/coarse-pointer devices
- Framer Motion spring configs are tuned for 60fps: `stiffness 85 / damping 26 / mass 0.6` for cursor, `140 / 24` for magnetic cards

---

## License

MIT — free to use as a starting point. If you do, a credit or a star on the repo is appreciated.
