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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Load and populate data from JSON
async function loadPortfolioData() {
  try {
    const response = await fetch('./data.json');
    const data = await response.json();
    
    populatePersonalInfo(data.personal);
    populateExperience(data.experience);
    populateEducation(data.education);
    populateProjects(data.projects);
    populateSkills(data.skills);
    populateCertificates(data.certificates);
    populateContactLinks(data.links);
    
  } catch (error) {
    console.error('Error loading portfolio data:', error);
  }
}

function populatePersonalInfo(personal) {
  // Update hero section
  const heroTitle = document.querySelector('.hero h1');
  const heroSubtitle = document.querySelector('.hero h2');
  const heroText = document.querySelector('.hero-text');
  const locationSpan = document.querySelector('.hero-meta span:first-child');
  
  if (heroTitle) heroTitle.textContent = personal.name;
  if (heroSubtitle) heroSubtitle.textContent = personal.title;
  if (heroText) heroText.innerHTML = `<strong>${personal.summary}</strong>`;
  if (locationSpan) locationSpan.innerHTML = `<i class="fas fa-location-dot"></i> ${personal.location}`;
}

function populateExperience(experiences) {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;
  
  timeline.innerHTML = '';
  
  experiences.forEach(exp => {
    const article = document.createElement('article');
    article.className = 'timeline-item';
    
    article.innerHTML = `
      <div class="timeline-meta">
        <span class="timeline-role">${exp.role}</span>
        <span class="timeline-company">${exp.company}</span>
        <span class="timeline-time">${exp.date}</span>
      </div>
      <p><strong>${exp.location}</strong></p>
      <ul>
        ${exp.details.map(detail => `<li>${detail}</li>`).join('')}
      </ul>
    `;
    
    timeline.appendChild(article);
  });
}

function populateProjects(projects) {
  const cardsContainer = document.querySelector('.cards');
  if (!cardsContainer) return;
  
  cardsContainer.innerHTML = '';
  
  projects.forEach(project => {
    const card = document.createElement('article');
    card.className = 'card';
    
    card.innerHTML = `
      <h3>${project.name}</h3>
      <p><strong>${project.org}</strong> • ${project.date}</p>
      <ul class="card-list">
        ${project.details.map(detail => `<li>${detail}</li>`).join('')}
      </ul>
      <div class="card-tags">
        <span class="pill pill-small">${project.org}</span>
        <span class="pill pill-small">${project.date}</span>
      </div>
    `;
    
    cardsContainer.appendChild(card);
  });
}

function populateSkills(skills) {
  // Find about section skills
  const skillsContainer = document.querySelector('.pill-group');
  if (!skillsContainer) return;
  
  skillsContainer.innerHTML = '';
  
  // Combine all skills into one array
  const allSkills = [
    ...skills.languages,
    ...skills.core.slice(0, 3), // Take first 3 core skills
    ...skills.tools.slice(0, 3), // Take first 3 tools
    ...skills.focusAreas.slice(0, 2) // Take first 2 focus areas
  ];
  
  allSkills.forEach(skill => {
    const pill = document.createElement('span');
    pill.className = 'pill';
    pill.textContent = skill;
    skillsContainer.appendChild(pill);
  });
}

function populateEducation(education) {
  // Update current education in hero cards
  const currentlyCard = document.querySelector('.hero-card:first-child ul');
  if (currentlyCard) {
    const currentEd = education[0]; // Current education
    const futureEd = education[1]; // Future education
    
    currentlyCard.innerHTML = `
      <li>🎓 ${currentEd.degree} @ ${currentEd.school}</li>
      <li>✈️ Jr. Officer @ Turkish Airlines – Software Development</li>
      <li>🔐 Research Assistant @ Koç University – PLDP</li>
      <li>🎯 ${futureEd.degree} @ ${futureEd.school} (${futureEd.scholarship})</li>
    `;
  }
}

function populateCertificates(certificates) {
  // Update research section certificates
  const certList = document.querySelector('.section-body.grid-2 div:last-child ul');
  if (certList) {
    certList.innerHTML = certificates.slice(0, 4).map(cert => 
      `<li>${cert.title} (${cert.year})</li>`
    ).join('');
  }
}

function populateContactLinks(links) {
  const contactLinks = document.querySelector('.contact-links');
  if (!contactLinks) return;
  
  contactLinks.innerHTML = `
    <a href="${links.email}" class="btn primary">
      <i class="fas fa-envelope"></i> Email
    </a>
    <a href="${links.linkedin}" target="_blank" rel="noreferrer" class="btn ghost">
      <i class="fab fa-linkedin"></i> LinkedIn
    </a>
    <a href="${links.github}" target="_blank" rel="noreferrer" class="btn ghost">
      <i class="fab fa-github"></i> GitHub
    </a>
  `;
}

// Load data when DOM is ready
document.addEventListener('DOMContentLoaded', loadPortfolioData);
