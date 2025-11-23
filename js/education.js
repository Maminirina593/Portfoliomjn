// js/education.js – Animation d'apparition + fond animé activé (2025 PRO)
document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // 1. Animation des cartes au scroll (GSAP intégré – zéro CDN)
    // =========================================
    const animateCards = () => {
        const cards = document.querySelectorAll(".education-card");

        cards.forEach((card, index) => {
            // Valeurs initiales (dans le CSS : opacity:0 + translateY(30px))
            card.style.transition = "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)";

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0)";
                        }, index * 180); // stagger fluide
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            observer.observe(card);
        });
    };

    // =========================================
    // 2. Animation du titre + ligne sous le titre
    // =========================================
    const animateTitle = () => {
        const title = document.querySelector("#education h2");
        const line = title?.nextElementSibling || document.querySelector("#education h2::after");

        if (!title) return;

        title.style.opacity = "0";
        title.style.transform = "translateY(50px)";

        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    title.style.transition = "all 1.2s ease-out";
                    title.style.opacity = "1";
                    title.style.transform = "translateY(0)";
                }
            });
        }, { threshold: 0.3 }).observe(title);
    };

    // =========================================
    // 3. Icônes flottantes (déjà dans le CSS) → on force le restart en cas de resize
    // =========================================
    const restartFloat = () => {
        document.querySelectorAll(".edu-icon").forEach(icon => {
            icon.style.animation = "none";
            icon.offsetHeight; // trigger reflow
            icon.style.animation = "float 6s ease-in-out infinite";
        });
    };

    // =========================================
    // 4. Détection du mode dark/light → réactiver le fond animé
    // =========================================
    const checkDarkMode = () => {
        const section = document.querySelector("#education");
        const bgLayer = section?.querySelector("::before") || section;

        if (document.body.classList.contains("dark")) {
            section.style.setProperty("--bg-opacity", "1");
        } else {
            section.style.setProperty("--bg-opacity", "0");
        }
    };

    // Lancement de tout
    animateTitle();
    animateCards();
    restartFloat();
    checkDarkMode();

    // Réactiver au changement de thème ou resize
    window.addEventListener("resize", () => {
        restartFloat();
    });

    // Si tu as un système de toggle dark/light (class sur <body>)
    new MutationObserver(checkDarkMode).observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });
});