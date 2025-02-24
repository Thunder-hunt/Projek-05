// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navLinks.classList.remove('active');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
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