document.addEventListener('DOMContentLoaded', () => {
    const messageContainer = document.getElementById('message-container');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Function to append a new message to the chatbox
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = text;
        messageContainer.appendChild(messageDiv);
        messageContainer.scrollTop = messageContainer.scrollHeight; // Auto-scroll to the latest message
    }

    // Function to send a user message and get a response from the API
    async function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === '') return;

        addMessage(userMessage, 'user');
        userInput.value = '';

        try {
            // Replace with your actual API endpoint and API key logic
            const response = await fetch('YOUR_API_ENDPOINT_HERE', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer YOUR_API_KEY' // Include if your API needs authentication
                },
                body: JSON.stringify({
                    message: userMessage
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            // Depending on your API, the response structure may vary.
            // Adjust the line below to correctly access the bot's message.
            const botMessage = data.reply || "Sorry, I can't answer that right now.";
            
            addMessage(botMessage, 'bot');
        } catch (error) {
            console.error('Error:', error);
            addMessage('Error: Could not connect to the chatbot.', 'bot');
        }
    }

    // Add event listeners for the send button and the Enter key
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initial message from the bot when the chat loads
    addMessage('Hello! How can I help you today?', 'bot');
});
