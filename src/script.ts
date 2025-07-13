// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form") as HTMLFormElement;
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
});

// Handle form submission
async function handleSubmit(e: Event) {
  e.preventDefault();
  await sendChat();
}

// Send the user message to the backend and get the AI response
async function sendChat(): Promise<void> {
  const chatInput = document.getElementById(
    "chatbox-input"
  ) as HTMLInputElement;
  if (!chatInput) return;

  const chatQuery = chatInput.value.trim();
  if (!chatQuery) return;

  appendMessage("user", chatQuery);
  chatInput.value = "";

  // Show "Thinking..." typing indicator
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "message bot typing-indicator";
  loadingDiv.textContent = "Thinking...";
  const chatMessages = document.getElementById("chat-messages");
  if (chatMessages) {
    chatMessages.appendChild(loadingDiv);
  }

  try {
    // 🔥 MAKE SURE YOUR SERVER IS RUNNING ON THIS PORT
    const response = await fetch("http://localhost:5500/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: chatQuery }),
    });

    const data = await response.json();
    removeTypingIndicator();

    if (data.error) {
      appendMessage("bot", `⚠️ Error: ${data.error}`);
    } else {
      simulateTyping(data.reply);
    }
  } catch (error) {
    removeTypingIndicator();
    appendMessage("bot", "⚠️ Failed to connect to the server.");
  }
}

// Append message to chat box
function appendMessage(sender: "user" | "bot", message: string): void {
  const chatBox = document.getElementById("chat-messages");
  if (!chatBox) return;

  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Simulate typing animation for bot reply
function simulateTyping(reply: string): void {
  const chatBox = document.getElementById("chat-messages");
  if (!chatBox) return;

  const typingDiv = document.createElement("div");
  typingDiv.className = "message bot";
  chatBox.appendChild(typingDiv);

  let i = 0;
  const typingEffect = setInterval(() => {
    if (i < reply.length) {
      typingDiv.textContent = reply.substring(0, i + 1);
      i++;
      chatBox.scrollTop = chatBox.scrollHeight;
    } else {
      clearInterval(typingEffect);
    }
  }, 20);
}

// Remove any "Thinking..." indicators
function removeTypingIndicator(): void {
  const indicators = document.querySelectorAll(".typing-indicator");
  indicators.forEach((el) => el.remove());
}
