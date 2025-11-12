// const chatbot = document.getElementById('chatbot');
// const openBtn = document.getElementById('open-chatbot');
// const closeBtn = document.getElementById('close-chatbot');
// const sendBtn = document.getElementById('send-chat');
// const input = document.getElementById('chat-input');
// const body = document.querySelector('.chatbot-body');

// openBtn.addEventListener('click', e => {
//     e.preventDefault();
//     chatbot.classList.toggle('visible');
//     openBtn.innerHTML = chatbot.classList.contains('visible') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-plus"></i>';
// });

// closeBtn.addEventListener('click', () => {
//     chatbot.classList.remove('visible');
//     openBtn.innerHTML = '<i class="fas fa-plus"></i>';
// });

// sendBtn.addEventListener('click', sendMessage);
// input.addEventListener('keypress', e => e.key === 'Enter' && sendMessage());

// function sendMessage() {
//     const msg = input.value.trim();
//     if (!msg) return;
//     addMessage(msg, 'user');
//     input.value = '';
//     setTimeout(() => addMessage("Merci pour votre message ! Je vous répondrai bientôt.", 'bot'), 1000);
// }

// function addMessage(text, sender) {
//     const div = document.createElement('div');
//     div.textContent = text;
//     div.style.marginBottom = '10px';
//     div.style.textAlign = sender === 'user' ? 'right' : 'left';
//     div.style.color = sender === 'user' ? '#007bff' : '#555';
//     body.appendChild(div);
//     body.scrollTop = body.scrollHeight;
// }