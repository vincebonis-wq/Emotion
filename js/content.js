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
