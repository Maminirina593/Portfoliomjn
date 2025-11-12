/**
 * education.js
 * Animation d'apparition progressive des cards
 * Intersection Observer + stagger effect
 */

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.education-card');
    let delay = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                delay += 150;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Initialisation : cacher les cards
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});