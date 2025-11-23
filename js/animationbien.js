// js/animationbien.js
particlesJS("particles-js", {
    particles: {
        number: { value: 100 },
        color: { value: ["#ff00ff", "#ff3399", "#cc00ff"] },
        shape: { type: "circle" },
        opacity: { value: 0.6, random: true },
        size: { value: 5, random: true, anim: { enable: true, speed: 3, size_min: 0.3 } },
        line_linked: { enable: true, distance: 160, color: "#ff3399", opacity: 0.4, width: 2 },
        move: { enable: true, speed: 1.5, random: true }
    },
    interactivity: {
        events: { onhover: { enable: true, mode: "bubble" } },
        modes: { bubble: { distance: 250, size: 10, duration: 2 } }
    }
});