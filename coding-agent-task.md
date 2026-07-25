# 🤖 ТЕХНІЧНЕ ЗАВДАННЯ ДЛЯ АГЕНТА: SiteBridge — Розробка Сайту

> **Контекст:** Pinterest → Gift Guide/EDC Content Site → lamamarka + Affiliate монетизація
> **Фреймворк:** Astro SSG (`output: 'static'`) + Tailwind CSS + MDX
> **Хостинг:** Cloudflare Pages (без `@astrojs/cloudflare` адаптера!)
> **Ніша:** Men's Gift Guides + Humor + EDC Lifestyle

---

## 0. КРИТИЧНІ ПРАВИЛА (прочитай перед початком)

1. **`@astrojs/cloudflare` не використовувати.** v13+ деплоїть на Workers, не на Pages. Для статики адаптер не потрібен — Cloudflare Pages приймає статичні файли напряму через Git-інтеграцію.
2. **`ENABLE_AMAZON_AFFILIATE` — build-time `import.meta.env`**, не клієнтський JS. Amazon забороняє auto-tagging.
3. **Жодних хардкоджених цін Amazon.** Ні в Markdown, ні в HTML. Тільки кнопка "Check Price on Amazon".
4. **Comparison Table — обов'язковий компонент.** +284% RPM. Формат "pros & cons" + verdict row.
5. **Affiliate disclosure у футері кожної сторінки.** Обов'язково для Amazon Associates.
6. **Pinterest-оптимізовані зображення:** 2:3 співвідношення, `data-pin-url`, `data-pin-description`.

---

## 1. ІНІЦІАЛІЗАЦІЯ ПРОЄКТУ

### 1.1 Створити проєкт

```bash
npm create astro@latest sitebridge -- --template blog
cd sitebridge
npx astro add tailwind
```

### 1.2 Конфігурація

**`astro.config.mjs`:**
```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',  // КРИТИЧНО: статика, не SSR
  integrations: [tailwind()],
  site: 'https://ТВІЙ-ДОМЕН.com',  // замінити
});
```

**ЖОДНОГО `@astrojs/cloudflare` адаптера.** Cloudflare Pages приймає статичні файли напряму.

### 1.3 Структура проєкту

```
/
├── src/
│   ├── components/
│   │   ├── ProductCard.astro        # 🔴 P0
│   │   ├── ComparisonTable.astro    # 🔴 P0 (+284% RPM!)
│   │   ├── PinterestPinBox.astro    # 🔴 P0
│   │   ├── AmazonLink.astro        # 🔴 P0
│   │   ├── GiftGuideCard.astro     # 🟡 P1
│   │   ├── Accordion.astro         # 🟡 P1 (<details> нативний)
│   │   ├── SEOHelmet.astro         # 🔴 P0
│   │   ├── EmailCapture.astro      # 🟡 P1
│   │   └── AffiliateDisclosure.astro # 🔴 P0
│   ├── content/
│   │   ├── config.ts               # 🔴 P0 — Zod схеми
│   │   └── blog/                   # Статті (MDX)
│   ├── layouts/
│   │   ├── BaseLayout.astro        # 🔴 P0
│   │   ├── BlogPost.astro          # 🔴 P0
│   │   └── GiftGuide.astro         # 🟡 P1 — special layout for gift guides
│   ├── pages/
│   │   ├── index.astro             # 🔴 P0 — homepage
│   │   ├── about.astro             # 🔴 P0
│   │   ├── contact.astro           # 🔴 P0
│   │   ├── privacy.astro           # 🔴 P0
│   │   ├── affiliate-disclosure.astro # 🔴 P0
│   │   └── rss.xml.js              # 🟢 P2 (опціонально)
│   └── styles/
│       └── global.css
├── public/
│   ├── favicon.svg
│   └── images/                     # Статичні зображення
├── .env                            # ENABLE_AMAZON_AFFILIATE=false
└── astro.config.mjs
```

---

## 2. CONTENT COLLECTIONS (Zod)

### 2.1 `src/content/config.ts`

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    category: z.enum(['gift-guide', 'edc', 'review', 'comparison', 'listicle', 'how-to']),
    tags: z.array(z.string()),
    isGiftGuide: z.boolean().default(false),
    // Власний продукт lamamarka — hero pick
    ownProduct: z.object({
      name: z.string(),
      link: z.string(),           // Shopify product link
      image: z.string(),
      whyPick: z.string(),        // Чому це hero pick
    }).optional(),
    // Affiliate продукти
    affiliateProducts: z.array(z.object({
      name: z.string(),
      link: z.string(),           // Amazon/affiliate link (без ?tag= при false)
      image: z.string(),
      priceRange: z.enum(['$', '$$', '$$$']),  // ЖОДНИХ фіксованих цін!
      platform: z.enum(['amazon', 'sovrn', 'sharesale', 'direct']),
    })).optional(),
    priceRange: z.enum(['$', '$$', '$$$']).optional(),
    season: z.enum(['christmas', 'fathers-day', 'valentines', 'evergreen', 'white-elephant']).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

---

## 3. КОМПОНЕНТИ

### 3.1 `<ProductCard />` — 🔴 P0

```astro
---
interface Props {
  name: string;
  image: string;
  link: string;
  isOwnProduct: boolean;
  whyPick?: string;       // Для lamamarka: "Hand-stitched. Built to last."
  priceRange?: '$' | '$$' | '$$$';
  platform?: 'amazon' | 'sovrn' | 'sharesale' | 'direct';
}

const { name, image, link, isOwnProduct, whyPick, priceRange, platform } = Astro.props;
const isAffiliateEnabled = import.meta.env.ENABLE_AMAZON_AFFILIATE === 'true';
---

<div class="product-card">
  <img src={image} alt={name} loading="lazy" />
  <h3>{name}</h3>
  {priceRange && <span class="price-range">{priceRange}</span>}

  {isOwnProduct ? (
    <>
      {whyPick && <p class="why-pick">{whyPick}</p>}
      <a href={link} class="cta-own" target="_blank" rel="noopener">
        Shop on Lamamarka →
      </a>
    </>
  ) : (
    <a
      href={isAffiliateEnabled ? `${link}?tag=ТВІЙ-ТЕГ-ТУТ` : link}
      class="cta-affiliate"
      target="_blank"
      rel="nofollow noopener sponsored"
    >
      Check Price →
    </a>
  )}
</div>
```

**Вимоги:**
- Lamamarka картки — розміщувати в hero/закріплених позиціях
- Affiliate картки — стриманий дизайн, "Check Price" без цифр
- `ENABLE_AMAZON_AFFILIATE=false` → чисті лінки (без `?tag=`)
- `rel="nofollow sponsored"` на всіх affiliate лінках

### 3.2 `<ComparisonTable />` — 🔴 P0

**Найсильніший CRO-елемент проєкту.** +284% RPM ($23 → $88).

```astro
---
interface Product {
  name: string;
  image: string;
  isOwnProduct: boolean;
  pros: string[];
  cons: string[];
  priceRange: '$' | '$$' | '$$$';
  link: string;
  verdict: string;  // "Best Overall", "Best Budget", etc.
}

interface Props {
  title: string;
  products: Product[];
}

const { title, products } = Astro.props;
---

<div class="comparison-table">
  <h2>{title}</h2>
  <div class="table-grid">
    {products.map((p) => (
      <div class="product-row">
        <img src={p.image} alt={p.name} />
        <div class="info">
          <h3>{p.name}</h3>
          <span class="verdict">{p.verdict}</span>
          <span class="price">{p.priceRange}</span>
          <ul class="pros">{p.pros.map(pr => <li>✅ {pr}</li>)}</ul>
          <ul class="cons">{p.cons.map(c => <li>❌ {c}</li>)}</ul>
          <a href={p.link} class="cta" target="_blank" rel="nofollow sponsored">
            {p.isOwnProduct ? 'Shop Lamamarka →' : 'Check Price →'}
          </a>
        </div>
      </div>
    ))}
  </div>
  <div class="verdict-row">
    <strong>🏆 Our Pick:</strong> {/* Назва lamamarka продукту як hero pick */}
  </div>
</div>
```

**Вимоги:**
- Формат "pros & cons" (не сітка характеристик)
- Verdict row з чіткою рекомендацією
- CTA кнопка прямо в рядку таблиці
- Розміщувати **одразу після інтро** (above the fold)
- lamamarka продукт — ЗАВЖДИ hero pick (якщо є в гайді)

### 3.3 `<PinterestPinBox />` — 🔴 P0

```astro
---
interface Props {
  image: string;       // 2:3 співвідношення!
  description: string;
  url: string;
}

const { image, description, url } = Astro.props;
---

<div class="pin-box">
  <img
    src={image}
    alt={description}
    data-pin-url={url}
    data-pin-description={description}
    loading="lazy"
    class="pin-image"
  />
  <button
    class="save-to-pinterest"
    onclick={`window.open('https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description)}&media=${encodeURIComponent(image)}', '_blank')`}
  >
    Save to Pinterest
  </button>
</div>
```

**Вимоги:**
- Зображення строго 2:3 співвідношення (напр. 1000×1500px)
- `data-pin-url` для контролю цільового URL
- `data-pin-description` — keyword-rich опис
- CSS: `object-fit: cover`, `aspect-ratio: 2/3`

### 3.4 `<AmazonLink />` — 🔴 P0

Централізована логіка affiliate-перемикача.

```astro
---
interface Props {
  asin: string;
  text?: string;
}

const { asin, text = 'Check Price on Amazon' } = Astro.props;
const isAffiliateEnabled = import.meta.env.ENABLE_AMAZON_AFFILIATE === 'true';

const baseUrl = `https://www.amazon.com/dp/${asin}`;
const href = isAffiliateEnabled
  ? `${baseUrl}?tag=ТВІЙ-ТЕГ-ТУТ`
  : baseUrl;
---

<a href={href} target="_blank" rel="nofollow noopener sponsored">
  {text} →
</a>
```

**Вимоги:**
- `import.meta.env.ENABLE_AMAZON_AFFILIATE` — **build-time**. При `false` → чистий лінк.
- НЕ використовувати клієнтський JS для додавання тегів (auto-tagging заборонено Amazon)
- Тег `ТВІЙ-ТЕГ-ТУТ` — замінити на реальний після реєстрації в AA

### 3.5 `<GiftGuideCard />` — 🟡 P1

Картка для gift guide layout — фото + quick facts + ціна + "чому це класний подарунок".

```astro
---
interface Props {
  name: string;
  image: string;
  priceRange: '$' | '$$' | '$$$';
  perfectFor: string;    // "Dads who grill", "Minimalist men"
  link: string;
  isOwnProduct: boolean;
}

const { name, image, priceRange, perfectFor, link, isOwnProduct } = Astro.props;
---

<div class="gift-card">
  <img src={image} alt={name} loading="lazy" />
  <div class="info">
    <h4>{name}</h4>
    <span class="price">{priceRange}</span>
    <span class="perfect-for">🎯 {perfectFor}</span>
    <a href={link} target="_blank" rel="nofollow sponsored">
      {isOwnProduct ? 'Shop Lamamarka →' : 'Check Price →'}
    </a>
  </div>
</div>
```

### 3.6 `<Accordion />` — 🟡 P1

**Нативний HTML, нуль JS** — `<details>` + `<summary>`:

```astro
---
interface Props {
  items: { title: string; content: string }[];
}

const { items } = Astro.props;
---

<div class="accordion">
  {items.map((item) => (
    <details>
      <summary>{item.title}</summary>
      <p>{item.content}</p>
    </details>
  ))}
</div>
```

Стилізувати через CSS: `details[open] summary { ... }`, анімації через `@keyframes`.

### 3.7 `<SEOHelmet />` — 🔴 P0

```astro
---
interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'article' | 'product';
  publishDate?: Date;
}

const { title, description, image, type = 'article', publishDate } = Astro.props;
const siteName = 'ТВІЙ-САЙТ'; // замінити
---

<!-- OpenGraph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content={type} />
<meta property="og:site_name" content={siteName} />
{image && <meta property="og:image" content={image} />}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
{image && <meta name="twitter:image" content={image} />}

<!-- Schema.org JSON-LD -->
<script type="application/ld+json" set:html={JSON.stringify({
  '@context': 'https://schema.org',
  '@type': type === 'product' ? 'Product' : 'Article',
  headline: title,
  description,
  image,
  datePublished: publishDate?.toISOString(),
  publisher: {
    '@type': 'Organization',
    name: siteName,
  },
})}>
</script>
```

### 3.8 `<AffiliateDisclosure />` — 🔴 P0

Розміщується у футері **кожної** сторінки.

```astro
<footer class="affiliate-disclosure">
  <p>
    🛒 <strong>Affiliate Disclosure:</strong> This site contains affiliate links. 
    If you click and make a purchase, we may earn a commission at no extra cost to you. 
    As an Amazon Associate, we earn from qualifying purchases. 
    Our own products (lamamarka) are clearly marked.
  </p>
</footer>
```

---

## 4. СТОРІНКИ

### 4.1 Homepage (`src/pages/index.astro`)

- Hero: lamamarka featured product + tagline ("Serious gifts, unserious ideas")
- Latest gift guides (6-8 карток)
- Trending EDC articles
- "Seen on Pinterest" social proof section
- Email capture CTA

### 4.2 Blog Post (`src/layouts/BlogPost.astro`)

- Hero image (2:3 Pinterest-оптимізоване)
- Table of Contents (build-time з markdown headings)
- Контент з вбудованими `<ComparisonTable />`, `<ProductCard />`, `<PinterestPinBox />`
- Author bio (опціонально)
- Email capture в кінці
- Affiliate disclosure у футері

### 4.3 Gift Guide Layout (`src/layouts/GiftGuide.astro`)

- Спеціальний layout для gift guide статей
- `<ComparisonTable />` на початку (above the fold)
- Секція з `<GiftGuideCard />` — 5-10 подарунків
- Lamamarka продукт на першій позиції з позначкою "🏆 Our Pick"
- Pinterest-оптимізоване hero image

### 4.4 Trust Pages

| Сторінка | Контент |
|----------|---------|
| **About** | Хто ми, чому gift guides, зв'язок з lamamarka (чесна історія бренду) |
| **Contact** | Email форма або email address |
| **Privacy Policy** | GDPR-сумісна, affiliate tracking disclosure |
| **Affiliate Disclosure** | Повна сторінка з деталями (плюс скорочена версія у футері) |

---

## 5. ENV ТА КОНФІГУРАЦІЯ

### `.env`:

```bash
ENABLE_AMAZON_AFFILIATE=false
# Коли отримаєш 3+ органічні продажі — змінити на true
```

### `src/env.d.ts`:

```ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ENABLE_AMAZON_AFFILIATE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## 6. СТИЛІ ТА Tailwind

### 6.1 Глобальні стилі

- Pinterest-оптимізована типографія (читабельна на мобільних)
- Кнопки: різні стилі для lamamarka (помітні, брендовані) vs affiliate (стримані)
- `prose` клас для контенту статей
- `aspect-ratio: 2/3` для всіх pin-зображень

### 6.2 CSS-only engagement patterns

- `<details>` анімація відкриття
- `scroll-snap` для горизонтальної галереї gift cards
- `:hover` ефекти на product cards
- `:target` для табів (без JS)

---

## 7. ДЕПЛОЙ НА CLOUDFLARE PAGES

### 7.1 Без адаптера

Cloudflare Pages автоматично визначає Astro і виконує `npm run build`. Статичні файли з `dist/` деплояться напряму.

**Build command:** `npm run build`
**Output directory:** `dist`

### 7.2 Перевірка перед деплоєм

```bash
npm run build
# Переконатися що:
# 1. dist/ містить статичні HTML файли
# 2. Жодних SSR-ендпоінтів немає
# 3. < 100MB (Cloudflare Pages ліміт на сайт)
```

---

## 8. ТЕСТУВАННЯ

### Чекліст перед запуском:

- [ ] `ENABLE_AMAZON_AFFILIATE=false` → лінки без `?tag=`
- [ ] `ENABLE_AMAZON_AFFILIATE=true` → лінки з `?tag=ТВІЙ-ТЕГ`
- [ ] `<ComparisonTable />` рендериться з pros/cons + verdict row
- [ ] lamamarka products → "Shop Lamamarka →" кнопка
- [ ] Affiliate products → "Check Price →" кнопка
- [ ] Pinterest images: 2:3 співвідношення, `data-pin-url` присутній
- [ ] Affiliate disclosure у футері кожної сторінки
- [ ] Schema.org JSON-LD валідний (перевірити через Google Rich Results Test)
- [ ] OpenGraph теги присутні
- [ ] Сторінки About/Contact/Privacy існують
- [ ] Lighthouse score > 90 (mobile)
- [ ] Немає хардкоджених цін Amazon
- [ ] RSS feed працює (опціонально)

---

## 9. ПРИКЛАД СТАТТІ (MDX)

```mdx
---
title: "Gag Gifts for Dads Who Have Everything (Under $30)"
description: "12 genuinely funny gifts for the dad who buys himself everything. Zero socks. All laughs."
publishDate: 2026-08-15
heroImage:
  src: "/images/gag-gifts-dad-hero.jpg"
  alt: "Collection of funny gag gifts arranged on a table"
category: gift-guide
tags: ["gag gifts", "gifts for dad", "funny gifts", "under $30", "white elephant"]
isGiftGuide: true
season: christmas
ownProduct:
  name: "Cheeky Leather Money Clip"
  link: "https://lamamarka.com/products/funny-leather-money-clip"
  image: "/images/lamamarka-cheeky-clip.jpg"
  whyPick: "Hand-stitched leather. Unserious message. Your dad will actually use this."
affiliateProducts:
  - name: "Funny Grill Apron"
    link: "https://www.amazon.com/dp/B0EXAMPLE1"
    image: "/images/grill-apron.jpg"
    priceRange: "$"
    platform: amazon
  - name: "Dad Joke Button"
    link: "https://www.amazon.com/dp/B0EXAMPLE2"
    image: "/images/dad-joke-button.jpg"
    priceRange: "$"
    platform: amazon
draft: false
---

import ComparisonTable from '../../components/ComparisonTable.astro';
import GiftGuideCard from '../../components/GiftGuideCard.astro';
import PinterestPinBox from '../../components/PinterestPinBox.astro';

<PinterestPinBox
  image="/images/gag-gifts-dad-pin.jpg"
  description="12 funny gag gifts for dads who have everything. Under $30."
  url="https://ТВІЙ-САЙТ.com/gag-gifts-dads-who-have-everything"
/>

## The Problem with Buying Gifts for Dad

Your dad has everything. He bought it himself. On Prime Day. At 3 AM.

So what do you get the guy who needs nothing? Something he'd never buy himself — 
because he'd be too embarrassed to admit he wants it.

Here are 12 gifts that will make him laugh, groan, and secretly love you more.

<ComparisonTable
  title="Quick Comparison: Best Gag Gifts for Dad"
  products={[
    {
      name: "Cheeky Leather Money Clip — Lamamarka",
      image: "/images/lamamarka-cheeky-clip.jpg",
      isOwnProduct: true,
      pros: ["Hand-stitched full-grain leather", "Actually useful", "Conversation starter"],
      cons: ["Dad might show it to everyone", "Mom might not approve the message"],
      priceRange: "$$",
      link: "https://lamamarka.com/products/funny-leather-money-clip",
      verdict: "🏆 Best Overall"
    },
    {
      name: "Funny Grill Apron",
      image: "/images/grill-apron.jpg",
      isOwnProduct: false,
      pros: ["Machine washable", "100% cotton"],
      cons: ["One size", "Dad might take the message too seriously"],
      priceRange: "$",
      link: "https://www.amazon.com/dp/B0EXAMPLE1",
      verdict: "Best for Grill Dads"
    }
  ]}
/>

{/* ... more content ... */}
```

---

## 10. ПОРЯДОК ВИКОНАННЯ

| Крок | Задача | Пріоритет |
|------|--------|-----------|
| 1 | Ініціалізувати Astro + Tailwind. Налаштувати `output: 'static'` | 🔴 P0 |
| 2 | Створити `src/content/config.ts` з Zod-схемою | 🔴 P0 |
| 3 | Розробити `<SEOHelmet />` + `<BaseLayout />` | 🔴 P0 |
| 4 | Розробити `<ProductCard />` з `isOwnProduct` логікою | 🔴 P0 |
| 5 | Розробити `<ComparisonTable />` (pros/cons + verdict) | 🔴 P0 |
| 6 | Розробити `<PinterestPinBox />` (2:3 + data-атрибути) | 🔴 P0 |
| 7 | Розробити `<AmazonLink />` (централізована логіка) | 🔴 P0 |
| 8 | Додати `.env` + `env.d.ts` + build-time перемикач | 🔴 P0 |
| 9 | Розробити `<AffiliateDisclosure />` | 🔴 P0 |
| 10 | Створити trust pages (About, Contact, Privacy) | 🔴 P0 |
| 11 | Розробити `<GiftGuideCard />` + `<Accordion />` | 🟡 P1 |
| 12 | Створити `BlogPost.astro` та `GiftGuide.astro` layouts | 🟡 P1 |
| 13 | Створити homepage (`index.astro`) | 🟡 P1 |
| 14 | Додати `<EmailCapture />` компонент | 🟡 P1 |
| 15 | Створити 3 приклади статей (MDX) | 🟡 P1 |
| 16 | Налаштувати responsive images (Sharp/webp) | 🟢 P2 |
| 17 | Додати RSS feed | 🟢 P2 |
| 18 | Lighthouse audit → оптимізувати до 90+ | 🟢 P2 |
| 19 | Протестувати `ENABLE_AMAZON_AFFILIATE` обидва режими | 🔴 P0 |

---

## 11. ЗАБОРОНЕНО

- ❌ `@astrojs/cloudflare` адаптер (v13+ → Workers, не Pages)
- ❌ SSR/hybrid mode — тільки `output: 'static'`
- ❌ Клієнтський JS для додавання `?tag=` до Amazon URL
- ❌ Хардкоджені ціни Amazon у тексті чи HTML
- ❌ Імпорт важких сторонніх e-commerce шаблонів
- ❌ AI-генерація контенту статей (тільки placeholder-текст)
- ❌ Прямі affiliate-лінки в Pinterest пінах (тільки лінки на сайт)

---

*Це ТЗ базується на research-report.md (перевірка реальних кейсів, виправлення помилок TЗ v3) та niche-strategy-report.md (deep-research ніші, монетизації, Astro SSG обмежень).*
