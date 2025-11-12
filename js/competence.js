/**
 * skills.js – Animation d'apparition douce
 */
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-group, .soft-skills').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});