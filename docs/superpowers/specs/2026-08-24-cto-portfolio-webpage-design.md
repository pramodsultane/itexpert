# CTO Portfolio Webpage — Design Specification

## Objective

Build a modern, premium, executive-level single-page web portfolio sourced **exclusively** from `Pramod_ITExpert_UseCases.docx`. Audience: CTOs, CIOs, IT leaders, architects, senior technology experts. The page must make the most important achievements scannable within 30 seconds and frame every major initiative as **what I did → how I did it → measurable outcome**.

## Hard content rule

Use only facts present in the source document. Do not invent achievements, metrics, technologies, clients, employers, job titles, dates, or experience. Where the document labels a number as estimated, the page must preserve that qualifier. Identity is limited to the name "Pramod Sultane" and the framing "IT Expert Application"; no invented job title.

## Navigation model

Full-screen panel deck: exactly one section fills the viewport at a time.

- Next / previous arrow buttons, fixed and always reachable.
- Keyboard `ArrowRight` / `ArrowLeft` / `PageDown` / `PageUp` / `Home` / `End`.
- Dot rail indicating current panel, clickable to jump.
- Thin top progress bar showing position through the deck.
- URL hash synchronises with the active panel (`#impact`), and a direct load of a hash opens that panel.
- Panels whose content exceeds the viewport scroll internally; arrows and rail never scroll away.
- Touch swipe left/right on mobile.
- First and last panels disable the previous and next arrows respectively.

## Design system

- Dark-first theme with a light-mode toggle, persisted in `localStorage` under key `portfolio-theme`, defaulting to dark.
- All colours defined as CSS custom properties on `:root` and overridden under `[data-theme="light"]`.
- Palette roles: deep slate canvas, elevated panel surface, cyan primary accent, amber for in-progress, coral for risk/critical, mint for complete/done, muted grey for secondary text.
- Typography: system font stack (`Inter` if available, then `-apple-system`, `Segoe UI`, `Roboto`, `sans-serif`). Strong hierarchy — oversized section titles, small uppercase kickers with letter-spacing, generous line-height on body copy.
- Layout: cards, metric tiles, comparison tables, timelines, and charts. Consistent max content width, generous whitespace.
- Charts and diagrams are hand-rolled with CSS and inline SVG. No CDN, no chart library, no build step.
- Motion is limited to panel cross-fade and subtle hover elevation. No parallax, no autoplay, no decorative stock imagery.
- Responsive: desktop, tablet, and mobile. Multi-column grids collapse to single column; tables become stacked key/value cards below the mobile breakpoint.
- Accessibility: semantic landmarks, visible focus rings, `aria-label` on icon-only controls, `aria-current` on the active dot, contrast meeting WCAG AA, and `prefers-reduced-motion` honoured.

## Panels

### 1. Hero
Name "Pramod Sultane", kicker "IT Expert Application", and a headline positioning line derived from the document's themes. Headline metric strip: 4 use cases in the portfolio, 9 AI GitLab CI components delivered, 6 operational runbooks, ~522 people reached. Links to blog (`https://pramodsultane.qzz.io/`) and GitHub (`https://github.com/pramodsultane`).

### 2. Impact at a glance
Metric tiles plus the source summary table rendered as status cards: RAG-Based Chatbot for Technical Docs Pages (Completed, "Already in use and built on internal docs corpus", Accelerate / GenAI for SDLC); AI-Powered Reusable GitLab CI Components (Completed, "AI-assisted GitLab pipeline created as a part of Shared CI-CD", GenAI for SDLC); Transform ENGAGE DevOps Culture & Tooling (Ongoing, "DevOps Assessment done; tooling gaps identified; Implementation in progress", Accelerate); GitHub Copilot Memory to Save Token Costs (Ongoing, "Exploring technical feasibility to reduce repeated token usage across Copilot sessions", GenAI for SDLC).

### 3. RAG documentation chatbot
What → how → outcome treatment. Description: AI-powered chatbot for the CORTEX Technical Platform Docusaurus documentation site (docs.tid.michelin.com) using Retrieval-Augmented Generation over the organisation's living documentation. Quantified benefits table across five personas: Developers ~1 hr/day saved; DevOps Engineers 20–30% MTTR reduction; New Joiners 30–40% faster ramp-up; Senior Engineers ~20 min/day reclaimed; Business Teams 50% reduction in ad-hoc requests — all labelled "estimated impact". Embedded system architecture and DevOps lifecycle integration diagrams. Delivery checklist of the seven complete deliverables: FAISS vector index, chat backend service, React chat widget, Kubernetes 2-replica HA deployment, GitLab CI/CD pipeline, smoke tests, local development script. Future enhancements grouped as Multi-Repository Intelligence, Advanced RAG Capabilities, and Monitoring. Reference: GitLab MR `!215` (Cortex / TID / Apps / Pages).

### 4. Runbook assistant
Narrative on converting fragmented tribal knowledge into searchable, context-aware guidance that reduces MTTR and removes guesswork during outages. Six runbooks listed as cards: certificates generation/renewal/installation, database outage, Kubernetes deployment rollback, high CPU, Keycloak issues, on-call escalation.

### 5. AI-powered reusable GitLab CI components
Card grid of all nine components, each showing name, description, and primary benefit verbatim in substance: AI-Assisted MR Description Generation (saves 10–15 minutes per MR); AI-Assisted SonarQube Analysis; AI-Generated SonarQube Report Summaries; AI-Based Reviewer Assignment; AI-Driven Policy Compliance Checks; AI-Assisted README.md Generation; AI-Assisted Security MR Triage; AI-Driven Failed Pipeline Root Cause Analysis; AI-Assisted Infrastructure-as-Code Review. Planned next: AI-based Kubernetes cluster health assessment, AI-driven Grafana alert analysis and summarisation, AI-based MongoDB health assessment, AI-assisted backlog grooming and prioritisation. References: Shared CI-CD / AI GitLab repo and the Carbon components documentation page.

### 6. ENGAGE DevOps transformation
Assessment framing: ENE DevOps at Developing maturity, 32% / Level 2 of 5; foundational GitLab workflows and shared CI templates show pockets of excellence while security, secrets management, observability, and automated compliance are absent — a stated operational and business risk. Horizontal bar chart of the eight domains with actual/max and rating: Delivery Standards 14/30 47% Maturing; Code Quality Standards 6/15 40% Developing; Secrets Management 0/10 0% Beginner — CRITICAL; Testing Standards 4/10 40% Developing; Obsolescence / Dependency Management 0/10 0% Beginner — CRITICAL; Certificate Management 0/10 0% Beginner; Security & Compliance 3/15 20% Beginner — HIGH RISK; Reusability & Standardization 8/10 80% Advanced; total 35/110 32% Developing. Critical and high-risk domains render in coral, the advanced domain in mint. Embedded AS-IS and TO-BE diagrams with the document's framing that AS-IS came from combined repository-level analysis and the ENE DevOps organizational assessment checklist, and TO-BE is a domain-by-domain comparison against the target enterprise architecture. Current progress markers: HashiCorp Vault integration Done; Certificate Management in progress; SonarQube Quality Gates in progress. Reference: `https://devops-maturity-assessment-portal.pages.dev/`.

### 7. Knowledge transmission & reach
Coaching: implemented DevOps standards in GitLab CI and Kubernetes for the EC/ENGAGE team (2026). Publications: Cloud & DevOps Engineering blog (2026). Teaching: 4 DevOps sessions under the Michelin M2M programme (2025). Professional memberships: External Project Examiner at COEP Pune; DevOps trainer at MIT Academy of Engineering, Pune. Influence on decisions outside the entity (2025, 2026, BS/EC/ENGAGE): Grafana dashboard for CRMA EU ASD data pipeline monitoring; Seismic application upgrade and deployment via Microsoft Intune; DevOps maturity assessment for GitLab and GitHub repos; DevOps support for the Squalex AI Portal (Michelin legal AI assistant). Chronological delivery timeline of the eleven dated sessions with audience sizes, plus recognitions: LinkedIn Top Voice in Cloud Computing (2025); 2nd position in the DOTI Pune Waste Walk Contest for automating repetitive user tasks (2024); DevOps career guidance to engineering students (05/2024); support to the Pune SMI team implementing DevOps standards in GitLab and Kubernetes (02/2026). Audience reach is presented as approximate because the source counts are estimates.

### 8. Continuous learning & credentials
Network animation: leading the Pune DevOps Community of Practice (2026). Conferences: AWS Community Days Pune (09/2023, 08/2024, 08/2025, 03/2026); Gartner Security & Risk Management Summit (03/2026); AWS Summit Mumbai (28/05/2026); MongoDB Local Mumbai (18/09/2025); OpenText Tech Horoscope 2026 (22–23/05/2026). Credentials: AZ-104 Microsoft Certified Azure Administrator Associate (2025); Anthropic Certificates (2026). Reading (2026): The AI-Enabled SDLC, AI-Native Software Delivery, Prompt Engineering for Generative AI, AI Engineering. Training: personal GitHub projects; Michelin CTF participant (2023) and runner-up (2024); AWS Skills Builder and GO1 (2023–2026); AI for Bharat programme via Hack2Skill (2026); continuous learning via TechWorld with Nana, freeCodeCamp, and Hitesh Choudhary.

### 9. Leadership & influence
Network animation: started and hosts the Pune DevOps Community (2026). Roadmap and technical choice: added Drift Management for Terraform, Policy-as-Code for Terraform, and GitLab DevSecOps pipelines to the Technical Platform Roadmap 2026 (01/2026); introduced AI for SDLC on the roadmap and drove AI initiatives across multiple BS/EC teams (03/2026); authored the Keycloak SLI/SLO document, built a Grafana dashboard for KPI tracking, and enabled automatic incident creation on service unavailability (2025). Other: designed the EC SmartEC Hackathon portal (2026). Budget influence (2026): N8n workflow for MongoDB budget threshold alerts; identified and decommissioned unused Azure MySQL servers. Organisation and ways of working: active in the interview and hiring process, assessing lateral candidates for DevOps roles. Closing link list: blog, GitHub, maturity assessment portal, SmartEC hackathon portal.

## Derived figures and their basis

- **~522 people reached** = 20 + 30 + 20 + 30 + 200 + 12 + 50 + 10 + 50 + 70 + 30 across the eleven dated 2025–2026 sessions. Always rendered with the "~" qualifier.
- **11 sessions** = count of dated trainings and presentations in the Solicitation section.
- **9 AI GitLab CI components** = row count of the components table.
- **6 runbooks** = count of currently available runbooks.
- **4 use cases** = row count of the summary table (2 Completed, 2 Ongoing).
- **35 / 110 and 32%** = the assessment total as stated.

No other aggregate may be introduced.

## File structure

```
portfolio/
  index.html               markup shell, panel containers, nav controls
  assets/css/styles.css    theme tokens, layout, components, responsive rules
  assets/js/data.js        all page content as structured data, single source of truth
  assets/js/app.js         panel rendering, navigation, theme toggle
  assets/img/              four diagrams extracted from the docx, web-optimised
```

`data.js` holds content only; `app.js` holds behaviour only; neither hard-codes strings belonging to the other.

## Image handling

Extract `word/media/image1..4.png` from the docx. Resize to a maximum width of 1600px and compress so each file is comfortably under 500 KB while remaining legible. Map them to their document positions: system architecture diagram, DevOps lifecycle integration diagram, AS-IS landscape, TO-BE architecture. Each diagram is click-to-enlarge in a lightbox with a caption and descriptive `alt` text.

## Validation

- Page opens directly from the filesystem with no server and no network access; no external requests.
- All nine panels render; arrows, keyboard, dots, hash routing, and swipe all move between them correctly.
- Theme toggle switches both ways and survives reload.
- No horizontal overflow at 1440px, 1024px, 768px, and 375px widths.
- Every number displayed is traceable to the document or to the derived-figures list above.
- Console is free of errors.
