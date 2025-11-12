document.addEventListener('DOMContentLoaded', () => {
    // Année dynamique
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Bouton Retour Haut
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 300);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});