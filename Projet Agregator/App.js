// Simple serveur Web avec Express 
// ^ On fait appel à un module Express avec la fonction require
const express = require('express');

// ^ Ici on crée une instance d'Express appelée app. Elle sera utilisée pour configurer et exécuter votre application
const app = express();

// ^ On lui dit d'utiliser pour la racine de mon site, le dossier htdoc
app.use('/', express.static(__dirname + '/htdocs'));

// ^ Met en place le moteur de rendu en ejs 
app.set('view engine', 'ejs');

// ^ Cette partie configure le serveur pour écouter les connexions sur le port 8080. Lorsque le serveur démarre, il affiche le message "Listeing ..." dans l'output'
app.listen(8080, function () {
    console.log('Listening on port 8080');
});

// ^ Quand notre application reçoit une requête de type get sur la route (/)
app.get('/', function (request, response) {
    // Fusion du ejs avec mes data
    response.render('index.ejs', { nom: "Rudi" });
});
