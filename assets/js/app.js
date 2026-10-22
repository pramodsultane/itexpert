/* Deck renderer + navigation.
   Content lives in data.js; this file owns behaviour only. */

(function () {
  'use strict';

  var deck = document.getElementById('deck');
  var dotsEl = document.getElementById('dots');
  var prevBtn = document.getElementById('prev');
  var nextBtn = document.getElementById('next');
  var progressEl = document.querySelector('#progress span');
  var counterEl = document.getElementById('counter');
  var themeBtn = document.getElementById('themeToggle');
  var themeLabel = document.getElementById('themeLabel');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCap = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');

  var panels = (PORTFOLIO.presentationOrder || PORTFOLIO.panels.map(function (p) { return p.id; }))
    .map(function (id) {
      return PORTFOLIO.panels.find(function (p) { return p.id === id; });
    })
    .filter(Boolean);
  var links = PORTFOLIO.profile.links;
  var index = 0;

  /* ------------------------------------------------------------ helpers */

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function tone(t) { return 't-' + (t || 'cyan'); }

  function symbol(id) {
    var paths = {
      hero: '<path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/><circle cx="12" cy="12" r="7"/>',
      transmission: '<path d="M4 7h16M4 12h11M4 17h16"/><circle cx="18" cy="12" r="2"/>',
      learning: '<path d="M4 5.5h16v13H4zM8 3v5M16 3v5M4 10h16"/><path d="M8 14h3M13 14h3"/>',
      leadership: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
      chatbot: '<path d="M5 5h14v10H9l-4 4z"/><path d="M8 9h.01M12 9h.01M16 9h.01"/>',
      maturity: '<path d="M4 19V9M10 19V5M16 19v-8M22 19V3"/><path d="M2 19h21"/>',
      keycloak: '<path d="M8 5h8v4H8zM6 9h12v10H6z"/><path d="M10 13h4M12 11v7"/>',
      components: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/><path d="M10 7h4M7 10v4M17 10v4M10 17h4"/>',
      notes: '<path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h4"/>'
    };
    return '<svg class="section-symbol" viewBox="0 0 24 24" aria-hidden="true">' + (paths[id] || paths.hero) + '</svg>';
  }

  function techLogo(name) {
    var logos = {
      'MICHELIN': '<path d="M5 18c1-8 2-12 4-12s3 4 3 12M12 18c1-8 2-12 4-12s3 4 3 12"/>',
      'GitLab': '<path d="m3 9 4-4 5 2 5-2 4 4-3 8-4-3-4 3z"/><path d="m8 10 4 5 4-5"/>',
      'Azure OpenAI': '<path d="M4 14a5 5 0 0 1 5-5 5 5 0 0 1 9 2 4 4 0 0 1 0 8H7a3 3 0 0 1-3-3z"/><path d="m12 9 1 2 2 .3-1.5 1.5.4 2.2-1.9-1-1.9 1 .4-2.2L10 11.3l2-.3z"/>',
      'Kubernetes': '<path d="m12 3 7 4v8l-7 6-7-6V7z"/><path d="m5 7 7 5 7-5M12 12v9"/>',
      'React': '<ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="4" ry="9"/><circle cx="12" cy="12" r="1.5"/>',
      'Docusaurus': '<path d="M5 7c1-3 4-4 7-2 3-2 6-1 7 2l-1 9H6z"/><circle cx="9" cy="11" r="1"/><circle cx="15" cy="11" r="1"/>',
      'FAISS': '<path d="M5 5h14v14H5z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
      'GitHub': '<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"/><path d="M8 9c2-2 6-2 8 0M8 15c2 2 6 2 8 0M9 18v-3M15 18v-3"/>',
      'Python': '<path d="M12 3H8a3 3 0 0 0-3 3v4h7v3H8a3 3 0 0 0-3 3v2h5"/><path d="M12 21h4a3 3 0 0 0 3-3v-4h-7v-3h4a3 3 0 0 0 3-3V6h-5"/><circle cx="8" cy="6.5" r=".7"/><circle cx="16" cy="17.5" r=".7"/>',
      'Docker': '<path d="M4 15h15M6 15V9h3v6M10 15V7h3v8M14 15v-5h3v5"/><path d="M19 12c2-1 3 0 3 1-1 2-3 2-5 2"/>',
      'NGINX': '<text class="tech-logo-text" x="12" y="16" text-anchor="middle">N</text>',
      'Terraform': '<path d="m4 5 5 3v6l-5-3zM10 8l5 3v6l-5-3zM16 11l4-2v6l-4 2z"/>',
      'HashiCorp Vault': '<path d="M6 10h12v9H6z"/><path d="M9 10V7a3 3 0 0 1 6 0v3M12 14v2"/>',
      'SonarQube': '<path d="M5 18a9 9 0 0 1 14-7M8 19a6 6 0 0 1 9-5M11 20a3 3 0 0 1 4-2"/>',
      'Grafana': '<path d="M4 17 12 4l8 13H4z"/><circle cx="12" cy="13" r="2"/>',
      'MongoDB': '<path d="M12 3c-2 4-3 7-2 11 .4 2 1.4 4 2 7 .6-3 1.6-5 2-7 1-4 0-7-2-11z"/>',
      'AWS': '<path d="M4 15c4 3 11 4 16 0"/><path d="m17 13 3 2-3 2"/>',
      'Azure': '<path d="m13 4-7 13h5l4-7 3 6h3z"/>',
      'Microsoft Intune': '<path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
      'Jira': '<path d="m12 3 8 8-8 10-8-10z"/><path d="m12 7 4 4-4 5-4-5z"/>',
      'Keycloak': '<path d="M8 5h8v4H8zM6 9h12v10H6z"/><path d="M10 13h4M12 11v7"/>'
    };
    return '<svg class="tech-logo" viewBox="0 0 24 24" aria-hidden="true">' + (logos[name] || logos.FAISS) + '</svg>';
  }

  function techMarks() {
    return '<div class="tech-marks" aria-label="Technology ecosystem">' +
      ['MICHELIN', 'GitLab', 'Azure OpenAI', 'Kubernetes', 'React', 'Docusaurus', 'FAISS', 'GitHub', 'Python', 'Docker', 'NGINX', 'Terraform', 'HashiCorp Vault', 'SonarQube', 'Grafana', 'MongoDB', 'AWS', 'Azure', 'Microsoft Intune', 'Jira', 'Keycloak'].map(function (name, i) {
        return '<span class="tech-mark tech-mark-' + i + '">' + techLogo(name) + '<span>' + esc(name) + '</span></span>';
      }).join('') +
    '</div>';
  }

  function head(p) {
    return '<div class="section-heading"><span class="section-symbol-wrap">' + symbol(p.id) + '</span><p class="kicker">' + esc(p.kicker) + '</p></div>' +
           '<h2>' + p.title + '</h2>' +
           (p.lede ? '<p class="lede">' + esc(p.lede) + '</p>' : '');
  }

  function metricTiles(list) {
    return '<div class="metrics">' + list.map(function (m) {
      return '<div class="metric ' + tone(m.tone) + '">' +
               '<div class="metric-value">' + esc(m.value) + '</div>' +
               '<div class="metric-label">' + esc(m.label) + '</div>' +
               (m.note ? '<div class="metric-note">' + esc(m.note) + '</div>' : '') +
             '</div>';
    }).join('') + '</div>';
  }

  function diagramFig(d) {
    return '<figure class="diagram">' +
             '<div class="diagram-title">' + esc(d.title) + '</div>' +
             '<img src="' + esc(d.src) + '" alt="' + esc(d.caption) + '" loading="lazy" ' +
                  'data-caption="' + esc(d.title + ' — ' + d.caption) + '">' +
             '<figcaption>' + esc(d.caption) + '</figcaption>' +
           '</figure>';
  }

  /* ---------------------------------------------------------- renderers */

  var render = {};

  render.hero = function (p) {
    var c = p.content;
    return '<div class="panel-inner">' +
      '<div class="hero-wrap">' +
        '<div>' +
          (p.kicker ? '<p class="kicker">' + esc(p.kicker) + '</p>' : '') +
          (p.title ? '<h1 class="hero-title">' + p.title + '</h1><div class="hero-rule"></div>' : '') +
          (p.heroImage ? '<img class="hero-image" src="' + esc(p.heroImage) + '" alt="' + esc(p.heroImageAlt || '') + '">' : '') +
          (p.lede ? '<p class="lede">' + esc(p.lede) + '</p>' : '') +
          techMarks() +
          '<div class="hero-links">' +
            '<a class="hero-link" href="' + links.blog + '" target="_blank" rel="noopener">Cloud &amp; DevOps blog ↗</a>' +
            '<a class="hero-link" href="' + links.github + '" target="_blank" rel="noopener">GitHub ↗</a>' +
            '<a class="hero-link" href="' + links.maturityPortal + '" target="_blank" rel="noopener">Maturity portal ↗</a>' +
          '</div>' +
        '</div>' +
        '<div>' + c.pillars.map(function (x) {
          return '<div class="pillar"><h3>' + esc(x.title) + '</h3><p>' + esc(x.body) + '</p></div>';
        }).join('') + '</div>' +
      '</div>' +
      (c.metrics && c.metrics.length ? '<div style="margin-top:44px">' + metricTiles(c.metrics) + '</div>' : '') +
      '<div class="hero-signature"><strong>Pramod Sultane</strong><span>// IT Expert Application</span></div>' +
    '</div>';
  };

  render.portfolio = function (p) {
    var c = p.content;
    var done = c.useCases.filter(function (u) { return u.status === 'Completed'; }).length;
    var tiles = [
      { value: String(c.useCases.length), label: 'Initiatives', note: 'Across GenAI & Accelerate', tone: 'cyan' },
      { value: String(done), label: 'Completed & in use', note: 'Chatbot · AI CI components', tone: 'mint' },
      { value: String(c.useCases.length - done), label: 'In active progress', note: 'ENGAGE · Copilot memory', tone: 'amber' },
      { value: '2', label: 'DOTI strategy pillars', note: 'Accelerate · GenAI for SDLC', tone: 'cyan' }
    ];
    return '<div class="panel-inner">' + head(p) + metricTiles(tiles) +
      '<p class="sub-h impact-label">CTO lens</p>' +
      '<div class="impact-list">' + c.impactRows.map(function (r) {
        return '<div class="impact-row ' + tone(r.tone) + '">' +
                 '<div class="impact-lens">' + esc(r.lens) + '</div>' +
                 '<div class="impact-intervention">' + esc(r.intervention) + '</div>' +
                 '<div class="impact-evidence">' + esc(r.evidence) + '</div>' +
               '</div>';
      }).join('') + '</div>' +
      '<p class="sub-h">Portfolio status</p>' +
      c.useCases.map(function (u) {
        return '<div class="uc ' + tone(u.tone) + '">' +
                 '<div>' +
                   '<h3>' + esc(u.name) + '</h3>' +
                   '<p>' + esc(u.progress) + '</p>' +
                   '<div class="uc-strategy">Strategy · ' + esc(u.strategy) + '</div>' +
                 '</div>' +
                 '<span class="pill">' + esc(u.status) + '</span>' +
               '</div>';
      }).join('') +
      '<p class="sub-h">Engineering decisions</p>' +
      '<div class="decision-grid">' + c.decisions.map(function (d) {
        return '<div class="decision card"><span class="decision-symbol" aria-hidden="true">+</span>' +
                 '<h3>' + esc(d.title) + '</h3><p>' + esc(d.body) + '</p></div>';
      }).join('') + '</div>' +
    '</div>';
  };

  render.chatbot = function (p) {
    var c = p.content;
    return '<div class="panel-inner">' + head(p) +
      '<section class="chatbot-metrics" aria-label="Adoption and satisfaction evidence">' + metricTiles(c.metrics) +
      '</section>' +
      '<p class="sub-h">Problems and chatbot contribution</p>' +
      '<section class="problem-solutions" aria-label="Problems and chatbot contribution">' +
        c.problemSolutions.map(function (item) {
          return '<article class="problem-solution">' +
                   '<h3>' + esc(item.problem) + '</h3>' +
                   '<p><strong>How it helps:</strong> ' + esc(item.contribution) + '</p>' +
                 '</article>';
        }).join('') +
      '</section>' +

      '<div class="story">' + c.story.map(function (s) {
        return '<div class="story-step"><h4>' + esc(s.step) + '</h4><p>' + esc(s.body) + '</p></div>';
      }).join('') + '</div>' +

      '<div class="survey-layout">' +
        '<section>' +
          '<p class="sub-h">What users said</p>' +
          '<div class="survey-quotes">' + c.surveyQuotes.map(function (quote) {
            return '<blockquote>' + esc(quote) + '</blockquote>';
          }).join('') + '</div>' +
        '</section>' +
        '<section>' +
          '<p class="sub-h">Survey evidence</p>' +
          '<figure class="response-evidence">' +
            '<img src="' + esc(c.responseEvidence.src) + '" alt="' + esc(c.responseEvidence.alt) + '" loading="lazy">' +
            '<figcaption>' + esc(c.responseEvidence.caption) + '</figcaption>' +
          '</figure>' +
        '</section>' +
      '</div>' +

      '<section class="runbook-knowledge" aria-label="Operational knowledge in the documentation">' +
        '<p class="sub-h">' + esc(c.runbookTitle) + '</p>' +
        '<p class="caption">' + esc(c.runbookLede) + '</p>' +
        '<div class="grid grid-2 runbook-layout">' +
          '<div class="card">' + c.runbookShift.map(function (s) {
            return '<div class="shift"><div class="shift-from">' + esc(s.from) + '</div>' +
              '<div class="shift-arrow" aria-hidden="true">→</div><div class="shift-to">' + esc(s.to) + '</div></div>';
          }).join('') + '</div>' +
          '<div class="runbook-list">' + c.runbooks.map(function (runbook, i) {
            return '<div class="runbook"><span class="runbook-idx">' + (i + 1) + '</span><span>' + esc(runbook) + '</span></div>';
          }).join('') + '</div>' +
        '</div>' +
      '</section>' +

      '<p class="sub-h">Architecture &amp; delivery</p>' +
      '<div class="grid grid-2">' + c.diagrams.map(diagramFig).join('') + '</div>' +

      '<p class="sub-h">' + esc(c.deliverablesTitle) + '</p>' +
      '<div class="grid grid-4">' + c.deliverables.map(function (d) {
        return '<div class="check"><span class="check-mark">✓</span><div>' +
                 '<strong>' + esc(d.name) + '</strong><span>' + esc(d.desc) + '</span>' +
               '</div></div>';
      }).join('') + '</div>' +

      '<p class="sub-h">' + esc(c.futureTitle) + '</p>' +
      '<div class="grid grid-3">' + c.future.map(function (g) {
        return '<div class="card"><h3 style="margin:0 0 12px;font-size:.9rem">' + esc(g.group) + '</h3>' +
               '<ul class="bullets">' + g.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul></div>';
      }).join('') + '</div>' +

      '<p class="ref">Reference · ' + esc(c.reference) + '</p>' +
    '</div>';
  };

  render.runbooks = function (p) {
    var c = p.content;
    return '<div class="panel-inner">' + head(p) +
      '<div class="grid grid-2" style="align-items:start">' +
        '<div>' +
          '<p class="sub-h">The shift</p>' +
          '<div class="card">' + c.shift.map(function (s) {
            return '<div class="shift">' +
                     '<div class="shift-from">' + esc(s.from) + '</div>' +
                     '<div class="shift-arrow">→</div>' +
                     '<div class="shift-to">' + esc(s.to) + '</div>' +
                   '</div>';
          }).join('') + '</div>' +
          '<p class="caption" style="margin-top:16px">' + esc(c.thesis) + '</p>' +
        '</div>' +
        '<div>' +
          '<p class="sub-h">Currently available runbooks</p>' +
          '<div class="grid" style="gap:10px">' + c.runbooks.map(function (r, i) {
            return '<div class="runbook"><span class="runbook-idx">' + (i + 1) + '</span><span>' + esc(r) + '</span></div>';
          }).join('') + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  };

  render.components = function (p) {
    var c = p.content;
    return '<div class="panel-inner">' + head(p) +
      '<div class="grid grid-3">' + c.components.map(function (x) {
        return '<div class="comp ' + tone(x.tone) + '">' +
                 '<h3>' + esc(x.name) + '</h3>' +
                 '<p>' + esc(x.desc) + '</p>' +
                 '<div class="comp-benefit">' + esc(x.benefit) + '</div>' +
               '</div>';
      }).join('') + '</div>' +

      '<p class="sub-h">' + esc(c.plannedTitle) + '</p>' +
      '<div>' + c.planned.map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join('') + '</div>' +

      '<p class="ref">' + c.references.map(esc).join(' &nbsp;·&nbsp; ') + '</p>' +
    '</div>';
  };

  render.maturity = function (p) {
    var c = p.content;

    function challengeGroup(source, title, list) {
      return '<p class="sub-h">' + esc(title) + '</p>' +
        '<section class="engage-challenges" data-source="' + source + '" aria-label="' + esc(title) + '">' +
          list.map(function (challenge) {
            return '<article class="engage-challenge ' + tone(challenge.tone) + '">' +
                     '<div class="engage-challenge-stat">' +
                       '<span class="engage-challenge-value">' + esc(challenge.value) + '</span>' +
                       '<span class="engage-challenge-note">' + esc(challenge.valueNote) + '</span>' +
                     '</div>' +
                     '<h3>' + esc(challenge.title) + '</h3>' +
                     '<ul class="engage-challenge-evidence">' + challenge.evidence.map(function (item) {
                       return '<li>' + esc(item) + '</li>';
                     }).join('') + '</ul>' +
                     '<p class="engage-challenge-response"><strong>Recommended direction:</strong> ' + esc(challenge.response) + '</p>' +
                   '</article>';
          }).join('') +
        '</section>';
    }

    return '<div class="panel-inner">' + head(p) +
      '<div class="risk-banner"><strong>Risk:</strong><span style="font-size:.86rem;color:var(--text-dim)">' + esc(c.risk) + '</span></div>' +

      '<div class="maturity-layout" id="maturityGrid">' +
        '<div class="score-hero">' +
          '<div class="score-big">' + c.total.percent + '%</div>' +
          '<div class="score-frac">' + c.total.actual + ' / ' + c.total.max + '</div>' +
          '<div class="score-rule"></div>' +
          '<div class="score-rating">' + esc(c.total.rating) + ' · Level 2 of 5</div>' +
          '<div class="score-target">Target ' + c.total.target + '% · ' + esc(c.total.targetDate) + '</div>' +
          '<p class="score-note" style="margin-top:14px">' + esc(c.portalNote) + ' Marker on each bar = ' + c.total.target + '% domain target.</p>' +
        '</div>' +
        '<div class="chart">' + c.domains.map(function (d) {
          return '<div class="bar-row ' + tone(d.tone) + '">' +
                   '<div class="bar-name">' + esc(d.name) + '</div>' +
                   '<div class="bar-track"><div class="bar-fill" style="width:' + d.percent + '%"></div>' +
                     '<span class="bar-target" style="left:' + c.total.target + '%" aria-hidden="true"></span></div>' +
                   '<div class="bar-meta"><span class="bar-pct">' + d.percent + '%</span><br>' +
                     '<span class="bar-score">' + d.actual + '/' + d.max + ' · ' + esc(d.rating) + '</span></div>' +
                 '</div>';
        }).join('') + '</div>' +
      '</div>' +

      challengeGroup('mcc', c.challengesTitle, c.challenges) +
      challengeGroup('salesforce', c.salesforceChallengesTitle, c.salesforceChallenges) +

      '<p class="sub-h">' + esc(c.progressTitle) + ' · ' + ['Done', 'In Progress', 'Not Started'].map(function (s) {
        return c.progress.filter(function (x) { return x.status === s; }).length + ' ' + s.toLowerCase();
      }).join(' · ') + '</p>' +
      '<div class="grid grid-3 maturity-progress">' + c.progress.map(function (x) {
        return '<div class="card ' + tone(x.tone) + '" style="display:flex;justify-content:space-between;align-items:center;gap:14px">' +
                 '<strong style="font-size:.88rem">' + esc(x.name) + '</strong>' +
                 '<span class="pill">' + esc(x.status) + '</span>' +
               '</div>';
      }).join('') + '</div>' +

      '<div class="grid grid-2">' + c.diagrams.map(diagramFig).join('') + '</div>' +
      '<section class="scale-out" aria-label="Scaling beyond ENGAGE"><p class="sub-h">Scaling beyond ENGAGE</p>' +
        '<ul class="bullets">' + c.scaleOut.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' +
      '</section>' +
      '<p class="caption">' + esc(c.methodNote) + '</p>' +
    '</div>';
  };

  render.keycloak = function (p) {
    var c = p.content;
    return '<div class="panel-inner">' + head(p) +
      '<section class="kc-metrics" aria-label="Reported performance and change surface">' + metricTiles(c.metrics) +
        '<p class="caption">' + esc(c.metricsNote) + '</p>' +
      '</section>' +

      '<p class="sub-h">Business impact and outcomes</p>' +
      '<div class="kc-outcomes">' + c.outcomes.map(function (o) {
        return '<div class="card ' + tone(o.tone) + '"><h3>' + esc(o.title) + '</h3><p>' + esc(o.body) + '</p></div>';
      }).join('') + '</div>' +

      '<p class="sub-h">Migration scope</p>' +
      '<div class="kc-scope">' + c.scope.map(function (s) {
        return '<div class="kc-scope-item"><span class="kc-scope-k">' + esc(s.k) + '</span>' +
               '<span class="kc-scope-v">' + esc(s.v) + '</span></div>';
      }).join('') + '</div>' +

      '<p class="sub-h">Architecture \u00b7 before and after</p>' +
      '<section class="kc-arch" aria-label="Before and after architecture">' +
        '<div class="kc-flow" aria-label="Request path, unchanged">' + c.flow.map(function (f, i) {
          return (i ? '<span class="kc-flow-arrow" aria-hidden="true">\u2192</span>' : '') +
                 '<span class="kc-flow-node">' + esc(f) + '</span>';
        }).join('') + '</div>' +
        '<div class="kc-arch-grid">' + c.architecture.map(function (col, i) {
          return (i ? '<div class="kc-arch-shift" aria-hidden="true">\u2192</div>' : '') +
                 '<div class="kc-arch-col ' + tone(col.tone) + '">' +
                   '<div class="kc-arch-label">' + esc(col.label) + '</div>' +
                   col.layers.map(function (l) {
                     return '<div class="kc-arch-layer"><span class="kc-scope-k">' + esc(l.k) + '</span>' +
                            '<span class="kc-scope-v">' + esc(l.v) + '</span></div>';
                   }).join('') +
                 '</div>';
        }).join('') + '</div>' +
      '</section>' +

      '<p class="sub-h">Breaking changes \u00b7 what changed, why it matters, how it was resolved</p>' +
      '<div class="kc-table-wrap"><table class="kc-table">' +
        '<thead><tr><th scope="col">What changed</th><th scope="col">Why it matters</th><th scope="col">How it was resolved</th></tr></thead>' +
        '<tbody>' + c.changes.map(function (r) {
          return '<tr class="' + tone(r.tone) + '"><th scope="row"><span class="kc-tag"></span>' + esc(r.change) + '</th>' +
                 '<td>' + esc(r.impact) + '</td><td>' + esc(r.fix) + '</td></tr>';
        }).join('') + '</tbody>' +
      '</table></div>' +

      '<p class="sub-h">Affected components</p>' +
      '<div>' + c.components.map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join('') + '</div>' +

      '<p class="sub-h">Operational risks and mitigations</p>' +
      '<div class="grid grid-3">' + c.risks.map(function (r) {
        return '<article class="kc-risk ' + tone(r.tone) + '">' +
                 '<h3>' + esc(r.title) + '</h3>' +
                 '<p class="kc-risk-mitigation"><strong>Mitigation:</strong> ' + esc(r.mitigation) + '</p>' +
               '</article>';
      }).join('') + '</div>' +

      '<p class="sub-h">Migration approach</p>' +
      '<ol class="kc-phases">' + c.phases.map(function (ph, i) {
        return '<li class="kc-phase"><span class="kc-phase-num">' + (i + 1) + '</span>' +
               '<strong>' + esc(ph.name) + '</strong><span>' + esc(ph.body) + '</span></li>';
      }).join('') + '</ol>' +
      '<p class="caption">' + esc(c.phaseNote) + '</p>' +
    '</div>';
  };

  render.transmission = function (p) {
    var c = p.content;
    var total = c.sessions.reduce(function (a, s) { return a + s.people; }, 0);
    var tiles = [
      { value: String(c.sessions.length), label: 'Sessions delivered', note: '2025–2026', tone: 'cyan' },
      { value: '~' + total, label: 'People reached', note: 'Approximate audience', tone: 'amber' },
      { value: '4', label: 'M2M DevOps sessions', note: 'Michelin M2M programme', tone: 'cyan' },
      { value: '2', label: 'Academic roles', note: 'COEP Pune · MIT AoE Pune', tone: 'mint' }
    ];
    return '<div class="panel-inner">' + head(p) + metricTiles(tiles) +
      '<div class="grid grid-2" style="align-items:start">' +
        '<div>' +
          '<p class="sub-h">Transmission streams</p>' +
          c.streams.map(function (s, i) {
            var tones = ['t-cyan', 't-mint', 't-cyan', 't-amber'];
            return '<div class="stream ' + tones[i % 4] + '">' +
                     '<div class="stream-label">' + esc(s.label) + '</div>' +
                     '<div class="stream-body">' + esc(s.body) + '</div>' +
                   '</div>';
          }).join('') +
          '<p class="sub-h">' + esc(c.influenceTitle) + '</p>' +
          '<ul class="bullets t-cyan">' + c.influence.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' +
          '<p class="sub-h">' + esc(c.recognitionTitle) + '</p>' +
          '<div class="grid" style="gap:10px">' + c.recognition.map(function (r) {
            return '<div class="card ' + tone(r.tone) + '" style="display:flex;gap:14px;align-items:flex-start;padding:16px 18px">' +
                     (r.year ? '<span class="pill">' + esc(r.year) + '</span>' : '') +
                     '<span style="font-size:.85rem;color:var(--text-dim)">' + esc(r.body) + '</span>' +
                   '</div>';
          }).join('') + '</div>' +
        '</div>' +
        '<div>' +
          '<p class="sub-h">' + esc(c.timelineTitle) + '</p>' +
          '<div class="timeline">' + c.sessions.map(function (s) {
            var t = s.type === 'Training' ? 't-cyan' : 't-amber';
            return '<div class="tl-item ' + t + '">' +
                     '<div class="tl-head">' +
                       '<span class="tl-type">' + esc(s.type) + '</span>' +
                       '<span class="tl-date">' + esc(s.date) + '</span>' +
                       '<span class="tl-people">~' + s.people + ' people</span>' +
                     '</div>' +
                     '<div class="tl-title">' + esc(s.title) + '</div>' +
                     '<div class="tl-aud">' + esc(s.audience) + '</div>' +
                   '</div>';
          }).join('') + '</div>' +
          '<p class="caption">' + esc(c.timelineNote) + '</p>' +
        '</div>' +
      '</div>' +
    '</div>';
  };

  render.learning = function (p) {
    var c = p.content;
    return '<div class="panel-inner">' + head(p) +
      '<div class="card t-mint" style="border-left:3px solid var(--mint);margin-bottom:30px">' +
        '<div class="stream-label" style="color:var(--mint)">' + esc(c.highlight.label) + '</div>' +
        '<div style="font-size:1.05rem;font-weight:600">' + esc(c.highlight.body) + '</div>' +
      '</div>' +

      '<div class="grid grid-2" style="align-items:start">' +
        '<div>' +
          '<p class="sub-h">Conferences attended</p>' +
          '<div class="card">' + c.conferences.map(function (x) {
            return '<div class="kv"><div><div class="kv-k">' + esc(x.name) + '</div>' +
                   '<div style="font-size:.78rem;color:var(--muted)">' + esc(x.note) + '</div></div>' +
                   '<div class="kv-v">' + esc(x.when) + '</div></div>';
          }).join('') + '</div>' +

          '<p class="sub-h">Certifications &amp; memberships</p>' +
          '<div class="grid" style="gap:10px">' + c.credentials.map(function (x) {
            return '<div class="card ' + tone(x.tone) + '" style="display:flex;justify-content:space-between;align-items:center;gap:14px;padding:16px 18px">' +
                     '<strong style="font-size:.87rem">' + esc(x.name) + '</strong>' +
                     '<span class="pill">' + esc(x.when) + '</span>' +
                   '</div>';
          }).join('') + '</div>' +

          (function () {
            var k = c.kubestronaut;
            if (!k) return '';
            var pct = Math.round((k.done / k.steps.length) * 100);
            return '<div class="card t-mint" style="margin-top:10px;padding:16px 18px">' +
                     '<div class="ktrack-head">' +
                       '<div class="stream-label" style="color:var(--mint);margin:0">' + esc(k.label) + '</div>' +
                       '<span class="ktrack-count">' + k.done + '/' + k.steps.length + ' completed</span>' +
                     '</div>' +
                     '<div class="ktrack-bar"><span style="width:' + pct + '%"></span></div>' +
                     '<div class="ktrack">' + k.steps.map(function (s) {
                       return '<div class="kstep ' + (s.done ? 'is-done' : 'is-todo') + '">' +
                                '<span class="kstep-mark">' + (s.done ? '\u2713' : '') + '</span>' +
                                '<span class="kstep-code">' + esc(s.code) + '</span>' +
                                '<span class="kstep-name">' + esc(s.name) + '</span>' +
                                '<span class="kstep-when">' + esc(s.when) + '</span>' +
                              '</div>';
                     }).join('') + '</div>' +
                   '</div>';
          })() +
        '</div>' +

        '<div>' +
          '<p class="sub-h">' + esc(c.reading.label) + '</p>' +
          '<div>' + c.reading.items.map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join('') + '</div>' +

          '<p class="sub-h">Training &amp; practice</p>' +
          '<div class="grid" style="gap:12px">' + c.training.map(function (x) {
            return '<div class="card" style="padding:16px 18px">' +
                     '<div class="stream-label" style="color:var(--cyan)">' + esc(x.label) + '</div>' +
                     '<div style="font-size:.84rem;color:var(--text-dim)">' + esc(x.body) + '</div>' +
                   '</div>';
          }).join('') + '</div>' +

          '<p class="sub-h">AI ideas selected</p>' +
          '<div class="card t-mint learning-ai-ideas">' + c.aiIdeas.map(function (x) {
            return '<div class="kv"><div><div class="kv-k">' + esc(x.name) + '</div>' +
                   '<div style="font-size:.78rem;color:var(--muted)">' + esc(x.note) + '</div></div></div>';
          }).join('') + '</div>' +

          '<p class="sub-h">' + esc(c.aiComponents.title) + '</p>' +
          '<div class="card t-cyan learning-ai-components" style="padding:16px 18px">' +
            '<p style="margin:0 0 12px;font-size:.84rem;color:var(--text-dim)">' + esc(c.aiComponents.body) + '</p>' +
            '<ul class="bullets t-cyan">' + c.aiComponents.items.map(function (x) {
              return '<li><strong>' + esc(x) + '</strong></li>';
            }).join('') + '</ul>' +
            '<p style="margin:14px 0 0;font-size:.8rem"><a href="' + esc(c.aiComponents.url) + '" target="_blank" rel="noopener">Carbon Pages \u00b7 AI components \u2197</a></p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  };

  render.leadership = function (p) {
    var c = p.content;
    return '<div class="panel-inner">' + head(p) +
      '<p class="sub-h">Influence on roadmap &amp; technical choice</p>' +
      '<div class="grid grid-3">' + c.roadmap.map(function (r) {
        return '<div class="card ' + tone(r.tone) + '" style="border-top:3px solid var(--accent)">' +
                 '<span class="pill">' + esc(r.when) + '</span>' +
                 '<h3 style="margin:14px 0 8px;font-size:1rem">' + esc(r.title) + '</h3>' +
                 '<p style="margin:0;font-size:.85rem;color:var(--text-dim)">' + esc(r.body) + '</p>' +
               '</div>';
      }).join('') + '</div>' +

      '<div class="grid grid-2" style="margin-top:12px;align-items:start">' +
        '<div>' +
          '<p class="sub-h">' + esc(c.budgetTitle) + '</p>' +
          '<div class="card t-amber"><ul class="bullets t-amber">' +
            c.budget.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') +
          '</ul></div>' +
        '</div>' +
        '<div>' +
          '<p class="sub-h">' + esc(c.orgTitle) + '</p>' +
          '<div class="card t-cyan"><ul class="bullets t-cyan">' +
            c.org.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') +
          '</ul></div>' +
        '</div>' +
      '</div>' +

      '<div class="closing-line">' + esc(c.closing) + '</div>' +
      '<div class="hero-links" style="justify-content:center;margin-top:22px">' +
        '<a class="hero-link" href="' + links.blog + '" target="_blank" rel="noopener">Blog ↗</a>' +
        '<a class="hero-link" href="' + links.github + '" target="_blank" rel="noopener">GitHub ↗</a>' +
        '<a class="hero-link" href="' + links.maturityPortal + '" target="_blank" rel="noopener">DevOps maturity portal ↗</a>' +
        '<a class="hero-link" href="' + links.hackathon + '" target="_blank" rel="noopener">SmartEC hackathon portal ↗</a>' +
      '</div>' +
    '</div>';
  };

  render.notes = function (p) {
    return '<div class="panel-inner notes">' + head(p) + markdownToHtml(p.markdown) + '</div>';
  };

  /* Minimal markdown: headings, rules, quotes, tables, lists, paragraphs, bold. */
  function markdownToHtml(md) {
    var lines = String(md).replace(/\r/g, '').split('\n');
    var out = [];
    var i = 0;

    function inline(s) {
      return esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    }
    function splitRow(row) {
      return row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(function (c) { return c.trim(); });
    }

    while (i < lines.length) {
      var line = lines[i].trim();

      if (!line) { i++; continue; }

      var heading = line.match(/^(#{2,3})\s+(.*)$/);
      if (heading) {
        var tag = heading[1].length === 2 ? 'h3' : 'h4';
        out.push('<' + tag + '>' + inline(heading[2]) + '</' + tag + '>');
        i++; continue;
      }

      if (/^-{3,}$/.test(line)) { out.push('<hr>'); i++; continue; }

      if (line.charAt(0) === '>') {
        var quote = [];
        while (i < lines.length && lines[i].trim().charAt(0) === '>') {
          quote.push(lines[i].trim().replace(/^>\s?/, ''));
          i++;
        }
        out.push('<blockquote><p>' + inline(quote.join(' ')) + '</p></blockquote>');
        continue;
      }

      if (line.charAt(0) === '|' && i + 1 < lines.length && /^\|[\s:|-]+\|?$/.test(lines[i + 1].trim())) {
        var head = splitRow(line);
        i += 2;
        var rows = [];
        while (i < lines.length && lines[i].trim().charAt(0) === '|') {
          rows.push(splitRow(lines[i]));
          i++;
        }
        out.push('<div class="kc-table-wrap"><table class="kc-table"><thead><tr>' +
          head.map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') +
          '</tr></thead><tbody>' +
          rows.map(function (r) {
            return '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
          }).join('') +
          '</tbody></table></div>');
        continue;
      }

      if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
        var ordered = /^\d+\.\s+/.test(line);
        var itemPattern = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;
        var items = [];
        while (i < lines.length && itemPattern.test(lines[i].trim())) {
          items.push('<li>' + inline(lines[i].trim().replace(itemPattern, '')) + '</li>');
          i++;
        }
        out.push((ordered ? '<ol>' : '<ul>') + items.join('') + (ordered ? '</ol>' : '</ul>'));
        continue;
      }

      out.push('<p>' + inline(line) + '</p>');
      i++;
    }

    return out.join('\n');
  }

  /* ------------------------------------------------------------- build */

  function build() {
    deck.innerHTML = panels.map(function (p, i) {
      var fn = render[p.render];
      var body = fn ? fn(p) : '<div class="panel-inner">' + head(p) + '</div>';
      return '<section class="panel" id="panel-' + p.id + '" role="tabpanel" ' +
             'aria-label="' + esc(p.nav) + '" data-index="' + i + '">' + body + '</section>';
    }).join('');

    dotsEl.innerHTML = panels.map(function (p, i) {
      return '<button class="dot" type="button" data-index="' + i + '" ' +
             'title="' + esc(p.nav) + '" aria-label="' + esc(p.nav) + '"></button>';
    }).join('');

    dotsEl.querySelectorAll('.dot').forEach(function (d) {
      d.addEventListener('click', function () { go(Number(d.dataset.index)); });
    });
  }

  function go(i, skipHash) {
    if (i < 0 || i >= panels.length) { return; }
    index = i;

    var sections = deck.querySelectorAll('.panel');
    sections.forEach(function (s, n) {
      s.classList.toggle('is-active', n === i);
      if (n === i) { s.scrollTop = 0; }
    });

    dotsEl.querySelectorAll('.dot').forEach(function (d, n) {
      d.setAttribute('aria-current', n === i ? 'true' : 'false');
    });

    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === panels.length - 1;
    progressEl.style.width = ((i + 1) / panels.length * 100) + '%';
    counterEl.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(panels.length).padStart(2, '0');

    if (!skipHash) {
      setHash(panels[i].id);
    }
  }

  /* Browsers (Chrome included) throw a SecurityError on history.replaceState
     for file:// URLs, so fall back to assigning location.hash directly. */
  function setHash(id) {
    if (location.hash === '#' + id) { return; }
    try {
      history.replaceState(null, '', '#' + id);
    } catch (err) {
      try { location.hash = id; } catch (err2) { /* hash unavailable */ }
    }
  }

  function indexFromHash() {
    var id = location.hash.replace('#', '');
    if (!id) { return 0; }
    for (var i = 0; i < panels.length; i++) {
      if (panels[i].id === id) { return i; }
    }
    return 0;
  }

  /* ------------------------------------------------------------ events */

  prevBtn.addEventListener('click', function () { go(index - 1); });
  nextBtn.addEventListener('click', function () { go(index + 1); });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.hidden) {
      if (e.key === 'Escape') { closeLightbox(); }
      return;
    }
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') { return; }

    switch (e.key) {
      case 'ArrowRight': case 'PageDown': e.preventDefault(); go(index + 1); break;
      case 'ArrowLeft':  case 'PageUp':   e.preventDefault(); go(index - 1); break;
      case 'Home': e.preventDefault(); go(0); break;
      case 'End':  e.preventDefault(); go(panels.length - 1); break;
    }
  });

  window.addEventListener('hashchange', function () { go(indexFromHash(), true); });

  var touchX = null, touchY = null;
  deck.addEventListener('touchstart', function (e) {
    touchX = e.changedTouches[0].clientX;
    touchY = e.changedTouches[0].clientY;
  }, { passive: true });

  deck.addEventListener('touchend', function (e) {
    if (touchX === null) { return; }
    var dx = e.changedTouches[0].clientX - touchX;
    var dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      go(dx < 0 ? index + 1 : index - 1);
    }
    touchX = touchY = null;
  }, { passive: true });

  /* ------------------------------------------------------------- theme */

  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    var next = t === 'dark' ? 'Light' : 'Dark';
    themeLabel.textContent = next;
    themeBtn.setAttribute('aria-label', 'Switch to ' + next.toLowerCase() + ' theme');
  }

  var stored = 'dark';
  try { stored = localStorage.getItem('portfolio-theme') || 'dark'; } catch (err) { stored = 'dark'; }
  applyTheme(stored);

  themeBtn.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('portfolio-theme', next); } catch (err) { /* storage unavailable */ }
  });

  /* ---------------------------------------------------------- lightbox */

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.removeAttribute('src');
  }

  deck.addEventListener('click', function (e) {
    var img = e.target.closest('.diagram img');
    if (!img) { return; }
    lightboxImg.src = img.getAttribute('src');
    lightboxImg.alt = img.getAttribute('alt') || '';
    lightboxCap.textContent = img.dataset.caption || '';
    lightbox.hidden = false;
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.tagName === 'FIGURE') { closeLightbox(); }
  });

  /* -------------------------------------------------------------- init */

  build();
  go(indexFromHash(), true);

  window.__deck = {
    go: go,
    current: function () { return index; },
    total: panels.length
  };
})();
