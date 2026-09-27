document.getElementById("year").textContent = new Date().getFullYear();
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
function applyTheme(theme, save = false) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    `Switch to ${isDark ? "light" : "dark"} mode`,
  );
  themeIcon.textContent = isDark ? "☼" : "◐";
  themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  themeColorMeta.content = isDark ? "#101713" : "#14231e";
  if (save) {
    try {
      localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    } catch (error) {}
  }
}
applyTheme(document.documentElement.dataset.theme);
themeToggle.addEventListener("click", () => {
  applyTheme(
    document.documentElement.dataset.theme === "dark" ? "light" : "dark",
    true,
  );
});
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const body = `From: ${fields.get("name")} (${fields.get("email")})\n\n${fields.get("message")}`;
    window.location.href = `mailto:rathana.lan.a3f@ap.denso.com?subject=${encodeURIComponent(fields.get("subject"))}&body=${encodeURIComponent(body)}`;
  });
const languageSelect = document.getElementById("language-select");
languageSelect.value = localStorage.getItem("portfolio-language") || "en";
function updateDocumentLanguage(language) {
  document.documentElement.lang = language === "zh-CN" ? "zh-CN" : language;
}
updateDocumentLanguage(languageSelect.value);
languageSelect.addEventListener("change", function () {
  const language = languageSelect.value;
  updateDocumentLanguage(language);
  localStorage.setItem("portfolio-language", language);
  const applyTranslation = (attempt = 0) => {
    const translator = document.querySelector(".goog-te-combo");
    if (translator) {
      translator.value = language;
      translator.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (attempt < 30) {
      window.setTimeout(() => applyTranslation(attempt + 1), 200);
    }
  };
  applyTranslation();
});
window.googleTranslateElementInit = function () {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,km,ja,zh-CN",
      autoDisplay: false,
    },
    "google_translate_element",
  );
  if (languageSelect.value !== "en")
    languageSelect.dispatchEvent(new Event("change"));
};
const revealItems = document.querySelectorAll(
  ".hero .fact, .resume-snapshot, section .section-head, .about-copy, .skills .tag, .career-item, .timeline, .metric, .lead-card, .rhythm, .rhythm-explorer, .project-tools, .project, .cert, .contact-panel, .contact-form, .journey-step, footer",
);
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal", "is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => {
    item.classList.add("reveal");
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("reveal", "is-visible"));
}
const scrollProgress = document.getElementById("scroll-progress");
const navLinks = [...document.querySelectorAll("header nav a")];
const pageSections = [...document.querySelectorAll("main section[id]")];
let scrollUpdateQueued = false;
const updateScrollState = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;
  const activeThreshold =
    window.scrollY + document.querySelector("header").offsetHeight + 90;
  let activeSection = "";
  pageSections.forEach((section) => {
    if (section.offsetTop <= activeThreshold) activeSection = section.id;
  });
  navLinks.forEach((link) => {
    if (link.hash === `#${activeSection}`)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
};
const scheduleScrollUpdate = () => {
  if (scrollUpdateQueued) return;
  scrollUpdateQueued = true;
  requestAnimationFrame(() => {
    updateScrollState();
    scrollUpdateQueued = false;
  });
};
window.addEventListener("scroll", scheduleScrollUpdate, {
  passive: true,
});
window.addEventListener("resize", scheduleScrollUpdate);
updateScrollState();
const projectFilterButtons = document.querySelectorAll(".project-filter");
const projectCards = document.querySelectorAll(".projects .project");
const projectCount = document.getElementById("project-count");
projectFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    let visibleCount = 0;
    projectCards.forEach((card, index) => {
      const isVisible =
        selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.hidden = !isVisible;
      if (isVisible && !reducedMotion) {
        card.style.setProperty(
          "--filter-delay",
          `${Math.min(index, 5) * 45}ms`,
        );
        card.classList.remove("filter-enter");
        void card.offsetWidth;
        card.addEventListener(
          "animationend",
          () => {
            card.classList.remove("filter-enter");
            card.style.removeProperty("--filter-delay");
          },
          { once: true },
        );
        card.classList.add("filter-enter");
      }
      if (isVisible) visibleCount += 1;
    });
    projectFilterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    projectCount.textContent =
      selectedFilter === "all"
        ? `Showing all ${visibleCount} projects`
        : `Showing ${visibleCount} ${visibleCount === 1 ? "project" : "projects"} · ${button.textContent.trim()}`;
  });
});

const rhythmTabs = [...document.querySelectorAll(".rhythm-tab")];
const rhythmPanel = document.getElementById("rhythm-panel");
const rhythmIndex = document.getElementById("rhythm-index");
const rhythmKicker = document.getElementById("rhythm-kicker");
const rhythmTitle = document.getElementById("rhythm-panel-title");
const rhythmCopy = document.getElementById("rhythm-panel-copy");
const rhythmSegments = [...document.querySelectorAll("#rhythm-progress span")];
const reducedMotionForRhythm = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
function activateRhythmTab(tab, moveFocus = false) {
  const selectedIndex = rhythmTabs.indexOf(tab);
  rhythmTabs.forEach((item, index) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
    rhythmSegments[index].classList.toggle(
      "is-complete",
      index <= selectedIndex,
    );
  });
  rhythmPanel.setAttribute("aria-labelledby", tab.id);
  rhythmIndex.textContent = tab.dataset.step;
  rhythmKicker.textContent = `STAGE ${tab.dataset.step} / ${tab.children[1].textContent.toUpperCase()}`;
  rhythmTitle.textContent = tab.dataset.title;
  rhythmCopy.textContent = tab.dataset.copy;
  if (!reducedMotionForRhythm) {
    rhythmPanel.classList.remove("is-changing");
    void rhythmPanel.offsetWidth;
    rhythmPanel.classList.add("is-changing");
    rhythmPanel.addEventListener(
      "animationend",
      () => rhythmPanel.classList.remove("is-changing"),
      { once: true },
    );
  }
  if (moveFocus) {
    tab.focus();
    tab.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
}
rhythmTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateRhythmTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % rhythmTabs.length;
    else if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + rhythmTabs.length) % rhythmTabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = rhythmTabs.length - 1;
    else return;
    event.preventDefault();
    activateRhythmTab(rhythmTabs[nextIndex], true);
  });
});

const pointerCursor = document.getElementById("pointer-cursor");
const supportsHoverPointer = window.matchMedia(
  "(hover: hover) and (pointer: fine)",
).matches;
const prefersReducedPointerMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
if (supportsHoverPointer && !prefersReducedPointerMotion) {
  const pointerTargets = "a, button, summary, select, [role='tab']";
  document.documentElement.classList.add("has-pointer-cursor");
  pointerCursor.classList.add("is-enabled");
  document.addEventListener(
    "pointermove",
    (event) => {
      pointerCursor.style.setProperty("--pointer-x", `${event.clientX}px`);
      pointerCursor.style.setProperty("--pointer-y", `${event.clientY}px`);
      const target = event.target instanceof Element ? event.target : null;
      const isEditable = Boolean(
        target?.closest("input, textarea, [contenteditable='true']"),
      );
      pointerCursor.classList.toggle("is-visible", !isEditable);
    },
    { passive: true },
  );
  document.addEventListener("pointerover", (event) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest(pointerTargets);
    if (!target) return;
    pointerCursor.dataset.label = target.matches("summary")
      ? "OPEN"
      : target.matches("a")
        ? "GO"
        : "SELECT";
    pointerCursor.classList.add("is-engaged");
  });
  document.addEventListener("pointerout", (event) => {
    const relatedTarget =
      event.relatedTarget instanceof Element
        ? event.relatedTarget.closest(pointerTargets)
        : null;
    if (!relatedTarget) pointerCursor.classList.remove("is-engaged");
  });
  document.addEventListener("pointerdown", () =>
    pointerCursor.classList.add("is-pressed"),
  );
  window.addEventListener("pointerup", () =>
    pointerCursor.classList.remove("is-pressed"),
  );
  window.addEventListener("blur", () =>
    pointerCursor.classList.remove("is-visible", "is-engaged", "is-pressed"),
  );
}
