// Pages par catégorie : #projets/devops, #projets/cyber, #projets/ux, #projets/graph.
// Chaque catégorie a sa propre mise en page. Les projets viennent de projets/projets.js (champ cat).
"use strict";
window.CategoryView = (() => {
  const root = document.getElementById("c-root");
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const EN = LANG === "en";
  const pick = o => (EN ? o.en : o.fr);

  // textes de présentation de chaque catégorie
  const CAT = {
    devops: { name: "DevOps", fr: { title: "DevOps & automatisation", intro: "Conteneuriser, déployer, superviser : des projets où l'infrastructure se décrit en code et où chaque mise en production est reproductible." },
              en: { title: "DevOps & automation", intro: "Containerise, deploy, monitor: projects where infrastructure is described as code and every release is reproducible." } },
    cyber:  { name: "Cyber", fr: { title: "Cybersécurité", intro: "Détecter, analyser, répondre : audits, analyses de menaces et architectures pensées pour résister aux attaques." },
              en: { title: "Cybersecurity", intro: "Detect, analyse, respond: audits, threat analyses and architectures built to withstand attacks." } },
    ux:     { name: "UX design", fr: { title: "UX design", intro: "Comprendre les utilisateurs, simplifier leurs parcours et dessiner des interfaces claires, du premier croquis au prototype." },
              en: { title: "UX design", intro: "Understanding users, simplifying their journeys and designing clear interfaces, from the first sketch to the prototype." } },
    graph:  { name: t("Création graphique"), fr: { title: "Création graphique", intro: "Identités visuelles, illustrations et supports de communication." },
              en: { title: "Graphic design", intro: "Visual identities, illustrations and communication materials." } }
  };
  const ORDER = ["devops", "cyber", "ux", "graph"];

  const projectsOf = cat => (window.PROJECTS || []).map(loc).filter(p => p.cat === cat);
  const go = p => { location.hash = "projet/" + p.slug; };
  const link = (p, cls, label) => { const a = el("a", cls); a.href = "#projet/" + p.slug; a.setAttribute("aria-label", t("Voir le projet") + " " + p.title); if (label) { a.textContent = label; a.insertAdjacentHTML("beforeend", ARROW); } return a; };
  const visual = (p, cls) => { const m = el("div", "media " + (cls || "")); m.dataset.c = p.cat; m.appendChild(projectVisual(p)); return m; };
  const tools = list => [...new Set(list.flatMap(p => p.tags || []))];

  // ---------- DevOps : terminal et déploiements ----------
  function devops(list, c) {
    const head = el("div", "cv-term");
    const bar = el("div", "cv-term-bar"); bar.append(el("i"), el("i"), el("i"), el("span", "", "silvere@portfolio: ~/projets/devops"));
    const body = el("div", "cv-term-body");
    const line = (cls, text, delay) => { const l = el("p", "cv-line " + cls, text); l.style.setProperty("--d", delay + "s"); l.style.setProperty("--n", text.length); return l; };
    body.append(line("cmd", "$ ls ~/projets/devops", 0), line("out", list.map(p => p.slug + "/").join("   "), 1.2), line("cmd", "$ cat README.md", 1.6));
    const readme = el("div", "cv-readme"); readme.style.setProperty("--d", "2.6s");
    readme.append(el("h1", "", c.title), el("p", "", c.intro));
    body.appendChild(readme);
    head.append(bar, body);

    const stats = el("div", "cv-stats");
    [[list.length, t("projets")], [tools(list).length, t("outils")], ["CI/CD", t("au quotidien")]].forEach(([v, l]) => { const s = el("div"); s.append(el("b", "", v), el("span", "", l)); stats.appendChild(s); });

    const stack = el("div", "cv-stack"); stack.appendChild(el("span", "cv-label", "--stack"));
    tools(list).forEach(x => stack.appendChild(el("code", "", x)));

    const deploys = el("div", "cv-deploys");
    list.forEach((p, i) => {
      const d = el("article", "cv-deploy"); d.dataset.c = p.cat; d.tabIndex = -1;
      const top = el("div", "cv-deploy-top");
      top.append(el("span", "cv-dot"), el("code", "", "deploy/" + p.slug), el("span", "cv-tag", p.badge || ""));
      const pipe = el("ol", "cv-pipe");
      (p.tags || []).forEach(x => pipe.appendChild(el("li", "", x)));
      d.append(top, el("h3", "", p.title), el("p", "", p.summary), pipe, link(p, "cv-open", t("Voir le projet")));
      d.style.setProperty("--i", i);
      d.addEventListener("click", e => { if (!e.target.closest("a")) go(p); });
      deploys.appendChild(d);
    });
    return [head, stats, stack, deploys];
  }

  // ---------- Cyber : centre de sécurité et rapports ----------
  function cyber(list, c) {
    const head = el("div", "cv-soc");
    const status = el("div", "cv-soc-status");
    status.append(el("span", "cv-live", t("Surveillance active")), el("span", "", list.length + " " + t("rapports")), el("span", "", tools(list).length + " " + t("outils")));
    head.append(status, el("h1", "", c.title), el("p", "cv-intro", c.intro), el("div", "cv-scan"));

    const table = el("div", "cv-reports");
    const hr = el("div", "cv-report cv-report-head");
    [t("Réf."), t("Projet"), t("Type"), t("Outils")].forEach(x => hr.appendChild(el("span", "", x)));
    table.appendChild(hr);
    list.forEach((p, i) => {
      const r = el("article", "cv-report"); r.dataset.c = p.cat;
      const id = el("code", "cv-ref", "RPT-" + String(i + 1).padStart(3, "0"));
      const main = el("div", "cv-report-main"); const h = el("h3"); h.appendChild(link(p, "", null)); h.firstChild.textContent = p.title;
      main.append(h, el("p", "", p.summary));
      if (p.kpis && p.kpis.length) { const k = el("div", "cv-kpis"); p.kpis.forEach(x => { const s = el("span"); s.append(el("b", "", x.value), " " + x.label); k.appendChild(s); }); main.appendChild(k); }
      const tg = el("div", "cv-tools"); (p.tags || []).forEach(x => tg.appendChild(el("span", "", x)));
      r.append(id, main, el("span", "cv-type", p.badge || ""), tg);
      r.addEventListener("click", e => { if (!e.target.closest("a")) go(p); });
      table.appendChild(r);
    });
    return [head, table];
  }

  // ---------- UX : études de cas aérées ----------
  function ux(list, c) {
    const head = el("div", "cv-ux-head");
    head.append(el("span", "cv-kicker", t("Études de cas")), el("h1", "", c.title), el("p", "cv-intro", c.intro));
    const cases = el("div", "cv-cases");
    list.forEach((p, i) => {
      const a = el("article", "cv-case" + (i % 2 ? " flip" : "")); a.dataset.c = p.cat;
      const frame = el("div", "cv-device"); const scr = el("div", "cv-screen"); scr.appendChild(visual(p, "cv-shot")); frame.appendChild(scr);
      const txt = el("div", "cv-case-text");
      txt.append(el("span", "cv-num", String(i + 1).padStart(2, "0")), el("h2", "", p.title), el("p", "", p.summary));
      const meta = el("dl", "cv-meta"); (p.facts || []).slice(0, 3).forEach(([k, v]) => { const d = el("div"); d.append(el("dt", "", k), el("dd", "", v)); meta.appendChild(d); });
      if (meta.children.length) txt.appendChild(meta);
      txt.appendChild(link(p, "btn cv-cta", t("Lire l'étude de cas")));
      a.append(frame, txt);
      a.addEventListener("click", e => { if (!e.target.closest("a")) go(p); });
      cases.appendChild(a);
    });
    return [head, cases];
  }

  // ---------- Création graphique : éditorial et mosaïque ----------
  function graph(list, c) {
    const head = el("div", "cv-edito");
    const big = el("h1", "cv-giant"); c.title.split(" ").forEach((w, i) => { const s = el("span", "", w); s.style.setProperty("--i", i); big.appendChild(s); });
    head.append(el("span", "cv-kicker", t("Portfolio")), big, el("p", "cv-intro", c.intro));
    // une tuile par image des galeries ; un projet sans image garde une tuile avec son illustration
    const tiles = [];
    list.forEach(p => {
      const imgs = p.gallery || [];
      if (!imgs.length) tiles.push({ p });
      imgs.forEach(g => tiles.push({ p, img: g }));
    });
    const wall = el("div", "cv-wall" + (tiles.length < 4 ? " few" : ""));
    wall.style.setProperty("--n", Math.min(tiles.length, 3));
    tiles.forEach((tile, i) => {
      const f = el("figure", "cv-tile" + (tiles.length >= 4 && i % 5 === 0 ? " big" : "")); f.dataset.c = tile.p.cat;
      if (tile.img) { const im = new Image(); im.src = tile.img.src; im.alt = tile.img.caption || tile.p.title; im.loading = "lazy"; im.decoding = "async"; f.appendChild(im); }
      else f.appendChild(visual(tile.p, "cv-tile-art"));
      const cap = el("figcaption"); cap.append(el("b", "", tile.p.title), el("span", "", tile.img && tile.img.caption ? tile.img.caption : (tile.p.badge || "")));
      f.appendChild(cap);
      f.addEventListener("click", () => go(tile.p));
      f.tabIndex = 0; f.setAttribute("role", "link"); f.setAttribute("aria-label", t("Voir le projet") + " " + tile.p.title);
      f.addEventListener("keydown", e => { if (e.key === "Enter") go(tile.p); });
      wall.appendChild(f);
    });
    return [head, wall];
  }

  // ---------- liens vers les autres catégories ----------
  function others(cat) {
    const n = el("nav", "cv-others"); n.setAttribute("aria-label", t("Autres catégories"));
    n.appendChild(el("span", "", t("Explorer aussi")));
    ORDER.filter(k => k !== cat).forEach(k => {
      const a = el("a", "cv-other"); a.href = "#projets/" + k; a.dataset.c = k;
      const ico = projectVisual({ slug: "", cat: k }); ico.setAttribute("class", "ico");
      a.append(ico, pick(CAT[k]).title, el("small", "", projectsOf(k).length + " " + t("projets")));
      n.appendChild(a);
    });
    return n;
  }

  const BUILD = { devops, cyber, ux, graph };
  function show(cat) {
    root.textContent = "";
    const info = CAT[cat];
    if (!info) { root.appendChild(el("h1", "", t("Projet introuvable"))); return; }
    const c = pick(info), list = projectsOf(cat);
    document.title = c.title + " | Silvere Tchoudji";
    document.getElementById("view-cat").dataset.cat = cat;
    root.dataset.c = cat;
    BUILD[cat](list, c).forEach(x => root.appendChild(x));
    root.appendChild(others(cat));
  }
  return { show, has: cat => cat in CAT, title: cat => pick(CAT[cat]).title };
})();
