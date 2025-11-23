// js/animationbien.js – VERSION 2025 PRO : Suivi de souris + mobile parfait
let pJ = null;
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
const canvas = document.getElementById("particles-js");

function initParticles() {
    const isDark = document.body.classList.contains("dark");
    const width = window.innerWidth;
    const isMobile = width <= 768;
    const isSmall = width <= 480;

    const config = {
        particles: {
            number: { value: isSmall ? 38 : isMobile ? 55 : 100, density: { enable: true, value_area: 800 } },
            color: {
                value: isDark
                    ? ["#ff00ff", "#ff3399", "#cc00ff", "#e040fb", "#d500f9"]
                    : ["#c084fc", "#a78bfa", "#9333ea", "#d8b4fe", "#e9d5ff"]
            },
            shape: { type: "circle" },
            opacity: { value: isMobile ? 0.9 : 0.7, random: true, anim: { enable: true, speed: 2, opacity_min: 0.35 } },
            size: { value: isSmall ? 11 : isMobile ? 9 : 5.5, random: true, anim: { enable: true, speed: 3.5, size_min: 2 } },
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
                bubble: { distance: 220, size: 14, duration: 2 },
                repulse: { distance: 140, duration: 0.7 }
            }
        },
        retina_detect: true,
        background: { color: "transparent" }
    };

    if (pJ) {
        Object.assign(pJ.particles, config.particles);
        pJ.fn.particlesRefresh();
    } else {
        pJ = particlesJS("particles-js", config);
    }
}

// === MOUVEMENT DE LA SOURIS / TOUCHER (MAGNIFIQUE & FLUIDE) ===
function updateMouse(e) {
    if (e.touches) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
}

document.addEventListener("mousemove", updateMouse);
document.addEventListener("touchmove", updateMouse, { passive: true });
document.addEventListener("touchstart", updateMouse, { passive: true });

// Animation fluide du canvas qui suit la souris
function animateCanvas() {
    // Lissage ultra doux (0.08 = très fluide)
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    const intensity = window.innerWidth <= 768 ? 18 : 32; // Moins fort sur mobile

    canvas.style.transform = `
        translate(${currentX * 0.03}px, ${currentY * 0.03}px)
        scale(${window.innerWidth <= 768 ? 1.05 : 1.03})
    `;

    requestAnimationFrame(animateCanvas);
}

// Démarrage
document.addEventListener("DOMContentLoaded", () => {
    initParticles();
    animateCanvas();

    // Thème change → mise à jour instantanée
    new MutationObserver(initParticles).observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    // Resize → réinit douce
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initParticles, 300);
    });
});