"use strict";
import form from "./form.js";
import skillbar from "./skillbar.js";

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
