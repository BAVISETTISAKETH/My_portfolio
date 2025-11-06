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

