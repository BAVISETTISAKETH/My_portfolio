/* ================================================================
   PREMIUM ANIMATIONS — Apple-style immersive portfolio
   Sai Saketh Bavisetti
   ================================================================ */
(function () {
  'use strict';

  const hasHover = window.matchMedia('(hover: hover)').matches;

  /* ──────────────────────────────────────────────────────────────
     1. LENIS SMOOTH SCROLL
  ────────────────────────────────────────────────────────────── */
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    // Bridge to GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      })(performance.now());
    }
  }

  /* ──────────────────────────────────────────────────────────────
     2. CUSTOM CURSOR  (desktop only)
  ────────────────────────────────────────────────────────────── */
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (dot && ring && hasHover) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    (function trackRing() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(trackRing);
    })();

    const interactives = 'a, button, .btn, .carousel-card, .education-item, .timeline-content, .tool-item, .recommendation-card, .nav-link';
    document.querySelectorAll(interactives).forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('cursor-hover');
        ring.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('cursor-hover');
        ring.classList.remove('cursor-hover');
      });
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0'; ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = ''; ring.style.opacity = '';
    });
  }

  /* ──────────────────────────────────────────────────────────────
     3. TYPEWRITER EFFECT
  ────────────────────────────────────────────────────────────── */
  const tw = document.querySelector('.typewriter-text');
  if (tw) {
    const roles = ['Data Scientist', 'AI Engineer', 'ML Engineer', 'BI Analyst', 'Data Storyteller'];
    let ri = 0, ci = 0, del = false;

    function tick() {
      const w = roles[ri];
      tw.textContent = del ? w.slice(0, ci - 1) : w.slice(0, ci + 1);
      del ? ci-- : ci++;

      if (!del && ci === w.length) {
        setTimeout(() => { del = true; tick(); }, 1900);
        return;
      }
      if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
      setTimeout(tick, del ? 44 : 96);
    }
    // Slight delay so GSAP reveal finishes first
    setTimeout(tick, 1400);
  }

  /* ──────────────────────────────────────────────────────────────
     4. MAGNETIC BUTTONS  (desktop only)
  ────────────────────────────────────────────────────────────── */
  if (hasHover) {
    document.querySelectorAll('.btn-magnetic').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width  / 2) * 0.28;
        const y = (e.clientY - r.top  - r.height / 2) * 0.28;
        btn.style.transition = 'transform 0.12s ease';
        btn.style.transform  = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.65s cubic-bezier(0.23,1,0.32,1)';
        btn.style.transform  = 'translate(0, 0)';
      });
    });
  }

  /* ──────────────────────────────────────────────────────────────
     5. GLASSMORPHISM + 3-D CARD TILT  (desktop tilt only)
  ────────────────────────────────────────────────────────────── */
  const cardSelectors = '.education-item, .timeline-content, .recommendation-card, .carousel-card, .tool-category';

  document.querySelectorAll(cardSelectors).forEach(card => {
    card.classList.add('glass-card');
    // Shine overlay for tilt shimmer
    if (hasHover && !card.classList.contains('tool-category')) {
      const shine = document.createElement('div');
      shine.className = 'card-shine';
      card.appendChild(shine);
    }
  });

  if (hasHover) {
    document.querySelectorAll('.education-item, .timeline-content, .recommendation-card, .carousel-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r  = card.getBoundingClientRect();
        const xp = (e.clientX - r.left) / r.width;
        const yp = (e.clientY - r.top)  / r.height;
        const rx = (yp - 0.5) * -14;
        const ry = (xp - 0.5) *  14;
        card.style.transition = 'transform 0.12s ease';
        card.style.transform  = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
        const s = card.querySelector('.card-shine');
        if (s) s.style.background = `radial-gradient(circle at ${xp*100}% ${yp*100}%, rgba(255,255,255,0.13) 0%, transparent 60%)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
        card.style.transform  = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        const s = card.querySelector('.card-shine');
        if (s) s.style.background = 'none';
      });
    });
  }

  /* ──────────────────────────────────────────────────────────────
     6. GSAP HERO + SCROLL ANIMATIONS
  ────────────────────────────────────────────────────────────── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    /* — Hero name: word-by-word reveal — */
    const heroHeading = document.querySelector('.hero-heading');
    if (heroHeading) {
      const words = heroHeading.textContent.trim().split(' ');
      heroHeading.innerHTML = words.map(w =>
        `<span style="display:inline-block;overflow:hidden;vertical-align:top;margin-right:0.22em">` +
        `<span class="hw" style="display:inline-block">${w}</span></span>`
      ).join('');

      gsap.fromTo('.hw',
        { y: '115%' },
        { y: '0%', duration: 1.1, stagger: 0.08, ease: 'power4.out', delay: 0.15 }
      );
    }

    /* — Hero elements stagger — */
    const heroSeq = [
      { sel: '.hero-greeting',         delay: 0.1  },
      { sel: '.hero-heading-subtitle', delay: 0.85 },
      { sel: '.about-social-list',     delay: 1.05 },
      { sel: '.hero-cta',              delay: 1.22 },
    ];
    heroSeq.forEach(({ sel, delay }) => {
      gsap.fromTo(sel,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.85, delay, ease: 'power3.out' }
      );
    });

    /* — Hero image — */
    gsap.fromTo('.hero-img',
      { opacity: 0, scale: 0.88, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.4, delay: 0.35, ease: 'power3.out' }
    );

    /* — Blob parallax on scroll — */
    document.querySelectorAll('.hero-blob').forEach((blob, i) => {
      gsap.to(blob, {
        y: i % 2 === 0 ? -110 : 110,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
      });
    });

    /* — Hero image subtle parallax — */
    gsap.to('.hero-img', {
      y: -55,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    });

    /* — Section titles — */
    gsap.utils.toArray('.title').forEach(title => {
      gsap.fromTo(title,
        { opacity: 0, y: 44 },
        {
          opacity: 1, y: 0, duration: 0.95, ease: 'power3.out',
          scrollTrigger: { trigger: title, start: 'top 88%' },
        }
      );
    });

    /* — Staggered card reveals — */
    const staggerGroups = [
      { container: '.education-content',    items: '.education-item' },
      { container: '.timeline',             items: '.timeline-item' },
      { container: '.recommendations-grid', items: '.recommendation-card' },
      { container: '.tools-content',        items: '.tool-category' },
    ];
    staggerGroups.forEach(({ container, items }) => {
      const el = document.querySelector(container);
      if (!el) return;
      gsap.fromTo(el.querySelectorAll(items),
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.75, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        }
      );
    });

    /* — About content reveal — */
    gsap.fromTo('.about-content, .about-skills',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-row', start: 'top 85%' },
      }
    );
  }

  /* ──────────────────────────────────────────────────────────────
     7. DATA PARTICLE CANVAS  (hero background)
  ────────────────────────────────────────────────────────────── */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let pts = [];

    function resize() {
      canvas.width  = canvas.parentElement.offsetWidth  || window.innerWidth;
      canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
      initPts();
    }

    function initPts() {
      const n = Math.min(65, Math.floor(canvas.width / 20));
      pts = Array.from({ length: n }, () => ({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42,
        r:  Math.random() * 1.6 + 0.7,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = document.body.classList.contains('dark-mode');
      const dotC  = dark ? 'rgba(0,212,255,0.5)'  : 'rgba(49,56,81,0.3)';
      const lineC = dark ? [0, 212, 255]           : [49, 56, 81];

      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotC;
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.hypot(dx, dy);
          if (d < 125) {
            const a = (1 - d / 125) * (dark ? 0.22 : 0.15);
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${lineC[0]},${lineC[1]},${lineC[2]},${a})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    resize();
    draw();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    });
  }

  /* ──────────────────────────────────────────────────────────────
     8. SMOOTH THEME TRANSITION
  ────────────────────────────────────────────────────────────── */
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.documentElement.style.setProperty('--theme-transition', 'all 0.4s ease');
      setTimeout(() => {
        document.documentElement.style.removeProperty('--theme-transition');
      }, 450);
    });
  }

})();
