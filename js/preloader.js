
// PRELOADER MJN – VERSION DIEU 2025 (le plus beau du monde)
(function () {
    const preloader = document.getElementById("preloader");
    const counter = document.getElementById("counter");
    const progress = document.querySelector(".circle-progress");
    const letters = document.querySelectorAll(".letter");
    const circumference = 465;

    let count = 0;
    const startTime = Date.now();
    const minDuration = 3500; // au moins 3.5s pour le show

    document.body.style.overflow = "hidden";

    function update() {
        count += 1.6 + Math.random() * 1.4;
        if (count > 100) count = 100;

        counter.textContent = Math.round(count);
        progress.style.strokeDashoffset = circumference - (count / 100) * circumference;

        // Apparition épique des lettres MJN
        if (count > 15) letters[0].classList.add("visible"); // M
        if (count > 45) letters[1].classList.add("visible"); // J
        if (count > 75) letters[2].classList.add("visible"); // N

        if (count < 100 || Date.now() - startTime < minDuration) {
            requestAnimationFrame(update);
        } else {
            setTimeout(() => {
                preloader.classList.add("done");
                document.body.style.overflow = "auto";
            }, 800);
        }
    }

    requestAnimationFrame(update);

    // Cache / retour rapide
    window.addEventListener("load", () => {
        const elapsed = Date.now() - startTime;
        if (elapsed < minDuration) {
            setTimeout(() => {
                count = 100;
                counter.textContent = "100";
                progress.style.strokeDashoffset = 0;
                letters.forEach(l => l.classList.add("visible"));
                setTimeout(() => preloader.classList.add("done"), 800);
            }, minDuration - elapsed);
        }
    });
})();
