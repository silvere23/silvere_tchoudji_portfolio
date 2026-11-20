// Traduction du site (français / anglais). Chargé avant les autres scripts.
// La page est écrite en français ; en anglais, les textes sont remplacés à partir du dictionnaire ci-dessous.
// - les textes simples sont retrouvés tels quels (clé = texte français exact) ;
// - les paragraphes avec du gras ou un titre à double couleur portent data-i18n="clé" et sont remplacés en bloc ;
// - les textes créés par les scripts passent par t("texte français").
// Pour ajouter une traduction : ajouter une ligne "texte français": "English text" dans EN.
"use strict";
(() => {
  const LANG = document.documentElement.lang === "en" ? "en" : "fr";   // décidé par theme.js, avant l'affichage

  const EN = {
    // navigation et pied de page
    "À propos": "About", "Compétences": "Skills", "Expérience": "Experience", "Projets": "Projects", "Formation": "Education",
    "Retour en haut": "Back to top", "Liens": "Links", "Télécharger le CV": "Download CV", "E-mail": "Email",
    "Conçu et développé par Silvere · HTML, CSS, JavaScript · Hébergé sur GitHub Pages": "Designed and built by Silvere · HTML, CSS, JavaScript · Hosted on GitHub Pages", "Changer de thème": "Toggle theme", "Menu": "Menu",
    // accueil
    "4 ans d'expérience": "4 years of experience", "Cybersécurité": "Cybersecurity", "En poste chez Les Menus Services": "Currently at Les Menus Services",
    "Ingénieur DevOps & Cloud": "DevOps & Cloud Engineer", "Ans": "Years", "Langues": "Languages",
    "Voir les projets": "View projects", "Découvrir": "Discover", "Voir les projets phares": "View featured projects",
    // à propos
    "L'infrastructure,": "Infrastructure,", "de la prod à l'interface": "from production to interface",
    "Mobile dans toute la France": "Open to work anywhere in France", "Mastère Cybersécurité et Cloud Computing, IPSSI Lille": "Master's in Cybersecurity and Cloud Computing, IPSSI Lille",
    "DevOps & UX Designer chez Les Menus Services": "DevOps & UX Designer at Les Menus Services", "Français courant, anglais B1": "French (fluent), English (B1)",
    "Portrait de Silvere Tchoudji": "Portrait of Silvere Tchoudji",
    // compétences
    "Mon": "My", "arsenal technique": "technical toolkit", "Les outils que j'utilise en poste et sur mes projets.": "The tools I use at work and on my projects.",
    "Déploiement d'infrastructures": "Infrastructure deployment", "Supervision": "Monitoring", "Systèmes & réseaux": "Systems & networks",
    "Maquettage": "Wireframing", "Prototypage": "Prototyping", "UI mobile": "Mobile UI", "Design graphique": "Graphic design", "Identité visuelle": "Visual identity",
    "Langages": "Languages", "Créativité": "Creativity", "Esprit d'équipe": "Team spirit", "Résilience": "Resilience", "Outils que j'utilise": "Tools I use",
    // expérience
    "2025 · Aujourd'hui": "2025 · Present", "Alternance puis CDD": "Work-study, then fixed-term contract", "En poste": "Current",
    "Refonte du projet SIMS : maquettage et prototypage des interfaces sous Figma.": "SIMS redesign: wireframing and prototyping the interfaces in Figma.",
    "Conteneurisation, déploiement et supervision des applications avec Docker, CI/CD, Prometheus et Grafana.": "Containerisation, deployment and monitoring of the applications with Docker, CI/CD, Prometheus and Grafana.",
    "Création de WorkTrack Pro, une application web de suivi de l'avancement des modules.": "Built WorkTrack Pro, a web app that tracks the progress of each module.",
    "Outil Python d'OCR qui transforme des fiches horaires manuscrites scannées en fichier Excel classé.": "Python OCR tool that turns scanned handwritten timesheets into a sorted Excel file.",
    "Juin 2022 · Nov. 2023": "Jun 2022 · Nov 2023", "CDD": "Fixed-term contract", "1 an 5 mois": "1 yr 5 mos", "Administrateur réseau": "Network administrator",
    "Supervision et maintenance du parc informatique, optimisation des infrastructures réseau.": "Monitoring and maintenance of the IT fleet, optimisation of the network infrastructure.",
    "Configuration et maintenance des serveurs pour garantir performance et haute disponibilité.": "Server configuration and maintenance to ensure performance and high availability.",
    "Administration des accès utilisateurs via Active Directory : gestion des droits et sécurité des données.": "User access management with Active Directory: permissions and data security.",
    "Juin 2021 · Juin 2022": "Jun 2021 · Jun 2022", "Stage": "Internship", "1 an": "1 yr", "Technicien réseau": "Network technician",
    "Administration systèmes et sécurité : serveurs, Active Directory, gestion des accès.": "Systems administration and security: servers, Active Directory, access management.",
    "Gestion du parc informatique et des infrastructures réseau : installations, brassage, maintenance.": "IT fleet and network infrastructure management: installation, patching, maintenance.",
    "Support technique : diagnostic et résolution des pannes réseau de premier niveau.": "Technical support: diagnosing and fixing first-level network issues.",
    "Serveurs": "Servers", "Juin 2020 · Sept. 2020": "Jun 2020 · Sep 2020", "3 mois": "3 mos",
    "Mise en place d'un système de détection d'intrusion avec Suricata, pfSense et GNS3.": "Set up an intrusion detection system with Suricata, pfSense and GNS3.",
    // freelance
    "2019 · 2024": "2019 · 2024", "Freelance": "Freelance", "5 ans": "5 yrs", "Designer graphique & UX/UI Designer": "Graphic Designer & UX/UI Designer",
    "En tant que designer graphique et UX/UI designer freelance, j’ai accompagné différentes entreprises dans le développement de leur identité visuelle et de leur présence digitale.": "As a freelance graphic and UX/UI designer, I helped a range of businesses develop their visual identity and digital presence.",
    "Mes principales missions :": "Main responsibilities:",
    "Identité visuelle :": "Visual identity:", "création et conception d’identités graphiques et de chartes graphiques pour les entreprises.": "creating and designing brand identities and brand guidelines for businesses.",
    "Communication visuelle :": "Visual communication:", "conception de supports de communication print et digitaux.": "designing print and digital communication materials.",
    "UX/UI Design :": "UX/UI design:", "conception de maquettes et de prototypes interactifs pour des sites web et des applications.": "designing mockups and interactive prototypes for websites and apps.",
    "Expérience utilisateur :": "User experience:", "réflexion sur l’ergonomie, la navigation et l’optimisation des interfaces afin d'améliorer l’expérience utilisateur.": "working on usability, navigation and interface optimisation to improve the user experience.",
    // projets
    "Tous": "All", "Création graphique": "Graphic design", "Filtrer par thème": "Filter by topic", "Projet précédent": "Previous project", "Projet suivant": "Next project",
    "Voir le projet": "View project", "Réduire la liste": "Show less", "Projet": "Project",
    // certifications
    "Mes": "My", "certifications": "certifications", "Obtenu · Oct. 2026": "Passed · Oct 2026",
    "Score de 745 sur 990, niveau B1 du CECRL. Test passé sur la plateforme GlobalExam.": "Score of 745 out of 990, CEFR level B1. Taken on the GlobalExam platform.",
    "Voir le certificat": "View certificate", "En préparation": "In preparation",
    "Cisco Certified Network Associate : fondamentaux des réseaux, routage et commutation.": "Cisco Certified Network Associate: networking fundamentals, routing and switching.",
    "Cisco Certified Network Professional : réseaux d'entreprise avancés.": "Cisco Certified Network Professional: advanced enterprise networking.",
    "Certification Amazon Web Services : services et architecture cloud.": "Amazon Web Services certification: cloud services and architecture.",
    // formation
    "2024 – 2026": "2024 – 2026", "Mastère Cybersécurité et Cloud Computing · Bac+5": "Master's in Cybersecurity and Cloud Computing · 5‑year degree",
    "Lille, France · En alternance": "Lille, France · Work-study", "Projet de soutenance : ASR-SDN": "Final project: ASR-SDN",
    "Architecture SDN de détection et de réponse automatisée aux cyberattaques.": "SDN architecture for detecting and automatically responding to cyberattacks.",
    "Bachelor Architecture des Systèmes d'Information et DevOps · Bac+3": "Bachelor's in Information Systems Architecture and DevOps · 3‑year degree",
    "Architecture SI et DevOps": "IS architecture and DevOps", "Conception des systèmes d'information et pratiques DevOps.": "Information systems design and DevOps practices.",
    // contact
    "Construisons": "Let's build", "quelque chose de solide": "something solid", "Une opportunité, un projet ou une question ? Écris-moi.": "An opportunity, a project or a question? Write to me.",
    "Envoyer un message": "Send a message", "Nom": "Name", "Envoyer": "Send", "Le message s'ouvre dans ton application de messagerie.": "The message opens in your email app.",
    "Contact portfolio : ": "Portfolio contact: ",
    // blog
    "articles": "articles", "DevOps, cloud, cybersécurité et retours d'expérience. Chaque article est ouvert aux réactions et aux commentaires.": "DevOps, cloud, cybersecurity and lessons learned. Every article is open to reactions and comments. Articles are written in French.",
    "Aucun article pour ce thème.": "No article on this topic.", "Tous les articles": "All articles", "Chargement…": "Loading…",
    "Réactions et commentaires": "Reactions and comments", "Article introuvable": "Article not found", "Article indisponible": "Article unavailable",
    "Cet article n'existe pas ou a été déplacé.": "This article does not exist or has been moved.", "Impossible de charger cet article.": "Unable to load this article.",
    "Impossible de charger les articles.": "Unable to load the articles.", "min de lecture": "min read",
    "Impossible de charger les articles. En local, le site doit être ouvert via un serveur (voir le README).": "Unable to load the articles. Locally, the site must be served by a web server (see the README).",
    "Les réactions et les commentaires seront disponibles dès que le blog sera relié à GitHub.": "Reactions and comments will be available as soon as the blog is connected to GitHub.",
    // fiche projet
    "Tous les projets": "All projects", "Type": "Type", "Projet technique": "Technical project", "Projet UX": "UX project", "Projet graphique": "Graphic design project",
    "Contexte": "Context", "Rôle": "Role", "Cas d'étude": "Case study", "Périmètre": "Scope", "Support": "Platform", "Livrables": "Deliverables",
    "Visuels à venir": "Visuals coming soon", "Les images de ce projet seront ajoutées prochainement.": "Images for this project will be added soon.",
    "Palette de couleurs": "Colour palette", "Typographies": "Typefaces", "La démarche": "The approach", "Maquettes et écrans": "Mockups and screens", "Captures": "Screenshots",
    "Autres projets": "Other projects", "Projet introuvable": "Project not found", "Ce projet n'existe pas ou a été déplacé.": "This project does not exist or has been moved.",
    // pages par catégorie
    "projets": "projects", "outils": "tools", "au quotidien": "every day", "Surveillance active": "Live monitoring", "rapports": "reports",
    "Réf.": "Ref.", "Type": "Type", "Outils": "Tools", "Études de cas": "Case studies", "Lire l'étude de cas": "Read the case study",
    "Portfolio": "Portfolio", "Explorer aussi": "Explore also", "Autres catégories": "Other categories",
    // page
    "Silvere Tchoudji | DevOps, Cloud & Cybersécurité": "Silvere Tchoudji | DevOps, Cloud & Cybersecurity",
    "Portfolio de Silvere Tchoudji, ingénieur DevOps & Cloud, cybersécurité et UX design.": "Portfolio of Silvere Tchoudji, DevOps & Cloud engineer, cybersecurity and UX design."
  };

  // blocs qui contiennent du gras ou un titre en deux couleurs : remplacés en entier
  const BLOCKS = {
    "hero-lead": "I deploy, monitor and secure infrastructure, and I design the interfaces that go with it. Docker · Kubernetes · AWS · Figma. Based in <strong>France</strong>, open to relocation.",
    "about-1": "I'm <strong>Silvere Tchoudji</strong>, and I hold a Master's in Cybersecurity and Cloud Computing from IPSSI Lille. I currently work at <strong>Les Menus Services</strong> as a DevOps and UX Designer, where I take part in the redesign of the SIMS application: Figma mockups on one side, containerisation, deployment and monitoring on the other.",
    "about-2": "Before that, I spent more than two years in systems and network administration: fleet monitoring, servers, Active Directory, high availability. My final project, <strong>ASR-SDN</strong>, brings both worlds together with an SDN architecture that automatically detects, segments and responds to cyberattacks.",
    "about-3": "I also have a real passion for graphic design and building visual identities. This mix lets me think about a product end to end: reliable, secure and pleasant to use.",
    "title-xp": 'Professional <span class="grad">experience</span>',
    "title-edu": 'Academic <span class="grad">background</span>',
    "title-projects": 'Selected <span class="grad">projects</span>',
    "title-blog": 'My <span class="grad">articles</span>'
  };

  const t = s => LANG === "en" && s in EN ? EN[s] : s;
  window.LANG = LANG;
  window.t = t;
  // projet dans la langue du site : les champs de p.en remplacent ceux en français
  window.loc = p => LANG === "en" && p && p.en ? Object.assign({}, p, p.en) : p;

  // bouton de langue : on change, on mémorise, on recharge au même endroit
  const btn = document.getElementById("lang");
  if (btn) {
    btn.textContent = LANG === "en" ? "FR" : "EN";
    btn.setAttribute("aria-label", LANG === "en" ? "Passer le site en français" : "Switch to English");
    btn.addEventListener("click", () => {
      try { localStorage.setItem("lang", LANG === "en" ? "fr" : "en"); sessionStorage.setItem("langY", scrollY); } catch (e) {}
      const u = new URL(location.href); u.searchParams.delete("lang");
      location.replace(u.pathname + u.search + u.hash);
      if (u.href === location.href) location.reload();
    });
  }
  try {
    const y = sessionStorage.getItem("langY");
    if (y !== null) { sessionStorage.removeItem("langY"); addEventListener("load", () => scrollTo(0, +y)); }
  } catch (e) {}

  if (LANG !== "en") return;

  // blocs
  document.querySelectorAll("[data-i18n]").forEach(el => { const v = BLOCKS[el.dataset.i18n]; if (v) el.innerHTML = v; });
  // textes simples, en gardant les espaces autour
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = walker.nextNode());) {
    const raw = n.nodeValue, key = raw.trim();
    if (key && key in EN) n.nodeValue = raw.replace(key, EN[key]);
  }
  // attributs
  document.querySelectorAll("[aria-label],[alt],[placeholder],[title]").forEach(el => ["aria-label", "alt", "placeholder", "title"].forEach(a => {
    const v = el.getAttribute(a); if (v && v in EN) el.setAttribute(a, EN[v]);
  }));
  document.title = t(document.title);
  const desc = document.querySelector('meta[name="description"]'); if (desc) desc.content = t(desc.content);
  document.documentElement.classList.remove("lang-wait");
})();
