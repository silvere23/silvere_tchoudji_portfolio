// Fond réseau animé de la section d'accueil (canvas).
// fond réseau : nœuds reliés, qui réagissent à la souris
(() => {
  const RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const c = document.getElementById("net"), x = c.getContext("2d"), hero = c.parentElement;
  const mouse = { x: -9999, y: -9999 };
  let w, h, pts = [], visible = true, raf = 0;
  function size() {
    const d = Math.min(devicePixelRatio || 1, 2);
    w = c.clientWidth; h = c.clientHeight; c.width = w * d; c.height = h * d; x.setTransform(d, 0, 0, d, 0, 0);
    const n = Math.min(90, Math.round(w * h / 14000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.4 + .8, hot: Math.random() < .08 }));
  }
  function draw() {
    raf = 0; x.clearRect(0, 0, w, h); x.lineWidth = 1;
    const light = document.documentElement.dataset.theme === "light", base = light ? "91,79,224" : "139,127,245", acc = light ? "8,145,178" : "13,202,242", k = light ? 1.8 : 1;
    for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; }
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], dx = a.x - b.x, dy = a.y - b.y, q = dx * dx + dy * dy;
        if (q < 16900) { x.strokeStyle = `rgba(${base},${(1 - q / 16900) * .28 * k})`; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); }
      }
      const mx = a.x - mouse.x, my = a.y - mouse.y, mq = mx * mx + my * my;
      if (mq < 32400) { x.strokeStyle = `rgba(${acc},${(1 - mq / 32400) * .55 * k})`; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(mouse.x, mouse.y); x.stroke(); }
      x.fillStyle = a.hot ? `rgb(${acc})` : `rgba(${base},.9)`; x.beginPath(); x.arc(a.x, a.y, a.hot ? a.r + 1 : a.r, 0, 6.283); x.fill();
    }
    if (visible && !RM) raf = requestAnimationFrame(draw);
  }
  const start = () => { if (!raf) raf = requestAnimationFrame(draw); };
  hero.addEventListener("pointermove", e => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
  addEventListener("resize", () => { size(); if (RM) draw(); });
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) start(); }).observe(hero);
  document.addEventListener("visibilitychange", () => { visible = !document.hidden; if (visible) start(); });
  size(); draw();
})();
