console.log("client.js running");

const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".messages");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
};

// Send message
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = messageInput.value;

    append(`You: ${message}`, 'right'); // ✅ FIXED
    socket.emit('send', message);

    messageInput.value = '';
});

// Username
const username = prompt("enter your name to join");
socket.emit('new-user-joined', username);

// When someone joins
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'left'); // ✅ FIXED
});

// Receive message
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left'); // ✅ FIXED
});