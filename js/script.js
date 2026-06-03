const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => {
  mobileMenu.classList.contains("open")
    ? mobileMenu.classList.remove("open")
    : mobileMenu.classList.add("open");
});
function closeMobile() {
  mobileMenu.classList.remove("open");
}

// Section highlight

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (
      window.pageYOffset >= sectionTop &&
      window.pageYOffset < sectionTop + sectionHeight
    ) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// Scroll top
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener(
  "scroll",
  () => {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
  },
  { passive: true },
);

// Fade-up fallback — force visible after short delay
setTimeout(() => {
  document
    .querySelectorAll(".fade-up:not(.visible)")
    .forEach((el) => el.classList.add("visible"));
}, 800);

// Nav shrink
const nav = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    nav.style.height = window.scrollY > 80 ? "60px" : "72px";
  },
  { passive: true },
);

// ── CONSTRUCTION ANIMATIONS ──

// 1. Vertical build progress bar
const buildProgress = document.getElementById("buildProgress");
function updateBuildProgress() {
  const pct = Math.min(
    100,
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100,
  );
  if (buildProgress) buildProgress.style.height = pct + "%";
}
window.addEventListener("scroll", updateBuildProgress, { passive: true });

// 2. Rivet pop on scroll
const rivetObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const row = entry.target;
        row
          .querySelectorAll(".rivet")
          .forEach((r, i) =>
            setTimeout(() => r.classList.add("popped"), i * 80),
          );
        row.classList.add("popped");
        rivetObs.unobserve(row);
      }
    });
  },
  { threshold: 0.4 },
);
document.querySelectorAll("[data-rivet]").forEach((el) => rivetObs.observe(el));

// 3. Count-up animation
function animateCount(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800,
    step = 16;
  const inc = target / (duration / step);
  let cur = 0;
  const t = setInterval(() => {
    cur = Math.min(cur + inc, target);
    el.textContent = Math.floor(cur);
    if (cur >= target) clearInterval(t);
  }, step);
}
const countObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCount(e.target);
        countObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll(".count-up").forEach((el) => countObs.observe(el));

// 4. Build bar fill animation
const barObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.width = e.target.dataset.width + "%";
        }, 200);
        barObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 },
);
document
  .querySelectorAll(".build-bar-fill")
  .forEach((el) => barObs.observe(el));

// 5. Parallax blueprint
const heroBp = document.querySelector(".hero-bp svg");
if (heroBp) {
  window.addEventListener(
    "scroll",
    () => {
      heroBp.style.transform = "translateY(" + window.scrollY * 0.25 + "px)";
    },
    { passive: true },
  );
}

// 6. Process step bolts
document.querySelectorAll(".step-circle").forEach((circle) => {
  ["tl", "tr", "bl", "br"].forEach((pos) => {
    const bolt = document.createElement("div");
    bolt.className = "step-bolt step-bolt-" + pos;
    bolt.style.transform = "scale(0)";
    circle.appendChild(bolt);
  });
});
const boltObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".step-bolt").forEach((b, i) => {
          setTimeout(() => {
            b.style.transition =
              "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)";
            b.style.transform = "scale(1)";
          }, i * 100);
        });
        boltObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll(".process-step").forEach((el) => boltObs.observe(el));

// 7. Staggered card entrance — section-based so all cards in a group reveal together
const cardGroups = [
  { section: ".products", cards: ".product-card" },
  { section: ".services", cards: ".service-card" },
  { section: ".industries", cards: ".industry-card" },
  { section: ".why", cards: ".why-item" },
];

// ── WHATSAPP ──
function toggleWA(e) {
  e.preventDefault();
  document.getElementById("waPopup").classList.toggle("open");
}
function closeWA() {
  document.getElementById("waPopup").classList.remove("open");
}
// Close popup when clicking outside
document.addEventListener("click", (e) => {
  const float = document.querySelector(".wa-float");
  if (float && !float.contains(e.target)) {
    document.getElementById("waPopup").classList.remove("open");
  }
});
// Auto-open popup after 8 seconds on first visit
setTimeout(() => {
  const popup = document.getElementById("waPopup");
  if (popup && !sessionStorage.getItem("waShown")) {
    popup.classList.add("open");
    sessionStorage.setItem("waShown", "1");
  }
}, 8000);

cardGroups.forEach(({ section, cards }) => {
  const sectionEl = document.querySelector(section);
  if (!sectionEl) return;
  const cardEls = document.querySelectorAll(cards);
  cardEls.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });
  const obs = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        cardEls.forEach((el, i) => {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, i * 60);
        });
        obs.unobserve(sectionEl);
      }
    },
    { threshold: 0.05 },
  );
  obs.observe(sectionEl);
});
