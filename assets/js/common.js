// Commun à toutes les pages : liens de contact, menu, thème jour / nuit, halo des boutons.
"use strict";
const short = u => u.replace(/^https?:\/\/(www\.)?/, "");
const hrefs = { email: "mailto:" + CONFIG.email, github: CONFIG.github, linkedin: CONFIG.linkedin, cv: CONFIG.cv };
const texts = { email: CONFIG.email, githubLabel: short(CONFIG.github), linkedinLabel: short(CONFIG.linkedin) };
document.querySelectorAll("[data-link]").forEach(a => a.href = hrefs[a.dataset.link]);
document.querySelectorAll("[data-text]").forEach(e => e.textContent = texts[e.dataset.text]);
document.getElementById("year").textContent = new Date().getFullYear();

// nav
const header = document.getElementById("top"), links = document.getElementById("links"), burger = document.getElementById("burger");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 20), { passive: true });
burger.addEventListener("click", () => burger.setAttribute("aria-expanded", links.classList.toggle("open")));
links.addEventListener("click", e => { if (e.target.tagName === "A") { links.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });

const RM = matchMedia("(prefers-reduced-motion:reduce)").matches;

// boutons : au survol, le halo radial suit la souris
document.querySelectorAll(".btn").forEach(b => b.addEventListener("pointermove", e => {
  const r = b.getBoundingClientRect();
  b.style.setProperty("--mx", (e.clientX - r.left) / r.width * 100 + "%");
  b.style.setProperty("--my", (e.clientY - r.top) / r.height * 100 + "%");
}));

// thème jour / nuit
const themeBtn = document.getElementById("theme"), themeMeta = document.querySelector('meta[name="theme-color"]');
const paintTheme = () => themeMeta && (themeMeta.content = document.documentElement.dataset.theme === "light" ? "#f6f7fb" : "#080a0c");
paintTheme();
themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next; paintTheme();
  try { localStorage.setItem("theme", next); } catch (e) {}
});
