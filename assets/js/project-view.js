// Fiche d'un projet : #projet/slug. La mise en page dépend du type du projet (tech, ux, graph).
// Données : projets/projets.js ; texte : projets/slug.md (facultatif). Appelé par le routeur de blog.js.
"use strict";
window.ProjectView = (() => {
  const root = document.getElementById("p-root");
  const NAMES = { cyber: t("Cybersécurité"), devops: "DevOps", ux: "UX design", graph: t("Création graphique") };
  const TYPES = { tech: t("Projet technique"), ux: t("Projet UX"), graph: t("Projet graphique") };
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const section = (title, cls) => { const s = el("section", "p-sec " + (cls || "")); if (title) s.appendChild(el("h2", "p-h2", title)); return s; };
  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>';

  // ---------- blocs communs ----------
  function head(p) {
    const h = el("div", "p-head");
    const badge = el("span", "pf-badge"); const ico = projectVisual({ slug: "", cat: p.cat }); ico.setAttribute("class", "ico");
    badge.append(ico, NAMES[p.cat] || p.badge || "");
    h.append(badge, el("h1", "", p.title), el("p", "p-lead", p.summary));
    const tags = el("div", "pf-tags"); (p.tags || []).forEach(t => tags.appendChild(el("span", "", t))); h.appendChild(tags);
    return h;
  }
  function facts(p) {
    const rows = [[t("Type"), TYPES[PROJECT_TYPE(p)]], ...(p.facts || [])];
    const dl = el("dl", "p-facts");
    rows.forEach(([k, v]) => { const d = el("div"); d.append(el("dt", "", k), el("dd", "", v)); dl.appendChild(d); });
    return dl;
  }
  function hero(p) { const m = el("div", "media p-hero"); m.dataset.c = p.cat; m.appendChild(projectVisual(p, true)); return m; }
  function kpis(p) {
    if (!p.kpis || !p.kpis.length) return null;
    const d = el("div", "p-kpis");
    p.kpis.forEach(k => { const c = el("div", "card p-kpi"); c.append(el("b", "", k.value), el("span", "", k.label)); d.appendChild(c); });
    return d;
  }
  function links(p) {
    if (!p.links || !p.links.length) return null;
    const d = el("div", "p-links");
    p.links.forEach(l => { const a = el("a", "btn", l.label); a.href = l.url; a.target = "_blank"; a.rel = "noopener"; a.insertAdjacentHTML("beforeend", ARROW); d.appendChild(a); });
    return d;
  }
  function gallery(p, cls) {
    const items = p.gallery || [], g = el("div", "p-gallery " + (cls || ""));
    if (!items.length) {
      g.className = "p-gallery";                                 // pas de colonnes tant qu'il n'y a pas d'images
      const e = el("div", "p-empty card");
      e.append(el("b", "", t("Visuels à venir")), el("span", "", t("Les images de ce projet seront ajoutées prochainement.")));
      g.appendChild(e); return g;
    }
    items.forEach(it => {
      const f = el("figure", it.wide ? "wide" : ""); f.dataset.c = p.cat;
      const img = new Image(); img.src = it.src; img.alt = it.caption || p.title; img.loading = "lazy"; img.decoding = "async";
      f.appendChild(img); if (it.caption) f.appendChild(el("figcaption", "", it.caption));
      g.appendChild(f);
    });
    return g;
  }
  function palette(p) {
    if (!p.palette || !p.palette.length) return null;
    const s = section(t("Palette de couleurs")), d = el("div", "p-palette");
    p.palette.forEach(c => { const sw = el("div", "p-swatch"); const chip = el("i"); chip.style.background = c.hex; sw.append(chip, el("b", "", c.name || c.hex), el("span", "", c.hex)); d.appendChild(sw); });
    s.appendChild(d); return s;
  }
  function fonts(p) {
    if (!p.fonts || !p.fonts.length) return null;
    const s = section(t("Typographies")), d = el("div", "p-fonts");
    p.fonts.forEach(f => { const c = el("div", "card p-font"); const big = el("span", "p-aa", "Aa"); big.style.fontFamily = `"${f.name}", var(--display)`; c.append(big, el("b", "", f.name), el("span", "", f.use || "")); d.appendChild(c); });
    s.appendChild(d); return s;
  }
  function nav(p, list) {
    const i = list.indexOf(p), prev = list[(i - 1 + list.length) % list.length], next = list[(i + 1) % list.length];
    const n = el("nav", "p-nav"); n.setAttribute("aria-label", t("Autres projets"));
    [[prev, t("Projet précédent"), "prev"], [next, t("Projet suivant"), "next"]].forEach(([q, label, cls]) => {
      const a = el("a", "card " + cls); a.href = "#projet/" + q.slug; a.append(el("span", "", label), el("b", "", q.title)); n.appendChild(a);
    });
    return n;
  }

  // ---------- texte de la fiche (Markdown) ----------
  async function prose(p) {
    const box = el("div", "prose p-prose");
    try {
      // en anglais : projets/en/slug.md, sinon la version française
      const get = path => fetch(path, { cache: "no-cache" }).then(r => { if (!r.ok) throw 0; return r; });
      const fr = "projets/" + encodeURIComponent(p.slug) + ".md";
      const r = LANG === "en" ? await get("projets/en/" + encodeURIComponent(p.slug) + ".md").catch(() => get(fr)) : await get(fr);
      box.innerHTML = DOMPurify.sanitize(marked.parse(await r.text()));
      box.querySelectorAll("a[href^='http']").forEach(a => { a.target = "_blank"; a.rel = "noopener"; });
      return box;
    } catch (e) { return null; }
  }

  // ---------- agrandissement des images de la galerie ----------
  root.addEventListener("click", e => {
    const img = e.target.closest(".p-gallery img"); if (!img) return;
    const box = el("div", "lightbox"), big = new Image(); big.src = img.src; big.alt = img.alt; box.appendChild(big);
    const close = () => { box.remove(); removeEventListener("keydown", onKey); };
    const onKey = ev => { if (ev.key === "Escape") close(); };
    box.addEventListener("click", close); addEventListener("keydown", onKey); document.body.appendChild(box);
  });

  // ---------- assemblage selon le type ----------
  async function show(slug) {
    const list = (window.PROJECTS || []).map(loc), p = list.find(x => x.slug === slug);
    root.textContent = "";
    if (!p) {
      root.append(el("h1", "", t("Projet introuvable")), el("p", "p-lead", t("Ce projet n'existe pas ou a été déplacé.")));
      document.title = "Projet introuvable | Silvere Tchoudji"; return;
    }
    const type = PROJECT_TYPE(p);
    document.title = p.title + " | Silvere Tchoudji";
    root.dataset.type = type; root.dataset.c = p.cat;

    const top = el("div", "p-top"); top.append(head(p), facts(p));
    const text = await prose(p);
    if (window.ProjectView.current !== slug) return;           // l'utilisateur a changé de projet entre-temps
    const parts = [top];

    if (type === "graph") {
      // création graphique : les visuels d'abord, en grand
      if (!(p.gallery && p.gallery.length)) parts.push(hero(p));
      parts.push(gallery(p, "masonry"), palette(p), fonts(p));
      if (text) { const s = section(t("La démarche")); s.appendChild(text); parts.push(s); }
    } else if (type === "ux") {
      // UX : l'illustration, la démarche, puis les maquettes
      parts.push(hero(p), kpis(p));
      if (text) parts.push(text);
      const s = section(t("Maquettes et écrans")); s.appendChild(gallery(p)); parts.push(s);
    } else {
      // technique : l'illustration, les chiffres clés, puis le détail
      parts.push(hero(p), kpis(p));
      if (text) parts.push(text);
      if (p.gallery && p.gallery.length) { const s = section(t("Captures")); s.appendChild(gallery(p)); parts.push(s); }
    }
    parts.push(links(p), nav(p, list));
    parts.filter(Boolean).forEach(x => root.appendChild(x));
  }

  return { current: "", show(slug) { this.current = slug; return show(slug); } };
})();
