# Timed Presentation Script: IT Expert Application

**Total: 40 minutes**
- **Block A (30 min):** pages 02, 03, 04
- **Block B (10 min):** pages 05, 06, 07

Page numbers match the counter at the bottom of the deck (`01 / 07`). Page 01 (Overview) is covered by the opener.

Every number in this script comes from `assets/js/data.js`. Estimates are labelled as estimates.

---

## Running order at a glance

| Time | Page | Topic | Minutes |
|---|---|---|---|
| 0:00 | 01 | Opener (bridge into the deck) | 1 |
| 0:01 | 02 | Keycloak migration | 8 |
| 0:09 | 03 | RAG chatbot | 8 |
| 0:17 | 04 | DevOps maturity (ENGAGE) | 12 |
| 0:29 | | Bridge to Block B | 1 |
| 0:30 | 05 | Knowledge & reach | 3 |
| 0:33 | 06 | Learning | 2 |
| 0:35 | 07 | Leadership & influence | 4 |
| 0:39 | | Close and asks | 1 |

**Checkpoints:** be starting the chatbot by 0:09, the maturity section by 0:17, and Block B by 0:30. If you are running late, use the "cut if short" lines marked with ✂.

---

# BLOCK A: 30 minutes

## Opener (1 min)

**Say:**
> "I'll cover three things today. First, a platform modernisation: moving our Keycloak login service off end-of-life software. Second, a GenAI assistant that is already in production for developers. Third, the DevOps maturity of the ENGAGE teams, where we are strong, where we are exposed, and what I need from you. After that, I'll show how I'm spreading this knowledge and what I'm doing with it."

---

## Page 02: Keycloak migration from WildFly to Quarkus (8 min)

**Goal:** the audience understands that we moved a critical login service to supported software without breaking any application.

### 1. What it is (1 min)

**Say:**
> "Keycloak is the login and identity service. Many applications depend on it. It was running on WildFly, a runtime that is reaching end of support. I re-platformed the production Keycloak to the Quarkus distribution. I rebuilt the container image, remapped the full configuration, and updated the existing deployment."

**Analogy:**
> "It's like replacing a car's engine while keeping the steering wheel where it is, so the driver doesn't have to relearn anything."

### 2. Why now (1 min)

**Say:**
> "Staying on WildFly means no vendor support path. Quarkus is the supported route, and it also starts faster and uses less memory."

**Background only:** the page's Why now line states that WildFly was dropped from Keycloak v17 onward. Use this as background, not as a measured result.

### 3. The results (2 min)

**Show the four numbers, then say them out loud:**

| Measure | Before (WildFly) | After (Quarkus) |
|---|---|---|
| Cold start | ~60-90 s | ~5-10 s |
| Container image | ~700 MB | ~250 MB |
| Idle memory | ~800 MB | ~350 MB |
| Environment variables | 20 affected: 13 renamed, 2 removed, 5 new | |

**Say:**
> "Pods restart and scale out far sooner on Kubernetes. The image is about a third of the size."

**Be honest:**
> "These performance figures are approximate and were reported from team testing. We have not independently measured them in this deck."

### 4. The key decision: nothing breaks for clients (2 min)

**Say:**
> "The biggest risk was changing the default path from /auth to /. That would have broken every OIDC client, redirect URI, ingress rule and health check. We kept /auth by setting the path at image build time. So existing applications needed no changes."

**Risks we managed:**

| Risk | How we handled it |
|---|---|
| Client outage from the path change | Kept /auth. Any root-path move is deferred to a coordinated client migration. |
| Silent misconfiguration | Build-time options are baked into the image. Environment variables are validated first. |
| Loss of session replication | Replaced the old cache-owner settings with an explicit Infinispan configuration (2 owners for sessions). |
| Redirect failures in lower environments | Set the hostname everywhere. Relaxed the strict check only outside production. |

### 5. How we did it (1 min)

**Say:**
> "We followed five phases: assess every environment variable, rebuild the image, remap the configuration, set up clustering and the cache, then validate and cut over. The validation covered OIDC discovery, client integration tests, health checks and dashboards."

**Note:** Calendar dates and durations for the migration are not stated in the source. Do not give a timeline unless you have one.

### 6. Summary line (1 min)

**Say:**
> "Keycloak now runs on supported software, starts in seconds, and no application had to change. That's the outcome I wanted: a modernisation that the rest of the platform doesn't feel."

> ✂ **If short on time:** skip step 5 and keep steps 1, 3 and 4.

---

## Page 03: RAG chatbot for technical documentation (8 min)

**Goal:** the audience understands what RAG is, that it is live, and what the early evidence says, including its limits.

### 1. What it is, in plain language (1 min)

**Say:**
> "RAG stands for retrieval-augmented generation. In plain terms, the assistant first looks up our real documentation, then writes an answer and points to the source. It's a search that answers in full sentences, instead of guessing from memory."

**Say:**
> "It runs on the CORTEX Technical Platform documentation. Developers ask a question in a chat widget on the docs site and get an answer built from the indexed Markdown."

### 2. Status: live in production (1 min)

**Say:**
> "It went live in April 2026. Every deliverable on the roadmap is done: the vector index, the chat backend, the React chat widget, a two-replica Kubernetes deployment for high availability, the GitLab CI/CD pipeline, the smoke tests, and a local development script."

> "Two replicas means a second copy keeps the service up if one fails."

### 3. The evidence so far (2 min)

**Show the four numbers, then say them with their meaning:**

| Number | What it means |
|---|---|
| Apr 2026 | Production go-live |
| ~100 unique users | Reported usage to date (approximate) |
| ~20 queries per day | Reported volume (approximate) |
| 4.50 / 5 | Average satisfaction, from 14 survey responses out of 30 invitees |

**Say:**
> "The satisfaction score is positive, but the sample is small: 14 responses. I'd rather tell you that than overstate it."

**Quote to use (from a real user):**
> "Searching any specific data on docs is now easy and time saving."

**Impact in one line:**
> "Fewer repeated questions, faster onboarding, and six operational runbooks that are now searchable."

### 4. What we have not proven yet (2 min)

**Say:**
> "Two things are not measured yet. The first is time saved: the estimate is about 20 to 30 percent less time searching, but we have not instrumented it. The second is answer quality. Users have asked for reference links, which we are adding."

**Also say:**
> "Recovery time for incidents is not measured either. The runbooks help people find procedures faster, but this is a knowledge-access improvement, not a measured recovery improvement."

**Do not say** that the chatbot has reduced incident recovery time by a specific percentage. The page does not support that claim.

### 5. Next steps (1.5 min)

**Say:**
> "Three priorities. First, measure: track usage, answer quality, feedback and unanswered questions. Second, governance: name documentation owners, add freshness checks, and set up a support model. Third, coverage: expand to approved GitLab repositories, Confluence and wikis, while respecting access permissions. Unanswered questions will also show us which documentation gaps to fix first."

### 6. Summary line (0.5 min)

**Say:**
> "The assistant works and people use it. The next step is to measure it properly so we know its real value."

> ✂ **If short on time:** skip step 2 and step 5. Keep the evidence and "what we have not proven yet."

---

## Page 04: Transforming ENGAGE DevOps culture and tooling (12 min)

**Goal:** the audience understands the maturity score, where the risks are, and what is being done. This is the most important section in Block A.

### 1. The score and what it means (2 min)

**Say:**
> "We assessed three ENGAGE teams and more than 20 repositories against a five-level maturity model. We scored 35 out of 110 points. That's 32 percent, rated 'Developing', at Level 2 of 5. The target is 80 percent, with every area at 80 percent or more, by the end of Q4 2027."

**Scope note:**
> "This is a sample of three teams, not the whole organisation."

**Show the scale on one slide:** Beginner, Developing, Maturing, Advanced.

### 2. Where we are strong (1 min)

**Say:**
> "Reusability and standardisation is our strongest area at 8 out of 10, rated Advanced. Delivery standards are Maturing at 14 out of 30. Branch protection, merge request standards, quality gates, mandatory pipeline success and Vault are now enforced across every pipeline."

### 3. Where we are exposed (2 min)

**Show the table:**

| Area | Score | Rating |
|---|---|---|
| Secrets management | 0 / 10 | Beginner, CRITICAL |
| Obsolescence and dependency management | 0 / 10 | Beginner, CRITICAL |
| Certificate management | 0 / 10 | Beginner |
| Security and compliance | 3 / 15 | Beginner, HIGH RISK |
| Code quality standards | 6 / 15 | Developing |
| Testing standards | 4 / 10 | Developing |

**Say:**
> "The zeros are where the risk sits. Secrets, dependencies and certificates are at zero. Security scanning is effectively absent. Those are the areas I'd focus on first."

### 4. The four risks that matter most (4 min)

Take these one at a time. Each has a number, a plain-language risk and a response.

**Risk 1: A private key in Git history (Critical)**
> "A private key is stored in plain text in our Salesforce ENGAGE repository, and it is reachable in Git history. We have to treat it as compromised. It has not been rotated yet. The response is to rotate or revoke it now, purge it from history using the documented procedure, move secrets to Vault, and scan every push for secrets."

**Risk 2: Python 3.10 reaches end of life this month**
> "Python 3.10 reaches end of life in October 2026, and we have no migration plan yet. Dependencies are updated by hand, so upgrades arrive as deadlines. The response is to plan and schedule the Python 3.12 migration now, then automate updates with Renovate and blocking dependency scans."

**Risk 3: Releases and incidents are slow, and we can't measure either**
> "A monthly production release takes about one day. That's an estimate. The target is one to two hours. An incident takes about two to three days to resolve. That's also an estimate. The target is about four hours. We have no DORA baseline, so we cannot measure real recovery time. The response is to automate rollback with a fast-track hotfix path, write runbooks, and set a DORA baseline that includes MTTR."

> **Define it:** "DORA is four industry metrics for delivery speed and reliability. MTTR is the mean time to recover after an incident."

**Risk 4: No visibility once code is live (0 / 5)**
> "We have no dashboards, no alerting and no central logging. That means problems are found late, possibly by users. The response is to roll out Prometheus, Grafana and alerting, with runbook links, plus centralised logging."

> ✂ **If short on time:** keep Risk 1 and Risk 2. Mention Risks 3 and 4 in one sentence each.

### 5. Progress: what is done and what is open (1.5 min)

**Show the progress count:** 16 items. 8 done, 5 in progress, 3 not started.

**Done (examples):** GitLab workflow, branch protection, merge request standards, binary repository in JFrog, SonarQube integration, quality gate enforcement, mandatory pipeline success, Vault in CI/CD.

**In progress:** Renovate bot for automated merge requests, ACME certificate automation and monitoring, GitLab approval policies, shared CI/CD jobs, pipeline with standards.

**Not started:** GitOps with ArgoCD, Grafana observability, AI in SDLC.

**Say:**
> "The early wins are done. The open items are mostly tools we have not rolled out yet. That's good news, because rolling out shared templates is cheaper than building from scratch."

### 6. Scale-out and the Salesforce repository (1 min)

**Say:**
> "Vault is already in every pipeline. The same shared-template rollout can deliver security scanning, Renovate and GitOps. The maturity portal I built can be offered to other teams as a standard self-assessment."

**Salesforce repository, in one line:**
> "The Salesforce ENGAGE repository is 4.6 GB, mostly from committed binaries, has 1,625 remote branches with no cleanup policy, and has no README for new joiners. We're moving binaries to artifact storage and adding a branch policy."

### 7. Closing the section (0.5 min)

**Say:**
> "This is an honest baseline. The target is ambitious but achievable if we roll out the shared templates first. The security items should come first, not last."

> **Be honest:** release and incident times are estimates. There is no DORA baseline yet.

---

## Bridge to Block B (1 min)

**Say:**
> "That covers the platform, the assistant, and the maturity work. Next I'll show how I'm spreading this knowledge across the organisation, what I'm learning, and where I've influenced the roadmap and budget."

---

# BLOCK B: 10 minutes

## Page 05: Scaling expertise beyond myself (3 min)

**Goal:** expertise that is shared is less risky. Show reach and influence.

### 1. Reach (1 min)

**Say:**
> "I've run 11 sessions across 2025 and 2026, reaching about 522 attendances. That's attendances across sessions, not unique people. The biggest single session was 200 people: end-to-end monitoring with Grafana for the DOTI TECH monthly."

**Show the session types:**
- Trainings in the Michelin M2M programme on DevOps in Action: Introduction, Git, Terraform, Docker, and Kubernetes for DevOps.
- Presentations to DOTI leaders, the Pune DevOps Community, and the Pune DOTI team.

**Say:**
> "Recent presentations cover AI topics: how LLMs work and how to choose one (06/2026), and a show and tell on the documentation chatbot (08/2026)."

### 2. Influence beyond my own entity (1.5 min)

**Say:**
> "Here is where my work influenced decisions outside my own entity:"

- Built a Grafana dashboard for CRMA EU ASD data pipeline monitoring.
- Upgraded and deployed Seismic applications through Microsoft Intune.
- Ran a DevOps maturity assessment for GitLab and GitHub repositories.
- Gave DevOps support to the Squalex AI Portal, Michelin's legal AI assistant.

### 3. Why it matters (0.5 min)

**Say:**
> "Expertise that lives in one person is a risk. Teaching it is how we reduce that risk. This is also how the DevOps standards reach other teams, such as the Pune SMI team that implemented them in GitLab and Kubernetes in 2026."

> ✂ **If short on time:** keep the reach numbers and the "why it matters" line. Skip the list.

---

## Page 06: Staying at the technical frontier (2 min)

**Goal:** show continuous learning and community leadership, briefly.

**Say:**
> "I lead the Pune DevOps Community of Practice, which I started and host in 2026. Learning is part of the job. Here are the milestones:"

| Area | Status |
|---|---|
| Kubestronaut path (a recognition for completing a set of Kubernetes certifications) | KCNA done (08/2026). CKA done (10/2026). CKAD in progress. KCSA and CKS planned. |
| Cloud certification | AZ-104 Azure Administrator Associate (2025) |
| AI programme | Completed AI for Bharat (Hack2Skill, 2026) |
| Reading | Four 2026 O'Reilly titles on AI-enabled delivery and engineering |

**The AI components, in one line:**
> "We built ten GitHub Copilot-powered CI/CD components for GitLab. They are published on Carbon Pages as part of Shared CI Jobs. Examples are merge request summaries, Sonar analysis, failed-pipeline root-cause analysis, IaC review and security merge request triage."

> **Count note:** the webpage says ten in both the hero and the Learning section. Confirm the count on the Carbon catalogue before presenting.

> ✂ **If short on time:** skip the table. Keep the community lead line and the AI components line.

---

## Page 07: Influence on roadmap, budget and organisation (4 min)

**Goal:** influence is not only building things. It's getting them onto the roadmap and the budget, and shaping the team.

### 1. Roadmap (1.5 min)

**Show the timeline:**

| When | What changed |
|---|---|
| 2025 | Keycloak reliability: authored the SLI/SLO document, built a Grafana dashboard for KPI tracking, and enabled automatic incident creation on service unavailability. |
| 01/2026 | Added Terraform drift management, Terraform policy-as-code and GitLab DevSecOps pipelines to the Technical Platform Roadmap 2026. |
| 03/2026 | Introduced AI for SDLC on the roadmap and drove AI initiatives across several BS and EC teams. |

**Say:**
> "SLI and SLO are a way of saying what we measure (the indicator) and what we promise (the objective). The Keycloak work turned reliability into measured targets."

### 2. Budget (1 min)

**Say:**
> "On budget, I built an n8n workflow that sends alerts when MongoDB spend crosses thresholds. I also found and decommissioned unused Azure MySQL servers. Both are about spending less on things nobody needs."

### 3. Organisation (1 min)

**Say:**
> "I'm involved in interviewing and assessing lateral candidates for DevOps roles. I designed the portal for the EC SmartEC Hackathon in 2026."

### 4. Close of the influence section (0.5 min)

**Say:**
> "That's influence on what we build, what we spend and who we hire."

> ✂ **If short on time:** keep the roadmap timeline. Mention budget and organisation in one sentence.

---

## Close and asks (1 min)

**Say:**
> "Here's what I'm asking for, based on today's content."

1. **Schedule the Python 3.12 migration now.** The 3.10 end-of-life date is this month.
2. **Mandate secret clean-up:** rotate the exposed key, purge it from Git history, and make secret scanning mandatory.
3. **Back shared CI/CD templates in every pipeline,** with security scans that block merges on critical findings.
4. **Approve a DORA baseline and observability** so recovery time is measured, not estimated.
5. **Support chatbot governance:** documentation owners, usage and quality measurement, and access-controlled expansion.
6. **Endorse the maturity portal** as a standard self-assessment for other teams.

**Final line:**
> "Community leadership, cross-team influence, and production-grade AI and DevOps delivery. The next step is to turn these early wins into standards every team uses."

---

## Appendix: terms to define if asked

| Term | Plain meaning |
|---|---|
| RAG | The AI looks up real documents before it answers. |
| Keycloak | The login and identity service that applications use. |
| OIDC | The standard protocol apps use to sign users in. |
| WildFly / Quarkus | The old and new Java runtimes that run Keycloak. |
| Replicas / HA | Copies of a service. High availability means it stays up if one copy fails. |
| CI/CD | Automated steps that build, test and deploy code. |
| GitOps | Deploying by reviewing changes in Git, not by manual commands. |
| Vault | A secure store for passwords and keys. |
| SAST / secret scanning | Automated checks for security flaws or exposed secrets. |
| Renovate | A bot that proposes dependency updates. |
| EOL | End of life: the date after which a version gets no more updates. |
| DORA | Four industry metrics for delivery speed and reliability. |
| MTTR | Mean time to recover after an incident. |
| SLI / SLO | What is measured / the target it's measured against. |
