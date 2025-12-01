// chatbot.js – VERSION FINALE ULTIME 2025 – Maminirina Bot Professionnel (100% JSON)
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Maminirina Bot → Initialisation...');

  // Déclaration initiale: Fallback minimaliste en cas de problème de chargement immédiat.
  let responses = {
      fr: { default: "Chargement en cours..." },
      en: { default: "Loading..." }
  };
  let isFirstOpen = true; 

  // --- 1. Chargement des Données JSON ---
  const loadResponses = async () => {
      try {
          // CHEMIN CORRIGÉ : utilise "js/..." si le JSON est dans le sous-dossier "js"
          const res = await fetch('js/chat-data-intelligent.json?t=' + Date.now(), { cache: "no-cache" });
          
          // Vérifie le statut HTTP (404, 500, etc.)
          if (!res.ok) {
               // Lance une erreur si le fichier est introuvable (404) ou inaccessible
               throw new Error('HTTP ' + res.status); 
          }
          
          // Tente de parser le JSON (vérification de la syntaxe)
          responses = await res.json();
          console.log('JSON chargé avec succès → Bot pleinement opérationnel !');

          // Si le chat était déjà ouvert pendant le chargement, rafraîchit l'accueil
          if (!isFirstOpen && windowElem.style.display === 'flex') {
              const lang = navigator.language.startsWith('en') ? 'en' : 'fr';
              const welcome = findResponse('bonjour', lang); 
              addMessage(welcome, 'bot');
          }

      } catch (err) {
          console.error('Échec critique du chargement du JSON. Problème de chemin, de serveur local ou de syntaxe JSON.', err);
          // Ce message est le filet de sécurité, si vous le voyez, c'est que le fichier est inaccessible/invalide.
          responses = {
              fr: { default: "Erreur de chargement. Veuillez actualiser ou contacter Maminirina." },
              en: { default: "Loading error. Please refresh or contact Maminirina." }
          };
      }
  };

  // --- 2. Éléments DOM ---
  const toggleBtn         = document.getElementById('chatbot-toggle');
  const windowElem        = document.getElementById('chatbot-window');
  const minimizeBtn       = document.getElementById('chatbot-minimize');
  const messagesContainer = document.getElementById('chatbot-messages');
  const form              = document.getElementById('chatbot-form');
  const input             = document.getElementById('chatbot-input');

  // --- 3. Fonctions Utilitaires ---
  
  // Simplifie le texte pour la recherche de mots-clés
  const normalize = text => text.toLowerCase().trim().replace(/[.,!?:;'"()–—]/g, '').replace(/\s+/g, ' ');

  // Détecte la langue principale de l'utilisateur basé sur les mots-clés
  const detectLang = text => /hello|hi|hey|who|what|where|how|thank|english|skills|project|cv|contact|yo|what's up/i.test(text) ? 'en' : 'fr';

  // 🌟🌟🌟 FONCTION findResponse AMÉLIORÉE 🌟🌟🌟
  const findResponse = (text, lang) => {
      const normalizedInput = normalize(text);
      // Utilise les mots de l'utilisateur pour le score (sans les mots vides/courts)
      const inputWords = normalizedInput.split(' ').filter(word => word.length > 2); 
      
      const dict = responses[lang] || responses.fr; 
      let bestMatch = { score: 0, answer: dict.default };
      
      // Seuil minimum : au moins 1 mot-clé doit correspondre
      const MIN_SCORE = 1;

      for (const [keys, answer] of Object.entries(dict)) {
          if (keys === 'default') continue; 
          
          // Décompose tous les mots-clés de l'entrée JSON
          const jsonKeywords = keys.split('|').map(normalize).flatMap(key => key.split(' '));

          let currentScore = 0;
          
          // Calcul du score : compte combien de mots de l'utilisateur correspondent aux mots-clés du JSON
          for (const inputWord of inputWords) {
              if (jsonKeywords.some(keyword => keyword.includes(inputWord) || inputWord.includes(keyword))) {
                  currentScore += 1;
              }
          }

          // Si le score actuel est meilleur que le meilleur score trouvé jusqu'à présent
          if (currentScore > bestMatch.score) {
              bestMatch.score = currentScore;
              bestMatch.answer = answer;
          }
      }
      
      // Retourne la meilleure correspondance si le score minimum est atteint, sinon la réponse par défaut.
      if (bestMatch.score >= MIN_SCORE) {
          return bestMatch.answer;
      }

      return dict.default; 
  };
  // 🌟🌟🌟 FIN FONCTION findResponse AMÉLIORÉE 🌟🌟🌟

  // Ajoute un message dans la fenêtre du chat
  const addMessage = (text, type) => {
      const div = document.createElement('div');
      div.className = `message ${type}-message`;
      // Traitement simple du Markdown (gras et sauts de ligne)
      div.innerHTML = text
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n/g, '<br>');
      messagesContainer.appendChild(div);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  // Affiche l'indicateur de frappe
  const showTyping = () => {
      const typing = document.createElement('div');
      typing.className = 'typing-indicator';
      typing.innerHTML = '<span></span><span></span><span></span>';
      messagesContainer.appendChild(typing);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      return typing; 
  };

  // --- 4. Gestion de l'Interface et des Événements ---

  // Ouvre la fenêtre du chat
  const openChat = () => {
      windowElem.style.display = 'flex';

      if (isFirstOpen) {
          setTimeout(() => {
              const lang = navigator.language.startsWith('en') ? 'en' : 'fr';
              const welcomeMessage = findResponse('bonjour', lang); 
              addMessage(welcomeMessage, 'bot');
              isFirstOpen = false;
          }, 800);
      }
  };

  // Ferme la fenêtre du chat
  const closeChat = () => {
      windowElem.style.display = 'none';
  };

  // Événement Clic sur le bouton bascule (ouvrir/fermer)
  toggleBtn.addEventListener('click', () => {
      windowElem.style.display === 'flex' ? closeChat() : openChat();
  });

  // Événement Clic sur le bouton de minimisation
  minimizeBtn.addEventListener('click', closeChat);

  // Événement Soumission du formulaire (envoi du message)
  form.addEventListener('submit', e => {
      e.preventDefault();
      const userText = input.value.trim();
      if (!userText) return;

      addMessage(userText, 'user');
      input.value = '';

      const typing = showTyping();
      // Délai aléatoire pour simuler la réflexion du bot
      setTimeout(() => {
          typing.remove(); 
          
          const lang = detectLang(userText);
          const reply = findResponse(userText, lang);
          
          addMessage(reply, 'bot');
      }, 900 + Math.random() * 1000); 
  });

  // Gestion de la touche Entrée dans le champ de saisie
  input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          form.dispatchEvent(new Event('submit'));
      }
  });

  // Fermeture avec la touche Échap
  document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && windowElem.style.display === 'flex') {
          closeChat();
      }
  });

  // --- 5. Lancement ---
  loadResponses(); // Démarre le chargement du JSON

  console.log('Maminirina Bot → Écoute des événements...');
});