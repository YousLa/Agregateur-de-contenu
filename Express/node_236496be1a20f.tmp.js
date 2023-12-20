// ^ On fait appel à un module Express avec la fonction require
const express = require('express');

// ^ Ici on crée une instance d'Express appelée app. Elle sera utilisée pour configurer et exécuter votre application
const app = express();

// ^Cette partie configure le serveur pour écouter les connexions sur le port 8080. Lorsque le serveur démarre, il affiche le message "Listeing ..." dans la console
app.listen(8080, function () {
    console.log('Listening on port 8080')
});

// ^ Quand notre application reçoit une requête de type get sur la route (/)
// * Ici une route est définie pour l'URL '/' en utilisant la méthode get. Lorsqu'un utilisateur accède à l'URL '/', la fonction de rappel (callback) spécifiée est exécutée.
// * Cette fonction prend deux arguments, request (la requête HTTP reçue) et response (la réponse HTTP que le serveur envoie). Dans ce cas, la fonction envoie simpement la réponse "Hello ..." au client.
app.get('/', function (request, response) {
    response.send('Hello Express');
});


app.get('/time', function (request, response) {
    let time = new Date();
    response.send('Il est :' + time);
}); 