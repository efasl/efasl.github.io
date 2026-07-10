# Eisenhower Fellowships Association of Sri Lanka

Website for the Eisenhower Fellowships Association of Sri Lanka — a React single-page app built with Vite.

## Stack

- React 18 + Vite
- Hash-based client-side routing (no router library)
- Data driven via JSON files in `public/data/`
- Styling via `src/index.css` (Montserrat / Plus Jakarta Sans)

## Project Structure

```
src/
  App.jsx               # Root component + hash router
  components/           # One file per page/section
    Header, Footer
    Home, About, Fellowship
    FellowsDirectory, YLPCohort
    NewsList, NewsDetail
    Contact
public/
  data/                 # fellows.json, news.json, ylp.json, committees.json
  img/                  # logos, hero, gallery, news images
index.html
vite.config.js
DESIGN.md               # Design system reference (colors, typography, layout)
```

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview the build locally
```

## Routing

All navigation is hash-based (`#/home`, `#/news`, `#/news/:slug`, `#/ylp/:year`). No server config needed — works with static hosting.

## Content Updates

Most content lives in `public/data/`:
- `fellows.json` — EF Sri Lanka fellows directory
- `news.json` — news articles
- `ylp.json` — Young Leaders Program cohorts
- `committees.json` — committee members
