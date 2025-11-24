// js/chatbot.js → DÉTECTION AUTOMATIQUE FR/EN + RÉPONSES PARFAITES
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("chatbot-toggle");
    const win = document.getElementById("chatbot-window");
    const minimize = document.getElementById("chatbot-minimize");
    const messages = document.getElementById("chatbot-messages");
    const input = document.getElementById("chatbot-input");
    const form = document.getElementById("chatbot-form");
    const botStatus = document.getElementById("bot-status");
  
    let currentLang = document.body.dataset.lang || "fr"; // langue du site
    let responses = {};
  
    const updateStatus = () => {
      botStatus.textContent = currentLang === "fr" ? "En ligne" : "Online";
    };
    updateStatus();
  
    // Chargement des réponses
    fetch("js/chat-data-intelligent.json")
      .then(r => r.json())
      .then(data => {
        responses = data;
        console.log("Maminirina Bot → Chargé & prêt (détection auto FR/EN)");
      });
  
    const addMessage = (sender, text) => {
      const div = document.createElement("div");
      div.className = `message ${sender}`;
      div.innerHTML = text.replace(/\n/g, "<br>");
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    };
  
    const greet = () => {
      const greeting = responses[currentLang]["bonjour|salut|hello|hi|bonsoir"] ||
        (currentLang === "fr" ? "Bonjour et bienvenue !" : "Hello and welcome!");
      addMessage("bot", greeting);
    };
  
    // FONCTION MAGIQUE : DÉTECTE SI LA QUESTION EST EN ANGLAIS
    const detectEnglish = (text) => {
      const englishWords = /\b(hello|hi|hey|how|what|where|when|why|who|you|your|project|skill|experience|cv|available|english|thank|yes|no|please|contact|github|linkedin)\b/i;
      const frenchWords = /\b(bonjour|salut|merci|oui|non|projet|compétence|expérience|cv|disponible|contact|anglais|s'il vous plaît)\b/i;
  
      const hasEnglish = englishWords.test(text);
      const hasFrench = frenchWords.test(text);
  
      if (hasEnglish && !hasFrench) return "en";
      if (hasFrench && !hasEnglish) return "fr";
      return currentLang; // par défaut, garde la langue du site
    };
  
    toggle.onclick = () => {
      win.classList.toggle("open");
      if (win.classList.contains("open") && messages.children.length === 0) {
        setTimeout(greet, 400);
      }
    };
  
    minimize.onclick = () => win.classList.remove("open");
  
    form.onsubmit = (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
  
      addMessage("user", q);
      input.value = "";
  
      // DÉTECTION AUTOMATIQUE DE LA LANGUE DE LA QUESTION
      const detectedLang = detectEnglish(q);
      const prevLang = currentLang;
      if (detectedLang !== currentLang) {
        currentLang = detectedLang;
        updateStatus();
        // Optionnel : notifier le changement
        // addMessage("bot", currentLang === "fr" ? "Passage en français" : "Switching to English");
      }
  
      const lower = q.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      let reply = responses[currentLang].default || "Merci pour votre message !";
  
      for (const key in responses[currentLang]) {
        const keys = key.split("|");
        if (keys.some(k => lower.includes(k.toLowerCase()))) {
          reply = responses[currentLang][key];
          break;
        }
      }
  
      // Temps de réponse naturel
      setTimeout(() => addMessage("bot", reply), 500 + Math.random() * 600);
    };
  
    // Entrée clavier
    input.addEventListener("keypress", e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        form.dispatchEvent(new Event("submit"));
      }
    });
  
    // Synchronisation avec le sélecteur de langue du site
    const langSelect = document.getElementById("lang-select");
    if (langSelect) {
      langSelect.addEventListener("change", (e) => {
        currentLang = e.target.value;
        updateStatus();
      });
    }
  });