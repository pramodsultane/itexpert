| # | Problem | Evidence [F] | Root cause [I] | Impact and quantification | Category | Type | Severity |
|---|---|---|---|---|---|---|---|
| P1 | **Knowledge is fragmented, outdated and depends on individuals** | Spread across Docusaurus, GitLab wikis, Terraform modules and Confluence. "Tribal knowledge… single points of failure". "Onboarding documentation is outdated or incomplete" (§2). The `/blog` folder, which holds point-in-time migration plans, is indexed (§6). A tool to find documentation gaps is only a future idea (§11). | No single source of truth; no documentation ownership or freshness process | Developers spend 45–90 min/day searching. Seniors are interrupted 4–6 times a day, losing about 40 min/day each. Onboarding takes 2–4 weeks (doc est.). The chatbot can repeat outdated guidance [I]. Key-person risk | Documentation/Knowledge, Ownership, People | Systemic | High |
| P2 | **Slow incident and pipeline-failure resolution** | "Navigate docs + ask peers", with MTTR an estimated 15–25% higher. CI/CD failures are hard to troubleshoot under pressure. Kubernetes, Terraform and Kafka configuration questions are "repetitive" (§2). Log analysis, failure prediction and automatic fixing are only roadmap items (§10). Alerts for configuration "drift from best practices" are planned (§11). | DevOps standards are not enforced or offered as self-service; diagnosis and recovery are manual | Longer outages, disrupted delivery, reliance on specific people. Incident count and real MTTR are not measurable. The ROI calculation *assumes* 10 incidents a month | Process, Automation, Governance | Systemic | High |
| P3 | **Benefits and ROI are unproven** | Metrics are based on benchmarks (§7). User feedback is planned for Phase 2 with "Low" priority; the analytics dashboard is a future idea (§10–11). Figures conflict (see detail). | Measurement was not built into the MVP | Phase 2–3 investment (320–460 h) rests on an unverified claim of €170k–280k a year | Governance, Tooling | Systemic | High |
| P4 | **AI security and data governance** | API keys sit in a Kubernetes Secret created by the pipeline, with no Vault (§8.1, §8.2). The document describes no user authentication, permissions, redaction, data classification, or protection against malicious prompts or made-up answers. Phase 2 will index MRs, pipeline logs and issues (§10). The chatbot taking actions itself is planned (§11). | No security or data review before the scope grows | Sensitive data could be exposed (for example, credentials in logs). Unauthorised access. Compliance risk grows with Phase 2 | Security/Compliance, Governance | Systemic, growing | High |
| P5 | **The chatbot's pipeline lacks quality gates and recovery** | §8.2: CHECK stage is markdown linting only; the smoke test runs in BUILD, before deployment. No security scans, no unit tests, no answer-quality check. A single DEPLOY stage with a 180 s rollout. No dev/uat/prod promotion, approval or rollback. | No standard pipeline template | A vulnerable release or a bad knowledge index can reach users, and recovery is manual | Automation, Security, Process | Every deploy | Medium: internal tool |
| P6 | **Coverage gap** | Indexes only 4 folders of one repository (§6). Confluence and GitLab wikis, both named as knowledge sources in §2, are not included. The chat widget appears only on the homepage (§3, §6). | Scope is limited | Fragmentation is only partly solved; adoption is likely lower [I] | Architecture, Dependencies | Structural | Medium |
| P7 | **Capacity and key-person risk** | 2–3 engineers, one per role (§10). Effort grows from 80 h to 120–160 h to 200–300 h per phase. No support model, no service-level target, no breakdown of AI service running costs. | Minimal team | The service or roadmap stalls if one person is absent. The tool meant to reduce key-person risk has key-person risk itself | Capacity, Ownership | Structural | Medium |
| P8 | **Roadmap status not visible** | The Phase 2 target was Q3 2026 (§10). That quarter has ended, and the document gives no status. | No status reporting | Stakeholders don't know where things stand | Governance, Communication | One-off | Low |

### P2 detail: where recovery depends on people

| Step | Gap [F] | Consequence [I] |
|---|---|---|
| Detect | Failure prediction is only planned (§10, Phase 3) | Problems are handled after they happen |
| Diagnose | "Navigate docs + ask peers" (§2); pipeline logs not analysed yet (Phase 2) | Manual investigation that depends on individuals |
| Fix | Repetitive configuration questions; drift from best practice expected (§2, §11) | The same problems are solved by hand again and again |
| Recover | Automatic fixing is a future item (§10); no rollback stage (§8.2) | Recovery depends on people, not automation |

The chatbot shortens only the **documentation lookup** during incidents. The document estimates this drops from 15–30 to 2–5 min a day. Detection, standardisation and recovery stay the same.

### P3 detail: conflicting figures in the document

| Topic | Values found | Sections |
|---|---|---|
| Onboarding baseline | 2–4 weeks vs 3–4 weeks | §2 vs §7 |
| Time per complex query | 20–30 min vs 15–30 min; saving of 15–25 min | §2, §7, §4 |
| MTTR | 15–25% higher (problem); 25–35% lower; 25–45% lower; 30% lower (ROI) | §2, §4, §7, §9 |
| Daily saving per developer | ~1.5 h vs 90–166 min | §4/§9 vs §7 |
| Value of fewer senior interruptions | Stated as €3,000–5,000/month, but the stated basis works out to about €5,900 | §9 |
| Value of faster MTTR | Stated as €1,500–3,000/month, but the stated basis (30% of 45–60 min × 10 incidents) is only about 2.3–3 h a month. **The figure can't be reproduced** | §7, §9 |
| ROI ratio 20:1–35:1 | Implies an annual cost of about €8k, roughly the infrastructure cost alone. It appears to leave out 400–540 h of build effort and ongoing maintenance [I] | §9, §10, §12 |
| "Conservative estimate" | Applied to a range the document itself calls "conservative to optimistic" | §9 |
| Phase 1 | 4–6 weeks duration vs 80 h of effort for 2–3 engineers | §10 |
| Replicas | 2 in the text; 1 in the architecture diagram | §5, §8.1 |
| Accuracy and self-service | ~40% → ~85% and ~30% → ~75%. No measurement method is described | §7 |

**Brief categories with no evidence:** blocked work, access requests, handovers, repeated service requests, unstable environments and problems caused by external teams. All are **insufficient evidence**.

---

## 3. Root Cause Analysis (5-Why)

**A. Incidents and pipeline failures take a long time to resolve (P2)**
→ Engineers have to search several documentation sources and ask colleagues [F, §2].
→ Knowledge is fragmented and partly held only in people's heads [F, §2].
→ The same configuration questions keep coming up, and configurations drift from best practice [F, §2, §11].
→ DevOps standards aren't enforced or offered as self-service, and diagnosis and recovery aren't automated (both are only roadmap items) [I].
**Probable root cause:** no enforced DevOps standards and no automated diagnosis or recovery. The chatbot shortens only the lookup step.

**B. Knowledge depends on individuals (P1)**
→ Tribal knowledge is "locked in individual engineers' heads" [F].
→ Documents are outdated or incomplete and spread across 4+ tools [F].
→ There is no ownership, review or freshness process for documentation [I].
**Probable root cause:** a gap in documentation ownership. The chatbot depends on documentation quality and can't fix it.

**C. The investment case can't be checked (P3)**
→ All metrics are benchmark-based estimates [F, §7].
→ No usage, feedback or answer-quality data is collected [F, §10–11].
→ Measurement wasn't part of the MVP's definition of done [I].
**Probable root cause:** measuring value wasn't designed in from the start.

**D. Security and data risk grows as scope grows (P4)**
→ API keys sit in a Kubernetes Secret created by the pipeline [F].
→ There is no Vault integration. The mcc-integration assessment shows the same gap [I].
→ Phase 2 adds MRs, logs and issues, with no rules for redaction or data classification [F: none described].
**Probable root cause:** no security or data review before features are added.

---

## 4. Bottlenecks & Dependencies

**Flow for a technical question or incident: Request → Waiting → Dependency → Execution → Validation → Closure**

| Stage | Bottleneck |
|---|---|
| Waiting | Waiting for a senior engineer to answer (P1) |
| Dependency | Tribal knowledge and 4+ documentation sources (P1) |
| Execution | Manual search, 15–30 min per complex query (est.) |
| Validation | The answer has to be double-checked because documents may be outdated [I] (P1) |
| Closure | Not described. What was learned isn't written back [I] |

**Biggest time sinks per developer per day, "before chatbot" estimates (§7):**
1. Documentation search (P1)
2. Onboarding support: 30–60 min
3. Answering colleagues' questions: 20–30 min
4. Looking up documentation during incidents: 15–30 min (P2)
5. Repetitive configuration troubleshooting: not quantified (P2)

| Dependency | Problem it creates | Affects |
|---|---|---|
| Azure OpenAI (vendor) | Availability, usage limits, cost per query and data-handling terms are not described | Service and cost risk |
| Bib Memory for Bots (internal framework) | The core engine is owned by another team | Roadmap depends on that team |
| Kubernetes, NGINX ingress, GitLab Pages (platform) | Hosting and routing | Platform changes affect the chatbot |
| Security / data governance | No approval step for adding new data sources | Phase 2 data exposure (P4) |
| Confluence and GitLab wiki owners | Content not indexed | Fragmentation remains (P6) |
| Individual experts | Senior engineers (P1); one engineer per chatbot role (P7) | Key-person risk |

---

## 5. Leadership Insights

1. **The real problem is knowledge, not search.** Fragmented, outdated, person-dependent knowledge is the cause. Search is the symptom (P1). *Opportunity:* pair the chatbot with documentation ownership and freshness rules.
2. **Recovery depends on people, not standards.** Repeated configuration questions and drift show that standards aren't enforced (P2). *Opportunity:* treat the chatbot as an aid, not the fix. Invest in standard templates and automated recovery.
3. **The value is plausible but unproven.** The investment case rests on benchmarks and conflicting numbers (P3). *Opportunity:* measure real outcomes before funding Phases 2 and 3.
4. **Security must come before scope.** New data sources and the chatbot taking actions itself increase risk faster than controls are being added (P4). *Opportunity:* make security conditions a requirement for starting Phase 2.
5. **The same standards gap as mcc-integration.** The chatbot's pipeline lacks the same gates, scans and rollback (P5). *Opportunity:* one shared standard pipeline across teams.
6. **The tool that should reduce key-person risk has its own.** One engineer per role is carrying a growing roadmap (P7). *Opportunity:* define ownership and a support model, and cross-train.

---

## 6. Recommendations (including automation)

### Immediate (0–3 months)
| Recommendation | Addresses | Expected benefit | Effort | Dependency |
|---|---|---|---|---|
| Collect usage and feedback data (move thumbs up/down from "Low" to "High" priority); baseline time-to-answer, adoption and MTTR | P3 | Real evidence for ROI | S | Chatbot team |
| Fix the conflicting figures; restate the ROI including engineering effort and AI service costs | P3 | A credible investment case | S | Finance input |
| Move the Azure OpenAI keys to Vault | P4 | Key rotation and an audit trail | S–M | Vault team |
| Define authentication, data classification and redaction rules **before** Phase 2 adds new data | P4 | Prevents exposure of sensitive data | S–M | Security / data governance |
| Add security scanning (code, dependencies, containers, secrets), a smoke test after deployment, and automated rollback to the last known-good image or index | P5, P2 | Safer releases; faster recovery | S–M | Shared CI templates |
| Show the chat widget on every documentation page | P6 | Higher adoption [I] | S | Frontend |
| Publish the Phase 2 status | P8 | Stakeholders know where things stand | S | Team lead |

### Medium term (3–6 months)
| Recommendation | Addresses | Expected benefit | Effort | Dependency |
|---|---|---|---|---|
| A fixed set of test questions with known answers, run in CI to block quality drops | P5, P1 | Answer quality doesn't silently get worse | M | Subject-matter experts |
| Documentation ownership and freshness checks: owners, review dates, flags on stale content, issues opened automatically; label or exclude outdated blog plans | P1 | Better answers; less tribal knowledge | M | Documentation authors |
| Use unanswered and most-asked questions to decide which documents to fix | P1, P3 | Closes real documentation gaps | M | Usage data in place |
| Pipeline log analysis, with secrets removed from logs first | P2 | Faster failure diagnosis | M | P4 rules defined |
| Index Confluence and GitLab wikis, respecting existing access permissions | P6 | Less fragmentation | M–L | Source owners, security |
| Runbooks, cross-training and a support model for the chatbot | P7 | Less key-person risk | S–M | Management |

### Strategic (6–12 months)
| Recommendation | Addresses | Expected benefit | Effort | Dependency |
|---|---|---|---|---|
| Standard templates for Kubernetes, Terraform and Kafka, plus automated drift checks enforced by policy | P2 | Removes the cause of repetitive questions and drift-related incidents | L | Platform team, governance |
| Let the chatbot fix problems or take actions only with minimal permissions, human approval and an audit trail | P2, P4 | Faster recovery without new risk | L | Security; proven baseline |
| Scale as a reusable enterprise pattern **after** measured value is proven | P3 | Scale-out based on evidence | M–L | Phase 2 results |
| Quarterly review of measured outcomes: adoption, answer quality, MTTR, onboarding time | P3 | Continuous improvement | S | Usage data |

---

## 7. Leadership Storyline (5 minutes)

| Slide | Message |
|---|---|
| 1 – Current situation | An AI chatbot MVP is deployed over the documentation, fully automated and highly available. |
| 2 – What we are seeing | The Top 5 problems (§1). |
| 3 – Why it is happening | No documentation ownership, no enforced DevOps standards or automated recovery, and measurement and security weren't designed into the MVP. |
| 4 – Business impact | Lead with time lost to search and interruptions (P1), slower incident recovery (P2), and an unverified investment case (P3). |
| 5 – What we can do | The three horizons in §6. |
| 6 – Expected outcome | Measured ROI, faster recovery that depends less on individuals, fewer repetitive questions, safer use of AI, and a proven pattern ready to scale. |

---

## One-Sentence Executive Message

The chatbot is a promising first step, but the team's real problem is fragmented, person-dependent knowledge without enforced DevOps standards or automation, which slows onboarding and incident recovery. Its value should be measured and its security defined before it is scaled.
