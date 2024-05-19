document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatBox = document.getElementById("chat-box");
  const voiceButton = document.getElementById("voice-input-btn");

  let isRecording = false;
  let deepgramSocket;

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message) {
      appendMessage("user", message);
      chatInput.value = '';

      // No es necesario verificar el estado de la API
      sendMessageToApi(message);
    }
  });

  function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    messageElement.setAttribute('role', 'status'); // ARIA role
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function sendMessageToApi(message) {
    const apiUrl = 'http://localhost:3030/chatbot'; // Cambia a la ruta correcta
    const timeoutDuration = 5000;

    try {
      const response = await Promise.race([
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: message })
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Tiempo de espera agotado')), timeoutDuration))
      ]);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      appendMessage("bot", data.response || "Lo siento, no entendí eso.");
    } catch (error) {
      console.error('Error:', error);
      appendMessage("bot", "Ocurrió un error al conectar con la API.");
    }
  }

  async function startDeepgramTranscription() {
    // Tu código de transcripción de Deepgram aquí
  }

  voiceButton.addEventListener('click', function() {
    if (isRecording) {
      // Tu código para detener la transcripción aquí
    } else {
      startDeepgramTranscription();
      isRecording = true;
      voiceButton.innerHTML = '<span class="material-symbols-outlined">mic_off</span>';
    }
  });

  chatInput.focus();
});
