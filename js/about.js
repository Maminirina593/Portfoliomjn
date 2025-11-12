// === Animation d'entrée des cards ===
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.about-card').forEach(card => {
        observer.observe(card);
    });
});
