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

// ========== COOL INTERACTIVE FEATURES ==========

// Scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Cursor trail effect
function createCursorTrail() {
  let trails = [];
  
  document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX - 10 + 'px';
    trail.style.top = e.clientY - 10 + 'px';
    
    document.body.appendChild(trail);
    trails.push(trail);
    
    // Remove trail after animation
    setTimeout(() => {
      if (trail.parentNode) {
        trail.parentNode.removeChild(trail);
      }
      trails = trails.filter(t => t !== trail);
    }, 1000);
    
    // Limit number of trails
    if (trails.length > 15) {
      const oldTrail = trails.shift();
      if (oldTrail.parentNode) {
        oldTrail.parentNode.removeChild(oldTrail);
      }
    }
  });
}

// Intersection Observer for animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all sections
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
}

// Navbar scroll effect
function setupNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// Parallax effect for hero section
function setupParallax() {
  const hero = document.querySelector('.hero');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const rate = scrolled * -0.5;
    
    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Matrix rain background effect
function createMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.className = 'matrix-bg';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const chars = 'アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレヱゲゼデベペオコソトノホモヨロヲゴゾドボポ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charArray = chars.split('');
  
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  
  const drops = [];
  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }
  
  function draw() {
    ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#38bdf8';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  setInterval(draw, 50);
  
  // Resize canvas on window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Typing animation for hero text
function setupTypingAnimation() {
  const heroText = document.querySelector('.hero-text');
  if (!heroText) return;
  
  const text = heroText.textContent;
  heroText.textContent = '';
  heroText.style.borderRight = '2px solid var(--accent)';
  
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      heroText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 30);
    } else {
      // Remove cursor after typing is done
      setTimeout(() => {
        heroText.style.borderRight = 'none';
      }, 1000);
    }
  }
  
  // Start typing after a delay
  setTimeout(typeWriter, 1000);
}

// Stagger animation for timeline items
function setupTimelineAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing cool features...');
  
  // Load portfolio data
  fetch('./data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data loaded successfully:', data);
      updatePortfolioContent(data);
    })
    .catch(error => {
      console.error('Error loading data:', error);
      // Site will still work with static content if JSON fails
    });
  
  // Initialize all cool features
  createScrollProgress();
  createCursorTrail();
  setupScrollAnimations();
  setupNavbarScroll();
  setupParallax();
  createMatrixRain();
  setupTypingAnimation();
  setupTimelineAnimations();
  
  console.log('All cool features initialized! 🚀');
});

function updatePortfolioContent(data) {
  try {
    // Update hero section
    const heroName = document.getElementById('hero-name');
    const heroTitle = document.getElementById('hero-title');
    const heroSummary = document.getElementById('hero-summary');
    
    if (heroName) heroName.textContent = data.personal.name;
    if (heroTitle) heroTitle.textContent = data.personal.title;
    if (heroSummary) heroSummary.textContent = data.personal.summary;
    
    // Update experience timeline
    updateExperience(data.experience);
    
    // Update projects
    updateProjects(data.projects);
    
    // Update leadership
    updateLeadership(data.experience);
    
    // Update contact links
    updateContact(data.links);
    
    console.log('Portfolio updated successfully!');
    
  } catch (error) {
    console.error('Error updating content:', error);
  }
}

function updateExperience(experiences) {
  const timeline = document.getElementById('experience-timeline');
  if (!timeline || !experiences) return;
  
  timeline.innerHTML = '';
  
  // Filter professional experiences
  const professionalExperiences = experiences.filter(exp => 
    !exp.type || (exp.type !== 'Volunteer' && exp.type !== 'Membership' && exp.type !== 'Training Program')
  );
  
  professionalExperiences.forEach(exp => {
    const item = document.createElement('article');
    item.className = 'timeline-item';
    
    const typeBadge = exp.type ? `<span class="type-badge">${exp.type}</span>` : '';
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

function updateProjects(projects) {
  const container = document.getElementById('projects-container');
  if (!container || !projects) return;
  
  container.innerHTML = '';
  
  projects.forEach(proj => {
    const card = document.createElement('article');
    card.className = 'card';
    
    card.innerHTML = `
      <h3>${proj.name}</h3>
      <p><strong>${proj.org}</strong> • ${proj.date}</p>
      <ul class="card-list">${proj.details.map(d => `<li>${d}</li>`).join('')}</ul>
      <div class="card-tags">
        <span class="pill pill-small">${proj.org}</span>
        <span class="pill pill-small">Research</span>
      </div>
    `;
    
    container.appendChild(card);
  });
}

function updateLeadership(experiences) {
  const leadership = document.getElementById('leadership-timeline');
  if (!leadership || !experiences) return;
  
  leadership.innerHTML = '';
  
  // Filter volunteer and leadership experiences
  const volunteerExperiences = experiences.filter(exp => 
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

function updateContact(links) {
  const contact = document.getElementById('contact-links');
  if (!contact || !links) return;
  
  contact.innerHTML = `
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
