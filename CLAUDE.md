# CLAUDE.md — guide for AI agents working on this repo

## What this repo is

The marketing site for **Frauda Hub** at [frauda.io](https://frauda.io). Static SPA. No backend, no database, no env vars, no user auth, no analytics integration yet. React-rendered, deployed to GitHub Pages.

If a request implies a backend, a server-side API, or any kind of dynamic data, **flag it** — this project doesn't have one.

## Current routes

| Path | Component | Status |
|---|---|---|
| `/` | redirect → `/hub` | existing |
| `/hub` | `HubPage` | **redesigning** |
| `/fishpo` | `FishpoPage` | keep as-is |
| `/datco` | `DatcoPage` | keep alive but **removed from nav** |
| `/about` | `AboutPage` | **new page** |

## Stack at a glance

- **Build:** Vite 5 (`vite.config.js` is intentionally minimal — just the React plugin and `base: '/'`)
- **UI:** React 18, function components only, no class components, no hooks libraries
- **Routing:** `react-router-dom` v7 with `BrowserRouter` (in `src/App.jsx`)
- **State:** local `useState` only. No Redux, Zustand, Context, React Query, etc. Don't introduce any without asking.
- **Styling:** **CSS variables defined in `src/styles.css` + inline `style={{...}}` objects on JSX**. This is a deliberate choice, not an oversight — do not refactor to CSS modules, Tailwind, styled-components, etc.
- **Node:** 20+ (`.nvmrc`)
- **No new libraries.** Do not install anything. Build everything with React 18 + react-router-dom + existing CSS vars.

## File tour

```
src/
  main.jsx                # entry — mounts <App>, imports './styles.css'
  App.jsx                 # BrowserRouter + theme state (theme is NOT persisted)
  styles.css              # ~16KB. Design tokens, typography, .btn, .card, .chip, .inner, .grid-*
  pages/
    HubPage.jsx           # landing page (also served at /)
    FishpoPage.jsx        # Fishpo product page — embeds <FishpoDemo> + <DashboardDemo>
    DatcoPage.jsx         # Datco product page (self-contained; no embedded demo component)
    AboutPage.jsx         # NEW — About Us page (team, timeline, academic backing)
  components/
    Brand.jsx             # <FraudaMark>, <FraudaWordmark>, <StatusDot>, <GridBg>, <LinkedInIcon>, Icon.{Shield,Bolt,Eye,Lock,Check,Arrow,Alert,Play,Search,Mail,Chip,Sun,Moon,X}
    Nav.jsx               # shared top nav across all pages
    ContactModal.jsx      # mailto + copy-phone-to-clipboard dialog
    FishpoDemo.jsx        # interactive in-browser demo (no API calls — all simulated)
    DashboardDemo.jsx     # interactive dashboard demo (no API calls — all simulated)
    Timeline.jsx          # NEW — interactive timeline with hover previews + lightbox
    Lightbox.jsx          # NEW — full-screen image viewer with keyboard/mouse/swipe nav
public/
  CNAME                   # `frauda.io`
  404.html                # SPA-fallback redirect (sessionStorage trick)
  site.webmanifest        # PWA icons
  logo-{rtu,ul,ba}.png    # institutional partner logos
  photos/
    team/                 # cofounder headshots (full-quality PNG)
    timeline/             # event photos (full-quality PNG, lazy-loaded)
```

## Conventions in this codebase

### Components
- **Default export per file**, file named PascalCase matching the export.
- Multiple inner components are defined as plain `function Foo({...}) { return <...> }` declarations in the same file as their consumer. Only promote to its own file when it's used in 2+ pages.
- Hooks: just `useState` and `useEffect`. Don't introduce custom hook abstractions for trivial state.

### Icons
All icons live as React components on the `Icon` object exported from `src/components/Brand.jsx`. To add a new icon, add a key to `Icon`, don't import from `lucide-react` or similar (no icon library is installed).

### Styling
- Tokens (colors, spacing, fonts) → `src/styles.css` as CSS vars on `:root` / `[data-theme="dark"]`.
- Repeated layout patterns → utility classes in `styles.css` (`.btn`, `.card`, `.inner`, `.section`, `.grid-2`, `.grid-4`, `.h-display`, `.h-eyebrow`, etc.).
- One-off positioning, sizing, gradients → inline `style={{...}}`. This is normal here; don't extract them to CSS unless the same block is repeated 3+ times.
- Theme switching: read state from `App.jsx`'s `theme`, applied via `document.body.dataset.theme = theme`. Light is the default.

### Routing & navigation
- Use `<Link to="...">` from `react-router-dom` for internal navigation, never `<a href="/path">`.
- External links: `<a href="..." target="_blank" rel="noopener noreferrer">`.

### Copywriting
- The team is strict about not inventing metrics or product claims. If you're adding/editing copy with stats or claims, **don't make them up**.
- Sources cited in `HubPage.jsx`'s problem section (ENISA, Verizon DBIR, Europol IOCTA) are the references the user trusts for fraud stats.
- Voice: confident, direct, no hype words like "revolutionary" or "cutting-edge".
- Do NOT reference CERT.LV or Swedbank anywhere — they have no institutional connection to Frauda Hub.

### Photos & placeholders
- Photos may not be uploaded yet. Always build components with graceful placeholder fallbacks (colored div with initials for team, generic icon/pattern for timeline).
- At the end, check if real files exist at the expected paths. If they do, use them. If not, keep placeholders.
- Team photos: `public/photos/team/firstname-lastname.png`
- Timeline photos: `public/photos/timeline/YYYY-MM-DD_slug-N.png`

## How to run things

| Task | Command |
|---|---|
| Local dev | `npm run dev` → http://localhost:5173 |
| Production build | `npm run build` → emits `dist/` |
| Preview prod build | `npm run preview` |

## Security — apply without asking

1. **Treat any new file under `.github/workflows/` with extreme suspicion.**
2. **Never add `pull_request_target` triggers** without explicit user discussion.
3. **Never add `postinstall` / lifecycle scripts** to `package.json`.
4. **Never commit anything that looks like a secret.**

## Things that look weird but are intentional

- **Duplicate SPA-fallback strategies** (`public/404.html` and `cp dist/index.html dist/404.html` in deploy script). Both intentional.
- **Theme not persisted across reloads.** Deliberate.
- **Inline styles everywhere.** Deliberate. Don't migrate.
- **No tests, no ESLint, no Prettier.** Deliberate for project size. Don't add.
