# Travail émotionnel

Application PWA privée dédiée au **travail émotionnel** — indépendante de l'app
Manifestation (dépôt, lien, déploiement et base de données séparés).

Méthode inspirée du travail de **Dr. Nicole LePera** (*How to Do the Work* /
*Reparenting the Inner Child*) et de l'écriture expressive de **Pennebaker**.

**Lien Pages :** https://vincebonis-wq.github.io/Emotion/
*(si le dépôt garde l'accent « Émotion », l'URL devient
`https://vincebonis-wq.github.io/%C3%89motion/`)*

---

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
