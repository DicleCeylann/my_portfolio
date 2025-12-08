// Mobile nav toggle
const navToggle = document.getElementById("nav-toggle");
const navRight = document.querySelector(".nav-right");

if (navToggle && navRight) {
  navToggle.addEventListener("click", () => {
    navRight.classList.toggle("open");
  });

  navRight.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navRight.classList.remove("open"));
  });
}

// Theme toggle (dark / light)
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    if (current === "dark") {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });
}

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
