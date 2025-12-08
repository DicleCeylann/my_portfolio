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

// Load saved theme on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  root.setAttribute("data-theme", "light");
  if (themeToggle) {
    themeToggle.querySelector("i").className = "fas fa-sun";
  }
} else {
  root.removeAttribute("data-theme"); // Default dark theme
  if (themeToggle) {
    themeToggle.querySelector("i").className = "fas fa-moon";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const icon = themeToggle.querySelector("i");
    
    if (currentTheme === "light") {
      // Switch to dark
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
      icon.className = "fas fa-moon";
    } else {
      // Switch to light
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      icon.className = "fas fa-sun";
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

// Simple data loading
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, loading portfolio data...');
  
  fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      console.log('Data loaded:', data);
      updatePortfolioContent(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

function updatePortfolioContent(data) {
  // Update hero
  const heroName = document.getElementById('hero-name');
  const heroTitle = document.getElementById('hero-title');
  const heroSummary = document.getElementById('hero-summary');
  
  if (heroName) heroName.textContent = data.personal.name;
  if (heroTitle) heroTitle.textContent = data.personal.title;
  if (heroSummary) heroSummary.textContent = data.personal.summary;
  
  // Update experience
  const timeline = document.getElementById('experience-timeline');
  if (timeline) {
    timeline.innerHTML = '';
    
    // Show all professional experiences (not just first 5)
    const professionalExperiences = data.experience.filter(exp => 
      !exp.type || exp.type !== 'Volunteer' && exp.type !== 'Membership' && exp.type !== 'Training Program'
    );
    
    professionalExperiences.forEach(exp => {
      const item = document.createElement('article');
      item.className = 'timeline-item';
      
      // Add type badge if available
      const typeBadge = exp.type ? `<span class="type-badge">${exp.type}</span>` : '';
      
      // Add skills if available
      const skillsSection = exp.skills ? 
        `<div class="skills-tags">
          ${exp.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>` : '';
      
      item.innerHTML = `
        <div class="timeline-meta">
          <span class="timeline-role">${exp.role}</span>
          <span class="timeline-company">${exp.company}</span>
          <span class="timeline-time">${exp.date}</span>
          ${typeBadge}
        </div>
        <p><strong>${exp.location}</strong></p>
        <ul>${exp.details.map(d => `<li>${d}</li>`).join('')}</ul>
        ${skillsSection}
      `;
      timeline.appendChild(item);
    });
  }
  
  // Update projects
  const projects = document.getElementById('projects-container');
  if (projects) {
    projects.innerHTML = '';
    data.projects.forEach(proj => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <h3>${proj.name}</h3>
        <p><strong>${proj.org}</strong> • ${proj.date}</p>
        <ul class="card-list">${proj.details.map(d => `<li>${d}</li>`).join('')}</ul>
        <div class="card-tags">
          <span class="pill pill-small">${proj.org}</span>
        </div>
      `;
      projects.appendChild(card);
    });
  }
  
  // Update leadership & volunteering
  const leadership = document.getElementById('leadership-timeline');
  if (leadership) {
    leadership.innerHTML = '';
    
    // Show volunteer, membership and training experiences
    const volunteerExperiences = data.experience.filter(exp => 
      exp.type === 'Volunteer' || exp.type === 'Membership' || exp.type === 'Training Program'
    );
    
    volunteerExperiences.forEach(exp => {
      const item = document.createElement('article');
      item.className = 'timeline-item';
      
      const typeBadge = `<span class="type-badge">${exp.type}</span>`;
      
      item.innerHTML = `
        <div class="timeline-meta">
          <span class="timeline-role">${exp.role}</span>
          <span class="timeline-company">${exp.company}</span>
          <span class="timeline-time">${exp.date}</span>
          ${typeBadge}
        </div>
        <p><strong>${exp.location}</strong></p>
        <ul>${exp.details.map(d => `<li>${d}</li>`).join('')}</ul>
      `;
      leadership.appendChild(item);
    });
  }
  
  // Update contact
  const contact = document.getElementById('contact-links');
  if (contact) {
    contact.innerHTML = `
      <a href="${data.links.email}" class="btn primary">
        <i class="fas fa-envelope"></i> Email
      </a>
      <a href="${data.links.linkedin}" target="_blank" class="btn ghost">
        <i class="fab fa-linkedin"></i> LinkedIn
      </a>
      <a href="${data.links.github}" target="_blank" class="btn ghost">
        <i class="fab fa-github"></i> GitHub
      </a>
    `;
  }
  
  console.log('Portfolio updated successfully!');
}

function populatePersonalInfo(personal) {
  // Update hero section
  const heroName = document.getElementById('hero-name');
  const heroTitle = document.getElementById('hero-title');
  const heroSummary = document.getElementById('hero-summary');
  const heroLocation = document.getElementById('hero-location');
  const heroSkills = document.getElementById('hero-skills');
  
  if (heroName) heroName.textContent = personal.name;
  if (heroTitle) heroTitle.textContent = personal.title;
  if (heroSummary) heroSummary.innerHTML = personal.summary;
  if (heroLocation) heroLocation.innerHTML = `<i class="fas fa-location-dot"></i> ${personal.location}`;
  if (heroSkills) heroSkills.innerHTML = `<i class="fas fa-code"></i> Python · C++ · SQL · REST APIs · Privacy Engineering`;
  
  // Update page title
  document.title = `${personal.name} | Portfolio`;
}

function populateExperience(experiences) {
  const timeline = document.getElementById('experience-timeline');
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
  const cardsContainer = document.getElementById('projects-container');
  if (!cardsContainer) return;
  
  cardsContainer.innerHTML = '';
  
  projects.forEach(project => {
    const card = document.createElement('article');
    card.className = 'card';
    
    // Determine appropriate tags based on project content
    let tags = [project.org];
    if (project.name.includes('PLDP') || project.name.includes('PersonalizedLDP')) {
      tags.push('Privacy Engineering', 'Research');
    } else if (project.name.includes('SecureIoT')) {
      tags.push('Cybersecurity', 'IoT');
    } else if (project.name.includes('XAI')) {
      tags.push('Explainable AI', 'Security');
    } else {
      tags.push('Software Development', 'Analytics');
    }
    
    card.innerHTML = `
      <h3>${project.name}</h3>
      <p><strong>${project.org}</strong> • ${project.date}</p>
      <ul class="card-list">
        ${project.details.map(detail => `<li>${detail}</li>`).join('')}
      </ul>
      <div class="card-tags">
        ${tags.map(tag => `<span class="pill pill-small">${tag}</span>`).join('')}
      </div>
    `;
    
    cardsContainer.appendChild(card);
  });
}

function populateSkills(skills) {
  // Find about section skills
  const skillsContainer = document.getElementById('skills-container');
  if (!skillsContainer) return;
  
  skillsContainer.innerHTML = '';
  
  // Combine all skills into one array
  const allSkills = [
    ...skills.languages,
    ...skills.core.slice(0, 4), // Take first 4 core skills
    ...skills.tools.slice(0, 4), // Take first 4 tools
    ...skills.focusAreas.slice(0, 3) // Take first 3 focus areas
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
  const currentlyCard = document.getElementById('hero-currently');
  const focusCard = document.getElementById('hero-focus');
  
  if (currentlyCard && education.length >= 2) {
    const currentEd = education[0]; // Current education
    const futureEd = education[1]; // Future education
    
    currentlyCard.innerHTML = `
      <li>🎓 ${currentEd.degree} @ ${currentEd.school}</li>
      <li>✈️ Jr. Officer @ Turkish Airlines – Software Development</li>
      <li>🔐 Research Assistant @ Koç University – PLDP</li>
      <li>🎯 ${futureEd.degree} @ ${futureEd.school} (${futureEd.scholarship})</li>
    `;
  }
  
  if (focusCard) {
    focusCard.innerHTML = `
      <li>• Software Engineering & Privacy</li>
      <li>• PLDP & Cybersecurity Research</li>
      <li>• Automation & Analytics Tools</li>
    `;
  }
}

function populateAbout(personal) {
  const aboutText = document.getElementById('about-text');
  if (aboutText) {
    aboutText.innerHTML = `
      <p>
        I'm a <strong>Software Engineering</strong> student specializing in <strong>privacy engineering</strong> and 
        <strong>cybersecurity</strong>. Currently pursuing my B.Sc. in Statistics at Yıldız Technical University 
        with a 3.46/4.00 GPA (Top 3%), and accepted for M.Sc. in Computer Science at Koç University with full scholarship.
      </p>
      <p>
        My experience spans <strong>software development</strong> at Turkish Airlines, <strong>PLDP research</strong> 
        at Koç University, and <strong>cybersecurity training</strong> through SiberVatan. I build scalable solutions, 
        automation tools, and privacy-preserving systems.
      </p>
      <p>
        ${personal.summary}
      </p>
    `;
  }
}

function populateCertificates(certificates) {
  // Update research section certificates
  const certList = document.getElementById('certificates-list');
  if (certList) {
    certList.innerHTML = certificates.slice(0, 5).map(cert => 
      `<li>${cert.title} (${cert.year})</li>`
    ).join('');
  }
}

function populateResearchInterests(skills) {
  const researchList = document.getElementById('research-interests');
  if (researchList) {
    const interests = [
      'Local & Personalized Differential Privacy (PLDP)',
      'Privacy Engineering & Data Protection',
      'Cybersecurity & Security Engineering',
      'Software Engineering & Automation Tools',
      'Explainable AI & Machine Learning Security'
    ];
    
    researchList.innerHTML = interests.map(interest => 
      `<li>${interest}</li>`
    ).join('');
  }
}

function populateContactLinks(links) {
  const contactLinks = document.getElementById('contact-links');
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
