// // js/chatbot.js
// const PROXY_URL = 'https://chatbot-proxy.vercel.app/api/chat'; // ← TON URL VERCEL

// const mesInfos = `
// Nom : Maminirina Jean Noel
// Rôle : Développeur Fullstack
// Basé à : Madagascar
// Études : Master 1 Génie Logiciel (IS-INFO, 2025), Licence Développement (2022-2025)
// Stage : SSIF (janv-mai 2025) - Symfony, PostgreSQL
// Compétences : PHP, Python, Java, JavaScript, React, Vue.js, Node.js, Django, Symfony, MySQL, PostgreSQL, MongoDB, Git
// Projets : Gestion Stock, Suivi Projets IT, Tic Tac Toe IA, PTA Planning
// Contact : maminirinajeannoel@gmail.com | +261 34 74 956 07
// GitHub : github.com/maminirina593
// `;

// document.addEventListener('DOMContentLoaded', () => {
//   const openBtn = document.getElementById('open-chat');
//   const closeBtn = document.getElementById('close-chat');
//   const chat = document.getElementById('chatbot');
//   const input = document.getElementById('chat-input');
//   const sendBtn = document.getElementById('send-btn');
//   const messages = document.getElementById('chat-messages');

//   openBtn.onclick = () => chat.classList.add('active');
//   closeBtn.onclick = () => chat.classList.remove('active');
//   sendBtn.onclick = send;
//   input.onkeypress = e => e.key === 'Enter' && send();

//   addBotMessage("Bonjour ! Pose une question sur mon portfolio.");

//   function addUserMessage(text) {
//     const div = document.createElement('div');
//     div.className = 'message user';
//     div.textContent = text;
//     messages.appendChild(div);
//     messages.scrollTop = messages.scrollHeight;
//   }

//   function addBotMessage(text) {
//     const div = document.createElement('div');
//     div.className = 'message bot';
//     div.textContent = text;
//     messages.appendChild(div);
//     messages.scrollTop = messages.scrollHeight;
//   }

//   async function send() {
//     const question = input.value.trim();
//     if (!question) return;
//     addUserMessage(question);
//     input.value = '';

//     try {
//       const res = await fetch(PROXY_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ question, context: mesInfos })
//       });
//       const data = await res.json();
//       addBotMessage(data.answer || "Pas de réponse.");
//     } catch {
//       addBotMessage("Erreur de connexion.");
//     }
//   }
// });