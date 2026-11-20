// Page d'accueil : animations au scroll, carrousel de projets, formulaire. Dépend de common.js.
"use strict";
// titres : chaque ligne monte en douceur depuis un masque (aucun changement de largeur, donc aucune saccade)
function prepareTitle(el) {
  if (RM || el.dataset.rise) return;
  el.dataset.rise = "1";
  const lines = [[]];
  [...el.childNodes].forEach(n => { if (n.nodeName === "BR") lines.push([]); else lines[lines.length - 1].push(n); });
  el.textContent = "";
  lines.forEach((nodes, i) => {
    const mask = document.createElement("span"), inner = document.createElement("span");
    mask.className = "rise"; inner.className = "rise-in"; inner.style.transitionDelay = i * 130 + "ms";
    nodes.forEach(n => inner.appendChild(n)); mask.appendChild(inner); el.appendChild(mask);
  });
}
document.querySelectorAll(".hero h1, .title").forEach(prepareTitle);
const heroTitle = document.querySelector(".hero h1");
requestAnimationFrame(() => requestAnimationFrame(() => heroTitle.classList.add("shown")));

// cartes d'une même rangée : apparition en léger décalé
document.querySelectorAll(".grid, .xp-list, .contact").forEach(g => [...g.children].forEach((el, i) => { if (el.classList.contains("reveal")) el.style.transitionDelay = (i % 3) * 90 + "ms"; }));

// apparition au scroll + lien actif
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); const t = e.target.querySelector(".title"); if (t) t.classList.add("shown"); const el = e.target; setTimeout(() => { el.style.transitionDelay = ""; }, 1100); } }), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.querySelectorAll("a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("section[id]").forEach(s => spy.observe(s));

// expérience : un clic déplie ou replie une carte, une seule ouverte à la fois
document.querySelectorAll(".xp-head").forEach(btn => btn.addEventListener("click", () => {
  const card = btn.closest(".xp"), open = !card.classList.contains("open");
  document.querySelectorAll(".xp").forEach(c => { c.classList.toggle("open", open && c === card); c.querySelector(".xp-head").setAttribute("aria-expanded", open && c === card); });
}));

// certifications : les cartes sont dupliquées pour que la bande boucle sans coupure
(() => {
  const track = document.querySelector("#certs .cert-track");
  [...track.children].forEach(c => { const copy = c.cloneNode(true); copy.setAttribute("aria-hidden", "true"); copy.querySelectorAll("a").forEach(a => a.tabIndex = -1); track.appendChild(copy); });
})();

// outils : chaque rangée est dupliquée pour boucler sans coupure
document.querySelectorAll(".tool-track").forEach(t => [...t.children].forEach(c => { const copy = c.cloneNode(true); copy.setAttribute("aria-hidden", "true"); t.appendChild(copy); }));

// expérience : le trait de la frise se remplit à mesure qu'on fait défiler la section
(() => {
  const list = document.getElementById("xp-list"); let tick = false;
  const fill = () => { tick = false; const r = list.getBoundingClientRect(); list.style.setProperty("--p", Math.min(1, Math.max(0, (innerHeight * .62 - r.top) / r.height)).toFixed(3)); };
  const ask = () => { if (!tick) { tick = true; requestAnimationFrame(fill); } };
  addEventListener("scroll", ask, { passive: true }); addEventListener("resize", ask); fill();
})();

// projets : carrousel automatique, filtres par catégorie, bouton « voir plus »
(() => {
  const DELAY = 5000;                                   // durée d'affichage d'un projet, en millisecondes
  const NAMES = { cyber: "Cyber", devops: "DevOps", ux: "UX design", graph: t("Création graphique") };
  const box = document.getElementById("carousel"), track = document.getElementById("track"), dots = document.getElementById("dots");
  const more = document.getElementById("more"), grid = document.getElementById("all");
  const slides = [...track.children], cards = [...grid.children];
  let filter = "all", index = 0, timer = 0, hovered = false, inView = false;
  box.style.setProperty("--delay", DELAY + "ms");

  const shown = () => slides.filter(s => !s.classList.contains("hide"));
  const playing = () => !RM && !hovered && inView && !document.hidden && shown().length > 1;

  function schedule() {
    clearTimeout(timer);
    const on = playing();
    box.classList.toggle("paused", !on);
    // relance l'animation de remplissage du point actif
    const dot = dots.children[index];
    if (dot) { dot.classList.remove("on"); void dot.offsetWidth; dot.classList.add("on"); }
    if (on) timer = setTimeout(() => go(index + 1), DELAY);
  }
  function mark() { [...dots.children].forEach((d, i) => { d.classList.toggle("on", i === index); d.setAttribute("aria-current", i === index); }); }
  function go(i, smooth = true) {
    const list = shown(); if (!list.length) return;
    index = (i + list.length) % list.length;
    track.scrollTo({ left: list[index].offsetLeft, behavior: smooth && !RM ? "smooth" : "auto" });
    mark(); schedule();
  }
  function applyFilter(f) {
    filter = f;
    // « Tous » : seulement les projets phares ; une catégorie : tous ses projets
    slides.forEach(s => s.classList.toggle("hide", f === "all" ? !("feat" in s.dataset) : s.dataset.c !== f));
    cards.forEach(c => { c.classList.toggle("hide", f !== "all" && c.dataset.c !== f); c.classList.add("in"); });
    dots.textContent = "";
    shown().forEach((s, i) => {
      const d = document.createElement("button"); d.type = "button";
      d.setAttribute("aria-label", t("Projet") + " " + (i + 1) + " : " + s.querySelector("h3").textContent);
      d.addEventListener("click", () => go(i)); dots.appendChild(d);
    });
    label(); go(0, false);
  }
  function label() {
    const n = cards.filter(c => !c.classList.contains("hide")).length;
    if (filter !== "all") { more.textContent = LANG === "en" ? "Explore the " + n + " " + NAMES[filter] + " projects →" : "Découvrir les " + n + " projets " + NAMES[filter] + " →"; return; }
    more.textContent = !grid.hidden ? t("Réduire la liste") : LANG === "en" ? "View the " + n + " projects" : "Voir les " + n + " projets";
  }

  document.getElementById("prev").addEventListener("click", () => go(index - 1));
  document.getElementById("next").addEventListener("click", () => go(index + 1));
  document.getElementById("filters").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    document.querySelectorAll("#filters button").forEach(x => x.classList.toggle("on", x === b));
    applyFilter(b.dataset.f);
  });
  // « Tous » : déplie la liste complète ; une catégorie : ouvre sa page dédiée (#projets/devops…)
  more.addEventListener("click", () => {
    if (filter !== "all") { location.hash = "projets/" + filter; return; }
    grid.hidden = !grid.hidden; more.setAttribute("aria-expanded", !grid.hidden); label();
  });

  // glissement manuel : on retrouve le projet le plus proche, puis le défilement automatique reprend
  let settle = 0;
  track.addEventListener("scroll", () => {
    clearTimeout(settle);
    settle = setTimeout(() => {
      const list = shown(); let best = 0;
      list.forEach((s, i) => { if (Math.abs(s.offsetLeft - track.scrollLeft) < Math.abs(list[best].offsetLeft - track.scrollLeft)) best = i; });
      if (best !== index) { index = best; mark(); schedule(); }
    }, 140);
  }, { passive: true });

  // pause au survol, au clavier, hors écran et onglet masqué
  const hover = v => () => { hovered = v; schedule(); };
  box.addEventListener("pointerenter", hover(true)); box.addEventListener("pointerleave", hover(false));
  box.addEventListener("focusin", hover(true)); box.addEventListener("focusout", hover(false));
  new IntersectionObserver(es => { inView = es[0].isIntersecting; schedule(); }, { threshold: .4 }).observe(box);
  document.addEventListener("visibilitychange", schedule);
  addEventListener("resize", () => go(index, false));

  applyFilter("all");
})();

// captures de projets : clic pour agrandir, clic ou Échap pour fermer
document.getElementById("projs").addEventListener("click", e => {
  const img = e.target.closest(".media img"); if (!img) return;
  const box = document.createElement("div"); box.className = "lightbox";
  const big = new Image(); big.src = img.src; big.alt = img.alt; box.appendChild(big);
  const close = () => { box.remove(); removeEventListener("keydown", onKey); };
  const onKey = ev => { if (ev.key === "Escape") close(); };
  box.addEventListener("click", close); addEventListener("keydown", onKey); document.body.appendChild(box);
});

// formulaire : ouvre la messagerie
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  location.href = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent(t("Contact portfolio : ") + f.get("nom")) + "&body=" + encodeURIComponent(f.get("msg") + "\n\n" + f.get("nom") + " · " + f.get("mail"));
});

// accueil : projets phares en fondu automatique
(() => {
  const box = document.getElementById("hs"); if (!box || RM) return;
  const slides = [...box.querySelectorAll(".hs-slide")], dots = [...box.querySelectorAll(".hs-dots i")];
  let i = 0;
  setInterval(() => {
    if (document.hidden || box.matches(":hover")) return;
    i = (i + 1) % slides.length;
    slides.forEach((s, n) => s.classList.toggle("on", n === i)); dots.forEach((d, n) => d.classList.toggle("on", n === i));
  }, 4000);
})();

// photo : affiche les initiales si assets/img/photo.jpg est absent
const photo = document.querySelector(".photo img");
if (photo) {
  const fallback = () => (photo.closest("picture") || photo).replaceWith("ST");
  if (photo.complete && photo.naturalWidth === 0) fallback(); else photo.addEventListener("error", fallback);
}
