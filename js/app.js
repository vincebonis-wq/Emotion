/* ============================================================
   Travail émotionnel — app principale (PWA, Firebase)
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

/* ---------- Petits helpers DOM ---------- */
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
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const todayISO = () => new Date().toISOString().slice(0, 10);
const monthKey = () => new Date().toISOString().slice(0, 7);
const fmtDate = (d) => new Date(d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
const fmtDateTime = (ms) => new Date(ms).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ---------- Modal ---------- */
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
   État global
   ============================================================ */
const State = {
  user: null,
  db: null,
  prefs: { textScale: 1 },
  config: {},          // config/app doc (pattern, affirmations…)
  entries: [],         // toutes les entrées, triées desc
  unsub: [],
};

/* ---------- Modules (métadonnées) ---------- */
const MODULES = {
  futureself: { ic: '🌱', nm: 'Future Self Journal', ds: 'Un pattern à transformer ce mois-ci + les prompts du jour (~5 min).' },
  checkin:    { ic: '🎡', nm: 'Check-in émotionnel', ds: 'Nommer ce que je ressens et son intensité — nommer pour apaiser.' },
  reparenting:{ ic: '🤍', nm: 'Enfant intérieur', ds: 'Les 4 piliers du reparentage : revenir dans le corps, écouter le besoin.' },
  regulation: { ic: '🌬️', nm: 'Régulation', ds: 'Cohérence cardiaque 5s/5s et ancrage somatique pour apaiser le système nerveux.' },
  awareness:  { ic: '👁️', nm: 'Conscience de soi', ds: 'Repérer les histoires automatiques de l’ego, devenir l’observateur.' },
  expressive: { ic: '✍️', nm: 'Journal expressif', ds: 'Écrire librement (Pennebaker) et suivre l’humeur dans le temps.' },
};

/* ---------- Roue des émotions ---------- */
const WHEEL = {
  Joie:            ['heureux·se', 'serein·e', 'fier·ère', 'enthousiaste', 'reconnaissant·e', 'apaisé·e'],
  Tristesse:       ['triste', 'seul·e', 'découragé·e', 'mélancolique', 'vide', 'déçu·e'],
  Peur:            ['anxieux·se', 'inquiet·ète', 'tendu·e', 'effrayé·e', 'insécure', 'dépassé·e'],
  Colère:          ['irrité·e', 'frustré·e', 'en colère', 'agacé·e', 'amer·ère', 'jaloux·se'],
  'Honte / gêne':  ['honteux·se', 'coupable', 'mal à l’aise', 'gêné·e'],
  Autre:           ['surpris·e', 'confus·e', 'curieux·se', 'ému·e', 'fatigué·e', 'neutre'],
};

/* ---------- 4 piliers du reparentage (LePera) ---------- */
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

function applyTextScale() {
  document.documentElement.style.setProperty('--tscale', State.prefs.textScale);
}

window.addEventListener('DOMContentLoaded', () => {
  injectMarks();
  // Charge préférences locales (avant login, pour l'écran auth aussi)
  try { const p = JSON.parse(localStorage.getItem('emotion_prefs') || '{}'); Object.assign(State.prefs, p); } catch (_) {}
  applyTextScale();

  if (!window.FIREBASE_READY) {
    showAuth(false);
    $('#configWarn').classList.remove('hidden');
    $('#loading').classList.add('hidden');
    return;
  }
  initFirebase();
});

/* ============================================================
   Firebase / Auth
   ============================================================ */
function initFirebase() {
  firebase.initializeApp(window.FIREBASE_CONFIG);
  State.db = firebase.firestore();
  firebase.auth().onAuthStateChanged((user) => {
    $('#loading').classList.add('hidden');
    if (user) { State.user = user; enterApp(); }
    else { State.user = null; teardown(); showAuth(true); }
  });
  bindAuthUI();
}

function showAuth(withForms) {
  $('#appView').classList.add('hidden');
  $('#authView').classList.remove('hidden');
  $('#authForms').classList.toggle('hidden', !withForms);
}

let authMode = 'login';
function bindAuthUI() {
  $('#authForms').classList.remove('hidden');
  const setMode = (m) => {
    authMode = m;
    $('#tabLogin').classList.toggle('on', m === 'login');
    $('#tabSignup').classList.toggle('on', m === 'signup');
    $('#authBtn').textContent = m === 'login' ? 'Se connecter' : 'Créer mon compte';
    $('#password').autocomplete = m === 'login' ? 'current-password' : 'new-password';
    $('#authErr').textContent = '';
  };
  $('#tabLogin').onclick = () => setMode('login');
  $('#tabSignup').onclick = () => setMode('signup');
  $('#authBtn').onclick = doAuth;
  $('#password').addEventListener('keydown', (e) => { if (e.key === 'Enter') doAuth(); });
}

async function doAuth() {
  const email = $('#email').value.trim();
  const pass = $('#password').value;
  const errEl = $('#authErr');
  errEl.textContent = '';
  if (!email || !pass) { errEl.textContent = 'Renseignez e-mail et mot de passe.'; return; }
  if (authMode === 'signup' && pass.length < 6) { errEl.textContent = 'Mot de passe : 6 caractères minimum.'; return; }
  const btn = $('#authBtn'); btn.disabled = true; const old = btn.textContent; btn.textContent = '…';
  try {
    if (authMode === 'login') await firebase.auth().signInWithEmailAndPassword(email, pass);
    else await firebase.auth().createUserWithEmailAndPassword(email, pass);
  } catch (e) {
    errEl.textContent = authError(e.code);
  } finally { btn.disabled = false; btn.textContent = old; }
}

function authError(code) {
  const m = {
    'auth/invalid-email': 'Adresse e-mail invalide.',
    'auth/user-not-found': 'Aucun compte pour cet e-mail.',
    'auth/wrong-password': 'Mot de passe incorrect.',
    'auth/invalid-credential': 'Identifiants incorrects.',
    'auth/email-already-in-use': 'Un compte existe déjà pour cet e-mail.',
    'auth/weak-password': 'Mot de passe trop faible (6 caractères min.).',
    'auth/network-request-failed': 'Problème de réseau — réessayez.',
    'auth/too-many-requests': 'Trop de tentatives, patientez un instant.',
  };
  return m[code] || 'Une erreur est survenue. Réessayez.';
}

function teardown() {
  State.unsub.forEach((u) => { try { u(); } catch (_) {} });
  State.unsub = [];
  State.entries = []; State.config = {};
}

/* ============================================================
   Entrée dans l'app + écoute temps réel
   ============================================================ */
function enterApp() {
  $('#authView').classList.add('hidden');
  $('#appView').classList.remove('hidden');
  bindAppChrome();

  const uref = State.db.collection('users').doc(State.user.uid);

  // Config (pattern mensuel, affirmations, prefs synced)
  State.unsub.push(uref.collection('config').doc('app').onSnapshot((doc) => {
    State.config = doc.exists ? doc.data() : {};
    if (typeof State.config.textScale === 'number') {
      State.prefs.textScale = State.config.textScale; savePrefsLocal(); applyTextScale();
    }
    if (currentRoute === 'home' || currentRoute === 'futureself') render();
  }, () => {}));

  // Entrées (temps réel)
  State.unsub.push(uref.collection('entries').orderBy('createdAt', 'desc').onSnapshot((snap) => {
    State.entries = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    render();
  }, (e) => { toast('Synchro en pause (hors ligne ?)'); }));

  render();
}

function savePrefsLocal() { try { localStorage.setItem('emotion_prefs', JSON.stringify(State.prefs)); } catch (_) {} }
function userRef() { return State.db.collection('users').doc(State.user.uid); }

/* ---- CRUD entrées ---- */
async function addEntry(module, data) {
  const doc = { module, date: todayISO(), createdAt: Date.now(), ...data };
  await userRef().collection('entries').add(doc);
  toast('Enregistré 🤍');
}
async function delEntry(id) {
  await userRef().collection('entries').doc(id).delete();
  toast('Supprimé');
}
async function saveConfig(patch) {
  State.config = { ...State.config, ...patch };
  await userRef().collection('config').doc('app').set(patch, { merge: true });
}
function entriesOf(module) { return State.entries.filter((e) => e.module === module); }

/* ============================================================
   Chrome (topbar : taille texte, menu)
   ============================================================ */
function bindAppChrome() {
  $('#btnText').onclick = openTextSize;
  $('#btnMenu').onclick = openMenu;
}

function openTextSize() {
  const steps = [0.9, 1, 1.1, 1.25, 1.4];
  const box = el('div', {},
    el('p', { class: 'muted small' }, 'Ajustez la taille du texte selon votre confort.'),
    el('div', { class: 'center' },
      el('span', { class: 'rangeval', id: 'tsVal' }, Math.round(State.prefs.textScale * 100) + '%')),
    el('input', {
      type: 'range', min: 0, max: steps.length - 1, step: 1,
      value: steps.indexOf(State.prefs.textScale) < 0 ? 1 : steps.indexOf(State.prefs.textScale),
      oninput: (e) => {
        State.prefs.textScale = steps[+e.target.value];
        $('#tsVal').textContent = Math.round(State.prefs.textScale * 100) + '%';
        applyTextScale();
      },
    }),
    el('button', {
      class: 'btn primary block', style: 'margin-top:16px',
      onclick: () => { savePrefsLocal(); saveConfig({ textScale: State.prefs.textScale }); m.close(); toast('Taille enregistrée'); },
    }, 'Valider'),
  );
  const m = modal(box, { title: 'Taille du texte' });
}

function openMenu() {
  const box = el('div', {},
    el('p', { class: 'small muted' }, State.user.email),
    el('button', { class: 'btn ghost block', style: 'margin:6px 0', onclick: () => { m.close(); exportData(); } }, '⬇️ Exporter mes données'),
    el('button', { class: 'btn ghost block', style: 'margin:6px 0', onclick: () => { m.close(); importData(); } }, '⬆️ Importer'),
    el('button', { class: 'btn ghost block', style: 'margin:6px 0', onclick: () => { m.close(); render(); } }, '🔄 Rafraîchir'),
    el('hr', { class: 'sep' }),
    el('button', { class: 'btn ghost block', style: 'color:var(--danger)', onclick: () => { m.close(); firebase.auth().signOut(); } }, '↩︎ Se déconnecter'),
  );
  const m = modal(box, { title: 'Menu' });
}

/* ---- Export / import ---- */
function exportData() {
  const payload = { app: 'travail-emotionnel', version: 1, exportedAt: new Date().toISOString(), config: State.config, entries: State.entries.map(({ id, ...r }) => r) };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = el('a', { href: URL.createObjectURL(blob), download: `emotion-${todayISO()}.json` });
  document.body.append(a); a.click(); a.remove();
  toast('Export téléchargé');
}
function importData() {
  const inp = el('input', { type: 'file', accept: 'application/json', style: 'display:none' });
  inp.onchange = async () => {
    const f = inp.files[0]; if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      const entries = data.entries || [];
      if (!confirm(`Importer ${entries.length} entrée(s) ? Elles s'ajoutent à vos données existantes.`)) return;
      const batch = State.db.batch();
      entries.forEach((e) => { const ref = userRef().collection('entries').doc(); batch.set(ref, { createdAt: Date.now(), ...e }); });
      if (data.config) batch.set(userRef().collection('config').doc('app'), data.config, { merge: true });
      await batch.commit();
      toast('Import réussi 🤍');
    } catch (e) { alert('Fichier invalide.'); }
  };
  document.body.append(inp); inp.click(); inp.remove();
}

/* ============================================================
   Router / rendu
   ============================================================ */
let currentRoute = 'home';
function go(route) { currentRoute = route; window.scrollTo(0, 0); render(); }

function render() {
  if (!State.user) return;
  const s = $('#screen'); s.innerHTML = '';
  if (currentRoute === 'home') return renderHome(s);
  const fn = { futureself: viewFutureSelf, checkin: viewCheckin, reparenting: viewReparenting, regulation: viewRegulation, awareness: viewAwareness, expressive: viewExpressive }[currentRoute];
  if (fn) fn(s); else renderHome(s);
}

function viewHead(parent, title, sub) {
  parent.append(el('div', { class: 'vhead' },
    el('button', { class: 'back', title: 'Retour', onclick: () => go('home') }, '‹'),
    el('div', { class: 'vt' }, el('h2', {}, title), sub ? el('div', { class: 'sub' }, sub) : null),
  ));
}

/* ---------- Accueil ---------- */
function renderHome(s) {
  const hour = new Date().getHours();
  const hi = hour < 6 ? 'Douce nuit' : hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonne soirée';
  s.append(el('div', { class: 'greeting' },
    el('div', { class: 'hi' }, hi),
    el('div', { class: 'date' }, fmtDate(new Date())),
  ));

  // Affirmation du moment si définie
  if (State.config.fsAffirmations) {
    const affs = String(State.config.fsAffirmations).split('\n').map((x) => x.trim()).filter(Boolean);
    if (affs.length) {
      const pick = affs[new Date().getDate() % affs.length];
      s.append(el('div', { class: 'affirm' }, '“' + pick + '”'));
    }
  }

  const grid = el('div', { class: 'modgrid' });
  Object.entries(MODULES).forEach(([id, m]) => {
    const n = entriesOf(id).length;
    grid.append(el('button', { class: 'modcard', onclick: () => go(id) },
      el('div', { class: 'ic' }, m.ic),
      el('div', { class: 'nm' }, m.nm),
      el('div', { class: 'ds' }, m.ds),
      n ? el('div', { class: 'small muted', style: 'margin-top:2px' }, n + ' entrée' + (n > 1 ? 's' : '')) : null,
    ));
  });
  s.append(grid);

  s.append(el('p', { class: 'small muted center', style: 'margin-top:24px' },
    'Méthode inspirée de Dr. Nicole LePera — How to Do the Work.'));
}

/* helper : liste d'entrées avec suppression */
function entryLog(module, renderRow) {
  const list = entriesOf(module);
  if (!list.length) return el('p', { class: 'muted small center', style: 'padding:12px' }, 'Aucune entrée pour le moment.');
  const wrap = el('div', {});
  list.forEach((e) => {
    const item = el('div', { class: 'log-item' },
      el('div', { class: 'lh' },
        el('span', { class: 'ld' }, fmtDateTime(e.createdAt)),
        el('button', { class: 'del', onclick: () => { if (confirm('Supprimer cette entrée ?')) delEntry(e.id); } }, 'supprimer')),
      renderRow(e),
    );
    wrap.append(item);
  });
  return wrap;
}

function fieldTextarea(labelTxt, ph) {
  const ta = el('textarea', { placeholder: ph || '' });
  const lab = el('label', { class: 'field' }, el('span', {}, labelTxt), ta);
  return { lab, ta };
}

/* ============================================================
   1) Future Self Journal
   ============================================================ */
function viewFutureSelf(s) {
  viewHead(s, 'Future Self Journal', '~5 min/jour · signature LePera');

  const cfgIsMonth = State.config.fsMonth === monthKey();
  // Bloc pattern du mois + affirmations
  const patternTA = el('textarea', { placeholder: 'Ex. Je réagis en me coupant de mes émotions quand je suis stressé·e…', style: 'min-height:70px' });
  patternTA.value = cfgIsMonth ? (State.config.fsPattern || '') : '';
  const affTA = el('textarea', { placeholder: 'Une affirmation par ligne.\nEx. Je peux ressentir et rester en sécurité.', style: 'min-height:90px' });
  affTA.value = cfgIsMonth ? (State.config.fsAffirmations || '') : '';

  s.append(el('div', { class: 'card' },
    el('h3', {}, '🎯 Le pattern à transformer ce mois-ci'),
    el('p', { class: 'small muted' }, 'Un seul, choisi consciemment. On ne change pas tout — on répète un nouveau choix, chaque jour.'),
    el('label', { class: 'field' }, el('span', {}, 'Pattern'), patternTA),
    el('label', { class: 'field' }, el('span', {}, 'Affirmations (une par ligne)'), affTA),
    el('button', {
      class: 'btn ghost', onclick: () => {
        saveConfig({ fsPattern: patternTA.value.trim(), fsAffirmations: affTA.value.trim(), fsMonth: monthKey() });
        toast('Pattern du mois enregistré');
      },
    }, 'Enregistrer le pattern du mois'),
  ));

  // Prompts du jour
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
    el('button', {
      class: 'btn primary block', onclick: async () => {
        if (![p1, p2, p3, p4].some((x) => x.value.trim())) { toast('Écrivez au moins un prompt.'); return; }
        await addEntry('futureself', { practice: p1.value.trim(), notice: p2.value.trim(), feel: p3.value.trim(), grateful: p4.value.trim() });
        [p1, p2, p3, p4].forEach((x) => (x.value = ''));
      },
    }, 'Enregistrer mon entrée du jour'),
  ));

  s.append(el('h3', { style: 'margin:8px 0' }, 'Mes entrées'));
  s.append(entryLog('futureself', (e) => el('div', {},
    e.practice ? el('div', { class: 'entry' }, el('div', { class: 'em' }, 'Je pratique'), el('div', { class: 'ebody pre' }, e.practice)) : null,
    e.notice ? el('div', { class: 'entry' }, el('div', { class: 'em' }, 'Je remarque quand'), el('div', { class: 'ebody pre' }, e.notice)) : null,
    e.feel ? el('div', { class: 'entry' }, el('div', { class: 'em' }, 'Je me sens'), el('div', { class: 'ebody pre' }, e.feel)) : null,
    e.grateful ? el('div', { class: 'entry' }, el('div', { class: 'em' }, 'Reconnaissant·e de'), el('div', { class: 'ebody pre' }, e.grateful)) : null,
  )));
}

/* ============================================================
   2) Check-in émotionnel (roue + intensité)
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
      const c = el('button', { class: 'chip', onclick: () => {
        $$('.chip', card).forEach((x) => x.classList.remove('sel'));
        c.classList.add('sel'); selected = { family: fam, emotion: emo };
      } }, emo);
      chips.append(c);
    });
    grp.append(chips); card.append(grp);
  });

  const rangeVal = el('span', { class: 'rangeval' }, '5');
  const range = el('input', { type: 'range', min: 1, max: 10, value: 5, oninput: (e) => (rangeVal.textContent = e.target.value) });
  const note = el('textarea', { placeholder: 'Où je le sens dans le corps ? Qu’est-ce qui l’a déclenché ? (optionnel)', style: 'min-height:80px' });

  card.append(
    el('hr', { class: 'sep' }),
    el('label', { class: 'field' }, el('span', {}, 'Intensité'), el('div', { class: 'center', style: 'margin-bottom:4px' }, rangeVal), range),
    el('label', { class: 'field' }, el('span', {}, 'Note (optionnel)'), note),
    el('button', { class: 'btn primary block', onclick: async () => {
      if (!selected) { toast('Choisissez une émotion.'); return; }
      await addEntry('checkin', { ...selected, intensity: +range.value, note: note.value.trim() });
      go('checkin');
    } }, 'Enregistrer mon check-in'),
  );
  s.append(card);

  s.append(el('h3', { style: 'margin:8px 0' }, 'Historique'));
  s.append(entryLog('checkin', (e) => el('div', {},
    el('div', {}, el('span', { class: 'tag' }, e.family), el('b', {}, ' ' + e.emotion), el('span', { class: 'muted small' }, `  ·  ${e.intensity}/10`)),
    e.note ? el('div', { class: 'ebody pre', style: 'margin-top:6px' }, e.note) : null,
  )));
}

/* ============================================================
   3) Reparentage / enfant intérieur (4 piliers)
   ============================================================ */
function viewReparenting(s) {
  viewHead(s, 'Enfant intérieur', 'Reparentage — 4 piliers (LePera)');
  s.append(el('div', { class: 'card' },
    el('p', { class: 'small muted' }, 'Faire une pause. Revenir dans le corps (poser une main sur le cœur, respirer). Puis demander avec douceur :'),
    el('div', { class: 'affirm' }, 'De quoi la partie plus jeune de moi a-t-elle besoin ?'),
  ));

  let pillar = null;
  const grid = el('div', { class: 'pillars' });
  PILLARS.forEach((p) => {
    const node = el('div', { class: 'pillar', style: 'cursor:pointer', onclick: () => {
      $$('.pillar', grid).forEach((x) => x.style.borderColor = 'var(--line)');
      node.style.borderColor = 'var(--accent)'; pillar = p.t;
    } }, el('div', { class: 'pt' }, p.t), el('div', { class: 'pd' }, p.d));
    grid.append(node);
  });
  const need = el('textarea', { placeholder: 'Sécurité, repos, tendresse, jeu, être entendu·e…' });
  const note = el('textarea', { placeholder: 'Comment je peux répondre à ce besoin aujourd’hui, concrètement ? (optionnel)' });

  s.append(el('div', { class: 'card' },
    el('h3', {}, 'Quel pilier je nourris ?'), grid,
    el('label', { class: 'field', style: 'margin-top:14px' }, el('span', {}, 'Le besoin que je perçois'), need),
    el('label', { class: 'field' }, el('span', {}, 'Ma réponse tendre (optionnel)'), note),
    el('button', { class: 'btn primary block', onclick: async () => {
      if (!need.value.trim()) { toast('Nommez le besoin ressenti.'); return; }
      await addEntry('reparenting', { pillar: pillar || '', need: need.value.trim(), note: note.value.trim() });
      go('reparenting');
    } }, 'Enregistrer'),
  ));

  s.append(el('h3', { style: 'margin:8px 0' }, 'Mes notes'));
  s.append(entryLog('reparenting', (e) => el('div', {},
    e.pillar ? el('span', { class: 'tag' }, e.pillar) : null,
    el('div', { style: 'margin-top:6px' }, el('span', { class: 'em muted small' }, 'Besoin : '), el('span', { class: 'pre' }, e.need)),
    e.note ? el('div', { class: 'ebody pre', style: 'margin-top:4px' }, e.note) : null,
  )));
}

/* ============================================================
   4) Régulation — cohérence cardiaque 5s/5s + ancrage
   ============================================================ */
function viewRegulation(s) {
  viewHead(s, 'Régulation', 'Système nerveux · cohérence cardiaque');

  const orb = el('div', { class: 'breathe-orb out' }, 'Prêt·e ?');
  const timer = el('div', { class: 'breathe-timer' }, '3 min · 5s inspire / 5s expire');
  let running = false, iv = null, endAt = 0;

  const toggle = el('button', { class: 'btn primary', onclick: () => running ? stop() : start() }, 'Commencer');

  function tick() {
    const now = Date.now();
    const left = Math.max(0, Math.ceil((endAt - now) / 1000));
    if (left <= 0) { stop(); toast('Séance terminée 🤍'); return; }
    const phase = Math.floor((now / 1000) % 10) < 5 ? 'in' : 'out';
    orb.classList.toggle('in', phase === 'in');
    orb.classList.toggle('out', phase === 'out');
    orb.textContent = phase === 'in' ? 'Inspire…' : 'Expire…';
    const mm = String(Math.floor(left / 60)).padStart(1, '0'); const ss = String(left % 60).padStart(2, '0');
    timer.textContent = `${mm}:${ss} restant`;
  }
  function start() {
    running = true; toggle.textContent = 'Arrêter'; endAt = Date.now() + 180000;
    tick(); iv = setInterval(tick, 250);
  }
  function stop() {
    running = false; toggle.textContent = 'Commencer'; clearInterval(iv);
    orb.classList.remove('in'); orb.classList.add('out'); orb.textContent = 'Prêt·e ?';
    timer.textContent = '3 min · 5s inspire / 5s expire';
  }

  s.append(el('div', { class: 'card pad-lg' },
    el('div', { class: 'breathe-stage' }, orb, timer, toggle),
    el('p', { class: 'small muted center', style: 'margin-top:6px' }, 'Laissez l’air descendre dans le ventre. Rien à forcer : suivez simplement le rythme.'),
  ));

  // Ancrage somatique
  s.append(el('div', { class: 'card' },
    el('h3', {}, '🌍 Ancrage somatique (5-4-3-2-1)'),
    el('p', { class: 'small muted' }, 'Quand l’émotion déborde, revenir aux sens :'),
    el('ul', { class: 'small', style: 'padding-left:20px;color:var(--ink-soft);line-height:1.9' },
      el('li', {}, '5 choses que je vois'),
      el('li', {}, '4 choses que je touche'),
      el('li', {}, '3 choses que j’entends'),
      el('li', {}, '2 choses que je sens (odeur)'),
      el('li', {}, '1 chose que je goûte'),
    ),
  ));

  // Journal court de séance
  const note = el('textarea', { placeholder: 'Comment je me sens après ? (optionnel)', style: 'min-height:70px' });
  s.append(el('div', { class: 'card' },
    el('h3', {}, 'Noter ma séance'),
    note,
    el('button', { class: 'btn ghost block', style: 'margin-top:10px', onclick: async () => {
      await addEntry('regulation', { technique: 'Cohérence cardiaque', note: note.value.trim() });
      note.value = '';
    } }, 'Enregistrer une séance'),
  ));

  s.append(el('h3', { style: 'margin:8px 0' }, 'Séances'));
  s.append(entryLog('regulation', (e) => el('div', {},
    el('span', { class: 'tag' }, e.technique || 'Séance'),
    e.note ? el('div', { class: 'ebody pre', style: 'margin-top:6px' }, e.note) : null,
  )));
}

/* ============================================================
   5) Conscience de soi / ego
   ============================================================ */
function viewAwareness(s) {
  viewHead(s, 'Conscience de soi', 'Observer l’ego, sans jugement');
  s.append(el('div', { class: 'card' },
    el('p', { class: 'small muted' }, 'L’ego raconte des histoires automatiques (« je ne suis pas assez », « ils vont m’abandonner »…). Les repérer, c’est déjà s’en libérer un peu. Je deviens l’observateur·rice.'),
  ));

  const story = el('textarea', { placeholder: 'Quelle histoire mon mental raconte-t-il en ce moment ?' });
  const pattern = el('textarea', { placeholder: 'À quel pattern / peur ancienne cela ressemble-t-il ?' });
  const observer = el('textarea', { placeholder: 'Ce que l’observateur·rice conscient·e en moi voit : est-ce un fait, ou une pensée ?' });

  s.append(el('div', { class: 'card' },
    el('label', { class: 'field' }, el('span', {}, 'L’histoire automatique'), story),
    el('label', { class: 'field' }, el('span', {}, 'Le pattern reconnu'), pattern),
    el('label', { class: 'field' }, el('span', {}, 'Le regard de l’observateur·rice'), observer),
    el('button', { class: 'btn primary block', onclick: async () => {
      if (!story.value.trim()) { toast('Décrivez l’histoire repérée.'); return; }
      await addEntry('awareness', { story: story.value.trim(), pattern: pattern.value.trim(), observer: observer.value.trim() });
      [story, pattern, observer].forEach((x) => (x.value = ''));
    } }, 'Enregistrer'),
  ));

  s.append(el('h3', { style: 'margin:8px 0' }, 'Mes observations'));
  s.append(entryLog('awareness', (e) => el('div', {},
    el('div', { class: 'entry' }, el('div', { class: 'em' }, 'Histoire'), el('div', { class: 'pre' }, e.story)),
    e.pattern ? el('div', { class: 'entry' }, el('div', { class: 'em' }, 'Pattern'), el('div', { class: 'pre' }, e.pattern)) : null,
    e.observer ? el('div', { class: 'entry' }, el('div', { class: 'em' }, 'Observateur·rice'), el('div', { class: 'pre' }, e.observer)) : null,
  )));
}

/* ============================================================
   6) Journal expressif (Pennebaker) + suivi humeur
   ============================================================ */
function viewExpressive(s) {
  viewHead(s, 'Journal expressif', 'Écrire librement · Pennebaker');

  // Suivi humeur (tendance) — combine checkin + expressif
  const moods = State.entries
    .filter((e) => (e.module === 'expressive' && typeof e.mood === 'number') || (e.module === 'checkin' && typeof e.intensity === 'number'))
    .slice(0, 30).reverse();
  if (moods.length >= 2) {
    const trend = el('div', { class: 'trend' });
    moods.forEach((e) => {
      const v = e.module === 'expressive' ? e.mood : e.intensity;
      const bar = el('div', { class: 'bar', title: `${v}/10` }, el('i', { style: `height:${v * 10}%` }));
      trend.append(bar);
    });
    s.append(el('div', { class: 'card' },
      el('h3', {}, '📈 Suivi de l’humeur'),
      el('p', { class: 'small muted' }, 'Vos ' + moods.length + ' derniers relevés (journal + check-in), du plus ancien au plus récent.'),
      trend,
    ));
  }

  const ta = el('textarea', { placeholder: 'Écrivez sans filtre pendant quelques minutes, sur ce qui vous touche vraiment. Ni orthographe, ni jugement — juste vous.', style: 'min-height:180px' });
  const rangeVal = el('span', { class: 'rangeval' }, '5');
  const range = el('input', { type: 'range', min: 1, max: 10, value: 5, oninput: (e) => (rangeVal.textContent = e.target.value) });

  s.append(el('div', { class: 'card' },
    el('label', { class: 'field' }, el('span', {}, 'Écriture libre'), ta),
    el('label', { class: 'field' }, el('span', {}, 'Mon humeur après avoir écrit'), el('div', { class: 'center', style: 'margin-bottom:4px' }, rangeVal), range),
    el('button', { class: 'btn primary block', onclick: async () => {
      if (!ta.value.trim()) { toast('Écrivez quelques mots.'); return; }
      await addEntry('expressive', { text: ta.value.trim(), mood: +range.value });
      go('expressive');
    } }, 'Enregistrer'),
  ));

  s.append(el('h3', { style: 'margin:8px 0' }, 'Mes écrits'));
  s.append(entryLog('expressive', (e) => el('div', {},
    el('div', { class: 'small muted' }, 'Humeur : ' + (e.mood || '—') + '/10'),
    el('div', { class: 'ebody pre', style: 'margin-top:6px' }, e.text),
  )));
}

/* ---------- Service worker ---------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
