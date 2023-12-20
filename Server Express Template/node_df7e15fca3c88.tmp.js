// Simple serveur Web avec Express
// ^ On fait appel à un module Express avec la fonction require
const express = require('express');

// ^ Ici on crée une instance d'Express appelée app. Elle sera utilisée pour configurer et exécuter votre application
const app = express();

app.use('/', express.static(__dirname + '/htdocs'));

// ^Cette partie configure le serveur pour écouter les connexions sur le port 8080. Lorsque le serveur démarre, il affiche le message "Listeing ..." dans l'output'
app.listen(8080, function () {
    console.log('Listening on port 8080');
});

