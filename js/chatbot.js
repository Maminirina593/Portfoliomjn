// js/chatbot.js → VERSION TRÈS INTELLIGENTE, FORMELLE ET PROFESSIONNELLE
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("chatbot-toggle");
    const win = document.getElementById("chatbot-window");
    const minimize = document.getElementById("chatbot-minimize");
    const messages = document.getElementById("chatbot-messages");
    const input = document.getElementById("chatbot-input");
    const form = document.getElementById("chatbot-form");
    const botStatus = document.getElementById("bot-status");
  
    let currentLang = document.body.dataset.lang || "fr";
    let responses = {};
  
    // Mise à jour statut selon langue
    const updateStatus = () => {
      botStatus.textContent = currentLang === "fr" ? "En ligne" : "Online";
    };
    updateStatus();
  
    // Synchronisation langue du site
    const langSelect = document.getElementById("lang-select");
    if (langSelect) {
      langSelect.addEventListener("change", (e) => {
        currentLang = e.target.value;
        updateStatus();
        if (win.classList.contains("open") && messages.children.length > 0) {
          addMessage("bot", currentLang === "fr" 
            ? "La langue a été changée en français. Comment puis-je vous aider ?" 
            : "Language switched to English. How may I assist you?");
        }
      });
    }
  
    // Chargement des réponses intelligentes
    fetch("js/chat-data-intelligent.json")
      .then(r => r.json())
      .then(data => { responses = data; })
      .catch(() => console.error("Erreur JSON chatbot"));
  
    const addMessage = (sender, text) => {
      const div = document.createElement("div");
      div.className = `message ${sender}`;
      div.innerHTML = text.replace(/\n/g, "<br>");
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    };
  
    const greet = () => {
      const greeting = responses[currentLang]["bonjour|salut|hello|hi|bonsoir"] 
        || (currentLang === "fr" ? "Bonjour et bienvenue !" : "Good morning and welcome!");
      addMessage("bot", greeting);
    };
  
    toggle.onclick = () => {
      win.classList.toggle("open");
      if (win.classList.contains("open") && messages.children.length === 0) greet();
    };
  
    minimize.onclick = () => win.classList.remove("open");
  
    form.onsubmit = (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
  
      addMessage("user", q);
      input.value = "";
  
      const lower = q.toLowerCase();
      let reply = responses[currentLang].default;
  
      for (const key in responses[currentLang]) {
        const keys = key.split("|");
        if (keys.some(k => lower.includes(k))) {
          reply = responses[currentLang][key];
          break;
        }
      }
  
      setTimeout(() => addMessage("bot", reply), 600);
    };
  
    input.addEventListener("keypress", e => {
      if (e.key === "Enter") form.dispatchEvent(new Event("submit"));
    });
  });