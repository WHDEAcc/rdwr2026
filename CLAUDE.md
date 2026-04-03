# CLAUDE.md

This file provides guidance to AI coding assistants when working with code in this repository.

## Project Overview

**EDGE Landscape Architecture** (前场规划设计) — an avant-garde portfolio website for a landscape architecture studio based in Shenzhen and Hong Kong. Originally bootstrapped from Google AI Studio, then heavily customized with premium visual effects (text-mask hero, 3D tilt cards, cinematic curtain reveal), full i18n (4 locales + RTL), Gemini-powered AI design consultant, and automated Playwright visual regression across 3 viewports.

**Live site**: https://edge-landscape.pages.dev  
**Repository**: https://github.com/WHDEAcc/rdwr2026

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | React 19 + TypeScript | Vite 6 bundler |
| Styling | Tailwind CSS via CDN | `<script src="cdn.tailwindcss.com">` in `index.html`, **NOT** an npm dependency. Theme config inline. |
| Animation | Framer Motion 12 | Scroll reveals, carousel, word-by-word text animation |
| i18n | i18next + react-i18next | 4 locales: `en`, `zh-CN`, `zh-TW`, `ar` |
| AI Chat | Google Gemini API (`@google/genai`) | Model: `gemini-3-flash-preview` |
| Icons | Lucide React | |
| Testing | Playwright | Visual regression + multi-viewport tests |
| Deployment | Cloudflare Pages | Via `wrangler pages deploy dist/` |
| Fonts | Google Fonts | Instrument Serif (display), Cormorant Garamond (serif), Inter (sans) |

---

## Commands

```bash
npm run dev      # Dev server (port 3000, host 0.0.0.0)
npm run build    # Production build → dist/
npm run preview  # Preview production build

# Testing
npx playwright test                              # All viewports (Desktop/Mobile/iPad)
npx playwright test --project=Desktop            # Desktop only (1440×900)
npx playwright test --project=Mobile             # iPhone 13 viewport
npx playwright test --project=iPad               # iPad Pro 11 viewport
npx playwright install                           # Install Webkit for Mobile/iPad tests

# Deployment
npx wrangler pages deploy dist --project-name edge-landscape --commit-dirty=true

# i18n migration helper (one-shot, already applied)
node patch_wave3.cjs
```

---

## Architecture

### Directory Structure (Flat — No `src/` Directory)

```
├── App.tsx                    # Root component — assembles all sections + 3 modals
├── index.html                 # HTML shell + Tailwind CDN + custom CSS + importmap
├── index.tsx                  # React entry point
├── constants.ts               # Static data: PROJECT_STATIC_DATA, SERVICE_STATIC_DATA, etc.
├── types.ts                   # TypeScript interfaces (Project, Service, Testimonial, etc.)
├── vite.config.ts             # Vite config (port 3000, path aliases, env injection)
├── playwright.config.ts       # 3 viewports: Desktop, Mobile (iPhone 13), iPad Pro 11
├── patch_wave3.cjs            # One-shot i18n migration script (string-replace transforms)
├── components/
│   ├── Hero.tsx               # Text-mask hero + centered slideshow carousel (17KB)
│   ├── SectionReveal.tsx      # Scroll-triggered reveal (clipPath desktop / fade mobile)
│   ├── BlurFade.tsx           # Intersection-based fade-in animation (no blur on mobile)
│   ├── HighlightedProjects.tsx # Project list with Sasaki-style hover swipe + 3D tilt
│   ├── DisciplinesList.tsx    # Expandable category accordion with hover preview
│   ├── Philosophy.tsx         # 4-item philosophy grid
│   ├── About.tsx              # Studio info section
│   ├── People.tsx             # Team modal
│   ├── Header.tsx             # Sticky header + nav + language switcher (mix-blend-exclusion)
│   ├── Footer.tsx             # Footer with translated addresses
│   ├── DesignConsultant.tsx   # AI chat modal (Gemini), RTL-aware positioning
│   ├── ProjectDetail.tsx      # Project detail modal with image carousel
│   ├── LanguageSwitcher.tsx   # EN/中/繁/عر language toggle
│   └── TextReveal.tsx         # Character-by-character reveal animation
├── hooks/
│   ├── useTranslatedData.ts   # Hooks: useTranslatedProjects, Services, Philosophy, etc.
│   └── useDirection.ts        # RTL/LTR direction hook (Arabic support)
├── i18n/
│   ├── index.ts               # i18next config with browser language detection
│   └── locales/
│       ├── en.json            # English — includes Ideas section with verified URLs
│       ├── zh-CN.json         # Simplified Chinese
│       ├── zh-TW.json         # Traditional Chinese
│       └── ar.json            # Arabic (RTL)
└── tests/
    ├── visual-baseline.spec.ts # Playwright visual regression tests
    └── screenshots/           # Baseline screenshots
```

### Section Assembly Order in App.tsx

```
Header → Hero → DisciplinesList → HighlightedProjects → Philosophy
→ Ideas (inline i18n) → About → Testimonials (inline) → Contact → Footer
```

All sections except Hero are wrapped in `<SectionReveal>` for scroll-triggered animation.

### Key Visual Effects (Avant-Garde "Anchors")

1. **Text-Mask Hero** (`hidden lg:block`): `background-clip: text` fills Instrument Serif title with active project imagery. Mouse-following parallax. **Desktop only (≥1024px).**
2. **3D Tilt Cards**: `HighlightedProjects` hover shows perspective rotation + radial-gradient glare overlay. Mouse position tracked via `sectionRef` for accurate positioning.
3. **Section Curtain Reveal**: `SectionReveal` uses `clipPath: inset()` animation on desktop, `opacity + translateY` on mobile.
4. **Sasaki-Style Hover Swipe**: `HighlightedProjects` rows fill with inverse color (`scaleX` animation) on hover.
5. **Header Blend**: `mix-blend-mode: exclusion` makes white header text readable against any section background.

### Responsive Breakpoints

| Breakpoint | Viewport | Behavior |
|-----------|----------|----------|
| Mobile | < 768px | Fade-up reveals, serif text hero, touch swipe carousel, 80% active / 15% inactive slide width |
| Tablet | 768–1023px | Serif text hero (NOT text-mask), 60% active / 15% inactive slide, no 3D tilt |
| Desktop | ≥ 1024px | Text-mask hero, clipPath curtain, 3D tilt cards, 52% active / 12% inactive / 20% hover slide width |

### Modal System

`App.tsx` manages 3 modals via state:
- `DesignConsultant` — AI chat (Gemini), triggered by floating button (RTL: slides from left)
- `ProjectDetail` — Image carousel + project info, triggered by project click
- `People` — Team members, triggered by header link

All modals: Escape to close, body scroll lock, `aria-modal`.

### Carousel Slide System (Hero.tsx)

The carousel uses a **strip-based centering model** with `translateX`:
- Each slide has a width computed from viewport × percentage constants
- `getTranslateX` positions the active slide's center at the viewport center
- Autoplay (3s interval) pauses on hover, resumes on leave
- Touch swipe via `onTouchStart`/`onTouchEnd` with 50px threshold
- Arrow key navigation via `window.addEventListener('keydown')`
- All project images preloaded on mount via `new Image()` constructor

---

## i18n System

### Architecture

- Config in `i18n/index.ts` with `i18next-browser-languagedetector`
- 4 locales: `en`, `zh-CN`, `zh-TW`, `ar` (Arabic with RTL support)
- All 4 locale files have identical key structure
- `SUPPORTED_LANGUAGES` map defines `dir: 'ltr' | 'rtl'` per locale
- `useDirection()` hook provides `{ dir, isRTL }` for RTL-aware components

### Data Flow

```
constants.ts (static data: ids, images, gallery URLs)
    ↓
useTranslatedData.ts (hooks map static data through i18n keys)
    ↓
Components (receive fully-translated objects)
```

- `useTranslatedProjects()` / `useTranslatedTestimonials()` / `useTranslatedPhilosophy()` / `useTranslatedServices()` / `useTranslatedNavCategories()`
- Ideas section content (8 articles from SWA, Sasaki, AECOM) is fully in locale files with verified URLs
- Use `t('ideas.items.0.headline')` pattern for indexed items

### RTL Considerations

- `document.documentElement.dir` is set reactively via `useDirection()` in `App.tsx`
- Logical properties used: `start/end` instead of `left/right` (e.g., `me-4`, `pe-12`, `end-0`)
- `DesignConsultant` panel slides from the inline-end side
- Hero carousel drag constraints flip for RTL

### Migration Script

`patch_wave3.cjs` is a one-shot Node.js script that string-replaces hardcoded English strings across all components with `t()` calls. It has already been applied. It's kept in the repo as documentation of the migration approach.

---

## AI Chat

- `DesignConsultant.tsx` directly instantiates `GoogleGenAI`
- Creates new instance per message (no conversation context)
- API key from `.env.local` → `GEMINI_API_KEY`, injected via `vite.config.ts` `define`
- Welcome message re-renders on language change via `useEffect([i18n.language])`

---

## Dev Server

### Port Configuration

- **Port 3000** configured in `vite.config.ts` (`server.port: 3000, host: '0.0.0.0'`)
- Playwright also expects port 3000 (`baseURL: 'http://localhost:3000'`)
- **DO NOT change** to default 5173 — test infrastructure depends on port 3000

### Proxy Pitfall (macOS)

System proxy settings or `~/.zshrc` exports (`http_proxy`, `https_proxy`) commonly interfere with `localhost` connections:
- **Symptom**: `curl` fails with "Connection refused on port 7890"
- **Cause**: `export http_proxy=http://127.0.0.1:7890` in shell config, but proxy daemon not running
- **Fix**: `curl --noproxy '*' -I http://localhost:3000/` or comment out proxy exports
- **Permanent**: Add `localhost,127.0.0.1,[::1]` to macOS bypass list

### IPv4 vs IPv6

Vite may bind to `[::1]` (IPv6) while `curl` tries `127.0.0.1` (IPv4). Use `lsof -iTCP -sTCP:LISTEN -P -n | grep node` to verify which address is bound.

---

## Critical Pitfalls — Read Before Editing

### ⚠️ P0: Mobile Animation Timing Bug (Framer Motion)

**NEVER use `useState(false)` + `useEffect` for mobile detection in animation components.**

```tsx
// ❌ BROKEN — first render uses false, clipPath hides content permanently
const [isMobile, setIsMobile] = useState(false);
useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);

// ✅ CORRECT — synchronous, correct from first render
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
```

**Root cause**: Framer Motion's `initial` prop locks on first render. If `isMobile` is false during first render on a mobile device, `clipPath: 'inset(100% 0 0 0)'` makes content permanently invisible because the component never re-enters the viewport to trigger IntersectionObserver.

**Components currently using the correct pattern**:
- `SectionReveal.tsx` → `getIsMobile()` top-level function
- `BlurFade.tsx` → `getIsMobile()` top-level function
- `Hero.tsx` → `viewport` state + `useEffect(resize)` (acceptable here because Hero uses `animate` not `initial`)

### ⚠️ P1: Text-Mask Breakpoint (1024px+)

The `background-clip: text` hero effect renders poorly on iPad Safari (fragmented textures). It MUST stay at `hidden lg:block` (1024px+). The mobile/tablet fallback (`lg:hidden`) shows clean serif text with word-by-word animation.

### ⚠️ P1: CSS blur() on Mobile Safari

Never use `filter: blur()` in framer-motion animations for mobile targets. It causes severe GPU performance issues on iOS Safari. Use `opacity` + `translateY` only.

**This is why `BlurFade.tsx` does NOT actually blur** — despite the component name, it only uses opacity+translate for compatibility.

### ⚠️ P1: Tailwind CSS is CDN-based

Tailwind is loaded via `<script>` tag, not PostCSS. Custom theme extends are defined inline in `index.html`. Do NOT:
- Add `tailwindcss` to `package.json`
- Create `tailwind.config.js` or `tailwind.config.ts`
- Import Tailwind CSS files via `@import`

### ⚠️ P2: Build Size Warning

Production build generates a single 786KB JS chunk (>500KB warning). This is acceptable for now. Future fix: add `manualChunks` in `vite.config.ts`.

### ⚠️ P2: Stale Dev Server Processes

After config changes (e.g., changing Vite port), old processes may linger on the previous port. A running process may claim port 3000 in `ps` output but actually bind to 5173. `lsof -iTCP -sTCP:LISTEN` is the source of truth — always verify with it, not `ps`.

### ⚠️ P2: Hero Slide Centering Math

`getTranslateX` in `Hero.tsx` uses a simplified model: `leftEdge = activeIndex * inactiveWidth`. This works because all non-active slides are the same width. If you ever add variable inactive widths, the centering math must sum all preceding widths individually.

---

## Path Aliases

`@/*` maps to project root (`tsconfig.json` + `vite.config.ts`).

## Environment Variables

- `GEMINI_API_KEY` — in `.env.local`, injected as `process.env.API_KEY` and `process.env.GEMINI_API_KEY`

---

## Deployment Checklist

1. `npm run build` — verify no TypeScript errors
2. Check `dist/` folder size (expect ~1MB total)
3. `npx wrangler pages deploy dist --project-name edge-landscape --commit-dirty=true`
4. Verify live at https://edge-landscape.pages.dev
5. Test mobile viewport on real device (iOS Safari is the problematic one)

## Testing Checklist

1. Start dev server: `npm run dev`
2. Run desktop tests: `npx playwright test --project=Desktop`
3. Run mobile tests: `npx playwright test --project=Mobile` (requires Webkit: `npx playwright install`)
4. Run iPad tests: `npx playwright test --project=iPad`
5. Visual diffs saved to `tests/screenshots/`
