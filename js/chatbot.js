// --- Temporary User ID for testing ---
const TEMP_USER_ID = "testUser123_financial_planner";

let typingIndicator;

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    typingIndicator = document.getElementById('typing-indicator');

    setupChatEvents();
    loadChatHistory();

    // Handle Clear Chat Modal and Button
    const clearChatButton = document.getElementById('clear-chat');
    const confirmClearChatBtn = document.getElementById('confirmClearChat');
    const clearChatModalElement = document.getElementById('clearChatModal');
    let clearChatModalInstance;
    if (clearChatModalElement) {
        clearChatModalInstance = new bootstrap.Modal(clearChatModalElement);
    } else {
        console.warn("Clear chat modal element not found.");
    }


    if (clearChatButton && clearChatModalInstance) {
        clearChatButton.addEventListener('click', function() {
            clearChatModalInstance.show();
        });
    }

    if (confirmClearChatBtn && clearChatModalInstance) {
        confirmClearChatBtn.addEventListener('click', async function() {
            // 1. Clear messages from the UI
            const chatMessages = document.getElementById('chat-messages');
            const botIntro = document.getElementById('bot-intro');
            
            if (chatMessages) {
                chatMessages.innerHTML = ''; // Clear all messages
                if (botIntro) {
                    // Clone the intro and re-append it to ensure it's clean
                    const newBotIntro = botIntro.cloneNode(true);
                    newBotIntro.style.display = 'block';
                    chatMessages.appendChild(newBotIntro);
                }
            }

            // 2. Call backend to delete chat history for the user
            try {
                const response = await fetch(`http://localhost:4000/api/chatbot/${TEMP_USER_ID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add Authorization header if implement auth later
                    }
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Failed to clear chat history from backend:', errorData.error);
                    // display an error to the user in the chat
                    addMessage(`Error clearing history: ${errorData.error || 'Server error'}`, 'system');
                } else {
                    console.log('Chat history cleared from backend.');
                }
            } catch (error) {
                console.error('Error calling clear chat API:', error);
                addMessage(`Error clearing history: ${error.message}`, 'system');
            }
            
            // 3. Clear any local storage
            localStorage.removeItem('chatHistory');
            
            // 4. Close the modal
            clearChatModalInstance.hide();
        });
    }

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

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    if (!userInput) return;

    const message = userInput.value.trim();
    
    if (message) {
        // Hide intro message if visible
        const botIntro = document.getElementById('bot-intro');
        if (botIntro) {
            botIntro.style.display = 'none';
        }
        
        // Add user message
        addMessage(message, 'user');
        
        // Clear input
        userInput.value = '';
        
        // Focus on input field
        userInput.focus();
        
        await getAIResponse(message);
    }
}

async function getAIResponse(userMessage) {
    showTypingIndicator();
    
try {
        const response = await fetch('http://localhost:4000/api/chatbot/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // after adding authentication, include Authorization header:
                // 'Authorization': `Bearer ${your_auth_token}`
            },
            body: JSON.stringify({
                userId: TEMP_USER_ID, // Send the temporary user ID
                question: userMessage
            })
        });

        removeTypingIndicator();

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        const data = await response.json();
        addMessage(data.response, 'bot'); // Display AI's actual response

    } catch (error) {
        console.error('Error getting AI response:', error);
        removeTypingIndicator(); // Ensure typing indicator is removed on error
        addMessage(`Sorry, I encountered an error. Please try again. (${error.message})`, 'bot');
    }
}

async function loadChatHistory() {
    const chatMessagesContainer = document.getElementById('chat-messages');
    const botIntro = document.getElementById('bot-intro');

    if (!chatMessagesContainer) return;

    try {
        const response = await fetch(`http://localhost:4000/api/chatbot/${TEMP_USER_ID}`); // Endpoint to get chats by user
        if (!response.ok) {
            if (response.status === 404) { // No history found, which is fine
                console.log("No chat history found for this user.");
                if (botIntro) botIntro.style.display = 'block'; // Show intro if no history
                return;
            }
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const chats = await response.json();

        if (chats && chats.length > 0) {
            if (botIntro) botIntro.style.display = 'none'; // Hide intro if there's history
            chats.forEach(chat => {
                addMessage(chat.question, 'user');
                addMessage(chat.response, 'bot');
            });
        } else {
            if (botIntro) botIntro.style.display = 'block'; // Show intro if history is empty
        }
    } catch (error) {
        console.error('Error loading chat history:', error);
        // Don't add error to chat here, as it might be confusing on page load
        // addMessage(`System: Could not load chat history. ${error.message}`, 'system');
        if (botIntro) botIntro.style.display = 'block'; // Ensure intro is visible on error
    }
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    
    messageDiv.classList.add('message');

    if (sender === 'user') {
        messageDiv.classList.add('user-message');
        messageDiv.textContent = text; // User messages are plain text
    } else if (sender === 'bot') {
        messageDiv.classList.add('bot-message');
        // --- RENDER MARKDOWN FOR BOT MESSAGES --- 
        // Check if the 'marked' object exists and has a 'parse' method which is a function
        if (typeof marked === 'object' && marked !== null && typeof marked.parse === 'function') {
            try {
                messageDiv.innerHTML = marked.parse(text); // Use marked.parse()
            } catch (e) {
                console.error("Error parsing markdown for bot message:", e);
                messageDiv.textContent = text; // Fallback to plain text
            }
        } else {
            console.warn('marked.parse function is not available. Displaying raw bot message.');
            if (typeof marked === 'object' && marked !== null) {
                console.log('marked object is available, but parse method is missing or not a function:', marked);
            } else {
                console.log('marked object itself is not available.');
            }
            messageDiv.textContent = text; // Fallback to plain text
        }
        // --- END OF RENDER MARKDOWN ---
    } else { // e.g., 'system'
        messageDiv.classList.add('system-message');
        messageDiv.textContent = text;
    }
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom(); // Call after adding any message
}

function showTypingIndicator() {
    // const chatMessages = document.getElementById('chat-messages');
    // if (!chatMessages || document.getElementById('typing-indicator')) return;

    // const typingDiv = document.createElement('div');
    
    // typingDiv.classList.add('message', 'bot-message', 'typing-indicator');
    // typingDiv.id = 'typing-indicator'; // Added ID for easier removal
    // typingDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    // typingDiv.id = 'typing-indicator';
    
    // chatMessages.appendChild(typingDiv);
    // scrollToBottom();
    typingIndicator.style.display = 'block';
    scrollToBottom();
}

function removeTypingIndicator() {
    // const typingIndicator = document.getElementById('typing-indicator');
    // if (typingIndicator) {
    //     typingIndicator.remove();
    // }
    typingIndicator.style.display = 'none';
    scrollToBottom();
}

function scrollToBottom() {
  const chatMessages = document.getElementById('chat-messages');
  if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

/* 

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

// Get modal elements for clear chat button
const clearChatBtn = document.getElementById('clear-chat');
const confirmClearChatBtn = document.getElementById('confirmClearChat');
const clearChatModal = new bootstrap.Modal(document.getElementById('clearChatModal'));

// Show modal when clear chat button is clicked
clearChatBtn.addEventListener('click', function() {
    clearChatModal.show();
});

// Handle clear chat confirmation
confirmClearChatBtn.addEventListener('click', function() {
    // Clear chat messages
    const chatMessages = document.getElementById('chat-messages');
    
    // Remove all messages but keep the intro
    const botIntro = document.getElementById('bot-intro');
    chatMessages.innerHTML = '';
    chatMessages.appendChild(botIntro);
    botIntro.style.display = 'block'; // Show the intro again
    
    // Also clear any chat history from localStorage if you're storing it
    localStorage.removeItem('chatHistory');
    
    // Close the modal
    clearChatModal.hide();
});

*/