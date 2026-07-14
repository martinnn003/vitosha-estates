# Vitosha Estates

Демо сайт за агенция за недвижими имоти — React 18 + Vite + Tailwind CSS + Lucide Icons.

## Локално стартиране

```bash
npm install
npm run dev
```

Отваря се на http://localhost:5173

## Качване в GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШЕТО-ИМЕ/vitosha-estates.git
git push -u origin main
```

(Първо създайте празно repo `vitosha-estates` в GitHub, без README.)

## Деплой във Vercel

1. Влезте във vercel.com с GitHub акаунта си
2. **Add New → Project** и изберете repo-то `vitosha-estates`
3. Vercel разпознава Vite автоматично (Build: `vite build`, Output: `dist`) — не променяйте нищо
4. Натиснете **Deploy**

След 1–2 минути сайтът е онлайн, със зареждащи се снимки.

## Структура

```
src/
├── data.js                 # имоти, агенти, статии, константи
├── App.jsx                 # роутинг през state, глобални състояния
├── components/
│   ├── ui.jsx              # Badge, PropertyImage, AgentAvatar, SectionTitle
│   ├── PropertyCard.jsx
│   ├── Navbar.jsx
│   └── Footer.jsx
└── views/
    ├── HomeView.jsx        # герой секция + търсачка + препоръчани
    ├── ListingsView.jsx    # филтри + grid/map изглед
    ├── DetailView.jsx      # галерия + ипотечен калкулатор + контакт
    ├── SellView.jsx        # 3-стъпкова форма за подаване на имот
    └── AgentsView.jsx
```

## Смяна на снимките

Всички изображения са в `src/data.js` — сменете `img` полетата с ваши URL адреси. При грешка в зареждането UI автоматично показва градиентен placeholder.
