// Progress bar
const progress = document.createElement("div");
progress.className = "progress";
document.body.appendChild(progress);

function updateProgress(){
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  const val = max > 0 ? (h.scrollTop / max) * 100 : 0;
  progress.style.width = `${val}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const nav = document.querySelector(".nav");
document.getElementById("menuBtn").addEventListener("click", () => nav.classList.toggle("open"));

// Theme toggle
const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

function setTheme(theme){
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeBtn.textContent = theme === "light" ? "🌙" : "☀️";
}
setTheme(localStorage.getItem("theme") || "dark");

themeBtn.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

// Contact form -> mailto
const form = document.getElementById("contactForm");
const hint = document.getElementById("formHint");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
  const yourEmail = "rajaangeline09@gmail.com";

  window.location.href = `mailto:${yourEmail}?subject=${subject}&body=${body}`;
  hint.textContent = "Opening your email app...";
});

// Scroll reveal (stagger)
const revealEls = Array.from(document.querySelectorAll(
  ".heroLeft, .heroRight, .section, .card, .skillCard, .timelineBody, .highlightCard, .contactCard, .form, .statCard"
));
revealEls.forEach((el, i) => {
  el.classList.add("reveal");
  el.style.transitionDelay = `${Math.min(i * 35, 220)}ms`;
});
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Active nav link
const sections = ["about", "experience", "projects", "skills", "contact"]
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navLinks = Array.from(document.querySelectorAll(".navLinks a"));
function setActive(id){
  navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
}
const ioNav = new IntersectionObserver((entries) => {
  const visible = entries.filter(e => e.isIntersecting)
    .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if(visible?.target?.id) setActive(visible.target.id);
}, { threshold: [0.25, 0.45, 0.65] });
sections.forEach(sec => ioNav.observe(sec));

// Spotlight follow (premium hover)
const spotlightEls = Array.from(document.querySelectorAll(".card, .profileCard, .skillCard, .highlightCard, .timelineBody, .contactCard, .form, .statCard"));
spotlightEls.forEach(el => el.classList.add("spotlight"));
spotlightEls.forEach(el => {
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }, { passive: true });
});

// Card tilt (3D)
const tiltCards = Array.from(document.querySelectorAll(".card"));
tiltCards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -8; // rotateX
    const ry = ((x / r.width) - 0.5) * 10;  // rotateY
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
  }, { passive: true });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  });
});

// Magnetic buttons (subtle)
const magneticBtns = Array.from(document.querySelectorAll(".btn"));
magneticBtns.forEach(btn => {
  btn.addEventListener("mousemove", (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
  }, { passive: true });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0px, 0px)";
  });
});

// Typed text in hero (injects line under hero subtitle)
(function typedHero(){
  const heroLeft = document.querySelector(".heroLeft");
  if(!heroLeft) return;

  const line = document.createElement("div");
  line.className = "typedLine";
  line.innerHTML = `I focus on <span id="typed"></span><span class="cursor">|</span>`;
  // Insert after subtitle paragraph
  const sub = heroLeft.querySelector(".sub");
  if(sub) sub.insertAdjacentElement("afterend", line);

  const phrases = [
    "scalable RESTful APIs",
    "API integrations (BigCommerce, Maps)",
    "SQL optimization (MS SQL)",
    "secure backend workflows",
    "Django & Python systems"
  ];

  const typed = document.getElementById("typed");
  let p = 0, i = 0, deleting = false;

  function tick(){
    const text = phrases[p];
    if(!deleting){
      i++;
      typed.textContent = text.slice(0, i);
      if(i === text.length){
        deleting = true;
        setTimeout(tick, 900);
        return;
      }
    }else{
      i--;
      typed.textContent = text.slice(0, i);
      if(i === 0){
        deleting = false;
        p = (p + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 55);
  }
  tick();
})();
