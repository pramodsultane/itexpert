# Delivery timeline and Kubestronaut update

## Goal

Update the portfolio page with the requested 17 September 2026 Kubernetes training and reflect the current Kubestronaut path status.

## Scope

The page is data-driven: `assets/js/data.js` is the single source of content consumed by `assets/js/app.js`. No renderer or CSS changes are needed.

## Changes

1. Add a training session under `transmission.content.sessions`:
   - Date: `17/09/2026`
   - Type: `Training`
   - Audience: approximately 30 people
   - Title: `Kubernetes for DevOps`
   - Audience label: `Michelin Employees · M2M sessions`
2. Update `learning.content.kubestronaut`:
   - Overall completed count: `1/5`
   - KCNA remains completed.
   - CKA changes from completed to `09/2026 · In progress`, with no completion checkmark.
   - The remaining certifications remain planned.
3. Keep derived reach figures consistent:
   - Eleven dated sessions.
   - Approximately 522 people reached, adding 30 people to the previous approximately 492.
   - Update the source design documentation's derived-figure and timeline wording accordingly.

## Compatibility and validation

The existing renderer already:

- Renders each session from the `sessions` array.
- Displays `~<people> people` from the numeric `people` field.
- Calculates Kubestronaut progress from `done / steps.length`.
- Renders completion state from each step's `done` boolean and displays the step's `when` text, which will visibly include `In progress` for CKA.

Validation will run the repository's existing `validate.js` checks and inspect the changed values for exact output.
