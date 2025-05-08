// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    setupChatEvents();
});

function setupChatEvents() {
    // Add click event to send button
    document.getElementById('send-button').addEventListener('click', sendMessage);
    
    // Add enter key event to input field
    document.getElementById('user-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    
    if (message) {
        // Hide intro message if visible
        document.getElementById('bot-intro').style.display = 'none';
        
        // Add user message
        addMessage(message, 'user');
        
        // Clear input
        userInput.value = '';
        
        // Focus on input field
        userInput.focus();
        
        // Call AI service (simulated for now)
        processUserMessage(message);
    }
}

function processUserMessage(message) {
    // Show typing indicator
    showTypingIndicator();
    
    // This is where you would normally call your backend API
    // For now, we'll simulate a response after a short delay
    setTimeout(() => {
        // Remove typing indicator
        removeTypingIndicator();
        
        // Simulate different responses based on keywords
        if (message.toLowerCase().includes('investment')) {
            addMessage("I can help you with investment planning. What specific investment options are you interested in?", 'bot');
        } else if (message.toLowerCase().includes('budget')) {
            addMessage("Creating a budget is a great first step in financial planning. Would you like tips on budgeting or tools to help track your expenses?", 'bot');
        } else if (message.toLowerCase().includes('retirement')) {
            addMessage("Planning for retirement is crucial. There are several retirement account options such as 401(k), IRA, and Roth IRA. Would you like to learn more about any of these?", 'bot');
        } else {
            addMessage("I'm Sori, your AI financial assistant. I can help with investment strategies, budgeting, retirement planning, and more. What specific aspect of financial planning can I assist you with today?", 'bot');
        }
    }, 1500);
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = text;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    
    typingDiv.classList.add('message', 'bot-message', 'typing-indicator');
    typingDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    typingDiv.id = 'typing-indicator';
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const clearChatButton = document.getElementById('clear-chat');
    
    clearChatButton.addEventListener('click', function() {
        // Clear chat messages
        const chatMessages = document.getElementById('chat-messages');
        
        // Remove all messages but keep the intro
        while (chatMessages.firstChild) {
            chatMessages.removeChild(chatMessages.firstChild);
        }
        
        // Re-add the bot intro
        const botIntro = document.createElement('div');
        botIntro.className = 'bot-intro';
        botIntro.id = 'bot-intro';
        botIntro.innerHTML = `
            <div class="logo-container">
                <img src="../assets/images/savora-logo-no-text.png" alt="Savora Logo" class="logo-white">
            </div>
            <h1>How can we assist you today?</h1>
            <p><br>I am your AI Personal Financial Assistant - Sori.<br>Ask me anything about financial planning and investment topics!</p>
        `;
        
        chatMessages.appendChild(botIntro);
        
        // Clear any chat history stored in localStorage if you're using it
        localStorage.removeItem('chatHistory');
    });
});