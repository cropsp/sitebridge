# 🖼 SiteBridge: Необхідні зображення

> Кинути файли в `public/images/` — сайт підхопить автоматично.
> Поки зображень немає — показуються сірі плейсхолдери. Все інше працює.

---

## Правила

| Тип | Співвідношення | Розмір | Формат |
|-----|---------------|--------|--------|
| **Hero** (обкладинка статті) | 2:3 | 1000×1500px | WebP або JPEG |
| **Pinterest Pin** | 2:3 | 1000×1500px | WebP або JPEG |
| **Продуктове фото** | 1:1 | 800×800px | WebP або JPEG |

---

## Стаття 1: `gag-gifts-dads.mdx`

```
public/images/
├── gag-gifts-dad-hero.jpg          # 1000×1500px, hero обкладинка
├── gag-gifts-dad-pin.jpg           # 1000×1500px, Pinterest pin
├── lamamarka-cheeky-clip.jpg       # 800×800px, Cheeky Leather Money Clip
├── grill-apron.jpg                 # 800×800px, Funny Grill Apron
├── dad-joke-button.jpg             # 800×800px, Dad Joke Sound Button
├── desktop-golf.jpg                # 800×800px, Desktop Mini Putting Green
├── bacon-candle.jpg                # 800×800px, Bacon-Scented Candle Set
├── emergency-pants.jpg             # 800×800px, Emergency Underpants Tin
├── beard-bib.jpg                   # 800×800px, Beard Bib Apron
├── hot-sauce-roulette.jpg          # 800×800px, Hot Sauce Roulette Set
└── tactical-spatula.jpg            # 800×800px, Tactical Spatula
```

## Стаття 2: `minimalist-edc-kit.mdx`

```
public/images/
├── edc-kit-hero.jpg                # 1000×1500px, hero обкладинка
├── edc-kit-pin.jpg                 # 1000×1500px, Pinterest pin
├── lamamarka-keychain-wallet.jpg   # 800×800px, Bold Leather Keychain + Card Holder
├── lamamarka-card-holder.jpg       # 800×800px, Slim Card Holder (окремо)
├── rovyvon-flashlight.jpg          # 800×800px, RovyVon Aurora A1
├── zebra-pen.jpg                   # 800×800px, Zebra F-701
└── field-notes.jpg                 # 800×800px, Field Notes Notebook
```

## Стаття 3: `leather-vs-synthetic-wallets.mdx`

```
public/images/
├── leather-vs-synthetic-hero.jpg   # 1000×1500px, hero обкладинка
├── leather-vs-synthetic-pin.jpg    # 1000×1500px, Pinterest pin
├── lamamarka-slim-wallet.jpg       # 800×800px, Lamamarka Character ID Wallet
└── ridge-wallet.jpg                # 800×800px, Ridge Wallet (Aluminum)
```

---

## Повне дерево (все разом)

```
public/
├── favicon.svg
└── images/
    ├── gag-gifts-dad-hero.jpg
    ├── gag-gifts-dad-pin.jpg
    ├── lamamarka-cheeky-clip.jpg
    ├── grill-apron.jpg
    ├── dad-joke-button.jpg
    ├── desktop-golf.jpg
    ├── bacon-candle.jpg
    ├── emergency-pants.jpg
    ├── beard-bib.jpg
    ├── hot-sauce-roulette.jpg
    ├── tactical-spatula.jpg
    ├── edc-kit-hero.jpg
    ├── edc-kit-pin.jpg
    ├── lamamarka-keychain-wallet.jpg
    ├── lamamarka-card-holder.jpg
    ├── rovyvon-flashlight.jpg
    ├── zebra-pen.jpg
    ├── field-notes.jpg
    ├── leather-vs-synthetic-hero.jpg
    ├── leather-vs-synthetic-pin.jpg
    ├── lamamarka-slim-wallet.jpg
    └── ridge-wallet.jpg
```

**Всього:** 22 файли

---

## Звідки брати зображення

| Джерело | Для чого |
|---------|----------|
| **lamamarka.com** | Фото продуктів lamamarka (власний бренд — можна використовувати) |
| **Canva / Figma** | Pinterest pin designs (2:3, текст на зображенні) |
| **Власна фотозйомка** | Hero-обкладинки (найкращий варіант — реальні фото продуктів у контексті) |
| **Amazon product images** | Тільки для affiliate-товарів через Amazon SiteStripe (офіційно дозволено) |

---

## Як швидко додати

```bash
# Разово — скинути всі файли в public/images/
cp твої-зображення/*.jpg public/images/

# Сайт підхоплює автоматично:
npm run dev
# → http://localhost:4321
```

Жодних правок коду не потрібно — шляхи в MDX уже прописані.
