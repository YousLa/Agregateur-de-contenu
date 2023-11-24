// Envoie d'une requête client vers un serveur API
// Fabrication d'un client d'un API

// Le projet fini donnera un agrégagteur de contenu
// Agrégateur de contenu = Site Web ou logiciel qui, automatiquement et régulièrement, détecte et rassemble les mises à jour de sites prédéterminés par un internaute, et les lui adresse.

// Envoyer une requette de type GET à l'adresse :

// 1ère partie c'est le protocole => https
// 2ème partie c'est le nom de domaine/host => api.open-meteo.com
// 3ème partie c'est le chemin/path vers la ressource

// URL
// https://api.open-meteo.com/v1/forecast?latitude=50.85&longitude=4.37&hourly=temperature_2m

// Pour obtenir une réponse JSON (que l'on va passer en objet javascript)

// Selon le protocole utilisé par l'api on fait appel à un module/package NodeJS
let https = require('https');
// Port HTTP 80, HTTPS 443

// On crée une variable de type objet qui va contenir 3 propriétés : host, port, path
let request = {
    // 1. Le nom de domaine
    "host": "www.api.open-meteo.com",
    // 2. Le port du protocole
    "port": 443,
    // 3. Le chemin vers la ressource
    "path": "/v1/forecast?latitude=50.85&longitude=4.37&hourly=temperature_2m"
};

// A partir de l'objet https envoyer la requête vers le server qui est défini dans l'objet request
// get => est une requête HTTP pour obtenir quelque chose 
https.get(request, receiveResponseCallback);
// Ici on utilise la fonction receiveResponseCallback car NodeJS fonctionne de manière asynchrone (la requête est lancée et il fait autre chose jusqu'au moment ou il à reçu une réponse), donc on lui demande d'appeller la fonction de "callback" au moment ou il reçoit la réponse

// On reçoit un objet response
function receiveResponseCallback(response) {
    // Et on lui demande d'afficher le status code de la réponse à la requête
    console.log('Got response:' + response.statusCode);

    // On initialise la variable en string vide car on va concatèner les chunk
    let rawData = "";

    // .on => Méthode qui permet de gèrer l'évènement data/end. Donc quand il recevra quelque chose il lancera la fonction

    // Fonction fleché
    // On concatène dans rawData les chunk de données que l'on va recevoir
    response.on('data', (chunk) => { rawData += chunk; });

    // Fonction anonyme
    response.on('end', function (chunk) {
        // On affiche les données que l'on à reçu
        // console.log(rawData);

        // On crée un objet Javascript parser à partir de la variable rawData qui contient une chaîne de caractère structuré en JSON
        // La méthode .parse va analyser et vérifier si c'est bien du JSON bien formatté et convertir la chaîne de caractère en objet JavaScript (clés - valeurs)
        let weather = JSON.parse(rawData);

        // On affiche l'objet JSON
        console.log(weather.hourly.time[12] + " " + weather.hourly.temperature_2m[12] + " " + weather.hourly_units.temperature_2m);
        // console.log(weather);
    });
};

// rawData => On reçoie une chaîne de caractère structurée en JSON

