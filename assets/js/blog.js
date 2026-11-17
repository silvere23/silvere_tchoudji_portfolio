// Blog intégré à la page : #blog affiche la liste des articles, #article-nom-du-fichier affiche un article.
// Les articles sont des fichiers Markdown dans blog/, déclarés dans blog/posts.json. Dépend de common.js.
"use strict";
(() => {
  const home = document.getElementById("view-home"), vList = document.getElementById("view-blog"), vArticle = document.getElementById("view-article");
  const list = document.getElementById("posts"), tagsBox = document.getElementById("tags"), empty = document.getElementById("empty");
  const body = document.getElementById("a-body"), baseTitle = document.title;
  const fmtDate = d => new Date(d + "T00:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const fail = (box, msg) => { box.textContent = ""; box.appendChild(el("p", "blog-empty", msg)); };

  // la liste des articles n'est chargée qu'une fois, à la première visite du blog
  let loading = null;
  const loadPosts = () => loading || (loading = fetch("blog/posts.json", { cache: "no-cache" })
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(p => p.sort((a, b) => b.date.localeCompare(a.date))));          // du plus récent au plus ancien

  /* ---------- liste des articles ---------- */
  let current = "", built = false;
  async function showList() {
    let posts;
    try { posts = await loadPosts(); }
    catch (e) { loading = null; return fail(list, "Impossible de charger les articles. En local, le site doit être ouvert via un serveur (voir le README)."); }
    const render = () => {
      list.textContent = "";
      const shown = posts.filter(p => !current || (p.tags || []).includes(current));
      shown.forEach(p => {
        const a = el("a", "card post"); a.href = "#article-" + p.slug;
        const t = el("div", "post-tags"); (p.tags || []).forEach(x => t.appendChild(el("span", "", x)));
        a.append(t, el("h2", "", p.title), el("p", "", p.summary || ""), el("span", "post-meta", fmtDate(p.date)));
        list.appendChild(a);
      });
      empty.hidden = shown.length > 0;
    };
    if (!built) {
      built = true;
      ["", ...new Set(posts.flatMap(p => p.tags || []))].forEach(tag => {
        const b = el("button", tag === "" ? "on" : "", tag || "Tous"); b.type = "button";
        b.addEventListener("click", () => { current = tag; [...tagsBox.children].forEach(x => x.classList.toggle("on", x === b)); render(); });
        tagsBox.appendChild(b);
      });
    }
    render();
  }

  /* ---------- lecture d'un article ---------- */
  async function showArticle(slug) {
    const title = document.getElementById("a-title"), meta = document.getElementById("a-meta"), tags = document.getElementById("a-tags");
    const box = document.getElementById("comments");
    tags.textContent = ""; meta.textContent = ""; body.textContent = ""; title.textContent = "Chargement…"; box.hidden = true;
    let post;
    try { post = (await loadPosts()).find(p => p.slug === slug); }
    catch (e) { loading = null; title.textContent = "Article indisponible"; return fail(body, "Impossible de charger les articles."); }
    if (!post) { title.textContent = "Article introuvable"; return fail(body, "Cet article n'existe pas ou a été déplacé."); }
    title.textContent = post.title; document.title = post.title + " | Silvere Tchoudji";
    (post.tags || []).forEach(x => tags.appendChild(el("span", "", x)));
    try {
      const r = await fetch("blog/" + encodeURIComponent(post.slug) + ".md", { cache: "no-cache" });
      if (!r.ok) throw new Error(r.status);
      const md = await r.text();
      meta.textContent = fmtDate(post.date) + " · " + Math.max(1, Math.round(md.split(/\s+/).length / 200)) + " min de lecture";
      // Markdown converti en HTML, puis nettoyé avant d'être inséré dans la page
      body.innerHTML = DOMPurify.sanitize(marked.parse(md));
      body.querySelectorAll("a[href^='http']").forEach(a => { a.target = "_blank"; a.rel = "noopener"; });
    } catch (e) { return fail(body, "Impossible de charger cet article."); }
    box.hidden = false; comments(post.slug);
  }

  /* ---------- réactions et commentaires (giscus, s'appuie sur les Discussions GitHub) ---------- */
  const theme = () => document.documentElement.dataset.theme === "light" ? "light" : "dark";
  function comments(slug) {
    const box = document.getElementById("giscus"), g = (typeof CONFIG !== "undefined" && CONFIG.giscus) || {};
    box.textContent = "";
    if (!g.repo || !g.repoId || !g.categoryId) {
      return box.appendChild(el("p", "blog-empty", "Les réactions et les commentaires seront disponibles dès que le blog sera relié à GitHub."));
    }
    const s = document.createElement("script");
    s.src = "https://giscus.app/client.js"; s.async = true; s.crossOrigin = "anonymous";
    const attrs = { repo: g.repo, "repo-id": g.repoId, category: g.category, "category-id": g.categoryId, mapping: "specific", term: slug, strict: "1",
      "reactions-enabled": "1", "emit-metadata": "0", "input-position": "top", theme: theme(), lang: "fr", loading: "lazy" };
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute("data-" + k, v));
    box.appendChild(s);
  }
  // le bloc de commentaires suit le mode jour / nuit
  new MutationObserver(() => {
    const frame = document.querySelector("iframe.giscus-frame");
    if (frame) frame.contentWindow.postMessage({ giscus: { setConfig: { theme: theme() } } }, "https://giscus.app");
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  /* ---------- navigation : quelle vue afficher selon la fin de l'adresse ---------- */
  const vProject = document.getElementById("view-project");
  let homeY = 0;
  function route() {
    const hash = decodeURIComponent(location.hash.slice(1));
    const onList = hash === "blog", onArticle = hash.startsWith("article-"), onProject = hash.startsWith("projet/");
    const away = onList || onArticle || onProject;
    const wasAway = home.hidden;
    if (away && !wasAway) homeY = scrollY;                       // position sur l'accueil, pour y revenir
    home.hidden = away; vList.hidden = !onList; vArticle.hidden = !onArticle; vProject.hidden = !onProject;
    document.querySelectorAll("#links a").forEach(a => a.classList.toggle("active",
      (onList || onArticle) ? a.getAttribute("href") === "#blog" : onProject && a.getAttribute("href") === "#projets"));
    if (away) {
      scrollTo(0, 0);
      if (onList) { document.title = "Blog | Silvere Tchoudji"; showList(); }
      else if (onArticle) showArticle(hash.slice(8));
      else ProjectView.show(hash.slice(7));
    } else if (wasAway) {
      // retour au portfolio : on recalcule les éléments qui dépendent de la taille, puis on va à la section demandée
      document.title = baseTitle;
      document.querySelectorAll("#links a").forEach(a => a.classList.remove("active"));
      dispatchEvent(new Event("resize"));
      const target = hash && document.getElementById(hash);
      if ((!hash || hash === "projets") && homeY) scrollTo(0, hash === "projets" ? Math.max(homeY, 0) : homeY);
      else if (target) target.scrollIntoView(); else scrollTo(0, 0);
    }
  }
  addEventListener("hashchange", route);
  route();
})();
