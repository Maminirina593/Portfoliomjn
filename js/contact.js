/**
 * contact.js – Formulaire de contact + EmailJS
 * Fonctionne avec : service_d8hf2rp | template_avl3meh | VrEUDWmNoSjcnNx_B
 * CORRIGÉ 2025 : Erreur 400 → Ajout user_id + gestion parfaite des params
 * SUCCÈS : "Message envoyé avec succès !"
 * ERREUR : Message ultra clair (jamais "inconnue") + console détaillée
 */
document.addEventListener('DOMContentLoaded', () => {
    // === ÉLÉMENTS DU DOM ===
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('formMessage');
    const info = document.querySelector('.contact-info');
    const formEl = document.querySelector('.contact-form');

    // === CONFIGURATION EMAILJS (NE PAS TOUCHER) ===
    const EMAILJS_USER_ID = 'VrEUDWmNoSjcnNx_B';
    const EMAILJS_SERVICE_ID = 'service_d8hf2rp';
    const EMAILJS_TEMPLATE_ID = 'template_avl3meh';

    // === VÉRIFIER QUE EMAILJS EST CHARGÉ ===
    if (typeof emailjs === 'undefined') {
        console.error('ERREUR : EmailJS SDK non chargé !');
        showMessage('Erreur : EmailJS non chargé. Rechargez.', 'error');
        return;
    }

    // === INITIALISER EMAILJS ===
    try {
        emailjs.init(EMAILJS_USER_ID);
        console.log('EmailJS initialisé avec succès');
    } catch (err) {
        console.error('Échec init EmailJS :', err);
        showMessage('Erreur système.', 'error');
        return;
    }

    // === ANIMATION D'APPARITION (Intersection Observer) ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    observer.observe(info);
    observer.observe(formEl);

    // === GESTION DU FORMULAIRE ===
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Récupération des valeurs
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // === VALIDATION ===
        if (!name || !email || !message) {
            showMessage('Veuillez remplir tous les champs.', 'error');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessage('Adresse email invalide.', 'error');
            return;
        }

        // === BOUTON EN COURS D'ENVOI ===
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const icon = submitBtn.querySelector('.send-icon');

        submitBtn.disabled = true;
        btnText.textContent = 'Envoi en cours...';
        icon.classList.remove('fa-paper-plane');
        icon.classList.add('fa-spinner', 'fa-spin');

        // === PARAMÈTRES EMAILJS (CORRIGÉ POUR 400/422) ===
        const templateParams = {
            from_name: name,      // EmailJS attend "from_name"
            from_email: email,    // EmailJS attend "from_email"
            message: message      // OK
        };

        // === ENVOI VIA EMAILJS (AVEC user_id explicite pour éviter 400) ===
        try {
            console.log('Envoi vers EmailJS...', templateParams);

            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_USER_ID  // ← CLÉ PUBLIQUE AJOUTÉE ICI (corrige le 400)
            );

            // SUCCÈS
            console.log('SUCCÈS !', response);
            showMessage('Message envoyé avec succès !', 'success');
            form.reset();

        } catch (error) {
            // GESTION COMPLÈTE DES ERREURS (ultra précise)
            console.error('ERREUR EMAILJS :', error);

            let userMsg = '';

            // Affichage du vrai message EmailJS si disponible
            if (error?.text) {
                userMsg = error.text.replace('EmailJS Error: ', '');  // Nettoie le préfixe
            } else if (error?.message) {
                userMsg = error.message;
            } else {
                userMsg = 'Erreur réseau ou serveur.';
            }

            // Ajout de contexte si code d'erreur
            if (error?.status) {
                switch (error.status) {
                    case 400:
                        userMsg += ' (Données invalides – vérifiez le template).';
                        break;
                    case 401:
                        userMsg += ' (Clé publique incorrecte).';
                        break;
                    case 402:
                        userMsg += ' (Limite d\'envoi dépassée – 200/mois).';
                        break;
                    case 404:
                        userMsg += ' (Service ou template introuvable).';
                        break;
                    case 422:
                        userMsg += ' (Variables du template incorrectes – from_name/from_email ?).';
                        break;
                    default:
                        userMsg += ` (Code ${error.status}).`;
                }
            }

            if (!userMsg) {
                userMsg = 'Erreur inconnue. Vérifiez la console.';
            }

            showMessage(`Erreur : ${userMsg}`, 'error');
        } finally {
            // RÉACTIVER LE BOUTON
            submitBtn.disabled = false;
            btnText.textContent = 'Envoyer';
            icon.classList.remove('fa-spinner', 'fa-spin');
            icon.classList.add('fa-paper-plane');
        }
    });

    // === FONCTION D'AFFICHAGE DES MESSAGES (CORRIGÉE) ===
    function showMessage(text, type) {
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = text;
        messageDiv.style.opacity = '1';

        // Auto-disparition après 4 secondes
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                messageDiv.className = 'form-message';
                messageDiv.textContent = '';
                messageDiv.style.opacity = '1';
            }, 400);
        }, 4000);
    }
});