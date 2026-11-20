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
   en        version anglaise : les champs indiqués ici remplacent ceux en français quand le site est en anglais
             (title, badge, hero, summary, tags, facts, kpis, links…). Le texte de la fiche va dans projets/en/<slug>.md
   ========================================================================== */
window.PROJECTS = [
  {
    slug: "asr-sdn", title: "ASR-SDN", cat: "cyber", featured: true, badge: "Projet de soutenance",
    en: {"badge": "Final-year project", "hero": "Cybersecurity · SDN networking", "summary": "SDN architecture for detecting, segmenting and automatically responding to cyberattacks on an enterprise network. Suricata detects, a Python engine decides, ONOS isolates or blocks the host. Six scenarios validated in the lab, with an average response time of about 0.09 s.", "facts": [["Context", "Final-year project, Master's in Cybersecurity and Cloud Computing (IPSSI)"], ["Role", "Design, lab build and validation"], ["Case study", "Les Menus Services network"]], "kpis": [{"value": "≈ 0.09 s", "label": "average response time"}, {"value": "6", "label": "validated scenarios"}, {"value": "3", "label": "virtual machines"}]},
    hero: "Cybersécurité · Réseau SDN",
    summary: "Architecture SDN pour la détection, la segmentation et la réponse automatisée aux cyberattaques en réseau d'entreprise. Suricata détecte, un moteur Python décide, ONOS isole ou bloque l'hôte. Six scénarios validés en lab, temps de réponse moyen d'environ 0,09 s.",
    tags: ["ONOS", "Suricata", "Python", "Mininet", "Open vSwitch"],
    facts: [["Contexte", "Projet de soutenance, Mastère Cybersécurité et Cloud Computing (IPSSI)"], ["Rôle", "Conception, mise en œuvre du lab et validation"], ["Cas d'étude", "Réseau de Les Menus Services"]],
    kpis: [{ value: "≈ 0,09 s", label: "temps de réponse moyen" }, { value: "6", label: "scénarios validés" }, { value: "3", label: "machines virtuelles" }]
  },
  {
    slug: "site-web-poleit", title: "Site web PoleIT", cat: "devops", featured: true, badge: "Déploiement",
    en: {"title": "PoleIT website", "badge": "Deployment", "hero": "DevOps · Kubernetes", "summary": "A showcase website, deployed with Kubernetes and Docker, then monitored with Prometheus and Grafana to track its health continuously.", "facts": [["Role", "Website build, deployment and monitoring"]]},
    hero: "DevOps · Kubernetes",
    summary: "Création d'un site vitrine, déployé avec Kubernetes et Docker, puis supervisé avec Prometheus et Grafana pour suivre son état en continu.",
    tags: ["Kubernetes", "Docker", "Prometheus", "Grafana"],
    facts: [["Rôle", "Création du site, déploiement et supervision"]]
  },
  {
    slug: "maquettes-sims", title: "Maquettes SIMS", cat: "ux", featured: true, badge: "En entreprise",
    en: {"title": "SIMS mockups", "badge": "In-house", "hero": "UX design · Figma", "summary": "Wireframing and prototyping in Figma of the new SIMS application interfaces at Les Menus Services, from user journeys to final screens.", "tags": ["Figma", "Prototyping", "User journeys", "Design system"], "facts": [["Context", "Les Menus Services"], ["Role", "UX / UI designer"], ["Scope", "Food offer"]]},
    hero: "UX design · Figma",
    summary: "Maquettage et prototypage sous Figma des interfaces de la nouvelle application SIMS chez Les Menus Services, du parcours utilisateur aux écrans finaux.",
    tags: ["Figma", "Prototypage", "Parcours utilisateur", "Design system"],
    facts: [["Contexte", "Les Menus Services"], ["Rôle", "UX / UI designer"], ["Périmètre", "Offre alimentaire"]],
    gallery: []
  },
  {
    slug: "refonte-sims", title: "Refonte SIMS", cat: "devops", featured: true, badge: "En entreprise",
    en: {"title": "SIMS redesign", "badge": "In-house", "hero": "DevOps · CI/CD", "summary": "Containerisation, deployment and monitoring of the SIMS project applications at Les Menus Services, with a CI/CD pipeline and monitoring dashboards.", "facts": [["Context", "Les Menus Services"], ["Role", "DevOps"]]},
    hero: "DevOps · CI/CD",
    summary: "Conteneurisation, déploiement et supervision des applications du projet SIMS chez Les Menus Services, avec une chaîne CI/CD et des tableaux de bord de suivi.",
    tags: ["Docker", "CI/CD", "Prometheus", "Grafana"],
    facts: [["Contexte", "Les Menus Services"], ["Rôle", "DevOps"]]
  },
  {
    slug: "application-mawemba", title: "Application Mawemba", cat: "ux", featured: true, badge: "Application mobile",
    en: {"title": "Mawemba app", "badge": "Mobile app", "hero": "UX design · Mobile", "summary": "Interface design for the Mawemba mobile app: UI, wireframing and prototyping in Figma.", "tags": ["Figma", "Mobile UI", "Prototyping"], "facts": [["Role", "UI / UX designer"], ["Platform", "Mobile app"]]},
    hero: "UX design · Mobile",
    summary: "Conception des interfaces de l'application mobile Mawemba : UI, maquettage et prototypage sous Figma.",
    tags: ["Figma", "UI mobile", "Prototypage"],
    facts: [["Rôle", "UI / UX designer"], ["Support", "Application mobile"]],
    gallery: []
  },
  {
    slug: "identite-graphique-d-entreprises", title: "Identité graphique d'entreprises", cat: "graph", featured: true, badge: "Identité visuelle",
    en: {"title": "Brand identities", "badge": "Visual identity", "hero": "Graphic design", "summary": "Visual identities and communication materials designed for businesses.", "tags": ["Illustrator", "Photoshop", "InDesign", "Visual identity"], "facts": [["Role", "Graphic designer"], ["Deliverables", "Logos, brand guidelines, communication materials"]]},
    hero: "Création graphique",
    summary: "Création d'identités visuelles et de supports de communication pour des entreprises.",
    tags: ["Illustrator", "Photoshop", "InDesign", "Identité visuelle"],
    facts: [["Rôle", "Designer graphique"], ["Livrables", "Logos, chartes, supports de communication"]],
    gallery: [], palette: [], fonts: []
  },
  {
    slug: "hardening-de-serveurs", title: "Hardening de serveurs", cat: "cyber", badge: "Durcissement",
    en: {"title": "Server hardening", "badge": "Hardening", "summary": "Hardening of Linux and Windows Server systems: reducing the attack surface and enforcing security policies."},
    summary: "Durcissement de systèmes Linux et Windows Server : réduction de la surface d'attaque et mise en place de politiques de sécurité.",
    tags: ["Linux", "Windows Server", "Active Directory"]
  },
  {
    slug: "pentest-en-lab", title: "Pentest en lab", cat: "cyber", badge: "Test d'intrusion",
    en: {"title": "Lab penetration testing", "badge": "Penetration test", "summary": "Penetration tests in a lab environment: reconnaissance, exploitation and vulnerability reporting. Example: the TryHackMe Ignite room, through the Fuel CMS CVE-2018-16763 vulnerability."},
    summary: "Tests d'intrusion en environnement de lab : reconnaissance, exploitation et rapport de vulnérabilités. Exemple : salle Ignite de TryHackMe, via la faille CVE-2018-16763 de Fuel CMS.",
    tags: ["Pentest", "TryHackMe", "Nmap", "Python"]
  },
  {
    slug: "reverse-engineering", title: "Reverse engineering", cat: "cyber", badge: "Analyse de binaires",
    en: {"badge": "Binary analysis", "summary": "Binary analysis to understand how applications work internally.", "tags": ["Binary analysis", "Disassembly"]},
    summary: "Analyse de binaires pour comprendre le fonctionnement interne d'applications.",
    tags: ["Analyse de binaires", "Désassemblage"]
  },
  {
    slug: "analyse-de-ransomware", title: "Analyse de ransomware", cat: "cyber", badge: "Analyse de malware",
    en: {"title": "Ransomware analysis", "badge": "Malware analysis", "summary": "Five-step analysis of a ransomware sample: full report, Python recovery tool and list of indicators of compromise.", "kpis": [{"value": "5", "label": "analysis steps"}, {"value": "14", "label": "report pages"}]},
    summary: "Analyse en cinq étapes d'un ransomware : rapport complet, outil de récupération en Python et liste d'indicateurs de compromission.",
    tags: ["Malware", "Python", "IOC"],
    kpis: [{ value: "5", label: "étapes d'analyse" }, { value: "14", label: "pages de rapport" }]
  },
  {
    slug: "poc-zero-trust", title: "PoC Zero Trust", cat: "cyber", badge: "Architecture",
    en: {"title": "Zero Trust PoC", "badge": "Architecture", "summary": "Proof of concept of a Zero Trust architecture: no implicit access, every flow is verified."},
    summary: "Preuve de concept d'une architecture Zero Trust : aucun accès implicite, chaque flux est vérifié.",
    tags: ["Zero Trust", "Segmentation", "NIST SP 800-207"]
  },
  {
    slug: "application-conteneurisee", title: "Application conteneurisée", cat: "devops", badge: "DevOps",
    en: {"title": "Containerised application", "badge": "DevOps", "summary": "Deployment of an application with Docker, with metrics monitored by Prometheus."},
    summary: "Déploiement d'une application sous Docker avec supervision des métriques par Prometheus.",
    tags: ["Docker", "Prometheus"]
  },
  {
    slug: "worktrack-pro", title: "WorkTrack Pro", cat: "devops", badge: "DevOps",
    en: {"badge": "DevOps", "summary": "Web app that tracks the development progress of each application module.", "tags": ["HTML", "JavaScript", "Kanban", "Project tracking"], "facts": [["Context", "Les Menus Services"]]},
    summary: "Application web de suivi du travail qui affiche l'état d'avancement du développement de chaque module.",
    tags: ["HTML", "JavaScript", "Kanban", "Suivi de projet"],
    facts: [["Contexte", "Les Menus Services"]]
  },
  {
    slug: "pointage-ocr", title: "Pointage OCR", cat: "devops", badge: "DevOps",
    en: {"title": "Timesheet OCR", "badge": "DevOps", "summary": "Python tool that reads handwritten timesheets scanned as PDF and exports them to a sorted Excel file."},
    summary: "Outil Python qui lit des fiches horaires manuscrites scannées en PDF et les exporte dans un Excel classé.",
    tags: ["Python", "Tesseract OCR", "Tkinter", "Excel", "Selenium"]
  },
  {
    slug: "silveremusic-stream", title: "SilvereMusic Stream", cat: "ux", badge: "UX design",
    en: {"badge": "UX design", "summary": "Android music streaming app built on the Internet Archive API, with a redesigned dark violet interface.", "facts": [["Context", "Personal project"]]},
    summary: "Application Android de streaming musical basée sur l'API Internet Archive, avec une interface repensée en thème violet sombre.",
    tags: ["Android", "Java", "UI"],
    facts: [["Contexte", "Projet personnel"]],
    gallery: []
  },
  {
    slug: "chemin-du-dragon", title: "Chemin du Dragon", cat: "graph", badge: "Création graphique",
    en: {"title": "Dragon Path", "badge": "Graphic design", "summary": "HTML5 board game with AI-controlled opponents and dragon artwork drawn in SVG.", "facts": [["Context", "Personal project"]]},
    summary: "Jeu de plateau en HTML5 avec adversaires contrôlés par IA et illustrations de dragons dessinées en SVG.",
    tags: ["SVG", "HTML5", "Game design"],
    facts: [["Contexte", "Projet personnel"]],
    gallery: []
  }
];
