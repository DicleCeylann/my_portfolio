// Extremely simple script for debugging
console.log('Simple script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - simple version');
    
    // Check if basic elements exist
    const heroName = document.getElementById('hero-name');
    const heroTitle = document.getElementById('hero-title');
    
    if (heroName) {
        console.log('Hero name element found');
        heroName.style.border = '2px solid red';
    } else {
        console.log('Hero name element NOT found');
    }
    
    if (heroTitle) {
        console.log('Hero title element found');
        heroTitle.style.border = '2px solid blue';
    } else {
        console.log('Hero title element NOT found');
    }
    
    // Set footer year
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
        console.log('Footer year set');
    }
    
    // Basic theme toggle
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        console.log('Theme toggle found');
        themeToggle.addEventListener("click", () => {
            console.log('Theme toggle clicked');
            const root = document.documentElement;
            const currentTheme = root.getAttribute("data-theme");
            
            if (currentTheme === "light") {
                root.removeAttribute("data-theme");
            } else {
                root.setAttribute("data-theme", "light");
            }
        });
    }
    
    // Test data loading
    console.log('Attempting to load data...');
    fetch('./data.json')
        .then(response => {
            console.log('Fetch response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data loaded successfully:', data);
            
            // Update only the hero section for now
            if (data.personal) {
                if (heroName) {
                    heroName.textContent = data.personal.name;
                    heroName.style.border = '2px solid green';
                    console.log('Hero name updated');
                }
                if (heroTitle) {
                    heroTitle.textContent = data.personal.title;
                    heroTitle.style.border = '2px solid green';
                    console.log('Hero title updated');
                }
            }
        })
        .catch(error => {
            console.error('Error loading data:', error);
            
            // Show error visually
            if (heroName) {
                heroName.textContent = 'Error loading data: ' + error.message;
                heroName.style.color = 'red';
            }
        });
});
