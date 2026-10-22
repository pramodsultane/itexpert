# Delivery timeline and Kubestronaut update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the 17/09/2026 Kubernetes training, show CKA as in progress with Kubestronaut progress at 1/5, and keep the displayed reach summary consistent.

**Architecture:** Modify the existing data source only. `assets/js/app.js` already renders timeline entries and derives Kubestronaut progress from `done` and each step's `done` flag; directly related source documentation will be updated to match the new aggregate values.

**Tech Stack:** Vanilla JavaScript data object, static HTML/CSS/JS site, existing Node validation script.

## Global Constraints

- Preserve the existing data-driven renderer and visual styling.
- Use the exact requested training date, title, audience, and approximate audience size.
- Keep KCNA completed, CKA in progress, and the remaining three certifications planned.
- Render aggregate reach with the approximate qualifier: `~522 people` across `11` sessions.
- Do not add dependencies or change the renderer/CSS.

---

### Task 1: Update portfolio data and source documentation

**Files:**
- Modify: `assets/js/data.js:199-214` for the timeline session and related lede text.
- Modify: `assets/js/data.js:244-253` for Kubestronaut completion state.
- Modify: `docs/superpowers/specs/2026-08-24-cto-portfolio-webpage-design.md:56-68` for the documented timeline and derived figures.

**Interfaces:**
- Consumes: Existing `PORTFOLIO.transmission.content` and `PORTFOLIO.learning.content.kubestronaut` structures.
- Produces: Data consumed unchanged by `render.transmission` and `render.learning`.

- [ ] **Step 1: Update the knowledge-reach lede and append the training session**

In `assets/js/data.js`, change the transmission lede to state approximately 522 people across eleven sessions, then append this object to the end of `content.sessions`:

```js
{ date: '17/09/2026', type: 'Training', title: 'Kubernetes for DevOps', audience: 'Michelin Employees \u00b7 M2M sessions', people: 30 }
```

- [ ] **Step 2: Change the Kubestronaut path state**

In `assets/js/data.js`, set `kubestronaut.done` to `1` and change only the CKA step to:

```js
{ code: 'CKA', name: 'Certified Kubernetes Administrator', when: '09/2026 \u00b7 In progress', done: false }
```

The existing renderer will show `1/5 completed`, display `In progress` beside CKA's date, and omit CKA's completion checkmark. Preserve KCNA's `done: true` and the planned states for CKAD, KCSA, and CKS.

- [ ] **Step 3: Update the design documentation's aggregate wording**

In `docs/superpowers/specs/2026-08-24-cto-portfolio-webpage-design.md`, replace references to ten dated sessions and approximately 492 people with eleven dated sessions and approximately 522 people. Update the derived calculation to:

```text
~522 people reached = 20 + 30 + 20 + 30 + 200 + 12 + 50 + 10 + 50 + 70 + 30
```

- [ ] **Step 4: Run the existing validation**

Run:

```bash
node validate.js
```

Expected: all existing checks pass, including panel navigation and progress-bar checks.

- [ ] **Step 5: Verify exact requested values**

Run:

```bash
node - <<'NODE'
const portfolio = require('./assets/js/data.js');
const transmission = portfolio.panels.find((panel) => panel.id === 'transmission').content;
const learning = portfolio.panels.find((panel) => panel.id === 'learning').content;
const session = transmission.sessions.find((item) => item.date === '17/09/2026');
const cka = learning.kubestronaut.steps.find((step) => step.code === 'CKA');
if (!session || session.type !== 'Training' || session.people !== 30 ||
    session.title !== 'Kubernetes for DevOps' ||
    session.audience !== 'Michelin Employees · M2M sessions') {
  throw new Error('training entry does not match the requested values');
}
if (learning.kubestronaut.done !== 1 || cka.done !== false || cka.when !== '09/2026 · In progress') {
  throw new Error('Kubestronaut state does not match the requested values');
}
console.log('requested values verified');
NODE
```

Expected: `requested values verified`.

The workspace is not a Git repository, so no commit step is possible here.
