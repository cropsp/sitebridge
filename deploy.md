# 🚀 Деплой на Cloudflare Pages

## Разово

1. Cloudflare Dashboard → **Workers & Pages** → Create → **Pages** → Connect to Git
2. Вибрати `cropsp/sitebridge`
3. Налаштувати:

| Поле | Значення |
|------|----------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variable | `ENABLE_AMAZON_AFFILIATE` = `false` |

4. Deploy

## Після деплою

Сайт буде доступний на `https://sitebridge.pages.dev`

Щоб прив'язати свій домен:
- Cloudflare Pages → sitebridge → Custom domains → додати домен

## При кожному пуші

```bash
git add -A && git commit -m "опис змін" && git push
```

Cloudflare Pages автоматично перезібрає і задеплоїть сайт.
