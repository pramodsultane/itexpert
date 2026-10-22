# Speaker Notes: IT Expert Application (Tech Leadership Briefing)

Source: `index.html` and `assets/js/data.js` (every number below comes from that content).
Suggested length: **15 minutes plus Q&A.**

---

## 0. Fix or prepare before presenting

| # | Issue on the page | What to do |
|---|---|---|
| 1 | The webpage now says **"ten"** AI GitLab CI components in both the hero and the Learning section. | Confirm the count on the Carbon catalogue before presenting. |
| 2 | Chatbot shows **"~25-40% lower MTTR"**. The page itself says this is **not instrumented**. | Say "estimated" and never present it as a result. |
| 3 | **"522 people"** counts attendances across 11 sessions, not unique people. One session (200 people) is about 38% of that total. | Say "reach" or "attendances", not "people trained". |
| 4 | Chatbot satisfaction **4.50 / 5** comes from **14 responses** (14 of 30 invitees). | State the sample size when you quote the score. |
| 5 | Many figures are **estimates** (release time, incident time, queries per day, Keycloak performance). | Label them as estimates when you say them. Leadership trusts honest labels more than precise-sounding numbers. |

---

## 1. Opening (1 min)

**Say:**
> "Over the last period I worked on three things that matter to us: making engineers faster with GenAI, modernising a critical identity platform, and raising DevOps maturity across the ENGAGE teams. I also passed that knowledge on to over 500 attendances. Today I'll show what we built, what it changed, what is still open, and three to six decisions where I need your support."

**Core message (repeat it at the end):**
> "We are not only building tools. We make delivery safer and faster, and we make the knowledge stick across teams."

---

## 2. Overview: three pillars (1 min)

| Pillar | One-line meaning |
|---|---|
| **GenAI for SDLC** | AI that helps people build and deliver software (a documentation chatbot and GitLab CI components). |
| **Delivery acceleration** | Measuring how well we deliver software and removing the blockers. |
| **Capability building** | Teaching others so the knowledge does not live in one person. |

---

## 3. RAG chatbot for technical documentation (2 min)

**Plain explanation:**
> "RAG means the assistant first looks up our real documentation, then writes the answer and points to the source. It is a smart search that answers in full sentences, instead of guessing."

**Say:**
> "It has been live in production since April 2026 on the CORTEX documentation site. Developers ask a question and get an answer from our own docs, with references."

**Key numbers and what they mean:**

| Number | Meaning |
|---|---|
| Apr 2026 | Production go-live |
| ~100 unique users | Reported usage to date (approximate) |
| ~20 queries a day | Reported volume (approximate) |
| 4.50 / 5 | Average satisfaction, from 14 survey responses |
| 7 of 7 | Roadmap deliverables done (vector index, backend, React widget, Kubernetes HA, CI/CD, smoke tests, local dev script) |
| 2 replicas | High availability: a second copy keeps running if one fails |

**Impact in one sentence:**
> "Fewer repeated questions, faster onboarding, and six operational runbooks that are now searchable."

**Quote to use (from a real user):**
> "Searching any specific data on docs is now easy and time saving."

**Be honest about:** The time-saving estimates (20-30% less searching) are **not instrumented**.

**If asked "Is it accurate?":**
> "Satisfaction is 4.50 out of 5. Users asked for reference links, which we are adding. Next we will measure answer quality, not just satisfaction."

**Next step:** Track usage, answer quality and unanswered questions. Assign documentation owners. Expand to approved GitLab repos and Confluence, respecting access permissions.

---

## 4. Keycloak migration: WildFly to Quarkus (2 min)

**Plain explanation:**
> "Keycloak is the login service that many applications depend on. It ran on old software that is reaching end of support. We moved it to the modern Quarkus version without breaking any application."

**Analogy:**
> "It is like replacing a car's engine while keeping the steering wheel where it is, so the driver does not have to relearn anything."

**Before and after:**

| Measure | Before (WildFly) | After (Quarkus) |
|---|---|---|
| Cold start | ~60-90 s | ~5-10 s |
| Container image | ~700 MB | ~250 MB |
| Idle memory | ~800 MB | ~350 MB |

**Key achievement:**
> "We kept the `/auth` path, so no client application had to change its redirect URIs or OIDC endpoints."

**Risks we avoided:** an outage from the path change, silent misconfiguration, and loss of session replication.

**Why it matters for leadership:**
> "Faster restarts and scale-out on Kubernetes, and we are off end-of-life software."

**Be honest about:** Performance figures are approximate, reported from team testing in the source article. They were not independently measured in this deck. Calendar dates and durations for the migration are not stated.

---

## 5. DevOps maturity: ENGAGE transformation (4 min, the core section)

**Plain explanation of the score:**
> "We scored our DevOps practices on five levels. We currently score **32%** (35 of 110 points), which is **Level 2 of 5, 'Developing'**. Our target is **80%** with every area at 80% or more, by end of Q4 2027."

**Scope:** 3 ENGAGE teams and 20+ repositories. This is a sample, not the whole organisation.

**Where we are strong:**
- Reusability and standardisation: **8/10 (Advanced)**
- Delivery standards: 14/30 (Maturing)
- Branch protection, quality gates and Vault are now in place across every pipeline.

**Where we are exposed (score of 0 or close to it):**

| Area | Score | Why it matters |
|---|---|---|
| Secrets management | 0/10 (Critical) | A private key was committed to Git and **has not yet been rotated**. |
| Obsolescence / dependency management | 0/10 (Critical) | Dependencies are updated by hand. |
| Certificate management | 0/10 | No automated certificate lifecycle. |
| Security and compliance | 3/15 (High risk) | No SAST, container, dependency, licence or secret scanning. |

**Progress (16 items):** 8 done, 5 in progress, 3 not started.
- Not started: GitOps (ArgoCD), Grafana observability, AI in SDLC.

**The four to six business problems (say these in plain words):**

| Problem | Number on the page | What we will do |
|---|---|---|
| Releases are manual | ~1 day per monthly release (estimate). Target: 1-2 h. | Finish shared CI/CD templates, then automate production promotion with an audit trail. |
| Incidents are slow and unmeasured | 2-3 days per incident (estimate). Target: about 4 h. | Automate rollback, write runbooks, and set a DORA baseline that includes recovery time. |
| Secrets sit in Git | RSA private key in Git history, not rotated | Rotate or revoke the key now, purge it from history, move secrets to Vault, and scan every push. |
| Python 3.10 reaches end of life | October 2026, no migration plan yet | Plan and schedule the Python 3.12 migration now. |
| No visibility once code is live | 0/5 for monitoring, logging and observability | Roll out Prometheus, Grafana and alerting with runbook links. |
| Images are not signed | No provenance attestation | Sign images and attach provenance in the pipeline. |

**Glossary for this slide:**
- **DORA**: four industry metrics for delivery speed and reliability.
- **MTTR**: mean time to recover, meaning how long it takes to restore service after an incident.

**Salesforce ENGAGE repository (same section, separate analysis):**
- 4.6 GB repository, mostly committed binaries (videos, images, .jar files).
- 1,625 remote branches with no cleanup policy.
- No README, CONTRIBUTING or ADR files for new joiners.
- 176K tracked files, which makes reviews noisy.

**Scale-out message:**
> "Vault is already in every pipeline, so the same shared-template rollout can deliver security scanning, automated dependency updates (Renovate) and GitOps. The maturity portal I built can be offered to other teams as a standard self-assessment."

**If asked "Why only 32%?":**
> "This is an honest baseline. The early wins are done. The remaining gaps are mostly tooling we have not rolled out yet, and the plan to close them is on the slide."

**Be honest about:** Release and incident times are estimates. There is no DORA baseline yet, so we cannot yet measure real recovery time.

---

## 6. Knowledge transfer and reach (1 min)

**Plain point:**
> "Expertise that lives in one person is a risk. Teaching it is how we reduce that risk."

**Numbers:**
- 11 sessions across 2025 and 2026, about **522 attendances**.
- Largest single session: 200 people (End-to-End Monitoring with Grafana, DOTI TECH Monthly).
- 4 DevOps sessions in the Michelin M2M programme (2025).

**Influence beyond my own team:**
- Grafana dashboard for CRMA EU ASD data pipeline monitoring.
- Seismic applications upgraded and deployed through Microsoft Intune.
- DevOps maturity assessment for GitLab and GitHub repositories.
- DevOps support for the Squalex AI Portal (Michelin legal AI assistant).

**Recognition (use one or two, not all):** Certified GenAI Local Champion (09/2026), and recognised by LinkedIn as a Top Voice in Cloud Computing (2025).

---

## 7. Learning and staying current (30 sec)

- **Leading the Pune DevOps Community of Practice** (2026).
- **Kubestronaut path** (a Cloud Native Computing Foundation recognition for completing a set of Kubernetes certifications):
  - Done: KCNA (08/2026), CKA (10/2026)
  - In progress: CKAD
  - Planned: KCSA, CKS
- **AI components for GitLab CI:** ten GitHub Copilot-powered components, available as part of Shared CI Jobs on Carbon. (See the count issue in section 0.)

---

## 8. Leadership and influence on roadmap, budget and organisation (1.5 min)

**Plain point:**
> "Influence means getting things onto the roadmap and the budget, not only building them."

| When | What changed |
|---|---|
| 2025 | Authored the Keycloak SLI/SLO document, built a Grafana KPI dashboard, and enabled automatic incident creation on service unavailability. |
| 01/2026 | Added Terraform drift management, Terraform policy-as-code, and GitLab DevSecOps pipelines to the Technical Platform Roadmap 2026. |
| 03/2026 | Introduced AI for SDLC on the roadmap and drove AI initiatives across several BS and EC teams. |

**Budget (2026):**
- Built an n8n workflow for MongoDB budget threshold alerts.
- Identified and decommissioned unused Azure MySQL servers.

**Organisation and ways of working:**
- Interviewed and assessed lateral candidates for DevOps roles.
- Started and host the Pune DevOps Community (2026).
- Designed the portal for the EC SmartEC Hackathon (2026).

---

## 9. Decisions and support I am asking for (2 min)

These asks come from the "response" items on the page. Confirm them before the meeting.

1. **Schedule the Python 3.12 migration now.** The 3.10 end-of-life date is this month.
2. **Mandate secret clean-up:** rotate the exposed key, purge it from Git history, and make secret scanning mandatory.
3. **Back the shared CI/CD templates** in every pipeline, with security scans and blocking on critical findings.
4. **Approve a DORA baseline and observability** (Grafana, Prometheus, alerting), so we can measure recovery time instead of estimating it.
5. **Support chatbot governance:** documentation owners, usage and quality measurement, and expansion to other sources with access controls.
6. **Endorse the maturity portal** as a standard self-assessment for other teams.

**Close (repeat the core message):**
> "Community leadership, cross-team influence, and production-grade AI and DevOps delivery. The next step is to turn these early wins into standards every team uses."

---

## 10. Likely questions and answers

| Question | Answer |
|---|---|
| What is the return on investment (ROI)? | Time-savings figures are estimates and labelled that way. Next, we will instrument usage and answer quality, and set a DORA baseline. *(Cost figures are not on the page. Add them if you have them.)* |
| Is the chatbot accurate and safe? | Satisfaction is 4.50 / 5 from 14 responses. The current scope is the CORTEX documentation. Any wider scope will respect access permissions. |
| Are the Keycloak numbers verified? | They are approximate and reported from team testing in the source article. They were not independently measured. |
| What if Python 3.12 is not ready in time? | Today there is no migration plan, which is the risk. The ask is to schedule it now so the date is controlled. |
| Why do secrets still sit in Git? | A key was committed in the past. Vault is now in every pipeline. The remaining step is to rotate, purge and scan. |
| Who else can do this work? | Knowledge is shared through sessions, the Pune community, and reusable CI/CD components. We are reducing key-person dependency. |
| How does this scale beyond ENGAGE? | The Vault rollout pattern and the maturity portal can be reused by other teams. |

---

## 11. Glossary (for non-specialists)

| Term | Plain meaning |
|---|---|
| RAG | The AI looks up real documents before answering. |
| Vector index (FAISS) | A searchable map of document content, used by the chatbot. |
| CI/CD | Automated steps that build, test and deploy code. |
| Pipeline | One automated run of those steps. |
| GitOps | Deploying by reviewing changes in Git, not by manual commands. |
| Kubernetes / HA | The system that runs containers; HA means it stays up if one copy fails. |
| Helm | A way to package and configure Kubernetes applications. |
| Keycloak | The login and identity service. |
| OIDC | The standard protocol apps use to sign users in through Keycloak. |
| WildFly / Quarkus | Old and new Java runtimes that run the Keycloak service. |
| Vault | A secure store for passwords and keys. |
| SAST / secret scanning | Automated checks that find security flaws or exposed secrets in code. |
| Quality gate | A rule that blocks a change if code quality is too low. |
| Branch protection | A rule that stops direct changes to the main code branch. |
| Renovate | A bot that proposes dependency updates automatically. |
| EOL (end of life) | The date after which a software version gets no more updates. |
| DORA | Four industry metrics for delivery speed and reliability. |
| MTTR | Mean time to recover after an incident. |
| SLI / SLO | Service Level Indicator (what is measured) and Service Level Objective (the target). |
| Maturity level | A five-level scale of how well a practice is established. Ratings on the page run from Beginner, through Developing and Maturing, to Advanced. |
