# Salesforce Engage Repository Assessment

**Assessment date:** 2026-10-07  
**Repository:** `michelin-engage-service/salesforce-engage`  
**Assessment scope:** Local `master` checkout and available repository context

## Scope and confidence

Spongebot MCP was not available in this session. GitHub MCP could not retrieve this repository (API returned 404); its Actions request returned 503. Findings therefore use the local checkout. GitHub branch protection, required checks, PR review rules, actual Actions runs, and external deployment controls are **Not verifiable from repository evidence**. Some search results were withheld by the organization’s content-exclusion policy; no alternate access method was used. This was a static review; Salesforce CLI, Ant, and Gitleaks were not available for deployment, test, or history-wide secret scanning.

## 1. Executive Summary

**Overall repository health: Low / high delivery and security exposure.** The repository contains a substantial Salesforce product: more than 176,000 tracked files, including Apex, Aura, LWC, Salesforce metadata, B2B components, and release materials. It also contains many Apex test assets and some SonarCloud configuration. However, the repository itself provides little evidence of a repeatable, gated delivery process. Deployment guidance is fragmented across thousands of release files, and legacy build scripts coexist with newer Salesforce metadata.

**Top challenges:** repository scale and ownership; manual release procedures; mixed-age deployment toolchains; missing onboarding guidance; duplicated Aura implementations; inconsistent Salesforce API versions; and no visible in-repository CI/CD definition.

**Top risks:** credential-like material in tracked deployment notes; injectable dynamic SOQL in a REST-driven flow; possible access-control gaps in a `without sharing` Aura controller; production source maps potentially included in a publicly cached static resource; and customer request/response bodies persisted in custom logs.

**Top policy/best-practice gaps:** no tracked CI workflow or visible quality/security gates; no tracked `CODEOWNERS` (and `.gitignore` ignores that filename); no visible dependency or secret-scanning automation; no repository evidence of centralized secret/certificate management; and no documented artifact promotion or production approval controls. These are potential policy gaps, not confirmed Michelin-policy violations.

**Top improvement opportunities:** contain and rotate any exposed credentials; remediate the SOQL and access-control concerns; stop publishing production source maps; establish a standard Salesforce validation pipeline; and reduce the review burden of generated or repetitive metadata.

**Biggest quick wins:** rotate and history-scan credentials, bind the SOQL input, remove production map files from the archive, redact integration logs, and make `CODEOWNERS` trackable.

**Overall maturity:** **1.1/5 — Beginner**, based on repository evidence only. Salesforce test assets and source-controlled metadata are positives, but delivery, governance, security automation, and developer onboarding are weakly evidenced.

## 2. Challenges

| Challenge | Evidence | Impact | Recommended improvement |
|---|---|---|---|
| Repository scale makes changes difficult to review and scan | 176,365 tracked files; 170,481 under `src`; 100,001 `.role` files; 506 first-level release directories | Longer indexing/scanning, noisy reviews, harder ownership and risk triage | Confirm whether the role metadata is intentionally versioned at this scale; partition ownership and CI by product/metadata area; avoid scanning unrelated generated/vendor content on every change |
| Release knowledge is fragmented in manual materials | 3,334 files match pre-/post-deployment or PD-step naming patterns; many versioned release folders | Operators must find the correct steps manually; increased chance of missed, stale, or conflicting actions | Convert recurring procedures into versioned, validated runbooks and deployment jobs; retain only exceptional manual steps |
| Deployment toolchains are inconsistent and old | `portal_packages/build.xml` uses Salesforce API 41 and a fixed Windows Ant JAR path; B2B uses a separate Webpack deployment plugin; data loader build uses version 42 | Builds may depend on individual machine setup and drift between environments | Define one supported Salesforce toolchain and documented environment contract; remove machine-specific paths and separate build from deployment |
| Onboarding and local execution are unclear | No tracked root README, CONTRIBUTING guide, or `sfdx-project.json`; `b2b/package.json` has build scripts but no test or lint scripts | New developers cannot readily discover prerequisites, safe credentials setup, test commands, or deployment flow | Add a short project guide with setup, supported tools, test/validation commands, environment boundaries, and release process |
| Similar components and implementations increase maintenance cost | Twelve component directories include `clone` in their names; examples include `DealerPortalB2BRegistrationForm_clone` and `loginForm_clone` | Fixes and security changes can diverge across copies | Identify active versus legacy variants, compare behavior, consolidate shared flows, and retire unused copies through owned change plans |
| Salesforce metadata has substantial API-version drift | Apex metadata spans API versions 29.0–67.0; `portal_packages/build.xml` targets API 41 | Old metadata can constrain modernization and create inconsistent platform behavior | Inventory versions by component and business owner; upgrade in staged, tested increments rather than mass-changing metadata |
| Delivery controls are not represented in the repository | No tracked GitHub Actions, GitLab CI, Jenkins, or Azure pipeline configuration found; local commits include Gearset sync messages | Teams cannot review or reproduce the complete delivery process from this repository | Bring the authoritative validation/deployment workflow under version control, or link and version its external configuration and controls |

## 3. Risks

| Risk | Evidence | Severity | Potential impact | Recommendation |
|---|---|---:|---|---|
| Potential secret/sensitive information detected – location: `PostDeployment steps for W-044440.txt` | Tracked deployment procedure | **High** | If still valid, unauthorized access to an integration or environment | Revoke/rotate the credential, scan all branches and history with an approved secret scanner, remove it from active files and remediate history under the organization’s process |
| Potential secret/sensitive information detected – location: `release/v85.0/Service Booster/Post Steps/Post Steps.txt` | Tracked deployment procedure | **High** | If still valid, unauthorized access to a service or account | Same response: rotate, establish impact, history-scan, and block future credential commits |
| Dynamic SOQL concatenates request-derived input in a `without sharing` DAO | `src/classes/ServPwNa_CaseDaoWithoutSharing.cls:10,15`; `fleetAccountNumber` is read from the REST request in `src/classes/ServPwNa_RestService.cls:103–104`; endpoint is `src/classes/ServPwNa_CaseRest.cls:7` | **High** | An authenticated caller with API access may manipulate the query or access records beyond the intended scope | Replace string concatenation with a bind variable; validate the identifier; review whether `without sharing` is required; add negative and authorization tests |
| Aura controller runs without sharing and returns feed data | `src/classes/GraphController.cls:1,11,137,164,183`; component references the controller in `src/aura/Chatter_Search_bar/Chatter_Search_bar.cmp` | **Medium** | Users with controller access may see records or fields beyond their intended sharing/CRUD/FLS scope | Confirm intended audience; enforce explicit record and field access; restrict class access; test with least-privilege user personas |
| Production build may publish source maps in a public static resource | `b2b/webpack.config.js:52,60,137–143` enables production source maps and configures `Public` cache control; `b2b/plugins/custom-salesforce-plugin.js` archives the output directory | **Medium** | Source maps may disclose original client-side source and internal implementation details | Exclude `.map` files from the production archive or generate non-published maps; verify the deployed resource contents |
| Integration payloads are persisted in custom error logs | `src/classes/ServPwNa_CaseRest.cls:41`; `src/classes/ServPwNa_RestService.cls:293,308,357,372`; `src/classes/DebugLogUtility.cls:234–251,470–475` | **Medium** | Customer or case data may be retained in logs beyond business need or exposed to users with log-object access | Redact or allowlist fields before logging; minimize response details; document access, retention, and deletion controls |
| Deployment and validation may vary by operator or environment | Legacy Ant targets allow several deploy modes, including deployment with no explicit test level; no central pipeline is tracked | **Medium** | A change may reach an environment without consistent tests, approvals, artifact traceability, or repeatable rollback | Standardize PR validation, validate-only deployments, approvals, immutable artifacts, promotion, and rollback procedures |
| External security and operational controls cannot be assessed | GitHub API access failed; repository contains no pipeline or infrastructure manifests | **Medium** | Unseen branch rules, monitoring, backups, or access controls may be missing or misconfigured | Verify these controls directly with repository/platform owners; do not infer their presence or absence from the local source alone |

## 4. Michelin Policy / Governance Gaps

No applicable Michelin policy document was provided, so these are not assertions of policy violations. Each item below is a **Potential policy gap – requires confirmation against the applicable Michelin standard.**

| Area | Repository evidence and assessment |
|---|---|
| PR ownership and reviews | No tracked `CODEOWNERS` was found. `.gitignore:27` contains `CODEOWNERS`, which prevents adding the conventional file unless the ignore rule is changed. Branch protection, required approvals, and review-dismissal settings are **Not verifiable from repository evidence**. |
| CI/CD standardization | No tracked pipeline definition was found. Gearset appears in local merge/sync commit messages, but its configuration and required gates are not in the repository. |
| Security gates | No tracked SAST, DAST, secret-scanning, container-scanning, or IaC-scanning workflow/configuration was found. External service configuration is **Not verifiable from repository evidence**. |
| SonarQube / code quality | `sonar-project.properties` exists, but it scans `.` and only excludes `**/ccrz**`; no pipeline invocation or quality-gate enforcement is visible. |
| Dependency governance | `b2b/package-lock.json` is present, but no Renovate/Dependabot configuration or software-composition/license scanning configuration was found. A root license/compliance process is **Not verifiable from repository evidence**. |
| Secrets and certificates | A credentials template and ignored local credential/config files exist, but no repository evidence of Vault or other centralized secret/certificate management was found. Rotation and certificate-expiry processes are **Not verifiable from repository evidence**. |
| Production deployment | Versioned manual release notes and Ant deployment targets exist; no in-repository approval, promotion, or immutable-artifact process is visible. External controls are **Not verifiable from repository evidence**. |
| Auditability and traceability | Git history contains merge and Gearset sync messages, but build provenance, artifact identity, and environment promotion records are not represented by tracked workflow configuration. |
| Observability and recovery | Custom Salesforce logging code exists, but alerting, dashboards, log retention, backup, and disaster-recovery configuration are **Not verifiable from repository evidence**. |
| Containers and Kubernetes | No Docker or Kubernetes assets were found. This may be appropriate for a Salesforce SaaS application; applicability should be confirmed rather than treated as a violation. |

## 5. DevOps Maturity Assessment

Scores describe evidence in this repository, not the full Salesforce org or Michelin platform. Containerization and Kubernetes are scored 0 because no assets are present; for a Salesforce SaaS application, these may be not applicable.

| Area | Score 0–5 | Evidence | Gap | Recommendation |
|---|---:|---|---|---|
| Source Control | 2 | Large Salesforce metadata tree and `src/package.xml` are versioned | No tracked ownership guide; repository scale and generated-looking role metadata complicate reviews | Establish code ownership and bounded change areas |
| CI/CD | 1 | Legacy Ant scripts and Gearset sync commit messages | No tracked pipeline, mandatory checks, or measurable delivery controls | Version the validation and deployment workflow |
| Automated Testing | 2 | 1,134 Apex files contain `@isTest` | No visible test command or pipeline; B2B has no test script | Run relevant Apex tests on PRs; add B2B tests and gate deployments |
| Code Quality | 1 | Sonar configuration exists | No visible quality-gate invocation; broad `sonar.sources=.` scope | Run a tuned analysis and enforce a quality gate |
| Security | 1 | Some security-oriented metadata and checks exist; risky query/access patterns found | No tracked security scanning gates; access checks are inconsistent in reviewed examples | Add Salesforce Code Analyzer/SAST and authorization tests |
| Dependency Management | 1 | B2B package and lockfile are present | No update automation or visible dependency/license scanning | Add Renovate/Dependabot and SCA |
| Secrets Management | 1 | Credential template and ignore rules; environment variables used in legacy build | Sensitive material is also present in tracked release notes; no central manager evidenced | Rotate findings and use managed short-lived credentials |
| Infrastructure as Code | 2 | Salesforce metadata and deployment manifest are versioned | No Terraform/Ansible or declarative environment provisioning visible | Document the boundary between Salesforce metadata and external platform configuration |
| Containerization | 0 | No Docker assets found | Not present; potentially not applicable | Confirm applicability; do not containerize solely to satisfy a checklist |
| Kubernetes | 0 | No Kubernetes manifests found | Not present; potentially not applicable | Confirm applicability |
| Observability | 1 | `DebugLogUtility` persists integration/error log records | No repo evidence of alerting, dashboards, redaction, or retention | Define structured, privacy-aware logging and alerting |
| Documentation | 1 | Many release-specific procedure files | No root README or contributor guide; procedures are fragmented | Publish a canonical onboarding and release guide |
| Release Management | 1 | Release folders and Ant deploy targets exist | No consistent versioned artifact/promotion workflow is visible | Create validated, immutable artifacts and environment promotion |
| Reliability | 1 | Some metadata deploy targets use rollback-on-error | No visible operational SLOs, rollback plan for data changes, or DR controls | Define recovery runbooks and rehearse release rollback |
| Developer Experience | 1 | B2B has development/build commands | Salesforce project setup and safe local workflow are unclear; required CLI tools are absent in the inspected environment | Provide reproducible setup scripts and prerequisites |
| Automation | 1 | Some Salesforce build/deploy automation and external Gearset activity | No tracked PR, security, dependency, or release automation | Automate high-volume checks and recurring release tasks |

**Aggregate:** 17/16 = 1.06, rounded to **1.1/5 — Beginner**.

## 6. Things That Can Be Improved

### Quick Wins

- **Rotate the credential-like material and run a history-wide secret scan.** It is tracked in two release-note locations. **Benefit:** contain possible account compromise. **Priority: P0.**
- **Bind `strLegacyId` in the dynamic SOQL query and add access-control tests.** The value comes from an API request and the DAO is `without sharing`. **Benefit:** reduce injection and overbroad data access risk. **Priority: P0.**
- **Stop including production `.map` files in the public static-resource archive.** Production builds enable source maps and archive the output directory. **Benefit:** reduce source disclosure. **Priority: P1.**
- **Redact integration request/response bodies before persisting logs.** **Benefit:** reduce unnecessary customer-data retention and exposure. **Priority: P1.**
- **Unignore and add a tracked `CODEOWNERS` file.** **Benefit:** establish explicit ownership for high-risk Salesforce metadata. **Priority: P1.**

### Medium-Term

- **Create a standard PR validation pipeline** for Salesforce metadata, Apex tests, Salesforce Code Analyzer/PMD, Sonar quality gates, dependency scanning, and secret scanning. **Benefit:** consistent feedback before deployment. **Priority: P1.**
- **Upgrade and standardize the B2B and Ant/data-loader toolchains.** Versions include Webpack 5.15, Handlebars 4.2.2, jsforce 1.9.3, Ant Salesforce API 41, and Data Loader 42. Exact support status is **Not verifiable from repository evidence**. **Benefit:** reduce compatibility and maintenance risk. **Priority: P2.**
- **Add Renovate or equivalent dependency automation**, with lockfile updates and required SCA checks. **Benefit:** reduce unreviewed dependency drift. **Priority: P2.**
- **Document Salesforce setup, metadata validation, testing, and release procedures** in one maintained entry point. **Benefit:** reduce onboarding time and reliance on individual knowledge. **Priority: P2.**

### Strategic

- **Reduce monorepo review and scanning noise.** Assess whether the 100,001 role files and release archive can be generated, partitioned, or otherwise handled without weakening source traceability. **Benefit:** faster reviews and more meaningful quality/security scans. **Priority: P2.**
- **Separate B2B compilation, artifact creation, and org deployment.** The current Webpack plugin can deploy during the build when credentials are available. **Benefit:** improve promotion control, auditability, and deployment failure handling. **Priority: P1.**
- **Define a product-level release model** with validation-only deployments, environment promotion, approvals, immutable artifacts, and data-migration recovery. **Benefit:** safer, repeatable releases. **Priority: P2.**

## 7. Things That Can Be Automated

| Automation | Current manual activity | Proposed solution | Expected benefit | Complexity |
|---|---|---|---|---|
| PR validation | No tracked workflow defines build/test/security checks | GitHub Actions or approved enterprise CI to validate changed Salesforce metadata, run Apex tests, and build B2B assets | Fast, consistent pre-merge feedback | Medium |
| Security and secret gates | Credentials and risky patterns are detected by manual review | Secret scanning on PRs and history; Salesforce Code Analyzer/SAST; SCA for npm | Earlier detection and fewer repeat findings | Medium |
| Dependency updates | `package-lock.json` is maintained without visible update automation | Renovate/Dependabot with grouped updates and required security checks | Reduce stale dependencies and manual update effort | Low–Medium |
| Release artifact generation | Numerous release folders and deployment notes require manual selection | Generate an immutable, versioned Salesforce deployment artifact from the validated change set | Improve traceability and reduce wrong-package deployments | High |
| Release-note and PR description drafting | Change context is spread across metadata and work-item files | Generate a draft PR/release summary from changed metadata and approved ticket references | Less repetitive authoring; better change visibility | Low–Medium |
| Manual procedure validation | 3,334 files match deployment-step naming patterns | Convert repeatable steps into checked scripts/runbooks with precondition and postcondition validation | Reduce missed steps and inconsistent execution | Medium |
| Failed pipeline triage | External pipeline behavior is not represented here | Approved AI/Spongebot or CI assistant to summarize failed jobs, logs, and likely owners after redaction | Faster RCA; requires verified MCP access and data controls | Medium |
| Drift and metadata ownership | Large Salesforce metadata surface is difficult to review | Scheduled metadata/API-version inventory and change reports; path-based owners and CI | Surface stale areas and focus reviewers | Medium |
| Observability review | Custom logs exist, but dashboard and alerting automation is not visible | Use approved Grafana/Salesforce monitoring integrations to detect error spikes and log growth | Faster issue detection | High |
| Certificate and integration checks | Expiry and integration health processes are not verifiable from repository evidence | Scheduled checks through approved platform tooling, with Jira issue creation for actionable alerts | Reduce avoidable outages | Medium |

Spongebot, GitLab, Jira, SonarQube, Kubernetes, Grafana, MongoDB, and other MCP-backed opportunities are proposals only; their availability and authorization were not verifiable here.

## 8. Technical Debt

| Rank | Debt | Evidence | Action |
|---|---|---|---|
| **High** | Request-derived value is concatenated into dynamic SOQL in a privileged DAO | `src/classes/ServPwNa_CaseDaoWithoutSharing.cls:10,15`; caller at `src/classes/ServPwNa_RestService.cls:103–104` | Bind the value, add input validation, and verify access scope with tests |
| **High** | Potential credentials are in tracked deployment notes | The two locations listed in the Risk section | Rotate, history-scan, remove, and add secret scanning |
| **High** | Integration error paths persist request/response bodies | `ServPwNa_CaseRest.cls`, `ServPwNa_RestService.cls`, `DebugLogUtility.cls` | Redact, minimize, set retention and access controls |
| **Medium** | Production source maps may be included in a publicly cached resource | `b2b/webpack.config.js`; `b2b/plugins/custom-salesforce-plugin.js` | Exclude maps from the production archive |
| **Medium** | Legacy and mixed-age deployment stack | API versions 29–67; Ant API 41; Data Loader 42; older B2B dependency versions | Inventory and upgrade in tested stages |
| **Medium** | Duplicate or clone-named Aura components | Twelve `clone` directories exist across Aura/LWC trees | Consolidate or decommission with regression coverage |
| **Medium** | Excessive repository and release metadata volume | 176,365 tracked files and 3,334 release procedure files | Review generated/duplicated content and assign ownership boundaries |
| **Low** | TODO-level cleanup remains in B2B code | `b2b/src/components/WishlistPickerModalExtension/view.js` contains a quantity-refactor TODO | Resolve when the component is next changed |

No library’s current end-of-support status was established from repository evidence alone.

## 9. CI/CD Assessment

**Pipeline structure:** No tracked GitHub Actions, GitLab CI, Jenkins, or Azure Pipeline definition was found. Local commit messages show Gearset sync activity, but pipeline configuration and enforcement are not inspectable. GitHub Actions runs could not be retrieved through MCP.

**Tests and quality gates:** Apex test code is present, but there is no visible in-repository command or CI gate to execute it. `b2b/package.json` exposes development/build scripts only; it defines no `test` or `lint` script. `sonar-project.properties` is present, but there is no evidence that it runs on PRs or blocks a merge.

**Deployment and rollback:** The legacy Ant scripts offer different deployment modes, including selected tests, local tests, validation-only, and a deployment target without an explicit test level. Some targets use `rollbackOnError`, but a complete data-migration rollback or environment-promotion process is not visible. Pipeline duration, caching, artifact retention, approvals, and failure rates are **Not verifiable from repository evidence**.

**B2B build/deploy coupling:** `b2b/package.json` invokes Webpack for builds. `b2b/webpack.config.js` configures a custom plugin that archives build output and can deploy it directly when credentials are available. The plugin starts work from Webpack’s `done` hook and launches asynchronous archive/deploy operations. Separate build, publish, and deploy stages with explicit status propagation would be safer and easier to audit.

**Concrete direction — faster, safer, more reliable, more standardized:**

1. Run only relevant Salesforce/B2B checks for a PR, while retaining full scheduled scans.
2. Run Apex tests and static analysis as required PR checks; validate Salesforce deployments before merge.
3. Produce one immutable artifact, promote that artifact across environments, and record approvals and deployment results.
4. Keep production deployment credentials out of the build process and use the approved secret manager.
5. Add source-map exclusion, secret scanning, dependency scanning, and Sonar quality-gate enforcement.
6. Record test, artifact, and deployment provenance so a release can be traced to its source commit.

## 10. Security & Compliance Assessment

**Secret exposure:**  
Potential secret/sensitive information detected – location: `PostDeployment steps for W-044440.txt`  
Potential secret/sensitive information detected – location: `release/v85.0/Service Booster/Post Steps/Post Steps.txt`

The values are intentionally not reproduced. Their validity and scope are **Not verifiable from repository evidence**. Treat them as exposed until rotated and reviewed. A history-wide scan was not run because Gitleaks was unavailable.

**Input handling and authorization:** `ServPwNa_CaseRest` exposes a global REST POST endpoint. `ServPwNa_RestService` deserializes request JSON, reads `fleetAccountNumber`, and passes it to a dynamic SOQL query in a `without sharing` class. This is a concrete injection/access-control concern requiring remediation and regression tests.

**Aura data access:** `GraphController` is `without sharing` and exposes Aura-enabled methods that query and return feed data. Confirm access for portal and internal personas, enforce record/field authorization, and restrict Apex class access to the intended audience.

**Logging:** The service persists full request and response bodies in custom logging records on multiple paths. `GraphController` also writes feed lists to debug logs. Establish field redaction, retention, access restrictions, and safe error responses.

**Client asset exposure:** Production source maps may be archived alongside assets in a `Public`-cache static resource. Verify deployed output and exclude maps unless publication is explicitly approved.

**Other security controls:** No tracked SAST/DAST, secret-scanning, dependency/license, container, or IaC scanning configuration was found. Authentication/authorization for every Salesforce endpoint, Named Credential use, certificate lifecycle, org security settings, and external network controls are **Not verifiable from repository evidence**.

## 11. Architecture & Design Gaps

- **Broad, tightly coupled Salesforce metadata surface:** Apex, Aura, LWC, Visualforce-era assets, integrations, profiles, permission sets, and release artifacts coexist in a very large tree. Ownership and change boundaries are not obvious.
- **Deployment concern is embedded in the B2B build:** Webpack compilation can lead directly to Salesforce deployment. Build validation and environment mutation should be separate operations.
- **Cross-cutting security behavior is inconsistent:** Some classes explicitly declare sharing behavior, while others do not; reviewed examples include both `without sharing` service code and public Aura-enabled methods. Establish an explicit policy for entry points and privilege elevation.
- **Repeated UI patterns:** Clone-named components suggest maintenance divergence. Confirm which are active before consolidating.
- **Observability design is incomplete in repository evidence:** Custom logging exists, but redaction, retention, alerting, and operational dashboards are not visible.
- **Salesforce is SaaS:** No container, Kubernetes, or Terraform deployment model was found. This is not inherently an architecture defect; the relevant question is whether Salesforce org configuration and external dependencies are governed reproducibly.

## 12. Developer Experience

| Developer task | Assessment |
|---|---|
| Understand the project | **Difficult:** no tracked root README or architecture overview; product areas and release folders are numerous |
| Set up the environment | **Difficult:** no root Salesforce project manifest or documented setup path; B2B requires a local credentials file |
| Build the application | **Partial:** B2B build commands exist; Salesforce deployment uses legacy Ant scripts and machine-specific configuration |
| Run tests | **Unclear:** Apex tests exist, but no visible command or pipeline; B2B defines no test script |
| Run locally | **Partial:** B2B has development modes; Salesforce functionality depends on org configuration and credentials |
| Debug issues | **Partial:** Salesforce custom logging exists, but some paths log full payloads and no canonical troubleshooting guide is visible |
| Create a PR | **Unclear:** no CONTRIBUTING guide or tracked CODEOWNERS; branch rules are not verifiable |
| Get feedback | **Unclear:** Sonar properties exist, but enforced checks and PR feedback are not visible |
| Deploy | **Difficult:** release procedures are numerous and fragmented; deployment may depend on legacy local tools |
| Troubleshoot failures | **Difficult:** no in-repository pipeline log/rollback guide; external Gearset configuration is not available for review |

## 13. Evidence-Based Findings

| Finding | Evidence | Why it matters / risk | Recommendation |
|---|---|---|---|
| Credential-like material is tracked in deployment documentation | The two locations listed in the Risk section | Any live credential in source control can be reused or exposed through clones/history | Rotate first, scan repository history, and enforce secret scanning |
| REST input reaches dynamically concatenated SOQL in a privileged class | `ServPwNa_RestService.cls:103–104`; `ServPwNa_CaseDaoWithoutSharing.cls:10,15` | Potential query manipulation and access beyond intended record scope | Use a bind variable and explicit authorization; add abuse and least-privilege tests |
| Aura controller returns feed data while running without sharing | `GraphController.cls:1,11,137,164,183`; `Chatter_Search_bar.cmp` references the controller | Potential cross-user data exposure if the controller is accessible to broader user groups | Confirm intended data scope; enforce row/field access and persona-based tests |
| Request/response payloads are stored in custom logs | `ServPwNa_CaseRest.cls:41`; `ServPwNa_RestService.cls:293,308,357,372`; `DebugLogUtility.cls:234–251` | Logs may retain personal or case data outside the primary record’s access and retention controls | Redact, minimize, restrict, and expire logs |
| Public static-resource build may contain source maps | `webpack.config.js:52,60,137–143`; archive behavior in `custom-salesforce-plugin.js` | Production maps may expose source when published with public cache control | Exclude map files and verify release output |
| Code ownership is impeded by an ignore rule | `.gitignore:27`; no tracked `CODEOWNERS` | Required ownership review cannot be inferred from this file and branch rules are not accessible | Remove the ignore rule and add owners; verify protection settings in GitHub |
| Quality configuration is not a delivery gate by itself | `sonar-project.properties:9,12,18`; no tracked pipeline config | A config file alone does not demonstrate analysis or merge blocking | Integrate tuned Sonar analysis and required quality checks |
| Deployment behavior is spread across scripts and manual notes | `portal_packages/build.xml`; `release/` contains 506 top-level directories and 3,334 deployment-step-named files | Increases operator dependence and inconsistent release execution | Automate repeatable steps and maintain one canonical release process |

## 14. Leadership-Level Summary

### 🔴 Top Challenges

* The Salesforce monorepo has more than 176,000 tracked files and over 100,000 role metadata files, creating a large review and ownership burden.
* Release execution depends on thousands of fragmented deployment procedures and multiple legacy toolchains.
* There is no visible in-repository CI/CD workflow tying tests, security scans, quality gates, and deployment together.

### ⚠️ Top Risks

* Potential secret/sensitive information is present in two tracked deployment-note locations; rotate and history-scan immediately.
* A REST request value is concatenated into dynamic SOQL in a `without sharing` class.
* Publicly cached B2B assets may include production source maps; integration logs also persist full request/response bodies.

### 🟠 Policy / Best-Practice Gaps

* **Potential policy gap – requires confirmation against the applicable Michelin standard.** No tracked workflow, required checks, or security gates are evidenced.
* **Potential policy gap – requires confirmation against the applicable Michelin standard.** `CODEOWNERS` is ignored and no tracked ownership file exists; actual branch protection is **Not verifiable from repository evidence**.
* **Potential policy gap – requires confirmation against the applicable Michelin standard.** Dependency, secret, license, artifact-promotion, and centralized secret-management controls are not evidenced in the repository.

### 🟢 Quick Wins

* Rotate the credentials, remove them from active files, and scan Git history.
* Bind the dynamic SOQL input and verify access controls for the REST/Aura entry points.
* Exclude source maps from production archives and redact payloads from persisted logs.
* Fix the `CODEOWNERS` ignore rule and add repository ownership.

### 🤖 Automation Opportunities

* Gate PRs on Salesforce validation, Apex tests, Salesforce Code Analyzer/PMD, Sonar, SCA, and secret scanning.
* Automate dependency updates, release artifact generation, and change summaries.
* Use approved CI/AI integrations for failed-pipeline RCA and release-procedure validation after confirming tool access and data-handling rules.

### 🏗️ Strategic Improvements

* Separate B2B build, artifact creation, and deployment; promote immutable artifacts through controlled environments.
* Reduce generated/repetitive metadata review noise and define product ownership boundaries.
* Standardize supported Salesforce API versions, toolchains, onboarding, observability, and recovery procedures.

### 📊 Overall Maturity

**Score:** 1.1/5  
**Level:** Beginner

### 🎯 Top 10 Recommended Actions

1. **[P0]** Rotate the credentials found in deployment notes, scan all branches/history, and add secret-scanning protection.
2. **[P0]** Bind the REST-derived SOQL input and review the `without sharing` access path with least-privilege tests.
3. **[P1]** Remove production source maps from the publicly cached static-resource archive and redact persisted request/response bodies.
4. **[P1]** Establish required PR validation for Apex tests, Salesforce static analysis, Sonar quality gates, SCA, and secret scanning.
5. **[P1]** Make `CODEOWNERS` trackable, assign domain owners, and verify GitHub branch protection and required reviews.
6. **[P2]** Standardize and upgrade the legacy Salesforce Ant/data-loader and B2B dependency toolchains.
7. **[P2]** Automate release artifact creation, validation-only deployment, environment promotion, approval records, and rollback documentation.
8. **[P2]** Review the 100,001 role files and high-volume release history for generated or redundant metadata suitable for partitioning or automation.
9. **[P3]** Add a canonical README covering architecture, setup, test commands, credentials handling, and safe local development.
10. **[P3]** Define privacy-aware logging, retention, alerting, and operational troubleshooting guidance.
