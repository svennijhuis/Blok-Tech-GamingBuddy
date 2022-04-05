
// ========= API - IntersectionObserver  =========

try {
  const options = {
    threshold: 0.4
  };

  const roomsSection = document.querySelectorAll(".roomsection");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add("sectionfadein");
    }, options);
  });

  roomsSection.forEach((section) => {
    observer.observe(section);
  });
} catch (err) {}
