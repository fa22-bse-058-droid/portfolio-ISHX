const navLinks = document.querySelectorAll(".nav-list a");
const sections = [...document.querySelectorAll("main section[id]")];
const year = document.getElementById("year");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const typewriterText = document.getElementById("typewriter-text");

if (year) {
  year.textContent = new Date().getFullYear();
}

const setActiveLink = () => {
  const offset = window.scrollY + 140;
  let currentId = sections[0]?.id;

  sections.forEach((section) => {
    if (offset >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("active", active);
  });
};

setActiveLink();
window.addEventListener("scroll", setActiveLink);

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const subtitles = [
  "AI-Powered Web App Engineer",
  "FastAPI + React Full-Stack Developer",
  "Building Intelligent, Interactive Products",
];

if (typewriterText) {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const current = subtitles[phraseIndex];
    const nextChars = deleting
      ? current.slice(0, charIndex - 1)
      : current.slice(0, charIndex + 1);

    typewriterText.textContent = nextChars;
    charIndex = nextChars.length;

    let delay = deleting ? 45 : 80;

    if (!deleting && charIndex === current.length) {
      deleting = true;
      delay = 1600;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % subtitles.length;
      delay = 380;
    }

    window.setTimeout(tick, delay);
  };

  tick();
}
