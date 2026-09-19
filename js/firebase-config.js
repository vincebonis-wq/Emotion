// ============================================================
//  Configuration Firebase — Travail émotionnel
// ============================================================
//  ⚠️  À REMPLIR PAR LE PROPRIÉTAIRE (voir README, section Firebase)
//
//  1. console.firebase.google.com → créer un projet (gratuit)
//  2. Ajouter une app Web (</>) → copier l'objet firebaseConfig
//  3. Coller les valeurs ci-dessous (remplacer les "VOTRE_...")
//  4. Authentication → Sign-in method → activer "E-mail/Mot de passe"
//  5. Firestore Database → créer (mode production) → publier les règles
//     d'isolation fournies dans le README.
//
//  Tant que ce fichier n'est pas rempli, l'app affiche un message
//  d'aide sur l'écran de connexion (aucun compte possible).
// ============================================================

window.FIREBASE_CONFIG = {
  apiKey:            "VOTRE_API_KEY",
  authDomain:        "VOTRE_PROJET.firebaseapp.com",
  projectId:         "VOTRE_PROJET",
  storageBucket:     "VOTRE_PROJET.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId:             "VOTRE_APP_ID"
};

// Ne pas modifier : détecte si la config a bien été remplie.
window.FIREBASE_READY = !String(window.FIREBASE_CONFIG.apiKey).startsWith("VOTRE_");
