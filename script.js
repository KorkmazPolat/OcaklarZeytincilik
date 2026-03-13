document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  },
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

// Product category filter
const filterPills = document.querySelectorAll(".toolbar-pills .pill[data-filter]");
const shopSections = document.querySelectorAll(".shop-section[data-category]");

if (filterPills.length && shopSections.length) {
  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");

      const filter = pill.dataset.filter;
      shopSections.forEach((section) => {
        section.style.display =
          filter === "all" || section.dataset.category === filter ? "" : "none";
      });
    });
  });
}
