# 🎁 SiteBridge

> **Serious gifts, unserious ideas.** A Pinterest-optimized gift guide and EDC content site monetized through our own Lamamarka leather brand, Amazon Associates, and other affiliate programs (Sovrn Commerce, ShareASale). Built with Astro SSG, deployed on Cloudflare Pages.

---

## Features

- [x] **Static generation** — `output: 'static'`, zero SSR, pure HTML
- [x] **ComparisonTable** — pros/cons format with verdict row (+284% RPM in case studies)
- [x] **Pinterest-optimized** — 2:3 images, `data-pin-url`, `data-pin-description`, native save button
- [x] **Affiliate toggle** — build-time `import.meta.env.ENABLE_AMAZON_AFFILIATE`, no client-side JS (Amazon-compliant)
- [x] **Own product distinction** — Lamamarka products get "Shop Lamamarka →" CTA, affiliate gets "Check Price →"
- [x] **No hardcoded prices** — price ranges (`$`/`$$`/`$$$`) only, never concrete dollar amounts
- [x] **SEO complete** — OpenGraph, Twitter cards, Schema.org JSON-LD, sitemap, RSS
- [x] **CSS-only accordion** — native `<details>`/`<summary>`, zero JavaScript
- [x] **Affiliate disclosure** — footer on every page (FTC/Amazon Associates compliant)

---

## Project Structure

```
/
├── public/
│   ├── favicon.svg
│   └── images/          # Static images (placeholders until real images added)
├── src/
│   ├── components/
│   │   ├── Accordion.astro          # <details>/<summary>, CSS-only
│   │   ├── AffiliateDisclosure.astro # Footer on every page
│   │   ├── AmazonLink.astro         # Centralized affiliate toggle (ASIN-based)
│   │   ├── ComparisonTable.astro    # Pros/cons + verdict row
│   │   ├── EmailCapture.astro       # Newsletter signup CTA
│   │   ├── GiftGuideCard.astro      # 2:3 card with "perfect for" tag
│   │   ├── PinterestPinBox.astro    # 2:3 image + save-to-Pinterest button
│   │   ├── ProductCard.astro        # Own product vs affiliate branching
│   │   └── SEOHelmet.astro          # OG + Twitter + JSON-LD
│   ├── content/
│   │   ├── config.ts                # Zod schemas for blog collection
│   │   └── blog/                    # MDX articles
│   │       ├── gag-gifts-dads.mdx
│   │       ├── edc-knives-2026.mdx
│   │       └── leather-vs-synthetic-wallets.mdx
│   ├── layouts/
│   │   ├── BaseLayout.astro         # Root layout (header, disclosure, footer)
│   │   ├── BlogPost.astro           # Article layout with hero + tags + email CTA
│   │   └── GiftGuide.astro          # Gift guide with Lamamarka hero pick
│   ├── pages/
│   │   ├── index.astro              # Homepage
│   │   ├── about.astro              # Brand story + Lamamarka connection
│   │   ├── contact.astro            # Email + brand collaboration policy
│   │   ├── privacy.astro            # GDPR-compliant privacy policy
│   │   ├── affiliate-disclosure.astro # Full FTC disclosure page
│   │   ├── rss.xml.js               # RSS feed
│   │   └── blog/
│   │       └── [...slug].astro      # Dynamic blog route (content collection)
│   ├── styles/
│   │   └── global.css               # Tailwind directives + component classes
│   └── env.d.ts                     # ImportMetaEnv type declarations
├── .env                             # ENABLE_AMAZON_AFFILIATE=false
├── astro.config.mjs                 # output:'static', tailwind+mdx+sitemap+sharp
├── tailwind.config.mjs              # Custom theme, @tailwindcss/typography
├── tsconfig.json
└── package.json
```

---

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `http://localhost:4321` |
| `npm run build` | Build static site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro -- --sync` | Regenerate TypeScript types from content collections |

---

## Content Schema

Every blog post (MDX file in `src/content/blog/`) uses this Zod schema:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | ✅ | Post title |
| `description` | `string` (max 160) | ✅ | Meta description, also used for OG |
| `publishDate` | `Date` | ✅ | Publication date |
| `updatedDate` | `Date` | — | Last updated date |
| `heroImage.src` | `string` | ✅ | Path to hero image (should be 2:3 ratio) |
| `heroImage.alt` | `string` | ✅ | Alt text for hero image |
| `category` | enum | ✅ | `gift-guide` \| `edc` \| `review` \| `comparison` \| `listicle` \| `how-to` |
| `tags` | `string[]` | ✅ | Hashtags for filtering and RSS categories |
| `isGiftGuide` | `boolean` | — | Defaults `false`. When `true`, uses `GiftGuide.astro` layout |
| `ownProduct` | object | — | Lamamarka product featured as hero pick (name, link, image, whyPick) |
| `affiliateProducts` | array | — | Amazon/affiliate products (name, link, image, priceRange, platform) |
| `priceRange` | enum | — | `$` \| `$$` \| `$$$` — **never hardcode concrete prices** |
| `season` | enum | — | `christmas` \| `fathers-day` \| `valentines` \| `evergreen` \| `white-elephant` |
| `draft` | `boolean` | — | Defaults `false`. Draft posts are excluded from production builds |

### Example frontmatter

```yaml
title: "Gag Gifts for Dads Who Have Everything (Under $30)"
description: "12 genuinely funny gifts for the dad who buys himself everything."
publishDate: 2026-08-15
heroImage:
  src: "/images/gag-gifts-dad-hero.jpg"
  alt: "Collection of funny gag gifts on a table"
category: gift-guide
tags: ["gag gifts", "gifts for dad", "funny gifts"]
isGiftGuide: true
season: christmas
ownProduct:
  name: "Cheeky Leather Money Clip"
  link: "https://lamamarka.com/products/funny-leather-money-clip"
  image: "/images/lamamarka-cheeky-clip.jpg"
  whyPick: "Hand-stitched leather. Your dad will actually use this."
draft: false
```

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `ENABLE_AMAZON_AFFILIATE` | `false` | When `true`, appends `?tag=ТВІЙ-ТЕГ-ТУТ` to all Amazon links at build time. **Keep `false` until you get 3+ organic sales** (Amazon Associates requirement). Set in `.env`. |

### How the toggle works

The `ENABLE_AMAZON_AFFILIATE` variable is read at **build time** via `import.meta.env`. It is **never** used in client-side JavaScript (Amazon prohibits auto-tagging).

- **`false`** → clean links: `https://www.amazon.com/dp/B0EXAMPLE`
- **`true`** → tagged links: `https://www.amazon.com/dp/B0EXAMPLE?tag=ТВІЙ-ТЕГ-ТУТ`
- **Lamamarka links** are never tagged, regardless of the setting
- **Only `platform: 'amazon'`** links get tagged (not `direct`/`sovrn`/`sharesale`)

Four components share this logic: `AmazonLink.astro`, `ProductCard.astro`, `ComparisonTable.astro`, and `GiftGuideCard.astro`. Each gates the `?tag=` append on `platform === 'amazon'`.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Astro 5](https://astro.build) — static generation (`output: 'static'`) |
| **Content** | MDX via `@astrojs/mdx` (Markdown + JSX components in articles) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com) + `@tailwindcss/typography` |
| **Type safety** | TypeScript + Zod (content schemas) |
| **Images** | Sharp via built-in `astro:assets` (`@astrojs/image` not needed) |
| **SEO** | `@astrojs/sitemap` + `@astrojs/rss` + Schema.org JSON-LD |
| **Hosting** | [Cloudflare Pages](https://pages.cloudflare.com) — Git-integrated, no adapter needed |

---

## Deployment (Cloudflare Pages)

This project deploys as **pure static files** — no SSR, no `@astrojs/cloudflare` adapter (v13+ deploys to Workers, not Pages).

### Setup

1. Push to a GitHub/GitLab repository
2. In Cloudflare Pages dashboard, connect the repo
3. Configure:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Environment variables:** `ENABLE_AMAZON_AFFILIATE` (set to `true` when approved for Associates)

### Pre-deploy verification

```bash
npm run build
# Verify:
# 1. dist/ contains static HTML files (not SSR)
# 2. Total size < 100 MB
# 3. No server endpoints in output
```

---

## Architecture Decisions

1. **No `@astrojs/cloudflare` adapter** — v13+ targets Workers. Static files are accepted by Pages directly via Git integration.
2. **Build-time affiliate toggle** — Amazon prohibits client-side JS for auto-tagging. `import.meta.env` ensures the tag is applied at build time, not in the browser.
3. **Price ranges, never concrete prices** — Amazon Associates TOS prohibits displaying prices that may go stale. `$`/`$$`/`$$$` badges avoid this entirely.
4. **ComparisonTable above the fold** — real-world case study showed +284% RPM ($23 → $88) when a pros/cons comparison table was placed immediately after the intro.
5. **Pinterest 2:3 images** — Pinterest's algorithm favors 2:3 aspect ratio. Every hero image and pin box uses `aspect-ratio: 2/3`.
6. **CSS-only interactive patterns** — accordion uses native `<details>`/`<summary>`. Zero JavaScript for core UI.

---

## Forbidden

- ❌ `@astrojs/cloudflare` adapter (→ Workers, not Pages)
- ❌ SSR/hybrid mode — only `output: 'static'`
- ❌ Client-side JS for `?tag=` appending
- ❌ Hardcoded Amazon prices in any content
- ❌ Direct affiliate links in Pinterest pins (→ link to your page, not Amazon)
- ❌ AI-generated article content — placeholder text only

---

## License

MIT
