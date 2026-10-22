# ENGAGE DevOps Challenges

## Goal

Add a concise challenge summary to the "Transforming ENGAGE DevOps culture & tooling" slide, using the problem-to-contribution pattern already used on the RAG chatbot slide. Content comes only from the mcc-integration leadership assessment, without overstating inferred or estimated findings.

## Placement and presentation

Add a "Challenges and response" section after "Current progress" and before the architecture diagrams. Use four responsive cards. Each card leads with a headline figure, then a title, two evidence bullets, and a recommended direction. Recommendations must not be presented as completed work. Remove the separate four-row AS-IS / TO-BE comparison; retain the existing diagrams.

## Cards

1. **Right tools, no guardrails** (headline: 6 h per release, estimate; target 1-2 h)
   - Tests and SonarQube exist but are not shown to block merges; no pipeline definition was found; production promotion is manual with no audit trail.
   - Recommended direction: protect main, require a passing pipeline and review, and adopt one validated pipeline built from shared templates.

2. **Slow incidents that nobody can measure** (headline: 8 h per incident, estimate; target about 4 h)
   - No runbooks or documented rollback steps, limited observability, and no DORA baseline.
   - Recommended direction: automate rollback with a fast-track hotfix path, write runbooks, and set a DORA baseline including MTTR.

3. **Secrets handling is a blind spot** (headline: Unverified)
   - Secrets storage is undocumented and likely CI variables; rotation is manual and quarterly; no SAST or container scanning; no secrets are committed in code.
   - Recommended direction: document the current mechanism, move to Vault with a separate production role, and make scans mandatory.

4. **A hard runtime deadline** (headline: Oct 2026)
   - Python 3.10 reaches end of life in October 2026; migration status is unknown; dependencies are updated by hand.
   - Recommended direction: finish the Python 3.12 migration, then automate updates with Renovate and blocking dependency scans.

## Source handling

A single caption under the cards names the mcc-integration assessment as the source, states that it inspects one repository, that its time figures are unsourced estimates, and that group-level practices are inferred. Time figures are also labelled "estimate" on the cards themselves.

## Validation

Confirm four cards render with headline figures, only the mcc-integration source is cited, estimates and the unverified secrets status stay visible, the layout is two columns on desktop and one on mobile, and the maturity score, progress cards, and diagrams remain intact.
