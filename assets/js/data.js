/* Content source: Pramod_ITExpert_UseCases.docx
   Every value below is traceable to that document. Nothing is invented. */

const PORTFOLIO = {
  profile: {
    name: 'Pramod Sultane',
    framing: 'IT Expert Application',
    links: {
      blog: 'https://pramodsultane.qzz.io/',
      github: 'https://github.com/pramodsultane',
      maturityPortal: 'https://devops-maturity-assessment-portal.pages.dev/',
      hackathon: 'https://smartec-ai-hackfest.pages.dev/'
    }
  },

  presentationOrder: ['hero', 'keycloak', 'chatbot', 'components', 'maturity', 'transmission', 'learning', 'leadership'],

  panels: [
    /* ---------------------------------------------------------- 1. HERO */
    {
      id: 'hero',
      nav: 'Overview',
      render: 'hero',
      kicker: '',
      title: 'IT Expert Application',
      lede: '',
      heroImage: 'assets/img/xpert.png',
      heroImageAlt: 'DOTI XPERT management of expertise for IT and digital',
      content: {
        pillars: [
          { title: 'GenAI for SDLC', body: 'RAG documentation chatbot and ten AI-assisted GitLab CI components in production use.' },
          { title: 'Delivery acceleration', body: 'DevOps maturity assessment, tooling gap analysis and guardrail implementation across ENGAGE.' },
          { title: 'Capability building', body: 'Community of practice leadership, M2M training programme and cross-entity DevOps coaching.' }
        ]
      }
    },

    /* ------------------------------------------------------- 2. RAG CHATBOT */
    {
      id: 'chatbot',
      nav: 'RAG Chatbot',
      render: 'chatbot',
      kicker: '03 \u2014 Flagship use case \u00b7 Completed',
      title: 'RAG chatbot for technical documentation',
      lede: 'A production RAG assistant for the CORTEX Technical Platform documentation at docs.tid.michelin.com. It turns the Docusaurus knowledge base into a self-service interface for developers, with an initial 50-developer target cohort and a path to a governed, reusable organisational capability.',
      content: {
        metrics: [
          { value: 'Apr 2026', label: 'Production go-live', note: 'CORTEX documentation assistant', tone: 'cyan' },
          { value: '~100', label: 'Unique users', note: 'Approximate reported usage to date', tone: 'mint' },
          { value: '~20', label: 'Queries per day', note: 'Approximate reported volume', tone: 'amber' },
          { value: '4.50 / 5', label: 'Average satisfaction', note: '14 survey responses', tone: 'mint' }
        ],
        problemSolutions: [
          {
            problem: 'Fragmented technical knowledge',
            contribution: 'RAG retrieves passages from indexed Markdown and answers questions in context, reducing manual searches across documentation.'
          },
          {
            problem: 'Repeated questions and slow onboarding',
            contribution: 'Self-service answers let developers and new joiners find existing guidance without waiting for a colleague.'
          },
          {
            problem: 'Slow incident documentation lookup',
            contribution: 'The chatbot can surface relevant troubleshooting guidance faster when engineers need it.'
          }
        ],
        story: [
          { step: 'What I did', body: 'Designed and implemented a production RAG chatbot embedded in the CORTEX documentation site, answering questions directly from the live docs corpus.' },
          { step: 'How I did it', body: 'FAISS vector index built from markdown docs, a Python RAG engine exposed over REST, a React chat widget in Docusaurus, and a 2-replica HA Kubernetes deployment delivered through GitLab CI/CD with smoke tests.' },
          { step: 'Evidence so far', body: 'Reported usage: ~100 unique users and ~20 queries/day since April 2026. Survey: 4.50 / 5 (14 responses). Estimated impact (not instrumented): ~20-30% less time spent searching for information and an estimated ~25-40% lower MTTR.' }
        ],
        surveyQuotes: [
          'The response is faster, no additional assumptions shared, reference section is useful. Link to the reference could be added to redirect user to the required document.',
          'Searching any specific data on docs is now easy and time saving.',
          'Accurate and adequate detailed response to precise questions is good by bot.'
        ],
        responseEvidence: {
          src: 'responses.png',
          alt: 'Survey dashboard showing 14 responses to an overall satisfaction question and an average rating of 4.50 out of 5.',
          caption: 'Overall satisfaction: 14 responses, average rating 4.50 / 5.'
        },
        diagrams: [
          {
            src: 'assets/img/system-architecture.webp',
            title: 'System architecture',
            caption: 'High-level system architecture: React ChatWidget in the Docusaurus site calling the chatbot service over REST, NGINX ingress into a Kubernetes cluster, chat-agent pod running the RAG engine and FAISS index, with configuration held in a K8s secret and inference served by Azure OpenAI.'
          },
          {
            src: 'assets/img/devops-lifecycle.webp',
            title: 'DevOps lifecycle integration',
            caption: 'GitLab CI/CD pipeline integration across check, build, publish, deploy and clean stages \u2014 including FAISS index build, Docker image build, smoke-test API validation, GitLab Pages publication and zero-downtime rollout across 2 replicas.'
          }
        ],
        deliverablesTitle: 'Implementation roadmap \u2014 all delivered',
        deliverables: [
          { name: 'FAISS vector index', desc: 'Build memory from markdown docs' },
          { name: 'Chat backend service', desc: 'Python RAG engine with REST API' },
          { name: 'React chat widget', desc: 'Floating chat UI in Docusaurus' },
          { name: 'Kubernetes deployment', desc: '2-replicas HA deployment' },
          { name: 'GitLab CI/CD pipeline', desc: 'Automated build, test, deploy' },
          { name: 'Smoke tests', desc: 'API validation before production' },
          { name: 'Local development script', desc: 'Docker-based local testing' }
        ],
        futureTitle: 'Scale-up priorities',
        future: [
          {
            group: 'Measurement & governance',
            items: [
              'Track usage, answer quality, feedback and unanswered questions.',
              'Establish documentation owners, freshness checks and a support model.'
            ]
          },
          {
            group: 'Enterprise knowledge coverage',
            items: [
              'Expand to approved GitLab repositories, Confluence and wikis while respecting access permissions.',
              'Use recurring unanswered questions to prioritize documentation gaps.'
            ]
          },
          {
            group: 'Advanced RAG capabilities',
            items: [
              'Evaluate hybrid retrieval and multimodal indexing against measured answer-quality needs.',
              'Explore cross-repository knowledge relationships after governance and quality gates are in place.'
            ]
          }
        ],
        runbookTitle: 'Operational knowledge in the documentation',
        runbookLede: 'The indexed documentation includes operational runbooks that can be searched through the assistant. This is a knowledge-access capability, not a measured incident-recovery improvement.',
        runbooks: [
          'Certificates generation, renewal and installation',
          'Database outage runbook',
          'Kubernetes deployment rollback runbook',
          'High CPU runbook',
          'Keycloak issues \u2014 how to react?',
          'On-call escalation runbook'
        ],
        runbookShift: [
          { from: 'Runbooks spread through documentation', to: 'Searchable guidance with references' },
          { from: 'Incident lookup depends on memory', to: 'Existing procedures easier to find' }
        ],
        reference: 'GitLab MR \u2014 feat(chatbot) !215 \u00b7 Cortex / TID / Apps / Pages'
      }
    },

    /* ------------------------------------------------------- 6. MATURITY */
    {
      id: 'maturity',
      nav: 'DevOps Maturity',
      render: 'maturity',
      kicker: '04 \u2014 Flagship use case \u00b7 In progress',
      title: 'Transforming ENGAGE DevOps culture & tooling',
      lede: 'An assessment of 3 ENGAGE teams and 20+ repositories places DevOps maturity at 32% \u2014 Developing, Level 2 of 5. Branch protection, quality gates and Vault are now in place across every pipeline; security scanning, secrets hygiene, GitOps and observability remain the gaps. Target: 80% overall, with every domain at 80%+, by end of Q4 2027.',
      content: {
        risk: 'A private key committed to Git has not yet been rotated, Python 3.10 reaches end of life this month with no migration plan, and pipelines run no security scanning.',
        total: { actual: 35, max: 110, percent: 32, rating: 'Developing', target: 80, targetDate: 'end of Q4 2027' },
        scaleOut: [
          'Assessment covers 3 teams and 20+ repositories.',
          'The maturity portal is used by the ENGAGE team only so far and can be offered to other teams as a standard self-assessment.',
          'Vault is already integrated in every pipeline \u2014 the same shared-template rollout can deliver security scanning, Renovate and GitOps.'
        ],
        domains: [
          { name: 'Delivery Standards', max: 30, actual: 14, percent: 47, rating: 'Maturing', tone: 'cyan' },
          { name: 'Code Quality Standards', max: 15, actual: 6, percent: 40, rating: 'Developing', tone: 'cyan' },
          { name: 'Secrets Management', max: 10, actual: 0, percent: 0, rating: 'Beginner \u2014 CRITICAL', tone: 'coral' },
          { name: 'Testing Standards', max: 10, actual: 4, percent: 40, rating: 'Developing', tone: 'cyan' },
          { name: 'Obsolescence / Dependency Management', max: 10, actual: 0, percent: 0, rating: 'Beginner \u2014 CRITICAL', tone: 'coral' },
          { name: 'Certificate Management', max: 10, actual: 0, percent: 0, rating: 'Beginner', tone: 'coral' },
          { name: 'Security & Compliance', max: 15, actual: 3, percent: 20, rating: 'Beginner \u2014 HIGH RISK', tone: 'coral' },
          { name: 'Reusability & Standardization', max: 10, actual: 8, percent: 80, rating: 'Advanced', tone: 'mint' }
        ],
        methodNote: 'Scope: 3 ENGAGE teams and 20+ repositories. The AS-IS landscape was established through combined repository-level analysis and the ENE DevOps organizational assessment checklist. All maturity scores are based on the five-level model. The TO-BE view presents a domain-by-domain comparison of current state against the target enterprise DevOps architecture.',
        diagrams: [
          {
            src: 'assets/img/as-is-landscape.webp',
            title: 'AS-IS \u2014 current DevOps landscape',
            caption: 'Repository-level analysis of the current landscape: unprotected branches, partially enforced merge requests, pipeline standardization gaps, absent security scanning, unintegrated HashiCorp Vault, and observability and operations gaps across monitoring, logging, certificate and dependency management.'
          },
          {
            src: 'assets/img/to-be-architecture.webp',
            title: 'TO-BE \u2014 proposed future architecture',
            caption: 'Target enterprise DevOps architecture presented as a domain-by-domain comparison against the current state.'
          }
        ],
        progressTitle: 'Current progress',
        progress: [
          { name: 'GitLab Workflow', status: 'Done', tone: 'mint' },
          { name: 'Branch Protection', status: 'Done', tone: 'mint' },
          { name: 'Merge Request Standards', status: 'Done', tone: 'mint' },
          { name: 'Binary Repository to JFrog', status: 'Done', tone: 'mint' },
          { name: 'SonarQube Integration', status: 'Done', tone: 'mint' },
          { name: 'Quality Gate Enforcement', status: 'Done', tone: 'mint' },
          { name: 'Mandatory Pipeline Success', status: 'Done', tone: 'mint' },
          { name: 'Vault with CI/CD Pipeline Integration', status: 'Done', tone: 'mint' },
          { name: 'Renovate Bot for Automated MRs', status: 'In Progress', tone: 'amber' },
          { name: 'ACME Automation & Certificate Monitoring', status: 'In Progress', tone: 'amber' },
          { name: 'GitLab Approval Policies', status: 'In Progress', tone: 'amber' },
          { name: 'Shared CI/CD Jobs', status: 'In Progress', tone: 'amber' },
          { name: 'Pipeline with Standards', status: 'In Progress', tone: 'amber' },
          { name: 'GitOps: ArgoCD', status: 'Not Started', tone: 'coral' },
          { name: 'Grafana Observability', status: 'Not Started', tone: 'coral' },
          { name: 'AI in SDLC', status: 'Not Started', tone: 'coral' }
        ],
        challenges: [
          {
            title: 'Guardrails in place, release still manual',
            value: '1 d',
            valueNote: 'per monthly release (estimate) \u00b7 target 1\u20132 h',
            evidence: [
              'Branch protection, merge-request standards, SonarQube quality gates and mandatory pipeline success are now enforced.',
              'Production promotion is still manual with no audit trail, and shared pipeline templates are still being rolled out.'
            ],
            response: 'Finish the shared CI/CD templates and standard pipeline, then automate production promotion with an audit trail.',
            tone: 'cyan'
          },
          {
            title: 'Slow incidents that nobody can measure',
            value: '2-3 days',
            valueNote: 'per incident (estimate) \u00b7 target about 4 h',
            evidence: [
              'No runbooks or documented rollback steps, and observability is limited.',
              'There is no DORA baseline, so real recovery time cannot be measured.'
            ],
            response: 'Automate rollback with a fast-track hotfix path, write runbooks, and set a DORA baseline that includes MTTR.',
            tone: 'amber'
          },
          {
            title: 'Secrets handling is a blind spot',
            value: 'Secrets Committed in Git',
            valueNote: 'Vault now integrated in every pipeline \u00b7 history not cleaned',
            evidence: [
              'No Secret detection tool integrated, with no audit trail.',
              'No Secret scanning.'
            ],
            response: 'Purge committed secrets from Git history, add secret detection on every push, and make scans mandatory.',
            tone: 'coral'
          },
          {
            title: 'A hard runtime deadline',
            value: 'Oct 2026',
            valueNote: 'Python 3.10 end of life \u00b7 this month',
            evidence: [
              'Python 3.10 reaches end of life in October 2026; a Python 3.12 migration has not been planned yet.',
              'Dependencies are updated by hand, so upgrades arrive as deadlines.'
            ],
            response: 'Plan and schedule the Python 3.12 migration now, then automate updates with Renovate and blocking dependency scans.',
            tone: 'mint'
          },
          {
            title: 'Security scanning scores zero',
            value: '5 missing',
            valueNote: 'security scans \u00b7 each scored 0/5',
            evidence: [
              'SAST, container, dependency, licence and secret scanning are all absent; the pipeline\u2019s security stage is empty.',
              'Packages ship with no dependency scan, licence compliance check or secret detection.'
            ],
            response: 'Turn on the shared security templates in every pipeline and block merges on critical findings.',
            tone: 'coral'
          },
          {
            title: 'No proof of what is signed or deployed',
            value: 'Unsigned',
            valueNote: 'container images \u00b7 no provenance attestation',
            evidence: [
              'Images in the GitLab container registry are not signed and carry no provenance attestation.',
              'Builds have no base-image scanning or CIS hardening evidence.'
            ],
            response: 'Sign images and attach provenance in the pipeline, scan base images, and allow only signed images to deploy.',
            tone: 'amber'
          },
          {
            title: 'Production changes without GitOps',
            value: 'Manual',
            valueNote: 'uat and prod deploys \u00b7 GitOps 0/5',
            evidence: [
              'Only dev deploys automatically; uat is manual and prod is manual on tag, using imperative deploys.',
              'There is no GitOps controller or Helm, and secrets in Kubernetes manifests are a risk.'
            ],
            response: 'Adopt a GitOps controller so every environment is promoted through a reviewed merge, with secrets pulled from Vault.',
            tone: 'cyan'
          },
          {
            title: 'No visibility once code is live',
            value: '0 / 5',
            valueNote: 'monitoring \u00b7 logging \u00b7 observability',
            evidence: [
              'No dashboards, alerting or centralised logging stack.',
              'No Prometheus, Grafana or OpenTelemetry, so problems are found late, possibly by users.'
            ],
            response: 'Roll out Prometheus, Grafana and alerting with runbook links, plus centralised logging.',
            tone: 'mint'
          }
        ],
        challengesTitle: 'Challenges and response \u00b7 mcc-integration',
        salesforceChallengesTitle: 'Challenges and response \u00b7 Salesforce ENGAGE repository',
        salesforceChallenges: [
          {
            title: 'A live private key in Git history',
            value: 'Critical',
            valueNote: 'RSA private key committed \u00b7 not yet rotated',
            evidence: [
              'A private key sits in plain text and is reachable in Git history, so it must be treated as compromised; it has not yet been rotated.',
              'Further certificate and key material exists in other release folders.'
            ],
            response: 'Rotate or revoke the key now, purge it with the documented history-cleaning procedure, move secrets to Vault, and scan every push for secrets.',
            tone: 'coral'
          },
          {
            title: 'A repository too heavy to manage',
            value: '4.6 GB',
            valueNote: '.git size from committed binaries',
            evidence: [
              'Videos, images and .jar tools are committed directly to Git.',
              '1,625 remote branches with no cleanup policy make it hard to know what is stale or safe to deploy.'
            ],
            response: 'Move binaries to cloud Storage or an artifact store and introduce a branch naming and cleanup policy.',
            tone: 'amber'
          },
          {
            title: 'No map for new joiners',
            value: 'No README',
            valueNote: 'nor CONTRIBUTING or ADR files',
            evidence: [
              'Operational knowledge lives in per-ticket deployment step files rather than a structured runbook.',
              'sfdx-project.json, CODEOWNERS and .forceignore are excluded through .gitignore, so governance rules are not shared.'
            ],
            response: 'Add a README and a structured deployment runbook, then track governance files and require CODEOWNERS reviews.',
            tone: 'mint'
          },
          {
            title: 'Too big to review safely',
            value: '176K',
            valueNote: 'tracked files \u00b7 100,001 role files',
            evidence: [
              '176,365 tracked files, 170,481 of them under src, plus 506 release folders.',
              'Ownership and change boundaries are unclear, so reviews are noisy and risk is hard to triage.'
            ],
            response: 'Confirm whether role metadata must be versioned at this scale, and split ownership and CI by product area.',
            tone: 'cyan'
          },
        ],
        portalNote: 'Assessment scored using a DevOps Maturity Assessment portal I built.'
      }
    },

    /* ------------------------------------------------ 4. KEYCLOAK MIGRATION
       Source: https://pramodsultane.qzz.io/posts/keycloak-wildfly-to-quarkus.html
       Evidence map: docs/keycloak-migration-evidence.md */
    {
      id: 'keycloak',
      nav: 'Keycloak Migration',
      render: 'keycloak',
      kicker: '02 \u2014 Platform modernisation \u00b7 Identity & access management',
      title: 'Keycloak migration from WildFly to Quarkus framework',
      lede: 'Re-platformed the Technical Platform\u2019s production Keycloak IAM service from the end-of-life WildFly runtime to the Kubernetes-native Quarkus distribution \u2014 rebuilding the container image, remapping the full configuration surface and updating the existing deployment, while preserving the legacy /auth path so existing clients need no changes.',
      content: {
        metrics: [
          { value: '~5\u201310 s', label: 'Cold start', note: 'vs ~60\u201390 s on WildFly', tone: 'mint' },
          { value: '~250 MB', label: 'Container image', note: 'vs ~700 MB on WildFly', tone: 'cyan' },
          { value: '~350 MB', label: 'Idle memory', note: 'vs ~800 MB on WildFly', tone: 'cyan' },
          { value: '20', label: 'Env variables affected', note: '13 renamed \u00b7 2 removed \u00b7 5 new', tone: 'amber' }
        ],
        metricsNote: 'Performance figures are approximate values reported from team testing in the source article; they are not independently instrumented in this deck.',
        scope: [
          { k: 'From', v: 'WildFly-based Keycloak image (jboss/keycloak) \u2014 exact source version not stated in source' },
          { k: 'To', v: 'Quarkus-based Keycloak 22.0 (quay.io/keycloak/keycloak:22.0)' },
          { k: 'Why now', v: 'WildFly runtime dropped from Keycloak v17 onward and reaching end of support; Quarkus brings faster startup and a smaller footprint' },
          { k: 'Platform', v: 'Kubernetes \u00b7 PostgreSQL \u00b7 JGroups DNS_PING clustering \u00b7 Infinispan distributed cache \u00b7 custom themes' }
        ],
        flow: ['OIDC clients & apps', 'Ingress / proxy', 'Keycloak pods', 'PostgreSQL'],
        architecture: [
          {
            label: 'Before \u00b7 WildFly',
            tone: 'coral',
            layers: [
              { k: 'Runtime', v: 'Full Java EE application server' },
              { k: 'Image', v: 'jboss/keycloak \u00b7 ~700 MB' },
              { k: 'Startup', v: 'All configuration resolved at runtime \u00b7 ~60\u201390 s cold start' },
              { k: 'Config', v: 'Legacy env vars + XML \u00b7 conf/keycloak.properties' },
              { k: 'Paths', v: '/auth by default \u00b7 themes in /opt/jboss/keycloak/themes' },
              { k: 'Clustering', v: 'JGROUPS_DISCOVERY_* env vars \u00b7 cache owners via CACHE_OWNERS_*' }
            ]
          },
          {
            label: 'After \u00b7 Quarkus',
            tone: 'mint',
            layers: [
              { k: 'Runtime', v: 'Kubernetes-native Quarkus distribution' },
              { k: 'Image', v: 'Two-stage build: kc.sh build bakes DB vendor, /auth path and themes \u00b7 ~250 MB' },
              { k: 'Startup', v: 'kc.sh start on a pre-built image \u00b7 ~5\u201310 s cold start' },
              { k: 'Config', v: 'KC_* env vars + conf/keycloak.conf' },
              { k: 'Paths', v: '/auth preserved via build-time KC_HTTP_RELATIVE_PATH \u00b7 themes in /opt/keycloak/themes' },
              { k: 'Clustering', v: 'JGroups DNS_PING via JAVA_OPTS \u00b7 Infinispan XML from a ConfigMap via KC_CACHE_CONFIG_FILE' }
            ]
          }
        ],
        changes: [
          { change: 'Default path moved from /auth to /', impact: 'Every OIDC client, redirect URI, ingress rule and health check would break.', fix: 'Kept /auth by setting KC_HTTP_RELATIVE_PATH at image build time \u2014 no client-side changes.', tone: 'coral' },
          { change: 'Two-phase build model', impact: 'Build-time options set only in Kubernetes env vars are silently ignored.', fix: 'Multi-stage Dockerfile runs kc.sh build with build-time options baked into the image.', tone: 'coral' },
          { change: 'Environment variable naming', impact: '13 variables renamed; one missed rename breaks database, admin or proxy configuration.', fix: 'Applied the complete old-to-new mapping across Helm values and Kubernetes Secrets (e.g. DB_* \u2192 KC_DB_*).', tone: 'amber' },
          { change: 'Cache-owner variables removed', impact: 'CACHE_OWNERS_* have no direct equivalent, so session replication settings would be lost.', fix: 'Custom Infinispan XML (2 owners for sessions) mounted from a ConfigMap via KC_CACHE_CONFIG_FILE.', tone: 'amber' },
          { change: 'Strict hostname verification', impact: 'Requests not matching the configured hostname fail with hard-to-debug redirects.', fix: 'KC_HOSTNAME set to the service FQDN; hostname-strict=false only in dev/test.', tone: 'amber' },
          { change: 'Proxy and metrics settings', impact: 'Header forwarding and the statistics endpoint use new options and formats.', fix: 'PROXY_ADDRESS_FORWARDING \u2192 KC_PROXY=edge; KEYCLOAK_STATISTICS \u2192 KC_METRICS_ENABLED; dashboards and alerts updated.', tone: 'cyan' },
          { change: 'Cluster discovery configuration', impact: 'JGROUPS_DISCOVERY_* variables no longer exist.', fix: 'JGroups DNS_PING settings moved into JAVA_OPTS \u2014 clustering behaviour retained.', tone: 'cyan' },
          { change: 'File and path layout', impact: 'Theme directory and configuration file moved.', fix: 'Dockerfile COPY paths and mounts updated; keycloak.properties \u2192 keycloak.conf.', tone: 'cyan' }
        ],
        components: [
          'Dockerfile (multi-stage)', 'Helm values', 'Kubernetes Secrets', 'ConfigMap \u00b7 Infinispan cache',
          'Ingress / proxy rules & health checks', 'Custom themes', 'JGroups clustering', 'PostgreSQL connection',
          'Monitoring dashboards & alerting', 'OIDC clients & redirect URIs', 'CI/CD pipelines'
        ],
        risks: [
          { title: 'Client outage from the path change', mitigation: 'Preserve /auth at build time (Option A); defer any root-path move to a coordinated client migration.', tone: 'coral' },
          { title: 'Silent misconfiguration', mitigation: 'Bake build-time options into the image; validate env vars first with a start --auto-build run.', tone: 'coral' },
          { title: 'Loss of session replication', mitigation: 'Replace CACHE_OWNERS_* with an explicit Infinispan cache configuration.', tone: 'amber' },
          { title: 'Redirect failures in lower environments', mitigation: 'Set KC_HOSTNAME everywhere; relax hostname-strict only outside production.', tone: 'amber' },
          { title: 'Monitoring blind spot', mitigation: 'Update dashboards and alerting rules for the new metrics endpoint format.', tone: 'cyan' },
          { title: 'Slow restarts', mitigation: 'Two-stage build removes the ~30 s build penalty on every container restart.', tone: 'cyan' }
        ],
        phases: [
          { name: 'Assess', body: 'Mapped every environment variable as new, renamed or removed.' },
          { name: 'Rebuild image', body: 'Moved to the quay.io base, added the kc.sh build stage and updated theme paths.' },
          { name: 'Remap configuration', body: 'Updated Helm values, Secrets, keycloak.conf, proxy, hostname and metrics.' },
          { name: 'Cluster & cache', body: 'JGroups via JAVA_OPTS; Infinispan XML delivered through a ConfigMap.' },
          { name: 'Validate & cut over', body: 'OIDC discovery, client integration tests, health checks and dashboards.' }
        ],
        phaseNote: 'Sequence derived from the source migration checklist. Calendar dates and durations are not stated in the source.',
        outcomes: [
          { title: 'Supported, future-proof runtime', body: 'IAM moved off end-of-life WildFly onto the vendor\u2019s go-forward Quarkus distribution, reducing obsolescence risk.', tone: 'mint' },
          { title: 'Faster recovery and scaling', body: 'Reported cold start of ~5\u201310 s versus ~60\u201390 s lets pods restart and scale out far sooner on Kubernetes.', tone: 'cyan' },
          { title: 'Leaner footprint', body: 'Reported image ~250 MB and idle memory ~350 MB, down from ~700 MB and ~800 MB.', tone: 'cyan' },
          { title: 'No client re-work', body: 'Preserving /auth kept existing clients, redirect URIs and OIDC discovery endpoints unchanged.', tone: 'mint' },
          { title: 'Simpler operations', body: 'A single env-var + keycloak.conf model, aligned with how Kubernetes-native applications are built and deployed.', tone: 'amber' }
        ]
      }
    },

    /* ---------------------------------------------- 7. KNOWLEDGE TRANSMISSION */
    {
      id: 'transmission',
      nav: 'Knowledge & Reach',
      render: 'transmission',
      kicker: '05 \u2014 Knowledge transmission',
      title: 'Scaling expertise beyond myself',
      lede: 'Coaching, teaching and publishing that turn individual capability into organisational capability \u2014 reaching approximately 522 people across eleven sessions in 2025 and 2026.',
      content: {
        streams: [
          { label: 'Coaching technique \u00b7 2026', body: 'Implemented DevOps standards in GitLab CI and Kubernetes for the EC/ENGAGE team.' },
          { label: 'Publications \u00b7 2026', body: 'Blogs on Cloud & DevOps Engineering.' },
          { label: 'Teaching \u00b7 2025', body: 'Delivered 4 DevOps sessions under the Michelin M2M programme.' },
          { label: 'Professional memberships', body: 'External Project Examiner at COEP Pune; DevOps trainer at MIT Academy of Engineering, Pune.' }
        ],
        influenceTitle: 'Influence on decisions outside the entity \u00b7 2025, 2026 \u2014 BS/EC/ENGAGE programme',
        influence: [
          'Built a Grafana dashboard for CRMA EU ASD data pipeline monitoring.',
          'Upgraded and deployed Seismic applications via Microsoft Intune.',
          'Conducted a DevOps maturity assessment for GitLab & GitHub repos.',
          'Provided DevOps support for the Squalex AI Portal (Michelin legal AI assistant).'
        ],
        timelineTitle: 'Delivery timeline \u2014 trainings & presentations',
        timelineNote: 'Audience sizes are approximate, as recorded in the source.',
        sessions: [
          { date: '24/02/2025', type: 'Training', title: 'DevOps in Action \u2013 Introduction', audience: 'Michelin Employees \u00b7 M2M sessions', people: 20 },
          { date: '11/03/2025', type: 'Training', title: 'DevOps in Action \u2013 Git', audience: 'Michelin Employees \u00b7 M2M sessions', people: 30 },
          { date: '30/04/2025', type: 'Training', title: 'DevOps in Action \u2013 Terraform', audience: 'Michelin Employees \u00b7 M2M \u00b7 Workday ZIE193', people: 20 },
          { date: '27/06/2025', type: 'Presentation', title: 'End-to-End Monitoring with Grafana: Dashboards, Alerting, and Incident', audience: 'DOTI TECH Monthly', people: 200 },
          { date: '13/07/2025', type: 'Training', title: 'DevOps in Action \u2013 Docker', audience: 'Michelin Employees \u00b7 M2M \u00b7 Workday ZIE204', people: 30 },
          { date: '20/09/2025', type: 'Training', title: 'End-to-End Monitoring with Grafana', audience: 'GTO Security Team', people: 12 },
          { date: '03/04/2026', type: 'Presentation', title: 'JIRA Review Agent for reviewing stories/epics', audience: 'DOTI/BS/C Leaders & Managers', people: 10 },
          { date: '30/04/2026', type: 'Presentation', title: 'Carbon Awareness Engineering (Green IT)', audience: 'PSDM Hackathon \u00b7 with Dhruva Vardhan', people: 50 },
          { date: '25/06/2026', type: 'Presentation', title: 'How LLMs Work, LLM Selection Strategy, GitHub Token Policy, Superpowers GitHub repo', audience: 'Pune DevOps Community', people: 50 },
          { date: '13/08/2026', type: 'Presentation', title: 'Show & tell on AI ChatBot for Documentation', audience: 'Pune DOTI', people: 70 },
          { date: '17/09/2026', type: 'Training', title: 'Kubernetes for DevOps', audience: 'Michelin Employees \u00b7 M2M sessions', people: 30 }
        ],
        recognitionTitle: 'Recognition & external solicitation',
        recognition: [
          { year: '09/2026', body: 'Certified GenAI Local Champions', tone: 'mint' },
          { year: '2025', body: 'Recognized by LinkedIn as a Top Voice in Cloud Computing for high-quality contributions to collaborative articles.', tone: 'amber' },
          { year: '2024', body: 'Secured 2nd position in the DOTI Pune Waste Walk Contest for automating repetitive user tasks.', tone: 'amber' },
          { year: '05/2024', body: 'Shared DevOps career guidance and opportunities with engineering students.', tone: 'cyan' },
          { year: '02/2026', body: 'Helped the Pune SMI team implement DevOps standards in GitLab and Kubernetes applications.', tone: 'cyan' }
        ]
      }
    },

    /* -------------------------------------------------------- 8. LEARNING */
    {
      id: 'learning',
      nav: 'Learning',
      render: 'learning',
      kicker: '06 \u2014 Develop & maintain knowledge',
      title: 'Staying at the technical frontier',
      lede: 'Community leadership, conference exposure, formal certification and structured self-study across cloud, security and AI engineering.',
      content: {
        highlight: { label: 'Network animation \u00b7 2026', body: 'Leading the Pune DevOps Community of Practice.' },
        conferences: [
          { name: 'AWS Community Days Pune', when: '09/2023, 08/2024, 08/2025, 03/2026', note: 'Peer-to-peer technical sessions on AWS, GenAI and DevOps.' },
          { name: 'Gartner Security & Risk Management Summit', when: '03/2026', note: 'Insights on AI, cloud security and threat strategies.' },
          { name: 'AWS Summit Mumbai', when: '28/05/2026', note: 'Hands-on sessions on cloud migration and AI.' },
          { name: 'MongoDB Local Mumbai', when: '18/09/2025', note: 'Modern app development and database scaling.' },
          { name: 'MongoDB Local Mumbai', when: '06/10/2026', note: 'Modern app development and database scaling.' },
          { name: 'OpenText Tech Horoscope 2026', when: '22\u201323/05/2026', note: 'Elevate Together: Secure Information Management for AI.' }
        ],
        credentials: [
          { name: 'AZ-104 \u2014 Microsoft Certified: Azure Administrator Associate', when: '2025', tone: 'cyan' },
          { name: 'Anthropic Certificates', when: '2026', tone: 'mint' }
        ],
        kubestronaut: {
          label: 'Kubestronaut path',
          done: 2,
          steps: [
            { code: 'KCNA', name: 'Kubernetes and Cloud Native Associate', when: '08/2026', done: true },
            { code: 'CKA', name: 'Certified Kubernetes Administrator', when: '10/2026', done: true },
            { code: 'CKAD', name: 'Certified Kubernetes Application Developer', when: 'In progress', done: false },
            { code: 'KCSA', name: 'Kubernetes and Cloud Native Security Associate', when: 'Planned', done: false },
            { code: 'CKS', name: 'Certified Kubernetes Security Specialist', when: 'Planned', done: false }
          ]
        },
        reading: {
          label: 'O\u2019Reilly reading \u00b7 2026',
          items: ['The AI-Enabled SDLC', 'AI-Native Software Delivery', 'Prompt Engineering for Generative AI', 'AI Engineering']
        },
        training: [
          { label: 'AWS Skills Builder & GO1 \u00b7 2023\u20132026', body: 'Trainings on AWS, Azure, Kubernetes, GitLab, DevOps tools, and communication/managerial skills.' },
          { label: 'AI for Bharat (Hack2Skill) \u00b7 2026', body: 'Completed the programme \u2014 hands-on AI workshops and challenges.' },
          { label: 'Michelin CTF \u00b7 2023, 2024', body: 'Participated in 2023; runner-up in 2024, organized by DOTI Pune.' },
          { label: 'Personal projects', body: 'Multiple personal projects published on GitHub.' },
          { label: 'Continuous learning', body: 'O\u2019Reilly Books, KodeKloud, TechWorld with Nana, freeCodeCamp, Hitesh Choudhary.' }
        ],
        aiIdeas: [
          { name: 'Self-healing DevOps System', note: 'At level 2 of Henka \u00b7 Powered by Agentic AI' },
          { name: 'Green IT Ops', note: 'Got 2nd place in PSDM Workshop 2026' }
        ],
        aiComponents: {
          title: 'Developed GitLab CI \u2014 AI-powered components',
          body: 'Available on Carbon Pages as part of Shared CI Jobs: ten GitHub Copilot-powered CI/CD components for GitLab.',
          url: 'https://carbon.michelin.com/documentation/shared-ci-cd/components/ai',
          items: [
            'mr-summary', 'sonar-analysis', 'sonar-report', 'add-gitlab-ai-reviewer', 'context7-docs-check',
            'failed-pipeline-rca', 'iac-review', 'policy-check', 'readme-doc', 'security-mr-triage'
          ]
        }
      }
    },

    /* ------------------------------------------------------ 9. LEADERSHIP */
    {
      id: 'leadership',
      nav: 'Leadership',
      render: 'leadership',
      kicker: '07 \u2014 Evolution \u00b7 leadership & influence',
      title: 'Influence on roadmap, budget and organisation',
      lede: 'Shaping what the platform builds, what it spends and who it hires.',
      content: {
        roadmap: [
          {
            when: '01/2026',
            title: 'Technical Platform Roadmap 2026',
            body: 'Added key subjects to the roadmap \u2014 Drift Management for Terraform, Policy-as-Code for Terraform, and GitLab DevSecOps pipelines.',
            tone: 'cyan'
          },
          {
            when: '03/2026',
            title: 'AI for SDLC',
            body: 'Introduced AI for SDLC on the roadmap and drove AI initiatives across multiple BS/EC teams.',
            tone: 'mint'
          },
          {
            when: '2025',
            title: 'Keycloak reliability',
            body: 'Authored the Keycloak SLI/SLO document, built a Grafana dashboard for KPI tracking, and enabled automatic incident creation on service unavailability.',
            tone: 'cyan'
          }
        ],
        budgetTitle: 'Influence on budget \u00b7 2026',
        budget: [
          'Built an N8n workflow for MongoDB budget threshold alerts.',
          'Identified and decommissioned unused Azure MySQL servers.'
        ],
        orgTitle: 'Organisation & ways of working',
        org: [
          'Actively involved in the interview and hiring process, assessing lateral candidates for DevOps roles.',
          'Started and hosts the Pune DevOps Community (2026).',
          'Designed the portal for the EC SmartEC Hackathon (2026).'
        ],
        closing: 'Community leadership \u00b7 cross-team influence \u00b7 production-grade AI and DevOps delivery'
      }
    },

    /* ------------------------------------------------ 8. PRESENTER NOTES */
    {
      id: 'notes',
      nav: 'Presenter notes',
      render: 'notes',
      kicker: '08 \u2014 Presenter notes \u00b7 read before presenting',
      title: 'Presenter notes',
      lede: 'Read this before the briefing. Block A (pages 02 to 04) takes 30 minutes and Block B (pages 05 to 07) takes 10 minutes. Total 40 minutes, Q&A not included.',
      markdown: `
## 1. Block A: 30 minutes (pages 02, 03, 04)

### Opener (1 min)

**Say:**
> "I'll cover three things today. First, a platform modernisation: moving our Keycloak login service off end-of-life software. Second, a GenAI assistant that is already in production for developers. Third, the DevOps maturity of the ENGAGE teams: where we are strong, where we are exposed, and what I need from you. Then I'll show how I'm spreading this knowledge and what I'm doing with it."

**Core message (repeat it at the end):**
> "We are not only building tools. We make delivery safer and faster, and we make the knowledge stick across teams."

### Page 02: Keycloak migration from WildFly to Quarkus (8 min)

**Goal:** the audience understands that we moved a critical login service to supported software without breaking any application.

**1. What it is (1 min).** **Say:**
> "Keycloak is the login and identity service. Many applications depend on it. It was running on WildFly, a runtime that is reaching end of support. I re-platformed the production Keycloak to the Quarkus distribution: I rebuilt the container image, remapped the full configuration, and updated the existing deployment."

Analogy: "It is like replacing a car's engine while keeping the steering wheel where it is, so the driver does not have to relearn anything."

**2. Why now (1 min).** **Say:**
> "Staying on WildFly means no vendor support path. Quarkus is the supported route, and it also starts faster and uses less memory."

**Background only:** the page's Why now line states that WildFly was dropped from Keycloak v17 onward. Use this as background, not as a measured result.

**3. The results (2 min).** Show the table, then say it out loud.

| Measure | Before (WildFly) | After (Quarkus) |
|---|---|---|
| Cold start | about 60-90 s | about 5-10 s |
| Container image | about 700 MB | about 250 MB |
| Idle memory | about 800 MB | about 350 MB |
| Environment variables | 20 affected: 13 renamed, 2 removed, 5 new | Full old-to-new mapping applied |

**Say:** "Pods restart and scale out far sooner on Kubernetes. The image is about a third of the size."

**Be honest:** "These performance figures are approximate and were reported from team testing. We have not independently measured them in this deck."

**4. The key decision: nothing breaks for clients (2 min).** **Say:**
> "The biggest risk was changing the default path from /auth to /. That would have broken every OIDC client, redirect URI, ingress rule and health check. We kept /auth, so existing applications needed no changes."

| Risk | How we handled it |
|---|---|
| Client outage from the path change | Kept /auth. Any root-path move is deferred to a coordinated client migration. |
| Silent misconfiguration | Build-time options are baked into the image. Environment variables are validated first. |
| Loss of session replication | Replaced the old cache-owner settings with an explicit Infinispan configuration (2 owners for sessions). |
| Redirect failures in lower environments | Set the hostname everywhere. Relaxed the strict check only outside production. |

**5. How we did it (1 min).** **Say:**
> "Five phases: assess every environment variable, rebuild the image, remap the configuration, set up clustering and the cache, then validate and cut over. Validation covered OIDC discovery, client integration tests, health checks and dashboards."

Calendar dates and durations for the migration are not stated in the source. Do not give a timeline unless you have one.

**6. Summary (1 min).** **Say:**
> "Keycloak now runs on supported software, starts in seconds, and no application had to change. That is the outcome I wanted: a modernisation the rest of the platform doesn't feel."

✂ If short on time: skip step 5 and keep steps 1, 3 and 4.

### Page 03: RAG chatbot for technical documentation (8 min)

**Goal:** the audience understands what RAG is, that it is live, and what the early evidence says, including its limits.

**1. What it is, in plain language (1 min).** **Say:**
> "RAG stands for retrieval-augmented generation. The assistant first looks up our real documentation, then writes an answer and points to the source. It is a search that answers in full sentences, instead of guessing from memory."

> "It runs on the CORTEX Technical Platform documentation. Developers ask a question in a chat widget on the docs site and get an answer built from the indexed Markdown."

**2. Status: live in production (1 min).** **Say:**
> "It went live in April 2026. Every deliverable on the roadmap is done: the vector index, the chat backend, the React chat widget, a two-replica Kubernetes deployment for high availability, the GitLab CI/CD pipeline, the smoke tests, and a local development script. Two replicas means a second copy keeps the service up if one fails."

**3. The evidence so far (2 min).**

| Number | What it means |
|---|---|
| Apr 2026 | Production go-live |
| About 100 unique users | Reported usage to date (approximate) |
| About 20 queries per day | Reported volume (approximate) |
| 4.50 / 5 | Average satisfaction, from 14 survey responses out of 30 invitees |

**Say:** "The satisfaction score is positive, but the sample is small: 14 responses. I'd rather tell you that than overstate it."

**Quote from a real user:**
> "Searching any specific data on docs is now easy and time saving."

**Impact in one line:** "Fewer repeated questions, faster onboarding, and six operational runbooks that are now searchable."

**4. What we have not proven yet (2 min).** **Say:**
> "Two things are not measured yet. The first is time saved: the estimate is about 20 to 30 percent less time searching, but we have not instrumented it. The second is answer quality. Users have asked for reference links, which we are adding."

> "Incident recovery time is not measured either. The runbooks help people find procedures faster. That is a knowledge-access improvement, not a measured recovery improvement."

The page also shows an estimated ~25-40% lower MTTR. It is not instrumented, so say "estimated" and never present it as a result. Do not say that the chatbot has reduced incident recovery time by a specific percentage.

**5. Next steps (1.5 min).** **Say:**
> "Three priorities. First, measure: usage, answer quality, feedback and unanswered questions. Second, governance: name documentation owners, add freshness checks, and set up a support model. Third, coverage: expand to approved GitLab repositories, Confluence and wikis, while respecting access permissions. Unanswered questions will also show us which documentation gaps to fix first."

**6. Summary (0.5 min).** **Say:**
> "The assistant works and people use it. The next step is to measure it properly so we know its real value."

✂ If short on time: skip step 2 and step 5. Keep the evidence and "what we have not proven yet".

### Page 04: Transforming ENGAGE DevOps culture and tooling (12 min)

**Goal:** the audience understands the maturity score, where the risks are, and what is being done. This is the most important section in Block A.

**1. The score and what it means (2 min).** **Say:**
> "We assessed three ENGAGE teams and more than 20 repositories against a five-level maturity model. We scored 35 out of 110 points: 32 percent, rated 'Developing', Level 2 of 5. The target is 80 percent, with every area at 80 percent or more, by the end of Q4 2027."

Scope note: this is a sample of three teams, not the whole organisation. Show the scale: Beginner, Developing, Maturing, Advanced.

**2. Where we are strong (1 min).** **Say:**
> "Reusability and standardisation is our strongest area at 8 out of 10, rated Advanced. Delivery standards are Maturing at 14 out of 30. Vault is already integrated in every pipeline, and branch protection, merge request standards and quality gates are in place."

**3. Where we are exposed (2 min).**

| Area | Score | Rating |
|---|---|---|
| Secrets management | 0 / 10 | Beginner, CRITICAL |
| Obsolescence and dependency management | 0 / 10 | Beginner, CRITICAL |
| Certificate management | 0 / 10 | Beginner |
| Security and compliance | 3 / 15 | Beginner, HIGH RISK |
| Code quality standards | 6 / 15 | Developing |
| Testing standards | 4 / 10 | Developing |

**Say:** "The zeros are where the risk sits. Secrets, dependencies and certificates are at zero, and security scanning is effectively absent. Those are the areas I would focus on first."

**4. The four risks that matter most (4 min).** Take these one at a time.

**Risk 1: a private key in Git history (Critical).**
> "A private key is stored in plain text in our Salesforce ENGAGE repository, and it is reachable in Git history. We have to treat it as compromised, and it has not been rotated yet. The response: rotate or revoke it now, purge it from history using the documented procedure, move secrets to Vault, and scan every push for secrets."

**Risk 2: Python 3.10 reaches end of life in October 2026.**
> "We have no migration plan yet. Dependencies are updated by hand, so upgrades arrive as deadlines. The response: plan and schedule the Python 3.12 migration now, then automate updates with Renovate and blocking dependency scans."

**Risk 3: releases and incidents are slow, and we cannot measure either.**
> "A monthly production release takes about one day. That is an estimate, and the target is one to two hours. An incident takes about two to three days to resolve. That is also an estimate, and the target is about four hours. We have no DORA baseline, so we cannot measure real recovery time. The response: automate rollback with a fast-track hotfix path, write runbooks, and set a DORA baseline that includes MTTR."

**Risk 4: no visibility once code is live (0 / 5).**
> "We have no dashboards, no alerting and no central logging, so problems are found late, possibly by users. The response: roll out Prometheus, Grafana and alerting, with runbook links, plus centralised logging."

Define it: DORA is four industry metrics for delivery speed and reliability. MTTR is the mean time to recover after an incident.

✂ If short on time: keep Risk 1 and Risk 2. Mention Risks 3 and 4 in one sentence each.

**5. Progress: what is done and what is open (1.5 min).** The progress count is 16 items: 8 done, 5 in progress, 3 not started.

- **Done (examples):** GitLab workflow, branch protection, merge request standards, binary repository in JFrog, SonarQube integration, quality gate enforcement, mandatory pipeline success, Vault in CI/CD.
- **In progress:** Renovate bot for automated merge requests, ACME certificate automation and monitoring, GitLab approval policies, shared CI/CD jobs, pipeline with standards.
- **Not started:** GitOps with ArgoCD, Grafana observability, AI in SDLC.

**Say:**
> "The early wins are done. The open items are mostly tools we have not rolled out yet. That is good news, because rolling out shared templates is cheaper than building from scratch."

**6. Scale-out and the Salesforce repository (1 min).** **Say:**
> "Vault is already in every pipeline. The same shared-template rollout can deliver security scanning, Renovate and GitOps. The maturity portal I built can be offered to other teams as a standard self-assessment."

Also on the page: images are not signed, so there is no provenance attestation. The Salesforce ENGAGE repository is 4.6 GB, mostly committed binaries, with 1,625 remote branches and no cleanup policy, and no README for new joiners.

**7. Closing the section (0.5 min).** **Say:**
> "This is an honest baseline. The target is ambitious but achievable if we roll out the shared templates first. The security items should come first, not last."

Be honest: release and incident times are estimates, and there is no DORA baseline yet.

**Bridge to Block B (1 min).** **Say:**
> "That covers the platform, the assistant and the maturity work. Next I'll show how I'm spreading this knowledge across the organisation, what I'm learning, and where I've influenced the roadmap and budget."

## 2. Block B: 10 minutes (pages 05, 06, 07)

### Page 05: Scaling expertise beyond myself (3 min)

**Goal:** expertise that is shared is less risky. Show reach and influence.

**1. Reach (1 min).** **Say:**
> "I've run 11 sessions across 2025 and 2026, reaching about 522 attendances. That is attendances across sessions, not unique people. The biggest single session had 200 attendees: End-to-End Monitoring with Grafana, for the DOTI TECH monthly."

Session types: DevOps in Action trainings in the Michelin M2M programme (Introduction, Git, Terraform, Docker, Kubernetes for DevOps), and presentations to DOTI leaders, the Pune DevOps Community and the Pune DOTI team.

**Say:**
> "Recent presentations cover AI: how LLMs work and how to choose one (06/2026), and a show-and-tell on the documentation chatbot (08/2026)."

**2. Influence beyond my own entity (1.5 min).** **Say:** "Here is where my work influenced decisions outside my own entity."
- Built a Grafana dashboard for CRMA EU ASD data pipeline monitoring.
- Upgraded and deployed Seismic applications through Microsoft Intune.
- Ran a DevOps maturity assessment for GitLab and GitHub repositories.
- Gave DevOps support to the Squalex AI Portal, Michelin's legal AI assistant.

**3. Why it matters (0.5 min).** **Say:**
> "Expertise that lives in one person is a risk. Teaching it is how we reduce that risk. It is also how DevOps standards reach other teams, such as the Pune SMI team that implemented them in GitLab and Kubernetes in 2026."

✂ If short on time: keep the reach numbers and the "why it matters" line. Skip the list.

### Page 06: Staying at the technical frontier (2 min)

**Goal:** show continuous learning and community leadership, briefly.

**Say:**
> "I lead the Pune DevOps Community of Practice, which I started and host in 2026. Learning is part of the job. Here are the milestones."

| Area | Status |
|---|---|
| Kubestronaut path (a recognition for completing a set of Kubernetes certifications) | KCNA done (08/2026). CKA done (10/2026). CKAD in progress. KCSA and CKS planned. |
| Cloud certification | AZ-104 Azure Administrator Associate (2025) |
| AI programme | AI for Bharat (Hack2Skill, 2026), completed |
| Reading | Four 2026 O'Reilly titles on AI-enabled delivery and engineering |
| Recognition (use one or two) | Certified GenAI Local Champion (09/2026). Recognised by LinkedIn as a Top Voice in Cloud Computing (2025). |

**The AI components, in one line:** "We built ten GitHub Copilot-powered CI/CD components for GitLab. They are published on Carbon Pages as part of Shared CI Jobs. Examples are merge request summaries, Sonar analysis, failed-pipeline root-cause analysis, IaC review and security merge request triage."

✂ If short on time: skip the table. Keep the community line and the AI components line.

### Page 07: Influence on roadmap, budget and organisation (4 min)

**Goal:** influence is not only building things. It is getting them onto the roadmap and the budget, and shaping the team.

**1. Roadmap (1.5 min).**

| When | What changed |
|---|---|
| 2025 | Keycloak reliability: authored the SLI/SLO document, built a Grafana dashboard for KPI tracking, and enabled automatic incident creation on service unavailability. |
| 01/2026 | Added Terraform drift management, Terraform policy-as-code and GitLab DevSecOps pipelines to the Technical Platform Roadmap 2026. |
| 03/2026 | Introduced AI for SDLC on the roadmap and drove AI initiatives across several BS and EC teams. |

**Say:** "SLI and SLO are a way of saying what we measure (the indicator) and what we promise (the objective). The Keycloak work turned reliability into measured targets."

**2. Budget (1 min).** **Say:**
> "On budget, I built an n8n workflow that sends alerts when MongoDB spend crosses thresholds. I also found and decommissioned unused Azure MySQL servers. Both are about spending less on things nobody needs."

**3. Organisation (1 min).** **Say:**
> "I'm involved in interviewing and assessing lateral candidates for DevOps roles. I designed the portal for the EC SmartEC Hackathon in 2026."

**4. Close of the influence section (0.5 min).** **Say:** "That is influence on what we build, what we spend and who we hire."

✂ If short on time: keep the roadmap timeline. Mention budget and organisation in one sentence.

### Close and asks (1 min)

**Say:** "Here is what I'm asking for, based on today's content. Confirm these before the meeting."

1. **Schedule the Python 3.12 migration now.** Python 3.10 reaches end of life in October 2026.
2. **Mandate secret clean-up:** rotate the exposed key, purge it from Git history, and make secret scanning mandatory.
3. **Back shared CI/CD templates in every pipeline,** with security scans that block merges on critical findings.
4. **Approve a DORA baseline and observability** (Grafana, Prometheus, alerting), so recovery time is measured, not estimated.
5. **Support chatbot governance:** documentation owners, usage and quality measurement, and access-controlled expansion.
6. **Endorse the maturity portal** as a standard self-assessment for other teams.

**Final line:**
> "Community leadership, cross-team influence, and production-grade AI and DevOps delivery. The next step is to turn these early wins into standards every team uses."

## 3. Likely questions and answers (outside the 40 minutes)

| Question | Answer |
|---|---|
| What is the return on investment? | Time-savings figures are estimates and labelled that way. Next we will instrument usage and answer quality, and set a DORA baseline. Cost figures are not on the page. Add them if you have them. |
| Is the chatbot accurate and safe? | Satisfaction is 4.50 / 5 from 14 responses. The scope is the CORTEX documentation. Any wider scope will respect access permissions. |
| Are the Keycloak numbers verified? | They are approximate and reported from team testing. They were not independently measured. |
| What if Python 3.12 is not ready in time? | There is no migration plan today, which is the risk. The ask is to schedule it now so the date is under our control. |
| Why do secrets still sit in Git? | A key was committed in the past. Vault is now in every pipeline. The remaining steps are to rotate, purge and scan. |
| Why only 32%? | This is an honest baseline. The early wins are done. The remaining gaps are mostly tooling we have not rolled out yet, and the plan to close them is on the page. |
| Who else can do this work? | Knowledge is shared through sessions, the Pune community and reusable CI/CD components. We are reducing key-person dependency. |
| How does this scale beyond ENGAGE? | The Vault rollout pattern and the maturity portal can be reused by other teams. |

## 4. Glossary

| Term | Plain meaning |
|---|---|
| RAG | The AI looks up real documents before it answers. |
| Vector index (FAISS) | A searchable map of document content, used by the chatbot. |
| CI/CD | Automated steps that build, test and deploy code. |
| Pipeline | One automated run of those steps. |
| GitOps | Deploying by reviewing changes in Git, not by manual commands. |
| Kubernetes / HA | The system that runs containers. HA means it stays up if one copy fails. |
| Replicas | Copies of a service running at the same time. |
| Helm | A way to package and configure Kubernetes applications. |
| Kubestronaut | A recognition for completing a set of Kubernetes certifications. |
| Keycloak | The login and identity service that applications use. |
| OIDC | The standard protocol apps use to sign users in through Keycloak. |
| WildFly / Quarkus | The old and new Java runtimes that run Keycloak. |
| Vault | A secure store for passwords and keys. |
| SAST / secret scanning | Automated checks that find security flaws or exposed secrets in code. |
| Quality gate | A rule that blocks a change if code quality is too low. |
| Branch protection | A rule that stops direct changes to the main code branch. |
| Renovate | A bot that proposes dependency updates automatically. |
| EOL (end of life) | The date after which a software version gets no more updates. |
| DORA | Four industry metrics for delivery speed and reliability. |
| MTTR | Mean time to recover after an incident. |
| SLI / SLO | What is measured, and the target it is measured against. |
| Maturity level | A five-level scale of how well a practice is established. Ratings on the page run from Beginner, through Developing and Maturing, to Advanced. |
`
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) { module.exports = PORTFOLIO; }
