// Applique le thème et la langue avant l'affichage pour éviter un flash.
// Thème : choix enregistré, sinon réglage du système.
// Langue : ?lang=en ou ?lang=fr dans l'adresse, sinon choix enregistré, sinon langue du navigateur.
(() => {
  let saved = null, lang = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  const theme = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  document.documentElement.dataset.theme = theme;

  const forced = new URLSearchParams(location.search).get("lang");
  try {
    if (forced === "en" || forced === "fr") localStorage.setItem("lang", forced);
    lang = localStorage.getItem("lang");
  } catch (e) { lang = forced; }
  if (lang !== "en" && lang !== "fr") lang = /^fr\b/i.test(navigator.language || "fr") ? "fr" : "en";
  document.documentElement.lang = lang;
  // en anglais, la page reste masquée le temps que i18n.js remplace les textes
  if (lang === "en") document.documentElement.classList.add("lang-wait");
})();
