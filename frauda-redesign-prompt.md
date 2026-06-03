# Frauda Hub Website Redesign — Task Prompt

You are working on the Frauda Hub marketing site repo. Read `CLAUDE.md` first — it contains all conventions, file locations, and rules.

## Overview

Restructure the frauda.io website: make Fishpo the primary product, demote Datco, create a new About Us page with an interactive timeline and team section, and optimize everything for mobile. Work in 6 phases, committing after each.

**Critical rules:**
- No new npm packages. Use only what's already installed (React 18, react-router-dom, Vite).
- Follow existing styling conventions: CSS variables in `src/styles.css` + inline `style={{...}}` on JSX.
- Do NOT reference CERT.LV or Swedbank anywhere.
- Do NOT invent metrics or product claims.
- Photos may not exist yet. Always use placeholders first, check for real files at the very end.

---

## Phase 1 — Scaffolding

**Commit message:** `chore: scaffolding for redesign — routes, nav, photo dirs`

1. Create directories:
   - `public/photos/team/`
   - `public/photos/timeline/`
   - Add a `.gitkeep` in each so git tracks them.

2. Create `src/pages/AboutPage.jsx` — empty shell that accepts `{ theme, onToggleTheme }` props, renders a page wrapper with Nav and Footer (copy Footer pattern from HubPage). Export default.

3. Update `src/App.jsx`:
   - Import `AboutPage`
   - Add route: `<Route path="/about" element={<AboutPage {...props} />} />`
   - Keep `/datco` route alive (don't remove it)

4. Update `src/components/Nav.jsx`:
   - Change `LINKS` array to:
     ```js
     const LINKS = [
       { label: 'Hub',      path: '/hub' },
       { label: 'Fishpo',   path: '/fishpo' },
       { label: 'About Us', path: '/about' },
     ]
     ```
   - Datco is no longer in the nav but the route still works via direct URL.

5. Run `npm run build` to verify everything compiles. Fix any errors.

6. **Commit.**

---

## Phase 2 — Hub Page Redesign

**Commit message:** `feat: redesign Hub page — Fishpo-forward, Datco demoted`

Restructure `src/pages/HubPage.jsx`. The new section order:

### 2.1 Hero
- Keep the existing hero structure but change messaging:
  - Remove "Private beta · EU only" chip. Replace with: `Seeking free pilots` (chip-accent).
  - Headline: keep "Protect your business from fraud — *before* it reaches your team." or adjust to be more Fishpo-forward. The hero should make it clear Fishpo is the main product.
  - Body text: "Frauda Hub builds AI-powered fraud-prevention tools for European SMEs. Our flagship product Fishpo stops phishing emails before anyone clicks."
  - Primary CTA: "Explore Fishpo →" (Link to `/fishpo`), secondary: "Get in touch" (opens contact modal).
  - Keep the GDPR trust line but change "Seeking first pilots" to "Free pilot available".

### 2.2 The Problem (stats)
- Keep the existing `Problem` component with €8B+, 91%, 3.4×, 68% stats and sources. No changes needed.

### 2.3 Fishpo Teaser
- New section. Eyebrow: "OUR FLAGSHIP PRODUCT". Heading: "Fishpo — email scam shield."
- Brief description (2-3 sentences) about what Fishpo does: real-time phishing detection, deploys in under 30 minutes, no SOC required, runs on-device.
- Three feature highlights in a `grid-3`: Install (lightweight agent, 2 min deploy), Detect (local AI, real-time), Protect (quarantine + alert).
- CTA button: "Explore Fishpo →" linking to `/fishpo`.
- Use the existing card styling and reveal animation pattern (IntersectionObserver) from the current codebase.

### 2.4 From the Lab
- New section replacing the old Portfolio. Eyebrow: "FROM THE LAB". Heading: "Exploring new ideas."
- Single card for Datco: tag "Datco", status chip "Live demo", title "Synthetic data for FinTech", brief description, CTA "Try Datco demo →" linking to `/datco`.
- This section should feel clearly secondary — smaller heading, more muted styling, single card (not a grid-2).

### 2.5 Get in Touch (CTA)
- Keep the existing `FinalCTA` component. Update copy to mention free pilot:
  - "We're offering a free pilot to the first businesses. Reach out — your input shapes what we build."

### Remove from Hub:
- `Portfolio` component (the "Two tools. One mission." equal-weight grid)
- `Team` / "Built & Backed By" section (this moves to About Us)
- `BackedBy` section (moves to About Us)
- `TrustBar` can stay if it works with the new flow, or remove if redundant with the hero GDPR line.

### Keep:
- `Footer` — no changes needed.

Run `npm run build`. Fix any errors. **Commit.**

---

## Phase 3 — About Us: Structure + Team

**Commit message:** `feat: About Us page — mission, team, academic backing`

Build out `src/pages/AboutPage.jsx` with these sections:

### 3.1 Hero / Mission
- Eyebrow: "ABOUT US"
- Heading: "We believe fraud prevention should be simple, private, and accessible."
- Body: 2-3 sentences about Frauda Hub's mission — building AI-powered tools for European SMEs, born from academic research at RTU, focused on privacy-first design. Keep it genuine, no hype.

### 3.2 Team Cards
- Two cofounder cards side by side (`grid-2`, stacks on mobile):

**Serhii Voitov** — Co-Founder
- Photo: `public/photos/team/serhii-voitov.png`
- Skills: Strategic partnerships, Leadership, Full-stack development, FinTech domain knowledge

**Vladislavs Nikiforovs** — Co-Founder
- Photo: `public/photos/team/vladislavs-nikiforovs.png`
- Skills: Regulated systems analysis, Database management, AI Agents, Pitching and networking

Photo implementation:
```jsx
function TeamPhoto({ src, name }) {
  const [hasPhoto, setHasPhoto] = React.useState(true)
  const initials = name.split(' ').map(s => s[0]).join('')
  
  if (!hasPhoto) {
    return (
      <div style={{
        width: '100%', aspectRatio: '1', borderRadius: 'var(--r-lg)',
        background: 'var(--accent-soft)', display: 'grid', placeItems: 'center',
        fontSize: 48, fontWeight: 700, color: 'var(--accent)',
        fontFamily: 'var(--font-display)',
      }}>
        {initials}
      </div>
    )
  }
  
  return (
    <img
      src={src} alt={name}
      onError={() => setHasPhoto(false)}
      style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 'var(--r-lg)' }}
    />
  )
}
```

Each card shows: photo (or placeholder), name, role "Co-Founder", and skill tags as small chips or a simple list.

### 3.3 Academic Backing
- Eyebrow: "BACKED BY"
- Reuse the existing `InstitutionLogos` pattern from old HubPage (RTU, UL, BA School logo cards).
- Brief text: "Frauda Hub is developed by a research-driven team with institutional backing from Latvia's top universities."

### 3.4 Social Proof Quote
- Positioned between academic backing and the timeline.
- Large pull-quote style:
  > "My grandparents get phishing texts, emails and calls almost every day. I wanted to create something that would protect them."
  > — Serhii Voitov, Latvian TV
- Style it as a visually distinct blockquote with the accent gradient or italic treatment matching the site's design language.

### 3.5 Footer
- Same footer as other pages.

Mobile: all grid-2 becomes single column, team cards stack, quote scales down nicely.

Run `npm run build`. Fix any errors. **Commit.**

---

## Phase 4 — About Us: Timeline + Lightbox

**Commit message:** `feat: interactive timeline with lightbox on About Us`

### 4.1 Timeline Data

Create the timeline data as a constant array in `AboutPage.jsx` (or a separate data file if cleaner):

```js
const TIMELINE = [
  {
    date: '2026-02-09',
    title: 'Start of HPC Challenge',
    description: 'Frauda Hub began as a project for the RTU High-Performance Computing Challenge.',
    link: null,
    photos: ['2026-02-09_hpc-start-1.png'],
  },
  {
    date: '2026-03-17',
    title: 'Mākslīgā Intelekta Diena 2026',
    description: 'Participated in the AI Day conference. Dialogue with Guna Puce on fraud prevention in the Baltics.',
    link: 'https://www.linkedin.com/in/guna-puce-ex-paidere-7b02a056/',
    photos: ['2026-03-17_mi-diena-1.png'],
  },
  {
    date: '2026-04-09',
    title: 'Start of FinQuest Coopetition',
    description: 'Entered the FinQuest financial technology coopetition.',
    link: null,
    photos: ['2026-04-09_finquest-start-1.png'],
  },
  {
    date: '2026-04-13',
    title: 'HPC Challenge — Final Pitch',
    description: 'Presented Frauda Hub at the RTU HPC Challenge final.',
    link: null,
    photos: ['2026-04-13_hpc-final-1.png'],
  },
  {
    date: '2026-04-14',
    title: 'Frauda on TV3',
    description: 'Featured on Latvian national television TV3 — coverage of student-built digital solutions for real-world problems.',
    link: 'https://tv3.lv/zinas/zinatne-un-tehnologijas/no-krapnieku-kersanas-lidz-marsrutu-planosanai-studenti-izstradajusi-digitalus-risinajumiem-realam-problemam/',
    photos: ['2026-04-14_tv3-1.png'],
  },
  {
    date: '2026-04-22',
    title: 'Frauda on LTV1',
    description: 'Featured on LTV1 national broadcast — RTU students develop a tool for scam detection.',
    link: 'https://www.lsm.lv/raksts/dzive-stils/tehnologijas-un-zinatne/26.05.2026-rtu-studenti-izstrada-riku-krapnieku-atpazisanai.a647232/',
    photos: ['2026-04-22_ltv1-1.png'],
  },
  {
    date: '2026-05-11',
    title: 'FinQuest Final — Top 5',
    description: 'Reached the top 5 out of 72 teams at the FinQuest Coopetition final.',
    link: null,
    photos: ['2026-05-11_finquest-final-1.png'],
  },
  {
    date: '2026-05-13',
    title: 'FinTech Baltic Days',
    description: 'Volunteered at FinTech Baltic Days — networking with the Baltic fintech ecosystem.',
    link: null,
    photos: ['2026-05-13_fintech-baltic-1.png'],
  },
  {
    date: '2026-05-14',
    title: 'DeepTech Conference',
    description: 'Attended the DeepTech Atelier conference in Riga (May 14–15).',
    link: null,
    photos: ['2026-05-14_deeptech-1.png'],
  },
]
```

### 4.2 Timeline Component

Build in `src/components/Timeline.jsx` (used only in AboutPage but complex enough to warrant its own file).

**Visual design:**
- Vertical timeline with a line on the left, circular point markers per event.
- Each point shows the date and title inline.
- Event titles that have a `link` are clickable (external link icon).

**Hover interaction:**
- Hovering on a timeline point shows a popover/tooltip to the right of the point.
- The popover contains: small thumbnail previews of the event photos (max ~120px wide), plus the event description text.
- Photos in the popover use the placeholder pattern (try to load from `/photos/timeline/filename.png`, fall back to a gray placeholder div with a camera icon if `onError` fires).

**Click interaction:**
- Clicking any thumbnail in the popover opens the Lightbox (see 4.3).
- The lightbox receives the full photo array for that event.

**Mobile:**
- On mobile (≤680px), the hover popover becomes a tap-to-expand accordion instead (since there's no hover on touch). Tapping a timeline point expands the description + photo thumbnails below the point.

### 4.3 Lightbox Component

Build in `src/components/Lightbox.jsx`.

**Features:**
- Full-screen overlay (same pattern as existing `Modal` in FishpoPage — dark backdrop with blur).
- Displays current photo at full quality, centered.
- Navigation:
  - Left/right arrow keys to go prev/next
  - Click left/right side of image (or prev/next buttons) to navigate
  - Swipe left/right on mobile (touch events)
  - Escape key to close
  - Click backdrop to close
- Photo counter: "2 / 5" indicator.
- Photo loads with the placeholder pattern — if the file doesn't exist, show a placeholder with text "Photo coming soon".
- Transitions: fade or slide between photos.
- Prevent body scroll when lightbox is open.
- Use `createPortal` to render into `document.body` (same as ContactModal pattern).

### 4.4 Wire it up

In `AboutPage.jsx`, add the "Our Story So Far" section between the social proof quote and the footer:
- Eyebrow: "OUR STORY SO FAR"
- Heading: "From university project to fraud prevention startup."
- Render `<Timeline events={TIMELINE} />` component.

Run `npm run build`. Fix any errors. **Commit.**

---

## Phase 5 — Mobile Optimization

**Commit message:** `fix: mobile optimization pass across all pages`

Do a thorough mobile audit at 375px width. Fix these known issues and any others you find:

### Global
- Ensure the hamburger menu in `Nav.jsx` works with the updated links (Hub, Fishpo, About Us).
- All CTA buttons go full-width on mobile (`≤680px`).
- No horizontal overflow on any page.

### Hub Page
- Hero text scales properly with `clamp()`.
- Stats grid: 4-column → 2×2 on tablet, 1-column on mobile (already handled by `.grid-4` media queries, verify).
- "From the Lab" Datco card: full width on mobile.
- Fishpo teaser `grid-3` → single column on mobile.

### Fishpo Page
- Comparison table: already has `.table-wrap` with `overflow-x: auto`. Verify it scrolls smoothly on mobile. Consider adding a subtle "scroll →" indicator if the table overflows.
- Demo modal: already responsive (`.modal-box` media queries). Verify.

### About Us Page
- Team cards: `grid-2` → single column stack on mobile.
- Quote: scales down, keeps readability.
- Timeline: left-aligned line works on all widths. Popover becomes tap-to-expand on mobile.
- Lightbox: full-screen on mobile, swipe navigation works.
- Academic backing logos: flex-wrap to stack.

### All Pages
- Touch targets: all interactive elements ≥44px tall.
- Font sizes: verify nothing is too small (<12px) on mobile.
- Spacing: reduce padding on mobile (already handled by media queries in styles.css, verify new sections follow the pattern).

Add any new CSS needed to `src/styles.css` in the appropriate media query blocks.

Run `npm run build`. Fix any errors. **Commit.**

---

## Phase 6 — Final Check + Cleanup

**Commit message:** `chore: final cleanup — photo check, dead code removal`

1. **Check for real photos:**
   - Check if files exist in `public/photos/team/` and `public/photos/timeline/`.
   - If real photos are present, verify they render correctly.
   - If not, verify placeholders display gracefully.

2. **Remove dead code:**
   - If any unused imports remain from the old Hub structure, remove them.
   - If `TrustBar` was removed from Hub, ensure it's not imported anywhere.
   - Check that `DatcoPage` still works when accessed directly via `/datco`.

3. **Build verification:**
   - Run `npm run build` — must pass with zero errors.
   - Check there are no console warnings about missing images (the placeholder pattern should handle this gracefully).

4. **Verify all routes work:**
   - `/` → redirects to `/hub`
   - `/hub` → redesigned Hub page
   - `/fishpo` → unchanged Fishpo page
   - `/datco` → still works (just not in nav)
   - `/about` → new About Us page

5. **Commit.**

---

## Summary of files to create/modify

| File | Action |
|---|---|
| `CLAUDE.md` | Already updated (replace existing) |
| `src/App.jsx` | Add `/about` route |
| `src/components/Nav.jsx` | Update LINKS array |
| `src/pages/HubPage.jsx` | Major restructure |
| `src/pages/AboutPage.jsx` | Create new |
| `src/components/Timeline.jsx` | Create new |
| `src/components/Lightbox.jsx` | Create new |
| `src/styles.css` | Add new styles for timeline, lightbox, about page |
| `public/photos/team/.gitkeep` | Create |
| `public/photos/timeline/.gitkeep` | Create |
