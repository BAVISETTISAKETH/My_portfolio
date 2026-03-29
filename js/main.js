// Throttle function for better scroll performance
function throttle(func, wait) {
  let timeout;
  let lastRan;
  return function executedFunction(...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (Date.now() - lastRan >= wait) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, wait - (Date.now() - lastRan));
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS with reduced animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      duration: 600,
      easing: 'ease-out',
      offset: 50,
      delay: 0
    });
  }

  form();
  skillbar();
  initDarkMode();
  initProgressBar();
  initProjectFilters();
  initProjectCarousel();
  initCursorGlow();

  const nav = document.querySelector("#nav");
  const navBtn = document.querySelector("#nav-btn");
  const navBtnImg = document.querySelector("#nav-btn-img");
  const header = document.querySelector("#header");
  const hero = document.querySelector("#home");
  const goToTop = document.querySelector("#goToTop");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav a");
  const navbar = document.querySelector(".navbar");

  // Cache computed values
  const triggerHeight = hero ? hero.offsetHeight - 170 : 0;

  // Hamburger menu
  if (navBtn && nav && navBtnImg) {
    navBtn.onclick = () => {
      if (nav.classList.toggle("open")) {
        navBtnImg.src = "img/icons/close.svg";
      } else {
        navBtnImg.src = "img/icons/open.svg";
      }
    };
  }

  // Single optimized scroll handler with throttling
  const handleScroll = throttle(() => {
    const scrollY = window.scrollY;

    // Handle header sticky and go to top button
    if (header && goToTop) {
      if (scrollY > triggerHeight) {
        header.classList.add("header-sticky");
        goToTop.classList.add("reveal");
      } else {
        header.classList.remove("header-sticky");
        goToTop.classList.remove("reveal");
      }
    }

    // Handle navbar scroll effect
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Handle active nav links
    if (sections.length && navLinks.length) {
      sections.forEach((sec) => {
        const offset = sec.offsetTop - 170;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");

        if (scrollY >= offset && scrollY < offset + height) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    }
  }, 16); // ~60fps

  // Add single scroll listener
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Timeline items click handler
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.addEventListener('click', function() {
      const details = this.querySelector('.timeline-details');
      if (details) {
        details.classList.toggle('hidden');
      }
    });
  });
});

window.toggleReadMore = function(btn, id) {
  const text = document.getElementById(id);
  if (!text) return;
  text.classList.toggle('expanded');
  btn.textContent = text.classList.contains('expanded') ? 'Show less ↑' : 'Read more ↓';
};

// Global functions for inline onclick handlers
window.toggleDetails = function(id) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.toggle('hidden');
  }
};

window.toggleSection = function(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.toggle('hidden');
  }
};

window.toggleProjectDetails = function(link) {
  const projectDetails = link.nextElementSibling;
  if (projectDetails) {
    projectDetails.classList.toggle('hidden');
  }
};

// Cursor Glow Orb
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  if (window.matchMedia('(hover: none)').matches) return;

  const HALF = 170; // half of 340px
  const LERP = 0.09;

  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;
  let started = false;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!started) {
      curX = mouseX;
      curY = mouseY;
      started = true;
      glow.style.opacity = '1';
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  }, { passive: true });

  document.addEventListener('mouseenter', () => {
    if (started) glow.style.opacity = '1';
  }, { passive: true });

  (function loop() {
    curX += (mouseX - curX) * LERP;
    curY += (mouseY - curY) * LERP;
    glow.style.left = (curX - HALF) + 'px';
    glow.style.top  = (curY - HALF) + 'px';
    requestAnimationFrame(loop);
  })();
}

// Dark Mode Toggle
function initDarkMode() {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');

  if (!toggleBtn || !sunIcon || !moonIcon) return;

  // Check for saved preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';

  function updateIcons(isDark) {
    if (isDark) {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  }

  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    updateIcons(true);
  }

  // Listen for toggle clicks
  toggleBtn.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    updateIcons(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Progress Bar
function initProgressBar() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;

  const updateProgressBar = throttle(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    progressBar.style.width = progress + '%';
  }, 16);

  window.addEventListener('scroll', updateProgressBar, { passive: true });
}

// Project Carousel — infinite loop (clone-based)
function initProjectCarousel() {
  const track = document.getElementById('projectsTrack');
  const container = document.querySelector('.carousel-track-container');
  const dotsWrap = document.getElementById('carouselDots');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (!track || !container || !dotsWrap || !prevBtn || !nextBtn) return;

  // Capture the real cards once — never touch them after cloning
  const originals = Array.from(track.querySelectorAll('.carousel-card'));
  const total = originals.length;

  let visible = 3;
  let trackIdx = 0; // position inside the full track (clones + originals + clones)
  let busy = false;
  let timer;

  // ── helpers ──────────────────────────────────────────────────────────────
  function getVisible() {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function cardStep() {
    // Read from the first card in the track (may be a clone)
    const first = track.querySelector('.carousel-card');
    return first ? first.offsetWidth + 24 : 0;
  }

  function realIndex() {
    // Which original card is leftmost on screen
    return ((trackIdx - visible) % total + total) % total;
  }

  // ── build track with clones ───────────────────────────────────────────────
  function buildTrack() {
    visible = getVisible();

    // Remove any previous clones
    track.querySelectorAll('.cc-clone').forEach(c => c.remove());

    // Prepend: clones of the last `visible` originals
    const pre = document.createDocumentFragment();
    for (let i = total - visible; i < total; i++) {
      const cl = originals[i].cloneNode(true);
      cl.classList.add('cc-clone');
      pre.appendChild(cl);
    }
    track.insertBefore(pre, track.firstChild);

    // Append: clones of the first `visible` originals
    const post = document.createDocumentFragment();
    for (let i = 0; i < visible; i++) {
      const cl = originals[i].cloneNode(true);
      cl.classList.add('cc-clone');
      post.appendChild(cl);
    }
    track.appendChild(post);

    // Sit at real card 0 with no animation
    trackIdx = visible;
    setTransform(false);
  }

  // ── transform ─────────────────────────────────────────────────────────────
  function setTransform(animate) {
    track.style.transition = animate
      ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      : 'none';
    track.style.transform = `translateX(-${trackIdx * cardStep()}px)`;
  }

  // ── infinite-loop correction after each slide ─────────────────────────────
  track.addEventListener('transitionend', () => {
    let jumped = false;
    if (trackIdx >= visible + total) {   // slid into appended clones
      trackIdx -= total;
      jumped = true;
    } else if (trackIdx < visible) {     // slid into prepended clones
      trackIdx += total;
      jumped = true;
    }

    if (jumped) {
      // Apply new position without transition, then unlock
      requestAnimationFrame(() => {
        track.style.transition = 'none';
        track.style.transform = `translateX(-${trackIdx * cardStep()}px)`;
        requestAnimationFrame(() => { busy = false; });
      });
    } else {
      busy = false;
    }
    updateDots();
  });

  // ── navigation ────────────────────────────────────────────────────────────
  function move(delta) {
    if (busy) return;
    busy = true;
    trackIdx += delta;
    setTransform(true);
    updateDots();
  }

  function next() { move(1); }
  function prev() { move(-1); }

  // ── dots ──────────────────────────────────────────────────────────────────
  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', 'Go to project ' + (i + 1));
      dot.addEventListener('click', () => {
        if (busy) return;
        busy = true;
        trackIdx = visible + i;
        setTransform(true);
        updateDots();
        resetTimer();
      });
      dotsWrap.appendChild(dot);
    }
    updateDots();
  }

  function updateDots() {
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === realIndex());
    });
  }

  // ── auto-play ─────────────────────────────────────────────────────────────
  function startTimer() { timer = setInterval(next, 4000); }
  function resetTimer() { clearInterval(timer); startTimer(); }

  prevBtn.addEventListener('click', () => { prev(); resetTimer(); });
  nextBtn.addEventListener('click', () => { next(); resetTimer(); });

  container.addEventListener('mouseenter', () => clearInterval(timer));
  container.addEventListener('mouseleave', startTimer);

  // Touch swipe
  let touchX = 0;
  container.addEventListener('touchstart', e => {
    touchX = e.touches[0].clientX;
    clearInterval(timer);
  }, { passive: true });
  container.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); }
    startTimer();
  }, { passive: true });

  // Resize: rebuild clones so card widths are recalculated
  window.addEventListener('resize', throttle(() => {
    clearInterval(timer);
    const prevReal = realIndex();
    buildTrack();
    trackIdx = visible + prevReal;
    setTransform(false);
    buildDots();
    startTimer();
  }, 200));

  // ── init ──────────────────────────────────────────────────────────────────
  buildTrack();
  buildDots();
  startTimer();
}

// Project Filtering
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (!filterBtns.length || !projectItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      projectItems.forEach(item => {
        if (filter === 'all') {
          item.style.display = 'block';
          // Trigger reflow for animation
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else {
          const category = item.getAttribute('data-category');
          if (category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        }
      });
    });
  });
}
