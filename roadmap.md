# 🗺 SiteBridge: Детальний Роадмап

> **Дата:** Липень 2026
> **На основі:** TЗ v3, research-report.md, niche-strategy-report.md (включно з deep-research)
> **Ніша:** Men's Gift Guides + Humor + EDC Lifestyle
> **Монетизація:** lamamarka (власні продукти) → Sovrn Commerce → ShareASale → Amazon Associates → Display Ads

---

## Загальна стратегія

```
Pinterest (візуальний пошук)
    ↓
SiteBridge (Astro SSG, gift guides + EDC контент)
    ↓
┌─────────────────────────────────────────┐
│ 🥇 lamamarka — hero pick у кожному гайді │  85-97% маржа
│ 🥈 Sovrn Commerce — авто-конвертація     │  пасивний дохід
│ 🥉 ShareASale — окремі бренди            │  5-20% комісія
│ 4️⃣ Amazon Associates — 24h cookie       │  supplemental
│ 📊 Display Ads — Journey → Mediavine     │  при масштабуванні
│ 📧 Email List — основний актив           │  прямі продажі lamamarka
└─────────────────────────────────────────┘
```

**Ключовий принцип:** Власний продукт — ядро. Affiliate — доповнення. Pinterest — головний драйвер трафіку, але не єдиний.

---

## Фаза 1: Foundation (Місяці 1–3)

### 🎯 Цілі
- Сайт запущено, 30+ статей
- Pinterest акаунт прогріто (10K+ monthly views)
- lamamarka продукти інтегровано
- Перші email підписники

### 🏗 Сайт (Astro SSG)

| Задача | Деталі | Пріоритет |
|--------|--------|-----------|
| Ініціалізація Astro | `npm create astro@latest -- --template blog` + Tailwind | 🔴 P0 |
| `output: 'static'` | БЕЗ `@astrojs/cloudflare` адаптера. Cloudflare Pages приймає статику напряму | 🔴 P0 |
| Content Collections (Zod) | Схема: `title`, `description`, `publishDate`, `heroImage`, `category`, `tags`, `isGiftGuide`, `priceRange`, `season` | 🔴 P0 |
| `<ProductCard />` | `isOwnProduct={boolean}`. lamamarka → Shopify Buy Button placeholder. Affiliate → "Check Price" кнопка | 🔴 P0 |
| `<ComparisonTable />` | Найсильніший CRO-елемент (+284% RPM). Формат "pros & cons" + verdict row | 🔴 P0 |
| `<PinterestPinBox />` | 2:3 співвідношення, `data-pin-url`, `data-pin-description` | 🔴 P0 |
| `<AmazonLink />` | Централізована логіка `ENABLE_AMAZON_AFFILIATE` (build-time `import.meta.env`) | 🔴 P0 |
| `<GiftGuideCard />` | Картка подарунка: фото, назва, чому підходить, ціновий діапазон, CTA | 🟡 P1 |
| `<Accordion />` | `<details>` + `<summary>` — нативний HTML, нуль JS. Для FAQ/детальних описів | 🟡 P1 |
| `<SEOHelmet />` | OpenGraph, Twitter Cards, Schema.org (Article, Product, BreadcrumbList) | 🔴 P0 |
| Trust pages | About Us, Contact, Privacy Policy, Affiliate Disclosure (у футері кожної сторінки) | 🔴 P0 |
| `ENABLE_AMAZON_AFFILIATE` | Build-time змінна. `false` → чисті лінки без `?tag=`. Вмикається після реєстрації в AA | 🔴 P0 |
| Responsive images | `@astrojs/image` або Sharp. WebP/AVIF автоматично | 🟡 P1 |

### ✍️ Контент (30 статей)

**Структура контенту:**

| Тип | Кількість | Приклад заголовку | Сезон |
|-----|-----------|-------------------|-------|
| Gift Guide (hyper-specific) | 12 | "Gag Gifts for Dads Who Have Everything (Under $30)" | Q4 prep |
| EDC Guide | 6 | "How to Build a Minimalist EDC Kit Under $100" | Evergreen |
| Product Comparison | 5 | "Best Leather Wallets vs. Metal: A Brutally Honest Comparison" | Evergreen |
| Listicle/Humor | 5 | "What Your Wallet Says About You (According to Science)" | Evergreen |
| How-To | 2 | "How to Choose a Gift That Doesn't Suck: The 3-Question Rule" | Evergreen |

**Правила контенту:**
- lamamarka продукт — **hero pick** у КОЖНОМУ gift guide (позиція #1 або "Editor's Choice")
- Решта рекомендацій — з НЕконкуруючих категорій (годинники, бари, грилі, гаджети)
- Жодних шкіряних виробів інших брендів
- Жодних фіксованих цін Amazon у тексті (тільки price range: "$", "$$", "$$$")
- Кожна стаття: ≥300 слів, ≥3 зображення, 1 comparison table / gift grid
- Pinterest-оптимізоване hero image (2:3, вертикальне) у frontmatter

### 📌 Pinterest

| Задача | Деталі |
|--------|--------|
| Створити business акаунт | Новий акаунт, свіжий email. Claim website |
| Warmup (тижні 1-2) | 5+ пінів/день БЕЗ жодних лінків. Оригінальні зображення, не сток |
| Контент-піни (тижні 3+) | 5+ пінів/день → на статті сайту. ≤10-15 пінів/день total |
| Board structure | 5-7 тематичних борд: "Gifts for Men", "EDC Essentials", "Funny Gifts", "Father's Day", "White Elephant" тощо |
| Pin designs | 5+ варіантів дизайну на кожну статтю. Вертикальні. Чисті, не шаблонні |
| Сезонний таймінг | Q4 контент → публікувати з СЕРПНЯ (8-12 тижнів до піку). Father's Day → з БЕРЕЗНЯ |

### 💰 Монетизація (старт)

| Канал | Дія |
|-------|-----|
| **lamamarka** | Shopify Buy Button на hero-позиціях. Активний з дня 1 |
| **Amazon Associates** | Заявка на день 1 (для warmup акаунту). `ENABLE_AMAZON_AFFILIATE=false` на сайті. Активувати після 3+ органічних продажів |
| **Sovrn Commerce** | Заявка при 15-20 статтях. Авто-конвертація звичайних лінків у affiliate |
| **Email capture** | "Free Gift Guide PDF" (сезонний) в обмін на email. Форма в кінці кожної статті |

### 📊 KPI Фази 1

| Метрика | Ціль |
|---------|------|
| Статті | 30+ |
| Pinterest monthly views | 10K+ |
| Pinterest outbound clicks | 50+ |
| Email підписники | 50+ |
| lamamarka продажі через сайт | 1-3 |

---

## Фаза 2: Traffic Building (Місяці 4–6)

### 🎯 Цілі
- Масштабування контенту до 100+ статей
- Pinterest: 50K+ monthly views, 500+ outbound clicks/міс
- Google: site indexed, перші 100 кліків/міс
- Підключення ShareASale + перші affiliate-продажі

### ✍️ Контент (ще 70 статей, total 100)

| Тип | Кількість | Фокус |
|-----|-----------|-------|
| Gift Guide (hyper-specific) | 25 | Q4 підготовка: "White Elephant Gifts Under $25", "Stocking Stuffers for Men Who Grill" |
| EDC Guide | 10 | "Best Minimalist EDC for Office Workers", "EDC Under $50" |
| Product Review | 15 | Конкретні продукти (годинники, грилі, барні інструменти) з affiliate-лінками |
| Listicle/Humor | 10 | "10 Gifts Your Dad Will Pretend to Like (But Actually Love)" |
| Comparison | 5 | "Grill A vs Grill B: Which One for Your Dad?" |
| How-To | 5 | "How to Survive White Elephant: A Strategic Guide" |

Бажано залучити 1-2 freelance writers для масштабування.

### 📌 Pinterest

- 10-15 пінів/день (максимум безпеки)
- 5+ дизайнів на статтю (A/B тестування візуалів)
- Активна участь у Pinterest Communities (якщо доступно)
- Відео-піни (reels) — крос-пост з Instagram
- Підготовка Q4 контенту: публікація з серпня

### 🔍 Google SEO

| Задача | Деталі |
|--------|--------|
| Google Search Console | Submit sitemap. Перевірка індексації |
| Технічний SEO audit | Мета-теги, canonical URLs, schema markup, mobile-friendly |
| Внутрішня перелінковка | Gift Guide → Product Review → EDC Guide. Кластерна структура |
| Backlinks (обережно) | Guest posts на нішевих блогах. Жодних PBN/куплених лінків |

### 💰 Монетизація

| Канал | Дія |
|-------|-----|
| **lamamarka** | Оптимізація позицій на основі даних (які статті дають кліки → кращі місця) |
| **Sovrn Commerce** | Аналіз EPC по мерчантах, вибір топ-програм |
| **ShareASale** | Подати заявку. Знайти 5-10 релевантних мерчантів (годинники, EDC, грилі) |
| **Amazon Associates** | Якщо є 3+ органічні продажі → активувати `ENABLE_AMAZON_AFFILIATE=true` |
| **Email** | Welcome sequence: lamamarka історія + 10% знижка. Регулярний контент |

### 📊 KPI Фази 2

| Метрика | Ціль |
|---------|------|
| Статті | 100+ |
| Pinterest monthly views | 50K+ |
| Pinterest outbound clicks | 500+/міс |
| Google clicks | 100+/міс |
| Email підписники | 200+ |
| Сукупний місячний дохід | $100–300/міс |

---

## Фаза 3: Monetization (Місяці 7–9)

### 🎯 Цілі
- Масштабування контенту до 150+ статей
- Q4 підготовка: основний контент готовий до жовтня
- Pinterest: 200K+ monthly views
- Підключення CJ Affiliate
- Mediavine Journey (10K sessions/міс)

### ✍️ Контент (ще 50, total 150)

Фокус: Q4 контент МАЄ бути опублікований до кінця вересня.

| Тип | Кількість |
|-----|-----------|
| Q4 Gift Guides | 20 |
| Product Reviews | 10 |
| EDC/How-To | 10 |
| Seasonal (Father's Day prep) | 10 |

### 📌 Pinterest (підготовка до Q4)

- 15 пінів/день
- Масовий posting Q4 контенту з жовтня
- Відслідковування Pinterest Trends для хайпових категорій
- A/B тестування заголовків пінів

### 💰 Монетизація

| Канал | Дія |
|-------|-----|
| **lamamarka** | Q4 акції, gift bundles, безкоштовна доставка. Промо через email |
| **CJ Affiliate** | Подати заявку (50+ статей, 1K-5K трафік) |
| **Mediavine Journey** | Подати заявку при 10K sessions/міс |
| **Email** | Q4 кампанія: "The Ultimate Gift Guide" серія. 2-3 листи на тиждень у листопаді-грудні |

### 📊 KPI Фази 3

| Метрика | Ціль |
|---------|------|
| Статті | 150+ |
| Pinterest monthly views | 200K+ |
| Сайт сесій/міс | 8K–15K |
| Email підписники | 500+ |
| Сукупний місячний дохід | $300–800/міс (Q4: ×2-3) |

---

## Фаза 4: Scale (Місяці 10–12)

### 🎯 Цілі
- Контент: 200+ статей
- Pinterest: 500K+ monthly views
- Google: 500+ кліків/міс
- Mediavine (50K sessions)
- Impact.com + прямі brand partnerships
- Facebook/Instagram трафік

### 📌 Трафік

- Pinterest: 20 пінів/день на established акаунті
- Google: фокус на informational keywords (не transactional — неможливо конкурувати з Wirecutter)
- Facebook: репост контенту в тематичні групи
- Instagram: Reels → Pinterest крос-пост

### 💰 Монетизація

| Канал | Дія |
|-------|-----|
| **lamamarka** | Аналіз найкращих converting сторінок → нові продукти на основі попиту |
| **Direct brands** | Outreach до комплементарних брендів (годинники, грилі, бари) |
| **Impact.com** | Подати заявку (5K+ трафік) |
| **Mediavine** | Подати заявку (50K sessions) |
| **Sponsored posts** | $200-500 за пост при 15K+ сесіях/міс |

### 📊 KPI Фази 4

| Метрика | Ціль |
|---------|------|
| Статті | 200+ |
| Pinterest monthly views | 500K+ |
| Сайт сесій/міс | 30K–60K |
| Email підписники | 1,500+ |
| Сукупний місячний дохід | $1,000–2,500/міс |

---

## Фаза 5: Growth (Місяці 13–18)

### 🎯 Цілі
- Контент: 300+ статей
- Pinterest: 1M+ monthly views
- Multi-channel трафік стабільний
- Premium ad network (Raptive, 100K+ pageviews)
- B2B/wholesale лідогенерація для lamamarka
- Розглянути digital products (printable gift guides, EDC checklists)

### 💰 Монетизація

| Канал | Дія |
|-------|-----|
| **lamamarka** | B2B: "How to Stock Your Boutique with Unique Leather Gifts" → wholesale лідогенерація |
| **Raptive** | Подати заявку (100K+ pageviews) |
| **Digital products** | Printable gift guides ($5-10), EDC planner |
| **AvantLink** | Тільки якщо запросить мерчант |

### 📊 KPI Фази 5

| Метрика | Ціль |
|---------|------|
| Статті | 300+ |
| Pinterest monthly views | 1M+ |
| Сайт сесій/міс | 60K–120K |
| Email підписники | 3,000+ |
| Сукупний місячний дохід | $2,000–5,000/міс |

---

## 🚨 Критичні правила (НЕ ПОРУШУВАТИ)

| Правило | Наслідок порушення |
|---------|-------------------|
| Жодних affiliate-лінків у Pinterest пінах | **Бан акаунту** |
| Жодних фіксованих цін Amazon у контенті | **Бан в Amazon Associates** |
| `ENABLE_AMAZON_AFFILIATE` — build-time, не клієнтський JS | **Бан в Amazon Associates** (auto-tagging заборонено) |
| Pinterest: ≤15 пінів/день на новому акаунті | **Shadowban** |
| Не лінкувати на шкіряні вироби інших брендів | **Канібалізація lamamarka** |
| Не публікувати AI-контент без перевірки людиною | **Google penalty + втрата довіри** |
| Affiliate disclosure на кожній сторінці | **Бан в affiliate програмах** |
| Privacy Policy, Contact, About — обов'язково | **Відмова в affiliate програмах + Pinterest недовіра** |

---

## 📅 Сезонний календар

| Місяць | Дія |
|--------|------|
| **Серпень** | Публікація Q4 gift guides. Pinterest ramp-up |
| **Вересень** | Останній дедлайн для Q4 контенту. Google має проіндексувати |
| **Жовтень** | Початок Q4 трафіку. Email Q4 кампанія, teaser |
| **Листопад** | Black Friday промо для lamamarka. Пік трафіку |
| **Грудень** | Christmas пік. White Elephant, Stocking Stuffers |
| **Січень** | Спад. Аналіз Q4. Оновлення контенту на наступний рік |
| **Лютий** | Valentine's Day контент (опціонально для ніші) |
| **Березень** | Father's Day контент публікувати |
| **Квітень** | Father's Day ramp-up |
| **Травень** | Father's Day пік |
| **Червень** | Початок Q4 контент-планування. Аналіз півріччя |
| **Липень** | Q4 контент production. Підготовка до серпневого запуску |

---

## 📊 Зведена таблиця KPI по фазах

| Фаза | Місяці | Статті | Pinterest Views | Сесії/міс | Email | Дохід/міс |
|------|--------|--------|----------------|-----------|-------|-----------|
| 1. Foundation | 1-3 | 30 | 10K | 100-500 | 50 | $0-50 |
| 2. Traffic | 4-6 | 100 | 50K | 500-2K | 200 | $100-300 |
| 3. Monetize | 7-9 | 150 | 200K | 8K-15K | 500 | $300-800 |
| 4. Scale | 10-12 | 200 | 500K | 30K-60K | 1,500 | $1K-2.5K |
| 5. Growth | 13-18 | 300 | 1M | 60K-120K | 3,000 | $2K-5K |

---

## 🔧 Інструменти

| Категорія | Інструмент | Призначення |
|-----------|-----------|-------------|
| **Сайт** | Astro + Tailwind + MDX | SSG і контент |
| **Хостинг** | Cloudflare Pages | $0 egress, GitHub авто-деплой |
| **Контент** | Obsidian + Git | Написання і синхронізація |
| **Pinterest** | Pinterest Native Scheduler | Безпечний posting |
| **Аналітика** | Google Analytics + Search Console | Трафік і SEO |
| **Email** | ConvertKit / EmailOctopus | Email маркетинг (безкоштовно до 2,500 підписників) |
| **Зображення** | Canva / Figma | Pinterest pin designs |
| **Affiliate** | Sovrn Commerce → ShareASale → CJ → Impact | Поетапне підключення |
| **Display Ads** | Journey by Mediavine → Mediavine → Raptive | Поетапне підключення |
| **E-commerce** | Shopify Buy Button (lamamarka) | Власні продажі |

---

*Цей роадмап — живий документ. Переглядати щомісяця, коригувати на основі реальних даних.*
