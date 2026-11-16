// Applique le thème avant l'affichage pour éviter un flash : choix enregistré, sinon réglage du système.
(() => {
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  const theme = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  document.documentElement.dataset.theme = theme;
})();
