// Construit les cartes de projets, le carrousel et le diaporama de l'accueil à partir de projets/projets.js.
// Chargé avant main.js, qui ajoute ensuite le défilement, les filtres et le bouton « voir plus ».
"use strict";
window.PROJECT_ICONS = { cyber: "i-cyber", devops: "i-devops", ux: "i-ux", graph: "i-graph" };
window.PROJECT_TYPE = p => p.type || ({ cyber: "tech", devops: "tech", ux: "ux", graph: "graph" })[p.cat] || "tech";

// visuel d'un projet : image de couverture, sinon son illustration dessinée, sinon l'icône de sa catégorie
window.projectVisual = (p, big) => {
  if (p.cover) {
    const img = document.createElement("img");
    img.src = p.cover; img.alt = ""; img.loading = big ? "eager" : "lazy"; img.decoding = "async";
    return img;
  }
  const ns = "http://www.w3.org/2000/svg", svg = document.createElementNS(ns, "svg"), use = document.createElementNS(ns, "use");
  const art = document.getElementById("a-" + p.slug);
  svg.setAttribute("class", art ? "art" : "ico"); svg.setAttribute("aria-hidden", "true");
  use.setAttribute("href", "#" + (art ? "a-" + p.slug : PROJECT_ICONS[p.cat]));
  svg.appendChild(use);
  return svg;
};

(() => {
  const list = (window.PROJECTS || []).map(loc);             // dans la langue du site
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const icon = cat => { const s = window.projectVisual({ slug: "", cat }); s.setAttribute("class", "ico"); return s; };
  const tags = (cls, items) => { const d = el("div", cls); (items || []).forEach(t => d.appendChild(el("span", "", t))); return d; };
  const media = (p, cls) => { const m = el("div", cls); m.appendChild(projectVisual(p)); m.appendChild(el("span", "media-tag", p.slug)); return m; };
  const open = p => {
    const a = el("a", "p-open", t("Voir le projet")); a.href = "#projet/" + p.slug;
    a.setAttribute("aria-label", t("Voir le projet") + " " + p.title);
    a.insertAdjacentHTML("beforeend", '<svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>');
    return a;
  };

  // carrousel : un grand format par projet
  const track = document.getElementById("track");
  // liste complète : une carte par projet
  const grid = document.getElementById("all");
  list.forEach(p => {
    const s = el("article", "card pf"); s.dataset.c = p.cat; if (p.featured) s.dataset.feat = "";
    const body = el("div", "pf-body"), badge = el("span", "pf-badge");
    badge.append(icon(p.cat), p.badge || "");
    body.append(badge, el("h3", "", p.title), el("p", "", p.summary), tags("pf-tags", p.tags), open(p));
    s.append(body, media(p, "media"));
    track.appendChild(s);

    const c = el("article", "card pg reveal"); c.dataset.c = p.cat;
    const b = el("div", "pg-body");
    b.append(el("h3", "", p.title), el("p", "", p.summary), tags("pg-tags", p.tags), open(p));
    c.append(media(p, "media sm"), b);
    grid.appendChild(c);
  });

  // toute la carte ouvre la fiche (le lien « Voir le projet » reste là pour le clavier)
  [track, grid].forEach(box => box.addEventListener("click", e => {
    if (e.target.closest("a") || getSelection().toString()) return;
    const card = e.target.closest("article"); if (card) card.querySelector(".p-open").click();
  }));

  // diaporama de l'accueil : les projets mis en avant
  const hs = document.getElementById("hs");
  if (hs) {
    const dots = hs.querySelector(".hs-dots");
    list.filter(p => p.featured).forEach((p, i) => {
      const s = el("div", "hs-slide" + (i ? "" : " on")); s.dataset.c = p.cat;
      const cap = el("div", "hs-cap"); cap.append(el("b", "", p.title), el("span", "", p.hero || p.badge || ""));
      s.append(projectVisual(p), cap);
      hs.insertBefore(s, dots);
      dots.appendChild(el("i", i ? "" : "on"));
    });
  }

  // compteur de projets de l'accueil
  const count = document.querySelector("[data-project-count]");
  if (count && list.length) count.textContent = "+" + list.length;
})();
