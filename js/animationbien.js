// js/animationbien.js → VERSION ULTIME 2025 – PARALLAXE 3D + GLOW + ULTRA RÉACTIVE
let pJ = null;
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
let velocityX = 0, velocityY = 0;
const canvas = document.getElementById("particles-js");
let isMobile = window.innerWidth <= 768;

// === GLOW DYNAMIQUE QUI SUIT LA SOURIS ===
const glow = document.createElement("div");
glow.style.cssText = `
  position: fixed;
  top: -150px; left: -150px;
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(138, 43, 226, 0.25) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.4s ease;
  mix-blend-mode: screen;
`;
document.body.appendChild(glow);

function initParticles() {
    const isDark = document.body.classList.contains("dark");
    const width = window.innerWidth;
    isMobile = width <= 768;
    const isSmall = width <= 480;

    const config = {
        particles: {
            number: { value: isSmall ? 40 : isMobile ? 60 : 110 },
            color: {
                value: isDark
                    ? ["#ff00ff", "#ff3399", "#cc00ff", "#e040fb", "#d500f9", "#9c27b0"]
                    : ["#c084fc", "#a78bfa", "#9333ea", "#d8b4fe", "#e9d5ff", "#d946ef"]
            },
            shape: { type: ["circle", "triangle", "star"] },
            opacity: { value: isMobile ? 0.85 : 0.8, random: true, anim: { enable: true, speed: 1.8, opacity_min: 0.3 } },
            size: { value: isSmall ? 10 : isMobile ? 9 : 7, random: true, anim: { enable: true, speed: 3, size_min: 2 } },
            line_linked: {
                enable: true,
                distance: isMobile ? 180 : 160,
                color: isDark ? "#ff3399" : "#a78bfa",
                opacity: isMobile ? 0.7 : 0.45,
                width: isMobile ? 2.8 : 2
            },
            move: {
                enable: true,
                speed: isMobile ? 3.8 : 3.2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "bounce",
                attract: { enable: true, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            events: {
                onhover: { enable: !isMobile, mode: "bubble" },
                onclick: { enable: true, mode: "repulse" },
                resize: true
            },
            modes: {
                bubble: { distance: 200, size: 18, duration: 1.5, opacity: 0.9 },
                repulse: { distance: 180, duration: 0.8 }
            }
        },
        retina_detect: true,
        background: { color: "transparent" }
    };

    if (pJ) {
        pJ.fn.particlesRefresh();
        Object.assign(pJ.particles, config.particles);
    } else {
        pJ = particlesJS("particles-js", config);
    }
}

// === MOUVEMENT SOURIS / TOUCH ULTRA PRÉCIS ===
function updateMouse(e) {
    if (e.touches) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    glow.style.opacity = isMobile ? "0" : "1";
}

document.addEventListener("mousemove", updateMouse);
document.addEventListener("touchmove", updateMouse, { passive: true });
document.addEventListener("touchstart", updateMouse, { passive: true });

// === ANIMATION PARALLAXE 3D + VIBRATION DYNAMIQUE ===
function animateCanvas() {
    // Suivi ultra rapide
    currentX += (mouseX - currentX) * 0.25;
    currentY += (mouseY - currentY) * 0.25;

    // Calcul de la vitesse du mouvement
    velocityX = mouseX - currentX;
    velocityY = mouseY - currentY;

    const intensity = isMobile ? 0 : 1;
    const speedFactor = Math.min(Math.sqrt(velocityX * velocityX + velocityY * velocityY) / 10, 3);

    // Effet 3D + vibration subtile quand tu bouges vite
    const rotateY = (currentX / window.innerWidth) * 12 - 6;
    const rotateX = -(currentY / window.innerHeight) * 12 + 6;

    canvas.style.transform = `
        perspective(1200px)
        rotateY(${rotateY * intensity}deg)
        rotateX(${rotateX * intensity}deg)
        translate(${currentX * 0.03}px, ${currentY * 0.03}px)
        scale(${1 + (speedFactor * 0.008)})
    `;

    // Glow suit la souris
    if (!isMobile) {
        glow.style.transform = `translate(${mouseX - 150}px, ${mouseY - 150}px)`;
    }

    requestAnimationFrame(animateCanvas);
}

// === DÉMARRAGE ===
document.addEventListener("DOMContentLoaded", () => {
    initParticles();
    animateCanvas();

    // Re-init au changement de thème
    new MutationObserver(initParticles).observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    // Re-init au resize
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            isMobile = window.innerWidth <= 768;
            initParticles();
        }, 300);
    });
});