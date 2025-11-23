// js/animationbien.js – PARFAIT : changement dark/light SANS RELOAD + mobile géant
let pJ; // Variable globale pour garder la référence de particles.js

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("particles-js");
    let tx = 0, ty = 0;
    const isMobile = window.innerWidth <= 768;
    const isVerySmall = window.innerWidth <= 480;

    // Fonction pour (re)charger ou mettre à jour les particules
    function initParticles() {
        const isDark = document.body.classList.contains("dark");

        const config = {
            particles: {
                number: {
                    value: isVerySmall ? 35 : isMobile ? 50 : 100,
                    density: { enable: true, value_area: 800 }
                },
                color: {
                    value: isDark
                        ? ["#ff00ff", "#ff3399", "#cc00ff", "#e040fb", "#d500f9"]
                        : ["#b388ff", "#9933ff", "#7c4dff", "#d1c4e9", "#e0d4ff"]
                },
                shape: { type: "circle" },
                opacity: {
                    value: isMobile ? 0.95 : 0.65,
                    random: true,
                    anim: { enable: true, speed: 1.5, opacity_min: 0.4 }
                },
                size: {
                    value: isVerySmall ? 11 : isMobile ? 9 : 5,
                    random: true,
                    anim: { enable: true, speed: 4, size_min: 3 }
                },
                line_linked: {
                    enable: true,
                    distance: isMobile ? 200 : 160,
                    color: isDark ? "#ff3399" : "#9933ff",
                    opacity: isMobile ? 0.8 : 0.45,
                    width: isMobile ? 3.5 : 2
                },
                move: {
                    enable: true,
                    speed: isMobile ? 2.2 : 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: !isMobile, mode: "bubble" },
                    onclick: { enable: true, mode: "repulse" },
                    resize: true
                },
                modes: {
                    bubble: { distance: 200, size: 14, duration: 2 },
                    repulse: { distance: 140, duration: 0.8 }
                }
            },
            retina_detect: true
        };

        // Si particles.js existe déjà → on met juste à jour les couleurs
        if (pJ && pJ.particles) {
            pJ.particles.color.value = config.particles.color.value;
            pJ.particles.line_linked.color = config.particles.line_linked.color;
            pJ.fn.particlesRefresh();
        } else {
            // Première initialisation
            pJ = particlesJS("particles-js", config);
        }
    }

    // Mouvement doux (souris + tactile)
    const move = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        tx = (clientX / window.innerWidth - 0.5) * (isMobile ? 20 : 35);
        ty = (clientY / window.innerHeight - 0.5) * (isMobile ? 20 : 35);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("touchmove", move, { passive: true });

    function animate() {
        canvas.style.transform = `translate(${tx}px, ${ty}px) scale(${isMobile ? 1.04 : 1.02})`;
        requestAnimationFrame(animate);
    }
    animate();

    // Initialisation
    initParticles();

    // CHANGEMENT DE THÈME → mise à jour INSTANTANÉE sans reload !
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "attributes" && mutation.attributeName === "class") {
                initParticles(); // Met à jour les couleurs en 0.1s sans recharger
            }
        });
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    // Au redimensionnement (passage mobile → desktop)
    window.addEventListener("resize", () => {
        setTimeout(initParticles, 300); // Petit délai pour éviter les bugs
    });
});