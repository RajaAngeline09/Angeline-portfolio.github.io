// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const nav = document.querySelector(".nav");
document.getElementById("menuBtn").addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Theme toggle (dark/light)
const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

function setTheme(theme){
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeBtn.textContent = theme === "light" ? "🌙" : "☀️";
}

const saved = localStorage.getItem("theme");
setTheme(saved || "dark");

themeBtn.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

// Contact form -> mailto (no backend)
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