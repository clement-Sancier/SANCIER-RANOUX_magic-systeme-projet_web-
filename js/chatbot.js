class ChatHistory {
    constructor() {
        this.messages = [];
    }
    addMessage(message) {
        this.messages.push(message);
    }
    getHistory() {
        return this.messages;
    }
}
const historyMessages = new ChatHistory();
function saveMessages() {
    console.log('Saving chat history...');
    sessionStorage.setItem('chatHistory', JSON.stringify(historyMessages.getHistory()));
}
function loadMessages() {
    const savedData = sessionStorage.getItem('chatHistory');
    const chatHistory = JSON.parse(savedData);

    if (chatHistory) {
        chatHistory.forEach(msg => {
            showMessage(msg.text, msg.type);
            historyMessages.addMessage(msg);
        });
    }
}
window.addEventListener('beforeunload', saveMessages);
window.addEventListener('load', loadMessages);


function sendMessage(intents) {
    const inputElement = document.getElementById('réponse-ut');
    const messageUser = inputElement.value.trim();
    if (messageUser === "") return;
    showMessage(messageUser, 'user');
    historyMessages.addMessage({ text: messageUser, type: 'user' });
    const responseBot = processMessage(intents, messageUser);
    showMessage(responseBot, 'bot');
    historyMessages.addMessage({ text: responseBot, type: 'bot' });
    inputElement.value = "";
}


function showMessage(message, type) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(type === 'user' ? 'ut-message' : 'bot-message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}


function processMessage(intents, message) {
    let response = "Je suis désolé, je ne suis pas sûr de comprendre.";
    intents.forEach(intent => {
        intent.patterns.forEach(pattern => {
            if (message.toLowerCase().includes(pattern.toLowerCase())) {
                response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
            }
        });
    });
    return response;
}


//Fonction pour récupérer et traiter le JSON
function fetchJSON(url) {
// Récupérer le JSON à partir de l'URL fournie
    fetch(url)
        //then est une méthode qui retourne une promesse et prend en paramètre une
        //fonction callback qui sera exécutée une fois la promesse résolue
        .then(response => {
// Vérifier si la réponse est correcte
            if (!response.ok) {
// Si la réponse n'est pas correcte, lancer une erreur
                throw new Error('Network response was not ok');
            }
// Si la réponse est correcte, retourner le JSON
            return response.json();
        })
        //then ici permettra de récupérer le JSON retourné par la promesse
        .then(data => {
// Vérifier si le JSON est vide ou mal formé
            if (Object.keys(data).length === 0 && data.constructor === Object) {
// Si le JSON est vide ou mal formé, lancer une erreur
                throw new Error('Empty JSON or malformed JSON');
            }
            //On affiche le JSON dans la console. Il s'agit d'un objet contenant les
// intentions du chatbot
            console.log(data);
// Passer les intentions à la fonction sendMessage qui sera définie plus tard
            sendMessage(data.intents);
        })
        //catch est une méthode qui retourne une promesse et prend en paramètre une
        //fonction callback qui sera exécutée en cas d’erreur
        .catch(error => {
// En cas d’erreur, afficher un message d’erreur dans la console
            console.error("There was a problem with the fetch operation:", error);
        }) ;
}
