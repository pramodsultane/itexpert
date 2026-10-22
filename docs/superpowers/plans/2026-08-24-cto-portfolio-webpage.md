# CTO Portfolio Webpage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-first, executive-grade single-page portfolio deck of nine full-screen panels, sourced entirely from `Pramod_ITExpert_UseCases.docx`.

**Architecture:** Static site with no build step. `data.js` is the single source of content, `app.js` renders panels from that data and owns navigation and theming, `styles.css` owns the design system, `index.html` is a thin shell. Diagrams are extracted from the docx and optimised into `assets/img/`.

**Tech Stack:** Vanilla HTML, CSS custom properties, ES modules-free plain JS (loaded as classic scripts so `file://` works), Python + Pillow for one-time image extraction.

## Global Constraints

- Use only facts present in `Pramod_ITExpert_UseCases.docx`; invent no achievements, metrics, technologies, clients, employers, job titles, or dates.
- Identity is limited to "Pramod Sultane" and the framing "IT Expert Application"; no invented job title.
- Preserve source qualifiers: estimated impacts stay labelled estimated, and audience reach renders as "~522".
- Exactly nine panels, one visible at a time, with next/previous arrows, keyboard, dot rail, hash routing, and touch swipe.
- Dark-first theme with a light toggle persisted in `localStorage` key `portfolio-theme`.
- No CDN, no external network requests, no chart library, no build step; page must work opened directly via `file://`.
- Colour roles: cyan primary, amber in-progress, coral risk/critical, mint complete/done.
- Responsive with no horizontal overflow at 1440px, 1024px, 768px, and 375px.
- Honour `prefers-reduced-motion`; keep motion to cross-fade and hover elevation only.

---

### Task 1: Extract and optimise the four diagrams

**Files:**
- Create: `/home/e056197/github/portfolio/assets/img/system-architecture.png`
- Create: `/home/e056197/github/portfolio/assets/img/devops-lifecycle.png`
- Create: `/home/e056197/github/portfolio/assets/img/as-is-landscape.png`
- Create: `/home/e056197/github/portfolio/assets/img/to-be-architecture.png`

**Interfaces:**
- Produces: four web-optimised PNG files whose paths `data.js` references as `assets/img/<name>.png`.

- [ ] **Step 1: Extract and resize the images**

```python
import zipfile, io, os
from PIL import Image

SRC = '/home/e056197/github/Pramod_ITExpert_UseCases.docx'
OUT = '/home/e056197/github/portfolio/assets/img'
os.makedirs(OUT, exist_ok=True)
mapping = {
    'word/media/image1.png': 'system-architecture.png',
    'word/media/image2.png': 'devops-lifecycle.png',
    'word/media/image3.png': 'as-is-landscape.png',
    'word/media/image4.png': 'to-be-architecture.png',
}
z = zipfile.ZipFile(SRC)
for src, dest in mapping.items():
    im = Image.open(io.BytesIO(z.read(src))).convert('RGB')
    if im.width > 1600:
        im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
    im.save(f'{OUT}/{dest}', optimize=True)
    print(dest, im.size, round(os.path.getsize(f'{OUT}/{dest}') / 1024), 'KB')
```

- [ ] **Step 2: Verify every file is under 500 KB and legible**

Run: `ls -la /home/e056197/github/portfolio/assets/img/`
Expected: four PNG files present, each under 500 KB.

### Task 2: Author the content data module

**Files:**
- Create: `/home/e056197/github/portfolio/assets/js/data.js`

**Interfaces:**
- Produces: global `const PORTFOLIO` object with keys `profile`, `panels`. `panels` is an ordered array; each entry is `{ id: string, nav: string, kicker: string, title: string, lede: string, render: string, content: object }` where `render` names the renderer `app.js` dispatches to.

- [ ] **Step 1: Define the profile and panel skeleton**

```javascript
const PORTFOLIO = {
  profile: {
    name: 'Pramod Sultane',
    framing: 'IT Expert Application',
    links: {
      blog: 'https://pramodsultane.qzz.io/',
      github: 'https://github.com/pramodsultane',
      maturityPortal: 'https://devops-maturity-assessment-portal.pages.dev/',
      hackathon: 'https://smartec-ai-hackfest.pages.dev/'
    }
  },
  panels: []
};
```

- [ ] **Step 2: Populate all nine panels with document-sourced content**

Each panel object carries a `render` key of one of: `hero`, `portfolio`, `chatbot`, `runbooks`, `components`, `maturity`, `transmission`, `learning`, `leadership`. Content values must match the source document, including the four use-case statuses (Completed, Completed, Ongoing, Ongoing), the five persona benefits, the seven completed deliverables, the six runbooks, the nine CI components with their primary benefits, the eight maturity domains with actual/max/percent/rating, the eleven dated sessions with audience counts, and the conference, credential, reading, and leadership entries.

- [ ] **Step 3: Verify the data module parses and has nine panels**

Run: `cd /home/e056197/github/portfolio && node -e "require('./assets/js/data.js'); " 2>/dev/null || node --input-type=commonjs -e "eval(require('fs').readFileSync('assets/js/data.js','utf8')); console.log(PORTFOLIO.panels.length, PORTFOLIO.panels.map(p=>p.id).join(','))"`
Expected: prints `9` followed by the nine panel ids.

### Task 3: Build the shell and design system

**Files:**
- Create: `/home/e056197/github/portfolio/index.html`
- Create: `/home/e056197/github/portfolio/assets/css/styles.css`

**Interfaces:**
- Consumes: nothing at runtime beyond the script tags it loads.
- Produces: DOM contract for `app.js` — `#deck` (panel host), `#dots` (dot rail), `#prev`, `#next`, `#progress`, `#themeToggle`, `#lightbox`, `#lightboxImg`, `#lightboxCaption`.

- [ ] **Step 1: Write the HTML shell**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pramod Sultane — IT Expert Application</title>
<link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
<div id="progress" aria-hidden="true"></div>
<header class="topbar">
  <span class="wordmark">Pramod Sultane</span>
  <button id="themeToggle" type="button" aria-label="Switch theme">Light</button>
</header>
<main id="deck"></main>
<nav class="rail" id="dots" aria-label="Sections"></nav>
<button id="prev" class="arrow arrow-prev" type="button" aria-label="Previous section">&#8592;</button>
<button id="next" class="arrow arrow-next" type="button" aria-label="Next section">&#8594;</button>
<div id="lightbox" class="lightbox" hidden>
  <img id="lightboxImg" alt="">
  <p id="lightboxCaption"></p>
</div>
<script src="assets/js/data.js"></script>
<script src="assets/js/app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Write the theme tokens and layout**

Define `:root` custom properties for canvas, surface, border, text, muted, and the cyan/amber/coral/mint roles, with a `[data-theme="light"]` override block. Implement the panel system (each `.panel` fills the viewport, scrolls internally when tall), fixed arrows and dot rail, top progress bar, metric tiles, cards, timeline, bar chart, status pills, tables, and the lightbox. Add responsive rules at 1024px, 768px, and 480px that collapse grids to one column and convert tables to stacked cards. Add a `@media (prefers-reduced-motion: reduce)` block disabling transitions.

- [ ] **Step 3: Verify the shell loads with no console errors**

Open `file:///home/e056197/github/portfolio/index.html` in a browser.
Expected: topbar, arrows, and rail render; deck is empty until Task 4.

### Task 4: Implement rendering, navigation, and theming

**Files:**
- Create: `/home/e056197/github/portfolio/assets/js/app.js`

**Interfaces:**
- Consumes: global `PORTFOLIO` from `data.js`; DOM ids from `index.html`.
- Produces: rendered panels, a working deck, and `window.__deck` exposing `{ go(index), current() }` for validation.

- [ ] **Step 1: Implement the renderers**

One function per `render` value, each returning an HTML string for the panel body. Shared helpers build metric tiles, cards, status pills, the maturity bar chart (bar width equals the domain percent, colour chosen from the rating: coral for CRITICAL or HIGH RISK, mint for Advanced, cyan otherwise), the session timeline, and diagram figures.

- [ ] **Step 2: Implement deck navigation**

Build panels into `#deck`, build the dot rail, and implement `go(index)` which clamps to range, toggles the `is-active` class, updates `aria-current` on dots, sets arrow `disabled` at the ends, updates `#progress` width to `(index + 1) / total * 100%`, and writes `location.hash`. Wire click handlers on `#prev`/`#next`/dots, `keydown` for `ArrowRight`, `ArrowLeft`, `PageDown`, `PageUp`, `Home`, `End`, `hashchange`, and `touchstart`/`touchend` for horizontal swipes over a 50px threshold.

- [ ] **Step 3: Implement the theme toggle and lightbox**

Read `localStorage.getItem('portfolio-theme')` on load, defaulting to `dark`; apply it to `documentElement.dataset.theme`; toggle and persist on click, updating the button label. Delegate clicks on `.diagram img` to open `#lightbox` with the image `src` and caption; close on click or `Escape`.

- [ ] **Step 4: Verify all nine panels render and navigation works**

Open the page, press `End`, then `Home`, click through the dot rail, and toggle the theme twice.
Expected: nine panels reachable, arrows disable at the ends, hash updates, theme persists across reload, console clean.

### Task 5: Validate content fidelity and responsiveness

**Files:**
- Modify: whichever files the validation reveals as defective.

- [ ] **Step 1: Verify every figure against the document**

Check the four use-case statuses, five persona impacts, seven deliverables, six runbooks, nine components, eight maturity domains plus the 35/110 and 32% totals, and the eleven session audience counts summing to 522.
Expected: exact match with the source; every estimate still labelled as estimated.

- [ ] **Step 2: Verify responsiveness at four widths**

Check 1440px, 1024px, 768px, and 375px.
Expected: no horizontal overflow, no clipped text, arrows and rail reachable at every width.

- [ ] **Step 3: Verify offline operation**

Confirm the page makes zero network requests and renders fully from `file://`.
Expected: no external requests in the network panel.

- [ ] **Step 4: Fix any defects found and re-verify**

Repeat Steps 1 to 3 until all pass.
