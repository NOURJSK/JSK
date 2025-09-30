export const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.news": "News",
    "nav.teams": "Teams",
    "nav.players": "Players",
    "nav.staff": "Staff",
    "nav.contact": "Contact",

    home: "Home",
    news: "News",
    games: "Games",
    players: "Players",
    staff: "Staff",
    tournaments: "Tournaments",
    contact: "Contact",

    // Hero Section
    eliteGamingTeam: "Elite Gaming Team",
    heroTitle: "JSK ESPORTS",
    heroDescription:
      "We gather the best talents and reach the top before you know it. Dominating the competitive gaming scene with skill, strategy, and teamwork.",
    joinOurTeam: "Join Our Team",
    watchHighlights: "Watch Highlights",
    tournamentsWon: "Tournaments Won",
    teamMembers: "Team Members",
    games: "Games",
    eliteGaming: "ELITE GAMING",

    // Players Section
    ourPlayers: "Our Players",
    filterByGame: "Filter by Game",
    filterByGender: "Filter by Gender",
    allGames: "All Games",
    allGenders: "All Genders",
    male: "Male",
    female: "Female",
    viewProfile: "View Profile",

    // Staff Section
    "staff.title": "Our",
    "staff.titleHighlight": "Staff",
    "staff.subtitle": "The dedicated professionals behind our success, organized by hierarchy and expertise",

    // Common
    loading: "Loading...",
    close: "Close",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.news": "Actualités",
    "nav.teams": "Équipes",
    "nav.players": "Joueurs",
    "nav.staff": "Équipe",
    "nav.contact": "Contact",

    home: "Accueil",
    news: "Actualités",
    games: "Jeux",
    players: "Joueurs",
    staff: "Équipe",
    tournaments: "Tournois",
    contact: "Contact",

    // Hero Section
    eliteGamingTeam: "Équipe de Gaming d'Élite",
    heroTitle: "JSK ESPORTS",
    heroDescription:
      "Nous rassemblons les meilleurs talents et atteignons le sommet avant que vous ne le sachiez. Dominer la scène du gaming compétitif avec compétence, stratégie et travail d'équipe.",
    joinOurTeam: "Rejoindre Notre Équipe",
    watchHighlights: "Voir les Moments Forts",
    tournamentsWon: "Tournois Gagnés",
    teamMembers: "Membres de l'Équipe",
    games: "Jeux",
    eliteGaming: "GAMING D'ÉLITE",

    // Players Section
    ourPlayers: "Nos Joueurs",
    filterByGame: "Filtrer par Jeu",
    filterByGender: "Filtrer par Genre",
    allGames: "Tous les Jeux",
    allGenders: "Tous les Genres",
    male: "Homme",
    female: "Femme",
    viewProfile: "Voir le Profil",

    // Staff Section
    "staff.title": "Notre",
    "staff.titleHighlight": "Équipe",
    "staff.subtitle": "Les professionnels dévoués derrière notre succès, organisés par hiérarchie et expertise",

    // Common
    loading: "Chargement...",
    close: "Fermer",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "حول",
    "nav.news": "الأخبار",
    "nav.teams": "الفرق",
    "nav.players": "اللاعبون",
    "nav.staff": "الفريق",
    "nav.contact": "اتصل بنا",

    home: "الرئيسية",
    news: "الأخبار",
    games: "الألعاب",
    players: "اللاعبون",
    staff: "الفريق",
    tournaments: "البطولات",
    contact: "اتصل بنا",

    // Hero Section
    eliteGamingTeam: "فريق الألعاب النخبة",
    heroTitle: "JSK ESPORTS",
    heroDescription:
      "نجمع أفضل المواهب ونصل إلى القمة قبل أن تعرف ذلك. نهيمن على مشهد الألعاب التنافسية بالمهارة والاستراتيجية والعمل الجماعي.",
    joinOurTeam: "انضم إلى فريقنا",
    watchHighlights: "شاهد أبرز اللحظات",
    tournamentsWon: "البطولات المكتسبة",
    teamMembers: "أعضاء الفريق",
    games: "الألعاب",
    eliteGaming: "الألعاب النخبة",

    // Players Section
    ourPlayers: "لاعبونا",
    filterByGame: "تصفية حسب اللعبة",
    filterByGender: "تصفية حسب الجنس",
    allGames: "جميع الألعاب",
    allGenders: "جميع الأجناس",
    male: "ذكر",
    female: "أنثى",
    viewProfile: "عرض الملف الشخصي",

    // Staff Section
    "staff.title": "فريق",
    "staff.titleHighlight": "العمل",
    "staff.subtitle": "المحترفون المتفانون وراء نجاحنا، منظمون حسب التسلسل الهرمي والخبرة",

    // Common
    loading: "جاري التحميل...",
    close: "إغلاق",
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en
