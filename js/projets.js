document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projects-grid');
    const toggleBtn = document.getElementById('toggle-projects');
    const hiddenCards = document.querySelectorAll('.project-card.hidden');
    const btnText = toggleBtn.querySelector('.btn-text');
    const icon = toggleBtn.querySelector('.toggle-icon');

    let isExpanded = false;

    const updateButtonText = () => {
        const currentLang = document.body.getAttribute('data-lang') || 'fr';
        if (isExpanded) {
            btnText.textContent = currentLang === 'fr' ? 'Voir moins de projets' : 'View less projects';
            toggleBtn.classList.remove('collapsed');
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            btnText.textContent = currentLang === 'fr' ? 'Voir plus de projets' : 'View more projects';
            toggleBtn.classList.add('collapsed');
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
        observer.observe(card);
    });

    toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;

        hiddenCards.forEach((card, i) => {
            if (isExpanded) {
                card.classList.remove('hidden');
                setTimeout(() => card.classList.add('visible'), i * 100);
            } else {
                card.classList.remove('visible');
                setTimeout(() => card.classList.add('hidden'), i * 50);
            }
        });

        updateButtonText();
    });

    updateButtonText();
});