# Evidence map — Panel 02 "Keycloak migration from WildFly to Quarkus framework"

Deck location: `index.html#keycloak` (content in `assets/js/data.js`, panel id `keycloak`; renderer `render.keycloak` in `assets/js/app.js`).

**Primary source (S1):** Pramod Sultane, *How I Migrated Keycloak from Wildfly to Quarkus* —
https://pramodsultane.qzz.io/posts/keycloak-wildfly-to-quarkus.html (sections cited by their on-page anchors).

**Deck sources (S2):** existing panels in `assets/js/data.js` — `chatbot` (runbook list) and `leadership` (Keycloak reliability roadmap item).

No code from S1 is reproduced in the deck. Nothing is shown that is not in S1/S2; derived numbers are marked as derived.

## Claims → sources

| # | Claim on the slide | Source | Notes |
|---|---|---|---|
| 1 | Production Keycloak IAM service on the Technical Platform | S1 intro ("Our team at the Technical Platform…", "make it work smoothly in production"); S1 `#why-quarkus` ("production IAM platform running in Kubernetes") | |
| 2 | WildFly runtime dropped from Keycloak v17; WildFly reaching end of support | S1 intro | |
| 3 | Target: Quarkus-based Keycloak 22.0 (`quay.io/keycloak/keycloak:22.0`) | S1 `#build-model` (Dockerfile base image) | Version taken from the article's Dockerfile example. |
| 4 | Source: `jboss/keycloak` image; exact version **not stated** | S1 `#checklist` ("Update Docker base image from jboss/keycloak…") | Source version deliberately flagged as unknown. |
| 5 | Cold start ~5–10 s vs ~60–90 s | S1 `#why-quarkus` comparison table | S1 stat card shows "~8s"; the deck uses the table range. Labelled "reported from team testing". |
| 6 | Image ~250 MB vs ~700 MB; idle memory ~350 MB vs ~800 MB | S1 `#why-quarkus` table and stat cards | Same label as #5. |
| 7 | "20 env variables affected: 13 renamed · 2 removed · 5 new" | S1 `#env-vars` — Changed (13 rows), Removed (2 rows), New (5 rows) tables | **Derived count** (sum of table rows). |
| 8 | Platform: Kubernetes, PostgreSQL, JGroups DNS_PING, Infinispan, custom themes | S1 `#helm-changes`, `#cache`, `#paths` | |
| 9 | Before/after architecture layers (runtime, image, startup, config, paths, clustering) | S1 `#why-quarkus`, `#build-model`, `#paths`, `#helm-changes`, `#cache` | Request path (clients → ingress → pods → PostgreSQL) summarises S1 `#auth-path` and `#helm-changes`. |
| 10 | Breaking change: default path `/auth` → `/`; resolved by build-time `KC_HTTP_RELATIVE_PATH=/auth` with no client changes | S1 `#auth-path` (Option A), `#build-model` warning, `#lessons` #2 | |
| 11 | Two-phase build model; build-time options ignored if set only in K8s | S1 `#build-model`, `#lessons` #2 | |
| 12 | Env var mapping applied in Helm values and Secrets (e.g. `DB_*` → `KC_DB_*`) | S1 `#env-vars`, `#helm-changes` | |
| 13 | `CACHE_OWNERS_*` removed → Infinispan XML (2 owners) via ConfigMap + `KC_CACHE_CONFIG_FILE` | S1 `#env-vars` (Removed), `#cache` | |
| 14 | Strict hostname; `KC_HOSTNAME` FQDN; `hostname-strict=false` only dev/test | S1 `#env-vars` (New), `#lessons` #3 | |
| 15 | `PROXY_ADDRESS_FORWARDING` → `KC_PROXY=edge`; `KEYCLOAK_STATISTICS` → `KC_METRICS_ENABLED`; dashboards/alerts updated | S1 `#env-vars`, `#helm-changes`, `#checklist` | |
| 16 | JGroups DNS_PING moved to `JAVA_OPTS` | S1 `#env-vars`, `#helm-changes`, `#lessons` #5 | |
| 17 | Theme path and `keycloak.properties` → `keycloak.conf` | S1 `#paths` | |
| 18 | Affected components list (Dockerfile, Helm, Secrets, ConfigMap, ingress/health checks, themes, JGroups, PostgreSQL, monitoring, OIDC clients, CI/CD) | S1 intro (CI/CD), `#helm-changes`, `#cache`, `#paths`, `#auth-path` Option B list, `#checklist`, `#conclusion` | |
| 19 | Risks & mitigations (path outage, silent misconfig, session replication, redirect failures, monitoring blind spot, slow restarts ~30 s) | S1 `#auth-path`, `#lessons` #1–#4, `#cache`, `#checklist` | Risk framing is a summary of S1 content. |
| 20 | Five-phase approach (Assess → Rebuild image → Remap configuration → Cluster & cache → Validate & cut over) | S1 `#checklist` grouped into phases | **Derived grouping**; dates/durations flagged as not stated. |
| 23 | Outcomes: supported runtime, faster recovery/scaling, leaner footprint, no client re-work, simpler operations | S1 intro, `#why-quarkus`, `#auth-path` Option A, `#conclusion` | Performance outcomes repeat #5–#6 as "reported". |

Claims 21, 22 and 24–27 (validation steps, lessons learned, next steps) were removed from the slide on request; the source link and "Not stated in source" block were also removed.

## Not stated in source (no longer shown on slide)

- Exact source Keycloak version
- Migration dates and duration
- Number of environments and registered clients
- Integration-test results / pass rates
- Downtime or incident figures during cut-over

## Validation performed

- `node validate.js`: all new Keycloak checks pass (2nd position, kicker `02`, 4 metrics matching S1 figures, "reported" disclaimer, 22.0 target, 2-column architecture, 8 change rows, 6 risks, 5 phases, 5 outcomes placed before scope, no test-result claims, no code blocks, removed sections absent). Panel-count checks updated 6 → 7.
- 3 remaining failures are pre-existing and unrelated: `9 component cards` (the `components` panel has no data), `no external script/style refs` (Google Fonts link in `index.html`), `no orphaned CSS classes` (`is-done`/`is-todo` set through a ternary the scanner cannot see).
- Visual check: headless Chrome render at 1440 px (dark theme) reviewed.
