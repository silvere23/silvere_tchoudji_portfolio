# Portfolio de Silvere Tchoudji

Site portfolio statique (HTML, CSS, JavaScript, sans framework ni étape de build), hébergé sur GitHub Pages.

Mon portfolio personnel regroupant mes compétences, expériences, projets et réalisations en informatique, développement web, Cloud, cybersécurité et DevOps.

En ligne : https://silvere23.github.io/silvere_tchoudji_portfolio/

## Arborescence

```
.
├── index.html              Page unique du site : portfolio, blog (#blog, #article-…) et fiches projet (#projet/…)
├── projets/
│   ├── projets.js          Liste de tous les projets : c'est le fichier à modifier pour en ajouter un
│   ├── *.md                Texte de la fiche de chaque projet
│   └── img/<slug>/         Images d'un projet (galerie, couverture)
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
    │   ├── projects.js     Construit les cartes, le carrousel, le diaporama et le compteur
│   ├── project-view.js Fiche projet, mise en page selon le type (tech, ux, graph)
│   ├── blog.js         Liste et lecture des articles, commentaires, navigation entre les vues
    │   ├── vendor/         Bibliothèques tierces (marked, DOMPurify)
    │   ├── theme.js        Mode jour / nuit appliqué avant l'affichage
    │   ├── main.js         Navigation, animations, filtres, formulaire
    │   └── background.js   Fond réseau animé de l'accueil
    ├── fonts/              Polices Space Grotesk et Inter, hébergées avec le site
    ├── img/
    │   ├── favicon.svg
    │   ├── photo.jpg       À ajouter : portrait carré, 640 px minimum
    └── docs/
        └── CV_Silvere_Tchoudji.pdf
```

## Modifier le site

| Je veux changer | Fichier |
|---|---|
| E-mail, GitHub, LinkedIn, CV | `assets/js/config.js` |
| Projets | `projets/projets.js` et `projets/<slug>.md` |
| Textes, expériences | `index.html` |
| Couleurs, polices | variables `:root` (nuit) et `[data-theme="light"]` (jour) en haut de `assets/css/style.css` |
| Photo | remplacer `assets/img/photo.jpg` |
| CV | remplacer le PDF dans `assets/docs/` en gardant le même nom |

### Projets

Tous les projets sont décrits dans `projets/projets.js`. Les cartes, le carrousel, le diaporama de l'accueil et le compteur « +16 projets » sont construits à partir de cette liste, il n'y a rien à toucher dans `index.html`.

**Ajouter un projet**

1. Dans `projets/projets.js`, copier un bloc `{ … }` et changer ses valeurs. Le début du fichier explique chaque champ.
2. Écrire la fiche dans `projets/<slug>.md`, en Markdown (titres `##`, listes, liens). Ce fichier est facultatif.
3. Déposer les images dans `projets/img/<slug>/`, puis les déclarer dans `gallery` :
   ```js
   gallery: [
     { src: "projets/img/mon-projet/logo.png", caption: "Logo principal", wide: true },
     { src: "projets/img/mon-projet/carte.jpg", caption: "Carte de visite" }
   ]
   ```
   `wide: true` affiche l'image sur toute la largeur. Les images s'agrandissent au clic.

**Les trois mises en page**

| Type | Catégories | Contenu de la fiche |
|---|---|---|
| `tech` | cyber, devops | illustration, chiffres clés (`kpis`), texte, captures si `gallery` est rempli, liens |
| `ux` | ux | illustration, texte, puis galerie « Maquettes et écrans » |
| `graph` | graph | galerie en grand d'abord, palette (`palette`), typographies (`fonts`), puis la démarche |

Le type est déduit de la catégorie. On peut le forcer avec `type: "graph"`, par exemple pour un projet DevOps qui doit surtout montrer des visuels.

**Autres réglages**

- `featured: true` met le projet en avant dans le carrousel « Tous » et dans le diaporama de l'accueil (`hero` donne son sous-titre).
- `cover` remplace l'illustration de la carte par une image.
- Les illustrations des cartes sont dessinées en SVG dans `index.html` (symboles `a-<slug>`), générées par `tools/illustrations.py`. Un projet sans illustration affiche l'icône de sa catégorie.
- La durée d'affichage d'un projet dans le carrousel se règle avec `DELAY` dans `assets/js/main.js`.

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
