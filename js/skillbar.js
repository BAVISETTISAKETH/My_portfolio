const skillbar = () => {
  const skillBars = document.querySelectorAll(".skill");

  // Use Intersection Observer for better performance
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const animateSkillBar = (skillBar) => {
    const fill = skillBar.querySelector(".skill-bar__fill");
    const percentage = skillBar.querySelector(".skill-percent");
    const progress = parseInt(fill.getAttribute("data-progress"), 10);

    // Animate width
    fill.style.width = `${progress}%`;

    // Animate counter using requestAnimationFrame for smooth performance
    let counter = 0;
    const duration = 1500; // ms
    const increment = progress / (duration / 16); // ~60fps

    const animate = () => {
      if (counter < progress) {
        counter = Math.min(counter + increment, progress);
        percentage.textContent = `${Math.round(counter)}%`;
        requestAnimationFrame(animate);
      } else {
        percentage.textContent = `${progress}%`;
      }
    };

    requestAnimationFrame(animate);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateSkillBar(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  skillBars.forEach(skillBar => {
    observer.observe(skillBar);
  });
};

export default skillbar;
