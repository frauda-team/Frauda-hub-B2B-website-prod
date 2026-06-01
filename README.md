# Frauda Hub — marketing site

Source for the marketing site at **[frauda.io](https://frauda.io/)**. Single-page React app covering the landing page and product pages for the two Frauda Hub products (Fishpo, Datco).

LinkedIn: <https://www.linkedin.com/company/frauda-hub/>

## Stack

- Vite 5 + React 18
- React Router v7 (`BrowserRouter`)
- Plain CSS (`src/styles.css`) + per-component inline styles, no CSS framework
- Deployed to GitHub Pages (custom domain `frauda.io`)

No backend, no env vars, no data fetching — everything is static.

## Requirements

- Node **20+** (`.nvmrc` pins 20). Use `nvm use` if you have nvm installed.

## Local development

```bash
npm install     # first time only
npm run dev     # http://localhost:5173
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR on port 5173 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally to sanity-check the production bundle |
| `npm run deploy` | Build + push `dist/` to the `gh-pages` branch (publishes to frauda.io) |

`npm run deploy` requires push access to `origin` and pushes from your local credentials — there is **no auto-deploy on push to `main`**.

## Project structure

```
src/
  main.jsx              # entry, mounts <App>, imports styles.css
  App.jsx               # router + theme state
  styles.css            # design tokens (CSS vars) + global classes
  pages/
    HubPage.jsx         # /hub (and / via redirect) — landing page
    FishpoPage.jsx      # /fishpo — product page, embeds FishpoDemo + DashboardDemo
    DatcoPage.jsx       # /datco  — product page
  components/
    Nav.jsx             # shared top nav
    ContactModal.jsx    # contact dialog (mailto / phone copy)
    Brand.jsx           # logo, wordmark, icons, status dots, grid backdrop
    FishpoDemo.jsx      # interactive demo embedded in /fishpo
    DashboardDemo.jsx   # dashboard demo embedded in /fishpo
public/
  CNAME                 # frauda.io  (this is the canonical one — no root CNAME)
  404.html              # SPA fallback for GitHub Pages (sessionStorage redirect)
  site.webmanifest      # PWA manifest
  favicon-*, android-chrome-*, apple-touch-icon  # icons
  logo-rtu.png, logo-ul.png, logo-ba.png         # institutional partner logos
index.html              # Vite entry HTML (has the sessionStorage redirect-restore script)
vite.config.js          # plugins: [react()], base: '/'
```

## Routing

Routes are defined in `src/App.jsx`:

| Path | Component |
|---|---|
| `/`         | redirect → `/hub` |
| `/hub`      | `HubPage` |
| `/fishpo`   | `FishpoPage` |
| `/datco`    | `DatcoPage` |

GitHub Pages doesn't natively support client-side routing. Two mechanisms keep deep links working:

1. `public/404.html` — when GH-Pages serves the 404, it stashes the requested URL in `sessionStorage` and redirects to `/`.
2. `index.html` — has a small inline script that reads `sessionStorage.redirect` on load and rewrites history back to the original URL.

Adding a new route requires no extra config — both mechanisms work automatically.

## Styling

- Design tokens live as CSS custom properties in `src/styles.css` (e.g. `var(--bg)`, `var(--fg)`, `var(--accent-grad)`).
- Light/dark theme is applied via `document.body.dataset.theme` from `App.jsx`. Theme is **not persisted** — refresh resets to light.
- Most layout uses inline `style={...}` objects on JSX, with the global CSS providing tokens, typography classes (`.h-display`, `.h-eyebrow`), button classes (`.btn`, `.btn-primary`, `.btn-ghost`, `.btn-sm`, `.btn-xl`), and `.card`, `.chip`, `.inner`, `.section`, `.grid-*` utility classes. Stick to this pattern when adding components.

## Adding a new page

1. Create `src/pages/NewPage.jsx` exporting a default component that accepts `{ theme, onToggleTheme }`.
2. Import + route it in `src/App.jsx`:
   ```jsx
   <Route path="/new" element={<NewPage {...props} />} />
   ```
3. Link to it from `HubPage.jsx`'s portfolio grid if it's a product page.

## Deploying

- Manual: `npm run deploy` from a clean working tree on `main`.
- CI: `.github/workflows/build.yml` runs `npm ci && npm run build` on every push and PR. It **only verifies the build compiles**, it does not deploy.

## Security

The only workflow in this repo is `.github/workflows/build.yml` (install + build check on push/PR, no deploy, no secrets). If you see any other workflow file you didn't author, read every line before accepting it — especially watch for `pull_request_target` triggers or base64-decoded shell steps.
