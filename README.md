# Portfolio de Silvere Tchoudji

Site portfolio statique (HTML, CSS, JavaScript, sans framework ni étape de build), hébergé sur GitHub Pages.

Mon portfolio personnel regroupant mes compétences, expériences, projets et réalisations en informatique, développement web, Cloud, cybersécurité et DevOps.

En ligne : https://silvere23.github.io/silvere_tchoudji_portfolio/

## Arborescence

```
.
├── index.html              Page unique du site : portfolio, liste du blog (#blog) et lecture d'un article (#article-…)
├── blog/
│   ├── posts.json          Liste des articles : titre, date, thèmes, résumé
│   ├── *.md                Un fichier Markdown par article
│   └── img/                Images des articles
├── 404.html                Page d'erreur servie par GitHub Pages
├── robots.txt              Consignes pour les moteurs de recherche
├── sitemap.xml             Plan du site
├── .nojekyll               Désactive Jekyll : les fichiers sont servis tels quels
├── .gitignore
├── .editorconfig           Règles de formatage communes aux éditeurs
├── README.md
└── assets/
    ├── css/
    │   └── style.css       Tous les styles
    ├── js/
    │   ├── config.js       E-mail, GitHub, LinkedIn, chemin du CV, réglages des commentaires
    │   ├── common.js       Menu, thème, liens : chargé sur toutes les pages
    │   ├── blog.js         Liste et lecture des articles, commentaires
    │   ├── vendor/         Bibliothèques tierces (marked, DOMPurify)
    │   ├── theme.js        Mode jour / nuit appliqué avant l'affichage
    │   ├── main.js         Navigation, animations, filtres, formulaire
    │   └── background.js   Fond réseau animé de l'accueil
    ├── fonts/              Polices Space Grotesk et Inter, hébergées avec le site
    ├── img/
    │   ├── favicon.svg
    │   ├── photo.jpg       À ajouter : portrait carré, 640 px minimum
    │   └── projects/       Captures d'écran des projets (facultatif)
    └── docs/
        └── CV_Silvere_Tchoudji.pdf
```

## Modifier le site

| Je veux changer | Fichier |
|---|---|
| E-mail, GitHub, LinkedIn, CV | `assets/js/config.js` |
| Textes, projets, expériences | `index.html` |
| Couleurs, polices | variables `:root` (nuit) et `[data-theme="light"]` (jour) en haut de `assets/css/style.css` |
| Photo | remplacer `assets/img/photo.jpg` |
| CV | remplacer le PDF dans `assets/docs/` en gardant le même nom |

### Projets

- Chaque projet existe deux fois dans `index.html` : une diapositive du carrousel (`<article class="card pf">`) et une carte de la liste complète (`<article class="card pg">`). Pour en ajouter un, copier les deux blocs et régler `data-c` sur `cyber`, `devops`, `ux` ou `graph`.
- L'attribut `data-feat` sur une diapositive la fait apparaître dans le carrousel « Tous ». Sans lui, elle n'apparaît que dans sa catégorie.
- La durée d'affichage d'un projet se règle avec `DELAY` dans `assets/js/main.js`.
- **Ajouter une capture d'écran** : déposer l'image dans `assets/img/projects/`, puis ajouter `<img src="assets/img/projects/nom.jpg" alt="Description" loading="lazy">` à l'intérieur du bloc `<div class="media">` du projet. Elle recouvre le visuel généré et s'agrandit au clic.
- **Ajouter un lien** (démo, dépôt GitHub) : ajouter `<a class="btn sm" href="…" target="_blank" rel="noopener">Code source</a>` sous les étiquettes du projet.

## Blog

Le blog est intégré à la page principale. L'adresse `…/#blog` affiche la liste des articles, et `…/#article-mon-article` affiche l'article `blog/mon-article.md`. Ces adresses se partagent telles quelles.

### Publier un article

1. Écrire l'article en Markdown dans `blog/mon-article.md` (nom en minuscules, sans espaces ni accents). Le fichier `blog/modele-article.md` montre toute la mise en forme possible.
2. Ajouter une entrée en haut de `blog/posts.json` :

```json
{ "slug": "mon-article", "title": "Titre de l'article", "date": "2026-12-01", "tags": ["DevOps"], "summary": "Une phrase de résumé." }
```

`slug` doit être le nom du fichier sans `.md`. La date s'écrit année-mois-jour.

3. Envoyer sur GitHub : `git add . && git commit -m "Nouvel article" && git push`.

Les thèmes (`tags`) deviennent automatiquement des filtres sur la page du blog.

### Activer les réactions et les commentaires

Les commentaires passent par [giscus](https://giscus.app/fr), qui s'appuie sur les Discussions GitHub : pas de serveur, pas de publicité. Les visiteurs se connectent avec leur compte GitHub pour réagir ou commenter.

1. Dans le dépôt GitHub : Settings > General > Features, cocher **Discussions**.
2. Installer l'application giscus sur le dépôt : https://github.com/apps/giscus
3. Ouvrir https://giscus.app/fr, saisir le nom du dépôt, choisir la catégorie **Announcements**.
4. Recopier les valeurs affichées (`data-repo-id`, `data-category`, `data-category-id`) dans le bloc `giscus` de `assets/js/config.js`. Le nom du dépôt y est déjà.

Ces valeurs sont publiques : elles peuvent rester dans le dépôt.

## Tester en local

```bash
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000.

## Mettre en ligne

Le site est servi par GitHub Pages depuis la branche `main` de ce dépôt.

1. Le dépôt doit être **public** (Settings > General > Danger Zone > Change visibility). Avec un compte GitHub gratuit, Pages ne fonctionne pas sur un dépôt privé.
2. Dans Settings > Pages, choisir « Deploy from a branch », la branche `main` et le dossier `/ (root)`.
3. Après une à deux minutes, le site est en ligne à l'adresse indiquée en haut de ce fichier.

Chaque `git push` sur `main` met ensuite le site à jour.

## Bonnes pratiques suivies

- Contenu, styles et scripts séparés ; aucune dépendance à installer.
- Chemins relatifs et noms de fichiers en minuscules, sans espaces ni accents.
- Mode jour et nuit : suit le réglage du système, puis mémorise le choix du visiteur.
- Polices hébergées dans le dépôt : aucun appel à Google Fonts, donc pas de dépendance externe ni de données envoyées à un tiers.
- Scripts chargés en `defer`, animations coupées si l'utilisateur a activé « réduire les animations ».
- Balises `title`, `description`, Open Graph et lien canonique pour le référencement et le partage.
- Aucune donnée sensible dans le dépôt : pas de téléphone, pas de jeton, pas de mot de passe.
