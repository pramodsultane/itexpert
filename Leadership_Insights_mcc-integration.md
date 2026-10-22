# mcc-integration: Team Problems & Leadership Insights

**Source:** `DevOps_Maturity_Assessment_mcc-integration.docx` (group `sxf-dev-grp`)
**Analysis date:** 2026-09-30

## About the source data

- The source is a **DevOps maturity assessment of one repository**, built by inspecting its files. It is **not** an export of GitLab issues, incidents or service requests.
- The document says group-level practices "are inferred, not directly observed". MR history, pipeline analytics and branch protection "require GitLab API access to verify" (Doc §1.3).
- At least 12 statements are qualified as *likely / unknown / estimated / inferred / assumed*.
- Every time and cost figure (§5.1) is an **unsourced estimate**.
- Some things can't be determined from this document: waiting times, blockers, incident counts, real MTTR and key-person dependencies. They are marked **"Insufficient evidence"** or **"Not measurable from the provided data."** To confirm them, rerun this analysis with GitLab issues, MRs, pipelines and incident data for `sxf-dev-grp`.

**Labels:** **[F]** = stated in the document · **[I]** = inference · "§x" = section of the source document.

---

## 1. Executive Summary

**Overall health:** Maturity is roughly **Level 2 ("Managed")** on the document's 5-level scale [I]. The building blocks exist: unit tests, SonarQube, Kubernetes manifests for dev, uat and prod, and no secrets committed in code [F]. None of them is shown to be *enforced*, *standardised* or *measured* [F].

**Key message:** The team has the right tools but not the guardrails, automation or measurement. When something breaks, recovery is manual and depends on individuals.

### Top 5 problems leadership should know

Evidence, impact and root cause for each problem are in the Problem Register (§2).

| # | Problem | Severity | Recommended direction |
|---|---|---|---|
| 1 | No enforced DevOps standards and no standard automated CI/CD pipeline (P1) | High | Mandatory gates, branch protection, and a validated golden pipeline with protected environments |
| 2 | Incidents take a long time to resolve (P2) | High | Automated rollback and hotfix path, runbooks, monitoring and alerting |
| 3 | Delivery performance can't be seen (P3) | High | DORA baseline, including MTTR |
| 4 | Secrets handling unverified; no security scanning (P4) | High | Vault with a separate prod role; mandatory scans |
| 5 | Python 3.10 reaches end of life in October 2026 (P5) | High | Confirm and finish the migration; adopt Renovate |

---

## 2. Problem Register

| # | Problem | Evidence [F] | Root cause [I] | Impact and quantification | Category | Type | Severity |
|---|---|---|---|---|---|---|---|
| P1 | **No enforced DevOps standards; no standard automated CI/CD** | Tests and SonarQube not shown to gate MRs; no branching strategy (§2.1). "Few enforced rules" (§3.1). No `.gitlab-ci.yml` found; standardisation "unknown" (§2.2). Anti-patterns: bespoke pipelines, manual prod promotion with no audit trail, no enforced gates (§3.2). Approval tiers only proposed (§2.4). | Standards are optional; shared CI/CD not adopted; no group-level mandate | Defects can reach main and prod. A release takes 6 h (target 1–2 h). CI issues cost 4 h per developer per month (target 1 h). Audit exposure. Release count and team size unknown | Governance, Process, Automation, Tooling | Systemic: every MR and release | High |
| P2 | **Slow incident resolution** | 8 h per incident, target about 4 h (§5.1, est.). Limited observability (§9). No runbooks and no documented deploy or rollback steps (§2.1). Manual prod promotion (§3.2). | No enforced standards, no automated pipeline or rollback, no observability | Longer outages and user impact. Planned work interrupted. Depends on specific people. A rushed manual hotfix can cause a second failure. Incident count and real MTTR not measurable | Process, Automation, Infrastructure, Documentation | Systemic: every incident | High |
| P3 | **No delivery visibility** | No DORA baseline (§3.2). DORA values estimated (§1.2). Pipeline success "~80–90%" estimated (§2.2). No API or analytics access (§1.3). | Measurement never built into delivery | Can't prioritise work, prove ROI or track MTTR | Governance, Tooling | Systemic | High |
| P4 | **Secrets and security scanning** | Secrets mechanism not documented (§2.3). Secrets are "likely CI variables" (§3.1). Rotation is manual and quarterly (§5.1). No audit trail (§2.3). No SAST or container scanning (§2.3). The GitGuardian section (§4.5) is empty. *Positive:* no secrets in code. | No platform secrets pattern; scans not in the pipeline | A leaked credential stays valid until someone rotates it by hand. Vulnerabilities are found late. Audit gap | Security/Compliance, Automation | Recurring → systemic | High. The document says Critical, but exposure is unconfirmed |
| P5 | **Python 3.10 EOL and manual dependency updates** | EOL October 2026 (§6.1). The document, written April–May 2026, says "begin migration now". Dependencies are updated by hand (§3.1). | No automated process to keep runtime and dependencies current | Unsupported runtime from next month. Forced unplanned work. Vulnerability drift. Migration status unknown | Technology, Security | One-off deadline with a systemic cause | High. The document says Medium; raised because the deadline is weeks away |
| P6 | **Documentation gaps** | README is "likely minimal". No architecture overview or local-run instructions (§2.1). | No documentation standard | Slower onboarding; key-person risk | Documentation/Knowledge, Ownership | Systemic | Medium |
| P7 | **Defects in the reference pipeline** | §8 YAML (see detail below). The document itself warns "do not copy-paste". | Template not validated against the real catalog and infrastructure | Rework on adoption; risk of misconfigured prod secrets | Tooling, Governance | One-off, but spreads if copied | Medium |

**How severity was assigned:**
- **Critical:** confirmed exposure or outage. None is confirmed.
- **High:** affects every change, release or incident, or has a hard near-term deadline.
- **Medium:** indirect or contained.
- **Low:** cosmetic.

### P2 detail: a gap at every incident step

| Step | Gap [F] | Consequence [I] |
|---|---|---|
| Detect | Limited observability; Prometheus and Grafana only planned (§9) | Problems found late, possibly by users |
| Diagnose | No runbooks or architecture overview (§2.1) | Investigation depends on the people who know the system |
| Fix | Gates not enforced (§2.1, §3.2) | A hotfix gets no fast, trusted validation |
| Ship or roll back | Manual promotion; bespoke pipeline; no rollback steps or job (§2.1, §2.2, §3.2, §8) | No one-click return to the last known-good version |

### P7 detail: defects in the reference `.gitlab-ci.yml` (§8)

- `variables:` is declared twice. Either the YAML is rejected, or one block is lost (`VAULT_ADDR`, `IMAGE_TAG`, namespaces).
- The anchors `*vault_login`, `*fetch_app_secrets` and `*fetch_db_secrets` are used but never defined.
- The global Vault role is `tid-np-gitlab` with `VAULT_ENV: nonprod`, and `deploy:prod` never logs in with a separate role. This contradicts the comment "Production uses a separate, more restricted Vault role".
- Images use `:latest`, and the environment URLs are `example.com` placeholders.
- `--cov=src` doesn't match files at the repository root (`main.py`, `utils.py`, §1.3). The 80% coverage gate would likely fail [I].
- The test job runs in a Vault image, not a Python image [I].
- "2 approvals required" for prod is only a comment and is not enforced.

**Brief categories with no evidence:** blocked work, waiting time, handovers, repeated service requests, external-team problems, capacity and morale. All are **insufficient evidence**.

---

## 3. Root Cause Analysis (5-Why)

**A. Defects reach main and prod, and releases are slow and unaudited (P1)**
→ Tests, SonarQube and scans don't block merges, and prod promotion is manual [F].
→ They aren't mandatory stages or protection rules, and approval tiers are only proposed [F, §3.1, §2.4].
→ Each project writes its own pipeline [F, §3.2].
→ Shared CI/CD templates aren't adopted [F, "missing centralized pipeline patterns"].
→ No group-level policy makes them mandatory [I].
**Probable root cause:** a governance gap. Standards exist as options, not defaults.

**B. Incidents take a long time to resolve (P2)**
→ Detection and diagnosis are manual: limited observability, no runbooks [F, §9, §2.1].
→ The fix or rollback has to be shipped by hand [F, §3.2].
→ There is no standard automated pipeline with trusted gates and a rollback path [F, §2.2, §3.2].
→ No DevOps standards are imposed at group level [F, §3.1; I].
**Probable root cause:** no enforced standards and no automated CI/CD, so every recovery step depends on individuals.

**C. Secrets exposure and compliance risk (P4)**
→ Secrets are probably long-lived CI variables [I, "likely"].
→ The mechanism is undocumented and not integrated with Vault [F].
→ The Vault design is only a proposal, and it uses the non-prod role for prod [F, §4, §8].
→ There is no validated, reusable Vault pattern [I].
**Probable root cause:** no platform-provided secrets pattern. The actual storage method is **unverified**.

---

## 4. Bottlenecks & Dependencies

**Request → Waiting → Dependency → Execution → Validation → Closure**

| Stage | Bottleneck |
|---|---|
| Request, Waiting | Insufficient evidence (no issue data) |
| Dependency | Platform prerequisites (see the table below) |
| Execution | Manual release and manual dependency updates (P1, P5) |
| Validation | Tests and scans not gated, so problems are found late (P1, P4) |
| Closure / Operate | Manual detection, diagnosis and rollback (P2) |

**Biggest time sinks, ranked by the document's estimates:** incident resolution (P2), then manual releases (P1), then CI issues (P1), then dependency upkeep (P5), then manual secret rotation (P4).

| Dependency | Problem it creates | Affects |
|---|---|---|
| Shared CI/CD catalog (platform team) | Template paths are unverified | Golden pipeline adoption (P1, P7) |
| Vault platform (`tid-np-gitlab` role) | Only a non-prod role exists; prod role undefined | Prod secrets pattern (P4) |
| GitLab administration / API access | Settings, MRs and pipelines can't be verified | Metrics and baseline (P3) |
| SonarQube | Configured but not gating | Quality enforcement (P1) |
| Observability / infrastructure team | Limited observability | Detection and diagnosis (P2) |
| Public images (`registry.gitlab.com/...:latest`) | Unpinned external images | Supply-chain and reproducibility risk (P7) |
| Proposed manual approvers (tech lead plus 2 for prod) | Adds a human gate | Could slow releases and hotfixes (P1, P2) |
| Individual experts | Not enough evidence to name a silo. Undocumented systems and manual recovery imply key-person risk | P2, P6 |

---

## 5. Leadership Insights

1. **Tools without guardrails.** The capabilities exist, but nothing enforces them, so quality depends on individual discipline (P1, P4). *Opportunity:* make standards the default, not an option.
2. **Recovery is manual end to end.** Every incident step depends on people (P2, P6). *Opportunity:* automate rollback and make runbooks mandatory.
3. **We can't steer what we can't measure.** Every figure, including incident time, is an estimate (P3). *Opportunity:* set a baseline before making further investment decisions.
4. **Manual upkeep turns into deadlines.** The Python EOL is the visible symptom of updating dependencies by hand (P5). *Opportunity:* automate updates so upgrades become routine.
5. **Validate the blueprint before rollout.** Copied as-is, the target pipeline would introduce new defects (P7). *Opportunity:* the platform team owns and tests one golden pipeline.

---

## 6. Recommendations (including automation)

### Immediate (0–3 months)
| Recommendation | Addresses | Expected benefit | Effort | Dependency |
|---|---|---|---|---|
| Confirm and complete the Python 3.10 → 3.12 migration | P5 | Avoid running an unsupported runtime | M | Dev capacity |
| Protect main; require a passing pipeline, 1 review, and the tests and SonarQube gates | P1 | Every change is checked | S | GitLab maintainer rights, SonarQube |
| Turn on SAST, dependency, container and secret (GitGuardian) scanning via shared templates | P4 | Earlier vulnerability detection | S–M | Shared security templates |
| Write runbooks and deploy/rollback steps | P2, P6 | Faster diagnosis; less key-person risk | S | Team knowledge |
| Document the current secrets mechanism | P4 | Shows the real exposure | S | Team knowledge |
| Get GitLab API access; set a DORA baseline including MTTR (Value Stream / DORA analytics) | P3 | Evidence-based decisions | S | GitLab admin |

### Medium term (3–6 months)
| Recommendation | Addresses | Expected benefit | Effort | Dependency |
|---|---|---|---|---|
| Fix the §8 defects; adopt a validated golden pipeline built from shared templates | P1, P7 | Doc est.: releases 6 h → 1–2 h; CI toil 4 h → 1 h per developer per month | M | Platform team |
| Automated rollback (redeploy the last known-good image through GitLab Environments) plus a fast-track hotfix path | P2 | Doc est.: 8 h → about 4 h per incident | S–M | Golden pipeline |
| Protected environments and approval tiers, with a delegated approver pool | P1 | Audit trail without an approval bottleneck | S–M | Approvers defined |
| Vault: JWT auth, separate prod role, Agent Injector | P4 | Automatic rotation; audit log | M | Vault team |
| Renovate Bot plus blocking dependency scans | P5 | Dependencies stay current automatically | S | Carbon Renovate setup |
| README and architecture overview as docs-as-code | P6 | Less key-person risk | S–M | Team time |

### Strategic (6–12 months)
| Recommendation | Addresses | Expected benefit | Effort | Dependency |
|---|---|---|---|---|
| Group compliance pipelines and policy-as-code across `sxf-dev-grp` | P1, P4 | Standards by default in every repository | L | Governance sponsorship |
| Observability: Prometheus, Grafana, and alerting with runbook links | P2 | Faster detection and diagnosis | M–L | Infrastructure team |
| ACME certificate automation (no evidence of current certificate incidents) | §7, §9 risk | No manual renewals | S–M | IAM/ACME platform |
| Quarterly DORA review at leadership level | P3 | Continuous improvement | S | Baseline in place |

---

## 7. Leadership Storyline (5 minutes)

| Slide | Message |
|---|---|
| 1 – Current situation | Level 2 maturity: the tools are present but not enforced or measured. |
| 2 – What we are seeing | The Top 5 problems (§1). |
| 3 – Why it is happening | Standards are optional, the shared platform (CI templates, Vault) is not adopted, and measurement was never built in. |
| 4 – Business impact | Lead with incident and release effort (P1, P2), the runtime deadline (P5), and unverified security exposure (P4). |
| 5 – What we can do | The three horizons in §6. |
| 6 – Expected outcome | Every change checked automatically, audited releases, incident effort roughly halved, secrets that rotate themselves, and measurable performance. These targets are the document's estimates and need to be confirmed against the baseline. |

---

## One-Sentence Executive Message

`mcc-integration` has the right DevOps tools but no enforced standards, automated CI/CD pipelines or measurement, so quality, security, releases and incident recovery all depend on manual effort and individual expertise.
