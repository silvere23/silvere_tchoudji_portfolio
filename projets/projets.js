/* ==========================================================================
   LISTE DES PROJETS
   C'est le seul fichier à modifier pour ajouter, retirer ou réordonner un projet.
   Les cartes, le carrousel, le diaporama de l'accueil et le compteur « +16 projets »
   sont construits automatiquement à partir de cette liste.

   Pour ajouter un projet :
   1. copie un bloc { ... } ci-dessous et change ses valeurs ;
   2. écris sa page dans projets/<slug>.md (texte en Markdown, facultatif) ;
   3. dépose ses images dans projets/img/<slug>/ et liste-les dans « gallery ».

   Champs :
   slug      identifiant unique, en minuscules et avec des tirets (sert d'adresse : #projet/slug)
   title     nom du projet
   cat       catégorie : "cyber", "devops", "ux" ou "graph"
   type      mise en page de la fiche : "tech", "ux" ou "graph" (déduit de cat si absent)
   badge     petite étiquette affichée sur la carte
   summary   résumé de 1 à 3 phrases
   tags      outils ou mots-clés
   featured  true pour le mettre en avant dans le carrousel « Tous » et le diaporama de l'accueil
   hero      sous-titre dans le diaporama de l'accueil (projets mis en avant)
   cover     image de couverture (facultatif ; sinon l'illustration du projet ou l'icône de la catégorie)
   facts     informations clés de la fiche : [["Rôle", "…"], ["Contexte", "…"]]
   kpis      chiffres clés : [{ value: "0,09 s", label: "temps de réponse moyen" }]
   gallery   images : [{ src: "projets/img/slug/logo.png", caption: "Logo", wide: true }]
   palette   couleurs d'une identité graphique : [{ hex: "#1E293B", name: "Bleu nuit" }]
   fonts     typographies d'une identité graphique : [{ name: "Montserrat", use: "Titres" }]
   links     liens externes : [{ label: "Code sur GitHub", url: "https://…" }]
   ========================================================================== */
window.PROJECTS = [
  {
    slug: "asr-sdn", title: "ASR-SDN", cat: "cyber", featured: true, badge: "Projet de soutenance",
    hero: "Cybersécurité · Réseau SDN",
    summary: "Architecture SDN pour la détection, la segmentation et la réponse automatisée aux cyberattaques en réseau d'entreprise. Suricata détecte, un moteur Python décide, ONOS isole ou bloque l'hôte. Six scénarios validés en lab, temps de réponse moyen d'environ 0,09 s.",
    tags: ["ONOS", "Suricata", "Python", "Mininet", "Open vSwitch"],
    facts: [["Contexte", "Projet de soutenance, Mastère Cybersécurité et Cloud Computing (IPSSI)"], ["Rôle", "Conception, mise en œuvre du lab et validation"], ["Cas d'étude", "Réseau de Les Menus Services"]],
    kpis: [{ value: "≈ 0,09 s", label: "temps de réponse moyen" }, { value: "6", label: "scénarios validés" }, { value: "3", label: "machines virtuelles" }]
  },
  {
    slug: "site-web-poleit", title: "Site web PoleIT", cat: "devops", featured: true, badge: "Déploiement",
    hero: "DevOps · Kubernetes",
    summary: "Création d'un site vitrine, déployé avec Kubernetes et Docker, puis supervisé avec Prometheus et Grafana pour suivre son état en continu.",
    tags: ["Kubernetes", "Docker", "Prometheus", "Grafana"],
    facts: [["Rôle", "Création du site, déploiement et supervision"]]
  },
  {
    slug: "maquettes-sims", title: "Maquettes SIMS", cat: "ux", featured: true, badge: "En entreprise",
    hero: "UX design · Figma",
    summary: "Maquettage et prototypage sous Figma des interfaces de la nouvelle application SIMS chez Les Menus Services, du parcours utilisateur aux écrans finaux.",
    tags: ["Figma", "Prototypage", "Parcours utilisateur", "Design system"],
    facts: [["Contexte", "Les Menus Services"], ["Rôle", "UX / UI designer"], ["Périmètre", "Offre alimentaire"]],
    gallery: []
  },
  {
    slug: "refonte-sims", title: "Refonte SIMS", cat: "devops", featured: true, badge: "En entreprise",
    hero: "DevOps · CI/CD",
    summary: "Conteneurisation, déploiement et supervision des applications du projet SIMS chez Les Menus Services, avec une chaîne CI/CD et des tableaux de bord de suivi.",
    tags: ["Docker", "CI/CD", "Prometheus", "Grafana"],
    facts: [["Contexte", "Les Menus Services"], ["Rôle", "DevOps"]]
  },
  {
    slug: "application-mawemba", title: "Application Mawemba", cat: "ux", featured: true, badge: "Application mobile",
    hero: "UX design · Mobile",
    summary: "Conception des interfaces de l'application mobile Mawemba : UI, maquettage et prototypage sous Figma.",
    tags: ["Figma", "UI mobile", "Prototypage"],
    facts: [["Rôle", "UI / UX designer"], ["Support", "Application mobile"]],
    gallery: []
  },
  {
    slug: "identite-graphique-d-entreprises", title: "Identité graphique d'entreprises", cat: "graph", featured: true, badge: "Identité visuelle",
    hero: "Création graphique",
    summary: "Création d'identités visuelles et de supports de communication pour des entreprises.",
    tags: ["Illustrator", "Photoshop", "InDesign", "Identité visuelle"],
    facts: [["Rôle", "Designer graphique"], ["Livrables", "Logos, chartes, supports de communication"]],
    gallery: [], palette: [], fonts: []
  },
  {
    slug: "hardening-de-serveurs", title: "Hardening de serveurs", cat: "cyber", badge: "Cyber",
    summary: "Durcissement de systèmes Linux et Windows Server : réduction de la surface d'attaque et mise en place de politiques de sécurité.",
    tags: ["Linux", "Windows Server", "Active Directory"]
  },
  {
    slug: "pentest-en-lab", title: "Pentest en lab", cat: "cyber", badge: "Cyber",
    summary: "Tests d'intrusion en environnement de lab : reconnaissance, exploitation et rapport de vulnérabilités. Exemple : salle Ignite de TryHackMe, via la faille CVE-2018-16763 de Fuel CMS.",
    tags: ["Pentest", "TryHackMe", "Nmap", "Python"]
  },
  {
    slug: "reverse-engineering", title: "Reverse engineering", cat: "cyber", badge: "Cyber",
    summary: "Analyse de binaires pour comprendre le fonctionnement interne d'applications.",
    tags: ["Analyse de binaires", "Désassemblage"]
  },
  {
    slug: "analyse-de-ransomware", title: "Analyse de ransomware", cat: "cyber", badge: "Cyber",
    summary: "Analyse en cinq étapes d'un ransomware : rapport complet, outil de récupération en Python et liste d'indicateurs de compromission.",
    tags: ["Malware", "Python", "IOC"],
    kpis: [{ value: "5", label: "étapes d'analyse" }, { value: "14", label: "pages de rapport" }]
  },
  {
    slug: "poc-zero-trust", title: "PoC Zero Trust", cat: "cyber", badge: "Cyber",
    summary: "Preuve de concept d'une architecture Zero Trust : aucun accès implicite, chaque flux est vérifié.",
    tags: ["Zero Trust", "Segmentation", "NIST SP 800-207"]
  },
  {
    slug: "application-conteneurisee", title: "Application conteneurisée", cat: "devops", badge: "DevOps",
    summary: "Déploiement d'une application sous Docker avec supervision des métriques par Prometheus.",
    tags: ["Docker", "Prometheus"]
  },
  {
    slug: "worktrack-pro", title: "WorkTrack Pro", cat: "devops", badge: "DevOps",
    summary: "Application web de suivi du travail qui affiche l'état d'avancement du développement de chaque module.",
    tags: ["HTML", "JavaScript", "Kanban", "Suivi de projet"],
    facts: [["Contexte", "Les Menus Services"]]
  },
  {
    slug: "pointage-ocr", title: "Pointage OCR", cat: "devops", badge: "DevOps",
    summary: "Outil Python qui lit des fiches horaires manuscrites scannées en PDF et les exporte dans un Excel classé.",
    tags: ["Python", "Tesseract OCR", "Tkinter", "Excel", "Selenium"]
  },
  {
    slug: "silveremusic-stream", title: "SilvereMusic Stream", cat: "ux", badge: "UX design",
    summary: "Application Android de streaming musical basée sur l'API Internet Archive, avec une interface repensée en thème violet sombre.",
    tags: ["Android", "Java", "UI"],
    facts: [["Contexte", "Projet personnel"]],
    gallery: []
  },
  {
    slug: "chemin-du-dragon", title: "Chemin du Dragon", cat: "graph", badge: "Création graphique",
    summary: "Jeu de plateau en HTML5 avec adversaires contrôlés par IA et illustrations de dragons dessinées en SVG.",
    tags: ["SVG", "HTML5", "Game design"],
    facts: [["Contexte", "Projet personnel"]],
    gallery: []
  }
];
