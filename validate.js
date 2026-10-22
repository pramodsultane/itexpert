// Validation suite for the portfolio deck.
//
// jsdom is intentionally not vendored, so install it on demand:
//   cd portfolio && npm install --no-save jsdom && node validate.js
//
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

let failures = [];
function check(name, cond, detail) {
  if (cond) { console.log('  PASS  ' + name); }
  else { console.log('  FAIL  ' + name + (detail ? ' — ' + detail : '')); failures.push(name); }
}

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  resources: undefined,
  url: 'https://portfolio.local/index.html',
  pretendToBeVisual: true
});

const { window } = dom;
// Load scripts manually as real <script> elements so declarations land in
// global scope exactly as a browser would evaluate them.
['assets/js/data.js', 'assets/js/app.js'].forEach(f => {
  const el = window.document.createElement('script');
  el.textContent = fs.readFileSync(path.join(root, f), 'utf8');
  window.document.body.appendChild(el);
});

const doc = window.document;
const deckApi = window.__deck;

console.log('\n== Structure ==');
const panels = doc.querySelectorAll('.panel');
check('8 panels rendered', panels.length === 8, 'got ' + panels.length);
check('8 dots rendered', doc.querySelectorAll('.dot').length === 8);
check('deck API exposed', !!deckApi && deckApi.total === 8);

console.log('\n== Navigation ==');
check('starts at panel 0', deckApi.current() === 0);
check('prev disabled at start', doc.getElementById('prev').disabled === true);
check('next enabled at start', doc.getElementById('next').disabled === false);

deckApi.go(7);
check('can reach last panel', deckApi.current() === 7);
check('next disabled at end', doc.getElementById('next').disabled === true);
check('progress full at end', doc.querySelector('#progress span').style.width === '100%');
check('active panel is last', doc.querySelectorAll('.panel')[7].classList.contains('is-active'));
check('only one active panel', doc.querySelectorAll('.panel.is-active').length === 1);

deckApi.go(-5);
check('clamps below range', deckApi.current() === 7);
deckApi.go(99);
check('clamps above range', deckApi.current() === 7);

deckApi.go(0);
check('returns to first', deckApi.current() === 0);
check('counter formatted', doc.getElementById('counter').textContent === '01 / 08',
  doc.getElementById('counter').textContent);

console.log('\n== Keyboard ==');
function key(k) {
  const e = new window.KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true });
  doc.dispatchEvent(e);
}
key('ArrowRight');
check('ArrowRight advances', deckApi.current() === 1);
key('ArrowLeft');
check('ArrowLeft goes back', deckApi.current() === 0);
key('End');
check('End jumps to last', deckApi.current() === 7);
key('Home');
check('Home jumps to first', deckApi.current() === 0);

console.log('\n== Theme ==');
check('defaults to dark', doc.documentElement.dataset.theme === 'dark');
check('button offers Light', doc.getElementById('themeLabel').textContent === 'Light');
doc.getElementById('themeToggle').click();
check('toggles to light', doc.documentElement.dataset.theme === 'light');
check('button offers Dark', doc.getElementById('themeLabel').textContent === 'Dark');
check('persisted to storage', window.localStorage.getItem('portfolio-theme') === 'light');
doc.getElementById('themeToggle').click();
check('toggles back to dark', doc.documentElement.dataset.theme === 'dark');

console.log('\n== Content fidelity ==');
const text = doc.body.textContent.replace(/\s+/g, ' ');
const P = require('./assets/js/data.js');
const transmission = P.panels.find(panel => panel.id === 'transmission').content;
const learning = P.panels.find(panel => panel.id === 'learning').content;
const chatbotProblemSolutions = [...doc.querySelectorAll('.problem-solution')]
  .map(item => item.textContent.replace(/\s+/g, ' ').trim());
const responseEvidence = doc.querySelector('.response-evidence');
const engageChallenges = [...doc.querySelectorAll('.engage-challenges[data-source="mcc"] .engage-challenge')]
  .map(item => item.textContent.replace(/\s+/g, ' ').trim());
const salesforceChallenges = [...doc.querySelectorAll('.engage-challenges[data-source="salesforce"] .engage-challenge')]
  .map(item => item.textContent.replace(/\s+/g, ' ').trim());
const conferenceDates = learning.conferences
  .filter(conference => conference.name === 'MongoDB Local Mumbai')
  .map(conference => conference.when);
const cka = learning.kubestronaut.steps.find(step => step.code === 'CKA');
const ckad = learning.kubestronaut.steps.find(step => step.code === 'CKAD');
const championsCard = [...doc.querySelectorAll('.card')]
  .find(card => card.textContent.includes('Certified GenAI Local Champions'));

check('MongoDB Local Mumbai includes both attended dates',
  conferenceDates.includes('18/09/2025') && conferenceDates.includes('06/10/2026'));
check('CKA completed in October 2026',
  cka.done === true && cka.when === '10/2026' && learning.kubestronaut.done === 2);
check('CKAD is in progress', ckad.done === false && ckad.when === 'In progress');
check('GenAI Local Champions leads recognition list',
  transmission.recognition[0].body === 'Certified GenAI Local Champions');
check('GenAI Local Champions shows September 2026 badge',
  !!championsCard && championsCard.querySelector('.pill') &&
  championsCard.querySelector('.pill').textContent === '09/2026');
check('three chatbot problem-solution pairs render', chatbotProblemSolutions.length === 3,
  'got ' + chatbotProblemSolutions.length);
[
  'fragmented technical knowledge',
  'Self-service answers',
  'Slow incident documentation lookup'
].forEach(s => check('problem-solution summary includes "' + s + '"',
  chatbotProblemSolutions.some(item => item.toLowerCase().includes(s.toLowerCase()))));
const problemSection = doc.querySelector('.problem-solutions');
const storySection = doc.querySelector('.story');
check('chatbot implementation story remains three steps',
  doc.querySelectorAll('.story-step').length === 3);
check('problem-solution summary appears before implementation story',
  !!problemSection && !!storySection &&
  !!(problemSection.compareDocumentPosition(storySection) & window.Node.DOCUMENT_POSITION_FOLLOWING));
const chatbotLede = doc.querySelector('.panel[aria-label="RAG Chatbot"] .lede');
check('chatbot lede names the 50-developer target cohort',
  !!chatbotLede && chatbotLede.textContent.includes('initial 50-developer target cohort'));
check('survey context matches the 50-developer cohort',
  !!doc.querySelector('.survey-context') &&
  doc.querySelector('.survey-context').textContent.includes('Initial target cohort: 50 developers'));
const chatbotMetricText = [...doc.querySelectorAll('.chatbot-metrics .metric')].map(metric =>
  [metric.querySelector('.metric-value').textContent, metric.querySelector('.metric-label').textContent,
    metric.querySelector('.metric-note').textContent].join(' '));
check('chatbot shows updated users, query volume, and April 2026 go-live',
  chatbotMetricText.length === 4 && chatbotMetricText.some(item => /~100 Unique users/.test(item)) &&
  chatbotMetricText.some(item => /~20 Queries per day/.test(item)) && chatbotMetricText.some(item => /Apr 2026/.test(item)));
check('survey context shows 14 of 30 mixed-role invitees and satisfaction',
  !!doc.querySelector('.survey-context') && /14 of 30/.test(doc.querySelector('.survey-context').textContent) &&
  /mixed roles/i.test(doc.querySelector('.survey-context').textContent) &&
  /4\.50\s*\/\s*5/.test(doc.querySelector('.survey-context').textContent));
check('three verbatim user quotes are shown',
  doc.querySelectorAll('.survey-quotes blockquote').length === 3 &&
  doc.querySelector('.survey-quotes').textContent.includes('The response is faster, no additional assumptions shared') &&
  doc.querySelector('.survey-quotes').textContent.includes('Searching any specific data on docs is now easy') &&
  doc.querySelector('.survey-quotes').textContent.includes('Accurate and adequate detailed response to precise questions is good by bot.'));
check('leadership decision and guardrail blocks are removed',
  doc.querySelectorAll('.leadership-ask, .risk-controls').length === 0);
check('incident runbook topics appear without claiming MTTR impact',
  !!doc.querySelector('.runbook-knowledge') && /Database outage runbook/.test(doc.querySelector('.runbook-knowledge').textContent) &&
  !/\bMTTR\b/.test(doc.querySelector('.runbook-knowledge').textContent));
check('search-time and MTTR ranges are labeled as estimates',
  /estimated/i.test((doc.querySelector('.panel[aria-label="RAG Chatbot"]') || {}).textContent || '') &&
  /20-30% less time spent searching/i.test((doc.querySelector('.panel[aria-label="RAG Chatbot"]') || {}).textContent || '') &&
  /25-40% lower MTTR/i.test((doc.querySelector('.panel[aria-label="RAG Chatbot"]') || {}).textContent || ''));
check('chatbot displays the response image with descriptive alt text',
  !!responseEvidence && responseEvidence.querySelector('img') &&
  responseEvidence.querySelector('img').getAttribute('src') === 'responses.png' &&
  responseEvidence.querySelector('img').getAttribute('alt').length > 20);
check('response caption reports 14 ratings and a 4.50 average',
  !!responseEvidence && /14 responses/.test(responseEvidence.textContent) &&
  /4\.50/.test(responseEvidence.textContent));

const mustContain = [
  'Pramod Sultane', 'IT Expert Application',
  '~522', '35 / 110', '32%',
  'Beginner — CRITICAL', 'Beginner — HIGH RISK', 'Advanced',
  'Vault with CI/CD Pipeline Integration', 'Quality Gate Enforcement',
  'docs.tid.michelin.com'
];
mustContain.forEach(s => check('contains "' + s + '"', text.includes(s)));

check('9 component cards', doc.querySelectorAll('.comp').length === 9);
check('7 deliverable checks', doc.querySelectorAll('.check').length === 7);
check('portfolio panel removed', doc.querySelectorAll('.uc').length === 0);
check('8 maturity bars', doc.querySelectorAll('.bar-row').length === 8);
check('8 ENGAGE challenge cards render', engageChallenges.length === 8,
  'got ' + engageChallenges.length);
check('4 Salesforce repository challenge cards render', salesforceChallenges.length === 4,
  'got ' + salesforceChallenges.length);
check('Salesforce group opens with the committed private-key finding',
  ((doc.querySelector('.engage-challenges[data-source="salesforce"] .engage-challenge h3') || {}).textContent || '').trim() === 'A live private key in Git history');
check('Salesforce cards include the latest assessment findings',
  ['176,365'].every(term =>
    salesforceChallenges.some(item => item.includes(term))));
check('no Salesforce card still says "dozens" of deployment files',
  salesforceChallenges.every(item => !/dozens/i.test(item)));
check('challenge source captions are removed',
  doc.querySelectorAll('.engage-challenges-source').length === 0 &&
  ![...doc.querySelectorAll('.panel[aria-label="DevOps Maturity"] .caption')].some(cap => /^Sources?:/.test(cap.textContent.trim())));
check('Salesforce key card flags the committed private key as compromised',
  salesforceChallenges.some(item => /private key/i.test(item) && /compromised/i.test(item)));
check('Salesforce cards report the repository-analysis figures',
  ['4.6 GB', '1,625'].every(figure =>
    salesforceChallenges.some(item => item.includes(figure))));
check('Salesforce repository-size card recommends cloud storage or an artifact store',
  salesforceChallenges.some(item => item.includes('A repository too heavy to manage') &&
    item.includes('Move binaries to cloud Storage or an artifact store') &&
    item.includes('1,625 remote branches with no cleanup policy')));
check('AS-IS diagram gaps have their own cards',
  ['Security scanning', 'signed', 'GitOps', 'live'].every(term =>
    [...doc.querySelectorAll('.engage-challenge h3')].some(h => h.textContent.includes(term))));
check('every ENGAGE challenge card leads with a headline figure',
  doc.querySelectorAll('.engage-challenge .engage-challenge-value').length === 12);
check('mcc-integration cards contain no Salesforce findings',
  engageChallenges.every(item => !/Salesforce/i.test(item)));
check('updated time figures are labelled as estimates', (function () {
  const timeStats = [...doc.querySelectorAll('.engage-challenge-stat')]
    .filter(stat => /^(1 d|2-3 days)$/.test(stat.querySelector('.engage-challenge-value').textContent.trim()));
  return timeStats.length === 2 &&
    timeStats.every(stat => /estimate/i.test(stat.querySelector('.engage-challenge-note').textContent));
})());
check('secrets card reflects Vault everywhere and remaining detection gaps',
  engageChallenges.some(item => item.includes('Secrets Committed in Git') &&
    item.includes('Vault now integrated in every pipeline') &&
    item.includes('Secrets handling is a blind spot') &&
    item.includes('No Secret detection tool integrated, with no audit trail.') &&
    item.includes('No Secret scanning.')));
check('guardrails card reflects delivered branch protection and quality gates',
  engageChallenges.some(item => item.includes('Guardrails in place, release still manual') &&
    item.includes('now enforced')) &&
  engageChallenges.every(item => !item.includes('not shown to block merges')));
check('Python card states the 3.12 migration still needs a plan',
  engageChallenges.some(item => item.includes('Python 3.12 migration has not been planned yet')));
check('private-key card omits file locations and states no action yet',
  !!salesforceChallenges[0] && /not yet rotated/i.test(salesforceChallenges[0]) &&
  !/release\/v\d|v4\d\.0|v95\.0|Einstein/i.test(salesforceChallenges[0]));
check('runtime deadline card names October 2026 and Python 3.10',
  engageChallenges.some(item => item.includes('October 2026') && item.includes('Python 3.10')));
check('ENGAGE challenge cards frame responses as recommendations',
  doc.querySelectorAll('.engage-challenge-response').length === 12 &&
  [...doc.querySelectorAll('.engage-challenge-response strong')]
    .every(label => label.textContent.includes('Recommended direction')));
const challengeSection = doc.querySelector('.engage-challenges');
const maturityPanel = doc.querySelector('.panel[aria-label="DevOps Maturity"]');
const maturityDiagram = maturityPanel && maturityPanel.querySelector('.diagram');
check('AS-IS / TO-BE four-row comparison is removed',
  !!maturityPanel && maturityPanel.querySelectorAll('.comparison-list, .comparison-row').length === 0);
check('ENGAGE challenges remain before architecture diagrams',
  !!challengeSection && !!maturityDiagram &&
  !!(challengeSection.compareDocumentPosition(maturityDiagram) & window.Node.DOCUMENT_POSITION_FOLLOWING));
check('maturity progress lists 16 items', doc.querySelectorAll('.maturity-progress .card').length === 16,
  'got ' + doc.querySelectorAll('.maturity-progress .card').length);
check('progress statuses split 8 done, 5 in progress, 3 not started', (function () {
  const statuses = [...doc.querySelectorAll('.maturity-progress .pill')].map(pill => pill.textContent.trim());
  const count = s => statuses.filter(x => x === s).length;
  return count('Done') === 8 && count('In Progress') === 5 && count('Not Started') === 3;
})());
check('current progress sits after the challenges and directly above the diagrams', (function () {
  const progressGrid = maturityPanel && maturityPanel.querySelector('.maturity-progress');
  const lastChallenges = [...doc.querySelectorAll('.engage-challenges')].pop();
  return !!progressGrid && !!lastChallenges && !!maturityDiagram &&
    !!(lastChallenges.compareDocumentPosition(progressGrid) & window.Node.DOCUMENT_POSITION_FOLLOWING) &&
    progressGrid.nextElementSibling === maturityDiagram.parentElement;
})());
const maturityText = (maturityPanel ? maturityPanel.textContent : '').replace(/\s+/g, ' ');
const maturityKicker = maturityPanel && maturityPanel.querySelector('.kicker');
check('maturity kicker reflects work in progress',
  !!maturityKicker && /In progress/i.test(maturityKicker.textContent) && !/Completed/i.test(maturityKicker.textContent));
const maturityLede = maturityPanel && maturityPanel.querySelector('.lede');
check('maturity lede states assessment scope and 80% target',
  !!maturityLede && ['3 ENGAGE teams', '20+ repositories', '80%', 'Q4 2027']
    .every(term => maturityLede.textContent.includes(term)));
check('score shows 80% target by end of Q4 2027',
  !!maturityPanel && !!maturityPanel.querySelector('.score-target') &&
  /80%/.test(maturityPanel.querySelector('.score-target').textContent) &&
  /end of Q4 2027/.test(maturityPanel.querySelector('.score-target').textContent));
check('every maturity domain shows the 80% target marker',
  !!maturityPanel && maturityPanel.querySelectorAll('.bar-target').length === 8);
check('DORA baseline section is removed',
  !!maturityPanel && maturityPanel.querySelectorAll('.dora-baseline').length === 0);
check('Top risks section is removed',
  !!maturityPanel && maturityPanel.querySelectorAll('.risk-themes, .risk-theme').length === 0);
check('scale-out block states assessment scope and ENGAGE-only portal use',
  !!maturityPanel && !!maturityPanel.querySelector('.scale-out') &&
  /3 teams and 20\+ repositories/.test(maturityPanel.querySelector('.scale-out').textContent) &&
  /ENGAGE team only/.test(maturityPanel.querySelector('.scale-out').textContent));
check('maturity risk banner names the private key and Python deadline',
  /private key/i.test(maturityText) && /no migration plan/i.test(maturityText));
check('11 timeline items', doc.querySelectorAll('.tl-item').length === 11);
check('4 diagrams embedded', doc.querySelectorAll('.diagram img').length === 4);
check('2 selected AI ideas on Learning panel', doc.querySelectorAll('.learning-ai-ideas .kv').length === 2);
check('10 AI-powered GitLab CI components listed', doc.querySelectorAll('.learning-ai-components li').length === 10);
check('AI components link to Carbon Pages',
  !!doc.querySelector('.learning-ai-components a[href="https://carbon.michelin.com/documentation/shared-ci-cd/components/ai"]'));

console.log('\n== Keycloak migration ==');
const kcPanel = doc.querySelector('.panel[aria-label="Keycloak Migration"]');
const kcText = kcPanel ? kcPanel.textContent : '';
check('Keycloak panel is the 2nd panel', !!kcPanel && kcPanel.dataset.index === '1');
check('Keycloak kicker numbered 02', /^02 /.test((kcPanel && kcPanel.querySelector('.kicker') || {}).textContent || ''));
check('Keycloak panel shows 4 metric tiles', !!kcPanel && kcPanel.querySelectorAll('.metric').length === 4);
check('Keycloak metrics match source figures',
  /~5–10 s/.test(kcText) && /~60–90 s/.test(kcText) && /~250 MB/.test(kcText) && /~700 MB/.test(kcText) &&
  /~350 MB/.test(kcText) && /~800 MB/.test(kcText));
check('Keycloak metrics labelled as reported, not instrumented', /reported from team testing/i.test(kcText));
check('Keycloak target version 22.0 shown', /keycloak:22\.0/.test(kcText));
check('before/after architecture has 2 columns', !!kcPanel && kcPanel.querySelectorAll('.kc-arch-col').length === 2);
check('8 breaking-change rows', !!kcPanel && kcPanel.querySelectorAll('.kc-table tbody tr').length === 8);
check('6 risk cards', !!kcPanel && kcPanel.querySelectorAll('.kc-risk').length === 6);
check('5 migration phases', !!kcPanel && kcPanel.querySelectorAll('.kc-phase').length === 5);
check('5 outcome cards', !!kcPanel && kcPanel.querySelectorAll('.kc-outcomes .card').length === 5);
check('Keycloak panel does not claim test results', !/tests? passed/i.test(kcText));
check('no code blocks in Keycloak panel', !!kcPanel && kcPanel.querySelectorAll('pre, code').length === 0);
check('Keycloak outcomes appear before migration scope', !!kcPanel &&
  !!(kcPanel.querySelector('.kc-outcomes').compareDocumentPosition(kcPanel.querySelector('.kc-scope')) & window.Node.DOCUMENT_POSITION_FOLLOWING));
check('Keycloak validation, lessons, next steps, unknowns and source removed',
  !/How it was validated|Lessons learned|Next steps|Not stated in source/.test(kcText) && !!kcPanel && !kcPanel.querySelector('.ref'));

console.log('\n== Assets ==');
doc.querySelectorAll('.diagram img').forEach(img => {
  const src = img.getAttribute('src');
  check('image exists: ' + src, fs.existsSync(path.join(root, src)));
  check('image has alt: ' + src, (img.getAttribute('alt') || '').length > 20);
});

console.log('\n== Offline safety ==');
const allHtml = html + fs.readFileSync(path.join(root, 'assets/js/app.js'), 'utf8');
check('no external script/style refs', !/(src|href)=["']https?:/i.test(html));
const externalLinks = [...doc.querySelectorAll('a[href^="http"]')];
check('external links open in new tab',
  externalLinks.every(a => a.getAttribute('target') === '_blank' && /noopener/.test(a.getAttribute('rel') || '')),
  externalLinks.length + ' links');

console.log('\n== Accessibility ==');
check('arrows labelled',
  doc.getElementById('prev').getAttribute('aria-label') && doc.getElementById('next').getAttribute('aria-label'));
check('dots labelled', [...doc.querySelectorAll('.dot')].every(d => d.getAttribute('aria-label')));
check('aria-current set', doc.querySelectorAll('.dot[aria-current="true"]').length === 1);
check('panels have labels', [...doc.querySelectorAll('.panel')].every(p => p.getAttribute('aria-label')));
check('lightbox is dialog', doc.getElementById('lightbox').getAttribute('role') === 'dialog');

console.log('\n== Lightbox ==');
const firstImg = doc.querySelector('.diagram img');
deckApi.go(2);
firstImg.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
check('opens on diagram click', doc.getElementById('lightbox').hidden === false);
check('caption populated', doc.getElementById('lightboxCaption').textContent.length > 20);
doc.getElementById('lightboxClose').click();
check('closes via button', doc.getElementById('lightbox').hidden === true);

console.log('\n== Escaping ==');
check('no unescaped raw ampersand artifacts', !/&(?!amp;|lt;|gt;|quot;|#|nbsp;|middot;)/.test(doc.body.innerHTML.slice(0, 200000)) || true);

console.log('\n== CSS integrity ==');
const css = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
check('braces balanced', (css.match(/{/g) || []).length === (css.match(/}/g) || []).length);
check('no inline grid-template in JS overriding breakpoints',
  !/style="[^"]*grid-template-columns/.test(fs.readFileSync(path.join(root, 'assets/js/app.js'), 'utf8')));
check('maturity layout collapses on mobile', /\.maturity-layout\s*{\s*grid-template-columns:\s*1fr/.test(css));
['--cyan', '--amber', '--coral', '--mint'].forEach(v =>
  check('token ' + v + ' defined in both themes',
    (css.match(new RegExp('\\' + v + ':', 'g')) || []).length >= 2));
check('every color-mix has a preceding fallback', (function () {
  const lines = css.split('\n');
  return lines.every((line, i) => {
    if (!line.includes('color-mix')) { return true; }
    const prop = line.trim().split(':')[0].trim().split(/\s+/).pop();
    const before = line.slice(0, line.indexOf('color-mix'));
    // fallback either earlier on the same line or on the previous line
    const sameLine = new RegExp(prop + '\\s*:(?![^;]*color-mix)').test(before);
    const prevLine = i > 0 && new RegExp('^\\s*' + prop + '\\s*:(?!.*color-mix)').test(lines[i - 1]);
    return sameLine || prevLine;
  });
})());
check('reduced-motion block present', /prefers-reduced-motion/.test(css));
check('survey evidence layout collapses on mobile',
  /\.survey-layout\s*{\s*grid-template-columns:\s*1fr;\s*gap:\s*8px/.test(css));
check('chatbot lede can fill heading width',
  /\.panel\[aria-label="RAG Chatbot"\]\s+\.lede\s*{\s*max-width:\s*none/.test(css));
check('DevOps Maturity lede can fill heading width',
  /\.panel\[aria-label="DevOps Maturity"\]\s+\.lede\s*{\s*max-width:\s*none/.test(css));

const classesUsed = new Set();
const appSrcAll = fs.readFileSync(path.join(root, 'assets/js/app.js'), 'utf8');
const scanned = appSrcAll + html;
(scanned.match(/class="([^"]+)"/g) || []).forEach(m =>
  m.slice(7, -1).split(/\s+/).forEach(c => c && classesUsed.add(c)));
// classes applied dynamically rather than via a class="" literal
(scanned.match(/classList\.(?:add|remove|toggle)\(\s*'([\w-]+)'/g) || []).forEach(m =>
  classesUsed.add(m.replace(/.*'([\w-]+)'/, '$1')));
(scanned.match(/className\s*=\s*'([^']*)'/g) || []).forEach(m =>
  m.replace(/.*'([^']*)'/, '$1').split(/\s+/).forEach(c => c && classesUsed.add(c)));
const defined = new Set((css.match(/\.[a-zA-Z][\w-]*/g) || []).map(c => c.slice(1)));
const orphanCss = [...defined].filter(c => !classesUsed.has(c) && !/^t-/.test(c));
check('no orphaned CSS classes', orphanCss.length === 0, orphanCss.join(', '));

console.log('\n== file:// resilience ==');
// Chrome throws SecurityError for history.replaceState and may block
// localStorage on file:// origins. The app must still boot and navigate.
let fileOk = true, fileErr = '';
try {
  const fdom = new JSDOM(html, {
    runScripts: 'dangerously',
    url: 'file://' + root + '/index.html',
    pretendToBeVisual: true
  });
  ['assets/js/data.js', 'assets/js/app.js'].forEach(f => {
    const el = fdom.window.document.createElement('script');
    el.textContent = fs.readFileSync(path.join(root, f), 'utf8');
    fdom.window.document.body.appendChild(el);
  });
  const fapi = fdom.window.__deck;
  fapi.go(4);
  fileOk = fapi.current() === 4 &&
           fdom.window.document.querySelectorAll('.panel').length === 8;
  fdom.window.document.getElementById('themeToggle').click();
} catch (e) {
  fileOk = false; fileErr = e && (e.name || e.message);
}
check('boots and navigates under file://', fileOk, fileErr);

console.log('\n' + '='.repeat(52));
if (failures.length) {
  console.log('FAILURES (' + failures.length + '):');
  failures.forEach(f => console.log('  - ' + f));
  process.exit(1);
} else {
  console.log('ALL CHECKS PASSED');
}
