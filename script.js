// Simple working portfolio script
console.log('Portfolio script loaded');

// Theme toggle (dark / light)
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Footer year
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Theme toggle
    const themeToggle = document.getElementById("theme-toggle");
    const root = document.documentElement;
    
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = root.getAttribute("data-theme");
            const icon = themeToggle.querySelector("i");
            
            if (currentTheme === "light") {
                root.removeAttribute("data-theme");
                icon.className = "fas fa-moon";
            } else {
                root.setAttribute("data-theme", "light");
                icon.className = "fas fa-sun";
            }
        });
    }
    
    // Mobile nav toggle
    const navToggle = document.getElementById("nav-toggle");
    const navRight = document.querySelector(".nav-right");
    
    if (navToggle && navRight) {
        navToggle.addEventListener("click", () => {
            navRight.classList.toggle("open");
        });
    }
    
    // Smooth scrolling
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
    
    // Load portfolio data
    loadPortfolioData();
});

function loadPortfolioData() {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            console.log('Data loaded:', data);
            updateContent(data);
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
}

function updateContent(data) {
    // Update hero
    const heroName = document.getElementById('hero-name');
    const heroTitle = document.getElementById('hero-title'); 
    const heroSummary = document.getElementById('hero-summary');
    
    if (heroName) heroName.textContent = data.personal.name;
    if (heroTitle) heroTitle.textContent = data.personal.title;
    if (heroSummary) heroSummary.textContent = data.personal.summary;
    
    // Update experience
    updateExperience(data.experience);
    
    // Update projects
    updateProjects(data.projects);
    
    // Update contact
    updateContact(data.links);
    
    console.log('Content updated!');
}

function updateExperience(experiences) {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '';
    
    const professionalExp = experiences.filter(exp => 
        !exp.type || (exp.type !== 'Volunteer' && exp.type !== 'Membership')
    );
    
    professionalExp.slice(0, 6).forEach(exp => {
        const item = document.createElement('article');
        item.className = 'timeline-item';
        
        item.innerHTML = `
            <div class="timeline-meta">
                <span class="timeline-role">${exp.role}</span>
                <span class="timeline-company">${exp.company}</span>
                <span class="timeline-time">${exp.date}</span>
            </div>
            <p><strong>${exp.location}</strong></p>
            <ul>${exp.details.map(d => `<li>${d}</li>`).join('')}</ul>
        `;
        
        timeline.appendChild(item);
    });
}

function updateProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
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
            </div>
        `;
        
        container.appendChild(card);
    });
}

function updateContact(links) {
    const contact = document.getElementById('contact-links');
    if (!contact) return;
    
    contact.innerHTML = `
        <a href="${links.email}" class="btn primary">
            <i class="fas fa-envelope"></i> Email
        </a>
        <a href="${links.linkedin}" target="_blank" class="btn ghost">
            <i class="fab fa-linkedin"></i> LinkedIn
        </a>
        <a href="${links.github}" target="_blank" class="btn ghost">
            <i class="fab fa-github"></i> GitHub
        </a>
    `;
}
