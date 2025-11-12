document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    let currentSection = 'home';

    // Créer l'indicateur dynamiquement
    const indicator = document.createElement('div');
    indicator.className = 'nav-indicator';
    nav.appendChild(indicator);

    const moveIndicator = (activeLink) => {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        const offsetX = linkRect.left - navRect.left + linkRect.width / 2;
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.height = `${linkRect.height}px`;
        indicator.style.transform = `translateX(${offsetX - linkRect.width / 2}px)`;
    };

    const activateSection = (id) => {
        if (currentSection === id) return;
        currentSection = id;
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
                moveIndicator(link);
            }
        });
    };

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    activateSection(href.substring(1));
                }
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                activateSection(id);
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));

    // Initialiser
    const initialActive = document.querySelector('.nav-link.active');
    if (initialActive) {
        moveIndicator(initialActive);
    }

    window.addEventListener('resize', () => {
        const active = document.querySelector('.nav-link.active');
        if (active) moveIndicator(active);
    });
});