const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3030;

app.use(bodyParser.json());
app.use(cors()); 

const responses = [
  "Hola! Quin és el teu punt de partida?",
  "Des de la Universitat Autònoma, pren la línia S2 cap a Sabadell fins a Sant Joan. Vols adquirir el bitllet?",
  "comprar.html",
  "targetaNFC.html"
];

let responseIndex = 0;

// Función para obtener la siguiente respuesta en orden
function getNextResponse() {
  const response = responses[responseIndex];
  responseIndex = (responseIndex + 1) % responses.length;
  return response;
}

app.post('/chatbot', (req, res) => {
  console.log('Received a request:', req.body);
  const userMessage = req.body.message;

  if (!userMessage) {
    console.log('No message received');
    return res.status(400).json({ error: 'No message received' });
  }

  const botResponse = getNextResponse();

  if (botResponse === "comprar.html") {
    // Leer y enviar el contenido del archivo comprar.html
    const filePath = path.join(__dirname, '/hackUAB/www/html/widgets/comprar.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading comprar.html:', err);
        return res.status(500).json({ error: 'Error loading component' });
      }
      res.json({ response: data });
    });
  } else if (botResponse === "targetaNFC.html") {
    // Leer y enviar el contenido del archivo targetaNFC.html
    const filePath = path.join(__dirname, '/hackUAB/www/html/widgets/targetaNFC.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading targetaNFC.html:', err);
        return res.status(500).json({ error: 'Error loading component' });
      }
      res.json({ response: data });
    });
  } else {
    res.json({ response: botResponse });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API listening on http://0.0.0.0:${port}`);
});
