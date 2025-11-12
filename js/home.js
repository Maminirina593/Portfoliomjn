// === Animation SEULEMENT sur "Hello I am", etc. ===
// Titre "Fullstack Developer" reste FIXE
if (document.querySelector('.greeting-text')) {
    
    const getGreetingPhrases = () => {
        const lang = document.body.getAttribute('data-lang') || 'fr';
        if (lang === 'fr') {
            return ["Salut je suis", "Bonjour je suis", "Bienvenue je suis"];
        } else {
            return ["Hello I am", "Hi I am", "Welcome I am"];
        }
    };

    let phrases = getGreetingPhrases();
    let index = 0, char = 0, deleting = false;
    const el = document.querySelector('.greeting-text');
    const speed = 120, delSpeed = 80, pause = 1500;
    let animationTimeout;

    const type = () => {
        phrases = getGreetingPhrases();
        const current = phrases[index];
        el.textContent = deleting ? current.substring(0, char - 1) : current.substring(0, char + 1);
        char = deleting ? char - 1 : char + 1;

        if (!deleting && char === current.length) {
            deleting = true;
            animationTimeout = setTimeout(type, pause);
        } else if (deleting && char === 0) {
            deleting = false;
            index = (index + 1) % phrases.length;
            animationTimeout = setTimeout(type, 500);
        } else {
            animationTimeout = setTimeout(type, deleting ? delSpeed : speed);
        }
    };

    animationTimeout = setTimeout(type, 800);

    document.addEventListener('languageChanged', function() {
        clearTimeout(animationTimeout);
        phrases = getGreetingPhrases();
        index = 0;
        char = 0;
        deleting = false;
        animationTimeout = setTimeout(type, 800);
    });
}

if (document.querySelector('.static-title')) {
    const updateStaticTitle = () => {
        const lang = document.body.getAttribute('data-lang') || 'fr';
        const staticTitle = document.querySelector('.static-title');
        if (staticTitle) {
            staticTitle.textContent = lang === 'fr' ? 'Développeur Fullstack' : 'Fullstack Developer';
        }
    };

    updateStaticTitle();
    
    document.addEventListener('languageChanged', updateStaticTitle);
}