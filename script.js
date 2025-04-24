document.addEventListener("DOMContentLoaded", () => {
  // Prevent scrolling until a section is revealed
  document.body.classList.add("no-scroll");

  // Auto-fill email if on contact page
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  if (email && document.getElementById("contact-email")) {
    document.getElementById("contact-email").value = email;
  }

  // start typing the Java snippet:
  const codeEl = document.getElementById("code-snippet");
  typeCode(codeSnippets.java, codeEl, 50);  // 50ms per char
});

// Function to reveal a section and allow scrolling
function showSection(sectionId) {
  const section = document.getElementById(sectionId);
  
  if (section) {
    section.classList.remove("hidden");
    section.classList.add("visible");
    document.body.classList.remove("no-scroll");
    document.body.classList.add("allow-scroll");
  }
}

// Function to redirect to the contact page with the email pre-filled
function redirectToContact() {
  const emailInput = document.getElementById("email-input").value.trim();
  if (emailInput) {
    window.location.href = `contact.html?email=${encodeURIComponent(emailInput)}`;
  } else {
    alert("Please enter a valid email address.");
  }
}

// Code snippets for different languages
const codeSnippets = {
  java: `<span class="keyword">while</span> (!ideas.isReal()) {
      <span class="function">mix</span>(<span class="variable">creativity</span>, <span class="variable">softwareDevelopment</span>);
  }`,

  python: `<span class="keyword">while</span> <span class="variable">not</span> ideas.is_real():
      mix(creativity, software_development)`,

  cpp: `#include <iostream>
  while (!ideas.isReal()) {
      mix(creativity, softwareDevelopment);
  }`,

  prolog: `ideas_real :- fail.
  mix(creativity, software_development) :- ideas_real, !, fail.
  mix(creativity, software_development).`,

  english: 'Bringing ideas to reality with a mix of creativity and software engineering'
};

/**
 * Animate text (including HTML) into an element, one character at a time.
 * @param {string} text      – the full HTML/snippet to type
 * @param {HTMLElement} el   – where to show it
 * @param {number} speed     – ms delay between characters
 */
function typeCode(text, el, speed = 30) {
  let i = 0;
  el.innerHTML = "";
  ;(function _tick() {
    if (i < text.length) {
      el.innerHTML = text.substring(0, ++i);
      setTimeout(_tick, speed);
    }
  })();
}


const portfolioDetails = {
  ai: [
    { name: "AI audio enhancer", url: "https://github.com/IntelligentSound/intelligent-audio-enhancer.git" },
    // …etc…
  ],
  mobile: [
    { name: "RTW App",      url: "https://github.com/Halliday24/RTW-app-2024.git" },
    { name: "African-alberta hub", url: "https://github.com/Halliday24/alberta-african-hub.git" },
    // …etc…
  ],
  games: [
    { name: "Nine men morris", url: "https://github.com/Halliday24/Nine-Men-Morris.git" },
    { name: "Flappy bird clone",   url: "https://github.com/Halliday24/flappy-bird-clone.git" },
    // …etc…
  ]
};

function changeLanguage() {
  const sel = document.getElementById("language-selector");
  const snippet = codeSnippets[sel.value];
  const target  = document.getElementById("code-snippet");
  typeCode(snippet, target, 50);
}


// Function to Toggle Sections with Smooth Scrolling
function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    // Hide all sections first
    document.querySelectorAll("section").forEach(sec => {
      sec.classList.remove("visible");
      sec.classList.add("hidden");
    });

    // Show selected section and allow scrolling
    section.classList.remove("hidden");
    section.classList.add("visible");
    document.body.classList.remove("no-scroll");
    document.body.classList.add("allow-scroll");

    // Smooth scroll to the section
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Function to Show About Me Section with Side Slide Transition
function showAboutMe() {
  const hero = document.getElementById("hero");
  const aboutMe = document.getElementById("about-me");

  if (!aboutMe.classList.contains("active")) {
    hero.classList.add("hidden-about");
    setTimeout(() => {
      hero.style.display = "none";
      aboutMe.style.display = "block";
      setTimeout(() => aboutMe.classList.add("active"), 50);
    }, 800);
  }
}

// Function to Return to Hero from About Me
function goBack() {
  const hero = document.getElementById("hero");
  const aboutMe = document.getElementById("about-me");

  if (aboutMe.classList.contains("active")) {
    aboutMe.classList.remove("active");
    setTimeout(() => {
      aboutMe.style.display = "none";
      hero.style.display = "block";
      setTimeout(() => hero.classList.remove("hidden-about"), 50);
    }, 800);
  }
}

// Function to Show Portfolio Section with Vertical Slide Transition
function showPortfolio() {
  const hero = document.getElementById("hero");
  const portfolio = document.getElementById("portfolio");

  if (!portfolio.classList.contains("active")) {
    hero.classList.add("hidden-portfolio");
    setTimeout(() => {
      hero.style.display = "none";
      portfolio.style.display = "block";
      setTimeout(() => portfolio.classList.add("active"), 50);
    }, 800);
  }
}

// Function to Return to Hero from Portfolio
function goBackPortfolio() {
  const hero = document.getElementById("hero");
  const portfolio = document.getElementById("portfolio");

  if (portfolio.classList.contains("active")) {
    portfolio.classList.remove("active");
    setTimeout(() => {
      portfolio.style.display = "none";
      hero.style.display = "block";
      setTimeout(() => hero.classList.remove("hidden-portfolio"), 50);
    }, 800);
  }
}

// Function to Arrange Portfolio Projects in a Circular Pattern
function arrangeProjectsInCircle() {
  const projectCards = document.querySelectorAll(".project-card");
  const total = projectCards.length;
  const angleStep = (2 * Math.PI) / total;
  const radius = 150; // Adjust as needed
  
  projectCards.forEach((card, index) => {
    const angle = index * angleStep;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    card.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Helper: create one bubble
function makeBubble(item) {
  const a = document.createElement("a");
  a.href = item.url;
  a.target = "_blank";
  a.className = "sub-bubble";
  a.textContent = item.name;
  return a;
}

/**
 * Position bubbles in an arc.
 *
 * @param {HTMLElement[]} bubbles  – the sub-bubble elements
 * @param {number} cx             – x-coordinate of the clicked card (relative to grid)
 * @param {number} cy             – y-coordinate of the clicked card (relative to grid)
 * @param {number} baseAngle      – the “forward” direction of the arc (radians)
 * @param {number} arcSpan        – total width of the arc (radians), e.g. Math.PI/2 = 90°
 * @param {number} r              – radius of the circle on which to place bubbles
 */
function positionBubblesArc(bubbles, cx, cy, baseAngle, arcSpan = Math.PI/2, r = 100) {
  const count = bubbles.length;
  // if only one bubble, put it straight out
  const step = count > 1 ? arcSpan / (count - 1) : 0;
  const start = baseAngle - arcSpan / 2;

  bubbles.forEach((el, i) => {
    const θ = start + step * i;
    const x = cx + Math.cos(θ) * r - el.offsetWidth / 2;
    const y = cy + Math.sin(θ) * r - el.offsetHeight / 2;
    el.style.left = `${x}px`;
    el.style.top  = `${y}px`;
  });
}

// Toggle sub-bubbles for a given card
function toggleSubBubbles(e) {
  const card = e.currentTarget;
  const key  = card.dataset.key;
  const parent = document.querySelector(".project-grid");

  // if already shown, remove them
  if (card._bubbles) {
    card._bubbles.forEach(el => parent.removeChild(el));
    card._bubbles = null;
    return;
  }

  const details = portfolioDetails[key] || [];
  const bubbles = details.map(d => makeBubble(d));

  // attach & animate
  bubbles.forEach(b => {
    parent.appendChild(b);
    // measure immediately so offsetWidth/Height are known
  });

  // compute center of clicked card and grid
  const rect     = card.getBoundingClientRect();
  const gridRect = parent.getBoundingClientRect();
  const cx       = rect.left - gridRect.left + rect.width / 2;
  const cy       = rect.top  - gridRect.top  + rect.height / 2;

  // --- WITH THIS: ---
  const gridCenterX = gridRect.width / 2;
  const gridCenterY = gridRect.height / 2;
  // direction from grid centre toward the clicked card:
  const dx0 = cx - gridCenterX;
  const dy0 = cy - gridCenterY;
  const baseAngle = Math.atan2(dy0, dx0);
  // choose an arcSpan (e.g. Math.PI/2 = 90°) and radius as desired:
  positionBubblesArc(bubbles, cx, cy, baseAngle, Math.PI / 2, 120);

  // trigger fade-in
  requestAnimationFrame(() => {
    bubbles.forEach(b => b.classList.add("show"));
  });

  // remember for later removal
  card._bubbles = bubbles;
}

// wire it up
document.querySelectorAll(".project-card").forEach(card => {
  card.style.cursor = "pointer";
  card.addEventListener("click", toggleSubBubbles);
});


// Run function when portfolio section is shown
document.addEventListener("DOMContentLoaded", () => {
  arrangeProjectsInCircle();
});

function showContact() {
  const hero = document.getElementById("hero");
  const contact = document.getElementById("contact-form");

  if (!contact.classList.contains("active")) {
    hero.classList.add("hidden-contact");
    setTimeout(() => {
      hero.style.display = "none";
      contact.style.display = "block";
      setTimeout(() => contact.classList.add("active"), 50);
    }, 800);
  }
}

function goBackContact() {
  const hero = document.getElementById("hero");
  const contact = document.getElementById("contact-form");

  if (contact.classList.contains("active")) {
    contact.classList.remove("active");
    setTimeout(() => {
      contact.style.display = "none";
      hero.style.display = "block";
      setTimeout(() => hero.classList.remove("hidden-contact"), 50);
    }, 800);
  }
}
