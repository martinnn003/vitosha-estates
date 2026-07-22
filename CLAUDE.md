# Vitosha Estates

Демо сайт за агенция за недвижими имоти в София (кварталите около Витоша). Общувай с потребителя **на български**.

## Стек
- React 18 + Vite, Tailwind CSS, Lucide икони
- React Router с чисти URL-и и SEO slug-ове (`/property/3-skyline-penthouse`)
- Деплой: Vercel (авто-деплой при `git push` към `main`); `vercel.json` съдържа SPA rewrite
- Node 22 LTS

## Структура
- `src/data.js` — всички данни: имоти, агенти, статии, снимки (`img` полета). Потребителят добавя имоти сам тук.
- `src/App.jsx` — роутинг, глобални състояния (favorites, филтри)
- `src/views/` — Home, Listings (grid/map), Detail (fullscreen lightbox галерия, ипотечен калкулатор), Sell (3-стъпкова форма), Agents
- `src/components/` — Navbar, Footer, PropertyCard, ui.jsx (Badge, PropertyImage, AgentAvatar)

## История на разговорите
Пълната история на всички чатове по проекта (от claude.ai и от Claude Code) е в **`chat-history.md`**. При нужда от предистория/контекст на минали решения — чети този файл. Той се допълва автоматично от Stop hook (`.claude/append-chat-history.mjs`) и е в `.gitignore` — не го комитвай и не го редактирай ръчно освен по изрична молба.

## Особености
- Снимките са Unsplash URL-и с автоматичен fallback към градиентен placeholder при грешка
- Имотите имат `x`/`y` координати за пиновете в Map View — при нов имот им давай различни стойности
- `featured: true` показва имота на началната страница

## Планирани подобрения (от потребителя)
1. Контактна форма да изпраща реално (Telegram webhook / Formspree)
2. SEO: meta description, Open Graph, sitemap.xml, robots.txt
3. Български език или BG/EN превключвател
4. Филтри в URL-а (`/listings?type=villa&beds=3`)
5. Реална карта (Leaflet + OpenStreetMap)
6. Favicon, lazy loading, страници за статиите от Insights
