# Innovator Crews — Website Architecture & Maintenance Guide

## Project Overview

| Item | Detail |
|---|---|
| **Project** | Innovator Crews Company Website |
| **Version** | 1.0.0 |
| **Stack** | Vanilla HTML5 / CSS3 / ES2022+ JS (no build tools required) |
| **Theme** | Blue Shade — Light Mode |
| **Responsive** | 360px → 1920px |

---

## File Structure

```
IC/
├── index.html              ← Main entry point (single-page layout)
├── css/
│   └── styles.css          ← All styles, variables, responsive rules
├── js/
│   └── main.js             ← All interactivity, modules, animations
├── assets/
│   ├── images/             ← Team photos, project screenshots (add here)
│   └── icons/              ← Favicon, apple-touch-icon (add here)
└── ARCHITECTURE.md         ← This file
```

---

## CSS Architecture

### Design Tokens (`:root`)
All colours, spacing, shadows, and radius values are defined as CSS custom properties in `:root`. **Always edit tokens here first** — never hardcode values.

| Token Group | Example | Purpose |
|---|---|---|
| `--blue-*` | `--blue-500` | Primary brand colours |
| `--gray-*` | `--gray-900` | Neutral / text colours |
| `--gradient-*` | `--gradient-primary` | Reusable gradient strings |
| `--shadow-*` | `--shadow-blue` | Elevation levels |
| `--radius-*` | `--radius-xl` | Border radius scale |
| `--transition-*` | `--transition-normal` | Animation durations |
| `--space-section` | `100px` | Section vertical padding |

### Layer Order
```
1. Tokens (:root)
2. Reset & Base
3. Typography
4. Layout utilities (.container, .section)
5. Components (navbar, buttons, cards…)
6. Sections (hero, about, services…)
7. Responsive overrides (@media)
8. Print styles
```

---

## JavaScript Module Architecture

Each feature is an IIFE module with `init()`:

```
Loader            → Page pre-loader
Cursor            → Custom cursor with lerp smoothing
Navbar            → Sticky nav, hamburger, active section tracking
ScrollAnimations  → IntersectionObserver-based AOS replacement
CounterAnimation  → Number count-up on scroll
SkillBars         → CSS transform-scale progress bars
ProjectFilter     → Filter cards by category
ContactForm       → Validation + async submit simulation
BackToTop         → Scroll-to-top button
ParallaxOrbs      → Mouse-tracking parallax on hero orbs
HeroTyping        → Typewriter badge effect
TiltEffect        → 3D tilt on cards
SmoothScroll      → All #hash anchor links
ArchAnimation     → Stagger arch diagram nodes on scroll
ActiveIndicator   → Team card interaction enhancement
Marquee           → Pause-on-hover ticker
A11y              → Skip-link for keyboard users
```

**All modules initialised in `DOMContentLoaded`.**

---

## Responsive Breakpoints

| Name | Width | Notes |
|---|---|---|
| XL | ≤ 1280px | Adjust bento grid columns |
| LG | ≤ 1024px | Collapse navbar, stack hero |
| MD | ≤ 768px | Mobile hamburger menu, 1-col grids |
| SM | ≤ 480px | Compact spacing, stacked CTAs |
| XS | ≤ 360px | Smallest supported viewport |

---

## Adding or Updating Team Members

1. Find the `team-grid` div in `index.html`
2. Copy an existing `.member-card` block
3. Update:
   - Initials in `.member-avatar`
   - `background` gradient (pick a new shade)
   - `.member-name`, `.member-primary-role`
   - `.member-tags` spans
   - `--w` CSS variable on `.skill-fill` elements
   - Back-face `.back-bio` text
   - `.back-skill-tags` items
   - Social links `href` attributes

---

## Adding New Projects

1. Find the `projects-grid` div in `index.html`
2. Copy a `.project-card` block
3. Update:
   - `data-category` attribute (`web` | `mobile` | `design` | `backend`)
   - `.project-placeholder` gradient background
   - Icon class
   - `.project-category`, `.project-year`, `.project-title`, `.project-desc`
   - `.project-stack` technology spans
   - Live demo & source `href` links

---

## Adding New Services

1. Find the `services-grid` div
2. Copy a `.service-card` block
3. Update:
   - `data-index` number
   - Icon in `.service-icon-wrap`
   - Heading, description, list items
   - `.service-num` (display number, bottom-right decoration)

---

## Colour / Theme Changes

Edit only the tokens section in `css/styles.css`:

```css
:root {
  --blue-500:  #3B82F6;  /* ← Change primary brand colour here */
  --blue-600:  #2563EB;
  --blue-700:  #1D4ED8;
  /* … */
}
```

All components automatically inherit the change.

---

## Performance Checklist

- [ ] Add real `<img>` tags with `loading="lazy"` and `alt` text for team photos
- [ ] Compress images to WebP (≤ 200 KB each)
- [ ] Add `rel="preload"` for hero background image (if added)
- [ ] Set `Cache-Control: max-age=31536000` on static assets
- [ ] Enable GZIP / Brotli compression on server
- [ ] Add `<link rel="dns-prefetch">` for Google Fonts and Font Awesome CDN
- [ ] Run Lighthouse audit — target ≥ 90 on all metrics

---

## SEO Checklist

- [ ] Update `<meta name="description">` in `index.html`
- [ ] Add real domain to `<meta property="og:url">`
- [ ] Add `og:image` (1200×630 px social share card)
- [ ] Add `rel="canonical"` link
- [ ] Create `sitemap.xml`
- [ ] Create `robots.txt`
- [ ] Add JSON-LD `Organization` schema markup

---

## Deployment (Static Site)

### Option A — GitHub Pages
```bash
git init
git add .
git commit -m "chore: initial deploy"
git remote add origin https://github.com/innovatorcrews/website.git
git push -u origin main
# Enable Pages in Repository Settings → Pages → branch: main / root
```

### Option B — Netlify Drop
Drag the `IC/` folder to **app.netlify.com/drop** — deployed instantly.

### Option C — Vercel
```bash
npx vercel --prod
```

### Option D — Traditional Hosting
Upload all files via FTP/SFTP maintaining the folder structure.
Ensure `index.html` is in the web root.

---

## Environment Variables (Future Backend)

If a backend contact form is added:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=hello@innovatorcrews.dev
SMTP_PASS=***
RECAPTCHA_SECRET=***
```

---

## Accessibility (WCAG 2.1 AA)

| Item | Status |
|---|---|
| Skip navigation link | ✅ Implemented |
| Keyboard navigation | ✅ All interactive elements focusable |
| ARIA labels on icon buttons | ✅ `aria-label` attributes present |
| Colour contrast ≥ 4.5:1 | ✅ Verified blue-on-white |
| Reduced motion support | ✅ `prefers-reduced-motion` respected |
| Form error feedback | ✅ Visual error states |
| No autoplay media | ✅ No videos/audio |

---

## Browser Support

| Browser | Version |
|---|---|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Samsung Internet | 14+ |
| Opera | 76+ |

---

## Maintenance Schedule

| Frequency | Task |
|---|---|
| Monthly | Update dependency CDN versions (Font Awesome, Google Fonts) |
| Quarterly | Run Lighthouse performance audit |
| As needed | Add new projects & team updates |
| Annually | Review and refresh content, testimonials, and stats |

---

## Contact

**Innovator Crews Development Team**  
hello@innovatorcrews.dev  
Philippines 🇵🇭

| Name | Role | Contact |
|---|---|---|
| Marc Steeven Parubrub | Lead Frontend / PM | — |
| Leander Ochea | Lead Backend | — |
| Veeny Bautista | Lead UI/UX / Sys Architecture | — |
| Armabel Ramos | Lead Documentation / QA | — |
