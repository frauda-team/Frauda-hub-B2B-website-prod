# CLAUDE.md — guide for AI agents working on this repo

## What this repo is

The marketing site for **Frauda Hub** at [frauda.io](https://frauda.io). Static SPA. No backend, no database, no env vars, no user auth, no analytics integration yet. Three routes (`/hub`, `/fishpo`, `/datco`), all React-rendered, deployed to GitHub Pages.

If a request implies a backend, a server-side API, or any kind of dynamic data, **flag it** — this project doesn't have one.

## Stack at a glance

- **Build:** Vite 5 (`vite.config.js` is intentionally minimal — just the React plugin and `base: '/'`)
- **UI:** React 18, function components only, no class components, no hooks libraries
- **Routing:** `react-router-dom` v7 with `BrowserRouter` (in `src/App.jsx`)
- **State:** local `useState` only. No Redux, Zustand, Context, React Query, etc. Don't introduce any without asking.
- **Styling:** **CSS variables defined in `src/styles.css` + inline `style={{...}}` objects on JSX**. This is a deliberate choice, not an oversight — do not refactor to CSS modules, Tailwind, styled-components, etc. without explicit user approval.
- **Node:** 20+ (`.nvmrc`)

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
  components/
    Brand.jsx             # <FraudaMark>, <FraudaWordmark>, <StatusDot>, <GridBg>, <LinkedInIcon>, Icon.{Shield,Bolt,Eye,Lock,Check,Arrow,Alert,Play,Search,Mail,Chip,Sun,Moon,X}
    Nav.jsx               # shared top nav across all pages
    ContactModal.jsx      # mailto + copy-phone-to-clipboard dialog
    FishpoDemo.jsx        # interactive in-browser demo (no API calls — all simulated)
    DashboardDemo.jsx     # interactive dashboard demo (no API calls — all simulated)
public/
  CNAME                   # `frauda.io` — keep this; root CNAME was removed (it was a duplicate)
  404.html                # SPA-fallback redirect (sessionStorage trick)
  site.webmanifest        # PWA icons
  logo-{rtu,ul,ba}.png    # institutional partner logos (NB: logo-ba.png is 1.2MB, oversized — flag if user wants it optimized)
```

## Conventions in this codebase

### Components
- **Default export per file**, file named PascalCase matching the export.
- Multiple inner components are defined as plain `function Foo({...}) { return <...> }` declarations in the same file as their consumer (see `HubPage.jsx`'s `<Hero>`, `<Portfolio>`, `<Problem>`, `<Team>`, etc.). Only promote to its own file when it's used in 2+ pages.
- Hooks: just `useState` and `useEffect`. Don't introduce custom hook abstractions for trivial state.

### Icons
All icons live as React components on the `Icon` object exported from `src/components/Brand.jsx`. To add a new icon, add a key to `Icon`, don't import from `lucide-react` or similar (no icon library is installed).

### Styling
- Tokens (colors, spacing, fonts) → `src/styles.css` as CSS vars on `:root` / `[data-theme="dark"]`.
- Repeated layout patterns → utility classes in `styles.css` (`.btn`, `.card`, `.inner`, `.section`, `.grid-2`, `.grid-4`, `.h-display`, `.h-eyebrow`, etc.).
- One-off positioning, sizing, gradients → inline `style={{...}}`. This is normal here; don't extract them to CSS unless the same block is repeated 3+ times.
- Theme switching: read state from `App.jsx`'s `theme`, applied via `document.body.dataset.theme = theme`. Light is the default. Components don't need to subscribe — CSS vars cascade.

### Routing & navigation
- Use `<Link to="...">` from `react-router-dom` for internal navigation, never `<a href="/path">`.
- External links: `<a href="..." target="_blank" rel="noopener noreferrer">`.
- The `Nav`, `Footer`, and `ContactModal` are duplicated across each page (not centralized) — this is intentional so each page can adjust them independently. Don't refactor into a shared layout component without asking.

### Copywriting
- The team is strict about not inventing metrics or product claims. If you're adding/editing copy with stats or claims, **don't make them up** — ask the user for the source. See commit `7964a02` ("Remove fabricated metrics") for context.
- Sources cited in `HubPage.jsx`'s problem section (ENISA, Verizon DBIR, Europol IOCTA) are the references the user trusts for fraud stats.
- Voice: confident, direct, no hype words like "revolutionary" or "cutting-edge".

## How to run things

| Task | Command |
|---|---|
| Local dev | `npm run dev` → http://localhost:5173 |
| Production build | `npm run build` → emits `dist/` |
| Preview prod build | `npm run preview` |
| Deploy to frauda.io | `npm run deploy` (manual; pushes `dist/` to `gh-pages` branch) |

`dist/` is gitignored. If you see it tracked, it was added in error — run `git rm -r --cached dist/`.

## Deploy pipeline

- GitHub Pages serves the `gh-pages` branch with custom domain `frauda.io` (via `public/CNAME`).
- `npm run deploy` runs `vite build`, then `cp dist/index.html dist/404.html` (a second SPA-fallback approach in addition to `public/404.html`), then `gh-pages -d dist`.
- There is **no auto-deploy on `main`**. Deploys are manual. Don't add auto-deploy without explicit user approval — see Security below.
- `.github/workflows/build.yml` runs `npm ci && npm run build` on every push/PR to catch build breakage. It does not deploy.

## Security — apply without asking

1. **Treat any new file under `.github/workflows/` with extreme suspicion.** Read every line before accepting it. Reject anything that:
   - decodes base64 and pipes to `bash`/`sh`
   - uses `pull_request_target` without an explicit head-repo guard
   - exfiltrates env vars, `~/.aws`, `~/.ssh`, `~/.npmrc`, `~/.git-credentials`, IMDS metadata, or `GITHUB_TOKEN`
   - hits hardcoded IPs or unexpected external endpoints
2. **Never add `pull_request_target` triggers** without explicit user discussion.
3. **Never add `postinstall` / lifecycle scripts** to `package.json` without explicit user approval. Currently there are none.
4. **Never commit anything that looks like a secret** (`*.env`, `*.pem`, `*.key`, `credentials.json`). The `.gitignore` covers `.env*`, but review your own diffs for anything sensitive.
5. **Flag any unrecognised git author identity** when reviewing git log — anyone with push access can forge the author field.

## Things that look weird but are intentional

- **Duplicate SPA-fallback strategies** (`public/404.html` sessionStorage trick AND `cp dist/index.html dist/404.html` in deploy script). Both are intentional belt-and-braces; don't remove either without confirming with the user.
- **Theme not persisted across reloads.** Light is reset every refresh. Was a deliberate choice; user can change their mind later.
- **`Nav`, `Footer`, `ContactModal` duplicated per page** instead of in a shared layout. Intentional — each page tweaks slightly.
- **Inline styles everywhere.** Intentional. Don't migrate.
- **No tests, no ESLint, no Prettier.** Intentional for project size. Don't add without asking.

## Things that genuinely need fixing (low priority, ask before doing)

- `public/logo-ba.png` is 1.2MB. The other partner logos are ~100KB. Probably an uncompressed export.
- Theme not persisted — easy `localStorage` change if the user ever asks.
- Some nav links in `Nav.jsx` (`Products`, `Demos`, `How it works`, `Team`) point to `href="#"` placeholders.
