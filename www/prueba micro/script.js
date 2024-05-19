// Verificar compatibilidad con el navegador
if (!('webkitSpeechRecognition' in window)) {
    alert("Tu navegador no soporta la API de reconocimiento de voz. Por favor, utiliza Google Chrome.");
} else {
    // Inicializar el reconocimiento de voz
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true; // Permitir la transcripción continua
    recognition.interimResults = true; // Mostrar resultados intermedios

    // Referencia al botón y al cuadro de texto
    const startButton = document.getElementById('start');

    const stopButton = document.getElementById('stop');

    const textbox = document.getElementById('textbox');

    // Manejar el evento de clic del botón
    startButton.addEventListener('click', () => {
        recognition.start();
    });


    stopButton.addEventListener('click', () => {
        recognition.stop();
    });
    // Evento de resultado de reconocimiento de voz
    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        textbox.value = transcript;
    };

    // Manejar errores
    recognition.onerror = (event) => {
        console.error('Error en el reconocimiento de voz: ', event.error);
    };

    // Manejar el fin del reconocimiento
    recognition.onend = () => {
        console.log('El reconocimiento de voz ha terminado.');
    };
}
