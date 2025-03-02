// Utility functions
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

// DOM Elements
const mobileMenu = select('.mobile-menu');
const navLinks = select('.nav-links');
const preloader = select('.preloader');
const hero = select('.hero-content');
const nav = select('nav');
const scrollBtn = select('#scroll-top');
const sections = selectAll('section');
const navLinksAll = selectAll('.nav-links a');

// Mobile Menu Handlers
const toggleMobileMenu = () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
};

mobileMenu.addEventListener('click', toggleMobileMenu);

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Close menu when clicking a link
navLinksAll.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Responsive image loading
function loadResponsiveImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (window.innerWidth <= 768) {
            img.setAttribute('loading', 'lazy');
        }
    });
}

window.addEventListener('load', loadResponsiveImages);
window.addEventListener('resize', loadResponsiveImages);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu after clicking
        navLinks.classList.remove('active');
    });
});

// Scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

// Scroll Handlers
const handleScroll = () => {
    // Scroll progress
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = window.scrollY / windowHeight;
    select('.scroll-progress').style.transform = `scaleX(${progress})`;

    // Parallax effect
    if (hero) hero.style.transform = `translateY(${window.pageYOffset * 0.3}px)`;

    // Scroll to top button visibility
    scrollBtn?.classList.toggle('visible', window.pageYOffset > 300);

    // Navigation background
    nav.classList.toggle('scrolled', window.scrollY > 50);

    // Active navigation highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
    });
};

window.addEventListener('scroll', handleScroll);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    const scroll = window.pageYOffset;
    hero.style.transform = `translateY(${scroll * 0.5}px)`;
});

// Timeline animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 1s forwards';
        } else {
            // Reset animation when element is out of view
            entry.target.style.animation = 'none';
            entry.target.offsetHeight; // Trigger reflow
            entry.target.style.animation = null;
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item, .wayang-card, .gallery-item').forEach(item => {
    observer.observe(item);
});

// Initialize AOS with enhanced settings
AOS.init({
    duration: 1000,
    once: false,
    offset: 100,
    mirror: true,
    anchorPlacement: 'center-bottom',
    easing: 'ease-out-cubic'
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Scroll to top functionality
scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add smooth parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.wayang-card, .gallery-item');
    
    parallaxElements.forEach(element => {
        const speed = 0.05;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});