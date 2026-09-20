/* ============================================================
   Contenu de l'app — thèmes (patterns), bilan, ateliers, parcours
   Séparé de la logique pour rester facile à enrichir.
   Ton : doux, sûr, non culpabilisant (esprit Dr. Nicole LePera).
   ============================================================ */
'use strict';

/* ---------- Thèmes / patterns sous-jacents ---------- */
window.THEMES = {
  controle:    { nm: 'Le besoin de contrôle', ic: '🎛️', short: 'Contrôle',   desc: 'Vouloir tout maîtriser pour se sentir en sécurité.' },
  perso:       { nm: 'Prendre les choses personnellement', ic: '🎯', short: 'Prendre perso', desc: 'Interpréter ce qui arrive comme dirigé contre soi.' },
  reactif:     { nm: 'La réactivité', ic: '⚡', short: 'Réactivité', desc: 'Réagir vite et fort, avant d’avoir pris du recul.' },
  rejet:       { nm: 'La peur du rejet', ic: '🚪', short: 'Rejet',       desc: 'Craindre l’abandon, de ne pas être voulu·e.' },
  perfection:  { nm: 'Le perfectionnisme', ic: '💎', short: 'Perfection', desc: 'Se mesurer à un idéal impossible, se juger durement.' },
  culpabilite: { nm: 'La culpabilité', ic: '🪨', short: 'Culpabilité', desc: 'Se sentir responsable de tout, même de l’humeur des autres.' },
  validation:  { nm: 'Le besoin de validation', ic: '👍', short: 'Validation', desc: 'Chercher l’approbation pour se sentir OK.' },
  evitement:   { nm: 'L’évitement émotionnel', ic: '🌫️', short: 'Évitement', desc: 'Se couper de ce qu’on ressent pour ne pas souffrir.' },
};

/* ---------- Bilan : échelle commune ---------- */
window.BILAN_SCALE = ['Jamais', 'Rarement', 'Parfois', 'Souvent', 'Presque toujours']; // 0..4

/* ---------- Bilan : items (2 par thème, mêlant auto-éval et situations) ---------- */
window.BILAN = [
  // Contrôle
  { theme: 'controle', text: 'Quand une situation m’échappe, je ressens une tension forte.' },
  { theme: 'controle', text: 'Imagine un plan qui change à la dernière minute : cela me contrarie beaucoup.', scenario: true },
  // Prendre perso
  { theme: 'perso', text: 'Quand quelqu’un est distant, je pense d’abord que c’est à cause de moi.' },
  { theme: 'perso', text: 'Un ami ne répond pas à mon message pendant deux jours : je me demande ce que j’ai fait de mal.', scenario: true },
  // Réactivité
  { theme: 'reactif', text: 'Je réagis (mots, gestes, ton) plus vite que je ne le voudrais.' },
  { theme: 'reactif', text: 'On me fait une remarque en public : je sens la colère ou les larmes monter aussitôt.', scenario: true },
  // Rejet
  { theme: 'rejet', text: 'J’ai peur qu’on finisse par me laisser tomber.' },
  { theme: 'rejet', text: 'Un proche annule un rendez-vous : je crains qu’il s’éloigne de moi.', scenario: true },
  // Perfectionnisme
  { theme: 'perfection', text: 'Je me juge sévèrement quand je ne fais pas les choses parfaitement.' },
  { theme: 'perfection', text: 'Je termine un projet correct mais imparfait : je n’arrive pas à en être fier·ère.', scenario: true },
  // Culpabilité
  { theme: 'culpabilite', text: 'Je me sens coupable même quand ce n’est pas ma responsabilité.' },
  { theme: 'culpabilite', text: 'Un proche est de mauvaise humeur : je me sens responsable de le réconforter.', scenario: true },
  // Validation
  { theme: 'validation', text: 'J’ai besoin de l’approbation des autres pour me sentir bien.' },
  { theme: 'validation', text: 'Je poste quelque chose et personne ne réagit : ma valeur en prend un coup.', scenario: true },
  // Évitement
  { theme: 'evitement', text: 'Quand une émotion difficile arrive, je me distrais pour ne pas la sentir.' },
  { theme: 'evitement', text: 'Une conversation devient émotionnelle : j’ai envie de fuir ou de changer de sujet.', scenario: true },
];

/* ---------- Ateliers thématiques (guidés) ---------- */
window.ATELIERS = {
  controle: {
    intro: 'Le besoin de contrôle naît souvent d’une peur ancienne de l’imprévu. Enfant, contrôler pouvait être une façon de se sentir en sécurité. Aujourd’hui, ce réflexe protège encore — mais il fatigue. L’objectif n’est pas de « lâcher » d’un coup, mais de découvrir qu’on peut se sentir en sécurité même quand tout n’est pas maîtrisé.',
    recognize: ['Je prépare des plans B (et C) « au cas où ».', 'Déléguer me stresse : je préfère faire moi-même.', 'L’incertitude me tient éveillé·e la nuit.', 'Je donne des conseils qu’on ne m’a pas demandés.'],
    prompts: ['Qu’est-ce que je cherche vraiment à éviter en voulant tout contrôler ?', 'Quelle petite chose pourrais-je laisser être imparfaite cette semaine ?'],
    practice: 'Aujourd’hui, choisis UNE situation mineure et laisse-la se dérouler sans intervenir. Observe la sensation dans ton corps, sans la corriger.',
  },
  perso: {
    intro: 'Prendre les choses personnellement, c’est croire que le comportement des autres parle de notre valeur. Le plus souvent, les gens agissent depuis leur propre monde intérieur — leur fatigue, leurs peurs, leur histoire. Apprendre à faire la part des choses libère une énorme charge.',
    recognize: ['Un silence me semble forcément dirigé contre moi.', 'Je rejoue les conversations en cherchant ce que j’ai « mal fait ».', 'Une critique sur un détail me fait douter de moi tout entier·ère.', 'Je devine les pensées des autres… en supposant le pire.'],
    prompts: ['Quelle interprétation « c’est contre moi » ai-je eue récemment ?', 'Quelles seraient 2 autres explications possibles, sans moi au centre ?'],
    practice: 'La prochaine fois qu’un comportement te blesse, demande-toi : « Et si cela n’avait rien à voir avec moi ? » Note la réponse.',
  },
  reactif: {
    intro: 'La réactivité, c’est le système nerveux qui passe en alerte avant que le mental n’ait eu le temps de réfléchir. Ce n’est pas un défaut de caractère : c’est une réponse de protection très rapide. En créant un petit espace entre le déclencheur et la réaction, on retrouve le choix.',
    recognize: ['Je réponds du tac au tac, puis je regrette.', 'Mon corps s’emballe (cœur, chaleur) très vite.', 'Je passe de calme à submergé·e en quelques secondes.', 'Après coup, je me dis « j’ai réagi trop fort ».'],
    prompts: ['Quel est mon déclencheur le plus fréquent ?', 'Quels signaux mon corps m’envoie-t-il juste avant de réagir ?'],
    practice: 'La technique STOP : au prochain déclencheur, arrête-toi, prends 3 respirations lentes, observe ce que tu ressens, puis choisis ta réponse.',
  },
  rejet: {
    intro: 'La peur du rejet touche un besoin humain fondamental : appartenir. Quand ce besoin a été fragilisé, le cerveau devient hypervigilant au moindre signe d’éloignement. Se rassurer soi-même, comme un parent bienveillant, apaise peu à peu cette alarme.',
    recognize: ['Je m’adapte beaucoup pour ne pas déplaire.', 'Un changement de ton me fait craindre l’abandon.', 'Je teste parfois les autres pour vérifier qu’ils restent.', 'Je préfère partir avant qu’on me quitte.'],
    prompts: ['Quand ai-je ressenti cette peur pour la première fois ?', 'Que dirais-je à un enfant qui a peur d’être abandonné ?'],
    practice: 'Écris une phrase de sécurité et relis-la ce soir : « Même seul·e, je reste avec moi. Je ne me quitte pas. »',
  },
  perfection: {
    intro: 'Le perfectionnisme confond souvent valeur personnelle et performance. Derrière l’exigence, il y a fréquemment la peur : « si je ne suis pas parfait·e, je ne serai pas aimé·e / à la hauteur ». On peut viser la qualité sans se maltraiter.',
    recognize: ['« Assez bien » ne me suffit jamais.', 'Je repousse ou j’évite par peur de mal faire.', 'Je vois d’abord ce qui manque, pas ce qui est réussi.', 'Je me parle plus durement qu’à un ami.'],
    prompts: ['Qu’est-ce que la perfection est censée m’apporter (ou m’éviter) ?', 'Où pourrais-je m’autoriser un « suffisamment bien » cette semaine ?'],
    practice: 'Fais une tâche à 80 % volontairement, puis arrête-toi. Observe : le monde tient-il debout ?',
  },
  culpabilite: {
    intro: 'La culpabilité excessive vient souvent d’un rôle appris tôt : celui de veiller sur les émotions des autres. C’est généreux, mais épuisant et injuste envers soi. On peut être attentionné·e sans se rendre responsable de tout.',
    recognize: ['Je m’excuse même quand je n’y suis pour rien.', 'Dire non me donne mauvaise conscience.', 'Je me sens coupable de me reposer.', 'Je porte l’humeur des autres comme si c’était la mienne.'],
    prompts: ['De quoi est-ce que je me sens responsable, à tort ?', 'Quelle est la part qui m’appartient vraiment, et celle qui appartient à l’autre ?'],
    practice: 'Aujourd’hui, dis un « non » doux, ou laisse une émotion à son propriétaire. Note ce que tu ressens.',
  },
  validation: {
    intro: 'Chercher la validation, c’est confier aux autres la clé de sa valeur. Le regard extérieur fait du bien, mais il ne peut pas remplacer un socle intérieur. Apprendre à se valider soi-même rend plus libre et plus stable.',
    recognize: ['Mon humeur dépend des retours que je reçois.', 'J’ai du mal à décider sans l’avis des autres.', 'Je minimise mes réussites tant qu’on ne les reconnaît pas.', 'Je cherche à plaire même à ceux qui comptent peu.'],
    prompts: ['Dans quels moments est-ce que je m’abandonne pour être approuvé·e ?', 'De quoi suis-je fier·ère, indépendamment du regard des autres ?'],
    practice: 'Ce soir, note une chose que tu as bien faite — sans la montrer à personne. Elle compte quand même.',
  },
  evitement: {
    intro: 'Éviter ses émotions est une stratégie de survie : ce qui n’a pas pu être ressenti en sécurité a été mis de côté. Mais les émotions non accueillies reviennent, plus fort. Les sentir, un peu à la fois, dans un cadre sûr, leur permet de passer.',
    recognize: ['Je me remplis d’activités pour ne pas ressentir.', 'Je « vais bien » un peu trop automatiquement.', 'Je somatise (tensions, fatigue, ventre) sans savoir pourquoi.', 'Je fuis les conversations émotionnelles.'],
    prompts: ['Quelle émotion est-ce que j’évite le plus en ce moment ?', 'Où est-elle logée dans mon corps si je m’arrête un instant ?'],
    practice: 'Assieds-toi 2 minutes, une main sur la poitrine. Nomme ce qui est là : « Je remarque… ». Rien à réparer, juste accueillir.',
  },
};

/* ---------- Parcours guidé : étapes ordonnées ---------- */
/* done(ctx) et action(ctx) reçoivent des helpers fournis par app.js */
window.STEPS = [
  { id: 'welcome',  title: 'Bienvenue 🌿', desc: 'Prends 1 minute pour poser ton intention. Cet espace est à toi, à ton rythme.', cta: 'Poser mon objectif', act: (h) => h.editObjective(), done: (h) => !!h.config.objective },
  { id: 'bilan',    title: 'Faire mon premier bilan', desc: '~5 min. Un point de départ tout doux pour voir où tu en es — sans bonne ni mauvaise note.', cta: 'Commencer le bilan', act: (h) => h.go('bilan'), done: (h) => h.hasEntry('bilan') },
  { id: 'checkin',  title: 'Mon premier check-in', desc: 'Nommer une émotion présente, là, maintenant. Nommer, c’est déjà apaiser.', cta: 'Faire un check-in', act: (h) => h.go('checkin'), done: (h) => h.hasEntry('checkin') },
  { id: 'atelier',  title: 'Explorer mon thème principal', desc: 'Un atelier guidé sur le thème qui ressort le plus de ton bilan.', cta: 'Ouvrir l’atelier', act: (h) => h.go('atelier:' + (h.topTheme() || 'controle')), done: (h) => h.hasEntry('atelier') },
  { id: 'regulation', title: 'Une pause respiration', desc: '3 minutes de cohérence cardiaque pour apaiser le système nerveux.', cta: 'Respirer', act: (h) => h.go('regulation'), done: (h) => h.hasEntry('regulation') },
  { id: 'futureself', title: 'Choisir un pattern à transformer', desc: 'Un seul pattern pour le mois, avec tes affirmations et tes prompts du jour.', cta: 'Ouvrir le journal', act: (h) => h.go('futureself'), done: (h) => !!h.config.fsPattern },
  { id: 'patterns', title: 'Observer mes premiers liens', desc: 'Découvre les patterns qui relient tes exercices entre eux.', cta: 'Voir mes patterns', act: (h) => h.go('patterns'), done: (h) => h.entries.length >= 4 },
];
