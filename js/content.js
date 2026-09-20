/* ============================================================
   Contenu de l'app — thèmes, émotions, bilan, ateliers, ombre, parcours
   Profondeur : psychologie + regard jungien, esprit Dr. Nicole LePera
   (« on se connecte à l'émotion avant de la travailler »).
   Ton : doux, sûr, non culpabilisant. On avance main dans la main.
   ============================================================ */
'use strict';

/* ------------------------------------------------------------
   Principe fondateur
   ------------------------------------------------------------ */
window.CONNECT = {
  title: 'Se connecter avant de transformer',
  body: 'Avant de vouloir changer quoi que ce soit, on cherche d’abord à SENTIR. '
      + 'Une émotion n’est pas un problème à résoudre : c’est un messager. Niée, elle insiste et ressort ailleurs (dans le corps, dans nos réactions). Accueillie, elle se dépose et se transforme d’elle-même.\n\n'
      + 'Comme le rappelle Dr. Nicole LePera, le travail ne commence pas par « corriger » : il commence par revenir dans le corps, poser une main sur soi, et laisser l’émotion exister quelques instants sans la juger. Ensuite seulement, une fois qu’on l’a écoutée, on peut choisir une réponse nouvelle.',
};

/* ------------------------------------------------------------
   Le temps de pause (Viktor Frankl) — principe transversal
   ------------------------------------------------------------ */
window.PAUSE = {
  title: 'Le temps de pause',
  body: 'Dès que quelque chose se déclenche dans ton corps (chaleur, gorge serrée, cœur qui accélère, envie de fuir), c’est LE signal : marque une pause avant de réagir. Reviens au corps, prends 3 respirations lentes, puis regarde la situation autrement.\n\n'
      + 'Comme l’écrivait Viktor Frankl : « Entre le stimulus et la réponse, il y a un espace. Dans cet espace se trouve notre pouvoir de choisir notre réponse — et dans ce choix, notre liberté. »\n\n'
      + 'Ce petit temps change tout : il transforme une réaction automatique (l’ancien réflexe de protection) en une réponse consciente, alignée avec qui tu veux être.',
};

/* ------------------------------------------------------------
   Méthode structurée pour décoder une situation
   Reconnaître → Nommer → Comprendre → Transmuter → La prochaine fois
   ------------------------------------------------------------ */
window.SITU_FIELDS = [
  { k: 'situation', label: 'Reconnaître — la situation', hint: 'Décris factuellement ce qui s’est passé (qui, quoi, où, quand), sans interprétation ni jugement. Juste les faits.' },
  { k: 'feeling',   label: 'Nommer — l’émotion et le corps', hint: 'Quelle(s) émotion(s) exactement ? Où le sens-tu dans ton corps (gorge, poitrine, ventre, mâchoire) ? Nommer précisément apaise déjà.' },
  { k: 'understand', label: 'Comprendre — ce qui s’est activé', hint: 'Quelle histoire ou croyance s’est allumée ? Quelle blessure ancienne cela touche-t-il ? Qu’est-ce que ta réaction cherchait à protéger ?' },
  { k: 'transmute', label: 'Transmuter — la vérité plus douce', hint: 'Quelle vérité plus juste et bienveillante peux-tu te redire ? Quel était ton besoin réel, sous l’émotion ?' },
  { k: 'next',      label: 'La prochaine fois — comment je réagirai', hint: 'Quand cette situation se représentera, comment aimerais-tu répondre ? Quel premier petit geste (pause, respiration, phrase intérieure) t’y aiderait ?' },
];

/* ------------------------------------------------------------
   Le rôle des émotions (psychologie + Jung), par famille
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
    role: 'Surprise, confusion, curiosité, fatigue, neutralité : des états de transition. La confusion précède souvent une réorganisation intérieure — inconfortable mais fécond. La fatigue est un besoin (repos, retrait). Le neutre a le droit d’exister : tout n’a pas à être intense.',
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
   Bilan — QCM approfondi (4 items par thème = 32)
   Mêle auto-évaluation, situations imaginaires et croyances centrales.
   ------------------------------------------------------------ */
window.BILAN_SCALE = ['Jamais', 'Rarement', 'Parfois', 'Souvent', 'Presque toujours']; // 0..4
window.BILAN = [
  // --- Contrôle ---
  { theme: 'controle', text: 'Quand une situation m’échappe, je ressens une tension forte.' },
  { theme: 'controle', text: 'Un plan change à la dernière minute : cela me contrarie beaucoup.', scenario: true },
  { theme: 'controle', text: 'Déléguer ou faire confiance à quelqu’un d’autre me met mal à l’aise.' },
  { theme: 'controle', text: 'Au fond, je crois que si je relâche la maîtrise, tout risque de s’effondrer.', belief: true },
  // --- Prendre perso ---
  { theme: 'perso', text: 'Quand quelqu’un est distant, je pense d’abord que c’est à cause de moi.' },
  { theme: 'perso', text: 'Un ami ne répond pas pendant deux jours : je me demande ce que j’ai fait de mal.', scenario: true },
  { theme: 'perso', text: 'Une critique sur un détail me fait douter de moi tout entier·ère.' },
  { theme: 'perso', text: 'Si quelqu’un va mal près de moi, j’y vois une preuve que je ne suis pas assez.', belief: true },
  // --- Réactivité ---
  { theme: 'reactif', text: 'Je réagis (mots, gestes, ton) plus vite que je ne le voudrais.' },
  { theme: 'reactif', text: 'On me fait une remarque en public : la colère ou les larmes montent aussitôt.', scenario: true },
  { theme: 'reactif', text: 'Quand on me comprend de travers, je le vis comme une remise en question de ce que je vaux.', belief: true },
  { theme: 'reactif', text: 'Après une réaction vive, je réalise qu’une émotion plus fragile se cachait dessous.' },
  // --- Rejet ---
  { theme: 'rejet', text: 'J’ai peur qu’on finisse par me laisser tomber.' },
  { theme: 'rejet', text: 'Un proche annule un rendez-vous : je crains qu’il s’éloigne de moi.', scenario: true },
  { theme: 'rejet', text: 'Je m’adapte beaucoup, quitte à m’oublier, pour ne pas déplaire.' },
  { theme: 'rejet', text: 'Je crois que je ne suis aimable que si je me rends utile ou irréprochable.', belief: true },
  // --- Perfectionnisme ---
  { theme: 'perfection', text: 'Je me juge sévèrement quand je ne fais pas les choses parfaitement.' },
  { theme: 'perfection', text: 'Un travail correct mais imparfait : je n’arrive pas à en être fier·ère.', scenario: true },
  { theme: 'perfection', text: 'Je remets à plus tard ou j’évite, par peur de mal faire.' },
  { theme: 'perfection', text: 'Au fond, je crois que ma valeur dépend de mes résultats.', belief: true },
  // --- Culpabilité ---
  { theme: 'culpabilite', text: 'Je me sens coupable même quand ce n’est pas ma responsabilité.' },
  { theme: 'culpabilite', text: 'Un proche est de mauvaise humeur : je me sens chargé·e de le réconforter.', scenario: true },
  { theme: 'culpabilite', text: 'Dire non ou me reposer me donne mauvaise conscience.' },
  { theme: 'culpabilite', text: 'Je crois que je suis responsable du bien-être émotionnel des autres.', belief: true },
  // --- Validation ---
  { theme: 'validation', text: 'J’ai besoin de l’approbation des autres pour me sentir bien.' },
  { theme: 'validation', text: 'Je poste quelque chose et personne ne réagit : ma valeur en prend un coup.', scenario: true },
  { theme: 'validation', text: 'J’ai du mal à décider sans connaître l’avis des autres.' },
  { theme: 'validation', text: 'Au fond, je crois que je vaux ce que les autres pensent de moi.', belief: true },
  // --- Évitement ---
  { theme: 'evitement', text: 'Quand une émotion difficile arrive, je me distrais pour ne pas la sentir.' },
  { theme: 'evitement', text: 'Une conversation devient émotionnelle : j’ai envie de fuir ou de changer de sujet.', scenario: true },
  { theme: 'evitement', text: 'J’ai du mal à nommer ce que je ressens vraiment.' },
  { theme: 'evitement', text: 'Je crois que si je laisse venir mes émotions, elles vont m’engloutir.', belief: true },
];

/* ------------------------------------------------------------
   Ateliers thématiques (guidés + profonds)
     intro   — comprendre (origine développementale)
     hides   — ce que le pattern protège / camoufle
     belief  — la croyance centrale qui l'alimente
     cycle   — le cercle vicieux qui l'entretient
     jung    — le regard de Jung
     connect — se connecter à l'émotion avant de transformer (LePera)
     reframe — la vérité plus douce (nouvelle croyance réparatrice)
     recognize[] · prompts[] · practice
   ------------------------------------------------------------ */
window.ATELIERS = {
  controle: {
    intro: 'Le besoin de contrôle est rarement un trait de caractère : c’est une stratégie apprise. Quand, enfant, l’environnement était imprévisible ou peu sécurisant, tout anticiper devenait une façon de survivre. Le corps a retenu : « si je maîtrise, je suis en sécurité ». Aujourd’hui encore, ce réflexe cherche à te protéger — mais il épuise, car la vie reste incertaine.',
    hides: 'Sous le contrôle se cache presque toujours de l’anxiété, et souvent une peur plus ancienne : celle du chaos, de l’abandon, ou de ne pas être à la hauteur. Contrôler l’extérieur est une manière de ne pas sentir cette peur intérieure. Ce n’est pas le désordre qu’on fuit : c’est la sensation d’impuissance qu’il réveille.',
    belief: 'Si je baisse la garde, tout va s’effondrer — et ce sera de ma faute.',
    cycle: 'Je contrôle → je suis tendu·e et épuisé·e → au premier imprévu, l’angoisse explose → j’en conclus qu’il fallait contrôler encore plus. La boucle se resserre.',
    jung: 'Jung dirait que ce que nous refusons de vivre à l’intérieur, nous tentons de le régenter à l’extérieur. Le contrôle est une persona rassurante posée sur une part vulnérable (l’ombre) qu’on n’a pas appris à tenir. Faire la paix avec l’incertitude, c’est réintégrer cette part et retrouver sa force réelle.',
    connect: 'Avant de « lâcher prise » (injonction souvent contre-productive), connecte-toi à ce que tu ressens quand tu ne contrôles pas. Où est la tension dans le corps ? Quelle peur murmure dessous ? On ne relâche pas en forçant : on relâche en rassurant la part qui a peur.',
    reframe: 'Je peux rester présent·e et capable même dans l’incertitude. Ma sécurité vient de ma capacité à me faire face — pas de la maîtrise de tout le dehors.',
    wound: 'Proche, chez Lise Bourbeau, des blessures d’injustice et de trahison : l’enfant qui n’a pas pu s’appuyer sur un cadre fiable apprend à tout tenir lui-même. Ces repères éclairent, ils n’enferment pas.',
    converge: 'La théorie polyvagale (Stephen Porges) montre que le contrôle est souvent un système nerveux en hypervigilance. Jon Kabat-Zinn (pleine conscience) et Viktor Frankl rappellent que la vraie liberté naît dans l’espace entre ce qui arrive et notre réponse.',
    recognize: ['Je prépare des plans B (et C) « au cas où ».', 'Déléguer me stresse : je préfère tout faire moi-même.', 'L’incertitude me tient éveillé·e la nuit.', 'Je donne des conseils qu’on ne m’a pas demandés.', 'Quand je ne peux rien faire, je me sens vite impuissant·e.'],
    prompts: ['Quand je cherche à tout contrôler, quelle peur suis-je en train d’éviter de ressentir ?', 'Petit·e, dans quels moments ai-je appris que je devais me débrouiller seul·e ?', 'Quelle petite chose pourrais-je laisser être imparfaite ou incertaine cette semaine ?'],
    practice: 'Choisis UNE situation mineure et laisse-la se dérouler sans intervenir. Une main sur le ventre, dis-toi : « Je peux être en sécurité même sans tout maîtriser. » Observe la sensation, sans la corriger.',
  },
  perso: {
    intro: 'Prendre les choses personnellement, c’est lire le comportement des autres comme un verdict sur notre valeur. Cette lentille se forme tôt, quand l’amour reçu semblait conditionnel : on a appris à scruter les signes pour savoir si on était « assez ». Le cerveau est alors devenu expert à détecter le rejet… quitte à en inventer.',
    hides: 'Derrière « c’est contre moi » se cachent la peur du rejet et une blessure d’estime : au fond, une croyance douloureuse du type « je ne suis pas assez ». Prendre perso, c’est cette blessure qui s’active. Le plus souvent, l’autre agit depuis SON monde — pas depuis un jugement sur toi.',
    belief: 'Si quelqu’un s’éloigne ou va mal, c’est la preuve que je ne suis pas assez.',
    cycle: 'Je me sens visé·e → je rumine ou je me justifie → je deviens hypersensible aux signes → j’en trouve partout → ma blessure se confirme.',
    jung: 'Jung parlerait de projection : nous prêtons aux autres des intentions qui viennent de notre propre critique intérieur. Reprendre ces projections — « ceci parle peut-être plus de moi que de lui » — c’est cesser de donner aux autres le pouvoir de définir notre valeur.',
    connect: 'Quand la blessure s’active, avant de riposter ou de ruminer, sens-la. C’est souvent une vieille douleur d’enfant qui dit « on ne me voit pas ». Accueille-la comme tu accueillerais un enfant blessé, puis regarde les faits avec du recul.',
    reframe: 'Le comportement des autres parle surtout d’eux. Ma valeur ne se remet pas aux voix à chaque interaction.',
    wound: 'Renvoie souvent aux blessures de rejet et d’injustice (Lise Bourbeau) : l’enfant a appris à se scruter pour savoir s’il était “assez”.',
    converge: 'La thérapie cognitive (Aaron Beck) nomme cela la personnalisation, une distorsion de pensée. La Communication NonViolente (Marshall Rosenberg) distingue le fait observable de l’interprétation. Brené Brown parle des « histoires qu’on se raconte » et invite à les vérifier.',
    recognize: ['Un silence me semble forcément dirigé contre moi.', 'Je rejoue les conversations en cherchant ce que j’ai « mal fait ».', 'Une critique sur un détail me fait douter de moi entier·ère.', 'Je devine les pensées des autres… en supposant le pire.', 'Le succès des autres me renvoie à mes manques.'],
    prompts: ['Quelle interprétation « c’est contre moi » ai-je eue récemment, et quelle blessure a-t-elle touchée ?', 'Quelles seraient 2 autres explications possibles, sans moi au centre ?', 'Que dirais-je à un enfant qui pense qu’il n’est « pas assez » ?'],
    practice: 'À la prochaine blessure, main sur le cœur, demande : « Et si cela n’avait rien à voir avec moi ? » Écris la réponse la plus vraie et la plus apaisante possible.',
  },
  reactif: {
    intro: 'La réactivité n’est pas un défaut de volonté : c’est ton système nerveux qui passe en alerte avant même que le mental ait pu réfléchir. Face à un déclencheur, le corps réagit en une fraction de seconde (combattre, fuir, se figer). Chez les personnes sensibles ou marquées par un passé insécurisant, cette alarme est réglée très bas — elle se déclenche vite et fort.',
    hides: 'Sous la réaction vive se cache presque toujours une émotion plus vulnérable — peur, honte, tristesse, sentiment d’impuissance — que la réactivité recouvre à toute vitesse. On s’emporte pour ne pas s’effondrer ; on attaque pour ne pas sentir qu’on a été touché·e. Très souvent, une incompréhension est vécue comme une attaque contre nos valeurs ou notre valeur — et le corps se défend comme d’un danger réel.',
    belief: 'Être mal compris·e ou contredit·e, c’est une atteinte à ce que je vaux : je dois me défendre tout de suite.',
    cycle: 'Déclencheur → alarme corporelle → réaction immédiate → conséquences → honte → hypervigilance → l’alarme se règle encore plus bas.',
    jung: 'Jung nommerait cela un complexe : un nœud émotionnel chargé, hérité du passé, qui « prend » la personne quand il est activé — on ne réagit plus à la situation présente, mais à toute une histoire. Devenir conscient de son complexe, c’est cesser d’être agi par lui.',
    connect: 'Le travail n’est pas de « se contrôler » par la force, mais de créer un petit espace entre le déclencheur et la réaction — assez pour sentir ce qui se passe vraiment dessous. Trois respirations lentes suffisent souvent à faire redescendre l’alarme et à retrouver le choix.',
    reframe: 'Une incompréhension n’est pas un verdict sur moi. Je peux sentir la vague, respirer, et répondre depuis mes valeurs plutôt que depuis l’alarme.',
    wound: 'La réactivité n’est pas une blessure en soi, mais l’alarme qui se déclenche quand une blessure (trahison, injustice, rejet) est touchée. Pete Walker décrit les réponses 4F : lutte, fuite, figement, soumission (fawn).',
    converge: 'Viktor Frankl : « Entre le stimulus et la réponse, il y a un espace ; là se trouve notre pouvoir de choisir. » Dan Siegel : “name it to tame it” — nommer l’émotion calme le cerveau. Stephen Porges : rester dans sa fenêtre de tolérance plutôt que déborder.',
    recognize: ['Je réponds du tac au tac, puis je regrette.', 'Mon corps s’emballe (cœur, chaleur, gorge) très vite.', 'Je passe de calme à submergé·e en quelques secondes.', 'Une incompréhension me donne l’impression qu’on remet en cause ma valeur.', 'Certaines phrases ou certains tons me font “sortir de mes gonds”.'],
    prompts: ['Quel est mon déclencheur le plus fréquent — et à quoi, plus ancien, me renvoie-t-il ?', 'Juste avant de réagir, quelle émotion plus fragile est là (peur, honte, tristesse) ?', 'Quelle valeur profonde ai-je l’impression qu’on attaque, dans ces moments ?'],
    practice: 'La technique STOP : au prochain déclencheur — Stoppe, prends 3 respirations lentes, Observe l’émotion vulnérable dessous, puis choisis ta réponse. Tu n’étouffes rien : tu écoutes d’abord, tu réponds ensuite.',
  },
  rejet: {
    intro: 'La peur du rejet touche un besoin humain fondamental : appartenir. Pour nos ancêtres, être exclu du groupe signifiait la mort — le cerveau traite donc le rejet social comme une véritable alarme de survie. Quand, enfant, l’amour a semblé fragile ou imprévisible, cette alarme reste hypersensible : le moindre signe d’éloignement la réveille.',
    hides: 'Derrière la peur du rejet se cache la croyance « je ne suis aimable que sous conditions », et souvent une blessure d’abandon. Pour ne pas revivre cette douleur, on s’adapte à l’excès, on s’efface, ou on part avant d’être quitté·e. Ce qu’on protège, c’est un cœur qui a eu peur de ne pas compter.',
    belief: 'Je ne suis aimable que si je me rends indispensable ou irréprochable — sinon on partira.',
    cycle: 'Peur de l’abandon → je m’adapte / je m’efface / je teste → je m’épuise ou j’étouffe l’autre → la relation se tend → ma peur semble justifiée.',
    jung: 'Jung rappellerait que tant qu’on cherche la sécurité uniquement dehors (dans le regard de l’autre), on reste dépendant. Le chemin est de devenir pour soi la figure sécurisante qui a manqué — un parent intérieur fiable. C’est le début de l’individuation : ne plus se trahir pour être accepté·e.',
    connect: 'Quand la peur monte, ne cours pas la faire taire par une preuve d’amour extérieure. Assieds-toi avec elle. C’est souvent une part très jeune de toi qui pleure. Sa demande n’est pas « qu’on me rassure » mais « qu’on ne me quitte pas » — à commencer par toi.',
    reframe: 'Je mérite d’être aimé·e tel·le que je suis. Rester fidèle à moi n’éloigne pas les bonnes personnes — cela les rapproche.',
    wound: 'Cœur des blessures de rejet et d’abandon (Lise Bourbeau) : le besoin d’appartenance a été fragilisé tôt, et l’alarme reste sensible.',
    converge: 'La théorie de l’attachement (John Bowlby, Mary Ainsworth) éclaire ces schémas relationnels. Gabor Maté montre le conflit entre authenticité et attachement — enfant, on s’efface pour rester relié. Peter Levine relie l’insécurité aux mémoires du corps.',
    recognize: ['Je m’adapte beaucoup pour ne pas déplaire.', 'Un changement de ton me fait craindre l’abandon.', 'Je teste parfois les autres pour vérifier qu’ils restent.', 'Je préfère partir avant qu’on me quitte.', 'Seul·e, je me sens vite en insécurité.'],
    prompts: ['Quand ai-je ressenti cette peur de ne pas compter pour la première fois ?', 'Comment est-ce que je m’abandonne moi-même pour ne pas être abandonné·e par les autres ?', 'Que dirais-je, avec tendresse, à l’enfant en moi qui a peur d’être laissé seul ?'],
    practice: 'Écris une phrase de sécurité et relis-la ce soir, main sur le cœur : « Même seul·e, je reste avec moi. Je ne me quitte pas. » Reviens-y chaque fois que la peur monte.',
  },
  perfection: {
    intro: 'Le perfectionnisme confond deux choses : la valeur (ce que je vaux en tant qu’être) et la performance (ce que je produis). Cette confusion s’installe quand l’amour ou la reconnaissance ont semblé liés aux résultats. On apprend alors : « je serai digne si je suis parfait·e ». L’exigence devient un bouclier — et une prison.',
    hides: 'Sous le perfectionnisme se cachent la peur de ne pas être aimable tel·le qu’on est, et souvent la honte. « Parfait » est la stratégie pour ne jamais s’exposer au rejet ou à la critique. Ce qu’on protège, c’est une estime fragile qui croit devoir se mériter en permanence.',
    belief: 'Ma valeur = mes résultats. Une imperfection me rend indigne.',
    cycle: 'Standard impossible → je procrastine ou je m’épuise → le résultat n’est jamais assez → autocritique → le standard monte encore.',
    jung: 'Jung y verrait une identification à la persona (l’image irréprochable) au détriment du Soi vivant, imparfait et entier. La vraie complétude, pour lui, n’est pas la perfection mais l’intégration de nos ombres et de nos failles. C’est le défaut assumé qui rend humain — et reliant.',
    connect: 'Avant de corriger l’imperfection, sens ce qu’elle réveille : cette petite panique, cette honte diffuse. Accueille-la. Puis rappelle-toi que « suffisamment bien » n’est pas un renoncement : c’est un acte d’amour envers soi.',
    reframe: 'Je vaux indépendamment de mes performances. « Suffisamment bien » fait avancer ; la perfection paralyse.',
    wound: 'Proche des blessures d’injustice (le “rigide”, exigeant) et d’humiliation (Lise Bourbeau) : la valeur a semblé devoir se mériter.',
    converge: 'Kristin Neff : l’auto-compassion répare mieux et plus durablement que l’autocritique. Aaron Beck : la pensée « tout ou rien ». Donald Winnicott : le parent « suffisamment bon » (good enough) — imparfait, et c’est justement cela qui sécurise l’enfant.',
    recognize: ['« Assez bien » ne me suffit jamais.', 'Je repousse ou j’évite par peur de mal faire.', 'Je vois d’abord ce qui manque, pas ce qui est réussi.', 'Je me parle plus durement qu’à un ami.', 'Un compliment glisse ; une critique reste des jours.'],
    prompts: ['Qu’est-ce que la perfection est censée m’apporter — ou m’éviter de ressentir ?', 'Si je n’étais pas parfait·e, qu’est-ce que je craindrais qu’il arrive ?', 'Où pourrais-je m’autoriser un « suffisamment bien » cette semaine ?'],
    practice: 'Fais une tâche à 80 % volontairement, puis arrête-toi. Observe l’inconfort sans le corriger, respire, et note : le monde tient-il debout ? Suis-je toujours digne d’estime ?',
  },
  culpabilite: {
    intro: 'La culpabilité excessive vient souvent d’un rôle appris très tôt : celui de veiller sur les émotions des autres, parfois d’un parent. On devient l’enfant « responsable », celui qui apaise, qui s’efface. C’est généreux — mais cela installe une confusion durable entre « prendre soin » et « se rendre coupable de tout ».',
    hides: 'Sous la culpabilité se cachent la peur du conflit et de la désapprobation, et un besoin d’amour qui a appris à se mériter en portant les autres. Se sentir coupable donne l’illusion du contrôle (« si c’est ma faute, je peux réparer ») et évite la douleur plus nue de l’impuissance.',
    belief: 'Je suis responsable du bien-être des autres. Si je me choisis, je fais du mal.',
    cycle: 'Je me sur-responsabilise → je m’oublie → j’accumule fatigue et ressentiment → je culpabilise de ce ressentiment → je m’oublie encore plus.',
    jung: 'Jung distinguerait la culpabilité névrotique (diffuse, héritée, qui ne répare rien) de la conscience morale authentique (précise, qui invite à un ajustement juste). Reprendre son ombre, ici, c’est s’autoriser à exister avec ses propres besoins sans se croire responsable de l’univers émotionnel d’autrui.',
    connect: 'Quand la culpabilité monte sans faute réelle, arrête-toi et sens : souvent, dessous, il y a de la peur (« on va m’en vouloir ») ou une tristesse ancienne. Accueille-la. Puis sépare doucement : qu’est-ce qui m’appartient, qu’est-ce qui appartient à l’autre ?',
    reframe: 'Je peux prendre soin des autres sans me sacrifier. Chacun est responsable de ses propres émotions.',
    wound: 'Renvoie aux blessures d’humiliation (le “masochiste”, qui se dévoue et s’oublie) et d’abandon (Lise Bourbeau).',
    converge: 'Pete Walker décrit la réponse “fawn” : se soumettre et faire plaisir pour survivre. Marshall Rosenberg (CNV) réapprend à distinguer ses besoins de ceux des autres. Kristin Neff invite à s’inclure soi-même dans sa propre bienveillance.',
    recognize: ['Je m’excuse même quand je n’y suis pour rien.', 'Dire non me donne mauvaise conscience.', 'Je me sens coupable de me reposer ou de prendre du plaisir.', 'Je porte l’humeur des autres comme si c’était la mienne.', 'J’ai du mal à recevoir sans avoir « mérité ».'],
    prompts: ['De quoi est-ce que je me sens responsable, à tort ?', 'Quelle est la part qui m’appartient vraiment, et celle qui appartient à l’autre ?', 'Quel besoin à moi ai-je l’habitude de sacrifier pour éviter de culpabiliser ?'],
    practice: 'Aujourd’hui, dis un « non » doux, ou laisse une émotion à son propriétaire. Sens la culpabilité monter, respire, laisse-la passer sans agir dessus. Note ce qui se passe — pour toi, et dans la relation.',
  },
  validation: {
    intro: 'Chercher la validation, c’est confier aux autres la clé de sa valeur. Ce réflexe se forme quand on a été aimé·e surtout pour ce qu’on faisait ou montrait, pas pour ce qu’on était. Le regard extérieur devient alors une nourriture nécessaire — mais qui ne rassasie jamais très longtemps.',
    hides: 'Derrière le besoin de validation se cachent un doute profond sur sa propre valeur et la peur du rejet. L’approbation vient anesthésier ce doute quelques instants. Ce qu’on protège, c’est un socle intérieur qui n’a pas encore été construit — parce que personne n’a appris à l’enfant qu’il valait, simplement, d’exister.',
    belief: 'Je vaux ce que les autres pensent de moi.',
    cycle: 'Doute intérieur → je cherche l’approbation → soulagement bref → le doute revient → il me faut une dose plus grande.',
    jung: 'Jung verrait une identification à la persona (le masque social qui plaît) coupée du Soi. L’individuation consiste à déplacer le centre de gravité : de « qu’est-ce qu’on pense de moi ? » vers « qu’est-ce qui est vrai pour moi ? ». La stabilité intérieure naît de cette bascule.',
    connect: 'Quand tu cherches un like, un compliment, un accord, arrête-toi une seconde : quelle sensation cherches-tu à apaiser ? Souvent, un vide, une insécurité. Accueille-la, puis offre-toi la reconnaissance que tu allais quémander.',
    reframe: 'Je peux être ma propre source de reconnaissance. L’avis des autres est une information, pas un verdict sur ma valeur.',
    wound: 'Proche des blessures de rejet et d’abandon (Lise Bourbeau) : l’amour a semblé conditionnel à ce qu’on montrait ou réussissait.',
    converge: 'Carl Rogers : nous avons besoin d’un regard positif inconditionnel — qu’on peut apprendre à s’offrir. Deci & Ryan (autodétermination) : la motivation intérieure rend plus stable que l’approbation. Jung : sortir de la persona (le masque) vers le Soi.',
    recognize: ['Mon humeur dépend des retours que je reçois.', 'J’ai du mal à décider sans l’avis des autres.', 'Je minimise mes réussites tant qu’on ne les reconnaît pas.', 'Je cherche à plaire même à ceux qui comptent peu.', 'Le silence des autres, je le lis comme un désaveu.'],
    prompts: ['Dans quels moments est-ce que je m’abandonne pour être approuvé·e ?', 'De quoi suis-je fier·ère, indépendamment du regard des autres ?', 'Si personne ne devait jamais le savoir, que choisirais-je de faire ou d’être ?'],
    practice: 'Ce soir, note une chose que tu as bien faite — sans la montrer à personne. Relis-la à voix basse : « Ça compte, même si personne ne le voit. » Tu deviens ta propre source.',
  },
  evitement: {
    intro: 'Éviter ses émotions n’est pas de la lâcheté : c’est une stratégie de survie très intelligente. Ce qui n’a pas pu être ressenti en sécurité, enfant (parce que trop grand, ou parce que personne n’était là pour accueillir), a été mis de côté pour tenir debout. Le corps a appris à couper le contact. Le problème, c’est que les émotions non vécues ne disparaissent pas : elles attendent.',
    hides: 'Sous l’évitement se cache la peur d’être submergé·e — la croyance « si je sens vraiment, je vais m’effondrer et ne plus me relever ». Se distraire, s’occuper, « aller bien » trop vite, somatiser : autant de façons de ne pas toucher une douleur qu’on n’a jamais appris à traverser accompagné·e.',
    belief: 'Si je laisse venir mes émotions, elles vont m’engloutir et je ne m’en remettrai pas.',
    cycle: 'Émotion → je me coupe / je me distrais → soulagement court → l’émotion s’accumule (corps, tensions) → elle ressort plus fort → je me coupe davantage.',
    jung: 'Jung dirait que tout ce qu’on refuse de rendre conscient continue d’agir dans l’ombre et dirige notre vie « sous forme de destin ». Ce qu’on n’accueille pas nous gouverne à notre insu — fatigue, tensions, réactions inexpliquées. Sentir, un peu à la fois, c’est reprendre les rênes.',
    connect: 'Ici, tout le travail EST la connexion. Pas besoin d’analyser : oser sentir, par petites doses, dans un cadre sûr. Une émotion accueillie 90 secondes, sans histoire ajoutée, monte puis redescend. Tu es plus vaste que ce que tu ressens.',
    reframe: 'Je suis plus grand·e que ce que je ressens. Une émotion accueillie monte, culmine, puis passe — je peux la traverser.',
    wound: 'Souvent lié aux blessures de rejet et d’abandon (Lise Bourbeau) et à un système nerveux en figement (freeze).',
    converge: 'Bessel van der Kolk : « le corps n’oublie rien » (The Body Keeps the Score). Peter Levine (Somatic Experiencing) : traverser l’émotion par petites doses. Tara Brach : la méthode RAIN — Reconnaître, Accepter, Investiguer, Nourrir. James Gross : réguler plutôt que supprimer.',
    recognize: ['Je me remplis d’activités pour ne pas ressentir.', 'Je « vais bien » un peu trop automatiquement.', 'Je somatise (tensions, fatigue, ventre) sans savoir pourquoi.', 'Je fuis les conversations émotionnelles.', 'Je ne sais pas toujours nommer ce que je ressens.'],
    prompts: ['Quelle émotion est-ce que j’évite le plus en ce moment ?', 'Enfant, qu’apprenais-je à faire de mes émotions ? Qui était là pour les accueillir ?', 'Où cette émotion est-elle logée dans mon corps, si je m’arrête un instant ?'],
    practice: 'Assieds-toi 2 minutes, une main sur la poitrine. Nomme ce qui est là : « Je remarque… ». Accompagne-le comme une vague, rien à réparer. Juste sentir, et rester.',
  },
};

/* ------------------------------------------------------------
   Travail de l'ombre (Jung) — exercice guidé en 5 temps
   ------------------------------------------------------------ */
window.SHADOW = {
  intro: 'L’ombre, chez Jung, rassemble tout ce que nous avons appris à cacher ou à renier pour être accepté·e : colère, égoïsme, vulnérabilité, désir, ambition… Ces parts ne disparaissent pas — elles agissent en coulisses et se révèlent souvent dans ce qui nous irrite le plus chez les autres. Les rencontrer, sans jugement, c’est récupérer une énergie et une liberté immenses. « On ne devient pas lumineux en imaginant la lumière, disait Jung, mais en rendant conscente l’obscurité. »',
  reminder: 'Va doucement. Si une émotion forte monte, pose une main sur ton cœur et respire. Tu peux t’arrêter quand tu veux.',
  steps: [
    { t: 'Le miroir', p: 'Pense à une personne qui t’agace ou te déclenche profondément. Quel trait précis te dérange le plus chez elle ? (ex. l’arrogance, l’égoïsme, la mollesse, l’excès…)' },
    { t: 'La projection', p: 'Ce qui nous irrite très fort chez l’autre pointe souvent une part de nous reniée. En quoi ce trait existe-t-il aussi en toi — même à petite dose, même sous une autre forme, même refoulé ?' },
    { t: 'L’origine', p: 'Quand as-tu appris que ce trait était “interdit”, honteux ou dangereux ? Qu’a-t-il fallu cacher ou sur-jouer pour être aimé·e et accepté·e ?' },
    { t: 'Le cadeau caché', p: 'Chaque part d’ombre porte une force enfouie (la colère → l’affirmation ; l’égoïsme → le soin de soi ; l’arrogance → la confiance). Quelle force utile se cache dans ce trait, si tu l’accueillais sainement ?' },
    { t: 'L’intégration', p: 'Écris une phrase qui fait une place à cette part : « Je reconnais en moi … et je lui donne une place juste, à ma manière. »' },
  ],
  outro: 'Reconnaître une part d’ombre ne veut pas dire lui obéir : cela veut dire cesser de la combattre, pour choisir consciemment. Ce que tu accueilles cesse de te gouverner en secret.',
};

/* ------------------------------------------------------------
   Parcours guidé
   ------------------------------------------------------------ */
window.STEPS = [
  { id: 'welcome',  title: 'Bienvenue 🌿', desc: 'Prends 1 minute pour poser ton intention. Cet espace est à toi, à ton rythme.', cta: 'Poser mon objectif', act: (h) => h.editObjective(), done: (h) => !!h.config.objective },
  { id: 'bilan',    title: 'Faire mon premier bilan', desc: '~8 min. Un point de départ tout doux pour voir où tu en es — sans bonne ni mauvaise note.', cta: 'Commencer le bilan', act: (h) => h.go('bilan'), done: (h) => h.hasEntry('bilan') },
  { id: 'checkin',  title: 'Mon premier check-in', desc: 'Nommer une émotion présente, et comprendre son rôle. Nommer, c’est déjà apaiser.', cta: 'Faire un check-in', act: (h) => h.go('checkin'), done: (h) => h.hasEntry('checkin') },
  { id: 'atelier',  title: 'Explorer mon thème principal', desc: 'Un atelier guidé et approfondi sur le thème qui ressort le plus de ton bilan.', cta: 'Ouvrir l’atelier', act: (h) => h.go('atelier:' + (h.topTheme() || 'controle')), done: (h) => h.hasEntry('atelier') },
  { id: 'regulation', title: 'Une pause respiration', desc: '3 minutes de cohérence cardiaque pour apaiser le système nerveux.', cta: 'Respirer', act: (h) => h.go('regulation'), done: (h) => h.hasEntry('regulation') },
  { id: 'shadow', title: 'Rencontrer mon ombre', desc: 'Un exercice jungien puissant pour récupérer une part de toi mise de côté.', cta: 'Commencer', act: (h) => h.go('shadow'), done: (h) => h.hasEntry('shadow') },
  { id: 'futureself', title: 'Choisir un pattern à transformer', desc: 'Un seul pattern pour le mois, avec tes affirmations et tes prompts du jour.', cta: 'Ouvrir le journal', act: (h) => h.go('futureself'), done: (h) => !!h.config.fsPattern },
  { id: 'patterns', title: 'Observer mes premiers liens', desc: 'Découvre les patterns qui relient tes exercices entre eux.', cta: 'Voir mes patterns', act: (h) => h.go('patterns'), done: (h) => h.entries.length >= 5 },
];

/* ============================================================
   Introduction au travail émotionnel (page dédiée)
   ============================================================ */
window.INTRO = {
  title: 'Comprendre le travail émotionnel',
  sub: 'Comment ça marche, et comment avancer',
  sections: [
    { t: 'À quoi sert cet espace', body: 'Cet espace n’est pas là pour te « réparer » — tu n’es pas cassé·e. Il t’aide à mieux comprendre tes émotions et tes réactions, à repérer les schémas qui se répètent, et à répondre autrement, plus librement. On avance en douceur, à ton rythme. Il n’y a rien à réussir ici, seulement à observer et à t’accueillir.' },
    { t: 'Une émotion, c’est un messager', body: 'Une émotion n’est pas un problème à éliminer : c’est une information. La peur signale un danger (réel ou ancien), la colère une limite franchie, la tristesse une perte, la honte une peur de ne pas être aimable. Chaque émotion porte un message et un besoin. Le but n’est donc pas de « ne plus ressentir », mais d’apprendre à écouter ce que l’émotion vient dire, puis à y répondre.' },
    { t: 'Pourquoi on réagit comme ça', body: 'Beaucoup de nos réactions fortes ne parlent pas seulement du présent : elles rejouent des schémas appris tôt, quand ils nous protégeaient. Se couper de ses émotions, tout contrôler, se suradapter, exploser… étaient des stratégies de survie intelligentes à l’époque. Adultes, elles se déclenchent en automatique, même quand elles ne servent plus. Comprendre d’où vient un réflexe, sans se juger, c’est déjà commencer à s’en libérer.' },
    { t: 'La méthode, en 5 temps', body: '1) Reconnaître : décrire la situation, les faits, sans interprétation. 2) Nommer : mettre un mot précis sur l’émotion et sentir où elle vit dans le corps — nommer apaise déjà. 3) Comprendre : voir quel schéma, quelle croyance ou quelle blessure s’est activé, et ce que la réaction cherchait à protéger. 4) Transmuter : se redire une vérité plus juste et plus douce, et repérer le besoin réel. 5) La prochaine fois : décider, à froid, comment on aimerait répondre. C’est le fil rouge de chaque atelier.' },
    { t: 'Le temps de pause', body: 'Le cœur de tout : dès que quelque chose se déclenche dans le corps (chaleur, gorge serrée, cœur qui accélère), c’est le signal de faire une pause avant d’agir. Reviens au corps, respire lentement, puis regarde la situation autrement. Comme le disait Viktor Frankl : « Entre le stimulus et la réponse, il y a un espace ; dans cet espace se trouve notre pouvoir de choisir. » Ce petit temps transforme une réaction automatique en réponse consciente.' },
    { t: 'Sentir avant de transformer', body: 'On ne « corrige » pas une émotion par la volonté. On cherche d’abord à la sentir et à la laisser exister, quelques instants, sans la juger. Une émotion niée insiste et ressort ailleurs (dans le corps, dans nos réactions) ; une émotion accueillie monte, culmine, puis se dépose. C’est seulement une fois écoutée qu’on peut choisir une réponse nouvelle. C’est l’esprit du travail de Dr. Nicole LePera.' },
    { t: 'Comment l’app t’accompagne', body: 'Tu commences par un bilan : un point de repère qui révèle tes thèmes et permettra de mesurer ton évolution. Ensuite, tu explores des ateliers guidés (un par thème : contrôle, réactivité, rejet, perfectionnisme…), tu fais des check-ins émotionnels, tu régules ton système nerveux, et tu observes tes patterns dans le temps. La régularité compte plus que l’intensité : quelques minutes régulières valent mieux qu’un grand effort ponctuel.' },
    { t: 'Un cadre sûr', body: 'Cet espace est un outil de développement personnel, pas un soin médical, et il ne remplace pas un·e thérapeute. Si une douleur est trop forte, ou si tu traverses une période de grande détresse, entoure-toi : parle à un professionnel de santé. Va toujours à ton rythme, par petites doses. Tu peux t’arrêter quand tu veux — c’est aussi ça, prendre soin de toi.' },
  ],
};

/* ============================================================
   Bibliothèque des approches (descriptions longues et utiles)
   ============================================================ */
window.APPROACHES = {
  jung: { nm: 'Carl Jung', who: 'psychologie analytique', body:
    'Carl Gustav Jung (1875-1961) a fondé la psychologie analytique. Pour lui, nous ne sommes pas seulement notre « moi » conscient : une grande partie de notre psychisme vit dans l’inconscient.\n\nIl a décrit l’ombre — l’ensemble des parts de nous que nous avons appris à cacher ou à renier (colère, désir, vulnérabilité, ambition) parce qu’elles n’étaient pas les bienvenues enfant. Ce que nous refoulons ne disparaît pas : cela agit en coulisses et se manifeste souvent dans ce qui nous irrite le plus chez les autres — c’est la projection.\n\nLa persona, elle, est le masque social que nous présentons pour être acceptés ; s’y identifier à l’excès nous coupe de notre vérité. Jung parlait aussi de complexes : des nœuds émotionnels chargés, hérités du passé, qui « prennent » la personne quand ils sont activés — on ne réagit plus à la situation présente, mais à toute une histoire.\n\nLe chemin qu’il propose, l’individuation, consiste à ramener ces parts à la conscience pour les intégrer — non pour les subir, mais pour redevenir entier. « On ne devient pas lumineux en imaginant la lumière, disait-il, mais en rendant consciente l’obscurité. »' },

  lepera: { nm: 'Dr. Nicole LePera', who: 'Holistic Psychology', body:
    'Dr. Nicole LePera, psychologue clinicienne, est à l’origine du mouvement « Holistic Psychology ». Son idée centrale : nous pouvons devenir les acteurs de notre propre guérison (self-healers), sans dépendre uniquement d’un thérapeute.\n\nElle relie le corps, l’esprit et l’histoire familiale, et insiste sur les schémas appris dans l’enfance qui se rejouent à l’âge adulte. Trois piliers reviennent dans son travail.\n\nD’abord la conscience : observer ses automatismes sans se juger, car on ne peut changer que ce que l’on voit. Ensuite le reparentage (reparenting) : redonner à l’enfant intérieur ce qui a manqué — sécurité, discipline aimante, jeu, régulation émotionnelle. Enfin le Future Self Journal : choisir chaque jour un comportement aligné avec la personne que l’on devient, pour créer, par répétition, de nouvelles voies neuronales.\n\nLePera rappelle une règle essentielle : on ne « corrige » pas une émotion, on apprend d’abord à la sentir et à l’accueillir en sécurité. Le changement durable est lent, doux et quotidien — pas un exploit, mais une pratique.' },

  bourbeau: { nm: 'Lise Bourbeau', who: 'les 5 blessures', body:
    'Lise Bourbeau a popularisé, dans « Les cinq blessures qui empêchent d’être soi-même », l’idée que nos souffrances d’adulte s’organisent souvent autour de cinq blessures fondamentales formées dans l’enfance : le rejet, l’abandon, l’humiliation, la trahison et l’injustice.\n\nÀ chaque blessure correspond un « masque » développé pour se protéger : le fuyant (rejet), le dépendant (abandon), le masochiste (humiliation), le contrôlant (trahison) et le rigide (injustice). Ces masques sont des stratégies de survie : ils nous ont aidés petits, mais adultes, ils nous coupent de notre authenticité et attirent parfois les situations mêmes que nous redoutons.\n\nL’intérêt de ce cadre n’est pas de se coller une étiquette, mais de reconnaître ses réflexes de protection avec douceur, et de repérer quelle blessure s’active dans telle situation. Bourbeau insiste : guérir une blessure, c’est d’abord l’accepter et se donner la compassion qui a manqué, plutôt que de lutter contre son masque.\n\nUtilise ces repères comme une carte — jamais comme un verdict.' },

  bowlby: { nm: 'Bowlby & Ainsworth', who: 'théorie de l’attachement', body:
    'John Bowlby, psychiatre, et Mary Ainsworth, psychologue, ont fondé la théorie de l’attachement. Leur découverte : le lien précoce avec nos figures de soin façonne un « modèle interne » de ce qu’on peut attendre des relations.\n\nQuand ce lien a été fiable et sécurisant, on développe un attachement sécure : on peut être proche sans se perdre, et autonome sans se couper. Quand il a été imprévisible, distant ou envahissant, on développe des styles insécures : anxieux (peur de l’abandon, besoin de réassurance), évitant (on se protège en gardant ses distances) ou désorganisé (on oscille entre besoin et peur).\n\nCes styles ne sont pas des défauts : ce sont des adaptations logiques à ce qu’on a vécu. La bonne nouvelle des recherches actuelles, c’est la « sécurité acquise » : on peut, adulte, développer un attachement plus sécure — par des relations réparatrices et en devenant pour soi une base fiable.\n\nComprendre son style d’attachement éclaire énormément nos peurs relationnelles (rejet, abandon) et nos réactions automatiques dans le lien.' },

  mate: { nm: 'Gabor Maté', who: 'trauma & authenticité', body:
    'Gabor Maté, médecin, a beaucoup écrit sur le trauma, le stress et l’addiction. Sa thèse centrale : enfant, nous avons deux besoins vitaux — l’attachement (rester relié à ceux qui prennent soin de nous) et l’authenticité (rester fidèle à nos ressentis).\n\nQuand les deux entrent en conflit — par exemple si montrer sa colère ou sa tristesse menace le lien — l’enfant sacrifie presque toujours l’authenticité pour préserver l’attachement. Il apprend à refouler ce qu’il ressent, à « bien se tenir », à s’effacer.\n\nCe mécanisme, protecteur au départ, devient coûteux : on se coupe de soi, et le stress refoulé s’inscrit dans le corps. Maté relie ainsi de nombreux maux au stress chronique et à l’émotion non exprimée. Pour lui, le trauma n’est pas tant ce qui nous est arrivé que ce qui s’est passé en nous, faute d’avoir pu être accompagné.\n\nLa guérison consiste à revenir vers l’authenticité : sentir à nouveau ce qu’on a appris à taire, et se redonner le droit d’exister tel qu’on est.' },

  porges: { nm: 'Stephen Porges', who: 'théorie polyvagale', body:
    'Stephen Porges a formulé la théorie polyvagale, qui éclaire le fonctionnement du système nerveux autonome. Selon lui, notre corps évalue en permanence, sous le seuil de la conscience, s’il est en sécurité ou en danger — un processus qu’il nomme neuroception.\n\nTrois grands états en découlent. La sécurité (vagal ventral) : on se sent calme, connecté, ouvert aux autres. La mobilisation (sympathique) : face à une menace perçue, le corps s’active pour combattre ou fuir — cœur qui accélère, tension, réactivité. Le figement (vagal dorsal) : quand la menace semble insurmontable, on se déconnecte, on s’effondre, on s’engourdit.\n\nPoint clé : ces bascules ne sont pas des choix, mais des réponses automatiques de protection. On ne « se raisonne » pas hors d’une alarme ; on aide plutôt le corps à revenir à la sécurité — par la respiration lente, la chaleur, une voix douce, un lien rassurant.\n\nPorges parle de « fenêtre de tolérance » : la zone où l’on peut ressentir sans déborder. Élargir cette fenêtre est au cœur du travail émotionnel.' },

  neff: { nm: 'Kristin Neff', who: 'auto-compassion', body:
    'Kristin Neff, chercheuse, a fondé l’étude scientifique de l’auto-compassion. Sa découverte contre-intuitive : se traiter durement ne rend ni plus performant ni plus lucide — cela active surtout la honte et le système de menace. L’auto-compassion, à l’inverse, améliore la résilience, la motivation et le bien-être.\n\nElle repose sur trois piliers. La bienveillance envers soi : se parler comme à un ami cher plutôt qu’avec un juge intérieur. L’humanité commune : se rappeler que souffrir, échouer, être imparfait fait partie de l’expérience humaine partagée — on n’est ni seul ni « anormal ». La pleine conscience : accueillir la douleur telle qu’elle est, sans l’exagérer ni la nier.\n\nNeff distingue l’auto-compassion de l’apitoiement (qui enferme) et de l’estime de soi (qui dépend des résultats) : l’auto-compassion, elle, est stable car inconditionnelle.\n\nConcrètement, une « pause d’auto-compassion » tient en trois phrases : « C’est un moment de souffrance », « la souffrance fait partie de la vie », « puis-je être doux avec moi ». Un antidote direct à l’autocritique et au perfectionnisme.' },

  beck: { nm: 'Aaron Beck', who: 'thérapie cognitive (TCC)', body:
    'Aaron Beck est le père de la thérapie cognitive (TCC). Son intuition majeure : ce ne sont pas les événements eux-mêmes qui déterminent nos émotions, mais l’interprétation que nous en faisons. Entre une situation et notre ressenti s’intercalent des « pensées automatiques », rapides, invisibles et souvent biaisées.\n\nBeck a répertorié ces biais, les distorsions cognitives : la personnalisation (« si l’autre va mal, c’est ma faute »), la pensée tout-ou-rien (« si ce n’est pas parfait, c’est raté »), la surgénéralisation (« ça rate toujours »), la lecture de pensée (« il pense forcément du mal de moi »), la catastrophisation, le filtre négatif…\n\nLe travail consiste à repérer ces pensées, à les mettre à distance, puis à les questionner : quelles preuves ? quelle autre lecture possible ? qu’est-ce que je dirais à un ami ?\n\nCe recadrage n’est pas de la pensée positive forcée : c’est un retour au réel, plus juste et nuancé. Nommer la distorsion à l’œuvre suffit souvent à desserrer son emprise et à retrouver de la liberté intérieure.' },

  rosenberg: { nm: 'Marshall Rosenberg', who: 'Communication NonViolente', body:
    'Marshall Rosenberg a créé la Communication NonViolente (CNV), une approche des relations centrée sur les besoins. Son postulat : derrière chaque émotion se cache un besoin, satisfait ou non ; et derrière chaque comportement, même maladroit ou blessant, il y a une tentative de répondre à un besoin.\n\nLa CNV propose quatre temps. L’observation : décrire les faits sans jugement (« quand tu ne réponds pas » plutôt que « tu me méprises »). Le sentiment : nommer ce qu’on ressent vraiment. Le besoin : identifier le besoin sous l’émotion (sécurité, reconnaissance, repos, lien…). La demande : formuler une demande claire, concrète et négociable.\n\nCe cadre change tout dans le travail émotionnel : il apprend à distinguer un fait d’une histoire qu’on se raconte, et à cesser de rendre l’autre responsable de nos émotions tout en reconnaissant nos vrais besoins.\n\nRosenberg insiste aussi sur l’auto-empathie : avant de communiquer avec l’autre, s’écouter soi. Se relier à son besoin, plutôt qu’à son reproche, apaise et ouvre des solutions.' },

  walker: { nm: 'Pete Walker', who: 'trauma complexe (CPTSD, 4F)', body:
    'Pete Walker, psychothérapeute, a approfondi le trauma complexe (CPTSD), celui qui naît non d’un choc unique mais d’un environnement durablement insécurisant durant l’enfance.\n\nIl a étendu la célèbre réponse « combat ou fuite » à quatre réponses de survie, les 4F : Fight (lutter — devenir contrôlant, colérique, exigeant), Flight (fuir — s’agiter, se suractiver, perfectionner), Freeze (se figer — se dissocier, s’isoler, se couper) et Fawn (se soumettre, faire plaisir — s’effacer pour désamorcer le danger). Chacun développe un type dominant selon ce qui l’a protégé enfant.\n\nLe « fawn » éclaire particulièrement la culpabilité et la difficulté à dire non : plaire était devenu une stratégie de survie. Walker décrit aussi les « flashbacks émotionnels » : ces moments où l’on est submergé par une détresse ancienne, sans image ni souvenir clair, comme si le passé débordait dans le présent.\n\nSon travail apprend à reconnaître son type 4F, à traverser ces flashbacks avec douceur, et à faire grandir une voix intérieure aimante à la place du critique hérité.' },

  vanderkolk: { nm: 'Bessel van der Kolk', who: 'le corps garde le score', body:
    'Bessel van der Kolk, psychiatre spécialiste du trauma, a résumé des décennies de recherche dans « Le corps n’oublie rien » (The Body Keeps the Score). Sa thèse : le trauma ne se loge pas seulement dans les souvenirs, mais dans le corps et le système nerveux.\n\nAprès une expérience débordante, le cerveau peut rester en état d’alerte, réagissant au présent comme si le danger était toujours là — d’où les réactions « disproportionnées », les tensions chroniques, l’hypervigilance ou, à l’inverse, l’engourdissement.\n\nPoint crucial : parce que le trauma est stocké dans le corps, la parole seule ne suffit pas toujours à guérir. Van der Kolk plaide pour des approches qui passent aussi par le corps et la sécurité physiologique : respiration, mouvement, yoga, EMDR, présence relationnelle.\n\nIl souligne l’importance de restaurer un sentiment de sécurité intérieure et de « redevenir ami avec son corps » — apprendre à sentir ses sensations sans en avoir peur. Pour la pratique quotidienne, cela valide une intuition simple : revenir au corps (sentir, respirer, ancrer) n’est pas accessoire, c’est le socle.' },

  levine: { nm: 'Peter Levine', who: 'Somatic Experiencing', body:
    'Peter Levine a créé la Somatic Experiencing en observant les animaux sauvages : régulièrement exposés au danger de mort, ils ne développent pourtant presque jamais de trauma. Pourquoi ? Parce qu’après la menace, ils « déchargent » l’énergie de survie mobilisée — en tremblant, en secouant leur corps — avant de reprendre le cours de leur vie.\n\nChez l’humain, cette décharge est souvent bloquée (par la honte, la culpabilité, le mental), et l’énergie de survie reste figée dans le système nerveux, entretenant tensions et symptômes.\n\nSa méthode ne consiste pas à revivre le trauma en le racontant, mais à travailler doucement avec les sensations corporelles. Deux notions clés : le titrage — approcher l’émotion difficile par toutes petites doses, jamais tout d’un coup — et la pendulation — alterner entre la sensation inconfortable et un lieu de sécurité dans le corps, pour que le système apprenne qu’il peut ressentir puis revenir au calme.\n\nPour la pratique quotidienne, Levine confirme qu’une émotion accueillie par petites touches, dans un cadre sûr, monte, culmine, puis se libère d’elle-même.' },

  brach: { nm: 'Tara Brach', who: 'la méthode RAIN', body:
    'Tara Brach, psychologue et enseignante de méditation, a popularisé une méthode simple et puissante pour traverser les émotions difficiles : RAIN, un acronyme en quatre temps.\n\nR — Reconnaître ce qui est là (« qu’est-ce que je ressens en ce moment ? »), sans le fuir. A — Accepter, ou « autoriser » : laisser l’émotion exister telle qu’elle est, sans vouloir aussitôt la changer ni la juger ; c’est le passage le plus contre-intuitif, car notre réflexe est de résister. I — Investiguer avec bienveillance : où est-ce que je le sens dans mon corps ? De quoi cette part de moi a-t-elle besoin ? Que croit-elle ? N — Nourrir (nurture) : offrir à cette part la douceur, la réassurance ou la présence qui lui manque, comme on le ferait pour un être aimé.\n\nBrach insiste sur le ton : RAIN ne « règle » pas l’émotion, il l’accompagne. Elle parle de « présence aimante » — la qualité d’attention chaleureuse qui, à elle seule, transforme.\n\nC’est une pratique idéale au moment de la pause : au lieu de réagir, on RAIN.' },

  frankl: { nm: 'Viktor Frankl', who: 'l’espace de choix', body:
    'Viktor Frankl, psychiatre viennois et survivant des camps de concentration, a fondé la logothérapie — une psychologie centrée sur le sens. De son expérience extrême, il a tiré une conviction : on peut tout nous enlever sauf une chose, « la liberté de choisir notre attitude dans n’importe quelles circonstances ».\n\nD’où sa phrase devenue centrale dans le travail émotionnel : « Entre le stimulus et la réponse, il y a un espace. Dans cet espace se trouve notre pouvoir de choisir notre réponse. Et dans notre réponse résident notre croissance et notre liberté. »\n\nCet espace, c’est le temps de pause. La plupart de nos réactions blessantes ou regrettées surviennent quand cet espace se referme : le déclencheur et la réaction se collent, et l’ancien réflexe prend le dessus.\n\nTout le travail consiste à élargir cet intervalle — par la conscience du corps, la respiration, le fait de nommer ce qu’on ressent — pour qu’une réponse choisie remplace la réaction automatique. Frankl ajoute que même la souffrance inévitable devient plus supportable dès qu’on lui trouve un sens.' },

  winnicott: { nm: 'Donald Winnicott', who: '« suffisamment bon »', body:
    'Donald Winnicott, pédiatre et psychanalyste, a transformé notre regard sur la parentalité — et, par extension, sur l’exigence envers soi. Contre l’idéal du parent parfait, il a forgé la notion de « mère suffisamment bonne » (good enough) : l’enfant n’a pas besoin d’une réponse parfaite à tous ses besoins, mais d’une réponse suffisamment fiable, avec ses ratés inévitables.\n\nMieux : ces petites imperfections, ces micro-frustrations dosées, sont nécessaires — c’est en découvrant que le monde ne comble pas tout, tout de suite, que l’enfant développe sa propre force et son autonomie. Un parent trop parfait empêcherait paradoxalement de grandir.\n\nWinnicott a aussi décrit le « faux self » : le masque adapté que l’on construit quand on doit trop se conformer aux attentes, au détriment du « vrai self », spontané et vivant.\n\nPour le perfectionnisme, son message est libérateur : viser le « suffisamment bon » n’est pas se résigner, c’est reconnaître que l’imperfection est humaine, sécurisante et féconde. On n’a pas besoin d’être parfait pour être digne d’amour — ni pour bien faire.' },

  rogers: { nm: 'Carl Rogers', who: 'regard positif inconditionnel', body:
    'Carl Rogers, fondateur de l’Approche Centrée sur la Personne, a placé la relation au cœur du soin psychologique. Sa conviction : chacun porte en lui une tendance naturelle à grandir et à se réaliser, à condition de rencontrer les bonnes conditions relationnelles.\n\nLa plus célèbre est le « regard positif inconditionnel » : être accueilli et estimé sans condition, indépendamment de ses performances ou de sa conformité aux attentes. Or beaucoup ont grandi avec un regard conditionnel (« je suis aimable si je réussis, si je fais plaisir, si je me tais ») et ont fini par intérioriser cette condition — d’où le besoin de validation et la peur du rejet.\n\nRogers ajoute deux ingrédients : l’empathie (comprendre le monde de l’autre de l’intérieur) et la congruence (être authentique, sans masque).\n\nLe travail intérieur consiste à s’offrir à soi-même ce regard inconditionnel cherché au-dehors : cesser de conditionner son estime à ses résultats, et s’accueillir tel qu’on est. C’est ainsi, paradoxalement, que le changement devient possible : « quand je m’accepte tel que je suis, alors je peux changer. »' },
};

/* Quelles approches éclairent chaque thème */
window.THEME_APPROACHES = {
  controle:    ['porges', 'frankl', 'jung', 'levine'],
  perso:       ['beck', 'rosenberg', 'jung', 'neff'],
  reactif:     ['frankl', 'porges', 'walker', 'jung'],
  rejet:       ['bowlby', 'mate', 'levine', 'lepera'],
  perfection:  ['neff', 'beck', 'winnicott', 'rogers'],
  culpabilite: ['walker', 'rosenberg', 'neff', 'bourbeau'],
  validation:  ['rogers', 'jung', 'neff', 'lepera'],
  evitement:   ['vanderkolk', 'levine', 'brach', 'lepera'],
};
