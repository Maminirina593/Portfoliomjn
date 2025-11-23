// js/animationbien.js – VERSION PRO 2025 : simple, beau, réactif, sans reload
let pJ = null;

function initParticles() {
    const isDark = document.body.classList.contains("dark");
    const isMobile = window.innerWidth <= 768;
    const isSmall = window.innerWidth <= 480;

    // Configuration ultra-pro avec adaptation mobile + thème
    const config = {
        particles: {
            number: {
                value: isSmall ? 38 : isMobile ? 55 : 100,
                density: { enable: true, value_area: 800 }
            },
            color: {
                value: isDark
                    ? ["#ff00ff", "#ff3399", "#cc00ff", "#e040fb", "#d500f9"]
                    : ["#c084fc", "#a78bfa", "#9333ea", "#d8b4fe", "#e9d5ff"]
            },
            shape: { type: "circle" },
            opacity: {
                value: isMobile ? 0.9 : 0.65,
                random: true,
                anim: { enable: true, speed: 2, opacity_min: 0.3, sync: false }
            },
            size: {
                value: isSmall ? 11 : isMobile ? 9 : 5.5,
                random: true,
                anim: { enable: true, speed: 3.5, size_min: 2, sync: false }
            },
            line_linked: {
                enable: true,
                distance: isMobile ? 190 : 160,
                color: isDark ? "#ff3399" : "#a78bfa",
                opacity: isMobile ? 0.75 : 0.45,
                width: isMobile ? 3.2 : 2
            },
            move: {
                enable: true,
                speed: isMobile ? 2 : 1.6,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                attract: { enable: false }
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
                bubble: { distance: 220, size: 13, duration: 2, opacity: 0.9 },
                repulse: { distance: 130, duration: 0.7 }
            }
        },
        retina_detect: true,
        background: { color: "transparent" }
    };

    // Si déjà initialisé → mise à jour fluide
    if (pJ) {
        pJ.particles.color.value = config.particles.color.value;
        pJ.particles.line_linked.color = config.particles.line_linked.color;
        pJ.particles.size.value = config.particles.size.value;
        pJ.particles.opacity.value = config.particles.opacity.value;
        pJ.particles.line_linked.opacity = config.particles.line_linked.opacity;
        pJ.particles.line_linked.width = config.particles.line_linked.width;
        pJ.fn.particlesRefresh();
    } else {
        pJ = particlesJS("particles-js", config);
    }
}

// Lancement + adaptation au thème + resize
document.addEventListener("DOMContentLoaded", () => {
    initParticles();

    // Changement de thème → mise à jour instantanée
    new MutationObserver(initParticles).observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    // Responsive fluide
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initParticles, 300);
    });
});