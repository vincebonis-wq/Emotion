/* ============================================================
   Contenu de l'app — thèmes, émotions, bilan, ateliers, parcours
   Profondeur : psychologie + regard jungien, esprit Dr. Nicole LePera
   (« on se connecte à l'émotion avant de la travailler »).
   Ton : doux, sûr, non culpabilisant. On avance main dans la main.
   ============================================================ */
'use strict';

/* ------------------------------------------------------------
   Principe fondateur (rappelé à plusieurs endroits)
   ------------------------------------------------------------ */
window.CONNECT = {
  title: 'Se connecter avant de transformer',
  body: 'Avant de vouloir changer quoi que ce soit, on cherche d’abord à SENTIR. '
      + 'Une émotion n’est pas un problème à résoudre : c’est un messager. Niée, elle insiste et ressort ailleurs (dans le corps, dans nos réactions). Accueillie, elle se dépose et se transforme d’elle-même.\n\n'
      + 'Comme le rappelle Dr. Nicole LePera, le travail ne commence pas par « corriger » : il commence par revenir dans le corps, poser une main sur soi, et laisser l’émotion exister quelques instants sans la juger. Ensuite seulement, une fois qu’on l’a écoutée, on peut choisir une réponse nouvelle.',
};

/* ------------------------------------------------------------
   Le rôle des émotions (psychologie + Jung), par famille
   Affiché dans le check-in quand on nomme une émotion.
   ------------------------------------------------------------ */
window.EMOTION_ROLES = {
  Joie: {
    message: 'Ce qui se passe me nourrit — continue par là.',
    role: 'La joie signale l’alignement : un besoin comblé, un lien vivant, du sens. Elle élargit l’attention, ouvre à l’autre et consolide ce qui est bon. Notre cerveau retient plus facilement le négatif : la joie demande donc qu’on ralentisse pour vraiment l’absorber.',
    jung: 'Jung y voit un contact avec le Soi et la vitalité — l’énergie de l’enfant intérieur et de la spontanéité. À distinguer d’une joie de façade (persona) qui sourit pour être accepté·e : la vraie joie détend, elle ne se force pas.',
    welcome: 'Savoure lentement. Nomme ce qui l’a créée pour pouvoir y revenir.',
  },
  Tristesse: {
    message: 'Quelque chose compte pour moi, et me manque.',
    role: 'La tristesse accompagne la perte et le changement. Elle nous fait ralentir, nous tourner vers l’intérieur, et — signal social puissant — elle appelle le réconfort et le lien. Ce n’est pas de la faiblesse : c’est le prix de l’attachement.',
    jung: 'Jung parle de la descente : la mélancolie ouvre le travail de l’âme, cette phase sombre (nigredo) d’où naît souvent la transformation. La tristesse traversée fertilise ; refoulée, elle se fige.',
    welcome: 'Laisse couler sans colmater. Demande-toi : de quoi ai-je besoin, et de qui ?',
  },
  Peur: {
    message: 'Protège-toi, prépare-toi — attention.',
    role: 'La peur est une gardienne : elle anticipe le danger et mobilise le corps. Utile face à un risque réel, elle devient encombrante quand elle rejoue d’anciennes alertes qui n’ont plus lieu d’être. Distinguer « danger présent » et « mémoire de danger » change tout.',
    jung: 'Jung la nomme gardienne du seuil : elle surgit au bord de ce qui veut grandir en nous. Souvent, ce qu’on redoute au-dehors est une part de soi non reconnue (l’ombre) qu’on projette sur l’extérieur.',
    welcome: 'Reviens au corps, respire lentement. Demande : ce danger est-il ici, maintenant ?',
  },
  Colère: {
    message: 'Une limite ou une valeur importante a été franchie.',
    role: 'La colère est l’énergie qui protège nos limites et affirme nos besoins. Saine, elle dit « ça compte pour moi » et met en mouvement. Le problème n’est pas de la ressentir, mais de la déverser ou de l’étouffer : les deux abîment.',
    jung: 'Pour Jung, la colère refoulée nourrit l’ombre — cette force vitale mise de côté qui finit par déborder. Sous la colère se cache presque toujours quelque chose de plus tendre : une blessure, une peur, un besoin non entendu.',
    welcome: 'Sens l’énergie sans agir dessus. Cherche le besoin en dessous : que veux-tu protéger ?',
  },
  'Honte / gêne': {
    message: 'J’ai peur de ne pas être digne d’amour ou d’appartenance.',
    role: 'La honte régule notre appartenance au groupe. Une dose légère nous rend attentif·ve aux autres. Mais quand elle dit « JE suis mauvais·e » (et non « j’ai fait une erreur », qui est la culpabilité), elle devient toxique et isole. La distinguer de la culpabilité est libérateur.',
    jung: 'La honte est au cœur de l’ombre : ce qu’on cache par peur d’être rejeté·e. Jung invite à ramener ces parts à la lumière — non pour les exhiber, mais pour cesser de se combattre. Exposée à un regard bienveillant, la honte fond.',
    welcome: 'Pose une main sur le cœur. Rappelle-toi : une erreur ne définit pas ta valeur.',
  },
  Autre: {
    message: 'Je traverse un entre-deux.',
    role: 'Surprise, confusion, curiosité, fatigue, neutralité : des états de transition. La confusion précède souvent une réorganisation intérieure — c’est inconfortable mais fécond. La fatigue est un besoin (repos, retrait). Le neutre a le droit d’exister : tout n’a pas à être intense.',
    jung: 'Jung valorise ces seuils, ces zones floues où l’ancien se défait avant que le nouveau n’apparaisse. Rester avec l’incertitude, sans la fuir, est déjà un travail intérieur.',
    welcome: 'N’exige rien de toi. Observe, respire, laisse les choses se déposer.',
  },
};

/* ------------------------------------------------------------
   Thèmes / patterns sous-jacents
   ------------------------------------------------------------ */
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

/* ------------------------------------------------------------
   Bilan
   ------------------------------------------------------------ */
window.BILAN_SCALE = ['Jamais', 'Rarement', 'Parfois', 'Souvent', 'Presque toujours']; // 0..4
window.BILAN = [
  { theme: 'controle', text: 'Quand une situation m’échappe, je ressens une tension forte.' },
  { theme: 'controle', text: 'Imagine un plan qui change à la dernière minute : cela me contrarie beaucoup.', scenario: true },
  { theme: 'perso', text: 'Quand quelqu’un est distant, je pense d’abord que c’est à cause de moi.' },
  { theme: 'perso', text: 'Un ami ne répond pas à mon message pendant deux jours : je me demande ce que j’ai fait de mal.', scenario: true },
  { theme: 'reactif', text: 'Je réagis (mots, gestes, ton) plus vite que je ne le voudrais.' },
  { theme: 'reactif', text: 'On me fait une remarque en public : je sens la colère ou les larmes monter aussitôt.', scenario: true },
  { theme: 'rejet', text: 'J’ai peur qu’on finisse par me laisser tomber.' },
  { theme: 'rejet', text: 'Un proche annule un rendez-vous : je crains qu’il s’éloigne de moi.', scenario: true },
  { theme: 'perfection', text: 'Je me juge sévèrement quand je ne fais pas les choses parfaitement.' },
  { theme: 'perfection', text: 'Je termine un projet correct mais imparfait : je n’arrive pas à en être fier·ère.', scenario: true },
  { theme: 'culpabilite', text: 'Je me sens coupable même quand ce n’est pas ma responsabilité.' },
  { theme: 'culpabilite', text: 'Un proche est de mauvaise humeur : je me sens responsable de le réconforter.', scenario: true },
  { theme: 'validation', text: 'J’ai besoin de l’approbation des autres pour me sentir bien.' },
  { theme: 'validation', text: 'Je poste quelque chose et personne ne réagit : ma valeur en prend un coup.', scenario: true },
  { theme: 'evitement', text: 'Quand une émotion difficile arrive, je me distrais pour ne pas la sentir.' },
  { theme: 'evitement', text: 'Une conversation devient émotionnelle : j’ai envie de fuir ou de changer de sujet.', scenario: true },
];

/* ------------------------------------------------------------
   Ateliers thématiques (guidés + profonds)
   Chaque atelier :
     intro    — comprendre (origine développementale)
     hides    — ce que le pattern protège / camoufle (l'émotion dessous)
     jung     — le regard de Jung (ombre, persona, complexes, Soi)
     connect  — se connecter à l'émotion avant de la transformer (LePera)
     recognize[] — cases « je me reconnais »
     prompts[]   — écriture
     practice    — micro-pratique
   ------------------------------------------------------------ */
window.ATELIERS = {
  controle: {
    intro: 'Le besoin de contrôle est rarement un trait de caractère : c’est une stratégie apprise. Quand, enfant, l’environnement était imprévisible ou peu sécurisant, tout anticiper devenait une façon de survivre. Le corps a retenu : « si je maîtrise, je suis en sécurité ». Aujourd’hui encore, ce réflexe cherche à te protéger — mais il épuise, car la vie, elle, reste incertaine.',
    hides: 'Sous le contrôle se cache presque toujours de l’anxiété, et souvent une peur plus ancienne : celle du chaos, de l’abandon, ou de ne pas être à la hauteur. Contrôler l’extérieur est une manière de ne pas sentir cette peur intérieure. Ce n’est pas le désordre qu’on fuit : c’est la sensation d’impuissance qu’il réveille.',
    jung: 'Jung dirait que ce que nous refusons de vivre à l’intérieur, nous tentons de le régenter à l’extérieur. Le contrôle est une persona rassurante posée sur une part vulnérable (l’ombre) qu’on n’a pas appris à tenir. Faire la paix avec l’incertitude, c’est réintégrer cette part et retrouver sa force réelle — celle qui ne dépend pas des circonstances.',
    connect: 'Avant de « lâcher prise » (injonction souvent contre-productive), connecte-toi à ce que tu ressens quand tu ne contrôles pas. Où est la tension dans le corps ? Quelle peur murmure dessous ? On ne relâche pas en forçant : on relâche en rassurant la part qui a peur.',
    recognize: ['Je prépare des plans B (et C) « au cas où ».', 'Déléguer me stresse : je préfère tout faire moi-même.', 'L’incertitude me tient éveillé·e la nuit.', 'Je donne des conseils qu’on ne m’a pas demandés.', 'Quand je ne peux rien faire, je me sens vite impuissant·e.'],
    prompts: ['Quand je cherche à tout contrôler, quelle peur suis-je en train d’éviter de ressentir ?', 'Petit·e, dans quels moments ai-je appris que je devais me débrouiller seul·e ?', 'Quelle petite chose pourrais-je laisser être imparfaite ou incertaine cette semaine ?'],
    practice: 'Choisis UNE situation mineure et laisse-la se dérouler sans intervenir. Pendant ce temps, une main sur le ventre, dis-toi : « Je peux être en sécurité même sans tout maîtriser. » Observe la sensation, sans la corriger.',
  },
  perso: {
    intro: 'Prendre les choses personnellement, c’est lire le comportement des autres comme un verdict sur notre valeur. Cette lentille se forme tôt, quand l’amour reçu semblait conditionnel : on a appris à scruter les signes pour savoir si on était « assez ». Le cerveau est alors devenu expert à détecter le rejet… quitte à en inventer.',
    hides: 'Derrière « c’est contre moi » se cachent la peur du rejet et une blessure d’estime : au fond, une croyance douloureuse du type « je ne suis pas assez ». Prendre perso, c’est cette blessure qui s’active. Le plus souvent, l’autre agit depuis SON monde (sa fatigue, ses peurs, son histoire) — pas depuis un jugement sur toi.',
    jung: 'Jung parlerait de projection : nous prêtons aux autres des intentions qui viennent de notre propre paysage intérieur, de notre critique intérieur. Reprendre ces projections — « ceci parle peut-être plus de moi que de lui » — c’est cesser de donner aux autres le pouvoir de définir notre valeur.',
    connect: 'Quand la blessure s’active, avant de riposter ou de ruminer, sens-la. C’est souvent une vieille douleur d’enfant qui dit « on ne me voit pas ». Accueille-la comme tu accueillerais un enfant blessé, puis seulement, regarde les faits avec du recul.',
    recognize: ['Un silence me semble forcément dirigé contre moi.', 'Je rejoue les conversations en cherchant ce que j’ai « mal fait ».', 'Une critique sur un détail me fait douter de moi tout entier·ère.', 'Je devine les pensées des autres… en supposant le pire.', 'Le succès des autres me renvoie à mes manques.'],
    prompts: ['Quelle interprétation « c’est contre moi » ai-je eue récemment , et quelle blessure a-t-elle touchée ?', 'Quelles seraient 2 autres explications possibles, sans moi au centre ?', 'Que dirais-je à un enfant qui pense qu’il n’est « pas assez » ?'],
    practice: 'La prochaine fois qu’un comportement te blesse, pose-toi la main sur le cœur et demande : « Et si cela n’avait rien à voir avec moi ? » Écris la réponse la plus apaisante et la plus vraie possible.',
  },
  reactif: {
    intro: 'La réactivité n’est pas un défaut de volonté : c’est ton système nerveux qui passe en alerte avant même que le mental ait pu réfléchir. Face à un déclencheur, le corps réagit en une fraction de seconde (combattre, fuir, se figer). Chez les personnes sensibles ou marquées par un passé insécurisant, cette alarme est réglée très bas — elle se déclenche vite et fort.',
    hides: 'Sous la réaction vive se cache presque toujours une émotion plus vulnérable — peur, honte, tristesse, sentiment d’impuissance — que la réactivité recouvre à toute vitesse. On s’emporte pour ne pas s’effondrer ; on attaque pour ne pas sentir qu’on a été touché·e. La colère explosive est souvent une douleur qui n’a pas trouvé d’autres mots.',
    jung: 'Jung nommerait cela un complexe : un nœud émotionnel chargé, hérité du passé, qui « prend » la personne quand il est activé — on ne réagit plus à la situation présente, mais à toute une histoire. Devenir conscient de son complexe, c’est cesser d’être agi par lui.',
    connect: 'Le travail n’est pas de « se contrôler » par la force, mais de créer un petit espace entre le déclencheur et la réaction — assez pour sentir ce qui se passe vraiment dessous. Trois respirations lentes suffisent souvent à faire redescendre l’alarme et à retrouver le choix.',
    recognize: ['Je réponds du tac au tac, puis je regrette.', 'Mon corps s’emballe (cœur, chaleur, gorge) très vite.', 'Je passe de calme à submergé·e en quelques secondes.', 'Après coup, je me dis « j’ai réagi trop fort ».', 'Certaines phrases ou certains tons me font “sortir de mes gonds”.'],
    prompts: ['Quel est mon déclencheur le plus fréquent — et à quoi, plus ancien, me renvoie-t-il ?', 'Juste avant de réagir, quelle émotion plus fragile est là (peur, honte, tristesse) ?', 'Quels signaux mon corps m’envoie-t-il quelques secondes avant l’explosion ?'],
    practice: 'La technique STOP : au prochain déclencheur — Stoppe, prends 3 respirations lentes, Observe l’émotion vulnérable dessous, puis choisis ta réponse. Tu n’étouffes rien : tu écoutes d’abord, tu réponds ensuite.',
  },
  rejet: {
    intro: 'La peur du rejet touche un besoin humain fondamental : appartenir. Pour nos ancêtres, être exclu du groupe signifiait la mort — le cerveau traite donc le rejet social comme une véritable alarme de survie. Quand, enfant, l’amour a semblé fragile ou imprévisible, cette alarme reste hypersensible : le moindre signe d’éloignement la réveille.',
    hides: 'Derrière la peur du rejet se cache la croyance « je ne suis aimable que sous conditions », et souvent une blessure d’abandon. Pour ne pas revivre cette douleur, on s’adapte à l’excès, on s’efface, ou on part avant d’être quitté·e. Ce qu’on protège, c’est un cœur qui a eu peur de ne pas compter.',
    jung: 'Jung rappellerait que tant qu’on cherche la sécurité uniquement dehors (dans le regard de l’autre), on reste dépendant. Le chemin est de devenir pour soi la figure sécurisante qui a manqué — un parent intérieur fiable. C’est le début de l’individuation : ne plus se trahir pour être accepté·e.',
    connect: 'Quand la peur monte, ne cours pas la faire taire par une preuve d’amour extérieure. Assieds-toi avec elle. C’est souvent une part très jeune de toi qui pleure. Sa demande n’est pas « qu’on me rassure » mais « qu’on ne me quitte pas » — à commencer par toi.',
    recognize: ['Je m’adapte beaucoup pour ne pas déplaire.', 'Un changement de ton me fait craindre l’abandon.', 'Je teste parfois les autres pour vérifier qu’ils restent.', 'Je préfère partir avant qu’on me quitte.', 'Seul·e, je me sens vite en insécurité.'],
    prompts: ['Quand ai-je ressenti cette peur de ne pas compter pour la première fois ?', 'Comment est-ce que je m’abandonne moi-même pour ne pas être abandonné·e par les autres ?', 'Que dirais-je, avec tendresse, à l’enfant en moi qui a peur d’être laissé seul ?'],
    practice: 'Écris une phrase de sécurité et relis-la ce soir, main sur le cœur : « Même seul·e, je reste avec moi. Je ne me quitte pas. » Reviens-y chaque fois que la peur monte.',
  },
  perfection: {
    intro: 'Le perfectionnisme confond deux choses : la valeur (ce que je vaux en tant qu’être) et la performance (ce que je produis). Cette confusion s’installe quand l’amour ou la reconnaissance ont semblé liés aux résultats. On apprend alors : « je serai digne si je suis parfait·e ». L’exigence devient un bouclier — et une prison.',
    hides: 'Sous le perfectionnisme se cachent la peur de ne pas être aimable tel·le qu’on est, et souvent la honte. « Parfait » est la stratégie pour ne jamais s’exposer au rejet ou à la critique. Ce qu’on protège, c’est une estime fragile qui croit devoir se mériter en permanence.',
    jung: 'Jung y verrait une identification à la persona (l’image irréprochable) au détriment du Soi vivant, imparfait et entier. La vraie complétude, pour lui, n’est pas la perfection mais l’intégration de nos ombres, de nos failles. C’est le défaut assumé qui rend humain — et reliant.',
    connect: 'Avant de corriger l’imperfection, sens ce qu’elle réveille : cette petite panique, cette honte diffuse. Accueille-la. Puis rappelle-toi que « suffisamment bien » n’est pas un renoncement : c’est un acte d’amour envers soi.',
    recognize: ['« Assez bien » ne me suffit jamais.', 'Je repousse ou j’évite par peur de mal faire.', 'Je vois d’abord ce qui manque, pas ce qui est réussi.', 'Je me parle plus durement qu’à un ami.', 'Un compliment glisse ; une critique reste des jours.'],
    prompts: ['Qu’est-ce que la perfection est censée m’apporter — ou m’éviter de ressentir ?', 'Si je n’étais pas parfait·e, qu’est-ce que je craindrais qu’il arrive ?', 'Où pourrais-je m’autoriser un « suffisamment bien » cette semaine ?'],
    practice: 'Fais une tâche à 80 % volontairement, puis arrête-toi. Observe l’inconfort sans le corriger, respire, et note : le monde tient-il debout ? Suis-je toujours digne d’estime ?',
  },
  culpabilite: {
    intro: 'La culpabilité excessive vient souvent d’un rôle appris très tôt : celui de veiller sur les émotions des autres, parfois d’un parent. On devient l’enfant « responsable », celui qui apaise, qui s’efface. C’est généreux — mais cela installe une confusion durable entre « prendre soin » et « se rendre coupable de tout ».',
    hides: 'Sous la culpabilité se cachent la peur du conflit et de la désapprobation, et un besoin d’amour qui a appris à se mériter en portant les autres. Se sentir coupable donne l’illusion du contrôle (« si c’est ma faute, je peux réparer ») et évite la douleur plus nue de l’impuissance.',
    jung: 'Jung distinguerait la culpabilité névrotique (diffuse, héritée, qui ne répare rien) de la conscience morale authentique (précise, qui invite à un ajustement juste). Reprendre son ombre, ici, c’est s’autoriser à exister avec ses propres besoins sans se croire responsable de l’univers émotionnel d’autrui.',
    connect: 'Quand la culpabilité monte sans faute réelle, arrête-toi et sens : souvent, dessous, il y a de la peur (« on va m’en vouloir ») ou de la tristesse ancienne. Accueille-la. Puis sépare doucement : qu’est-ce qui m’appartient vraiment, qu’est-ce qui appartient à l’autre ?',
    recognize: ['Je m’excuse même quand je n’y suis pour rien.', 'Dire non me donne mauvaise conscience.', 'Je me sens coupable de me reposer ou de prendre du plaisir.', 'Je porte l’humeur des autres comme si c’était la mienne.', 'J’ai du mal à recevoir sans avoir « mérité ».'],
    prompts: ['De quoi est-ce que je me sens responsable, à tort ?', 'Quelle est la part qui m’appartient vraiment, et celle qui appartient à l’autre ?', 'Quel besoin à moi ai-je l’habitude de sacrifier pour éviter de culpabiliser ?'],
    practice: 'Aujourd’hui, dis un « non » doux, ou laisse une émotion à son propriétaire. Sens la culpabilité monter, respire, et laisse-la passer sans agir dessus. Note ce qui se passe — pour toi, et dans la relation.',
  },
  validation: {
    intro: 'Chercher la validation, c’est confier aux autres la clé de sa valeur. Ce réflexe se forme quand on a été aimé·e surtout pour ce qu’on faisait ou montrait, pas pour ce qu’on était. Le regard extérieur devient alors une nourriture nécessaire — mais qui ne rassasie jamais très longtemps.',
    hides: 'Derrière le besoin de validation se cachent un doute profond sur sa propre valeur et la peur du rejet. L’approbation vient anesthésier ce doute quelques instants. Ce qu’on protège, c’est un socle intérieur qui n’a pas encore été construit — parce que personne n’a appris à l’enfant qu’il valait, simplement, d’exister.',
    jung: 'Jung verrait une identification à la persona (le masque social qui plaît) coupée du Soi. L’individuation consiste à déplacer le centre de gravité : de « qu’est-ce qu’on pense de moi ? » vers « qu’est-ce qui est vrai pour moi ? ». La stabilité intérieure naît de cette bascule.',
    connect: 'Quand tu cherches un like, un compliment, un accord, arrête-toi une seconde : quelle sensation cherches-tu à apaiser ? Souvent, un vide, une insécurité. Accueille-la, puis offre-toi toi-même la reconnaissance que tu allais quémander.',
    recognize: ['Mon humeur dépend des retours que je reçois.', 'J’ai du mal à décider sans l’avis des autres.', 'Je minimise mes réussites tant qu’on ne les reconnaît pas.', 'Je cherche à plaire même à ceux qui comptent peu.', 'Le silence des autres, je le lis comme un désaveu.'],
    prompts: ['Dans quels moments est-ce que je m’abandonne pour être approuvé·e ?', 'De quoi suis-je fier·ère, indépendamment du regard des autres ?', 'Si personne ne devait jamais le savoir, que choisirais-je de faire ou d’être ?'],
    practice: 'Ce soir, note une chose que tu as bien faite — sans la montrer à personne. Relis-la à voix basse : « Ça compte, même si personne ne le voit. » Tu deviens ta propre source.',
  },
  evitement: {
    intro: 'Éviter ses émotions n’est pas de la lâcheté : c’est une stratégie de survie très intelligente. Ce qui n’a pas pu être ressenti en sécurité, enfant (parce que trop grand, ou parce que personne n’était là pour accueillir), a été mis de côté pour tenir debout. Le corps a appris à couper le contact. Le problème, c’est que les émotions non vécues ne disparaissent pas : elles attendent.',
    hides: 'Sous l’évitement se cache la peur d’être submergé·e — la croyance « si je sens vraiment, je vais m’effondrer et ne plus me relever ». Se distraire, s’occuper, « aller bien » trop vite, somatiser : autant de façons de ne pas toucher une douleur qu’on n’a jamais appris à traverser accompagné·e.',
    jung: 'Jung dirait que tout ce qu’on refuse de rendre conscient continue d’agir dans l’ombre et dirige notre vie « sous forme de destin ». Ce qu’on n’accueille pas nous gouverne à notre insu — fatigue, tensions, réactions inexpliquées. Sentir, un peu à la fois, c’est reprendre les rênes.',
    connect: 'Ici, tout le travail EST la connexion. Pas besoin d’analyser : il s’agit d’oser sentir, par petites doses, dans un cadre sûr. Une émotion accueillie 90 secondes, sans histoire ajoutée, monte puis redescend. Tu es plus grand·e que ce que tu ressens.',
    recognize: ['Je me remplis d’activités pour ne pas ressentir.', 'Je « vais bien » un peu trop automatiquement.', 'Je somatise (tensions, fatigue, ventre) sans savoir pourquoi.', 'Je fuis les conversations émotionnelles.', 'Je ne sais pas toujours nommer ce que je ressens.'],
    prompts: ['Quelle émotion est-ce que j’évite le plus en ce moment ?', 'Enfant, qu’apprenais-je à faire de mes émotions ? Qui était là pour les accueillir ?', 'Où cette émotion est-elle logée dans mon corps, si je m’arrête un instant ?'],
    practice: 'Assieds-toi 2 minutes, une main sur la poitrine. Nomme ce qui est là : « Je remarque… ». Ne fais rien d’autre que l’accompagner, comme une vague. Rien à réparer — juste sentir, et rester.',
  },
};

/* ------------------------------------------------------------
   Parcours guidé
   ------------------------------------------------------------ */
window.STEPS = [
  { id: 'welcome',  title: 'Bienvenue 🌿', desc: 'Prends 1 minute pour poser ton intention. Cet espace est à toi, à ton rythme.', cta: 'Poser mon objectif', act: (h) => h.editObjective(), done: (h) => !!h.config.objective },
  { id: 'bilan',    title: 'Faire mon premier bilan', desc: '~5 min. Un point de départ tout doux pour voir où tu en es — sans bonne ni mauvaise note.', cta: 'Commencer le bilan', act: (h) => h.go('bilan'), done: (h) => h.hasEntry('bilan') },
  { id: 'checkin',  title: 'Mon premier check-in', desc: 'Nommer une émotion présente, et comprendre son rôle. Nommer, c’est déjà apaiser.', cta: 'Faire un check-in', act: (h) => h.go('checkin'), done: (h) => h.hasEntry('checkin') },
  { id: 'atelier',  title: 'Explorer mon thème principal', desc: 'Un atelier guidé et approfondi sur le thème qui ressort le plus de ton bilan.', cta: 'Ouvrir l’atelier', act: (h) => h.go('atelier:' + (h.topTheme() || 'controle')), done: (h) => h.hasEntry('atelier') },
  { id: 'regulation', title: 'Une pause respiration', desc: '3 minutes de cohérence cardiaque pour apaiser le système nerveux.', cta: 'Respirer', act: (h) => h.go('regulation'), done: (h) => h.hasEntry('regulation') },
  { id: 'futureself', title: 'Choisir un pattern à transformer', desc: 'Un seul pattern pour le mois, avec tes affirmations et tes prompts du jour.', cta: 'Ouvrir le journal', act: (h) => h.go('futureself'), done: (h) => !!h.config.fsPattern },
  { id: 'patterns', title: 'Observer mes premiers liens', desc: 'Découvre les patterns qui relient tes exercices entre eux.', cta: 'Voir mes patterns', act: (h) => h.go('patterns'), done: (h) => h.entries.length >= 4 },
];
