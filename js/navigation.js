// ==================== NAVIGATION ACTIVE STATE – FIXE & FLUIDE ====================
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    // Active la bonne icône au chargement
    function setActiveLink() {
        let current = "home";

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }

    // Écoute le scroll – ultra optimisé (pas de lag, pas de saut)
    let ticking = false;
    window.addEventListener("scroll", function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                setActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Au clic – smooth scroll + mise à jour
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: "smooth"
                });

                // Met à jour l'état actif
                navLinks.forEach(l => l.classList.remove("active"));
                this.classList.add("active");
            }
        });
    });

    // Premier chargement
    setActiveLink();
});