const translations = {
    fr: {
        "home.description": "Développeur Fullstack passionné par les nouvelles technologies et l'innovation. J'aime concevoir des applications web modernes, intuitives et performantes. Curieux, créatif et rigoureux, je cherche toujours à apprendre et à m'améliorer. Mon objectif : transformer les idées en solutions digitales concrètes et efficaces.",
        "home.contactBtn": "Me Contacter",
        "home.projectsBtn": "Voir mes Projets",
        "about.title": "À Propos de Moi",
        "about.text1": "Basé à Madagascar, je suis diplômé en informatique et développeur fullstack passionné par l'innovation et les technologies du web. Je conçois et développe des applications web modernes, performantes et sécurisées, en respectant les bonnes pratiques de développement et les standards du web. Ma démarche repose sur la qualité du code, la clarté de l'architecture et l'optimisation continue des performances. Curieux et rigoureux, je veille à maintenir mes compétences à jour afin de proposer des solutions adaptées aux besoins des utilisateurs et des organisations.",
        "about.text2": "De janvier 2025 à mai 2025, j'ai effectué un stage en tant que développeur web à la Direction Générale des Impôts (SSIF). J'y ai développé une application web dédiée à la création et au suivi des projets informatiques, en utilisant Symfony, Bootstrap et PostgreSQL. Cette expérience m'a permis de renforcer mes compétences en développement fullstack et de mieux comprendre les besoins réels d'un environnement professionnel.",
        "education.title": "Études & Certificats",
        "skills.title": "Mes Compétences",
        "projects.title": "Mes Projets",
        "contact.title": "Me Contacter",
        "contact.send": "Envoyer"
    },
    en: {
        "home.description": "Fullstack Developer passionate about new technologies and innovation. I love designing modern, intuitive, and high-performance web applications. Curious, creative, and rigorous, I'm always looking to learn and improve. My goal: transform ideas into concrete and effective digital solutions.",
        "home.contactBtn": "Contact Me",
        "home.projectsBtn": "View My Projects",
        "about.title": "About Me",
        "about.text1": "Based in Madagascar, I'm a computer science graduate and fullstack developer passionate about innovation and web technologies. I design and develop modern, performant, and secure web applications, following development best practices and web standards. My approach focuses on code quality, clear architecture, and continuous performance optimization. Curious and rigorous, I keep my skills up to date to provide solutions adapted to users' and organizations' needs.",
        "about.text2": "From January 2025 to May 2025, I completed an internship as a web developer at the General Tax Directorate (SSIF). I developed a web application dedicated to creating and tracking IT projects using Symfony, Bootstrap, and PostgreSQL. This experience allowed me to strengthen my fullstack development skills and better understand the real needs of a professional environment.",
        "education.title": "Education & Certificates",
        "skills.title": "My Skills",
        "projects.title": "My Projects",
        "contact.title": "Contact Me",
        "contact.send": "Send"
    }
};

function updateLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    document.body.setAttribute('data-lang', lang);
    localStorage.setItem('preferred-language', lang);
    
    const greetingText = document.querySelector('.greeting-text');
    if (greetingText) {
        greetingText.textContent = lang === 'fr' ? 'Bonjour, je suis' : 'Hello, I am';
    }
    
    const staticTitle = document.querySelector('.static-title');
    if (staticTitle) {
        staticTitle.textContent = lang === 'fr' ? 'Développeur Fullstack' : 'Fullstack Developer';
    }
    
    const formLabels = document.querySelectorAll('.form-group label');
    formLabels.forEach(label => {
        const forAttr = label.getAttribute('for');
        if (forAttr === 'name') {
            label.textContent = lang === 'fr' ? 'Nom' : 'Name';
        } else if (forAttr === 'email') {
            label.textContent = 'Email';
        } else if (forAttr === 'message') {
            label.textContent = lang === 'fr' ? 'Votre Message' : 'Your Message';
        }
    });
    
    const cvButton = document.querySelector('.btn-cv');
    if (cvButton) {
        cvButton.innerHTML = lang === 'fr' 
            ? '<i class="fas fa-file-pdf"></i> Télécharger mon CV'
            : '<i class="fas fa-file-pdf"></i> Download my CV';
    }
    
    const toggleBtn = document.getElementById('toggle-projects');
    if (toggleBtn) {
        const btnText = toggleBtn.querySelector('.btn-text');
        if (btnText && toggleBtn.classList.contains('collapsed')) {
            btnText.textContent = lang === 'fr' ? 'Voir plus de projets' : 'View more projects';
        } else if (btnText) {
            btnText.textContent = lang === 'fr' ? 'Voir moins de projets' : 'View less projects';
        }
    }
    
    const educationTitles = document.querySelectorAll('.education-column h3');
    educationTitles.forEach(title => {
        if (title.innerHTML.includes('Formations Académiques')) {
            title.innerHTML = lang === 'fr' 
                ? '<i class="fas fa-graduation-cap"></i> Formations Académiques'
                : '<i class="fas fa-graduation-cap"></i> Academic Education';
        } else if (title.innerHTML.includes('Certificats')) {
            title.innerHTML = lang === 'fr'
                ? '<i class="fas fa-certificate"></i> Certificats & Formations'
                : '<i class="fas fa-certificate"></i> Certificates & Training';
        }
    });
    
    const skillTitles = document.querySelectorAll('.skills-column h3');
    skillTitles.forEach(title => {
        if (title.textContent === 'Développement') {
            title.textContent = lang === 'fr' ? 'Développement' : 'Development';
        } else if (title.textContent === 'Autres Compétences') {
            title.textContent = lang === 'fr' ? 'Autres Compétences' : 'Other Skills';
        }
    });
    
    const softSkillsTitle = document.querySelector('.soft-skills h3');
    if (softSkillsTitle) {
        softSkillsTitle.textContent = lang === 'fr' ? 'Soft Skills' : 'Soft Skills';
    }
    
    const skillGroups = document.querySelectorAll('.skill-group h4');
    skillGroups.forEach(group => {
        const text = group.textContent;
        if (lang === 'en') {
            if (text === 'Langages de Programmation') group.textContent = 'Programming Languages';
            else if (text === 'Front-End') group.textContent = 'Front-End';
            else if (text === 'Back-End') group.textContent = 'Back-End';
            else if (text === 'Web Tech') group.textContent = 'Web Technologies';
            else if (text === 'Outils') group.textContent = 'Tools';
            else if (text === 'Base de données') group.textContent = 'Database';
            else if (text === 'Microsoft Office') group.textContent = 'Microsoft Office';
            else if (text === 'Systèmes d\'exploitation') group.textContent = 'Operating Systems';
            else if (text === 'Logiciels Création Graphique') group.textContent = 'Graphic Design Software';
        } else {
            if (text === 'Programming Languages') group.textContent = 'Langages de Programmation';
            else if (text === 'Front-End') group.textContent = 'Front-End';
            else if (text === 'Back-End') group.textContent = 'Back-End';
            else if (text === 'Web Technologies') group.textContent = 'Web Tech';
            else if (text === 'Database') group.textContent = 'Base de données';
            else if (text === 'Tools') group.textContent = 'Outils';
            else if (text === 'Microsoft Office') group.textContent = 'Microsoft Office';
            else if (text === 'Operating Systems') group.textContent = 'Systèmes d\'exploitation';
            else if (text === 'Graphic Design Software') group.textContent = 'Logiciels Création Graphique';
        }
    });
    
    const softSkills = document.querySelectorAll('.soft-tags span');
    softSkills.forEach(skill => {
        const text = skill.textContent;
        if (lang === 'en') {
            if (text.includes('Travail d\'équipe')) skill.innerHTML = '<i class="fas fa-users"></i> Teamwork';
            else if (text.includes('Gestion du temps')) skill.innerHTML = '<i class="fas fa-clock"></i> Time Management';
            else if (text.includes('Résolution de problèmes')) skill.innerHTML = '<i class="fas fa-lightbulb"></i> Problem Solving';
            else if (text.includes('Adaptabilité')) skill.innerHTML = '<i class="fas fa-sync"></i> Adaptability';
        } else {
            if (text.includes('Teamwork')) skill.innerHTML = '<i class="fas fa-users"></i> Travail d\'équipe';
            else if (text.includes('Time Management')) skill.innerHTML = '<i class="fas fa-clock"></i> Gestion du temps';
            else if (text.includes('Problem Solving')) skill.innerHTML = '<i class="fas fa-lightbulb"></i> Résolution de problèmes';
            else if (text.includes('Adaptability')) skill.innerHTML = '<i class="fas fa-sync"></i> Adaptabilité';
        }
    });
    
    const projectDescriptions = document.querySelectorAll('.project-card p');
    projectDescriptions.forEach(desc => {
        const text = desc.textContent;
        if (lang === 'en') {
            if (text.includes('Application complète de gestion de stock')) desc.textContent = 'Complete inventory management application with stock tracking, alerts and dynamic reports.';
            else if (text.includes('Plateforme de suivi de projets IT')) desc.textContent = 'IT project tracking platform with Gantt charts, tasks, notifications and advanced reports.';
            else if (text.includes('Version moderne avec API REST')) desc.textContent = 'Modern version with REST API, React frontend and analytical dashboard.';
            else if (text.includes('Jeu interactif avec IA')) desc.textContent = 'Interactive game with AI, 3D animations, multiplayer mode and custom themes.';
            else if (text.includes('Outil de planification annuelle')) desc.textContent = 'Annual planning tool with calendars, reports and PDF export.';
            else if (text.includes('Système de cotisation avec rappels')) desc.textContent = 'Membership system with reminders, history and receipt generation.';
        } else {
            if (text.includes('Complete inventory management application')) desc.textContent = 'Application complète de gestion de stock avec suivi des inventaires, alertes et rapports dynamiques.';
            else if (text.includes('IT project tracking platform')) desc.textContent = 'Plateforme de suivi de projets IT avec Gantt, tâches, notifications et rapports avancés.';
            else if (text.includes('Modern version with REST API')) desc.textContent = 'Version moderne avec API REST, React frontend et dashboard analytique.';
            else if (text.includes('Interactive game with AI')) desc.textContent = 'Jeu interactif avec IA, animations 3D, mode multijoueur et thèmes personnalisés.';
            else if (text.includes('Annual planning tool')) desc.textContent = 'Outil de planification annuelle avec calendriers, rapports et export PDF.';
            else if (text.includes('Membership system with reminders')) desc.textContent = 'Système de cotisation avec rappels, historique et génération de reçus.';
        }
    });
    
    const demoLinks = document.querySelectorAll('.demo-link');
    demoLinks.forEach(link => {
        link.innerHTML = lang === 'fr' 
            ? '<i class="fas fa-video"></i> Démo'
            : '<i class="fas fa-video"></i> Demo';
    });
    
    const footerText = document.querySelector('.copyright');
    if (footerText) {
        footerText.innerHTML = lang === 'fr'
            ? '© <span id="currentYear"></span> <strong>Maminirina Jean Noel</strong>. Tous droits réservés.'
            : '© <span id="currentYear"></span> <strong>Maminirina Jean Noel</strong>. All rights reserved.';
    }
    
    const madeWith = document.querySelector('.made-with');
    if (madeWith) {
        madeWith.innerHTML = lang === 'fr'
            ? 'Fait avec <i class="fas fa-heart"></i> et <i class="fas fa-code"></i> par <strong>Maminirina</strong>'
            : 'Made with <i class="fas fa-heart"></i> and <i class="fas fa-code"></i> by <strong>Maminirina</strong>';
    }
    
    const aboutSectionTitle = document.querySelector('#about .about-card h3');
    if (aboutSectionTitle && aboutSectionTitle.textContent === 'Expérience Professionnelle') {
        aboutSectionTitle.textContent = lang === 'fr' ? 'Expérience Professionnelle' : 'Professional Experience';
    }
    
    const educationCards = document.querySelectorAll('.education-card .edu-desc');
    educationCards.forEach(card => {
        const text = card.textContent;
        if (lang === 'en') {
            if (text.includes('Renforcement des compétences en développement logiciel moderne')) card.textContent = 'Strengthening skills in modern software development, including artificial intelligence, mobile development, agile project management, virtualization, and data analysis for better decision-making.';
            else if (text.includes('Formation complète en développement logiciel')) card.textContent = 'Complete software development training: Java, C++, C, PHP, JS, modern frameworks, relational databases, fullstack web development.';
            else if (text.includes('Node.js, Express, React, MongoDB')) card.textContent = 'Node.js, Express, React, MongoDB';
            else if (text.includes('Communication professionnelle, expression orale')) card.textContent = 'Professional communication, oral expression, technical vocabulary';
        } else {
            if (text.includes('Strengthening skills in modern software development')) card.textContent = 'Renforcement des compétences en développement logiciel moderne, incluant l\'intelligence artificielle, le mobile, la gestion agile de projets, la virtualisation et l\'analyse de données pour une meilleure prise de décision.';
            else if (text.includes('Complete software development training')) card.textContent = 'Formation complète en développement logiciel : Java, C++, C, PHP, JS, frameworks modernes, bases de données relationnelles, développement web fullstack.';
            else if (text.includes('Node.js, Express, React, MongoDB')) card.textContent = 'Node.js, Express, React, MongoDB';
            else if (text.includes('Professional communication, oral expression')) card.textContent = 'Communication professionnelle, expression orale, vocabulaire technique';
        }
    });
    
    const educationTags = document.querySelectorAll('.edu-tags span');
    educationTags.forEach(tag => {
        const text = tag.textContent;
        if (lang === 'en') {
            if (text === 'Intelligence Artificielle') tag.textContent = 'Artificial Intelligence';
            else if (text === 'Application Mobile') tag.textContent = 'Mobile Application';
            else if (text === 'Gestion de Projet Agile') tag.textContent = 'Agile Project Management';
            else if (text === 'Virtualisation') tag.textContent = 'Virtualization';
            else if (text === 'Data Analyste') tag.textContent = 'Data Analyst';
            else if (text === 'Programmation orientée objet') tag.textContent = 'Object Oriented Programming';
            else if (text === 'Bases de données') tag.textContent = 'Databases';
            else if (text === 'Développement web fullstack') tag.textContent = 'Fullstack Web Development';
            else if (text === 'Architecture multi-tiers') tag.textContent = 'Multi-tier Architecture';
            else if (text === 'Algorithmique') tag.textContent = 'Algorithms';
            else if (text === 'Conception relationnelle') tag.textContent = 'Relational Design';
        } else {
            if (text === 'Artificial Intelligence') tag.textContent = 'Intelligence Artificielle';
            else if (text === 'Mobile Application') tag.textContent = 'Application Mobile';
            else if (text === 'Agile Project Management') tag.textContent = 'Gestion de Projet Agile';
            else if (text === 'Virtualization') tag.textContent = 'Virtualisation';
            else if (text === 'Data Analyst') tag.textContent = 'Data Analyste';
            else if (text === 'Object Oriented Programming') tag.textContent = 'Programmation orientée objet';
            else if (text === 'Databases') tag.textContent = 'Bases de données';
            else if (text === 'Fullstack Web Development') tag.textContent = 'Développement web fullstack';
            else if (text === 'Multi-tier Architecture') tag.textContent = 'Architecture multi-tiers';
            else if (text === 'Algorithms') tag.textContent = 'Algorithmique';
            else if (text === 'Relational Design') tag.textContent = 'Conception relationnelle';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const langSelect = document.getElementById('lang-select');
    const savedLang = localStorage.getItem('preferred-language') || 'fr';
    
    langSelect.value = savedLang;
    updateLanguage(savedLang);
    
    langSelect.addEventListener('change', e => {
        updateLanguage(e.target.value);
    });
});