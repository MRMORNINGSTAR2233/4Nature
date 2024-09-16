const socket = new WebSocket('wss://' + window.location.host + '/ws/stream/');
let currentMessageElement = null;  // Element for the current message being displayed

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    const message = data.message;

    // If this is the start of a new message, create a new message element
    if (message === '[END]') {
        currentMessageElement = null;  // Reset for the next message
        // Scroll to the bottom of the chat box
        document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
    } else {
        if (!currentMessageElement) {
            // Create a new message element for the AI response
            currentMessageElement = document.createElement('div');
            currentMessageElement.classList.add('chat-message', 'ai');
            document.getElementById('chat-box').appendChild(currentMessageElement);
            // Scroll to the bottom of the chat box
        document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
        }
        // Append the chunk to the current message element
        currentMessageElement.textContent += message;
    }
};


function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const message = inputField.value;
    if (message.trim() !== '') {
        displayMessage(message, 'user');
        socket.send(JSON.stringify({ message: message }));
        inputField.value = '';  // Clear the input field
    }
}

function displayMessage(message, type) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', type);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
}
// Add event listener for the Enter key
document.getElementById('chat-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        sendMessage();
    }
});