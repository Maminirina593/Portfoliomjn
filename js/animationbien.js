// js/animationbien.js – VERSION 2025 RAPIDE & RÉACTIVE (suivi souris instantané)
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
            opacity: { value: isMobile ? 0.9 : 0.75, random: true, anim: { enable: true, speed: 2.5, opacity_min: 0.4 } },
            size: { value: isSmall ? 12 : isMobile ? 10 : 6, random: true, anim: { enable: true, speed: 4.5, size_min: 2.5 } },
            line_linked: {
                enable: true,
                distance: isMobile ? 200 : 170,
                color: isDark ? "#ff3399" : "#a78bfa",
                opacity: isMobile ? 0.8 : 0.5,
                width: isMobile ? 3.8 : 2.4
            },
            move: {
                enable: true,
                speed: isMobile ? 3.2 : 2.4,    // + RAPIDE
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
                bubble: { distance: 240, size: 16, duration: 1.8 },
                repulse: { distance: 150, duration: 0.6 }
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

// === MOUVEMENT ULTRA-RAPIDE DE LA SOURIS / TOUCH ===
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

// Animation ULTRA RÉACTIVE (plus rapide = plus fun)
function animateCanvas() {
    // 0.18 → suit la souris presque instantanément (très nerveux & moderne)
    currentX += (mouseX - currentX) * 0.18;
    currentY += (mouseY - currentY) * 0.18;

    const intensity = window.innerWidth <= 768 ? 22 : 40;

    canvas.style.transform = `
        translate(${currentX * 0.04}px, ${currentY * 0.04}px)
        scale(${window.innerWidth <= 768 ? 1.06 : 1.04})
    `;

    requestAnimationFrame(animateCanvas);
}

// Démarrage
document.addEventListener("DOMContentLoaded", () => {
    initParticles();
    animateCanvas();

    new MutationObserver(initParticles).observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initParticles, 250);
    });
});