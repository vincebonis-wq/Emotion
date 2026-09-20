# Travail émotionnel

Application PWA privée dédiée au **travail émotionnel** — indépendante de l'app
Manifestation (dépôt, lien, déploiement et base de données séparés).

Méthode inspirée du travail de **Dr. Nicole LePera** (*How to Do the Work* /
*Reparenting the Inner Child*) et de l'écriture expressive de **Pennebaker**.

**Lien Pages :** https://vincebonis-wq.github.io/Emotion/
*(si le dépôt garde l'accent « Émotion », l'URL devient
`https://vincebonis-wq.github.io/%C3%89motion/`)*

---

## Le parcours guidé (pour débuter en douceur)

L'accueil propose un fil conducteur **pas à pas** — pensé pour quelqu'un qui
découvre le travail émotionnel :

- **Mon prochain pas** : une seule carte à la fois guide la découverte
  (objectif → bilan → check-in → atelier → respiration → patterns).
- **Le bilan** : questionnaire ~5 min (auto-évaluation + situations
  imaginaires) → un *indice de réactivité* /100 et un score par thème.
  **Refaisable** → courbe de progression et comparatif dans le temps.
- **Ateliers thématiques** guidés (8 thèmes : besoin de contrôle, prendre les
  choses personnellement, réactivité, peur du rejet, perfectionnisme,
  culpabilité, besoin de validation, évitement) — chaque atelier : comprendre
  → se reconnaître (cases) → écrire → une micro-pratique.
- **Mes patterns** : relie les exercices (émotions, thèmes du bilan, cases
  cochées, ateliers) pour faire émerger des observations douces.
- **Exploration libre** : les 6 journaux/pratiques, accessibles à tout moment.
  Les plus introspectifs se **débloquent après le premier bilan** (jamais
  bloquant : on peut le faire à la volée).

## Les modules (v1)

| Module | Rôle |
|---|---|
| 🌱 **Future Self Journal** | Un pattern à transformer / mois + affirmations, puis les 4 prompts du jour (~5 min). |
| 🎡 **Check-in émotionnel** | Roue des émotions (nommer + intensité) — *nommer pour apaiser*. |
| 🤍 **Enfant intérieur** | Reparentage, 4 piliers LePera + « de quoi la partie plus jeune de moi a besoin ? ». |
| 🌬️ **Régulation** | Cohérence cardiaque 5s/5s guidée + ancrage somatique 5-4-3-2-1. |
| 👁️ **Conscience de soi** | Repérer les histoires automatiques de l'ego, devenir l'observateur·rice. |
| ✍️ **Journal expressif** | Écriture libre (Pennebaker) + suivi de l'humeur dans le temps. |

Fonctionnalités du socle : **PWA installable** (Mac + iPhone), **hors-ligne**
(service worker réseau-d'abord), **comptes Firebase** isolés par utilisateur,
**synchro temps réel**, **export / import** JSON, **contrôle manuel de la taille
du texte**, retours à la ligne respectés.

---

## ✅ Ce que le propriétaire doit faire (2 actions manuelles)

### 1) Activer GitHub Pages
`Settings → Pages → Build and deployment → Deploy from a branch`
→ Branche : **la branche de dev** (`claude/brief-uns2qv`) · Dossier : **/(root)** → **Save**.
Attendre ~1 min, puis ouvrir le lien Pages ci-dessus.

> Astuce lien plus propre : `Settings → General → Repository name` → renommer en
> `emotion` (GitHub garde la redirection).

### 2) Configurer Firebase (comptes + synchro)

1. **Créer le projet** — [console.firebase.google.com](https://console.firebase.google.com)
   → *Ajouter un projet* (offre gratuite Spark, suffisante).
2. **Ajouter une app Web** — icône `</>` → donner un nom → *Enregistrer*.
   Firebase affiche un objet `firebaseConfig` : **copier ses valeurs**.
3. **Coller la config** dans [`js/firebase-config.js`](js/firebase-config.js)
   (remplacer les `"VOTRE_..."`). Committer + pousser.
4. **Activer l'authentification** — `Authentication → Get started →
   Sign-in method → E-mail/Mot de passe → Activer → Enregistrer`.
5. **Créer la base** — `Firestore Database → Créer une base de données →
   Mode production → choisir la région (europe-west) → Activer`.
6. **Publier les règles d'isolation** — onglet `Règles`, coller ceci puis
   *Publier* :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Chaque utilisateur n'accède qu'à ses propres données.
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 3) Rappels push quotidiens (optionnel)

Les rappels *app fermée* exigent : (a) l'app **installée** sur l'écran
d'accueil (obligatoire sur iPhone), (b) **Firebase Cloud Messaging**, et
(c) un **planificateur** qui envoie le message chaque jour.

**Côté app (déjà codé) :**
1. `Firebase → Cloud Messaging` : dans les *Paramètres du projet → Cloud
   Messaging → Web Push certificates*, génère une paire de clés et copie
   la **clé publique**.
2. Colle-la dans [`js/firebase-config.js`](js/firebase-config.js) →
   `self.FIREBASE_VAPID = "…"`. Committer + pousser.
3. Dans l'app (installée, connecté·e en cloud) : menu ⋯ → **🔔 Rappels
   quotidiens → Activer**. Le jeton de l'appareil est enregistré sous
   `users/{uid}/pushTokens`.

**Côté envoi quotidien** — il faut un petit programme qui, chaque matin,
lit les jetons et envoie via l'API Admin FCM. Le plus simple : une
**Cloud Function planifiée** (nécessite le forfait **Blaze**, quasi
gratuit à ce volume). Exemple :

```js
// functions/index.js
const { onSchedule } = require('firebase-functions/v2/scheduler');
const admin = require('firebase-admin');
admin.initializeApp();

const MESSAGES = [
  'Un instant pour toi ? 🌱',
  'Comment te sens-tu, là, maintenant ?',
  'Une petite pause douce t’attend.',
];

exports.dailyReminder = onSchedule(
  { schedule: '0 9 * * *', timeZone: 'Europe/Paris' }, // 9h chaque jour
  async () => {
    const db = admin.firestore();
    const users = await db.collection('users').listDocuments();
    for (const u of users) {
      const toks = await u.collection('pushTokens').get();
      const tokens = toks.docs.map((d) => d.id);
      if (!tokens.length) continue;
      const body = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      await admin.messaging().sendEachForMulticast({
        tokens,
        notification: { title: 'Travail émotionnel', body },
      });
    }
  }
);
```

Déploiement : `firebase init functions` puis `firebase deploy --only functions`.
Alternative sans Blaze : n'importe quel serveur/cron (ton PC, un petit VPS)
qui exécute ce même code avec un compte de service Admin.

> Astuce : `pushTokens` est déjà couvert par la règle d'isolation
> ci‑dessus (`users/{userId}/**`). Rien à ajouter.

C'est tout. Tant que la config n'est pas remplie, l'écran de connexion affiche
un message d'aide (aucun compte n'est possible avant).

Ensuite : ouvrir l'app → *Créer un compte* (e-mail + mot de passe). Chaque
personne (toi, ta copine, un·e client·e) crée son propre compte ; les données
sont strictement cloisonnées par les règles ci-dessus.

---

## Structure

```
index.html            écran de connexion + coquille de l'app
manifest.webmanifest  métadonnées PWA
sw.js                 service worker (réseau-d'abord + repli cache)
css/style.css         design system (ivoire + accent sauge, Cinzel/Poppins)
js/firebase-config.js  ← à remplir par le propriétaire
js/app.js             logique complète (auth, Firestore, modules)
assets/               ouroboros + icônes
```

## Modèle de données (Firestore)

```
users/{uid}/config/app        { textScale, fsPattern, fsAffirmations, fsMonth }
users/{uid}/entries/{autoId}  { module, date, createdAt, ...champs du module }
```

## Confidentialité

Espace privé, non médical. Les écrits servent au soin personnel, jamais à
« réussir ». En cas de détresse, consulter un·e professionnel·le de santé.
