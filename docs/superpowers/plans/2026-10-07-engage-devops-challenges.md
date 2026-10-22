# ENGAGE DevOps Challenges Implementation Plan

> **For agentic workers:** Use this plan task-by-task. Each task has an independent test check.

**Goal:** Add four source-labeled challenge and next-step cards to the ENGAGE DevOps maturity slide.

**Architecture:** Store challenge copy in the maturity panel's data in `assets/js/data.js`; render it between current progress and AS-IS / TO-BE in `assets/js/app.js`; style four cards responsively in `assets/css/styles.css`. Extend `validate.js` to check card count, source distinction, and the continued presence of existing maturity content.

**Tech Stack:** Static HTML, vanilla JavaScript data/rendering, CSS Grid, Node.js and jsdom validator.

## Global Constraints

- Use only the attached mcc-integration assessment as the source for card content.
- Label findings by source and distinguish observed evidence from estimates or unverified claims.
- Present card responses as recommended actions, not completed work.
- Preserve the existing maturity score, progress, and diagrams; remove the four-row AS-IS / TO-BE comparison.
- Do not commit changes unless explicitly requested.

---

### Task 1: Add regression checks

**Files:**
- Modify: `validate.js`

- [x] Add checks for four `.engage-challenge` cards, each with a headline figure, and a source caption naming the mcc-integration assessment.
- [x] Assert that time figures are labelled as estimates, the secrets card says exposure is unverified, and no card cites Salesforce.
- [x] Assert that the existing eight maturity bars and current progress cards remain rendered.
- [ ] Run `node validate.js`; confirm the new challenge checks fail because the cards are not implemented yet. Existing unrelated failures may remain.

### Task 2: Add source-backed challenge data

**Files:**
- Modify: `assets/js/data.js`

- [x] Add four challenge records to `maturity.content.challenges`; each has a `title`, an `evidence` array of `{ source, detail }` records, a `response`, and a `tone`.
- [x] Use the four approved topics: credential exposure and secrets handling; manual releases and incident recovery; un-enforced quality/security checks; operational knowledge and delivery visibility.
- [x] Each card has `title`, `value`, `valueNote`, two `evidence` strings, a `response`, and a `tone`; a single `challengesSource` caption states the source and its limits.

### Task 3: Render responsive challenge cards

**Files:**
- Modify: `assets/js/app.js`
- Modify: `assets/css/styles.css`

- [x] Render a "Challenges and response" section after current progress and before the architecture diagrams; remove the AS-IS / TO-BE rows.
- [x] Render each record with its challenge title, source-labeled evidence, and recommended response.
- [x] Use a two-column grid on wide screens and one column at mobile widths; use existing design tokens and card conventions.

### Task 4: Verify

**Files:**
- Verify: `validate.js`, `assets/js/data.js`, `assets/js/app.js`, `assets/css/styles.css`

- [ ] Run `node validate.js` and confirm the new challenge checks pass.
- [x] Inspect the maturity slide in the browser at desktop and mobile widths; verify source labels and qualification wording fit without overlap.
- [x] Confirm the maturity score, progress cards, and architecture diagrams remain visible and comparison rows are absent.

The terminal runner returned stale output instead of a `node validate.js` result; the full Node validator remains unverified. Browser assertions confirmed four cards, source separation, recommendation labels, the existing score and progress, and desktop/mobile column counts. Editor diagnostics reported no errors.
