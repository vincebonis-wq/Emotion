/* ============================================================
   Travail émotionnel — app principale (PWA)
   Deux modes de stockage :
     • Local  : tout reste sur l'appareil (aucun compte requis)
     • Cloud  : Firebase Auth + Firestore (synchro multi-appareils)
   Modules : Future Self Journal · Check-in · Reparentage ·
   Régulation · Conscience de soi · Journal expressif + suivi
   Méthode : Dr. Nicole LePera (How to Do the Work) + Pennebaker
   ============================================================ */
'use strict';

/* ---------- Ouroboros (inline, hérite currentColor) ---------- */
const OUROBOROS = `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<g stroke="currentColor" fill="none" stroke-linecap="round">
<path d="M100 22 a78 78 0 1 1 -55 23" stroke-width="7"/>
<path d="M45 45 q-14 12 -6 26 q6 10 20 8 q10 -2 12 -12" stroke-width="7"/>
<circle cx="52" cy="58" r="3.2" fill="currentColor" stroke="none"/>
<path d="M64 66 q-8 -6 -16 -4" stroke-width="4"/>
<circle cx="100" cy="100" r="64" stroke-width="1.2" opacity="0.5"/>
</g></svg>`;

/* ---------- Helpers DOM ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (t, a = {}, ...kids) => {
  const n = document.createElement(t);
  for (const k in a) {
    if (k === 'class') n.className = a[k];
    else if (k === 'html') n.innerHTML = a[k];
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), a[k]);
    else if (a[k] != null) n.setAttribute(k, a[k]);
  }
  kids.flat().forEach((c) => c != null && n.append(c.nodeType ? c : document.createTextNode(c)));
  return n;
};
const todayISO = () => new Date().toISOString().slice(0, 10);
const monthKey = () => new Date().toISOString().slice(0, 7);
const fmtDate = (d) => new Date(d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
const fmtDateTime = (ms) => new Date(ms).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const uid = () => 'l' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2400);
}
function modal(node, { title } = {}) {
  const root = $('#modalRoot');
  const box = el('div', { class: 'modal' });
  if (title) box.append(el('h2', {}, title));
  box.append(node);
  const bg = el('div', { class: 'modal-bg', onclick: (e) => { if (e.target === bg) close(); } }, box);
  function close() { bg.remove(); }
  root.append(bg);
  return { close, box };
}

/* ============================================================
   Thèmes de couleur (doux)
   ============================================================ */
const PALETTES = {
  sauge:   { nm: 'Sauge',   sw: '#7FA89A', accent: '#7FA89A', deep: '#5E8578', soft: '#E6EFEA', glow: 'rgba(127,168,154,.18)' },
  brume:   { nm: 'Brume',   sw: '#84A9B5', accent: '#84A9B5', deep: '#5F8894', soft: '#E5EEF1', glow: 'rgba(132,169,181,.18)' },
  lavande: { nm: 'Lavande', sw: '#A198C6', accent: '#A198C6', deep: '#7E74A6', soft: '#ECE9F3', glow: 'rgba(161,152,198,.18)' },
  rose:    { nm: 'Rose',    sw: '#C99EA8', accent: '#C99EA8', deep: '#A87B87', soft: '#F3E9EC', glow: 'rgba(201,158,168,.18)' },
  argile:  { nm: 'Argile',  sw: '#C79E88', accent: '#C79E88', deep: '#A87C66', soft: '#F1E8E1', glow: 'rgba(199,158,136,.18)' },
  sable:   { nm: 'Sable',   sw: '#C9B583', accent: '#C9B583', deep: '#A8945F', soft: '#F1EBD9', glow: 'rgba(201,181,131,.18)' },
};

/* ============================================================
   État global
   ============================================================ */
const State = {
  mode: null,          // 'local' | 'cloud'
  user: null,          // {uid, email}
  db: null,
  prefs: { textScale: 1, theme: 'sauge' },
  config: {},          // objective, fsPattern, fsAffirmations, fsMonth…
  entries: [],
  unsub: [],
};

/* ---------- Modules ---------- */
const MODULES = {
  futureself: { ic: '🌱', nm: 'Future Self Journal', ds: 'Un pattern à transformer ce mois-ci + les prompts du jour (~5 min).' },
  checkin:    { ic: '🎡', nm: 'Check-in émotionnel', ds: 'Nommer ce que je ressens et son intensité — nommer pour apaiser.' },
  reparenting:{ ic: '🤍', nm: 'Enfant intérieur', ds: 'Les 4 piliers du reparentage : revenir dans le corps, écouter le besoin.' },
  regulation: { ic: '🌬️', nm: 'Régulation', ds: 'Cohérence cardiaque 5s/5s et ancrage somatique pour apaiser le système nerveux.' },
  awareness:  { ic: '👁️', nm: 'Conscience de soi', ds: 'Repérer les histoires automatiques de l’ego, devenir l’observateur.' },
  expressive: { ic: '✍️', nm: 'Journal expressif', ds: 'Écrire librement (Pennebaker) et suivre l’humeur dans le temps.' },
};

const WHEEL = {
  Joie:            ['heureux·se', 'serein·e', 'fier·ère', 'enthousiaste', 'reconnaissant·e', 'apaisé·e'],
  Tristesse:       ['triste', 'seul·e', 'découragé·e', 'mélancolique', 'vide', 'déçu·e'],
  Peur:            ['anxieux·se', 'inquiet·ète', 'tendu·e', 'effrayé·e', 'insécure', 'dépassé·e'],
  Colère:          ['irrité·e', 'frustré·e', 'en colère', 'agacé·e', 'amer·ère', 'jaloux·se'],
  'Honte / gêne':  ['honteux·se', 'coupable', 'mal à l’aise', 'gêné·e'],
  Autre:           ['surpris·e', 'confus·e', 'curieux·se', 'ému·e', 'fatigué·e', 'neutre'],
};
const PILLARS = [
  { t: 'Discipline aimante', d: 'Tenir un cadre doux, des engagements tenables envers soi.' },
  { t: 'Prendre soin de soi', d: 'Répondre à ses besoins de base : sommeil, corps, calme.' },
  { t: 'Joie / Jeu', d: 'Se laisser jouer, créer, ressentir la légèreté sans but.' },
  { t: 'Régulation émotionnelle', d: 'Accueillir l’émotion, revenir au corps, se rassurer.' },
];

/* ============================================================
   Bootstrap
   ============================================================ */
function injectMarks() {
  ['#backdrop', '#authMark', '#topMark'].forEach((s) => { const n = $(s); if (n) n.innerHTML = OUROBOROS; });
}
function applyTextScale() { document.documentElement.style.setProperty('--tscale', State.prefs.textScale); }
function applyTheme() {
  const t = PALETTES[State.prefs.theme] || PALETTES.sauge;
  const r = document.documentElement.style;
  r.setProperty('--accent', t.accent);
  r.setProperty('--accent-deep', t.deep);
  r.setProperty('--accent-soft', t.soft);
  r.setProperty('--accent-glow', t.glow);
  const meta = document.querySelector('meta[name=theme-color]'); if (meta) meta.content = t.accent;
}
function loadLocalPrefs() { try { Object.assign(State.prefs, JSON.parse(localStorage.getItem('emotion_prefs') || '{}')); } catch (_) {} }
function savePrefsLocal() { try { localStorage.setItem('emotion_prefs', JSON.stringify(State.prefs)); } catch (_) {} }

window.addEventListener('DOMContentLoaded', () => {
  injectMarks();
  loadLocalPrefs();
  applyTextScale();
  applyTheme();

  bindAuthUI();
  if (window.FIREBASE_READY) initFirebase();
  else { $('#loading').classList.add('hidden'); showAuth(); }
});

/* ============================================================
   Firebase / Auth (mode cloud)
   ============================================================ */
function initFirebase() {
  firebase.initializeApp(window.FIREBASE_CONFIG);
  State.db = firebase.firestore();
  firebase.auth().onAuthStateChanged((user) => {
    $('#loading').classList.add('hidden');
    if (user) { State.mode = 'cloud'; State.user = { uid: user.uid, email: user.email }; enterAppCloud(); }
    else if (State.mode !== 'local') { teardown(); showAuth(); }
  });
}

function showAuth() {
  $('#appView').classList.add('hidden');
  $('#authView').classList.remove('hidden');
  $('#configWarn').classList.add('hidden');
  const forms = $('#authForms');
  forms.classList.remove('hidden');
  // Bloc mode local (toujours proposé) + cloud selon config
  $('#cloudBlock').classList.toggle('hidden', !window.FIREBASE_READY);
  $('#cloudNote').classList.toggle('hidden', window.FIREBASE_READY);
}

let authMode = 'login';
function bindAuthUI() {
  const setMode = (m) => {
    authMode = m;
    $('#tabLogin').classList.toggle('on', m === 'login');
    $('#tabSignup').classList.toggle('on', m === 'signup');
    $('#authBtn').textContent = m === 'login' ? 'Se connecter' : 'Créer mon compte';
    $('#authErr').textContent = '';
  };
  $('#tabLogin').onclick = () => setMode('login');
  $('#tabSignup').onclick = () => setMode('signup');
  $('#authBtn').onclick = doAuth;
  $('#localBtn').onclick = enterAppLocal;
  $('#password').addEventListener('keydown', (e) => { if (e.key === 'Enter') doAuth(); });
}

async function doAuth() {
  const email = $('#email').value.trim(), pass = $('#password').value, errEl = $('#authErr');
  errEl.textContent = '';
  if (!email || !pass) { errEl.textContent = 'Renseignez e-mail et mot de passe.'; return; }
  if (authMode === 'signup' && pass.length < 6) { errEl.textContent = 'Mot de passe : 6 caractères minimum.'; return; }
  const btn = $('#authBtn'); btn.disabled = true; const old = btn.textContent; btn.textContent = '…';
  try {
    if (authMode === 'login') await firebase.auth().signInWithEmailAndPassword(email, pass);
    else await firebase.auth().createUserWithEmailAndPassword(email, pass);
  } catch (e) { errEl.textContent = authError(e.code); }
  finally { btn.disabled = false; btn.textContent = old; }
}
function authError(code) {
  return ({
    'auth/invalid-email': 'Adresse e-mail invalide.',
    'auth/user-not-found': 'Aucun compte pour cet e-mail.',
    'auth/wrong-password': 'Mot de passe incorrect.',
    'auth/invalid-credential': 'Identifiants incorrects.',
    'auth/email-already-in-use': 'Un compte existe déjà pour cet e-mail.',
    'auth/weak-password': 'Mot de passe trop faible (6 caractères min.).',
    'auth/network-request-failed': 'Problème de réseau — réessayez.',
    'auth/too-many-requests': 'Trop de tentatives, patientez un instant.',
  })[code] || 'Une erreur est survenue. Réessayez.';
}
function teardown() {
  State.unsub.forEach((u) => { try { u(); } catch (_) {} });
  State.unsub = []; State.entries = []; State.config = {}; State.user = null; State.mode = null;
}

/* ============================================================
   Entrée dans l'app
   ============================================================ */
function enterAppCloud() {
  showApp();
  const uref = State.db.collection('users').doc(State.user.uid);
  State.unsub.push(uref.collection('config').doc('app').onSnapshot((doc) => {
    State.config = doc.exists ? doc.data() : {};
    syncPrefsFromConfig();
    render();
  }, () => {}));
  State.unsub.push(uref.collection('entries').orderBy('createdAt', 'desc').onSnapshot((snap) => {
    State.entries = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    render();
  }, () => toast('Synchro en pause (hors ligne ?)')));
  render();
}

function enterAppLocal() {
  State.mode = 'local';
  State.user = { uid: 'local', email: 'Cet appareil' };
  State.entries = LS.entries().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  State.config = LS.config();
  syncPrefsFromConfig();
  showApp();
  render();
}

function syncPrefsFromConfig() {
  let changed = false;
  if (typeof State.config.textScale === 'number') { State.prefs.textScale = State.config.textScale; changed = true; }
  if (State.config.theme && PALETTES[State.config.theme]) { State.prefs.theme = State.config.theme; changed = true; }
  if (changed) { savePrefsLocal(); applyTextScale(); applyTheme(); }
}

function showApp() {
  $('#authView').classList.add('hidden');
  $('#appView').classList.remove('hidden');
  bindAppChrome();
}

/* ---------- Stockage local ---------- */
const LS = {
  entries() { try { return JSON.parse(localStorage.getItem('emotion_entries') || '[]'); } catch (_) { return []; } },
  setEntries(a) { try { localStorage.setItem('emotion_entries', JSON.stringify(a)); } catch (_) {} },
  config() { try { return JSON.parse(localStorage.getItem('emotion_config') || '{}'); } catch (_) { return {}; } },
  setConfig(o) { try { localStorage.setItem('emotion_config', JSON.stringify(o)); } catch (_) {} },
};
function userRef() { return State.db.collection('users').doc(State.user.uid); }

/* ---------- CRUD unifié (local ou cloud) ---------- */
async function addEntry(module, data) {
  const doc = { module, date: todayISO(), createdAt: Date.now(), ...data };
  if (State.mode === 'cloud') { await userRef().collection('entries').add(doc); }
  else { State.entries.unshift({ id: uid(), ...doc }); LS.setEntries(State.entries); render(); }
  toast('Enregistré 🤍');
}
async function delEntry(id) {
  if (State.mode === 'cloud') { await userRef().collection('entries').doc(id).delete(); }
  else { State.entries = State.entries.filter((e) => e.id !== id); LS.setEntries(State.entries); render(); }
  toast('Supprimé');
}
async function saveConfig(patch) {
  State.config = { ...State.config, ...patch };
  if (State.mode === 'cloud') { await userRef().collection('config').doc('app').set(patch, { merge: true }); }
  else { LS.setConfig(State.config); }
}
function entriesOf(module) { return State.entries.filter((e) => e.module === module); }
function hasEntry(module) { return State.entries.some((e) => e.module === module); }
function latestBilan() { return entriesOf('bilan')[0] || null; }   // entries triées desc
function firstBilan() { const b = entriesOf('bilan'); return b[b.length - 1] || null; }

/* Signaux de thèmes agrégés (cross-exercices) : bilan + ateliers + cases cochées */
function computeThemeSignals() {
  const sig = {}; Object.keys(THEMES).forEach((k) => (sig[k] = 0));
  const lb = latestBilan();
  if (lb && lb.scores) Object.entries(lb.scores).forEach(([k, v]) => { if (sig[k] != null) sig[k] += v; });
  entriesOf('atelier').forEach((a) => {
    if (sig[a.theme] == null) return;
    sig[a.theme] += 12;                          // avoir exploré le thème
    sig[a.theme] += (a.checks ? a.checks.length : 0) * 6; // cases « je me reconnais »
  });
  return sig;
}
function topTheme() {
  const sig = computeThemeSignals();
  const top = Object.entries(sig).sort((a, b) => b[1] - a[1])[0];
  return top && top[1] > 0 ? top[0] : null;
}
function emotionFreq() {
  const f = {};
  entriesOf('checkin').forEach((e) => { if (e.emotion) f[e.emotion] = (f[e.emotion] || 0) + 1; });
  return Object.entries(f).sort((a, b) => b[1] - a[1]);
}

/* Contexte passé au moteur d'étapes (STEPS) */
function stepCtx() {
  return { config: State.config, entries: State.entries, go, editObjective, hasEntry, topTheme };
}
function currentStep() { return (window.STEPS || []).find((st) => !st.done(stepCtx())); }
function bilanDone() { return hasEntry('bilan'); }

/* ============================================================
   Chrome (topbar)
   ============================================================ */
function bindAppChrome() {
  $('#btnText').onclick = openTextSize;
  $('#btnMenu').onclick = openMenu;
}

function openTextSize() {
  const steps = [0.9, 1, 1.1, 1.25, 1.4];
  const box = el('div', {},
    el('p', { class: 'muted small' }, 'Ajustez la taille du texte selon votre confort.'),
    el('div', { class: 'center' }, el('span', { class: 'rangeval', id: 'tsVal' }, Math.round(State.prefs.textScale * 100) + '%')),
    el('input', { type: 'range', min: 0, max: steps.length - 1, step: 1,
      value: Math.max(0, steps.indexOf(State.prefs.textScale)),
      oninput: (e) => { State.prefs.textScale = steps[+e.target.value]; $('#tsVal').textContent = Math.round(State.prefs.textScale * 100) + '%'; applyTextScale(); } }),
    el('button', { class: 'btn primary block', style: 'margin-top:16px',
      onclick: () => { savePrefsLocal(); saveConfig({ textScale: State.prefs.textScale }); m.close(); toast('Taille enregistrée'); } }, 'Valider'),
  );
  const m = modal(box, { title: 'Taille du texte' });
}

function openThemePicker() {
  const sw = el('div', { class: 'swatches' });
  Object.entries(PALETTES).forEach(([id, t]) => {
    const s = el('button', { class: 'swatch' + (State.prefs.theme === id ? ' on' : ''), title: t.nm,
      style: `background:${t.sw}`, onclick: () => {
        State.prefs.theme = id; applyTheme(); savePrefsLocal(); saveConfig({ theme: id });
        $$('.swatch', sw).forEach((x) => x.classList.remove('on')); s.classList.add('on');
      } });
    sw.append(s);
  });
  const box = el('div', {}, el('p', { class: 'muted small center' }, 'Choisissez la couleur qui vous apaise.'), sw);
  modal(box, { title: 'Couleur de l’app' });
}

function openMenu() {
  const local = State.mode === 'local';
  const box = el('div', {},
    el('p', { class: 'small muted' }, local ? '📱 Mode local — sur cet appareil' : State.user.email),
    el('button', { class: 'btn ghost block', style: 'margin:6px 0', onclick: () => { m.close(); openThemePicker(); } }, '🎨 Couleur de l’app'),
    el('button', { class: 'btn ghost block', style: 'margin:6px 0', onclick: () => { m.close(); exportData(); } }, '⬇️ Exporter mes données'),
    el('button', { class: 'btn ghost block', style: 'margin:6px 0', onclick: () => { m.close(); importData(); } }, '⬆️ Importer'),
    el('hr', { class: 'sep' }),
    local
      ? el('button', { class: 'btn ghost block', onclick: () => { m.close(); teardown(); showAuth(); } }, '↩︎ Quitter le mode local')
      : el('button', { class: 'btn ghost block', style: 'color:var(--danger)', onclick: () => { m.close(); firebase.auth().signOut(); } }, '↩︎ Se déconnecter'),
  );
  const m = modal(box, { title: 'Menu' });
}

/* ---------- Export / import ---------- */
function exportData() {
  const payload = { app: 'travail-emotionnel', version: 1, exportedAt: new Date().toISOString(), config: State.config, entries: State.entries.map(({ id, ...r }) => r) };
  const a = el('a', { href: URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })), download: `emotion-${todayISO()}.json` });
  document.body.append(a); a.click(); a.remove(); toast('Export téléchargé');
}
function importData() {
  const inp = el('input', { type: 'file', accept: 'application/json', style: 'display:none' });
  inp.onchange = async () => {
    const f = inp.files[0]; if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      const entries = data.entries || [];
      if (!confirm(`Importer ${entries.length} entrée(s) ? Elles s'ajoutent à vos données.`)) return;
      if (State.mode === 'cloud') {
        const batch = State.db.batch();
        entries.forEach((e) => batch.set(userRef().collection('entries').doc(), { createdAt: Date.now(), ...e }));
        if (data.config) batch.set(userRef().collection('config').doc('app'), data.config, { merge: true });
        await batch.commit();
      } else {
        entries.forEach((e) => State.entries.unshift({ id: uid(), createdAt: Date.now(), ...e }));
        State.entries.sort((a, b) => b.createdAt - a.createdAt);
        LS.setEntries(State.entries);
        if (data.config) { State.config = { ...State.config, ...data.config }; LS.setConfig(State.config); syncPrefsFromConfig(); }
        render();
      }
      toast('Import réussi 🤍');
    } catch (e) { alert('Fichier invalide.'); }
  };
  document.body.append(inp); inp.click(); inp.remove();
}

/* ============================================================
   Router
   ============================================================ */
let currentRoute = 'home';
function go(route) { currentRoute = route; window.scrollTo(0, 0); render(); }

function render() {
  if (!State.mode) return;
  const s = $('#screen'); s.innerHTML = '';
  if (currentRoute === 'home') return renderHome(s);
  if (currentRoute.startsWith('atelier:')) return viewAtelier(s, currentRoute.slice(8));
  const fn = { bilan: viewBilan, bilanresult: viewBilanResultRoute, patterns: viewPatterns, futureself: viewFutureSelf, checkin: viewCheckin, reparenting: viewReparenting, regulation: viewRegulation, awareness: viewAwareness, expressive: viewExpressive }[currentRoute];
  (fn || renderHome)(s);
}

function viewHead(parent, title, sub) {
  parent.append(el('div', { class: 'vhead' },
    el('button', { class: 'back', title: 'Retour', onclick: () => go('home') }, '‹'),
    el('div', { class: 'vt' }, el('h2', {}, title), sub ? el('div', { class: 'sub' }, sub) : null)));
}

/* ---------- Objectif principal ---------- */
function renderObjective(s) {
  const obj = State.config.objective;
  s.append(el('div', { class: 'objective', onclick: editObjective },
    el('div', { class: 'obj-edit' }, '✎'),
    el('div', { class: 'obj-label' }, '✦ Mon objectif principal'),
    el('div', { class: 'obj-text' + (obj ? '' : ' empty') }, obj || 'Toucher pour définir mon objectif du moment…'),
  ));
}
function editObjective() {
  const ta = el('textarea', { placeholder: 'Ex. Apprendre à accueillir mes émotions sans me juger.', style: 'min-height:90px' });
  ta.value = State.config.objective || '';
  const box = el('div', {},
    el('p', { class: 'small muted' }, 'Votre cap intérieur — doux, non chiffré. Il vous accueille à chaque ouverture.'),
    ta,
    el('div', { class: 'row', style: 'margin-top:14px' },
      el('button', { class: 'btn ghost', onclick: () => m.close() }, 'Annuler'),
      el('button', { class: 'btn primary', onclick: () => { saveConfig({ objective: ta.value.trim() }); m.close(); render(); toast('Objectif enregistré ✦'); } }, 'Enregistrer')),
  );
  const m = modal(box, { title: 'Mon objectif principal' });
}

/* ---------- Accueil (guidé, en sections) ---------- */
function renderHome(s) {
  const hour = new Date().getHours();
  const hi = hour < 6 ? 'Douce nuit' : hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonne soirée';
  s.append(el('div', { class: 'greeting' },
    el('div', { class: 'hi' }, hi),
    el('div', { class: 'date' }, fmtDate(new Date())),
    State.mode === 'local' ? el('span', { class: 'mode-badge' }, '📱 Local') : null));

  renderObjective(s);

  if (State.config.fsAffirmations) {
    const affs = String(State.config.fsAffirmations).split('\n').map((x) => x.trim()).filter(Boolean);
    if (affs.length) s.append(el('div', { class: 'affirm' }, '“' + affs[new Date().getDate() % affs.length] + '”'));
  }

  renderNextStep(s);
  renderBilanTeaser(s);
  renderThemeSection(s);
  renderPatternsTeaser(s);
  renderExploration(s);

  s.append(el('p', { class: 'small muted center', style: 'margin-top:24px' }, 'Méthode inspirée de Dr. Nicole LePera — How to Do the Work.'));
}

/* Carte « Mon prochain pas » */
function renderNextStep(s) {
  const steps = window.STEPS || [];
  const step = currentStep();
  const doneCount = steps.filter((st) => st.done(stepCtx())).length;
  const prog = el('div', { class: 'ns-progress' });
  steps.forEach((_, i) => prog.append(el('i', { class: i < doneCount ? 'on' : '' })));

  if (!step) {
    s.append(el('div', { class: 'nextstep done' },
      el('div', { class: 'ns-kicker' }, '✦ Parcours de découverte'),
      el('h2', {}, 'Bravo, tu as fait le tour 🌿'),
      el('p', {}, 'Tu connais maintenant tous les espaces. Continue à ton rythme — reviens quand tu en as besoin.'),
      el('button', { class: 'btn', onclick: () => go('patterns') }, 'Revoir mes patterns'),
      prog));
    return;
  }
  s.append(el('div', { class: 'nextstep' },
    el('div', { class: 'ns-kicker' }, '✦ Mon prochain pas · étape ' + (doneCount + 1) + '/' + steps.length),
    el('h2', {}, step.title),
    el('p', {}, step.desc),
    el('button', { class: 'btn', onclick: () => step.act(stepCtx()) }, step.cta),
    prog));
}

/* Aperçu bilan */
function renderBilanTeaser(s) {
  const lb = latestBilan();
  s.append(el('div', { class: 'sec-head' }, el('h2', {}, 'Bilan & progression'),
    lb ? el('button', { class: 'link', onclick: () => go('bilan') }, 'Refaire →') : null));
  if (!lb) {
    s.append(el('div', { class: 'card', onclick: () => go('bilan'), style: 'cursor:pointer' },
      el('p', { class: 'small muted', style: 'margin:0' }, '📋 Fais ton premier bilan (~5 min) pour découvrir tes thèmes et suivre ton évolution dans le temps.')));
    return;
  }
  const n = entriesOf('bilan').length;
  s.append(el('div', { class: 'card', onclick: () => go('bilan'), style: 'cursor:pointer;display:flex;align-items:center;gap:16px' },
    el('div', { class: 'score-hero', style: 'padding:0' }, el('div', { class: 'big', style: 'font-size:2.2em' }, lb.total), el('div', { class: 'lbl' }, '/100')),
    el('div', {}, el('div', { style: 'font-weight:500' }, 'Indice de réactivité'),
      el('div', { class: 'small muted' }, n > 1 ? n + ' bilans · touche pour voir ta courbe' : 'Touche pour revoir ou refaire le bilan'))));
}

/* Section thèmes / ateliers */
function renderThemeSection(s) {
  s.append(el('div', { class: 'sec-head' }, el('h2', {}, 'Explorer un thème'),
    el('span', { class: 'small muted' }, 'ateliers guidés')));
  const lb = latestBilan();
  const tt = topTheme();
  const grid = el('div', { class: 'themegrid' });
  const order = Object.keys(THEMES).sort((a, b) => {
    if (!lb || !lb.scores) return 0;
    return (lb.scores[b] || 0) - (lb.scores[a] || 0);
  });
  order.forEach((id) => {
    const t = THEMES[id];
    const done = entriesOf('atelier').some((a) => a.theme === id);
    grid.append(el('button', { class: 'themecard', onclick: () => go('atelier:' + id) },
      el('div', { class: 'tic' }, t.ic),
      el('div', {}, el('div', { class: 'tn' }, t.short + (id === tt ? ' ✦' : '')),
        el('div', { class: 'td' }, t.desc),
        done ? el('div', { class: 'done-badge' }, '✓ exploré') : (id === tt ? el('div', { class: 'done-badge' }, 'ton thème principal') : null))));
  });
  s.append(grid);
}

/* Aperçu patterns */
function renderPatternsTeaser(s) {
  s.append(el('div', { class: 'sec-head' }, el('h2', {}, 'Mes patterns'),
    el('button', { class: 'link', onclick: () => go('patterns') }, 'Ouvrir →')));
  s.append(el('div', { class: 'card', onclick: () => go('patterns'), style: 'cursor:pointer' },
    el('p', { class: 'small muted', style: 'margin:0' }, '🔗 L’app relie tes exercices pour faire émerger, en douceur, les patterns qui reviennent chez toi.')));
}

/* Exploration libre (modules) — certains se débloquent après le bilan */
const ADVANCED = ['awareness', 'expressive'];
function renderExploration(s) {
  s.append(el('div', { class: 'sec-head' }, el('h2', {}, 'Exploration libre'),
    el('span', { class: 'small muted' }, 'journaux & pratiques')));
  const grid = el('div', { class: 'modgrid' });
  Object.entries(MODULES).forEach(([id, m]) => {
    const locked = ADVANCED.includes(id) && !bilanDone();
    const n = entriesOf(id).length;
    grid.append(el('button', { class: 'modcard' + (locked ? ' locked' : ''),
      onclick: () => locked ? offerUnlock(m.nm) : go(id) },
      el('div', { class: 'ic' }, m.ic),
      el('div', { class: 'nm' }, m.nm),
      el('div', { class: 'ds' }, locked ? 'Se débloque après ton premier bilan.' : m.ds),
      (!locked && n) ? el('div', { class: 'small muted', style: 'margin-top:2px' }, n + ' entrée' + (n > 1 ? 's' : '')) : null));
  });
  s.append(grid);
}
function offerUnlock(name) {
  const box = el('div', {},
    el('p', { class: 'small muted' }, '« ' + name + ' » s’ouvre après ton premier bilan — il aide à mieux relier tes observations. Tu peux le faire maintenant (~5 min).'),
    el('div', { class: 'row' },
      el('button', { class: 'btn ghost', onclick: () => m.close() }, 'Plus tard'),
      el('button', { class: 'btn primary', onclick: () => { m.close(); go('bilan'); } }, 'Faire le bilan')));
  const m = modal(box, { title: 'Encore une étape 🌿' });
}

/* ---------- Journal générique ---------- */
function entryLog(module, renderRow) {
  const list = entriesOf(module);
  if (!list.length) return el('p', { class: 'muted small center', style: 'padding:12px' }, 'Aucune entrée pour le moment.');
  const wrap = el('div', {});
  list.forEach((e) => wrap.append(el('div', { class: 'log-item' },
    el('div', { class: 'lh' },
      el('span', { class: 'ld' }, fmtDateTime(e.createdAt)),
      el('button', { class: 'del', onclick: () => { if (confirm('Supprimer cette entrée ?')) delEntry(e.id); } }, 'supprimer')),
    renderRow(e))));
  return wrap;
}

/* ============================================================
   1) Future Self Journal
   ============================================================ */
function viewFutureSelf(s) {
  viewHead(s, 'Future Self Journal', '~5 min/jour · signature LePera');
  const cfgIsMonth = State.config.fsMonth === monthKey();
  const patternTA = el('textarea', { placeholder: 'Ex. Je me coupe de mes émotions quand je suis stressé·e…', style: 'min-height:70px' });
  patternTA.value = cfgIsMonth ? (State.config.fsPattern || '') : '';
  const affTA = el('textarea', { placeholder: 'Une affirmation par ligne.\nEx. Je peux ressentir et rester en sécurité.', style: 'min-height:90px' });
  affTA.value = cfgIsMonth ? (State.config.fsAffirmations || '') : '';

  s.append(el('div', { class: 'card' },
    el('h3', {}, '🎯 Le pattern à transformer ce mois-ci'),
    el('p', { class: 'small muted' }, 'Un seul, choisi consciemment. On ne change pas tout — on répète un nouveau choix, chaque jour.'),
    el('label', { class: 'field' }, el('span', {}, 'Pattern'), patternTA),
    el('label', { class: 'field' }, el('span', {}, 'Affirmations (une par ligne)'), affTA),
    el('button', { class: 'btn ghost', onclick: () => { saveConfig({ fsPattern: patternTA.value.trim(), fsAffirmations: affTA.value.trim(), fsMonth: monthKey() }); toast('Pattern du mois enregistré'); } }, 'Enregistrer le pattern du mois')));

  const p1 = el('textarea', { placeholder: '…une petite action alignée avec qui je deviens.' });
  const p2 = el('textarea', { placeholder: '…le pattern se déclenche (situation, corps, pensée).' });
  const p3 = el('textarea', { placeholder: '…en ce moment, avec honnêteté et douceur.' });
  const p4 = el('textarea', { placeholder: '…même une petite chose aujourd’hui.' });
  s.append(el('div', { class: 'card' },
    el('h3', {}, '📖 Les prompts du jour'),
    el('label', { class: 'field' }, el('span', {}, "Aujourd'hui, je pratique…"), p1),
    el('label', { class: 'field' }, el('span', {}, 'Je remarque quand…'), p2),
    el('label', { class: 'field' }, el('span', {}, 'Je me sens…'), p3),
    el('label', { class: 'field' }, el('span', {}, 'Je suis reconnaissant·e de…'), p4),
    el('button', { class: 'btn primary block', onclick: async () => {
      if (![p1, p2, p3, p4].some((x) => x.value.trim())) { toast('Écrivez au moins un prompt.'); return; }
      await addEntry('futureself', { practice: p1.value.trim(), notice: p2.value.trim(), feel: p3.value.trim(), grateful: p4.value.trim() });
      [p1, p2, p3, p4].forEach((x) => (x.value = ''));
    } }, 'Enregistrer mon entrée du jour')));

  s.append(el('h3', { style: 'margin:8px 0' }, 'Mes entrées'));
  s.append(entryLog('futureself', (e) => el('div', {},
    e.practice ? el('div', { class: 'entry' }, el('div', { class: 'em' }, 'Je pratique'), el('div', { class: 'ebody pre' }, e.practice)) : null,
    e.notice ? el('div', { class: 'entry' }, el('div', { class: 'em' }, 'Je remarque quand'), el('div', { class: 'ebody pre' }, e.notice)) : null,
    e.feel ? el('div', { class: 'entry' }, el('div', { class: 'em' }, 'Je me sens'), el('div', { class: 'ebody pre' }, e.feel)) : null,
    e.grateful ? el('div', { class: 'entry' }, el('div', { class: 'em' }, 'Reconnaissant·e de'), el('div', { class: 'ebody pre' }, e.grateful)) : null)));
}

/* ============================================================
   2) Check-in émotionnel
   ============================================================ */
function viewCheckin(s) {
  viewHead(s, 'Check-in émotionnel', 'Nommer pour apaiser');
  let selected = null;
  const card = el('div', { class: 'card' });
  card.append(el('p', { class: 'small muted' }, 'Quelle émotion est présente, là, maintenant ? La nommer aide déjà le système nerveux à s’apaiser.'));
  Object.entries(WHEEL).forEach(([fam, emos]) => {
    const grp = el('div', { class: 'family-grp' }, el('div', { class: 'fam-label' }, fam));
    const chips = el('div', { class: 'chips' });
    emos.forEach((emo) => {
      const c = el('button', { class: 'chip', onclick: () => { $$('.chip', card).forEach((x) => x.classList.remove('sel')); c.classList.add('sel'); selected = { family: fam, emotion: emo }; } }, emo);
      chips.append(c);
    });
    grp.append(chips); card.append(grp);
  });
  const rangeVal = el('span', { class: 'rangeval' }, '5');
  const range = el('input', { type: 'range', min: 1, max: 10, value: 5, oninput: (e) => (rangeVal.textContent = e.target.value) });
  const note = el('textarea', { placeholder: 'Où je le sens dans le corps ? Qu’est-ce qui l’a déclenché ? (optionnel)', style: 'min-height:80px' });
  card.append(el('hr', { class: 'sep' }),
    el('label', { class: 'field' }, el('span', {}, 'Intensité'), el('div', { class: 'center', style: 'margin-bottom:4px' }, rangeVal), range),
    el('label', { class: 'field' }, el('span', {}, 'Note (optionnel)'), note),
    el('button', { class: 'btn primary block', onclick: async () => {
      if (!selected) { toast('Choisissez une émotion.'); return; }
      await addEntry('checkin', { ...selected, intensity: +range.value, note: note.value.trim() }); go('checkin');
    } }, 'Enregistrer mon check-in'));
  s.append(card);
  s.append(el('h3', { style: 'margin:8px 0' }, 'Historique'));
  s.append(entryLog('checkin', (e) => el('div', {},
    el('div', {}, el('span', { class: 'tag' }, e.family), el('b', {}, ' ' + e.emotion), el('span', { class: 'muted small' }, `  ·  ${e.intensity}/10`)),
    e.note ? el('div', { class: 'ebody pre', style: 'margin-top:6px' }, e.note) : null)));
}

/* ============================================================
   3) Reparentage / enfant intérieur
   ============================================================ */
function viewReparenting(s) {
  viewHead(s, 'Enfant intérieur', 'Reparentage — 4 piliers (LePera)');
  s.append(el('div', { class: 'card' },
    el('p', { class: 'small muted' }, 'Faire une pause. Revenir dans le corps (une main sur le cœur, respirer). Puis demander avec douceur :'),
    el('div', { class: 'affirm' }, 'De quoi la partie plus jeune de moi a-t-elle besoin ?')));
  let pillar = null;
  const grid = el('div', { class: 'pillars' });
  PILLARS.forEach((p) => {
    const node = el('div', { class: 'pillar', style: 'cursor:pointer', onclick: () => { $$('.pillar', grid).forEach((x) => (x.style.borderColor = 'var(--line)')); node.style.borderColor = 'var(--accent)'; pillar = p.t; } },
      el('div', { class: 'pt' }, p.t), el('div', { class: 'pd' }, p.d));
    grid.append(node);
  });
  const need = el('textarea', { placeholder: 'Sécurité, repos, tendresse, jeu, être entendu·e…' });
  const note = el('textarea', { placeholder: 'Comment répondre à ce besoin aujourd’hui, concrètement ? (optionnel)' });
  s.append(el('div', { class: 'card' },
    el('h3', {}, 'Quel pilier je nourris ?'), grid,
    el('label', { class: 'field', style: 'margin-top:14px' }, el('span', {}, 'Le besoin que je perçois'), need),
    el('label', { class: 'field' }, el('span', {}, 'Ma réponse tendre (optionnel)'), note),
    el('button', { class: 'btn primary block', onclick: async () => {
      if (!need.value.trim()) { toast('Nommez le besoin ressenti.'); return; }
      await addEntry('reparenting', { pillar: pillar || '', need: need.value.trim(), note: note.value.trim() }); go('reparenting');
    } }, 'Enregistrer')));
  s.append(el('h3', { style: 'margin:8px 0' }, 'Mes notes'));
  s.append(entryLog('reparenting', (e) => el('div', {},
    e.pillar ? el('span', { class: 'tag' }, e.pillar) : null,
    el('div', { style: 'margin-top:6px' }, el('span', { class: 'em muted small' }, 'Besoin : '), el('span', { class: 'pre' }, e.need)),
    e.note ? el('div', { class: 'ebody pre', style: 'margin-top:4px' }, e.note) : null)));
}

/* ============================================================
   4) Régulation
   ============================================================ */
function viewRegulation(s) {
  viewHead(s, 'Régulation', 'Système nerveux · cohérence cardiaque');
  const orb = el('div', { class: 'breathe-orb out' }, 'Prêt·e ?');
  const timer = el('div', { class: 'breathe-timer' }, '3 min · 5s inspire / 5s expire');
  let running = false, iv = null, endAt = 0;
  const toggle = el('button', { class: 'btn primary', onclick: () => (running ? stop() : start()) }, 'Commencer');
  function tick() {
    const now = Date.now(), left = Math.max(0, Math.ceil((endAt - now) / 1000));
    if (left <= 0) { stop(); toast('Séance terminée 🤍'); return; }
    const phase = Math.floor((now / 1000) % 10) < 5 ? 'in' : 'out';
    orb.classList.toggle('in', phase === 'in'); orb.classList.toggle('out', phase === 'out');
    orb.textContent = phase === 'in' ? 'Inspire…' : 'Expire…';
    timer.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')} restant`;
  }
  function start() { running = true; toggle.textContent = 'Arrêter'; endAt = Date.now() + 180000; tick(); iv = setInterval(tick, 250); }
  function stop() { running = false; toggle.textContent = 'Commencer'; clearInterval(iv); orb.classList.remove('in'); orb.classList.add('out'); orb.textContent = 'Prêt·e ?'; timer.textContent = '3 min · 5s inspire / 5s expire'; }
  s.append(el('div', { class: 'card pad-lg' },
    el('div', { class: 'breathe-stage' }, orb, timer, toggle),
    el('p', { class: 'small muted center', style: 'margin-top:6px' }, 'Laissez l’air descendre dans le ventre. Rien à forcer : suivez le rythme.')));
  s.append(el('div', { class: 'card' },
    el('h3', {}, '🌍 Ancrage somatique (5-4-3-2-1)'),
    el('p', { class: 'small muted' }, 'Quand l’émotion déborde, revenir aux sens :'),
    el('ul', { class: 'small', style: 'padding-left:20px;color:var(--ink-soft);line-height:1.9' },
      el('li', {}, '5 choses que je vois'), el('li', {}, '4 choses que je touche'),
      el('li', {}, '3 choses que j’entends'), el('li', {}, '2 choses que je sens (odeur)'),
      el('li', {}, '1 chose que je goûte'))));
  const note = el('textarea', { placeholder: 'Comment je me sens après ? (optionnel)', style: 'min-height:70px' });
  s.append(el('div', { class: 'card' }, el('h3', {}, 'Noter ma séance'), note,
    el('button', { class: 'btn ghost block', style: 'margin-top:10px', onclick: async () => { await addEntry('regulation', { technique: 'Cohérence cardiaque', note: note.value.trim() }); note.value = ''; } }, 'Enregistrer une séance')));
  s.append(el('h3', { style: 'margin:8px 0' }, 'Séances'));
  s.append(entryLog('regulation', (e) => el('div', {}, el('span', { class: 'tag' }, e.technique || 'Séance'), e.note ? el('div', { class: 'ebody pre', style: 'margin-top:6px' }, e.note) : null)));
}

/* ============================================================
   5) Conscience de soi / ego
   ============================================================ */
function viewAwareness(s) {
  viewHead(s, 'Conscience de soi', 'Observer l’ego, sans jugement');
  s.append(el('div', { class: 'card' }, el('p', { class: 'small muted' }, 'L’ego raconte des histoires automatiques (« je ne suis pas assez », « on va m’abandonner »…). Les repérer, c’est déjà s’en libérer un peu. Je deviens l’observateur·rice.')));
  const story = el('textarea', { placeholder: 'Quelle histoire mon mental raconte-t-il en ce moment ?' });
  const pattern = el('textarea', { placeholder: 'À quel pattern / peur ancienne cela ressemble-t-il ?' });
  const observer = el('textarea', { placeholder: 'Ce que l’observateur·rice en moi voit : est-ce un fait, ou une pensée ?' });
  s.append(el('div', { class: 'card' },
    el('label', { class: 'field' }, el('span', {}, 'L’histoire automatique'), story),
    el('label', { class: 'field' }, el('span', {}, 'Le pattern reconnu'), pattern),
    el('label', { class: 'field' }, el('span', {}, 'Le regard de l’observateur·rice'), observer),
    el('button', { class: 'btn primary block', onclick: async () => {
      if (!story.value.trim()) { toast('Décrivez l’histoire repérée.'); return; }
      await addEntry('awareness', { story: story.value.trim(), pattern: pattern.value.trim(), observer: observer.value.trim() });
      [story, pattern, observer].forEach((x) => (x.value = ''));
    } }, 'Enregistrer')));
  s.append(el('h3', { style: 'margin:8px 0' }, 'Mes observations'));
  s.append(entryLog('awareness', (e) => el('div', {},
    el('div', { class: 'entry' }, el('div', { class: 'em' }, 'Histoire'), el('div', { class: 'pre' }, e.story)),
    e.pattern ? el('div', { class: 'entry' }, el('div', { class: 'em' }, 'Pattern'), el('div', { class: 'pre' }, e.pattern)) : null,
    e.observer ? el('div', { class: 'entry' }, el('div', { class: 'em' }, 'Observateur·rice'), el('div', { class: 'pre' }, e.observer)) : null)));
}

/* ============================================================
   6) Journal expressif + suivi humeur
   ============================================================ */
function viewExpressive(s) {
  viewHead(s, 'Journal expressif', 'Écrire librement · Pennebaker');
  const moods = State.entries
    .filter((e) => (e.module === 'expressive' && typeof e.mood === 'number') || (e.module === 'checkin' && typeof e.intensity === 'number'))
    .slice(0, 30).reverse();
  if (moods.length >= 2) {
    const trend = el('div', { class: 'trend' });
    moods.forEach((e) => { const v = e.module === 'expressive' ? e.mood : e.intensity; trend.append(el('div', { class: 'bar', title: `${v}/10` }, el('i', { style: `height:${v * 10}%` }))); });
    s.append(el('div', { class: 'card' }, el('h3', {}, '📈 Suivi de l’humeur'),
      el('p', { class: 'small muted' }, 'Vos ' + moods.length + ' derniers relevés (journal + check-in), du plus ancien au plus récent.'), trend));
  }
  const ta = el('textarea', { placeholder: 'Écrivez sans filtre pendant quelques minutes, sur ce qui vous touche vraiment. Ni orthographe, ni jugement — juste vous.', style: 'min-height:180px' });
  const rangeVal = el('span', { class: 'rangeval' }, '5');
  const range = el('input', { type: 'range', min: 1, max: 10, value: 5, oninput: (e) => (rangeVal.textContent = e.target.value) });
  s.append(el('div', { class: 'card' },
    el('label', { class: 'field' }, el('span', {}, 'Écriture libre'), ta),
    el('label', { class: 'field' }, el('span', {}, 'Mon humeur après avoir écrit'), el('div', { class: 'center', style: 'margin-bottom:4px' }, rangeVal), range),
    el('button', { class: 'btn primary block', onclick: async () => {
      if (!ta.value.trim()) { toast('Écrivez quelques mots.'); return; }
      await addEntry('expressive', { text: ta.value.trim(), mood: +range.value }); go('expressive');
    } }, 'Enregistrer')));
  s.append(el('h3', { style: 'margin:8px 0' }, 'Mes écrits'));
  s.append(entryLog('expressive', (e) => el('div', {},
    el('div', { class: 'small muted' }, 'Humeur : ' + (e.mood || '—') + '/10'),
    el('div', { class: 'ebody pre', style: 'margin-top:6px' }, e.text))));
}

/* ============================================================
   Bilan (questionnaire) + résultats + progression
   ============================================================ */
function scoreBilan(answers) {
  // answers: array 0..4 alignée sur BILAN. Score thème = moyenne*25 → 0..100
  const byTheme = {}, cnt = {};
  BILAN.forEach((it, i) => {
    const v = answers[i]; if (v == null) return;
    byTheme[it.theme] = (byTheme[it.theme] || 0) + v; cnt[it.theme] = (cnt[it.theme] || 0) + 1;
  });
  const scores = {};
  Object.keys(byTheme).forEach((k) => (scores[k] = Math.round((byTheme[k] / cnt[k]) * 25)));
  const vals = Object.values(scores);
  const total = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
  return { scores, total };
}

function viewBilan(s) {
  const done = hasEntry('bilan');
  viewHead(s, 'Le bilan', done ? 'Refaire pour mesurer mon évolution' : 'Un point de départ tout doux');
  // Intro / choix
  const start = el('div', { class: 'card' },
    el('p', { class: 'small muted' }, done ? 'Tu as déjà un bilan. En refaire un régulièrement (toutes les 2-4 semaines) permet de voir ton évolution. Il n’y a pas de bonne note — juste toi, à cet instant.' : 'Réponds honnêtement, sans réfléchir trop longtemps. Il n’y a ni bonne ni mauvaise réponse. ~5 min, 16 questions.'),
    el('button', { class: 'btn primary block', onclick: () => runBilan(s) }, done ? 'Refaire mon bilan' : 'Commencer'));
  s.append(start);
  if (done) renderProgression(s);
}

function runBilan(s) {
  s.innerHTML = '';
  viewHead(s, 'Le bilan', 'Réponds avec le cœur');
  const answers = new Array(BILAN.length).fill(null);
  let i = 0;
  const host = el('div', {}); s.append(host);

  function paint() {
    host.innerHTML = '';
    const it = BILAN[i];
    const prog = el('div', { class: 'q-progress' }, el('i', { style: `width:${(i / BILAN.length) * 100}%` }));
    const card = el('div', { class: 'q-card' },
      el('div', { class: 'q-count' }, 'Question ' + (i + 1) + ' / ' + BILAN.length),
      it.scenario ? el('div', { class: 'q-scenario' }, '💭 ' + it.text) : null,
      el('div', { class: 'q-text' }, it.scenario ? 'À quel point cela te touche ?' : it.text));
    const scale = el('div', { class: 'q-scale' });
    BILAN_SCALE.forEach((lbl, v) => {
      scale.append(el('button', { class: 'q-opt' + (answers[i] === v ? ' sel' : ''), onclick: () => { answers[i] = v; next(); } }, lbl));
    });
    card.append(scale);
    if (i > 0) card.append(el('button', { class: 'btn ghost', style: 'margin-top:16px', onclick: () => { i--; paint(); } }, '‹ Précédent'));
    host.append(prog, card);
    window.scrollTo(0, 0);
  }
  function next() {
    setTimeout(async () => {
      if (i < BILAN.length - 1) { i++; paint(); }
      else {
        const { scores, total } = scoreBilan(answers);
        await addEntry('bilan', { scores, total, answers });
        go('bilanresult');
      }
    }, 140);
  }
  paint();
}

function viewBilanResultRoute(s) {
  const b = latestBilan();
  if (!b) return go('bilan');
  viewHead(s, 'Ton bilan', 'Merci pour cette honnêteté 🤍');
  renderBilanResult(s, b);
}

function renderBilanResult(s, b) {
  s.append(el('div', { class: 'card' },
    el('div', { class: 'score-hero' }, el('div', { class: 'big' }, b.total), el('div', { class: 'lbl' }, 'indice de réactivité / 100')),
    el('p', { class: 'small muted center' }, 'Plus l’indice est bas, plus tu te sens apaisé·e face aux situations. Ce n’est pas une note : c’est ta météo intérieure du moment.')));
  // meters par thème
  const meters = el('div', { class: 'card' }, el('h3', {}, 'Tes thèmes'));
  Object.entries(b.scores).sort((a, c) => c[1] - a[1]).forEach(([k, v]) => {
    meters.append(el('div', { class: 'meter' },
      el('div', { class: 'ml' }, el('span', {}, THEMES[k].ic + ' ' + THEMES[k].short), el('span', { class: 'mv' }, v + '/100')),
      el('div', { class: 'track' }, el('i', { style: `width:${v}%` }))));
  });
  s.append(meters);
  const tt = Object.entries(b.scores).sort((a, c) => c[1] - a[1])[0];
  if (tt) s.append(el('div', { class: 'card' },
    el('h3', {}, '🌿 Une piste douce'),
    el('p', { class: 'small' }, 'Ton thème le plus présent : ') ,
    el('p', { style: 'margin:0 0 12px' }, el('b', {}, THEMES[tt[0]].nm)),
    el('button', { class: 'btn primary block', onclick: () => go('atelier:' + tt[0]) }, 'Ouvrir l’atelier ' + THEMES[tt[0]].short)));
  s.append(el('button', { class: 'btn ghost block', onclick: () => go('home') }, 'Retour à l’accueil'));
}

function renderProgression(s) {
  const all = entriesOf('bilan').slice().reverse(); // chrono
  if (all.length < 1) return;
  const last = all[all.length - 1], first = all[0];
  // Courbe indice total
  if (all.length >= 2) {
    const trend = el('div', { class: 'trend' });
    all.forEach((b) => trend.append(el('div', { class: 'bar', title: b.total + '/100' }, el('i', { style: `height:${b.total}%` }))));
    const delta = last.total - first.total;
    s.append(el('div', { class: 'card' },
      el('h3', {}, '📉 Mon évolution'),
      el('p', { class: 'small muted' }, all.length + ' bilans — du premier au dernier.'),
      trend,
      el('p', { class: 'small', style: 'margin-top:10px' }, 'Depuis le début : ',
        el('b', { class: delta <= 0 ? 'delta-down' : 'delta-up' }, (delta <= 0 ? '▼ ' : '▲ ') + Math.abs(delta) + ' pts'),
        delta < 0 ? ' — tu te sens plus apaisé·e 🌿' : delta > 0 ? ' — une période plus intense, c’est ok.' : ' — stable.')));
  }
  // Comparatif par thème premier vs dernier
  if (last.scores) {
    const comp = el('div', { class: 'card' }, el('h3', {}, 'Par thème'));
    Object.entries(last.scores).sort((a, c) => c[1] - a[1]).forEach(([k, v]) => {
      const fv = first.scores ? (first.scores[k] ?? v) : v; const d = v - fv;
      comp.append(el('div', { class: 'meter' },
        el('div', { class: 'ml' }, el('span', {}, THEMES[k].ic + ' ' + THEMES[k].short),
          el('span', { class: 'mv' }, v + '/100' + (all.length >= 2 && d !== 0 ? '  (' + (d < 0 ? '▼' : '▲') + Math.abs(d) + ')' : ''))),
        el('div', { class: 'track' }, el('i', { style: `width:${v}%` }))));
    });
    s.append(comp);
  }
}

/* ============================================================
   Atelier thématique guidé
   ============================================================ */
function viewAtelier(s, themeId) {
  const t = THEMES[themeId], a = (window.ATELIERS || {})[themeId];
  if (!t || !a) { go('home'); return; }
  viewHead(s, t.nm, 'Atelier guidé · ' + t.ic);

  // 1 — Comprendre
  s.append(el('div', { class: 'card' },
    el('div', { class: 'step-block' }, el('span', { class: 'sb-num' }, '1'), el('span', { class: 'sb-title' }, 'Comprendre')),
    el('p', { class: 'small', style: 'line-height:1.7' }, a.intro)));

  // 2 — Se reconnaître (cases)
  const checks = [];
  const recWrap = el('div', { class: 'recognize' });
  a.recognize.forEach((txt, idx) => {
    const c = el('button', { class: 'check', onclick: () => { c.classList.toggle('on'); const on = c.classList.contains('on'); if (on) checks.push(idx); else checks.splice(checks.indexOf(idx), 1); } },
      el('span', { class: 'box' }, '✓'), el('span', {}, txt));
    recWrap.append(c);
  });
  s.append(el('div', { class: 'card' },
    el('div', { class: 'step-block' }, el('span', { class: 'sb-num' }, '2'), el('span', { class: 'sb-title' }, 'Je me reconnais quand…')),
    el('p', { class: 'small muted' }, 'Coche ce qui te parle. Cela nourrit tes patterns.'),
    recWrap));

  // 3 — Écrire
  const tas = a.prompts.map((p) => ({ p, ta: el('textarea', { placeholder: 'Prends ton temps…' }) }));
  const writeCard = el('div', { class: 'card' },
    el('div', { class: 'step-block' }, el('span', { class: 'sb-num' }, '3'), el('span', { class: 'sb-title' }, 'Écrire')));
  tas.forEach(({ p, ta }) => writeCard.append(el('label', { class: 'field' }, el('span', {}, p), ta)));
  s.append(writeCard);

  // 4 — Pratiquer
  s.append(el('div', { class: 'card' },
    el('div', { class: 'step-block' }, el('span', { class: 'sb-num' }, '4'), el('span', { class: 'sb-title' }, 'Une micro-pratique')),
    el('div', { class: 'affirm', style: 'text-align:left;font-family:Poppins,sans-serif;font-size:.92em' }, a.practice)));

  s.append(el('button', { class: 'btn primary block', onclick: async () => {
    await addEntry('atelier', { theme: themeId, checks: checks.slice(), answers: tas.map((x) => x.ta.value.trim()) });
    go('atelier:' + themeId);
  } }, 'Enregistrer mon atelier'));

  // Historique
  const past = entriesOf('atelier').filter((e) => e.theme === themeId);
  if (past.length) {
    s.append(el('h3', { style: 'margin:16px 0 8px' }, 'Mes passages sur ce thème'));
    const wrap = el('div', {});
    past.forEach((e) => {
      wrap.append(el('div', { class: 'log-item' },
        el('div', { class: 'lh' }, el('span', { class: 'ld' }, fmtDateTime(e.createdAt)),
          el('button', { class: 'del', onclick: () => { if (confirm('Supprimer ?')) delEntry(e.id); } }, 'supprimer')),
        el('div', { class: 'small muted' }, (e.checks ? e.checks.length : 0) + ' reconnaissance(s)'),
        ...(e.answers || []).filter(Boolean).map((ans, k) => el('div', { class: 'entry' },
          el('div', { class: 'em' }, a.prompts[k] || ''), el('div', { class: 'pre' }, ans)))));
    });
    s.append(wrap);
  }
}

/* ============================================================
   Mes patterns (liens entre exercices)
   ============================================================ */
function viewPatterns(s) {
  viewHead(s, 'Mes patterns', 'Ce qui relie tes exercices');
  const insights = [];
  const sig = computeThemeSignals();
  const ranked = Object.entries(sig).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  const emos = emotionFreq();
  const totalData = State.entries.length;

  if (totalData < 3) {
    s.append(el('div', { class: 'card center' },
      el('p', { class: 'muted', style: 'margin:0' }, '🌱 Continue à remplir tes exercices (bilan, check-ins, ateliers). Dès que tu auras quelques entrées, les liens apparaîtront ici — en douceur.')));
    return;
  }
  if (ranked.length) insights.push(['🎯', el('span', {}, 'Ton thème le plus présent en ce moment : ', el('b', {}, THEMES[ranked[0][0]].nm), '.')]);
  if (ranked.length > 1) insights.push(['🔁', el('span', {}, 'Il revient souvent avec ', el('b', {}, THEMES[ranked[1][0]].short), ' — deux facettes d’un même mécanisme, souvent.')]);
  if (emos.length) insights.push(['💗', el('span', {}, 'L’émotion que tu nommes le plus : ', el('b', {}, emos[0][0]), ' (' + emos[0][1] + '×). La reconnaître, c’est déjà l’apaiser.')]);
  const bilans = entriesOf('bilan');
  if (bilans.length >= 2) {
    const d = bilans[0].total - bilans[bilans.length - 1].total;
    insights.push([d <= 0 ? '🌿' : '🫂', el('span', {}, 'Depuis ton premier bilan, ton indice a ', el('b', { class: d <= 0 ? 'delta-down' : 'delta-up' }, (d <= 0 ? 'baissé de ' : 'monté de ') + Math.abs(d) + ' pts'), d <= 0 ? '. Ton travail porte 🌱' : '. Une phase plus intense — sois doux·ce avec toi.')]);
  }
  const ateliersDone = new Set(entriesOf('atelier').map((a) => a.theme));
  if (ranked.length && !ateliersDone.has(ranked[0][0])) insights.push(['✨', el('span', {}, 'Piste : l’atelier ', el('b', {}, THEMES[ranked[0][0]].short), ' n’est pas encore fait — il pourrait t’éclairer.')]);

  insights.forEach(([ic, node]) => s.append(el('div', { class: 'insight' }, el('div', { class: 'ii' }, ic), el('div', { class: 'it' }, node))));

  // Carte thèmes (barres)
  if (ranked.length) {
    const max = ranked[0][1] || 1;
    const card = el('div', { class: 'card' }, el('h3', {}, 'Force de tes thèmes'));
    ranked.forEach(([k, v]) => card.append(el('div', { class: 'meter' },
      el('div', { class: 'ml' }, el('span', {}, THEMES[k].ic + ' ' + THEMES[k].short), el('span', { class: 'mv' }, '')),
      el('div', { class: 'track' }, el('i', { style: `width:${Math.round((v / max) * 100)}%` })))));
    card.append(el('button', { class: 'btn ghost block', style: 'margin-top:8px', onclick: () => go('atelier:' + ranked[0][0]) }, 'Travailler ' + THEMES[ranked[0][0]].short));
    s.append(card);
  }
  // Émotions fréquentes
  if (emos.length) {
    const card = el('div', { class: 'card' }, el('h3', {}, 'Émotions les plus nommées'), el('div', { class: 'chips' }));
    const chips = card.lastChild;
    emos.slice(0, 8).forEach(([e, n]) => chips.append(el('span', { class: 'chip' }, e + ' · ' + n)));
    s.append(card);
  }
}

/* ---------- Service worker ---------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
