/* home-anim.js — Starfield + hero micro-interactions */
(function () {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let w = 0, h = 0;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(180, Math.floor(w * h / 8000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random(),
      speed: Math.random() * 0.015 + 0.004,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    stars.forEach(s => {
      s.a += s.speed;
      const opacity = 0.25 + Math.abs(Math.sin(s.a)) * 0.75;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 220, 255, ${opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);

  /* Stagger card entrance */
  document.querySelectorAll('.hub-card').forEach((el, i) => {
    el.style.animationDelay = `${0.08 * i}s`;
  });

  /* Flight widget ticker */
  const routes = document.querySelectorAll('.flight-route-row');
  if (routes.length > 1) {
    let idx = 0;
    setInterval(() => {
      routes.forEach((r, i) => r.classList.toggle('active', i === idx));
      idx = (idx + 1) % routes.length;
    }, 3500);
  }
})();
